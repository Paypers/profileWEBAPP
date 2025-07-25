import React from 'react';
import SkillPill from './SkillPill';
import '../cssFiles/SkillsSection.css';

const languages = [
  { name: 'Scala', url: 'https://www.scala-lang.org/' },
  { name: 'Python', url: 'https://www.python.org/' },
  { name: 'C/C++', url: 'https://isocpp.org/' },
  { name: 'JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { name: 'Assembly (MIPS)', url: 'https://en.wikipedia.org/wiki/MIPS_architecture' },
  { name: 'Unreal Engine 5 (novice)', url: 'https://www.unrealengine.com/' },
  { name: 'Go (novice)', url: 'https://go.dev/' },
  { name: 'HTML/CSS', url: 'https://developer.mozilla.org/en-US/docs/Web' },
];

const developerTools = [
  { name: 'GitHub', url: 'https://github.com/' },
  { name: 'ZenHub', url: 'https://www.zenhub.com/' },
  { name: 'VS Code', url: 'https://code.visualstudio.com/' },
  { name: 'Visual Studio', url: 'https://visualstudio.microsoft.com/' },
  { name: 'PyCharm', url: 'https://www.jetbrains.com/pycharm/' },
  { name: 'IntelliJ', url: 'https://www.jetbrains.com/idea/' },
];

function SkillsSection() {
  return (
    <section id="skills-section" className="skills-section">
      <h2>Skills</h2>
      <h3 className="skills-subtitle">Languages</h3>
      <div className="skills-container">
        {languages.map((skill) => (
          <SkillPill key={skill.name} text={skill.name} url={skill.url} />
        ))}
      </div>
      <h3 className="skills-subtitle">Developer Tools</h3>
      <div className="skills-container">
        {developerTools.map((skill) => (
          <SkillPill key={skill.name} text={skill.name} url={skill.url} />
        ))}
      </div>
    </section>
  );
}

export default SkillsSection;