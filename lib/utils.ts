import type { RiskLevel, FlagType, AnalysisFlag } from '@/types';

// ─── Risk level helpers ───────────────────────────────────────────────────────

export function getRiskLevel(score: number): RiskLevel {
  if (score >= 75) return 'severe';
  if (score >= 50) return 'high';
  if (score >= 25) return 'moderate';
  return 'low';
}

export const RISK_LEVEL_CONFIG: Record<
  RiskLevel,
  { label: string; color: string; bgColor: string; borderColor: string }
> = {
  low: {
    label: 'Low Risk',
    color: '#16a34a',
    bgColor: '#f0fdf4',
    borderColor: '#bbf7d0',
  },
  moderate: {
    label: 'Moderate Risk',
    color: '#d97706',
    bgColor: '#fffbeb',
    borderColor: '#fde68a',
  },
  high: {
    label: 'High Risk',
    color: '#ea580c',
    bgColor: '#fff7ed',
    borderColor: '#fed7aa',
  },
  severe: {
    label: 'Severe Risk',
    color: '#dc2626',
    bgColor: '#fef2f2',
    borderColor: '#fecaca',
  },
};

// ─── Flag helpers ─────────────────────────────────────────────────────────────

export const FLAG_CONFIG: Record<
  FlagType,
  { label: string; color: string; bgColor: string; borderColor: string; icon: string }
> = {
  critical: {
    label: 'Critical',
    color: '#dc2626',
    bgColor: '#fef2f2',
    borderColor: '#fecaca',
    icon: '⚠',
  },
  warning: {
    label: 'Warning',
    color: '#d97706',
    bgColor: '#fffbeb',
    borderColor: '#fde68a',
    icon: '○',
  },
  info: {
    label: 'Info',
    color: '#2563eb',
    bgColor: '#eff6ff',
    borderColor: '#bfdbfe',
    icon: 'ℹ',
  },
};

export function countFlags(
  flags: AnalysisFlag[]
): Record<FlagType, number> {
  return {
    critical: flags.filter((f) => f.type === 'critical').length,
    warning: flags.filter((f) => f.type === 'warning').length,
    info: flags.filter((f) => f.type === 'info').length,
  };
}

// ─── Formatting ───────────────────────────────────────────────────────────────

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// ─── Misc ─────────────────────────────────────────────────────────────────────

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max - 1) + '…' : str;
}
