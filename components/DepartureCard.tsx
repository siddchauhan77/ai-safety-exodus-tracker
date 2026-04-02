import { Departure } from '@/types/departure';

interface DepartureCardProps {
  departure: Departure;
}

const COMPANY_COLORS: Record<string, string> = {
  OpenAI: 'bg-emerald-950/50 text-emerald-400 border-emerald-800/40',
  Anthropic: 'bg-amber-950/50 text-amber-400 border-amber-800/40',
  'Google DeepMind': 'bg-blue-950/50 text-blue-400 border-blue-800/40',
  Other: 'bg-zinc-800/50 text-zinc-400 border-zinc-700/40',
};

export default function DepartureCard({ departure }: DepartureCardProps) {
  // Defensive guard: never render unverified entries
  if (!departure.verified) return null;

  const companyColor = COMPANY_COLORS[departure.company] ?? COMPANY_COLORS['Other'];

  return (
    <article
      data-testid={`departure-card-${departure.id}`}
      className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col gap-4 hover:border-zinc-700 transition-colors"
    >
      {/* Header: name + role */}
      <div>
        <h2 className="text-zinc-100 font-semibold text-base leading-tight">
          {departure.name}
        </h2>
        <p className="text-zinc-500 text-sm mt-0.5">{departure.role}</p>
      </div>

      {/* Company badge + date */}
      <div className="flex items-center gap-3 flex-wrap">
        <span
          data-testid={`badge-company-${departure.id}`}
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${companyColor}`}
        >
          {departure.company}
        </span>
        <span className="text-zinc-500 text-xs">{departure.departure_date}</span>
      </div>

      {/* Quote block — only if present */}
      {departure.quote && (
        <blockquote className="border-l-2 border-zinc-700 pl-4 text-zinc-400 text-sm italic leading-relaxed">
          &ldquo;{departure.quote}&rdquo;
        </blockquote>
      )}

      {/* Destination */}
      <p className="text-sm">
        <span className="text-zinc-600 text-xs uppercase tracking-wider font-medium">Next: </span>
        {departure.destination ? (
          <span className="text-zinc-300">{departure.destination}</span>
        ) : (
          <span className="text-zinc-600 italic">Destination unknown</span>
        )}
      </p>

      {/* Primary source link */}
      <a
        href={departure.source_url}
        target="_blank"
        rel="noopener noreferrer"
        data-testid={`source-link-${departure.id}`}
        className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-200 transition-colors group mt-auto pt-2 border-t border-zinc-800/60"
      >
        Primary Source
        <svg
          viewBox="0 0 12 12"
          fill="none"
          className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
        >
          <path
            d="M2 10L10 2M5 2h5v5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </article>
  );
}
