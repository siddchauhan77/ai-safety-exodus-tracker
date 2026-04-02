export default function MethodologyFooter() {
  const GITHUB_DATA_URL =
    'https://github.com/sidd-chauhan77/ai-safety-exodus-tracker/blob/main/data/departures.json';

  return (
    <footer className="mt-16 pt-8 border-t border-zinc-800 text-sm text-zinc-500 space-y-4 pb-12">
      <h3 className="text-zinc-400 font-semibold text-xs uppercase tracking-wider">
        Methodology &amp; Inclusion Criteria
      </h3>

      <p className="max-w-2xl leading-relaxed">
        <strong className="text-zinc-400 font-medium">Who is included:</strong> Researchers with an
        explicit AI safety mandate at a frontier AGI lab (OpenAI, Anthropic, Google DeepMind, or
        comparable organizations). The departure must be documented via a primary source — a public
        statement, tweet, blog post, or contemporaneous news report with a direct quote or
        confirmation.
      </p>

      <p className="max-w-2xl leading-relaxed">
        <strong className="text-zinc-400 font-medium">Who is excluded:</strong> Product managers,
        engineers, and researchers without a documented safety mandate. Departures without a
        verifiable primary source. Entries are only shown when{' '}
        <code className="text-zinc-400 bg-zinc-800 px-1 rounded text-xs">verified: true</code> in
        the data file.
      </p>

      <p className="max-w-2xl leading-relaxed">
        <strong className="text-zinc-400 font-medium">Data updates:</strong> Entries are added
        manually from primary sources. Each entry is linked to its source. No entry reaches
        production without passing automated validation.
      </p>

      <p>
        <a
          href={GITHUB_DATA_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="raw-data-link"
          className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 transition-colors underline underline-offset-4"
        >
          View raw departures.json on GitHub
          <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
            <path
              d="M2 10L10 2M5 2h5v5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </p>
    </footer>
  );
}
