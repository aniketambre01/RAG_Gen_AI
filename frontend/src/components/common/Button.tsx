import React from "react";

type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "danger"
  | "success"
  | "ghost";

type Size = "sm" | "md" | "lg" | "xl";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  rounded?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-blue-600 hover:bg-blue-700 text-white shadow-md",

  secondary:
    "bg-gray-700 hover:bg-gray-800 text-white",

  outline:
    "border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800",

  danger:
    "bg-red-600 hover:bg-red-700 text-white",

  success:
    "bg-green-600 hover:bg-green-700 text-white",

  ghost:
    "bg-transparent hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-200",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-3 py-2 text-sm",

  md: "px-4 py-2 text-base",

  lg: "px-6 py-3 text-lg",

  xl: "px-8 py-4 text-xl",
};

const Spinner = () => (
  <svg
    className="h-5 w-5 animate-spin"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-20"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />

    <path
      className="opacity-90"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
);

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  rounded = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  type = "button",
  ...props
}) => {
  const classes = `
    inline-flex
    items-center
    justify-center
    gap-2
    font-medium
    transition-all
    duration-200
    focus:outline-none
    focus:ring-2
    focus:ring-blue-500
    focus:ring-offset-2
    disabled:opacity-50
    disabled:cursor-not-allowed
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${rounded ? "rounded-full" : "rounded-lg"}
    ${fullWidth ? "w-full" : ""}
    ${className}
  `;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={classes}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <>
          <Spinner />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {leftIcon && (
            <span className="flex items-center">{leftIcon}</span>
          )}

          <span>{children}</span>

          {rightIcon && (
            <span className="flex items-center">{rightIcon}</span>
          )}
        </>
      )}
    </button>
  );
};

export default Button;