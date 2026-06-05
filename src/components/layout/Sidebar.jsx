"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  ClipboardList,
  BarChart3,
  Settings,
  LogOut,
  GraduationCap,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Interns", path: "/interns", icon: Users },
  { name: "Attendance", path: "/attendance", icon: CalendarCheck },
  { name: "Tasks", path: "/tasks", icon: ClipboardList },
  { name: "Reports", path: "/reports", icon: BarChart3 },
  { name: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r bg-white">
      <div className="flex items-center gap-3 border-b p-6">
        <div className="rounded-2xl bg-slate-900 p-2 text-white">
          <GraduationCap size={24} />
        </div>

        <div>
          <h1 className="text-xl font-bold text-slate-900">
            InternHub
          </h1>

          <p className="text-xs text-slate-500">
            Admin Workspace
          </p>
        </div>
      </div>

      <nav className="space-y-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.path;

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 w-full border-t p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}