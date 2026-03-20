'use client';

type Props = {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
};

export default function PricingCTA({ onClick, disabled, loading }: Props) {
  return (
    <div className="w-full">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled || loading}
        className={[
          'w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold text-base transition-all duration-200',
          disabled || loading
            ? 'bg-text-muted/20 text-text-muted cursor-not-allowed'
            : 'bg-accent hover:bg-accent-dark text-white shadow-elevated hover:shadow-glow active:scale-[0.99]',
        ].join(' ')}
      >
        {loading ? (
          <>
            <Spinner />
            <span>Preparing checkout…</span>
          </>
        ) : (
          <>
            <LockIcon />
            <span>Analyze My Lease — $19</span>
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-4 mt-3">
        <TrustBadge icon={<ShieldIcon />} text="Secure payment" />
        <Dot />
        <TrustBadge icon={<CardIcon />} text="Powered by Stripe" />
        <Dot />
        <TrustBadge icon={<ClockIcon />} text="Results in ~60s" />
      </div>
    </div>
  );
}

function TrustBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="flex items-center gap-1 text-xs text-text-muted">
      {icon}
      {text}
    </span>
  );
}

function Dot() {
  return <span className="w-1 h-1 rounded-full bg-border-strong" />;
}

function Spinner() {
  return (
    <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
