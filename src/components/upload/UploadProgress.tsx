interface UploadProgressProps {
  progress: number;
}

const UploadProgress = ({ progress }: UploadProgressProps) => {
  return (
    <div className="mt-2">
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-1 text-right text-xs text-slate-500">
        {progress}%
      </p>
    </div>
  );
};

export default UploadProgress;