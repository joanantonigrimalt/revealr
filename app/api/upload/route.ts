import { NextRequest, NextResponse } from 'next/server';
import { saveFile } from '@/lib/storage';
import { validateFile } from '@/lib/validators';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const fileField = formData.get('file');
    const email = (formData.get('email') as string | null)?.trim() ?? '';

    // typeof string = it's a text field, not a file — safe check for Node 18
    if (!fileField || typeof fileField === 'string') {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    // Cast to Blob (File extends Blob, available in Node 18+)
    const file = fileField as Blob & { name: string; type: string };

    const validation = validateFile(file.name, file.size, file.type);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileKey = await saveFile(buffer, file.name);

    return NextResponse.json({ fileKey, fileName: file.name, email });
  } catch (err) {
    console.error('[upload]', err);
    const msg = err instanceof Error ? err.message : 'Upload failed.';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
