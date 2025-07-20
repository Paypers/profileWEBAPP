import React from 'react';
import ImageCarousel from './ImageCarousel';
import ProjectCard from './ProjectCard'; // Import the new component
import '../cssFiles/ProjectsSection.css';
import '../cssFiles/ProjectCard.css'; // Import the new CSS

// Placeholder data for your "serious" projects.
// You can replace this with your actual project information.
const seriousProjects = [
  {
    id: 1,
    title: 'Project One',
    description: 'This is a brief description of Project One. It solves a real-world problem using modern technologies.',
    imageUrl: 'https://via.placeholder.com/320x180.png?text=Project+One',
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 2,
    title: 'Project Two',
    description: 'A description for Project Two, highlighting the key features and the tech stack used.',
    imageUrl: 'https://via.placeholder.com/320x180.png?text=Project+Two',
    liveUrl: null, // Example of a project without a live demo
    repoUrl: '#',
  },
  {
    id: 3,
    title: 'Project Three',
    description: 'Project Three is a collaborative effort that showcases teamwork and complex problem-solving.',
    imageUrl: 'https://via.placeholder.com/320x180.png?text=Project+Three',
    liveUrl: '#',
    repoUrl: '#',
  },
];

function ProjectsSection() {
  return (
    <section className="projects-section">
      <h2>My Projects (Featuring Cats)</h2>
      <p>Here's a gallery of some of my favorite subjects to photograph.</p>
      <ImageCarousel />
      <h2>A little more serious Projects:</h2>
      <div className="project-list">
        {seriousProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

export default ProjectsSection;