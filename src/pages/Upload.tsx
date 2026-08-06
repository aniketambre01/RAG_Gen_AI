import UploadArea from "../components/upload/UploadArea";
import FileList from "../components/upload/FileList";
import UploadSummary from "../components/upload/UploadSummary";
import UploadToolbar from "../components/upload/UploadToolbar";
import { useFileUpload } from "../hooks/useFileUpload";

const Upload = () => {
  const {
    files,
    addFiles,
    removeFile,
    clearFiles,
  } = useFileUpload();

  const handleUpload = () => {
    console.log("Uploading files...");
    console.log(files);

    // Later:
    // uploadService.upload(files);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Upload Documents
        </h1>

        <p className="mt-2 text-slate-500">
          Upload documents, spreadsheets, PDFs and source code files.
        </p>
      </div>

      {/* Upload Area */}
      <UploadArea onFilesSelected={addFiles} />

      {/* Summary */}
      {files.length > 0 && (
        <UploadSummary files={files} />
      )}

      {/* Toolbar */}
      {files.length > 0 && (
        <UploadToolbar
          disabled={false}
          onUpload={handleUpload}
          onClear={clearFiles}
        />
      )}

      {/* Files */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="mb-4 text-xl font-semibold">
          Selected Files
        </h2>

        <FileList
          files={files}
          onRemove={removeFile}
        />

      </div>

    </div>
  );
};

export default Upload;