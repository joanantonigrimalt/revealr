import type { WhoItem } from '@/content/seo-pages';

type Props = {
  h2: string;
  items: WhoItem[];
  whyReviewStat: string;
};

export default function WhoThisIsFor({ h2, items, whyReviewStat }: Props) {
  return (
    <section className="py-14 px-6 bg-[#faf9f7]">
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold text-[#1a1814] mb-8"
          style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '-0.02em' }}
        >
          {h2}
        </h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {items.map((item, i) => (
            <div
              key={i}
              className="p-5 rounded-xl border border-[#e8e4df] bg-white"
            >
              <div className="w-7 h-7 rounded-full bg-[#fdf0eb] flex items-center justify-center mb-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e8572a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="text-sm font-bold text-[#1a1814] mb-1">{item.role}</div>
              <div className="text-xs text-[#6b6560] leading-relaxed">{item.description}</div>
            </div>
          ))}
        </div>
        <div className="bg-[#fdf0eb] border border-[#e8572a]/15 rounded-xl p-5">
          <p className="text-sm text-[#6b6560] leading-relaxed">{whyReviewStat}</p>
        </div>
      </div>
    </section>
  );
}
