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
    url: 'https://github.com/Paypers', // TODO: Replace with your GitHub URL
    icon: <GithubIcon />,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/jielili/', // TODO: Replace with your LinkedIn URL
    icon: <LinkedInIcon />,
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/jayl.shotss/', // TODO: Replace with your Instagram URL
    icon: <InstagramIcon />,
  },
  // Add more social media links here
  // {
  //   name: 'Twitter',
  //   url: 'https://twitter.com/your-handle',
  //   icon: <TwitterIcon />,
  // },
];

function SocialTabs() {
  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      // Use smooth scrolling for a better user experience
      aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="social-tabs">
      <button onClick={handleScrollToAbout} className="about-me-button">
        About Me
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