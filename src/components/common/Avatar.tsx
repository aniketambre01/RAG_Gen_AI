import React, { useMemo, useState } from "react";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

type UserStatus =
  | "online"
  | "offline"
  | "busy"
  | "away";

interface AvatarProps {
  name: string;

  src?: string;

  alt?: string;

  size?: AvatarSize;

  status?: UserStatus;

  rounded?: boolean;

  bordered?: boolean;

  loading?: boolean;

  className?: string;

  onClick?: () => void;
}

const sizeClasses: Record<AvatarSize, string> = {
  xs: "w-8 h-8 text-xs",
  sm: "w-10 h-10 text-sm",
  md: "w-12 h-12 text-base",
  lg: "w-16 h-16 text-lg",
  xl: "w-20 h-20 text-xl",
  "2xl": "w-28 h-28 text-2xl",
};

const statusColor: Record<UserStatus, string> = {
  online: "bg-green-500",
  offline: "bg-gray-400",
  busy: "bg-red-500",
  away: "bg-yellow-500",
};

const statusSize: Record<AvatarSize, string> = {
  xs: "w-2 h-2",
  sm: "w-2.5 h-2.5",
  md: "w-3 h-3",
  lg: "w-4 h-4",
  xl: "w-5 h-5",
  "2xl": "w-6 h-6",
};

const colors = [
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-purple-500",
  "bg-pink-500",
];

const Avatar: React.FC<AvatarProps> = ({
  name,
  src,
  alt,
  size = "md",
  status,
  rounded = true,
  bordered = false,
  loading = false,
  className = "",
  onClick,
}) => {
  const [imageError, setImageError] = useState(false);

  const initials = useMemo(() => {
    return name
      .trim()
      .split(" ")
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  }, [name]);

  const bgColor = useMemo(() => {
    const index = name.length % colors.length;
    return colors[index];
  }, [name]);

  if (loading) {
    return (
      <div
        className={`
          animate-pulse
          ${sizeClasses[size]}
          ${rounded ? "rounded-full" : "rounded-lg"}
          bg-gray-300 dark:bg-slate-700
        `}
      />
    );
  }

  return (
    <div
      className={`
        relative
        inline-flex
        ${className}
      `}
    >
      <div
        onClick={onClick}
        className={`
          ${sizeClasses[size]}
          ${rounded ? "rounded-full" : "rounded-lg"}
          overflow-hidden
          flex
          items-center
          justify-center
          font-semibold
          text-white
          select-none
          transition
          ${bordered ? "border-2 border-white dark:border-slate-900" : ""}
          ${onClick ? "cursor-pointer hover:opacity-90" : ""}
          ${!src || imageError ? bgColor : ""}
        `}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt ?? name}
            className="h-full w-full object-cover"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          initials
        )}
      </div>

      {status && (
        <span
          className={`
            absolute
            bottom-0
            right-0
            ${statusSize[size]}
            ${statusColor[status]}
            rounded-full
            ring-2
            ring-white
            dark:ring-slate-900
          `}
        />
      )}
    </div>
  );
};

export default Avatar;