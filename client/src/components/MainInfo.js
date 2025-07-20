import React from 'react';
import AboutSection from './AboutSection';
import ProjectsSection from './ProjectsSection';
import '../cssFiles/MainInfo.css';

function MainInfo() {
  return (
    <main className="main-info-container">
      <AboutSection />
      <ProjectsSection />
    </main>
  );
}

export default MainInfo;