import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State to store the message from the server
  const [message, setMessage] = useState('');

  // useEffect runs once when the component loads
  useEffect(() => {
    // Fetch data from our backend API
    fetch('/api')
      .then(res => res.json())
      .then(data => setMessage(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Your Full-Stack App!</h1>
        <p>Message from server: <strong>{message}</strong></p>
      </header>
    </div>
  );
}

export default App;