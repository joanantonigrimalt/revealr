type Props = {
  disclaimer: string;
};

export default function LegalDisclaimer({ disclaimer }: Props) {
  return (
    <footer className="py-8 px-4 bg-bg-base border-t border-border-base">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs text-text-muted leading-relaxed text-center">{disclaimer}</p>
      </div>
    </footer>
  );
}
