/**
 * scripts/check-indexing.js
 *
 * Checks the indexing status of all getrevealr.com URLs via the Google Indexing API.
 * Shows when each URL was last submitted and its notification status.
 *
 * Requires: google-auth-library  →  npm install google-auth-library --save-dev
 *
 * Run: npm run check-indexing
 *
 * Note: This API shows SUBMISSION status (when you last pinged Google), NOT
 *       whether the URL is actually indexed in search results. Use Search Console's
 *       URL Inspection tool for confirmed indexing status.
 */

const { GoogleAuth } = require('google-auth-library');
const https = require('https');
const path = require('path');
const fs = require('fs');

// ─── Config ──────────────────────────────────────────────────────────────────

const BASE_URL = 'https://getrevealr.com';
const CREDENTIALS_PATH = path.join(__dirname, 'google-credentials.json');
const METADATA_API = 'https://indexing.googleapis.com/v3/urlNotifications/metadata';
const DELAY_MS = 500; // 0.5s between checks — faster than submission

// ─── All URLs (same list as submit-indexing.js) ───────────────────────────────

const STATIC_PAGES = [
  BASE_URL,
  `${BASE_URL}/how-it-works`,
  `${BASE_URL}/about`,
  `${BASE_URL}/blog`,
  `${BASE_URL}/privacy`,
  `${BASE_URL}/terms`,
];

const SEO_SLUGS = [
  'lease-agreement-analyzer',
  'analyze-my-lease',
  'security-deposit-clause-checker',
  'lease-red-flags-before-signing',
  'employment-contract-review',
  'job-offer-review',
  'nda-review',
  'termination-clause-review',
  'lease-renewal-review',
  'rental-lease-review',
  'non-compete-agreement-review',
  'freelance-contract-review',
  'service-agreement-review',
  'independent-contractor-agreement-review',
  'ip-assignment-agreement-review',
  'consulting-agreement-review',
  'landlord-entry-notice-clause',
  'maintenance-responsibility-in-lease',
  'review-contract-before-signing',
  'contract-risk-checker',
  'purchase-agreement-review',
];

const BLOG_SLUGS = [
  'how-to-review-a-lease-before-signing',
  'common-lease-red-flags',
  'landlord-entry-clause-explained',
  'security-deposit-clause-explained',
  'early-termination-fee-clause',
  'what-to-check-in-an-employment-contract',
  'common-nda-red-flags',
  'freelance-contract-mistakes',
  'automatic-rent-increase-clause',
  'how-to-read-a-contract-with-ai',
  'non-compete-clause-explained',
  'ip-assignment-agreement-what-to-know',
  'service-agreement-vs-employment-contract',
  'how-to-negotiate-a-lease',
  'consulting-agreement-red-flags',
  'what-is-a-non-solicitation-agreement',
  'job-offer-letter-vs-employment-contract',
  'independent-contractor-misclassification',
  'how-to-read-an-nda',
  'lease-early-termination-negotiation-guide',
  'ai-vs-lawyer-contract-review',
  'how-to-negotiate-an-employment-contract',
  'how-to-review-a-purchase-agreement',
  'what-is-at-will-employment',
  'how-to-review-a-freelance-contract',
];

const ALL_URLS = [
  ...STATIC_PAGES,
  ...SEO_SLUGS.map((s) => `${BASE_URL}/${s}`),
  ...BLOG_SLUGS.map((s) => `${BASE_URL}/blog/${s}`),
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getJSON(urlToCheck, accessToken) {
  return new Promise((resolve, reject) => {
    const apiUrl = `${METADATA_API}?url=${encodeURIComponent(urlToCheck)}`;

    const req = https.request(
      apiUrl,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${accessToken}` },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, body: JSON.parse(data) });
          } catch {
            resolve({ status: res.statusCode, body: data });
          }
        });
      }
    );

    req.on('error', reject);
    req.end();
  });
}

function formatDate(iso) {
  if (!iso) return 'never';
  const d = new Date(iso);
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });
}

function relativeTime(iso) {
  if (!iso) return '';
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 1) return '< 1h ago';
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error('\n❌  Credentials file not found.');
    console.error(`   Expected: ${CREDENTIALS_PATH}`);
    console.error('   See scripts/README.md for setup instructions.\n');
    process.exit(1);
  }

  console.log(`\n🔍  Revealr Indexing API — Status Check`);
  console.log(`    Total URLs: ${ALL_URLS.length}\n`);

  // Authenticate
  const auth = new GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });

  let accessToken;
  try {
    const client = await auth.getClient();
    const tokenResponse = await client.getAccessToken();
    accessToken = tokenResponse.token;
    console.log('✅  Authenticated\n');
  } catch (err) {
    console.error('❌  Authentication failed:', err.message);
    process.exit(1);
  }

  // Track stats
  const stats = { submitted: 0, neverSubmitted: 0, errors: 0 };
  const neverSubmitted = [];
  const submitted = [];

  for (let i = 0; i < ALL_URLS.length; i++) {
    const url = ALL_URLS[i];
    const label = `[${String(i + 1).padStart(2, '0')}/${ALL_URLS.length}]`;

    try {
      const result = await getJSON(url, accessToken);

      if (result.status === 200) {
        const latest = result.body.latestUpdate;
        const notifyTime = latest?.notifyTime;
        const notifyType = latest?.type ?? 'unknown';

        if (notifyTime) {
          const relative = relativeTime(notifyTime);
          console.log(`  ✅  ${label} ${url}`);
          console.log(`        Last submitted: ${formatDate(notifyTime)} (${relative}) — ${notifyType}`);
          stats.submitted++;
          submitted.push({ url, notifyTime, notifyType });
        } else {
          console.log(`  ⬜  ${label} ${url} — never submitted`);
          stats.neverSubmitted++;
          neverSubmitted.push(url);
        }
      } else if (result.status === 404) {
        console.log(`  ⬜  ${label} ${url} — no submission record`);
        stats.neverSubmitted++;
        neverSubmitted.push(url);
      } else {
        const errMsg = result.body?.error?.message ?? JSON.stringify(result.body);
        console.log(`  ❌  ${label} ${url} — HTTP ${result.status}: ${errMsg}`);
        stats.errors++;
      }
    } catch (err) {
      console.log(`  💥  ${label} ${url} — ${err.message}`);
      stats.errors++;
    }

    if (i < ALL_URLS.length - 1) {
      await delay(DELAY_MS);
    }
  }

  // Summary
  console.log('\n' + '─'.repeat(60));
  console.log('\n📊  Summary');
  console.log(`    ✅  Previously submitted: ${stats.submitted}`);
  console.log(`    ⬜  Never submitted:       ${stats.neverSubmitted}`);
  if (stats.errors > 0) {
    console.log(`    ❌  API errors:           ${stats.errors}`);
  }

  if (neverSubmitted.length > 0) {
    console.log(`\n  💡  ${neverSubmitted.length} URL(s) have never been submitted.`);
    console.log(`      Run: npm run index-urls  to submit all URLs.\n`);
  } else {
    console.log('\n  ✅  All URLs have been submitted to Google.\n');
    console.log('  Note: "Submitted" does not mean "indexed". To verify actual');
    console.log('  indexing, use Search Console > URL Inspection for each URL.\n');
  }

  // Last submission times sorted — useful to see most stale
  if (submitted.length > 0) {
    const oldest = submitted.sort((a, b) => new Date(a.notifyTime) - new Date(b.notifyTime)).slice(0, 5);
    console.log('  📅  5 oldest submissions (may need re-submission if content changed):');
    oldest.forEach(({ url, notifyTime }) => {
      console.log(`      ${relativeTime(notifyTime).padEnd(8)} ${url}`);
    });
    console.log();
  }
}

main().catch((err) => {
  console.error('Unhandled error:', err);
  process.exit(1);
});
