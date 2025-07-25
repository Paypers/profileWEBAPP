import { render, screen } from '@testing-library/react';
import App from './App';
// Import the mocked module to change its implementation for different tests
import { getIntroSeenCookie } from './utils/cookies';

// Mock the cookie utility so we can control the test environment
jest.mock('./utils/cookies');

describe('App component rendering', () => {
  test('renders the intro overlay for a new user', () => {
    // For this test, simulate a new user (no cookie)
    getIntroSeenCookie.mockReturnValue(undefined);

    render(<App />);
    // The welcome message is in the IntroOverlay, which is shown first.
    const welcomeElement = screen.getByText(/Welcome To Jay's Website/i);
    expect(welcomeElement).toBeInTheDocument();
  });

  test('renders the homepage directly for a returning user', () => {
    // For this test, simulate a returning user (cookie is present)
    getIntroSeenCookie.mockReturnValue('true');

    render(<App />);
    // A returning user should see the homepage content.
    // We can check for a heading that's only on the homepage.
    const projectsHeader = screen.getByRole('heading', { name: /My Projects/i });
    expect(projectsHeader).toBeInTheDocument();

    // We can also assert that the intro is NOT present
    const welcomeElement = screen.queryByText(/Welcome To Jay's Website/i);
    expect(welcomeElement).not.toBeInTheDocument();
  });
});
