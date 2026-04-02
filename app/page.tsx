'use client';

import { useState, useMemo } from 'react';
import { Departure, CompanyFilter, SortOrder } from '@/types/departure';
import rawDepartures from '@/data/departures.json';
import HeroStatsBoard from '@/components/HeroStatsBoard';
import FilterSortBar from '@/components/FilterSortBar';
import TimelineFeed from '@/components/TimelineFeed';
import MethodologyFooter from '@/components/MethodologyFooter';

// Filter to verified only at build time (static data)
const verifiedDepartures: Departure[] = (rawDepartures as Departure[]).filter(
  (d) => d.verified === true
);

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<CompanyFilter>('All');
  const [activeSort, setActiveSort] = useState<SortOrder>('newest');

  const displayedDepartures = useMemo(() => {
    const filtered =
      activeFilter === 'All'
        ? verifiedDepartures
        : verifiedDepartures.filter((d) => d.company === activeFilter);

    return [...filtered].sort((a, b) => {
      const aDate = a.departure_date_sortable;
      const bDate = b.departure_date_sortable;
      return activeSort === 'newest'
        ? bDate.localeCompare(aDate)
        : aDate.localeCompare(bDate);
    });
  }, [activeFilter, activeSort]);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero stats — always uses full verified array, never filtered */}
        <HeroStatsBoard departures={verifiedDepartures} />

        {/* Filter + sort controls */}
        <FilterSortBar
          activeFilter={activeFilter}
          activeSort={activeSort}
          onFilterChange={setActiveFilter}
          onSortChange={setActiveSort}
        />

        {/* Sorted + filtered cards */}
        <TimelineFeed departures={displayedDepartures} />

        {/* Methodology */}
        <MethodologyFooter />
      </div>
    </main>
  );
}
