import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1a1814',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '5px',
        }}
      >
        <span
          style={{
            color: '#e8572a',
            fontSize: '22px',
            fontWeight: 700,
            fontFamily: 'Georgia, serif',
            lineHeight: 1,
            marginTop: '1px',
          }}
        >
          r
        </span>
      </div>
    ),
    { ...size }
  );
}
