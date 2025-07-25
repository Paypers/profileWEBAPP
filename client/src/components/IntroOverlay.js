import React, { useState } from 'react';
import '../cssFiles/IntroOverlay.css'; // Make sure to create this CSS file

function IntroOverlay({ onFinished }) {
  const [isExiting, setIsExiting] = useState(false);

  const handleContinueClick = () => {
    setIsExiting(true);
    // Notify the parent component after the animation duration (1.2s)
    setTimeout(onFinished, 1200);
  };

  return (
    <div className={`intro-overlay ${isExiting ? 'exit' : ''}`}>
      <div className="intro-content">
        <h1 className="intro-title">Welcome To Jay's Website</h1>
        <p className="intro-subtitle">My self-introduction</p>
        <button className="intro-continue-button" onClick={handleContinueClick}>
          Drop me in
        </button>
      </div>
    </div>
  );
}

export default IntroOverlay;