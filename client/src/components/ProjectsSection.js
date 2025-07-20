import React from 'react';
import ImageCarousel from './ImageCarousel';
import '../cssFiles/ProjectsSection.css';

function ProjectsSection() {
  return (
    <section className="projects-section">
      <h2>My Projects (Featuring Cats)</h2>
      <p>Here's a gallery of some of my favorite subjects to photograph.</p>
      <ImageCarousel />
      <h2>A little more serious Projects:</h2>
      
    </section>
  );
}

export default ProjectsSection;