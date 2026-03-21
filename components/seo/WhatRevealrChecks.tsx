import type { CheckItem } from '@/content/seo-pages';

type Props = {
  title: string;
  h2: string;
  checks: CheckItem[];
};

export default function WhatRevealrChecks({ title, h2, checks }: Props) {
  return (
    <section className="py-14 px-6 bg-[#faf9f7]">
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold text-[#1a1814] mb-2"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif", letterSpacing: '-0.02em' }}
        >
          {h2}
        </h2>
        <p className="text-[#6b6560] mb-8 text-sm">{title}</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {checks.map((item, i) => (
            <div
              key={i}
              className="flex gap-3 p-4 rounded-xl border border-[#e8e4df] bg-white"
            >
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#fdf0eb] flex items-center justify-center mt-0.5">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#e8572a"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-[#1a1814]">{item.title}</div>
                <div className="text-xs text-[#6b6560] mt-0.5 leading-relaxed">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
