import { ImageResponse } from 'next/og';
import { getPageBySlug, getAllSlugs } from '@/content/seo-pages';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Pre-generate at build time for all SEO pages
export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// Cluster-specific accent colors and labels
const CLUSTER_CONFIG: Record<string, { accent: string; label: string; icon: string }> = {
  'lease-rental':       { accent: '#2563eb', label: 'Rental & Lease',      icon: '🏠' },
  'employment-job':     { accent: '#7c3aed', label: 'Employment',           icon: '💼' },
  'nda-restrictive':    { accent: '#0891b2', label: 'NDA & Confidentiality', icon: '🔒' },
  'service-freelance':  { accent: '#059669', label: 'Freelance & Services', icon: '⚡' },
  'contract-review':    { accent: '#e8572a', label: 'Contract Review',       icon: '📋' },
  'purchase-real-estate': { accent: '#d97706', label: 'Purchase Agreement', icon: '🏡' },
};

export default function Image({ params }: { params: { slug: string } }) {
  const page = getPageBySlug(params.slug);

  const title = page?.h1 ?? 'AI Contract Analysis';
  const desc = page?.metaDescription ?? 'Upload any contract and get an AI risk analysis in 60 seconds.';
  const cluster = page?.cluster ?? 'contract-review';
  const cfg = CLUSTER_CONFIG[cluster] ?? CLUSTER_CONFIG['contract-review'];

  // Truncate for display
  const displayTitle = title.length > 70 ? title.slice(0, 68) + '…' : title;
  const displayDesc = desc.length > 110 ? desc.slice(0, 108) + '…' : desc;

  return new ImageResponse(
    (
      <div
        style={{
          background: '#1a1814',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '64px 80px',
          fontFamily: 'Georgia, "Times New Roman", serif',
          position: 'relative',
        }}
      >
        {/* Top accent bar — cluster color */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: cfg.accent,
          }}
        />

        {/* Brand + cluster badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '44px' }}>
          {/* Lettermark */}
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: cfg.accent,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: '#fff', fontSize: '22px', fontWeight: 700, fontFamily: 'Georgia, serif' }}>
              r
            </span>
          </div>
          <span style={{ fontSize: '26px', fontWeight: 700, color: '#faf9f7', fontFamily: 'Georgia, serif' }}>
            revealr
          </span>
          {/* Cluster badge */}
          <div
            style={{
              marginLeft: '8px',
              background: 'rgba(255,255,255,0.08)',
              border: `1px solid ${cfg.accent}40`,
              padding: '6px 14px',
              borderRadius: '100px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span style={{ fontSize: '14px' }}>{cfg.icon}</span>
            <span style={{ fontSize: '14px', color: cfg.accent, fontWeight: 600, fontFamily: 'Georgia, serif' }}>
              {cfg.label}
            </span>
          </div>
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: displayTitle.length > 50 ? '52px' : '60px',
            fontWeight: 700,
            color: '#faf9f7',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '24px',
            maxWidth: '980px',
            fontFamily: 'Georgia, serif',
          }}
        >
          {displayTitle}
        </div>

        {/* Meta description */}
        <div
          style={{
            fontSize: '22px',
            color: '#9c9590',
            lineHeight: 1.45,
            maxWidth: '900px',
            fontFamily: 'Georgia, serif',
          }}
        >
          {displayDesc}
        </div>

        {/* Bottom row */}
        <div
          style={{
            position: 'absolute',
            bottom: '48px',
            left: '80px',
            right: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              background: cfg.accent,
              padding: '10px 22px',
              borderRadius: '100px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: '16px', fontWeight: 700, color: '#fff', fontFamily: 'Georgia, serif' }}>
              AI analysis · $19 · 60 seconds
            </span>
          </div>
          <span style={{ fontSize: '16px', color: 'rgba(156,149,144,0.5)', fontFamily: 'Georgia, serif' }}>
            getrevealr.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
