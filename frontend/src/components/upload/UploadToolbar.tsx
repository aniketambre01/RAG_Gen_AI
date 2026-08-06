import Button from "../common/Button";

interface UploadToolbarProps {
  disabled: boolean;
  onUpload: () => void;
  onClear: () => void;
}

const UploadToolbar = ({
  disabled,
  onUpload,
  onClear,
}: UploadToolbarProps) => {
  return (
    <div className="flex justify-end gap-4">

      <Button
        variant="secondary"
        onClick={onClear}
        disabled={disabled}
      >
        Clear
      </Button>

      <Button
        onClick={onUpload}
        disabled={disabled}
      >
        Upload Files
      </Button>

    </div>
  );
};

export default UploadToolbar;