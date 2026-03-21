type Props = {
  disclaimer: string;
};

export default function LegalDisclaimer({ disclaimer }: Props) {
  return (
    <div className="px-6 py-6 bg-[#faf9f7] border-t border-[#e8e4df]">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs text-[#9c9590] leading-relaxed text-center">{disclaimer}</p>
      </div>
    </div>
  );
}
