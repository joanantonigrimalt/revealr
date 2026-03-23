/**
 * scripts/submit-indexing.js
 *
 * Submits all getrevealr.com URLs to Google via the Indexing API (URL_UPDATED).
 * Requires: google-auth-library  →  npm install google-auth-library --save-dev
 *
 * Setup:
 *   1. Place your service account key at: scripts/google-credentials.json
 *   2. Run: npm run index-urls
 *
 * Quota: Google allows 200 Indexing API requests/day by default.
 *        This script submits 52 URLs — well within the limit.
 */

const { GoogleAuth } = require('google-auth-library');
const https = require('https');
const path = require('path');
const fs = require('fs');

// ─── Config ──────────────────────────────────────────────────────────────────

const BASE_URL = 'https://getrevealr.com';
const CREDENTIALS_PATH = path.join(__dirname, 'google-credentials.json');
const INDEXING_API = 'https://indexing.googleapis.com/v3/urlNotifications:publish';
const DELAY_MS = 1000; // 1 second between requests

// ─── All URLs in the sitemap ─────────────────────────────────────────────────

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
  'ai-contract-review',
  'contract-red-flags',
  'sign-contract-checklist',
  'job-offer-letter-review',
  'rental-agreement-review',
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

function postJSON(url, body, accessToken) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  // Check credentials file exists
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error('\n❌  Credentials file not found.');
    console.error(`   Expected: ${CREDENTIALS_PATH}`);
    console.error('   See the README in scripts/ for setup instructions.\n');
    process.exit(1);
  }

  console.log(`\n📋  Revealr Indexing API — URL Submission`);
  console.log(`    Total URLs: ${ALL_URLS.length}`);
  console.log(`    Delay between requests: ${DELAY_MS}ms`);
  console.log(`    Estimated time: ~${Math.ceil((ALL_URLS.length * DELAY_MS) / 1000)}s\n`);

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
    console.log('✅  Authenticated with Google Indexing API\n');
  } catch (err) {
    console.error('❌  Authentication failed:', err.message);
    process.exit(1);
  }

  // Submit each URL
  let success = 0;
  let failed = 0;
  const errors = [];

  for (let i = 0; i < ALL_URLS.length; i++) {
    const url = ALL_URLS[i];
    const label = `[${String(i + 1).padStart(2, '0')}/${ALL_URLS.length}]`;

    try {
      const result = await postJSON(
        INDEXING_API,
        { url, type: 'URL_UPDATED' },
        accessToken
      );

      if (result.status === 200) {
        const notified = result.body.urlNotificationMetadata?.latestUpdate?.notifyTime
          ? ` — notified: ${new Date(result.body.urlNotificationMetadata.latestUpdate.notifyTime).toISOString()}`
          : '';
        console.log(`  ✅  ${label} ${url}${notified}`);
        success++;
      } else {
        const errMsg = result.body?.error?.message ?? JSON.stringify(result.body);
        console.log(`  ❌  ${label} ${url} — HTTP ${result.status}: ${errMsg}`);
        errors.push({ url, status: result.status, message: errMsg });
        failed++;
      }
    } catch (err) {
      console.log(`  💥  ${label} ${url} — ${err.message}`);
      errors.push({ url, status: 'network', message: err.message });
      failed++;
    }

    // Delay between requests (skip after last one)
    if (i < ALL_URLS.length - 1) {
      await delay(DELAY_MS);
    }
  }

  // Summary
  console.log('\n' + '─'.repeat(60));
  console.log(`\n📊  Summary`);
  console.log(`    ✅  Submitted: ${success} / ${ALL_URLS.length}`);
  if (failed > 0) {
    console.log(`    ❌  Failed:    ${failed} / ${ALL_URLS.length}`);
    console.log('\n  Failed URLs:');
    errors.forEach(({ url, status, message }) => {
      console.log(`    • ${url}`);
      console.log(`      Status: ${status} — ${message}`);
    });
  }
  console.log('\n  Google typically processes indexing requests within 24–72 hours.');
  console.log('  Check Search Console Coverage report to verify.\n');
}

main().catch((err) => {
  console.error('Unhandled error:', err);
  process.exit(1);
});
