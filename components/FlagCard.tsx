'use client';

import { useState } from 'react';
import type { AnalysisFlag } from '@/types';
import { FLAG_CONFIG } from '@/lib/utils';

type Props = {
  flag: AnalysisFlag;
  index: number;
};

export default function FlagCard({ flag, index }: Props) {
  const [expanded, setExpanded] = useState(true);
  const cfg = FLAG_CONFIG[flag.type];

  return (
    <div
      className="bg-bg-card border rounded-xl overflow-hidden transition-all duration-200 shadow-card animate-fade-in"
      style={{
        borderColor: cfg.borderColor,
        animationDelay: `${index * 60}ms`,
        animationFillMode: 'both',
      }}
    >
      {/* Card header */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-start gap-3 p-4 text-left hover:opacity-90 transition-opacity"
        style={{ backgroundColor: cfg.bgColor }}
      >
        {/* Type badge */}
        <span
          className="flex-shrink-0 mt-0.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider"
          style={{ color: cfg.color, backgroundColor: `${cfg.color}18` }}
        >
          <FlagTypeIcon type={flag.type} color={cfg.color} />
          {cfg.label}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold text-text-primary text-sm">{flag.title}</span>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs text-text-muted font-mono">{flag.section}</span>
              <ChevronIcon expanded={expanded} />
            </div>
          </div>
        </div>
      </button>

      {/* Expandable body */}
      {expanded && (
        <div className="px-4 pb-4 pt-3 border-t" style={{ borderColor: cfg.borderColor }}>
          <p className="text-text-secondary text-sm leading-relaxed mb-3">
            {flag.description}
          </p>
          <div
            className="flex items-start gap-2 px-3 py-2.5 rounded-lg"
            style={{ backgroundColor: `${cfg.color}0d` }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke={cfg.color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0 mt-0.5"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <p className="text-sm font-medium" style={{ color: cfg.color }}>
              {flag.action}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`text-text-muted transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function FlagTypeIcon({ type, color }: { type: string; color: string }) {
  if (type === 'critical') {
    return (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    );
  }
  if (type === 'warning') {
    return (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    );
  }
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}
