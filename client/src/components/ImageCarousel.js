import React, { useState } from 'react';

// Import all the cat images from the assets folder
import catImage1 from '../assets/FloatingCats/DSC08561.jpg';
import catImage2 from '../assets/FloatingCats/DSC08564.jpg';
import catImage3 from '../assets/FloatingCats/DSC08567.jpg';
import catImage5 from '../assets/FloatingCats/DSC08569-3.jpg';
import catImage7 from '../assets/FloatingCats/DSC08580.jpg';
import catImage9 from '../assets/FloatingCats/DSC08587.jpg';
import catImage10 from '../assets/FloatingCats/DSC08596.jpg';
import catImage11 from '../assets/FloatingCats/DSC08610.jpg';
import catImage12 from '../assets/FloatingCats/DSC08618.jpg';
import catImage13 from '../assets/FloatingCats/DSC08627.jpg';
import catImage14 from '../assets/FloatingCats/DSC08638.jpg';

// Create an array with all the imported images
const images = [
  catImage1,
  catImage2,
  catImage3,
  catImage5,
  catImage7,
  catImage9,
  catImage10,
  catImage11,
  catImage12,
  catImage13,
  catImage14,
];

function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-track">
        {images.map((image, index) => {
          const offset = index - currentIndex;
          const absOffset = Math.abs(offset);

          // Hide cards that are too far away for performance and aesthetics
          const isVisible = absOffset <= 2;

          const style = {
            transform: `rotateY(${offset * -35}deg) translateX(${offset * 35}%) translateZ(${absOffset * -200}px)`,
            opacity: isVisible ? 1 : 0,
            zIndex: images.length - absOffset,
          };

          return (
            <div key={index} className="carousel-image-wrapper" style={style}>
              <img src={image} alt={`Cat ${index + 1}`} className="carousel-image" />
            </div>
          );
        })}
      </div>
      <button onClick={goToPrevious} className="carousel-button prev-button">&lt;</button>
      <button onClick={goToNext} className="carousel-button next-button">&gt;</button>
    </div>
  );
}

export default ImageCarousel;