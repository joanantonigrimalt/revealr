'use client';

import { useState } from 'react';
import type { FAQ } from '@/content/seo-pages';

type Props = {
  h2: string;
  faqs: FAQ[];
};

export default function PageFAQ({ h2, faqs }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-14 px-6 bg-white border-y border-[#e8e4df]">
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold text-[#1a1814] mb-8"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif", letterSpacing: '-0.02em' }}
        >
          {h2}
        </h2>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-[#e8e4df] bg-[#faf9f7] overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-[#f5f3f0] transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="text-sm font-semibold text-[#1a1814]">{faq.question}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9c9590"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div
                style={{
                  maxHeight: open === i ? '600px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.25s ease',
                }}
              >
                <div className="px-5 pb-5 bg-white border-t border-[#f0ece8]">
                  <p className="text-sm text-[#6b6560] leading-relaxed pt-4">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
