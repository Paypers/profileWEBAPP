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
        <h1 className="intro-title">The Digital Echo</h1>
        <p className="intro-subtitle">A new presence is awakening.</p>
        <button className="intro-continue-button" onClick={handleContinueClick}>
          Descend
        </button>
      </div>
    </div>
  );
}

export default IntroOverlay;