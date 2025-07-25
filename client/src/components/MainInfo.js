import React from 'react';
import AboutSection from './AboutSection';
import ProjectsSection from './ProjectsSection';
import SkillsSection from './SkillsSection';
import '../cssFiles/MainInfo.css';
import ContactSection from './ContactSection';

function MainInfo() {
  return (
    <main className="main-info-container">
      <ProjectsSection />
      <AboutSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}

export default MainInfo;