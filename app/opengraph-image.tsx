import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Revealr — AI Contract Analysis. Know What You\'re Signing.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1a1814',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px 90px',
          fontFamily: 'Georgia, "Times New Roman", serif',
          position: 'relative',
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: '#e8572a',
          }}
        />

        {/* Brand wordmark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '48px',
          }}
        >
          <span
            style={{
              fontSize: '36px',
              fontWeight: 700,
              color: '#faf9f7',
              letterSpacing: '-0.02em',
              fontFamily: 'Georgia, serif',
            }}
          >
            reveal
          </span>
          <span
            style={{
              fontSize: '36px',
              fontWeight: 700,
              color: '#e8572a',
              letterSpacing: '-0.02em',
              fontFamily: 'Georgia, serif',
            }}
          >
            r
          </span>
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: '76px',
            fontWeight: 700,
            color: '#faf9f7',
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            marginBottom: '28px',
            maxWidth: '900px',
            fontFamily: 'Georgia, serif',
          }}
        >
          Know What You&apos;re Signing
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '28px',
            color: '#9c9590',
            maxWidth: '820px',
            lineHeight: 1.4,
            marginBottom: '52px',
            fontFamily: 'Georgia, serif',
          }}
        >
          AI contract analysis in 60 seconds — risk score, flagged clauses, plain-English explanations.
        </div>

        {/* CTA pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <div
            style={{
              background: '#e8572a',
              padding: '14px 28px',
              borderRadius: '100px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: '22px', fontWeight: 700, color: '#fff', fontFamily: 'Georgia, serif' }}>
              $19 one-time · Any contract type
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '12px',
            }}
          >
            {['Lease', 'Employment', 'NDA', 'Freelance'].map((label) => (
              <div
                key={label}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  padding: '8px 16px',
                  borderRadius: '100px',
                  fontSize: '16px',
                  color: '#9c9590',
                  fontFamily: 'Georgia, serif',
                  display: 'flex',
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '90px',
            fontSize: '18px',
            color: 'rgba(156,149,144,0.5)',
            fontFamily: 'Georgia, serif',
          }}
        >
          getrevealr.com
        </div>
      </div>
    ),
    { ...size }
  );
}
