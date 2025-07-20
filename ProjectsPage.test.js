import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProjectsPage from './ProjectsPage';

// Mock the ProjectList component to avoid testing its implementation details here
jest.mock('../components/ProjectList', () => () => <div>ProjectList Mock</div>);

describe('ProjectsPage', () => {
  test('renders the page with heading and back link', () => {
    render(
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /my projects/i })).toBeInTheDocument();
    expect(screen.getByText(/here are some of the projects i've worked on/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to home/i })).toBeInTheDocument();
    expect(screen.getByText('ProjectList Mock')).toBeInTheDocument();
  });
});