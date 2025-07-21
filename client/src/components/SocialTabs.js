import React from 'react';

// Import social media icons
import { ReactComponent as GithubIcon } from '../assets/icons/github-icon.svg';
import { ReactComponent as LinkedInIcon } from '../assets/icons/linkedin-icon.svg';

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
  // Add more social media links here
  // {
  //   name: 'Twitter',
  //   url: 'https://twitter.com/your-handle',
  //   icon: <TwitterIcon />,
  // },
];

function SocialTabs() {
  return (
    <div className="social-tabs">
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