import type { LeaseAnalysisResult, AnalysisFlag, FlagType } from '@/types';
import { getRiskLevel, RISK_LEVEL_CONFIG, FLAG_CONFIG, countFlags } from '@/lib/utils';

// ─── HTML Email template ──────────────────────────────────────────────────────

export function buildEmailHTML(params: {
  result: LeaseAnalysisResult;
  fileName: string;
  appUrl: string;
}): string {
  const { result, fileName, appUrl } = params;
  const level = getRiskLevel(result.riskScore);
  const cfg = RISK_LEVEL_CONFIG[level];
  const counts = countFlags(result.flags);

  const flagsByType = (type: FlagType) => result.flags.filter((f) => f.type === type);
  const fcfg = FLAG_CONFIG;

  const renderFlags = (flags: AnalysisFlag[], type: FlagType) => {
    if (flags.length === 0) return '';
    const c = fcfg[type];
    return flags
      .map(
        (f) => `
      <div style="margin-bottom:16px;padding:16px;background:${c.bgColor};border:1px solid ${c.borderColor};border-radius:8px;">
        <div style="display:flex;align-items:center;margin-bottom:8px;">
          <span style="color:${c.color};font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;margin-right:8px;">${c.label}</span>
          <span style="color:#6b6560;font-size:12px;">${f.section}</span>
        </div>
        <div style="font-weight:600;color:#1a1814;margin-bottom:6px;">${f.title}</div>
        <div style="color:#444;font-size:14px;line-height:1.6;margin-bottom:8px;">${f.description}</div>
        <div style="color:#1a1814;font-size:13px;font-weight:500;border-top:1px solid ${c.borderColor};padding-top:8px;margin-top:8px;">
          <strong>Action:</strong> ${f.action}
        </div>
      </div>`
      )
      .join('');
  };

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Your Contract Analysis Report — Revealr</title>
</head>
<body style="margin:0;padding:0;background:#faf9f7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#1a1814;">
  <div style="max-width:640px;margin:0 auto;padding:40px 24px;">

    <!-- Header -->
    <div style="margin-bottom:32px;">
      <div style="font-size:22px;font-weight:700;color:#1a1814;letter-spacing:-0.02em;margin-bottom:4px;">
        Revealr
      </div>
      <div style="color:#6b6560;font-size:14px;">AI Contract Analysis</div>
    </div>

    <!-- Greeting -->
    <h1 style="font-size:26px;font-weight:700;color:#1a1814;margin:0 0 8px;">Your Contract Analysis Is Ready</h1>
    <p style="color:#6b6560;font-size:15px;margin:0 0 32px;line-height:1.6;">
      We've completed our AI-powered analysis of <strong>${fileName}</strong>. Here's what we found.
    </p>

    <!-- Risk Score Card -->
    <div style="background:#fff;border:1px solid #e8e4df;border-radius:12px;padding:24px;margin-bottom:24px;">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;">
        <div>
          <div style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#9c9590;margin-bottom:4px;">Risk Score</div>
          <div style="font-size:48px;font-weight:700;color:${cfg.color};line-height:1;">${result.riskScore}</div>
          <div style="font-size:13px;color:#6b6560;margin-top:4px;">out of 100</div>
        </div>
        <div style="text-align:right;">
          <div style="display:inline-block;padding:6px 16px;background:${cfg.bgColor};color:${cfg.color};border:1px solid ${cfg.borderColor};border-radius:100px;font-weight:600;font-size:14px;margin-bottom:16px;">
            ${cfg.label}
          </div>
          <div style="display:flex;gap:16px;justify-content:flex-end;">
            <div style="text-align:center;">
              <div style="font-size:20px;font-weight:700;color:#dc2626;">${counts.critical}</div>
              <div style="font-size:11px;color:#9c9590;text-transform:uppercase;">Critical</div>
            </div>
            <div style="text-align:center;">
              <div style="font-size:20px;font-weight:700;color:#d97706;">${counts.warning}</div>
              <div style="font-size:11px;color:#9c9590;text-transform:uppercase;">Warnings</div>
            </div>
            <div style="text-align:center;">
              <div style="font-size:20px;font-weight:700;color:#2563eb;">${counts.info}</div>
              <div style="font-size:11px;color:#9c9590;text-transform:uppercase;">Info</div>
            </div>
          </div>
        </div>
      </div>
      <div style="margin-top:20px;padding-top:20px;border-top:1px solid #e8e4df;">
        <div style="font-size:13px;color:#6b6560;margin-bottom:4px;font-weight:500;">Summary</div>
        <p style="color:#1a1814;font-size:15px;line-height:1.6;margin:0;">${result.summary}</p>
      </div>
      ${result.state ? `<div style="margin-top:12px;font-size:13px;color:#9c9590;">State: ${result.state} &nbsp;·&nbsp; Type: ${result.leaseType}</div>` : ''}
    </div>

    <!-- Flags -->
    ${counts.critical > 0 ? `<h2 style="font-size:16px;font-weight:700;color:#1a1814;margin:0 0 12px;">Critical Issues (${counts.critical})</h2>${renderFlags(flagsByType('critical'), 'critical')}` : ''}
    ${counts.warning > 0 ? `<h2 style="font-size:16px;font-weight:700;color:#1a1814;margin:24px 0 12px;">Warnings (${counts.warning})</h2>${renderFlags(flagsByType('warning'), 'warning')}` : ''}
    ${counts.info > 0 ? `<h2 style="font-size:16px;font-weight:700;color:#1a1814;margin:24px 0 12px;">Informational Notes (${counts.info})</h2>${renderFlags(flagsByType('info'), 'info')}` : ''}

    <!-- CTA -->
    <div style="background:#1a1814;border-radius:12px;padding:24px;margin:32px 0;text-align:center;">
      <div style="color:#faf9f7;font-size:16px;font-weight:600;margin-bottom:8px;">View Your Full Interactive Report</div>
      <div style="color:#9c9590;font-size:13px;margin-bottom:20px;">Access your complete analysis with action steps and recommendations</div>
      <a href="${appUrl}" style="display:inline-block;background:#e8572a;color:#fff;padding:12px 28px;border-radius:8px;font-weight:600;font-size:14px;text-decoration:none;">
        View Report →
      </a>
    </div>

    <!-- Footer -->
    <div style="border-top:1px solid #e8e4df;padding-top:24px;color:#9c9590;font-size:12px;line-height:1.6;">
      <p style="margin:0 0 8px;">This analysis was generated by AI and is for informational purposes only. It does not constitute legal advice. Always consult a qualified attorney before signing any legal document.</p>
      <p style="margin:0;">© ${new Date().getFullYear()} Revealr. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;
}

// ─── Plain text fallback ──────────────────────────────────────────────────────

export function buildEmailText(result: LeaseAnalysisResult, fileName: string): string {
  const level = getRiskLevel(result.riskScore);
  const cfg = RISK_LEVEL_CONFIG[level];
  const counts = countFlags(result.flags);

  const lines: string[] = [
    'REVEALR — CONTRACT ANALYSIS REPORT',
    '===================================',
    '',
    `File: ${fileName}`,
    `Risk Score: ${result.riskScore}/100 — ${cfg.label}`,
    `State: ${result.state}  |  Type: ${result.leaseType}`,
    '',
    'SUMMARY',
    '-------',
    result.summary,
    '',
    `Issues: ${counts.critical} Critical / ${counts.warning} Warnings / ${counts.info} Info`,
    '',
  ];

  for (const f of result.flags) {
    lines.push(`[${f.type.toUpperCase()}] ${f.section} — ${f.title}`);
    lines.push(f.description);
    lines.push(`ACTION: ${f.action}`);
    lines.push('');
  }

  lines.push('---');
  lines.push('This analysis is for informational purposes only and does not constitute legal advice.');

  return lines.join('\n');
}
