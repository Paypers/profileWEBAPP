// FIX: The 'express-rate-limit' package uses a default export, not a named one.
// The import statement is changed to reflect this, resolving the 'import/no-named-as-default' warning.
import expressRateLimit from "express-rate-limit";
import * as functions from "firebase-functions/v2";
import * as logger from "firebase-functions/logger";
// FIX: Explicitly import types to ensure strong typing in handlers.
import express, { Request, Response, NextFunction } from "express";
import * as nodemailer from "nodemailer";
import { initializeApp } from "firebase-admin/app";
import { getAppCheck } from "firebase-admin/app-check";
import { promises as dns } from "dns";
import { body, validationResult } from "express-validator";
import cors from "cors";
import helmet from "helmet";
import * as he from "he";
import * as disposableEmailDomains from "disposable-email-domains";
import { defineString } from "firebase-functions/params";

// --- Define Required Secrets & Configuration ---
const emailService = defineString("EMAIL_SERVICE");
const emailUser = defineString("EMAIL_USER");
const emailPass = defineString("EMAIL_PASS");
const recipientEmail = defineString("RECIPIENT_EMAIL");
const corsAllowedOrigins = defineString("CORS_ALLOWED_ORIGINS");

// --- Initialize Firebase Admin SDK ---
initializeApp();

// --- Initialize Express App ---
const app = express();

// --- Security Middleware ---
app.use(helmet());
app.use(express.json());

const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) => {
    const allowed = corsAllowedOrigins.value().split(",");
    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("This origin is not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));

// --- Rate Limiting Middleware ---
const contactLimiter = expressRateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: "Too many requests, please try again after 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});

// --- App Check Middleware ---
const verifyAppCheck = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const appCheckToken = req.header("X-Firebase-AppCheck");
  if (!appCheckToken) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  getAppCheck().verifyToken(appCheckToken)
    .then(() => {
      next();
    })
    .catch((err) => {
      logger.error("App Check verification failed:", err);
      res.status(401).json({ message: "Unauthorized" });
    });
};

// --- Nodemailer Transport ---
const transporter = nodemailer.createTransport({
  service: emailService.value(),
  auth: {
    user: emailUser.value(),
    pass: emailPass.value(),
  },
});

// --- Routes ---
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("API is healthy and running.");
});

// --- Type Definitions for Route ---
interface ContactFormRequestBody {
  name: string;
  email: string;
  message: string;
}
type ContactFormResponseBody = { message: string };

app.post(
  "/contact",
  verifyAppCheck,
  contactLimiter,
  [
    body("name", "Name is required.").trim().notEmpty(),
    body("email", "A valid email is required.")
      .trim().isEmail().normalizeEmail()
      .custom((email: string) => {
        const domain = email.split("@")[1];
        if (disposableEmailDomains.includes(domain)) {
          throw new Error("Disposable email addresses are not permitted.");
        }
        return dns.resolveMx(domain)
          .then((addresses) => {
            if (!addresses || addresses.length === 0) {
              throw new Error("Email domain appears to be invalid.");
            }
            return true;
          }).catch((error) => {
            logger.warn(`MX record lookup failed for domain: ${domain}`, error);
            throw new Error("Could not verify the email domain.");
          });
      }),
    body("message", "Message is required.").trim().notEmpty()
      .isLength({ min: 10 })
      .withMessage("Message must be at least 10 characters long."),
  ],
  // FIX: Provide explicit, strong types for the Request and Response objects.
  // This resolves the `no-explicit-any` and `no-unsafe-assignment` errors by
  // telling TypeScript exactly what `req.body` and `res.json` should look like,
  // and it also helps fix the `no-misused-promises` error by providing a
  // correct function signature that the linter can understand.
  (
    req: Request<Record<string, never>, ContactFormResponseBody, ContactFormRequestBody>,
    res: Response<ContactFormResponseBody>,
  ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // The 'msg' property can be of 'any' type, explicitly convert to string.
      return res.status(400).json({ message: String(errors.array()[0].msg) });
    }

    const { name, email, message } = req.body;
    const sanitizedName = he.encode(name);
    const sanitizedMessage = he.encode(message);

    const mailOptions = {
      from: `"${sanitizedName}" <${emailUser.value()}>`,
      replyTo: email,
      to: recipientEmail.value(),
      subject: `New Contact Form Submission from ${sanitizedName}`,
      html: `<p><strong>Name:</strong> ${sanitizedName}</p>` +
        `<p><strong>Email:</strong> ${email}</p>` +
        `<p><strong>Message:</strong></p><pre>${sanitizedMessage}</pre>`,
    };

    transporter.sendMail(mailOptions)
      .then(() => {
        return res.status(200).json({ message: "Message sent successfully!" });
      })
      .catch((error) => {
        logger.error("Error sending email:", error);
        return res.status(500).json({
          message: "Failed to send message. Please try again later.",
        });
      });
    // Add a return statement to satisfy all code paths
    return;
  },
);

// --- Export the entire Express app as a Cloud Function ---
export const api = functions.https.onRequest(app);
