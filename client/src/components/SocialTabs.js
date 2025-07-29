import React from 'react';

// Import social media icons
import { ReactComponent as GithubIcon } from '../assets/icons/github-icon.svg';
import { ReactComponent as LinkedInIcon } from '../assets/icons/linkedin-icon.svg';
import { ReactComponent as InstagramIcon } from '../assets/icons/instagram-icon.svg';

// Import the CSS for this component
import '../cssFiles/SocialTabs.css';

// You can add more social links here
const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/Paypers',
    icon: <GithubIcon />,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/jielili/',
    icon: <LinkedInIcon />,
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/jayl.shotss/',
    icon: <InstagramIcon />,
  },
];

// --- CHANGE --- Accept the onRestartIntro prop
function SocialTabs({ onRestartIntro }) {
  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -80;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="social-tabs">
      <button onClick={() => handleScrollToSection('about-section')} className="nav-action-button">
        About Me
      </button>
      <button onClick={() => handleScrollToSection('contact-section')} className="nav-action-button">
        Contact Me
      </button>
      {/* --- NEW --- The button to restart the intro */}
      <button onClick={onRestartIntro} className="nav-action-button">
        Intro again!
      </button>
      {socialLinks.map(social => (
        <a 
          key={social.name} 
          href={social.url} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label={social.name}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}

export default SocialTabs;