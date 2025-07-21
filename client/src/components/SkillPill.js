import React from 'react';
import PropTypes from 'prop-types';
import '../cssFiles/SkillPill.css';

function SkillPill({ text }) {
  return <div className="skill-pill">{text}</div>;
}

SkillPill.propTypes = {
  text: PropTypes.string.isRequired,
};

export default SkillPill;