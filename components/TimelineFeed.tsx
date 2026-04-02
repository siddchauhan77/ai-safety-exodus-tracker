import { Departure } from '@/types/departure';
import DepartureCard from './DepartureCard';

interface TimelineFeedProps {
  departures: Departure[];
}

export default function TimelineFeed({ departures }: TimelineFeedProps) {
  if (departures.length === 0) {
    return (
      <p
        data-testid="empty-state"
        className="text-zinc-600 text-sm py-12 text-center"
      >
        No departures on record for this filter.
      </p>
    );
  }

  return (
    <div
      data-testid="timeline-feed"
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
    >
      {departures.map((departure) => (
        <DepartureCard key={departure.id} departure={departure} />
      ))}
    </div>
  );
}
