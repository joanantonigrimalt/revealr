import type { SampleFlag } from '@/content/seo-pages';

type Props = {
  h2: string;
  documentLabel: string;
  flags: SampleFlag[];
};

const SEVERITY_CONFIG = {
  CRITICAL: {
    bg: 'bg-[#fef2f2]',
    border: 'border-[#fecaca]',
    badge: 'bg-[#fef2f2] text-[#dc2626] border-[#fecaca]',
    dot: 'bg-[#dc2626]',
    label: 'CRITICAL',
  },
  WARNING: {
    bg: 'bg-[#fffbeb]',
    border: 'border-[#fde68a]',
    badge: 'bg-[#fffbeb] text-[#d97706] border-[#fde68a]',
    dot: 'bg-[#d97706]',
    label: 'WARNING',
  },
  INFO: {
    bg: 'bg-[#eff6ff]',
    border: 'border-[#bfdbfe]',
    badge: 'bg-[#eff6ff] text-[#2563eb] border-[#bfdbfe]',
    dot: 'bg-[#2563eb]',
    label: 'INFO',
  },
};

export default function SampleOutput({ h2, documentLabel, flags }: Props) {
  return (
    <section id="sample" className="py-14 px-6 bg-white border-y border-[#e8e4df]">
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold text-[#1a1814] mb-2"
          style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '-0.02em' }}
        >
          {h2}
        </h2>
        <p className="text-[#6b6560] mb-8 text-sm">
          Here is what a Revealr analysis looks like for a real {documentLabel}.
        </p>

        {/* Mock report card */}
        <div className="rounded-2xl border border-[#e8e4df] bg-[#faf9f7] overflow-hidden shadow-sm">
          {/* Report header */}
          <div className="bg-white border-b border-[#e8e4df] px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#fdf0eb] flex items-center justify-center">
                <span
                  className="text-[#e8572a] font-bold text-sm"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  R
                </span>
              </div>
              <div>
                <div className="text-sm font-semibold text-[#1a1814]">Revealr Analysis</div>
                <div className="text-xs text-[#9c9590]">{documentLabel}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-[#9c9590]">Risk Score</div>
              <div className="text-xl font-bold text-[#1a1814]">74 <span className="text-sm font-normal text-[#9c9590]">/ 100</span></div>
            </div>
          </div>

          {/* Flags */}
          <div className="p-5 space-y-3">
            {flags.map((flag, i) => {
              const cfg = SEVERITY_CONFIG[flag.severity];
              return (
                <div
                  key={i}
                  className={`rounded-xl border p-4 ${cfg.bg} ${cfg.border}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-1.5 ${cfg.dot}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${cfg.badge}`}
                        >
                          {cfg.label}
                        </span>
                        <span className="text-[11px] text-[#9c9590] font-mono">{flag.section}</span>
                      </div>
                      <div className="text-sm font-semibold text-[#1a1814] mb-1">{flag.title}</div>
                      <p className="text-xs text-[#6b6560] leading-relaxed">{flag.body}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Report footer */}
          <div className="px-5 py-3 bg-white border-t border-[#e8e4df] flex items-center justify-between">
            <span className="text-xs text-[#9c9590]">Revealr AI Analysis · Results in under 60 seconds</span>
            <span className="text-xs font-semibold text-[#e8572a]">$19 to unlock full report →</span>
          </div>
        </div>
      </div>
    </section>
  );
}
