"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PenSquare,
  FileText,
  ArrowLeft,
  Newspaper,
  Folder
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/create", label: "Create Article", icon: PenSquare },
  { href: "/admin/articles", label: "All Articles", icon: FileText },
  { href: "/admin/categories", label: "Categories", icon: Folder },
];
export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-20">

      {/* Logo */}

      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-lg bg-red-500 flex items-center justify-center">
            <Newspaper size={18} className="text-white" />
          </div>

          <div>
            <h1 className="text-gray-900 font-bold text-lg leading-tight">
              CrimeTak
            </h1>

            <p className="text-gray-400 text-[11px] uppercase tracking-wider">
              Admin Panel
            </p>
          </div>

        </div>
      </div>


      {/* Navigation */}

      <nav className="flex-1 p-3 space-y-1">

        {navItems.map((item) => {
          const isActive =
  item.href === "/admin"
    ? pathname === "/admin"
    : pathname.startsWith(item.href);

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition
              
              ${
                isActive
                  ? "bg-red-50 text-red-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon
                size={18}
                className={
                  isActive ? "text-red-600" : "text-gray-400"
                }
              />

              {item.label}

              {isActive && (
                <span className="ml-auto w-2 h-2 bg-red-500 rounded-full" />
              )}
            </Link>
          );
        })}

      </nav>


      {/* Footer */}

      <div className="p-3 border-t border-gray-200">

        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition"
        >
          <ArrowLeft size={18} />
          Back to Website
        </Link>

      </div>
    </aside>
  );
}