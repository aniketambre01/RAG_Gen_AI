export type UploadStatus =
  | "pending"
  | "uploading"
  | "processing"
  | "completed"
  | "failed"
  | "cancelled";

export interface UploadFile {
  id: string;
  file: File;
  name: string;
  extension: string;
  size: number;
  progress: number;
  status: UploadStatus;
  error?: string;
  uploadedAt?: Date;
}

export interface UploadResponse {
  success: boolean;
  message: string;
  documentId: string;
}

export interface UploadValidationResult {
  valid: boolean;
  message?: string;
}