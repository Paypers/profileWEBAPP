import React, { useState, useEffect } from 'react';
import '../cssFiles/ContactForm.css';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Effect to clear the status message after 5 seconds
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus('');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [status]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return; // Prevent multiple submissions
    setIsLoading(true);

    // Determine the API URL based on the environment.
    // In development, it uses the local server. In production, it uses the deployed App Runner URL.
    const apiUrl = process.env.NODE_ENV === 'production'
      ? 'https://r7pr82sinj.us-east-2.awsapprunner.com/'
      : 'http://localhost:5000';

    try {
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus(data.message);
        setFormData({ name: '', email: '', message: '' }); // Clear form
      } else {
        setStatus(`Error: ${data.message || 'Something went wrong.'}`);
      }
    } catch (error) {
      setStatus('Error: Could not connect to the server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <button type="submit" className="submit-button" disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send Message'}
      </button>
      {status && <p className="form-status">{status}</p>}
    </form>
  );
}

export default ContactForm;