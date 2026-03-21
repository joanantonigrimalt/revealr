import type { WhoItem } from '@/content/seo-pages';

type Props = {
  h2: string;
  items: WhoItem[];
  whyReviewStat: string;
};

export default function WhoThisIsFor({ h2, items, whyReviewStat }: Props) {
  return (
    <section className="py-14 px-4 bg-bg-base">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-primary mb-8">{h2}</h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {items.map((item, i) => (
            <div key={i} className="p-5 rounded-xl border border-border-base bg-bg-card">
              <div className="text-sm font-bold text-text-primary mb-1">{item.role}</div>
              <div className="text-xs text-text-secondary leading-relaxed">{item.description}</div>
            </div>
          ))}
        </div>
        <div className="bg-accent-light border border-accent/20 rounded-xl p-5">
          <p className="text-sm text-text-secondary leading-relaxed italic">{whyReviewStat}</p>
        </div>
      </div>
    </section>
  );
}
