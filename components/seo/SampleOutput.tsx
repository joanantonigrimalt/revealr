import type { SampleFlag } from '@/content/seo-pages';

type Props = {
  h2: string;
  documentLabel: string;
  flags: SampleFlag[];
};

const SEVERITY_CONFIG = {
  CRITICAL: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    badge: 'bg-red-100 text-red-700 border-red-200',
    dot: 'bg-red-500',
  },
  WARNING: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    badge: 'bg-amber-100 text-amber-700 border-amber-200',
    dot: 'bg-amber-500',
  },
  INFO: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    badge: 'bg-blue-100 text-blue-700 border-blue-200',
    dot: 'bg-blue-500',
  },
};

export default function SampleOutput({ h2, documentLabel, flags }: Props) {
  return (
    <section id="sample" className="py-14 px-4 bg-bg-card border-y border-border-base">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-primary mb-2">{h2}</h2>
        <p className="text-text-secondary mb-8">
          Here is what a Revealr analysis looks like for a real {documentLabel}.
        </p>

        {/* Mock report header */}
        <div className="rounded-2xl border border-border-base bg-white overflow-hidden shadow-sm">
          <div className="bg-bg-base border-b border-border-base px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-accent font-serif font-bold text-sm">R</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-text-primary">Revealr Analysis</div>
                <div className="text-xs text-text-muted">{documentLabel}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-text-muted">Risk Score</div>
              <div className="text-lg font-bold text-text-primary">74 / 100</div>
            </div>
          </div>

          <div className="p-5 space-y-4">
            {flags.map((flag, i) => {
              const cfg = SEVERITY_CONFIG[flag.severity];
              return (
                <div key={i} className={`rounded-xl border p-4 ${cfg.bg} ${cfg.border}`}>
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${cfg.dot}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${cfg.badge}`}>
                          {flag.severity}
                        </span>
                        <span className="text-xs text-text-muted font-mono">{flag.section}</span>
                      </div>
                      <div className="text-sm font-semibold text-text-primary mb-1">{flag.title}</div>
                      <p className="text-xs text-text-secondary leading-relaxed">{flag.body}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
