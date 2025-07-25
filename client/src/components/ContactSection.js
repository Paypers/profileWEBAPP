import React from 'react';
import ContactForm from './ContactForm';
import '../cssFiles/ContactSection.css';

function ContactSection() {
  return (
    <section id="contact-section" className="contact-section">
      <h2>Get In Touch</h2>
      <p>Have a question or want to work together? Drop me a line!</p>
      <ContactForm />
    </section>
  );
}

export default ContactSection;