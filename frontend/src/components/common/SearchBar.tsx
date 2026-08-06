import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Loader2,
  Search,
  X,
} from "lucide-react";

interface SearchBarProps {
  value: string;

  onChange: (value: string) => void;

  onSearch?: (value: string) => void;

  placeholder?: string;

  debounce?: number;

  loading?: boolean;

  autoFocus?: boolean;

  disabled?: boolean;

  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,

  onChange,

  onSearch,

  placeholder = "Search...",

  debounce = 400,

  loading = false,

  autoFocus = false,

  disabled = false,

  className = "",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [keyword, setKeyword] = useState(value);

  useEffect(() => {
    setKeyword(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch?.(keyword);
    }, debounce);

    return () => clearTimeout(timer);
  }, [keyword, debounce, onSearch]);

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }

    const shortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", shortcut);

    return () => {
      window.removeEventListener("keydown", shortcut);
    };
  }, [autoFocus]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setKeyword(event.target.value);
    onChange(event.target.value);
  };

  const clearSearch = () => {
    setKeyword("");
    onChange("");
    onSearch?.("");
    inputRef.current?.focus();
  };

  return (
    <div
      className={`
        relative
        flex
        items-center
        w-full
        ${className}
      `}
    >
      <Search
        className="
          absolute
          left-4
          h-5
          w-5
          text-gray-400
        "
      />

      <input
        ref={inputRef}
        type="text"
        value={keyword}
        disabled={disabled}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label="Search"
        className="
          w-full
          rounded-xl
          border
          border-gray-300
          bg-white
          py-3
          pl-12
          pr-20
          text-gray-900
          placeholder:text-gray-400
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-500
          dark:border-slate-700
          dark:bg-slate-900
          dark:text-white
          dark:placeholder:text-slate-500
        "
      />

      <div className="absolute right-3 flex items-center gap-2">
        {loading && (
          <Loader2
            className="h-4 w-4 animate-spin text-blue-600"
          />
        )}

        {keyword && !loading && (
          <button
            type="button"
            onClick={clearSearch}
            className="
              rounded-md
              p-1
              hover:bg-gray-100
              dark:hover:bg-slate-800
            "
            aria-label="Clear search"
          >
            <X
              className="
                h-4
                w-4
                text-gray-500
              "
            />
          </button>
        )}

        <span
          className="
            hidden
            rounded
            border
            bg-gray-100
            px-2
            py-0.5
            text-xs
            text-gray-500
            md:block
            dark:border-slate-700
            dark:bg-slate-800
            dark:text-gray-400
          "
        >
          Ctrl K
        </span>
      </div>
    </div>
  );
};

export default SearchBar;