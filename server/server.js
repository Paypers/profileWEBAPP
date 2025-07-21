const express = require('express');
const nodemailer = require('nodemailer');
const { promises: dns } = require('dns');
const disposableDomains = require('disposable-email-domains');
const { body, validationResult } = require('express-validator');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const he = require('he');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = 5000; // A common port for backend servers

// --- Security Middleware ---

// 1. Set various HTTP headers for security
app.use(helmet());

// 2. Configure and use CORS
// This is a critical security measure to prevent other websites from making
// requests to your API. It whitelists only the domains you specify.
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS
  ? process.env.CORS_ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : [];

const corsOptions = {
  origin: (origin, callback) => {
    // For debugging: log the received origin to the server console.
    console.log(`Request from origin: ${origin}`);

    // Allow requests from whitelisted origins.
    // `!origin` allows same-origin requests and server-to-server/REST tool requests.
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // Log the blocked origin for easier debugging.
      console.error(`Origin not allowed by CORS policy: ${origin}`);
      callback(new Error('This origin is not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// 3. Rate limiting to prevent spam/abuse
const contactLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 5, // Limit each IP to 5 submissions per window
	message: { message: 'Too many requests from this IP, please try again after 15 minutes.' },
	standardHeaders: true,
	legacyHeaders: false,
});

// For services like Gmail, you must generate and use an "App Password"
// from your Google Account security settings, not your regular password.
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE, // e.g., 'gmail'
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify the transporter configuration on startup
transporter.verify(function(error, success) {
  if (error) {
    console.error('Nodemailer configuration error:', error);
  } else {
    console.log('Nodemailer is configured and ready to send emails');
  }
});

app.get('/api', (req, res) => {
  res.json({ message: "Hello from the server!" });
});

// New endpoint to handle contact form submissions
app.post(
  '/api/contact',
  contactLimiter, // Apply rate limiting
  [ // 4. Validation and Sanitization chain
    body('name', 'Name is required.').trim().notEmpty(),
    body('email', 'A valid email is required.')
      .trim()
      .isEmail()
      .normalizeEmail()
      .custom(async (email) => {
        const domain = email.split('@')[1];

        // Check 1: Block known disposable/temporary email domains
        if (disposableDomains.includes(domain)) {
          return Promise.reject('Disposable email addresses are not permitted.');
        }

        // Check 2: Verify the domain has valid MX (Mail Exchange) records.
        // This confirms the domain is set up to receive emails.
        try {
          const addresses = await dns.resolveMx(domain);
          if (!addresses || addresses.length === 0) {
            return Promise.reject('Email domain appears to be invalid.');
          }
        } catch (error) {
          console.warn(`MX record check failed for domain: ${domain}`, error.code);
          return Promise.reject('Could not verify the email domain.');
        }
      }),
    body('message', 'Message is required.').trim().notEmpty()
      .isLength({ min: 10 }).withMessage('Message must be at least 10 characters long.'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If there are validation errors, send the first one back
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    
    const { name, email, message } = req.body;

    // 5. Sanitize text fields to prevent HTML injection in the email
    const sanitizedName = he.encode(name);
    const sanitizedMessage = he.encode(message);

    const mailOptions = {
      from: `"${sanitizedName}" <${process.env.EMAIL_USER}>`, // Use your email as the sender
      replyTo: email, // Set the user's email as the reply-to address
      to: process.env.RECIPIENT_EMAIL, // Your receiving email address
      subject: `New Contact Form Submission from ${sanitizedName}`,
      html: `
      <h2>New Contact Form Submission</h2>
      <p>You have a new message from your website's contact form.</p>
      <p><strong>Name:</strong> ${sanitizedName}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Message:</strong></p>
      <pre>${sanitizedMessage}</pre>
    `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Failed to send message. Please try again later.' });
      }
      console.log('Email sent: ' + info.response);
      res.status(200).json({ message: 'Message sent successfully!' });
    });
  }
);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});