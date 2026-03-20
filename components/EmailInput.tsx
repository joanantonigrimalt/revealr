'use client';

import { useState, useCallback } from 'react';
import { validateEmail } from '@/lib/validators';

type Props = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export default function EmailInput({ value, onChange, disabled }: Props) {
  const [touched, setTouched] = useState(false);

  const isValid = validateEmail(value);
  const showError = touched && value.length > 0 && !isValid;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <div className="w-full">
      <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1.5">
        Email address
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </span>
        <input
          id="email"
          type="email"
          value={value}
          onChange={handleChange}
          onBlur={() => setTouched(true)}
          placeholder="you@example.com"
          disabled={disabled}
          autoComplete="email"
          className={[
            'w-full pl-9 pr-4 py-3 rounded-lg border text-sm text-text-primary placeholder-text-muted bg-bg-card',
            'focus:outline-none focus:ring-2 transition-all duration-150',
            showError
              ? 'border-critical focus:ring-critical/20'
              : isValid && value
              ? 'border-accent/50 focus:ring-accent/20'
              : 'border-border-base focus:ring-accent/20 focus:border-accent/50',
            disabled ? 'opacity-50 cursor-not-allowed' : '',
          ].join(' ')}
        />
        {isValid && value && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
        )}
      </div>
      {showError && (
        <p className="mt-1.5 text-xs text-critical flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          Please enter a valid email address
        </p>
      )}
      <p className="mt-1.5 text-xs text-text-muted">
        Your report will be sent here after analysis
      </p>
    </div>
  );
}
