# Revealr — AI-Powered Lease Analysis

Upload a lease. Pay $19. Get a full risk report in under 60 seconds.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** — custom design system
- **Stripe Checkout** — one-time payment
- **Anthropic Claude** (`claude-sonnet-4-20250514`) — lease analysis
- **pdf-parse** / **mammoth** — document extraction
- **Resend** — transactional email
- **jsPDF** — client-side PDF download
- **Vercel Blob** (optional) — production file storage

---

## Setup

### 1. Install dependencies

```bash
cd revealr
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in:

| Variable | Description |
|---|---|
| `ANTHROPIC_API_KEY` | From [console.anthropic.com](https://console.anthropic.com) |
| `STRIPE_SECRET_KEY` | From Stripe Dashboard → Developers → API keys |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | For webhook verification (optional) |
| `RESEND_API_KEY` | From [resend.com](https://resend.com) |
| `NEXT_PUBLIC_APP_URL` | Your app URL (e.g. `http://localhost:3000`) |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token (optional, for production) |

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## File Storage

| Environment | Storage |
|---|---|
| Development | `/tmp` (OS temp directory) |
| Production | Vercel Blob (set `BLOB_READ_WRITE_TOKEN`) |

Files are automatically deleted after analysis.

---

## Supported Formats

| Format | Extraction |
|---|---|
| PDF | `pdf-parse` (text extraction) |
| DOCX | `mammoth` (text extraction) |
| DOC | `mammoth` (best-effort) |
| JPG / PNG | Claude Vision API |

Max file size: **20 MB**

---

## User Flow

```
Landing (/)
  → user uploads lease + enters email
  → POST /api/create-checkout
  → Stripe Checkout ($19)
  → /dashboard?session_id=xxx&file=yyy&name=zzz
  → GET /api/analyze (verify payment)
  → POST /api/analyze (run Claude analysis)
  → display report + send email via /api/send-report
  → download PDF (client-side, jsPDF)
```

---

## Project Structure

```
revealr/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout + metadata
│   ├── globals.css                 # Global styles
│   ├── dashboard/
│   │   ├── page.tsx               # Dashboard + results
│   │   └── loading.tsx
│   └── api/
│       ├── create-checkout/route.ts
│       ├── analyze/route.ts
│       └── send-report/route.ts
├── components/
│   ├── UploadDropzone.tsx
│   ├── EmailInput.tsx
│   ├── PricingCTA.tsx
│   ├── AnalysisProgress.tsx
│   ├── RiskScoreCard.tsx
│   ├── FlagCard.tsx
│   ├── ActionPlan.tsx
│   ├── ReportDownloadButton.tsx
│   └── DashboardSidebar.tsx
├── lib/
│   ├── anthropic.ts               # Claude API wrapper
│   ├── stripe.ts                  # Stripe helpers
│   ├── storage.ts                 # File storage abstraction
│   ├── pdf.ts                     # Document text extraction
│   ├── report.ts                  # Email HTML/text builder
│   ├── utils.ts                   # Shared utilities
│   └── validators.ts              # Validation + JSON parsing
└── types/
    └── index.ts                   # TypeScript types
```

---

## Deploy to Vercel

1. Push to GitHub
2. Import in [vercel.com](https://vercel.com)
3. Add all environment variables
4. Add `BLOB_READ_WRITE_TOKEN` (create a Blob store in Vercel Storage)
5. Deploy

---

## Notes

- **Claude model**: `claude-sonnet-4-20250514` — update in `lib/anthropic.ts` if needed
- **Email from address**: update `FROM_EMAIL` in `app/api/send-report/route.ts` to a verified Resend domain
- **Stripe webhook**: route is stubbed — implement `app/api/webhook/route.ts` if you need server-side fulfillment
- Files in `/tmp` are ephemeral on Vercel — always use Vercel Blob in production
