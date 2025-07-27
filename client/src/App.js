import React, { useState } from 'react';
import './App.css';
import HomePage from './components/Homepage';
import IntroOverlay from './components/IntroOverlay';
import { getIntroSeenCookie } from './utils/cookies.js';

function App() {
  // Initialize state based on whether the cookie is present
  const [showIntro, setShowIntro] = useState(!getIntroSeenCookie());

  const handleIntroFinished = () => {
    setShowIntro(false);
  };

  return (
    <div className="App">
      {showIntro ? (
        <IntroOverlay onFinished={handleIntroFinished} />
      ) : (
        <HomePage isVisible={!showIntro} />
      )}
    </div>
  );
}

export default App;