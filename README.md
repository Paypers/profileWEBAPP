# Personal Portfolio Website

This repository contains the source code for a dynamic and interactive personal portfolio website. The project is built with a modern tech stack, featuring a React frontend and a secure Node.js backend. It includes an animated introduction, a 3D image carousel, and a secure contact form.

## Features
- **Interactive Intro Animation**: A welcome overlay is displayed to first-time visitors, which is managed by a browser cookie. The animation sequence is handled using component state and timers to ensure a smooth user experience.
- **Dynamic Homepage**: The homepage features a scroll-based animation that reveals a background image as the user scrolls down the page.
- **3D Image Carousel**: A unique 3D carousel displays images with a circular, floating effect achieved through CSS transforms like `rotateY`, `translateX`, and `translateZ`.
- **Secure Contact Form**: The form includes robust backend functionality:
  - **Input Validation**: The backend validates the name, email, and message fields, requiring the message to be at least 10 characters long.
  - **Advanced Email Checks**: It verifies that the email address is not from a disposable domain and confirms the domain has valid MX records.
  - **Security**: The backend uses Helmet to set secure HTTP headers, CORS to restrict access to allowed origins, and rate-limiting to prevent spam.
  - **Input Sanitization**: User-submitted content is sanitized using the `he` library to prevent XSS attacks.
- **Interactive Elements**: The site includes fun, interactive buttons that trigger confetti and firework animations.
- **Modern Theming**: The application uses a consistent dark theme managed by CSS variables for easy maintenance.

## Tech Stack
### Frontend
- **React**: The core library for building the user interface.
- **CSS3**: Modern CSS is used for styling, including CSS Variables, Flexbox, and complex 3D transform animations.
- **vite-plugin-svgr**: Used for importing SVG files as React components.

### Backend
- **Node.js & Express**: The runtime and framework for the backend server.
- **Nodemailer**: Used to send emails from the contact form.
- **express-validator**: For server-side validation of the contact form data.
- **Helmet & CORS**: Middleware for securing the Express application.
- **AWS SDK**: The client for AWS Secrets Manager is included to handle credentials in a cloud environment.