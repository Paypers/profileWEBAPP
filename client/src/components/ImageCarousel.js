import React, { useState } from 'react';

import '../cssFiles/ImageCarousel.css';
// Import SVG icons for carousel buttons
import { ReactComponent as LeftArrow } from '../assets/icons/arrow-left-2-svgrepo-com.svg';
import { ReactComponent as RightArrow } from '../assets/icons/arrow-right-2-svgrepo-com.svg';

// Import all the cat images from the assets folder
// It's highly recommended to resize and compress your images for web use to improve performance.
// For example, you can resize your images to be ~810px wide and save them in the WebP format.
// I've updated the imports below assuming you've renamed your optimized images sequentially.
import catImage1 from '../assets/FloatingCats/cat-1.webp';
import catImage2 from '../assets/FloatingCats/cat-2.webp';
import catImage3 from '../assets/FloatingCats/cat-3.webp';
import catImage4 from '../assets/FloatingCats/cat-4.webp';
import catImage5 from '../assets/FloatingCats/cat-5.webp';
import catImage6 from '../assets/FloatingCats/cat-6.webp';
import catImage7 from '../assets/FloatingCats/cat-7.webp';
import catImage8 from '../assets/FloatingCats/cat-8.webp';
import catImage9 from '../assets/FloatingCats/cat-9.webp';
import catImage10 from '../assets/FloatingCats/cat-10.webp';
import catImage11 from '../assets/FloatingCats/cat-11.webp';

// Create an array with all the imported images
const images = [
  catImage1,
  catImage2,
  catImage3,
  catImage4,
  catImage5,
  catImage6,
  catImage7,
  catImage8,
  catImage9,
  catImage10,
  catImage11,
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

  const numImages = images.length;

  return (
    <div className="carousel-container">
      <div className="carousel-track">
        {images.map((image, index) => {
          let offset = index - currentIndex;

          // This logic handles the circular nature of the carousel.
          // It calculates the shortest distance between images to create a wrapping effect.
          if (offset > numImages / 2) {
            offset -= numImages;
          } else if (offset < -numImages / 2) {
            offset += numImages;
          }

          const absOffset = Math.abs(offset);

          // Render one extra card on each side and set its opacity to 0.
          // This allows it to be transitioned in instead of just appearing.
          const isVisible = absOffset <= 3;

          if (!isVisible) {
            return null; // Don't render the element at all if it's not visible
          }

          // Make the center card 10% larger and fade out the side cards.
          const scale = absOffset === 0 ? 1.2 : 1;
          const newOpacity = absOffset > 2 ? 0 : absOffset === 0 ? 1 : 0.6 ;
          const style = {
            transform: `rotateY(${offset * -35}deg) translateX(${offset * 35}%) translateZ(${absOffset * -213}px) scale(${scale})`,
            opacity: newOpacity,
            zIndex: images.length - absOffset,
          };

          return (
            <div key={index} className="carousel-image-wrapper" style={style}>
              <img src={image} alt={`Cat ${index + 1}`} className="carousel-image" />
            </div>
          );
        })}
      </div>
      <button onClick={goToPrevious} className="carousel-button prev-button">
        <LeftArrow />
      </button>
      <button onClick={goToNext} className="carousel-button next-button">
        <RightArrow />
      </button>
    </div>
  );
}

export default ImageCarousel;