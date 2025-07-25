import React from 'react';
import PropTypes from 'prop-types';
import '../cssFiles/SkillPill.css';

function SkillPill({ text, url }) {
  // If a URL is provided, render a clickable anchor tag
  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="skill-pill"
      >
        {text}
      </a>
    );
  }

  // Otherwise, render a non-clickable div
  return <div className="skill-pill">{text}</div>;
}

SkillPill.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string,
};

SkillPill.defaultProps = {
  url: null,
};

export default SkillPill;