import React from "react";
import { FileQuestion } from "lucide-react";
import Button from "./Button";

interface EmptyStateProps {
  title: string;

  description?: string;

  icon?: React.ReactNode;

  actionLabel?: string;

  onAction?: () => void;

  secondaryActionLabel?: string;

  onSecondaryAction?: () => void;

  loading?: boolean;

  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  loading = false,
  className = "",
}) => {
  if (loading) {
    return (
      <div
        className={`
          flex
          flex-col
          items-center
          justify-center
          rounded-xl
          border
          border-dashed
          border-gray-300
          dark:border-slate-700
          p-10
          animate-pulse
          ${className}
        `}
      >
        <div className="h-20 w-20 rounded-full bg-gray-300 dark:bg-slate-700" />

        <div className="mt-6 h-5 w-52 rounded bg-gray-300 dark:bg-slate-700" />

        <div className="mt-3 h-4 w-72 rounded bg-gray-300 dark:bg-slate-700" />

        <div className="mt-8 h-10 w-36 rounded-lg bg-gray-300 dark:bg-slate-700" />
      </div>
    );
  }

  return (
    <div
      className={`
        flex
        flex-col
        items-center
        justify-center
        rounded-xl
        border
        border-dashed
        border-gray-300
        dark:border-slate-700
        bg-white
        dark:bg-slate-900
        px-8
        py-12
        text-center
        ${className}
      `}
    >
      <div
        className="
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          bg-blue-100
          text-blue-600
          dark:bg-blue-900/20
        "
      >
        {icon ?? <FileQuestion size={40} />}
      </div>

      <h2
        className="
          mt-6
          text-2xl
          font-semibold
          text-gray-900
          dark:text-white
        "
      >
        {title}
      </h2>

      {description && (
        <p
          className="
            mt-3
            max-w-md
            text-gray-500
            dark:text-gray-400
          "
        >
          {description}
        </p>
      )}

      {(actionLabel || secondaryActionLabel) && (
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {actionLabel && (
            <Button onClick={onAction}>
              {actionLabel}
            </Button>
          )}

          {secondaryActionLabel && (
            <Button
              variant="outline"
              onClick={onSecondaryAction}
            >
              {secondaryActionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState;