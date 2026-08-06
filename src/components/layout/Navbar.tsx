import { Bell, Menu, Plus, Search } from "lucide-react";
import Avatar from "../common/Avatar";
import SearchBar from "../common/SearchBar";
import Button from "../common/Button";
import { useState } from "react";

const Navbar = () => {
  const [search, setSearch] = useState("");

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">

      {/* Left */}

      <div className="flex items-center gap-4">

        <button className="rounded-lg p-2 hover:bg-slate-100 lg:hidden">
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            Dashboard
          </h1>

          <p className="text-sm text-slate-500">
            Welcome back 👋
          </p>
        </div>

      </div>

      {/* Center */}

      <div className="hidden w-[420px] lg:block">

        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search documents..."
        />

      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        <Button>
          <Plus size={18} />
          New Project
        </Button>

        <button className="rounded-lg p-2 hover:bg-slate-100">
          <Bell size={20} />
        </button>

        <Avatar
          name="Aniket Ambre"
          status="online"
        />

      </div>

    </header>
  );
};

export default Navbar;