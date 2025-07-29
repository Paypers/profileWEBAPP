import { useEffect, useRef } from 'react';
import MainInfo from './MainInfo';
import SocialTabs from './SocialTabs';
import { ConfettiFireworksButton } from './ConfettiFireworkButton';
import { ConfettiSideCannonsButton } from './ConfettiSideCannonButton';
import '../cssFiles/HomePage.css';
import revealedImage from '../assets/UB-Pics/Me-2-UP.webp';
import memphisPattern from '../assets/memphis-mini-dark-modified.webp';

// --- Animation Control Variables ---
// Moved outside the component as they are true constants and don't need to be
// part of the component's render cycle.
const ANIMATION_START_PERCENT_VH = 40;
const ANIMATION_DURATION_PERCENT_TOTAL = 50;

function HomePage({ isVisible }) {
  const topLayerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight === 0) return;

      // Calculate the pixel offset before the animation should start
      const scrollStartOffset = (ANIMATION_START_PERCENT_VH / 100) * window.innerHeight;
      
      // Calculate how far into the animation's active region the user has scrolled
      const animationScroll = Math.max(0, window.scrollY - scrollStartOffset);
      
      // Calculate the total pixel distance over which the animation should occur
      const animationDurationPixels = scrollableHeight * (ANIMATION_DURATION_PERCENT_TOTAL / 100);

      // Calculate the final progress, clamped between 0 and 1
      const animationProgress = Math.min(animationScroll / animationDurationPixels, 1);
      
      if (topLayerRef.current) {
        topLayerRef.current.style.transform = `translateY(-${animationProgress * 100}%)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`HomePage ${isVisible ? 'visible' : ''}`}>
      <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Arvo" />

      <div className="background-layers">
        <div 
          className="revealed-image-layer" 
          style={{ backgroundImage: `url(${revealedImage})` }}
        ></div>
        <div 
          className="bottom-split-layer" 
          style={{ backgroundImage: `url(${memphisPattern})` }}
        ></div>
        <div 
          ref={topLayerRef} 
          className="top-split-layer"
          style={{ backgroundImage: `url(${memphisPattern})` }}
        ></div>
      </div>

      <div className="fixed-buttons-container">
        <ConfettiFireworksButton className="fixed-button right">
          <span role="img" aria-label="Fireworks">🎆</span>
        </ConfettiFireworksButton>
        <ConfettiSideCannonsButton className="fixed-button left">
          <span role="img" aria-label="Party Popper">🎉</span>
        </ConfettiSideCannonsButton>
      </div>
      
      <div className="content-wrapper">
        <header className="HomePage-header">
          <h1>Welcome to Jay's Website</h1>
        </header>
        <SocialTabs />
        <MainInfo />
      </div>

      
    </div>
  );
}

export default HomePage;