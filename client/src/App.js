import React, { useState } from 'react';
import './App.css';
import HomePage from './components/Homepage';
import IntroOverlay from './components/IntroOverlay';
import { getIntroSeenCookie } from './utils/cookies.js';

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

  return (
    <div className="App">
      {/* The IntroOverlay remains in the DOM until its own animation is finished. */}
      {isIntroVisible && (
        <IntroOverlay
          onBeginExit={handleIntroBeginExit}
          onAnimationFinished={handleIntroAnimationFinished}
        />
      )}
      
      {/* The HomePage is always in the DOM, allowing its CSS transition to work correctly. */}
      <HomePage isVisible={isHomePageVisible} />
    </div>
  );
}

export default App;