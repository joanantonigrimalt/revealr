'use client';

import { useCallback, useState, useRef } from 'react';
import { validateFile, MAX_FILE_SIZE_BYTES, ALLOWED_EXTENSIONS } from '@/lib/validators';
import { formatFileSize as fmt } from '@/lib/utils';

type Props = {
  onFileSelected: (file: File) => void;
  onError: (msg: string) => void;
  selectedFile: File | null;
  disabled?: boolean;
};

export default function UploadDropzone({ onFileSelected, onError, selectedFile, disabled }: Props) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      const validation = validateFile(file.name, file.size, file.type);
      if (!validation.valid) {
        onError(validation.error);
        return;
      }
      onError('');
      onFileSelected(file);
    },
    [onFileSelected, onError]
  );

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      if (disabled) return;
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile, disabled]
  );

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  }, [disabled]);

  const onDragLeave = useCallback(() => setIsDragOver(false), []);

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
      e.target.value = '';
    },
    [handleFile]
  );

  const hasFile = Boolean(selectedFile);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Upload lease document"
      onClick={() => !disabled && inputRef.current?.click()}
      onKeyDown={(e) => e.key === 'Enter' && !disabled && inputRef.current?.click()}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className={[
        'relative flex flex-col items-center justify-center w-full rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer select-none',
        hasFile ? 'py-6 px-8' : 'py-12 px-8',
        isDragOver
          ? 'border-accent bg-accent-light scale-[1.01]'
          : hasFile
          ? 'border-accent/40 bg-accent-light/40'
          : 'border-border-base bg-bg-card hover:border-accent/40 hover:bg-accent-light/20',
        disabled ? 'opacity-50 cursor-not-allowed' : '',
      ].join(' ')}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        onChange={onInputChange}
        className="hidden"
        disabled={disabled}
      />

      {hasFile ? (
        /* File selected state */
        <div className="flex items-center gap-4 w-full">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <FileIcon mimeType={selectedFile!.type} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-text-primary truncate text-sm">{selectedFile!.name}</div>
            <div className="text-text-muted text-xs mt-0.5">{fmt(selectedFile!.size)}</div>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onFileSelected(null as unknown as File);
            }}
            className="flex-shrink-0 w-7 h-7 rounded-full bg-border-base flex items-center justify-center hover:bg-border-strong transition-colors text-text-secondary text-xs"
            aria-label="Remove file"
          >
            ✕
          </button>
        </div>
      ) : (
        /* Idle / drag-over state */
        <>
          <div
            className={[
              'w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-colors',
              isDragOver ? 'bg-accent text-white' : 'bg-bg-base text-text-secondary',
            ].join(' ')}
          >
            <UploadIcon />
          </div>
          <div className="text-center">
            <p className="font-semibold text-text-primary text-base mb-1">
              {isDragOver ? 'Drop your lease here' : 'Drop your lease here'}
            </p>
            <p className="text-text-secondary text-sm mb-3">
              or <span className="text-accent font-medium underline underline-offset-2">click to browse</span>
            </p>
            <p className="text-text-muted text-xs">
              {ALLOWED_EXTENSIONS.map((e) => e.toUpperCase()).join(', ')} · Max {MAX_FILE_SIZE_BYTES / 1024 / 1024} MB
            </p>
          </div>
        </>
      )}
    </div>
  );
}

function UploadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function FileIcon({ mimeType }: { mimeType: string }) {
  if (mimeType.startsWith('image/')) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e8572a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e8572a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}
