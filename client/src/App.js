import React, { useState } from 'react';
import './App.css';
import HomePage from './components/Homepage';
import IntroOverlay from './components/IntroOverlay';
// --- CHANGE --- Import the new cookie removal function
import { getIntroSeenCookie, removeIntroSeenCookie } from './utils/cookies.js';

function App() {
  const hasSeenIntroBefore = getIntroSeenCookie();

  // This state controls whether the IntroOverlay is in the DOM.
  const [isIntroVisible, setIsIntroVisible] = useState(!hasSeenIntroBefore);
  
  // This state controls the visibility and fade-in of the HomePage.
  const [isHomePageVisible, setIsHomePageVisible] = useState(hasSeenIntroBefore);

  /**
   * Called when the intro begins its exit animation.
   * This will start the homepage fade-in.
   */
  const handleIntroBeginExit = () => {
    setIsHomePageVisible(true);
  };

  /**
   * Called after the intro's exit animation is completely finished.
   * This will remove the intro overlay from the DOM.
   */
  const handleIntroAnimationFinished = () => {
    setIsIntroVisible(false);
  };

  // --- NEW ---
  /**
   * Resets the application state to show the intro overlay again.
   * This function is passed down to the SocialTabs component.
   */
  const handleRestartIntro = () => {
    removeIntroSeenCookie();
    setIsHomePageVisible(false); // Hide the homepage
    
    // The conditional rendering for IntroOverlay in the JSX ensures that
    // when isIntroVisible becomes true again, the component re-mounts
    // with its internal state completely reset.
    setIsIntroVisible(true);
  };


  return (
    <div className="App">
      {/* The IntroOverlay remains in the DOM until its own animation is finished. */}
      {isIntroVisible && (
        <IntroOverlay
          onBeginExit={handleIntroBeginExit}
          onAnimationFinished={handleIntroAnimationFinished}
        />
      )}
      
      {/* --- CHANGE --- Pass the restart handler to the HomePage */}
      <HomePage isVisible={isHomePageVisible} onRestartIntro={handleRestartIntro} />
    </div>
  );
}

export default App;