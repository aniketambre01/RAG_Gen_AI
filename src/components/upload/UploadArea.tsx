import { UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";

interface UploadAreaProps {
  onFilesSelected: (files: File[]) => void;
}

const UploadArea = ({ onFilesSelected }: UploadAreaProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,

    onDrop: (acceptedFiles) => {
      onFilesSelected(acceptedFiles);
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-2xl p-12
        cursor-pointer transition-all duration-300
        text-center
        ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-slate-300 hover:border-blue-500 hover:bg-slate-50"
        }
      `}
    >
      <input {...getInputProps()} />

      <UploadCloud
        size={60}
        className="mx-auto text-blue-600 mb-4"
      />

      <h2 className="text-2xl font-semibold">
        Drag & Drop Files
      </h2>

      <p className="mt-2 text-slate-500">
        or click to browse files
      </p>

      <div className="mt-6 text-sm text-slate-400">
        PDF • DOCX • XLSX • CSV • TXT • MD
      </div>

      <div className="text-sm text-slate-400">
        PY • JAVA • C • CPP • JS • TS • JSON
      </div>
    </div>
  );
};

export default UploadArea;