import Link from 'next/link';

type Props = {
  ctaPrimary: string;
  ctaSecondary?: string;
  ctaMicrocopy: string;
};

export default function PageCTA({ ctaPrimary, ctaSecondary, ctaMicrocopy }: Props) {
  return (
    <section className="py-16 px-4 bg-accent text-white">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-3">
          Ready to review your document?
        </h2>
        <p className="text-white/80 mb-8">
          Upload your contract and get a complete risk analysis in under 60 seconds.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            href="/"
            className="bg-white text-accent font-semibold px-8 py-3.5 rounded-xl hover:bg-white/90 transition-colors text-base"
          >
            {ctaPrimary}
          </Link>
          {ctaSecondary && (
            <Link
              href="#sample"
              className="border border-white/40 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors text-base"
            >
              {ctaSecondary}
            </Link>
          )}
        </div>
        <p className="text-white/60 text-sm mt-3">{ctaMicrocopy}</p>
      </div>
    </section>
  );
}
