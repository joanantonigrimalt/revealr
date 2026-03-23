# Google Indexing API — Setup Guide

Scripts to submit and check all getrevealr.com URLs via the Google Indexing API.

## Quick Start

```bash
# 1. Install the auth library (one-time)
npm install google-auth-library --save-dev

# 2. Place your credentials file (see Setup below)
#    scripts/google-credentials.json

# 3. Submit all 52 URLs to Google
npm run index-urls

# 4. Check submission status
npm run check-indexing
```

---

## Setup: Create a Service Account

You only need to do this once.

### Step 1 — Create a Google Cloud Project

1. Go to https://console.cloud.google.com
2. Click **Select a project** → **New Project**
3. Name it `revealr-search` (or anything you like)
4. Click **Create**

### Step 2 — Enable the Indexing API

1. In your new project, go to **APIs & Services → Library**
2. Search for **Web Search Indexing API**
3. Click it → **Enable**

### Step 3 — Create a Service Account

1. Go to **APIs & Services → Credentials**
2. Click **+ Create Credentials → Service Account**
3. Name: `revealr-indexing`
4. Description: `Google Indexing API access for getrevealr.com`
5. Click **Create and Continue**
6. Role: skip (click **Continue** without adding a role — the Indexing API doesn't use IAM roles)
7. Click **Done**

### Step 4 — Download the JSON Key

1. In **APIs & Services → Credentials**, click your new service account
2. Go to the **Keys** tab
3. Click **Add Key → Create new key**
4. Choose **JSON** → **Create**
5. A file downloads (e.g., `revealr-search-abc123.json`)
6. **Rename it to `google-credentials.json`**
7. Move it to: `revealr/scripts/google-credentials.json`

> ⚠️  This file is in `.gitignore`. Never commit it to git.

### Step 5 — Add the Service Account as Owner in Search Console

This is the critical step. Without it, the API returns 403 errors.

1. Open your `google-credentials.json` file
2. Find the `client_email` field — it looks like:
   `revealr-indexing@revealr-search-XXXXX.iam.gserviceaccount.com`
3. Go to **Google Search Console** → https://search.google.com/search-console
4. Select your property: `https://getrevealr.com`
5. Go to **Settings → Users and permissions**
6. Click **Add user**
7. Paste the `client_email` address
8. Set permission to **Owner**
9. Click **Add**

> ⚠️  Must be **Owner**, not just "Full". Verified Owner is required for the Indexing API.

---

## What the Scripts Do

### `npm run index-urls` (submit-indexing.js)

- Submits all 52 URLs with `type: URL_UPDATED`
- Waits 1 second between each request
- Prints success/failure for each URL
- Total runtime: ~52 seconds

**API quota:** Google allows **200 requests/day** by default. 52 URLs is well within limits.

### `npm run check-indexing` (check-indexing.js)

- Queries the submission metadata for each URL
- Shows when each URL was last submitted
- Identifies URLs that have never been submitted
- Shows the 5 oldest submissions (candidates for re-submission)

> **Important:** "Submitted" ≠ "Indexed". The Indexing API tells Google to crawl the URL soon.
> Actual indexing is confirmed in Search Console → URL Inspection.

---

## URL Count

| Category               | Count |
|------------------------|-------|
| Static pages           | 6     |
| SEO landing pages      | 21    |
| Blog articles          | 25    |
| **Total**              | **52** |

---

## Credentials File Structure

Your `scripts/google-credentials.json` will look like this:

```json
{
  "type": "service_account",
  "project_id": "revealr-search-XXXXX",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----\n",
  "client_email": "revealr-indexing@revealr-search-XXXXX.iam.gserviceaccount.com",
  "client_id": "1234567890",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  ...
}
```

---

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `403 Forbidden` | Service account not added as Owner in Search Console | Repeat Step 5 |
| `403 Permission denied` | Indexing API not enabled in Google Cloud | Repeat Step 2 |
| `401 Unauthorized` | Wrong credentials file or expired key | Re-download the JSON key |
| `404 Not Found` | URL doesn't exist (typo or not deployed) | Verify the URL is live |
| Credentials file not found | File in wrong location | Ensure path is `scripts/google-credentials.json` |

---

## Re-submitting After Content Updates

Run `npm run index-urls` again whenever you:
- Publish new blog articles
- Update SEO landing page content
- Make significant changes to existing pages

Google processes re-submissions within hours rather than waiting for the next crawl cycle.
