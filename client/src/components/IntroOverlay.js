import React, { useState } from 'react';
import '../cssFiles/IntroOverlay.css';
import { setIntroSeenCookie } from '../utils/cookies.js';
import { ReactComponent as CatFace } from '../assets/IntroCats/cat-face-svgrepo-com.svg';
import { ReactComponent as GrinningCat } from '../assets/IntroCats/grinning-cat-svgrepo-com.svg';
import { ReactComponent as GrinningCatSmiling } from '../assets/IntroCats/grinning-cat-with-smiling-eyes-svgrepo-com.svg';

const EXIT_ANIMATION_DURATION = 3500; // 3.5 seconds

// The component now takes two callback props to manage the sequence
function IntroOverlay({ onBeginExit, onAnimationFinished }) {
  const [animationStep, setAnimationStep] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const handleContinueClick = () => {
    if (isExiting) return;

    setIsExiting(true);
    setAnimationStep(1);

    setTimeout(() => {
      setAnimationStep(2);
      setIntroSeenCookie();
      
      // 1. Signal the parent to start the homepage fade-in
      onBeginExit();

      // 2. Set a timer to signal the parent after the animation is complete
      setTimeout(() => {
        onAnimationFinished(); // Tell parent to unmount this component
      }, EXIT_ANIMATION_DURATION);
    }, 400);
  };

  // SVG rendering and other JSX remains the same as before...
  const renderSvg = () => {
    switch (animationStep) {
      case 1:
        return <GrinningCat className="intro-svg" />;
      case 2:
        return <GrinningCatSmiling className="intro-svg exit-animation" />;
      default:
        return <CatFace className="intro-svg" />;
    }
  };

  return (
    <div className={`intro-overlay ${isExiting ? 'exiting' : ''}`}>
      {renderSvg()}
      <div className="intro-content">
        <h1 className="intro-title">Welcome To Jay's Website</h1>
        <p className="intro-subtitle">My self-introduction</p>
        <button
          className="intro-continue-button"
          onClick={handleContinueClick}
          disabled={isExiting}
        >
          Drop me in
        </button>
      </div>
    </div>
  );
}

export default IntroOverlay;