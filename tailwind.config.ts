import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#e8572a',
        'accent-dark': '#c94820',
        'accent-light': '#fdf0eb',
        'text-primary': '#1a1814',
        'text-secondary': '#6b6560',
        'text-muted': '#9c9590',
        'bg-base': '#faf9f7',
        'bg-card': '#ffffff',
        'border-base': '#e8e4df',
        'border-strong': '#ccc8c2',
        critical: '#dc2626',
        'critical-bg': '#fef2f2',
        warning: '#d97706',
        'warning-bg': '#fffbeb',
        info: '#2563eb',
        'info-bg': '#eff6ff',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Epilogue', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)',
        elevated: '0 4px 16px 0 rgba(0,0,0,0.08), 0 1px 4px 0 rgba(0,0,0,0.04)',
        glow: '0 0 0 3px rgba(232,87,42,0.15)',
      },
      keyframes: {
        'fade-in': { '0%': { opacity: '0', transform: 'translateY(8px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'spin-slow': { '100%': { transform: 'rotate(360deg)' } },
        'pulse-ring': { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.4' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out forwards',
        'spin-slow': 'spin-slow 2s linear infinite',
        'pulse-ring': 'pulse-ring 2s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite',
      },
    },
  },
  plugins: [],
};

export default config;
