'use client';

import type { LeaseAnalysisResult } from '@/types';
import { getRiskLevel, RISK_LEVEL_CONFIG, countFlags, FLAG_CONFIG } from '@/lib/utils';

type Props = {
  result: LeaseAnalysisResult;
  fileName: string;
  onResendEmail?: () => void;
  emailSent?: boolean;
  emailSending?: boolean;
};

export default function DashboardSidebar({
  result,
  fileName,
  onResendEmail,
  emailSent,
  emailSending,
}: Props) {
  const level = getRiskLevel(result.riskScore);
  const cfg = RISK_LEVEL_CONFIG[level];
  const counts = countFlags(result.flags);

  return (
    <aside className="w-full space-y-4">
      {/* File info */}
      <div className="bg-bg-card border border-border-base rounded-xl p-4 shadow-card">
        <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Document</div>
        <div className="flex items-start gap-2.5">
          <div className="flex-shrink-0 w-8 h-8 bg-accent-light rounded-lg flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e8572a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-primary truncate">{fileName}</p>
            {result.leaseType && (
              <p className="text-xs text-text-muted mt-0.5">{result.leaseType}</p>
            )}
          </div>
        </div>
      </div>

      {/* Risk snapshot */}
      <div className="bg-bg-card border border-border-base rounded-xl p-4 shadow-card">
        <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Risk Snapshot</div>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-4xl font-bold tabular-nums" style={{ color: cfg.color }}>
            {result.riskScore}
          </span>
          <div>
            <div className="text-xs text-text-muted">/ 100</div>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ color: cfg.color, backgroundColor: cfg.bgColor }}
            >
              {cfg.label}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-border-base rounded-full overflow-hidden mb-4">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${result.riskScore}%`, backgroundColor: cfg.color }}
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          {(['critical', 'warning', 'info'] as const).map((type) => (
            <div
              key={type}
              className="text-center p-2 rounded-lg"
              style={{ backgroundColor: FLAG_CONFIG[type].bgColor }}
            >
              <div className="text-lg font-bold tabular-nums" style={{ color: FLAG_CONFIG[type].color }}>
                {counts[type]}
              </div>
              <div className="text-xs font-medium" style={{ color: FLAG_CONFIG[type].color }}>
                {FLAG_CONFIG[type].label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Email resend */}
      {onResendEmail && (
        <div className="bg-bg-card border border-border-base rounded-xl p-4 shadow-card">
          <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Report Delivery</div>

          {emailSent ? (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Report sent to your email
            </div>
          ) : (
            <button
              type="button"
              onClick={onResendEmail}
              disabled={emailSending}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-border-base text-sm text-text-primary hover:border-accent/40 hover:text-accent transition-all disabled:opacity-50"
            >
              {emailSending ? (
                <>
                  <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
                  </svg>
                  Sending…
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  Resend Report by Email
                </>
              )}
            </button>
          )}
        </div>
      )}

      {/* Confidence note when low/medium */}
      {result.confidence && result.confidence !== 'high' && (
        <div className={`rounded-xl border p-3 ${
          result.confidence === 'low'
            ? 'bg-amber-50 border-amber-200'
            : 'bg-blue-50 border-blue-100'
        }`}>
          <div className={`text-xs font-semibold mb-1 ${
            result.confidence === 'low' ? 'text-amber-700' : 'text-blue-700'
          }`}>
            {result.confidence === 'low' ? 'Limited analysis' : 'Partial analysis'}
          </div>
          <p className={`text-xs leading-relaxed ${
            result.confidence === 'low' ? 'text-amber-600' : 'text-blue-600'
          }`}>
            {result.confidence === 'low'
              ? 'The document had limited readable text. Results may be incomplete. Try re-uploading a clearer version.'
              : 'The analysis is based on the text extracted. Some sections may not have been fully parsed.'}
          </p>
        </div>
      )}

      {/* Disclaimer */}
      <div className="px-1">
        <p className="text-xs text-text-muted leading-relaxed">
          AI analysis for informational purposes only. Not legal advice. For high-stakes agreements, always verify flagged clauses with a qualified attorney.
        </p>
      </div>
    </aside>
  );
}
