import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AboutPage from './AboutPage';
import { MemoryRouter } from 'react-router';
describe('AboutPage', () => {
  it('renders main heading and content with links', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { name: /about me/i }),
    ).toBeInTheDocument();

    expect(screen.getByText(/my name is timofey/i)).toBeInTheDocument();
    expect(
      screen.getByText(/became interested in programming/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/hope i can make it/i)).toBeInTheDocument();

    const rsCourseLink = screen.getByRole('link', {
      name: /rs school react course/i,
    });
    expect(rsCourseLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs',
    );
    expect(rsCourseLink).toHaveAttribute('target', '_blank');
    expect(rsCourseLink).toHaveAttribute('rel', 'noopener noreferrer');

    const githubLink = screen.getByRole('link', {
      name: /github\.com\/tim1234444/i,
    });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/tim1234444');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
