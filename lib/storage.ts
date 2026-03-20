import { writeFile, readFile, unlink } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import { randomUUID } from 'crypto';

// In production with Vercel Blob token set, we use Vercel Blob.
// Otherwise, we fall back to local /tmp storage (fine for dev & single-instance).
const USE_BLOB = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

// ─── Save ─────────────────────────────────────────────────────────────────────

export async function saveFile(
  buffer: Buffer,
  originalName: string
): Promise<string> {
  const safeName = originalName.replace(/[^a-z0-9._-]/gi, '_');
  const key = `${randomUUID()}-${safeName}`;

  if (USE_BLOB) {
    const { put } = await import('@vercel/blob');
    const blob = await put(`revealr/${key}`, buffer, { access: 'public' });
    // Return the URL as the key — used later to fetch the file
    return blob.url;
  }

  const path = join(tmpdir(), key);
  await writeFile(path, buffer);
  return key; // just the filename segment for local storage
}

// ─── Read ─────────────────────────────────────────────────────────────────────

export async function getFile(key: string): Promise<Buffer> {
  if (USE_BLOB || key.startsWith('http')) {
    const res = await fetch(key);
    if (!res.ok) throw new Error(`Failed to fetch file from storage: ${res.status}`);
    return Buffer.from(await res.arrayBuffer());
  }

  const path = join(tmpdir(), key);
  return readFile(path);
}

// ─── Delete ───────────────────────────────────────────────────────────────────

export async function deleteFile(key: string): Promise<void> {
  if (USE_BLOB || key.startsWith('http')) {
    try {
      const { del } = await import('@vercel/blob');
      await del(key);
    } catch {
      // Non-fatal — blob may have already been cleaned up
    }
    return;
  }

  const path = join(tmpdir(), key);
  await unlink(path).catch(() => {});
}
