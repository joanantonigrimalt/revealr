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
    <section className="py-14 px-4 bg-bg-card border-y border-border-base">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-primary mb-8">{h2}</h2>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl border border-border-base bg-white overflow-hidden">
              <button
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-bg-base transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="text-sm font-semibold text-text-primary">{faq.question}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`flex-shrink-0 text-text-muted transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {open === i && (
                <div className="px-5 pb-4">
                  <p className="text-sm text-text-secondary leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
