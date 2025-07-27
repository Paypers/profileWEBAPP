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
// Use the port provided by the deployment platform, or 5000 for local development.
const port = process.env.PORT || 5000;

// --- Security Middleware ---

// 1. Set various HTTP headers for security
app.use(helmet());

// 2. Configure and use CORS
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS
  ? process.env.CORS_ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : [];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests from whitelisted origins.
    // `!origin` allows same-origin requests and server-to-server/REST tool requests.
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
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

// --- Health Check Endpoint ---
// This route is for the deployment platform's health checker (e.g., AWS App Runner).
app.get('/', (req, res) => {
  res.status(200).send('Server is healthy and running.');
});

// Endpoint to handle contact form submissions
app.post(
  '/api/contact',
  contactLimiter, // Apply rate limiting
  [ // Validation and Sanitization chain
    body('name', 'Name is required.').trim().notEmpty(),
    body('email', 'A valid email is required.')
      .trim().isEmail().normalizeEmail()
      .custom(async (email) => {
        const domain = email.split('@')[1];
        if (disposableDomains.includes(domain)) {
          return Promise.reject('Disposable email addresses are not permitted.');
        }
        try {
          const addresses = await dns.resolveMx(domain);
          if (!addresses || addresses.length === 0) {
            return Promise.reject('Email domain appears to be invalid.');
          }
        } catch (error) {
          return Promise.reject('Could not verify the email domain.');
        }
      }),
    body('message', 'Message is required.').trim().notEmpty()
      .isLength({ min: 10 }).withMessage('Message must be at least 10 characters long.'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    
    const { name, email, message } = req.body;
    const sanitizedName = he.encode(name);
    const sanitizedMessage = he.encode(message);

    const mailOptions = {
      from: `"${sanitizedName}" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Contact Form Submission from ${sanitizedName}`,
      html: `<p><strong>Name:</strong> ${sanitizedName}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><pre>${sanitizedMessage}</pre>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Failed to send message. Please try again later.' });
      }
      res.status(200).json({ message: 'Message sent successfully!' });
    });
  }
);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});