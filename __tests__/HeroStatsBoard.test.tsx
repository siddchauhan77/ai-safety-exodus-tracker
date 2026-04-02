import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HeroStatsBoard from '../components/HeroStatsBoard';
import { Departure } from '../types/departure';

const makeDeparture = (id: string, company: Departure['company']): Departure => ({
  id,
  name: `Person ${id}`,
  role: 'Safety Researcher',
  company,
  departure_date: 'May 2024',
  departure_date_sortable: '2024-05',
  source_url: `https://example.com/${id}`,
  verified: true,
});

describe('HeroStatsBoard', () => {
  it('stat counts reflect the full array regardless of what is displayed', () => {
    // Simulate 3 OpenAI, 1 Anthropic — total 4
    const departures: Departure[] = [
      makeDeparture('a', 'OpenAI'),
      makeDeparture('b', 'OpenAI'),
      makeDeparture('c', 'OpenAI'),
      makeDeparture('d', 'Anthropic'),
    ];

    render(<HeroStatsBoard departures={departures} />);

    const totalStat = screen.getByTestId('stat-total-exits');
    expect(totalStat).toHaveTextContent('4');

    const openaiStat = screen.getByTestId('stat-openai');
    expect(openaiStat).toHaveTextContent('3');

    const anthropicStat = screen.getByTestId('stat-anthropic');
    expect(anthropicStat).toHaveTextContent('1');

    const deepmindStat = screen.getByTestId('stat-deepmind');
    expect(deepmindStat).toHaveTextContent('0');
  });
});
