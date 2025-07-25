import React from 'react';
import ImageCarousel from './ImageCarousel';
import ProjectCard from './ProjectCard'; // Import the new component
import '../cssFiles/ProjectsSection.css';
import '../cssFiles/ProjectCard.css'; // Import the new CSS

// Import your project images here.
// This allows Webpack to process them and provide the correct path.
import pythonProjectImage from '../assets/ProjectImages/Python.png';
import scalaProjectImage from '../assets/ProjectImages/Scala.svg';
import mipsProjectImage from '../assets/ProjectImages/Mips.png';
import goProjectImage from '../assets/ProjectImages/GoLang.png';
import ue5ProjectImage from '../assets/ProjectImages/Unreal.png';
import reactProjectImage from '../assets/ProjectImages/React.png';

const seriousProjects = [
  {
      id: 1,
      title: 'Python Bottle Server',
      description: 'Built a Python web server with Bottle and Plot.ly to visualize city data using HTML/CSS.',
      imageUrl: pythonProjectImage,
      repoUrl: '#' // TODO: Add link to your repository
    },
    {
      id: 2,
      title: 'Scala POS System',
      description: 'Created a point-of-sale (POS) system simulation in Scala, implementing features like BOGO deals and loyalty discounts.',
      imageUrl: scalaProjectImage, // Replace with an imported image when available
      repoUrl: '#' // TODO: Add link to your repository
    },
    {
      id: 3,
      title: 'MIPS Adder Project',
      description: 'Built a 1-bit and 8-bit Arithmetic Logic Unit (ALU) from scratch using MIPS assembly language.',
      imageUrl: mipsProjectImage, // Replace with an imported image when available
      repoUrl: '#' // TODO: Add link to your repository
    },
    {
      id: 4,
      title: 'Parallel Map & Reduce Files',
      description: 'Wrote a parallel word counter in Go using the MapReduce concept to efficiently analyze multiple files at once.',
      imageUrl: goProjectImage, // Replace with an imported image when available
      repoUrl: '#' // TODO: Add link to your repository
    },
    {
      id: 5,
      title: 'College Student Simulator',
      description: 'In a 5-person agile team, developed a game in Unreal Engine 5, creating 3D models with Blender and delivering two vertical slices.',
      imageUrl: ue5ProjectImage, // Replace with an imported image when available
      repoUrl: '#' // TODO: Add link to your repository
    },
    {
      id: 6,
      title: 'Self-Intro Website',
      description: 'A personal profile website built with React, showcasing some of my skills, projects, and personality :))\\n\\n[Currently in development]',
      imageUrl: reactProjectImage, // Replace with an imported image when available
      repoUrl: '#' // TODO: Add link to your repository
    }
];

function ProjectsSection() {
  return (
    <section className="projects-section">
      <h2>My Projects (Featuring Cats)</h2>
      <p>Here's a gallery of some of my favorite subjects to photograph.</p>
      <ImageCarousel />
      <h2>A little more serious Projects:</h2>
      <div className="project-list">
        {[...seriousProjects].reverse().map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

export default ProjectsSection;