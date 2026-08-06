import { Trash2, FileText, FileCode2, FileSpreadsheet } from "lucide-react";
import type { UploadFile } from "../../types/upload";
import UploadProgress from "./UploadProgress";

interface FileItemProps {
  file: UploadFile;
  onRemove: (id: string) => void;
}

const getIcon = (extension: string) => {
  const ext = extension.toLowerCase();

  if (["pdf", "doc", "docx", "txt", "md"].includes(ext)) {
    return <FileText className="text-blue-500" size={24} />;
  }

  if (["xls", "xlsx", "csv"].includes(ext)) {
    return <FileSpreadsheet className="text-green-500" size={24} />;
  }

  return <FileCode2 className="text-purple-500" size={24} />;
};

const formatSize = (size: number) => {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
};

const FileItem = ({ file, onRemove }: FileItemProps) => {
  return (
    <div className="flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm">

      <div className="flex items-center gap-4">

        {getIcon(file.extension)}

        <div>
          <h3 className="font-medium">{file.name}</h3>

          <p className="text-sm text-slate-500">
            {formatSize(file.size)}
          </p>

          <span className="text-xs text-blue-600 capitalize">
            {file.status}
            <UploadProgress progress={file.progress} />
          </span>
        </div>

      </div>

      <button
        onClick={() => onRemove(file.id)}
        className="rounded-lg p-2 text-red-500 hover:bg-red-50"
      >
        <Trash2 size={18} />
      </button>

    </div>
  );
};

export default FileItem;