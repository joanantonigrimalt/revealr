import type { CheckItem } from '@/content/seo-pages';

type Props = {
  title: string;
  h2: string;
  checks: CheckItem[];
};

export default function WhatRevealrChecks({ title, h2, checks }: Props) {
  return (
    <section className="py-14 px-4 bg-bg-base">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-primary mb-2">{h2}</h2>
        <p className="text-text-secondary mb-8">{title}</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {checks.map((item, i) => (
            <div key={i} className="flex gap-3 p-4 rounded-xl border border-border-base bg-bg-card">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center mt-0.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-text-primary">{item.title}</div>
                <div className="text-xs text-text-secondary mt-0.5">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
