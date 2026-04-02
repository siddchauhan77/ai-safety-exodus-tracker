import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FilterSortBar from '../components/FilterSortBar';

describe('FilterSortBar', () => {
  it('calls onFilterChange with the correct company when a filter button is clicked', () => {
    const onFilterChange = vi.fn();
    const onSortChange = vi.fn();
    render(
      <FilterSortBar
        activeFilter="All"
        activeSort="newest"
        onFilterChange={onFilterChange}
        onSortChange={onSortChange}
      />
    );
    fireEvent.click(screen.getByTestId('filter-openai'));
    expect(onFilterChange).toHaveBeenCalledWith('OpenAI');
  });

  it('calls onSortChange with "oldest" when the Oldest First option is selected', () => {
    const onFilterChange = vi.fn();
    const onSortChange = vi.fn();
    render(
      <FilterSortBar
        activeFilter="All"
        activeSort="newest"
        onFilterChange={onFilterChange}
        onSortChange={onSortChange}
      />
    );
    fireEvent.change(screen.getByTestId('sort-select'), { target: { value: 'oldest' } });
    expect(onSortChange).toHaveBeenCalledWith('oldest');
  });
});
