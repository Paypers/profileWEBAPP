import React, { useState } from 'react';
import './App.css';
import HomePage from './components/Homepage';
import IntroOverlay from './components/IntroOverlay';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroFinished = () => {
    setShowIntro(false);
  };

  return (
    <div className="App">
      {showIntro && <IntroOverlay onFinished={handleIntroFinished} />}
      <HomePage isVisible={!showIntro} />
    </div>
  );
}

export default App;