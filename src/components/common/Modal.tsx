import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type ModalSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

interface ModalProps {
  open: boolean;
  title?: string;
  children: React.ReactNode;

  onClose: () => void;

  footer?: React.ReactNode;

  closeOnOverlay?: boolean;

  closeOnEsc?: boolean;

  showCloseButton?: boolean;

  loading?: boolean;

  size?: ModalSize;

  className?: string;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  "2xl": "max-w-6xl",
  full: "w-[95vw] h-[95vh]",
};

const Modal: React.FC<ModalProps> = ({
  open,
  title,
  children,
  onClose,
  footer,
  closeOnOverlay = true,
  closeOnEsc = true,
  showCloseButton = true,
  loading = false,
  size = "md",
  className = "",
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && closeOnEsc) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, closeOnEsc, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={() => {
        if (closeOnOverlay) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        className={`
          relative
          w-full
          rounded-xl
          bg-white
          dark:bg-slate-900
          shadow-2xl
          border
          border-gray-200
          dark:border-slate-700
          animate-in
          fade-in
          zoom-in-95
          duration-200
          ${sizeClasses[size]}
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-700 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h2>

            {showCloseButton && (
              <button
                onClick={onClose}
                className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}

        <div className="max-h-[70vh] overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            </div>
          ) : (
            children
          )}
        </div>

        {footer && (
          <div className="flex justify-end gap-3 border-t border-gray-200 dark:border-slate-700 px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Modal;