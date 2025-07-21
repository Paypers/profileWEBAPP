import React from 'react';
import '../cssFiles/AboutSection.css';
import GraduateUb from './Graduate_UB';
import SkillPill from './SkillPill';

// You can list your skills or interests here
const skills = [
  'Scala',
  'Python',
  'Go',
  'React',
  'JavaScript',
  'Unreal Engine 5',
  'C++',
  'SQL',
  'Docker',
  'Git',
];

function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-content-wrapper">
        <GraduateUb />
        <div className="about-text">
          <h2>About Me</h2>
          <p>
            I am a recent Computer Science graduate from the University at Buffalo with a strong foundation in software development and a passion for creating innovative solutions. My project experience spans application development in Scala, Python, and Go, along with game development in Unreal Engine 5. To complement my technical abilities, I have honed my leadership skills as a Production Technical Director, successfully guiding teams to deliver high-quality results in fast-paced event environments. I am eager to apply my technical knowledge and a collaborative spirit to a challenging software engineering role.
          </p>
          <p>
            On a personal note, photography is one of my greatest hobbies. I invite you to enjoy some of my favorite photos, featured alongside my projects 😊
          </p>

          <div className="skills-container">
            {skills.map((skill) => (
              <SkillPill key={skill} text={skill} />
            ))}
          </div>
        </div>
        
      </div>

      
    </section>
    
  );
}

export default AboutSection;  