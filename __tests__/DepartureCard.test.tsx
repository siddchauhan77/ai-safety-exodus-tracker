import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DepartureCard from '../components/DepartureCard';
import { Departure } from '../types/departure';

const baseDeparture: Departure = {
  id: 'jan-leike-openai-2024',
  name: 'Jan Leike',
  role: 'Superalignment Co-lead',
  company: 'OpenAI',
  departure_date: 'May 2024',
  departure_date_sortable: '2024-05',
  quote: 'Safety culture took a back seat.',
  destination: 'Anthropic',
  source_url: 'https://twitter.com/janleike/status/123',
  verified: true,
};

describe('DepartureCard', () => {
  it('renders name, role, company, date, quote, destination, and source link', () => {
    render(<DepartureCard departure={baseDeparture} />);
    expect(screen.getByText('Jan Leike')).toBeInTheDocument();
    expect(screen.getByText('Superalignment Co-lead')).toBeInTheDocument();
    expect(screen.getByText('OpenAI')).toBeInTheDocument();
    expect(screen.getByText('May 2024')).toBeInTheDocument();
    expect(screen.getByText(/Safety culture took a back seat/)).toBeInTheDocument();
    expect(screen.getByText('Anthropic')).toBeInTheDocument();
    const link = screen.getByTestId('source-link-jan-leike-openai-2024');
    expect(link).toHaveAttribute('href', 'https://twitter.com/janleike/status/123');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders "Destination unknown" when destination is absent', () => {
    const noDestination: Departure = { ...baseDeparture, destination: null };
    render(<DepartureCard departure={noDestination} />);
    expect(screen.getByText('Destination unknown')).toBeInTheDocument();
  });

  it('does not render quote block when quote is absent', () => {
    const noQuote: Departure = { ...baseDeparture, quote: null };
    render(<DepartureCard departure={noQuote} />);
    expect(screen.queryByRole('blockquote')).not.toBeInTheDocument();
  });

  it('renders nothing when verified is false', () => {
    const unverified: Departure = { ...baseDeparture, verified: false };
    const { container } = render(<DepartureCard departure={unverified} />);
    expect(container.firstChild).toBeNull();
  });
});
