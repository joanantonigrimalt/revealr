'use client';

import { useEffect, useState } from 'react';
import type { LeaseAnalysisResult, RiskLevel } from '@/types';
import { getRiskLevel, RISK_LEVEL_CONFIG, countFlags } from '@/lib/utils';

type Props = {
  result: LeaseAnalysisResult;
};

export default function RiskScoreCard({ result }: Props) {
  const level: RiskLevel = getRiskLevel(result.riskScore);
  const cfg = RISK_LEVEL_CONFIG[level];
  const counts = countFlags(result.flags);
  const [animatedScore, setAnimatedScore] = useState(0);

  // Animate the score counting up
  useEffect(() => {
    const target = result.riskScore;
    const duration = 1000;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;

    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      setAnimatedScore(Math.round(current));
      if (current >= target) clearInterval(timer);
    }, step);

    return () => clearInterval(timer);
  }, [result.riskScore]);

  // Gauge arc computation
  const radius = 60;
  const circumference = Math.PI * radius; // half-circle
  const progress = (result.riskScore / 100) * circumference;

  return (
    <div className="bg-bg-card border border-border-base rounded-2xl p-6 shadow-card">
      <div className="flex flex-col sm:flex-row items-center gap-6">

        {/* Gauge */}
        <div className="relative flex-shrink-0">
          <svg width="160" height="88" viewBox="0 0 160 88">
            {/* Track */}
            <path
              d="M 10 80 A 70 70 0 0 1 150 80"
              fill="none"
              stroke="#e8e4df"
              strokeWidth="12"
              strokeLinecap="round"
            />
            {/* Progress */}
            <path
              d="M 10 80 A 70 70 0 0 1 150 80"
              fill="none"
              stroke={cfg.color}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${(animatedScore / 100) * 219.9} 219.9`}
              style={{ transition: 'stroke-dasharray 0.1s ease' }}
            />
          </svg>
          {/* Score number */}
          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center">
            <span
              className="text-4xl font-bold leading-none tabular-nums"
              style={{ color: cfg.color }}
            >
              {animatedScore}
            </span>
            <span className="text-xs text-text-muted mt-0.5">out of 100</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 w-full">
          <div className="flex items-center gap-3 mb-3">
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border"
              style={{ color: cfg.color, backgroundColor: cfg.bgColor, borderColor: cfg.borderColor }}
            >
              {cfg.label}
            </span>
          </div>

          <p className="text-text-secondary text-sm leading-relaxed mb-4">
            {result.summary}
          </p>

          {/* Flag counts */}
          <div className="flex gap-4">
            <FlagCount count={counts.critical} label="Critical" color="#dc2626" bg="#fef2f2" />
            <FlagCount count={counts.warning} label="Warnings" color="#d97706" bg="#fffbeb" />
            <FlagCount count={counts.info} label="Info" color="#2563eb" bg="#eff6ff" />
          </div>

          {/* Meta */}
          {(result.state || result.leaseType) && (
            <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-border-base">
              {result.state && (
                <MetaBadge label="State" value={result.state} />
              )}
              {result.leaseType && (
                <MetaBadge label="Type" value={result.leaseType} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FlagCount({ count, label, color, bg }: { count: number; label: string; color: string; bg: string }) {
  return (
    <div
      className="flex flex-col items-center px-3 py-2 rounded-lg"
      style={{ backgroundColor: bg }}
    >
      <span className="text-2xl font-bold tabular-nums leading-none" style={{ color }}>
        {count}
      </span>
      <span className="text-xs mt-0.5 font-medium" style={{ color }}>
        {label}
      </span>
    </div>
  );
}

function MetaBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-1.5 text-xs">
      <span className="text-text-muted font-medium">{label}:</span>
      <span className="text-text-primary font-semibold">{value}</span>
    </div>
  );
}
