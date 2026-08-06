import type { UploadValidationResult } from "../types/upload";

const MAX_FILE_SIZE = 100 * 1024 * 1024; //100MB

export const ALLOWED_EXTENSIONS = [
  // Documents
  "pdf",
  "doc",
  "docx",
  "txt",
  "rtf",
  "md",

  // Excel
  "xls",
  "xlsx",
  "csv",

  // Presentation
  "ppt",
  "pptx",

  // Code
  "py",
  "java",
  "c",
  "cpp",
  "h",
  "hpp",
  "js",
  "jsx",
  "ts",
  "tsx",
  "json",
  "xml",
  "yaml",
  "yml",
  "html",
  "css",
  "sql",
];

export function validateFile(file: File): UploadValidationResult {
  const extension = file.name.split(".").pop()?.toLowerCase() || "";

  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    return {
      valid: false,
      message: `.${extension} files are not supported.`,
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      message: "Maximum allowed size is 100 MB.",
    };
  }

  return {
    valid: true,
  };
}