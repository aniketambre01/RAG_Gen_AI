import type { UploadFile } from "../../types/upload";

interface UploadSummaryProps {
  files: UploadFile[];
}

const UploadSummary = ({ files }: UploadSummaryProps) => {

  const totalSize = files.reduce(
    (sum, file) => sum + file.size,
    0
  );

  const completed = files.filter(
    (file) => file.status === "completed"
  ).length;

  return (
    <div className="grid grid-cols-3 gap-4">

      <div className="rounded-xl border bg-white p-4">
        <h3 className="text-sm text-slate-500">
          Total Files
        </h3>

        <p className="text-3xl font-bold">
          {files.length}
        </p>
      </div>

      <div className="rounded-xl border bg-white p-4">
        <h3 className="text-sm text-slate-500">
          Total Size
        </h3>

        <p className="text-3xl font-bold">
          {(totalSize / 1024 / 1024).toFixed(2)} MB
        </p>
      </div>

      <div className="rounded-xl border bg-white p-4">
        <h3 className="text-sm text-slate-500">
          Completed
        </h3>

        <p className="text-3xl font-bold">
          {completed}
        </p>
      </div>

    </div>
  );
};

export default UploadSummary;