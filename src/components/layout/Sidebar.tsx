import {
  LayoutDashboard,
  FolderKanban,
  Upload,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";

import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <aside className="flex h-screen w-72 flex-col bg-slate-900 text-white">

      {/* Logo */}

      <div className="border-b border-slate-800 p-6">

        <h1 className="text-2xl font-bold text-blue-400">
          DocMind AI
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Chat with Documents
        </p>

      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 p-4">

        <SidebarItem
          to="/dashboard"
          icon={LayoutDashboard}
          label="Dashboard"
        />

        <SidebarItem
          to="/projects"
          icon={FolderKanban}
          label="Projects"
        />

        <SidebarItem
          to="/upload"
          icon={Upload}
          label="Upload"
        />

        <SidebarItem
          to="/chat"
          icon={MessageSquare}
          label="AI Chat"
        />

        <SidebarItem
          to="/settings"
          icon={Settings}
          label="Settings"
        />

      </nav>

      {/* User */}

      <div className="border-t border-slate-800 p-4">

        <div className="mb-4 flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold">
            AA
          </div>

          <div>

            <p className="font-medium">
              Aniket Ambre
            </p>

            <p className="text-sm text-slate-400">
              Python Developer
            </p>

          </div>

        </div>

        <button
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-lg
            bg-red-600
            py-3
            transition
            hover:bg-red-700
          "
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;