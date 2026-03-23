import UploadWidget from '@/components/UploadWidget';

type Props = {
  ctaMicrocopy: string;
  pageContext?: string;
};

export default function PageCTA({ ctaMicrocopy, pageContext }: Props) {
  return (
    <section className="py-16 px-6 bg-[#1a1814]">
      <div className="max-w-2xl mx-auto text-center">
        <h2
          className="text-2xl sm:text-3xl font-bold text-white mb-3"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif", letterSpacing: '-0.02em' }}
        >
          Ready to review your document?
        </h2>
        <p className="text-white/60 mb-8 text-base leading-relaxed">
          Upload your contract and get a complete risk analysis in under 60 seconds.
        </p>
        <div className="max-w-sm mx-auto">
          <UploadWidget pageContext={pageContext} />
        </div>
        <p className="text-white/40 text-xs mt-5">{ctaMicrocopy}</p>
      </div>
    </section>
  );
}
