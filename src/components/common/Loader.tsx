import React from "react";

type LoaderVariant = "spinner" | "dots" | "pulse" | "bars";
type LoaderSize = "sm" | "md" | "lg";

interface LoaderProps {
  variant?: LoaderVariant;
  size?: LoaderSize;
  text?: string;
  fullscreen?: boolean;
  overlay?: boolean;
  className?: string;
}

const sizeMap: Record<LoaderSize, string> = {
  sm: "w-5 h-5",
  md: "w-8 h-8",
  lg: "w-12 h-12",
};

const Spinner = ({ size }: { size: LoaderSize }) => (
  <svg
    className={`${sizeMap[size]} animate-spin text-blue-600`}
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="3"
      className="opacity-20"
    />
    <path
      fill="currentColor"
      d="M22 12A10 10 0 0012 2v4a6 6 0 016 6h4z"
    />
  </svg>
);

const Dots = () => (
  <div className="flex gap-2">
    <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.3s]" />
    <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.15s]" />
    <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-600" />
  </div>
);

const Pulse = ({ size }: { size: LoaderSize }) => (
  <div
    className={`${sizeMap[size]} animate-pulse rounded-full bg-blue-600`}
  />
);

const Bars = () => (
  <div className="flex h-10 items-end gap-1">
    {[...Array(5)].map((_, index) => (
      <span
        key={index}
        className="w-1.5 animate-pulse rounded bg-blue-600"
        style={{
          height: `${14 + index * 5}px`,
          animationDelay: `${index * 0.15}s`,
        }}
      />
    ))}
  </div>
);

const Loader: React.FC<LoaderProps> = ({
  variant = "spinner",
  size = "md",
  text,
  fullscreen = false,
  overlay = false,
  className = "",
}) => {
  const renderLoader = () => {
    switch (variant) {
      case "dots":
        return <Dots />;

      case "pulse":
        return <Pulse size={size} />;

      case "bars":
        return <Bars />;

      default:
        return <Spinner size={size} />;
    }
  };

  const content = (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center gap-4 ${className}`}
    >
      {renderLoader()}

      {text && (
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {text}
        </p>
      )}
    </div>
  );

  if (fullscreen) {
    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center ${
          overlay
            ? "bg-black/40 backdrop-blur-sm"
            : "bg-white dark:bg-slate-950"
        }`}
      >
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;