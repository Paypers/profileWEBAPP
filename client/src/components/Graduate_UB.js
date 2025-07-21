import React, { useState } from 'react';
import '../cssFiles/Graduate_UB.css';

// Re-using the fun cat images from the carousel for this component.
// You can replace these with your own graduation or university-related photos.
import MeImage from '../assets/UB-Pics/Me-1.webp';
import Ub1 from '../assets/UB-Pics/UB-1.webp';
import Ub2 from '../assets/UB-Pics/UB-2.webp';  
import Ub3 from '../assets/UB-Pics/UB-3.webp';
import Ub4 from '../assets/UB-Pics/UB-4.webp';
import Ub5 from '../assets/UB-Pics/UB-5.webp';

const gradImages = [
  MeImage,
  Ub1,
  Ub2,
  Ub3,
  Ub4,
  Ub5,
];

function Graduate_UB() {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleClick = () => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
    } else {
      // Cycle to the next image, looping back to the start
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % gradImages.length);
    }
  };

  return (
    <div className="graduate-ub-container" onClick={handleClick}>
      {/* Always render the image, which will be the first one on load */}
      <img key={currentImageIndex} src={gradImages[currentImageIndex]} alt="A fun moment" className="graduate-image" />

      {/* Conditionally render the "Click Me" overlay on top for the first load */}
      {isFirstLoad && (
        <div className="click-me-overlay">
          <span>Click Me!</span>
        </div>
      )}
    </div>
  );
}

export default Graduate_UB;