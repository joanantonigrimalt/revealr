import { NextRequest, NextResponse } from 'next/server';
import { saveFile } from '@/lib/storage';
import { validateFile } from '@/lib/validators';

export const runtime = 'nodejs';
export const maxDuration = 30;

// POST /api/upload — saves file, returns fileKey (no payment required)
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const email = (formData.get('email') as string | null)?.trim() ?? '';

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    const validation = validateFile(file.name, file.size, file.type);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileKey = await saveFile(buffer, file.name);

    return NextResponse.json({ fileKey, fileName: file.name, email });
  } catch (err) {
    console.error('[upload]', err);
    return NextResponse.json({ error: 'Upload failed.' }, { status: 500 });
  }
}
