'use client';

import { useState, useCallback, useRef } from 'react';
import { validateFile, validateEmail } from '@/lib/validators';
import { formatFileSize } from '@/lib/utils';

type Step = 'upload' | 'email';

export default function UploadWidget() {
  const [step, setStep] = useState<Step>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [email, setEmail] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileError, setFileError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    const v = validateFile(f.name, f.size, f.type);
    if (!v.valid) { setFileError(v.error); return; }
    setFileError('');
    setFile(f);
    setStep('email');
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const handleStart = async () => {
    if (!validateEmail(email)) { setEmailError('Please enter a valid email address.'); return; }
    setEmailError('');
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('file', file!);
      fd.append('email', email.trim());

      const res = await fetch('/api/upload', { method: 'POST', body: fd });

      let data: Record<string, string> = {};
      try { data = await res.json(); } catch {
        throw new Error('Server error. Please try again in a moment.');
      }

      if (!res.ok) throw new Error(data.error ?? `Upload failed (${res.status}).`);

      window.location.href = `/dashboard?file=${encodeURIComponent(data.fileKey)}&name=${encodeURIComponent(data.fileName)}&email=${encodeURIComponent(email.trim())}`;
    } catch (err) {
      setEmailError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        className="hidden"
        aria-label="Upload your contract document"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }}
      />

      {step === 'upload' ? (
        <div
          role="button"
          tabIndex={0}
          aria-label="Drop zone for document upload"
          onDrop={onDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
          className={[
            'flex flex-col items-center justify-center rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 p-8',
            isDragOver
              ? 'border-[#e8572a] bg-[#fdf0eb] scale-[1.01]'
              : 'border-[#d5d0cb] bg-[#faf9f7] hover:border-[#e8572a] hover:bg-[#fdf9f8]',
          ].join(' ')}
          style={{ minHeight: 340 }}
        >
          <div className={[
            'w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors',
            isDragOver ? 'bg-[#e8572a]' : 'bg-white shadow-md',
          ].join(' ')} aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke={isDragOver ? '#fff' : '#e8572a'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>

          <p className="font-bold text-lg text-[#1a1814] mb-1 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            {isDragOver ? 'Release to analyze' : 'Drop your contract here'}
          </p>
          <p className="text-sm text-[#9c9590] text-center mb-5 leading-relaxed">
            PDF, Word or image · Max 20 MB<br />
            Encrypted in transit · Deleted after analysis
          </p>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
            className="flex items-center gap-2 bg-[#1a1814] text-white font-semibold text-sm px-7 py-3 rounded-full hover:bg-black transition-colors shadow-lg mb-2"
          >
            Choose File
          </button>
          <span className="text-xs text-[#9c9590]">or drag & drop</span>

          <div className="flex gap-1.5 mt-6 flex-wrap justify-center" aria-label="Accepted file formats">
            {['PDF', 'DOCX', 'DOC', 'JPG', 'PNG'].map((ext) => (
              <span key={ext} className="px-2 py-0.5 bg-white border border-[#e8e4df] rounded text-xs text-[#9c9590] font-medium">
                {ext}
              </span>
            ))}
          </div>

          {fileError && (
            <p role="alert" className="mt-4 text-sm text-red-500 text-center">{fileError}</p>
          )}
        </div>

      ) : (
        /* ── Email step ── */
        <div className="bg-white border border-[#e8e4df] rounded-2xl p-7 shadow-xl" style={{ minHeight: 340 }}>
          {/* File confirmed */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f0fdf4] border border-green-100 mb-5">
            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0" aria-hidden="true">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#1a1814] truncate">{file?.name}</p>
              <p className="text-xs text-[#6b6560]">{file ? formatFileSize(file.size) : ''}</p>
            </div>
            <button
              onClick={() => { setFile(null); setStep('upload'); setEmailError(''); }}
              className="text-xs text-[#9c9590] hover:text-[#1a1814] underline flex-shrink-0 transition-colors"
              aria-label="Remove selected file and choose again"
            >
              Change
            </button>
          </div>

          <label htmlFor="upload-widget-email" className="block text-sm font-semibold text-[#1a1814] mb-1">
            Email address
          </label>
          <p className="text-xs text-[#9c9590] mb-2">Your report will be sent here after you unlock it.</p>
          <input
            id="upload-widget-email"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
            onKeyDown={(e) => e.key === 'Enter' && handleStart()}
            placeholder="you@example.com"
            autoComplete="email"
            autoFocus
            aria-describedby={emailError ? 'upload-widget-email-error' : undefined}
            className={[
              'w-full px-4 py-3 rounded-xl border text-sm text-[#1a1814] placeholder-[#9c9590] mb-1',
              'focus:outline-none focus:ring-2 focus:ring-[#e8572a]/20 focus:border-[#e8572a]/60 transition-all',
              emailError ? 'border-red-400' : 'border-[#e8e4df]',
            ].join(' ')}
          />
          {emailError && (
            <p id="upload-widget-email-error" role="alert" className="text-xs text-red-500 mb-1">{emailError}</p>
          )}

          <button
            onClick={handleStart}
            disabled={loading || !email}
            className="w-full mt-4 flex items-center justify-center gap-2 bg-[#1a1814] hover:bg-black text-white font-bold text-base py-3.5 rounded-xl transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
                </svg>
                Uploading…
              </>
            ) : (
              <>Analyze My Contract — Free Preview <span className="text-[#e8572a]">→</span></>
            )}
          </button>

          <p className="text-center text-xs text-[#9c9590] mt-3">
            Preview is free · Pay $19 only to unlock the full report
          </p>
        </div>
      )}
    </div>
  );
}
