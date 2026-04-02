import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TimelineFeed from '../components/TimelineFeed';
import { Departure } from '../types/departure';

const makeDeparture = (id: string): Departure => ({
  id,
  name: `Person ${id}`,
  role: 'Safety Researcher',
  company: 'OpenAI',
  departure_date: 'May 2024',
  departure_date_sortable: '2024-05',
  source_url: `https://example.com/${id}`,
  verified: true,
});

describe('TimelineFeed', () => {
  it('renders the empty state message when the array is empty', () => {
    render(<TimelineFeed departures={[]} />);
    expect(screen.getByTestId('empty-state')).toHaveTextContent(
      'No departures on record for this filter.'
    );
  });

  it('renders the correct number of cards when departures are provided', () => {
    const departures = [makeDeparture('a'), makeDeparture('b'), makeDeparture('c')];
    render(<TimelineFeed departures={departures} />);
    // Three cards should be in the feed
    expect(screen.getAllByRole('article')).toHaveLength(3);
  });
});
