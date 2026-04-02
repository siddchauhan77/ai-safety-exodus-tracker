import { Departure } from '@/types/departure';

interface HeroStatsBoardProps {
  departures: Departure[];
}

const COMPANY_LABELS: Record<string, string> = {
  OpenAI: 'OpenAI',
  Anthropic: 'Anthropic',
  'Google DeepMind': 'DeepMind',
  Other: 'Other',
};

export default function HeroStatsBoard({ departures }: HeroStatsBoardProps) {
  const total = departures.length;
  const byCompany = (company: string) =>
    departures.filter((d) => d.company === company).length;

  const stats = [
    { label: 'Total Exits', value: total, highlight: true },
    { label: 'OpenAI', value: byCompany('OpenAI'), highlight: false },
    { label: 'Anthropic', value: byCompany('Anthropic'), highlight: false },
    { label: 'DeepMind', value: byCompany('Google DeepMind'), highlight: false },
    { label: 'Other', value: byCompany('Other'), highlight: false },
  ];

  return (
    <header className="border-b border-zinc-800 pb-10 mb-10">
      {/* Logo + title */}
      <div className="flex items-center gap-3 mb-3">
        <svg
          aria-label="Frontier AI Safety Exodus Tracker"
          viewBox="0 0 32 32"
          fill="none"
          className="w-8 h-8 shrink-0"
          role="img"
        >
          {/* Departing arrow from a circle — represents exit/exodus */}
          <circle cx="13" cy="16" r="9" stroke="currentColor" strokeWidth="1.5" className="text-red-400" />
          <path
            d="M20 16h10M26 12l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-red-400"
          />
          <path
            d="M13 10v3M13 19v3M8.5 11.5l2.1 2.1M15.4 18.4l2.1 2.1M7 16h3M17.5 11.5l-2.1 2.1M10.6 18.4l-2.1 2.1"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            className="text-zinc-500"
          />
        </svg>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
          Frontier AI Safety Exodus Tracker
        </h1>
      </div>

      <p className="text-zinc-400 text-sm mb-8 max-w-2xl">
        A verified, primary-source record of AI safety researchers leaving frontier labs.
      </p>

      {/* Stat pills */}
      <div className="flex flex-wrap gap-3" data-testid="hero-stats">
        {stats.map((stat) => (
          <div
            key={stat.label}
            data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${
              stat.highlight
                ? 'bg-red-950/40 border-red-800/50 text-red-300'
                : 'bg-zinc-900 border-zinc-700 text-zinc-300'
            }`}
          >
            <span className="text-zinc-500 font-normal">{stat.label}:</span>
            <span className={stat.highlight ? 'text-red-300 font-bold' : 'text-zinc-100 font-semibold'}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </header>
  );
}
