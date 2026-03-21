'use client';

import { useEffect, useState } from 'react';
import type { ProgressStep } from '@/types';

const STEPS: ProgressStep[] = [
  { id: 'verify', label: 'Opening the document', sublabel: 'Preparing your document for analysis' },
  { id: 'read', label: 'Reading document', sublabel: 'Extracting text from your document' },
  { id: 'analyze', label: 'Analyzing clauses', sublabel: 'Identifying risks with AI' },
  { id: 'score', label: 'Calculating risk score', sublabel: 'Scoring 0–100 across all flags' },
  { id: 'report', label: 'Preparing report', sublabel: 'Generating your full analysis' },
];

type Props = {
  currentStep: number; // 0-indexed; -1 = not started
};

export default function AnalysisProgress({ currentStep }: Props) {
  const [visibleStep, setVisibleStep] = useState(-1);

  // Stagger step reveal slightly for visual effect
  useEffect(() => {
    if (currentStep > visibleStep) {
      const t = setTimeout(() => setVisibleStep(currentStep), 150);
      return () => clearTimeout(t);
    }
  }, [currentStep, visibleStep]);

  return (
    <div className="w-full max-w-md mx-auto py-8">
      {/* Animated logo mark */}
      <div className="flex justify-center mb-8">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-accent/20 animate-pulse-ring" />
          <div className="absolute inset-1 rounded-full border-2 border-t-accent border-r-transparent border-b-transparent border-l-transparent animate-spin-slow" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-accent font-serif font-bold text-lg">R</span>
          </div>
        </div>
      </div>

      <h2 className="text-center font-serif text-2xl font-bold text-text-primary mb-2">
        Analyzing Your Document
      </h2>
      <p className="text-center text-text-secondary text-sm mb-10">
        Our AI is reviewing every clause. This takes about 30–60 seconds.
      </p>

      <div className="space-y-3">
        {STEPS.map((step, index) => {
          const isDone = index < visibleStep;
          const isActive = index === visibleStep;
          const isPending = index > visibleStep;

          return (
            <div
              key={step.id}
              className={[
                'flex items-center gap-4 p-4 rounded-xl border transition-all duration-500',
                isActive ? 'border-accent/30 bg-accent-light' : isDone ? 'border-border-base bg-bg-card' : 'border-transparent bg-transparent opacity-40',
              ].join(' ')}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Step indicator */}
              <div
                className={[
                  'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300',
                  isDone
                    ? 'bg-accent border-accent text-white'
                    : isActive
                    ? 'border-accent bg-white'
                    : 'border-border-base bg-bg-base',
                ].join(' ')}
              >
                {isDone ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : isActive ? (
                  <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                ) : (
                  <span className="text-xs text-text-muted font-medium">{index + 1}</span>
                )}
              </div>

              {/* Step text */}
              <div className="flex-1 min-w-0">
                <div
                  className={[
                    'text-sm font-semibold transition-colors',
                    isDone || isActive ? 'text-text-primary' : 'text-text-muted',
                  ].join(' ')}
                >
                  {step.label}
                </div>
                {isActive && (
                  <div className="text-xs text-text-secondary mt-0.5 animate-fade-in">
                    {step.sublabel}
                  </div>
                )}
              </div>

              {/* Active indicator dots */}
              {isActive && (
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
