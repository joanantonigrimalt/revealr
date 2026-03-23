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

export type DocumentCategory =
  | 'lease'
  | 'purchase'
  | 'employment'
  | 'nda'
  | 'freelance'
  | 'service'
  | 'non-compete'
  | 'ip-assignment'
  | 'generic';

export type AnalysisConfidence = 'high' | 'medium' | 'low';

export type LeaseAnalysisResult = {
  riskScore: number;           // 0–100 (−1 = quality gate failure)
  qualityFailureReason?: 'not_a_contract' | 'unreadable';
  state: string;               // detected jurisdiction or "Not specified"
  leaseType: string;           // human-readable document type
  summary: string;             // one-sentence overview
  flags: AnalysisFlag[];
  // Extended fields (optional for backward compat)
  documentCategory?: DocumentCategory;
  confidence?: AnalysisConfidence;
  missingInfo?: string;        // ambiguities or incomplete text note
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
  sessionId?: string;
  fileKey?: string;
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
