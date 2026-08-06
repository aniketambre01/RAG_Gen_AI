import type { UploadFile } from "../../types/upload";
import FileItem from "./FileItem";

interface FileListProps {
  files: UploadFile[];
  onRemove: (id: string) => void;
}

const FileList = ({ files, onRemove }: FileListProps) => {
  if (files.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-8 text-center text-slate-500">
        No files selected.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {files.map((file) => (
        <FileItem
          key={file.id}
          file={file}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default FileList;