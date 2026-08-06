import React from "react";

interface CardProps {
  children: React.ReactNode;

  title?: string;

  description?: string;

  header?: React.ReactNode;

  footer?: React.ReactNode;

  actions?: React.ReactNode;

  className?: string;

  hover?: boolean;

  clickable?: boolean;

  loading?: boolean;

  onClick?: () => void;
}

const Skeleton = () => {
  return (
    <div className="animate-pulse space-y-4">

      <div className="h-6 w-1/3 rounded bg-gray-300 dark:bg-slate-700" />

      <div className="h-4 w-full rounded bg-gray-300 dark:bg-slate-700" />

      <div className="h-4 w-5/6 rounded bg-gray-300 dark:bg-slate-700" />

      <div className="h-40 rounded bg-gray-300 dark:bg-slate-700" />
    </div>
  );
};

const Card: React.FC<CardProps> = ({
  children,

  title,

  description,

  header,

  footer,

  actions,

  className = "",

  hover = false,

  clickable = false,

  loading = false,

  onClick,
}) => {
  const classes = `
    bg-white
    dark:bg-slate-900
    border
    border-gray-200
    dark:border-slate-700
    rounded-xl
    shadow-sm
    overflow-hidden
    transition-all
    duration-300

    ${hover ? "hover:shadow-xl hover:-translate-y-1" : ""}

    ${clickable ? "cursor-pointer" : ""}

    ${className}
  `;

  return (
    <div
      className={classes}
      onClick={onClick}
    >
      {loading ? (
        <div className="p-6">
          <Skeleton />
        </div>
      ) : (
        <>
          {(header || title || description || actions) && (
            <div className="border-b border-gray-200 dark:border-slate-700 p-5">

              <div className="flex items-start justify-between gap-4">

                <div>

                  {header}

                  {title && (
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {title}
                    </h2>
                  )}

                  {description && (
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {description}
                    </p>
                  )}

                </div>

                {actions && (
                  <div className="flex items-center gap-2">
                    {actions}
                  </div>
                )}

              </div>

            </div>
          )}

          <div className="p-5">
            {children}
          </div>

          {footer && (
            <div className="border-t border-gray-200 dark:border-slate-700 p-5">
              {footer}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Card;