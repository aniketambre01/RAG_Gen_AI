import { useState } from "react";
import { validateFile } from "../utils/fileValidation";
import type { UploadFile } from "../types/upload";

export function useFileUpload() {
  const [files, setFiles] = useState<UploadFile[]>([]);

  const addFiles = (selectedFiles: File[]) => {
    const newFiles: UploadFile[] = [];

    selectedFiles.forEach((file) => {
      const validation = validateFile(file);

      newFiles.push({
        id: crypto.randomUUID(),
        file,
        name: file.name,
        extension: file.name.split(".").pop() || "",
        size: file.size,
        progress: 0,
        status: validation.valid ? "pending" : "failed",
        error: validation.message,
      });
    });

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const clearFiles = () => {
    setFiles([]);
  };

  return {
    files,
    addFiles,
    removeFile,
    clearFiles,
  };
}