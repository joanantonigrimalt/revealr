// ─── File Types ──────────────────────────────────────────────────────────────

export type SupportedMimeType =
  | 'application/pdf'
  | 'application/msword'
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  | 'image/jpeg'
  | 'image/png';

export type FileExtension = 'pdf' | 'doc' | 'docx' | 'jpg' | 'jpeg' | 'png';

export type UploadedFileMeta = {
  key: string;          // Storage key (local path segment or Vercel Blob URL)
  name: string;         // Original file name
  size: number;         // Bytes
  mimeType: string;
  uploadedAt: string;   // ISO date string
};

// ─── Analysis Types ───────────────────────────────────────────────────────────

export type FlagType = 'critical' | 'warning' | 'info';

export type AnalysisFlag = {
  type: FlagType;
  section: string;      // e.g. "§4.2"
  title: string;
  description: string;  // plain-English explanation
  action: string;       // what the tenant should do
};

export type LeaseAnalysisResult = {
  riskScore: number;    // 0–100
  state: string;        // detected US state
  leaseType: string;    // type of lease
  summary: string;      // one-sentence overview
  flags: AnalysisFlag[];
};

export type RiskLevel = 'low' | 'moderate' | 'high' | 'severe';

// ─── API Payloads ─────────────────────────────────────────────────────────────

export type CheckoutSessionPayload = {
  email: string;
  fileKey: string;
  fileName: string;
};

export type AnalyzeRequestPayload = {
  sessionId: string;
  fileKey: string;
  fileName: string;
};

export type EmailReportPayload = {
  email: string;
  result: LeaseAnalysisResult;
  fileName: string;
};

// ─── API Response Types ───────────────────────────────────────────────────────

export type ApiError = {
  error: string;
  code?: string;
};

export type CreateCheckoutResponse = {
  url: string;
};

export type AnalyzeResponse = LeaseAnalysisResult & {
  emailSent?: boolean;
};

export type SendReportResponse = {
  success: boolean;
  message: string;
};

// ─── Dashboard State ──────────────────────────────────────────────────────────

export type DashboardStatus =
  | 'verifying'
  | 'analyzing'
  | 'success'
  | 'error';

export type ProgressStep = {
  id: string;
  label: string;
  sublabel: string;
};
