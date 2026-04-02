import { CompanyFilter, SortOrder } from '@/types/departure';

interface FilterSortBarProps {
  onFilterChange: (company: CompanyFilter) => void;
  onSortChange: (sort: SortOrder) => void;
  activeFilter: CompanyFilter;
  activeSort: SortOrder;
}

const FILTER_OPTIONS: CompanyFilter[] = ['All', 'OpenAI', 'Anthropic', 'Google DeepMind', 'Other'];

export default function FilterSortBar({
  onFilterChange,
  onSortChange,
  activeFilter,
  activeSort,
}: FilterSortBarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8" data-testid="filter-sort-bar">
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by company">
        {FILTER_OPTIONS.map((company) => (
          <button
            key={company}
            data-testid={`filter-${company.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => onFilterChange(company)}
            aria-pressed={activeFilter === company}
            className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
              activeFilter === company
                ? 'bg-zinc-100 text-zinc-900 border-zinc-100'
                : 'bg-transparent text-zinc-400 border-zinc-700 hover:border-zinc-500 hover:text-zinc-300'
            }`}
          >
            {company}
          </button>
        ))}
      </div>

      {/* Spacer */}
      <div className="hidden sm:block flex-1" />

      {/* Sort selector */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-zinc-500 shrink-0">Sort:</span>
        <select
          data-testid="sort-select"
          value={activeSort}
          onChange={(e) => onSortChange(e.target.value as SortOrder)}
          aria-label="Sort departures"
          className="bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs rounded-md px-3 py-1.5 cursor-pointer focus:outline-none focus:ring-1 focus:ring-zinc-500"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
    </div>
  );
}
