"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import {
  LayoutDashboard, Users, BookOpen, ClipboardList, Award,
  Bell, Calendar, LogOut, Menu, X, GraduationCap,
  ClipboardCheck, FileText, Settings
} from "lucide-react";

const studentNav = [
  { href: "/student", label: "لوحة التحكم", icon: LayoutDashboard },
  { href: "/student/grades", label: "درجاتي", icon: Award },
  { href: "/student/attendance", label: "الحضور", icon: ClipboardCheck },
  { href: "/student/lessons", label: "الدروس", icon: BookOpen },
  { href: "/student/homework", label: "الواجبات", icon: ClipboardList },
  { href: "/student/schedule", label: "الجدول", icon: Calendar },
  { href: "/student/notifications", label: "الإشعارات", icon: Bell },
];

const teacherNav = [
  { href: "/teacher", label: "لوحة التحكم", icon: LayoutDashboard },
  { href: "/teacher/classes", label: "فصولي", icon: Users },
  { href: "/teacher/grades", label: "الدرجات", icon: Award },
  { href: "/teacher/attendance", label: "الحضور", icon: ClipboardCheck },
  { href: "/teacher/homework", label: "الواجبات", icon: ClipboardList },
  { href: "/teacher/lessons/create", label: "إنشاء درس", icon: BookOpen },
  { href: "/teacher/exams/create", label: "إنشاء اختبار", icon: FileText },
];

const adminNav = [
  { href: "/admin", label: "لوحة التحكم", icon: LayoutDashboard },
  { href: "/admin/users", label: "المستخدمون", icon: Users },
  { href: "/admin/classes", label: "الفصول", icon: GraduationCap },
  { href: "/admin/settings", label: "الإعدادات", icon: Settings },
];

const GOLD = "#c9970c";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const nav =
    user?.role === "teacher" ? teacherNav
    : user?.role === "admin" ? adminNav
    : studentNav;

  const roleLabel =
    user?.role === "teacher" ? "معلم"
    : user?.role === "admin" ? "مدير"
    : "طالب";

  const isActive = (href: string) =>
    href === "/student" || href === "/teacher" || href === "/admin"
      ? pathname === href
      : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" dir="rtl">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
        style={{ background: "#080c14", borderLeft: "1px solid rgba(201,151,12,0.15)" }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 px-5 py-5"
          style={{ borderBottom: "1px solid rgba(201,151,12,0.15)" }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg"
            style={{ background: `${GOLD}20`, color: GOLD }}
          >
            ر
          </div>
          <div>
            <div className="font-black text-sm text-white">مدرسة الرفعة</div>
            <div className="text-xs" style={{ color: GOLD }}>
              النموذجية
            </div>
          </div>
          <button
            className="mr-auto lg:hidden text-gray-400"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* User info */}
        <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(201,151,12,0.1)" }}>
          <div className="text-xs" style={{ color: "#64748b" }}>
            مرحباً،
          </div>
          <div className="font-black text-white text-sm mt-0.5 truncate">
            {user?.full_name?.split(" ").slice(0, 2).join(" ") || "..."}
          </div>
          <div
            className="text-xs mt-0.5 px-2 py-0.5 rounded-full inline-block"
            style={{ background: `${GOLD}15`, color: GOLD }}
          >
            {roleLabel}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {nav.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={
                  active
                    ? { background: `${GOLD}15`, color: GOLD }
                    : { color: "#94a3b8" }
                }
              >
                <Icon size={17} />
                {label}
                {active && (
                  <div
                    className="mr-auto w-1.5 h-1.5 rounded-full"
                    style={{ background: GOLD }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sign out */}
        <div className="p-4" style={{ borderTop: "1px solid rgba(201,151,12,0.1)" }}>
          <button
            onClick={signOut}
            className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors"
            style={{ color: "#ef4444" }}
          >
            <LogOut size={16} />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pr-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header
          className="sticky top-0 z-30 flex items-center gap-3 px-4 py-3"
          style={{
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(8px)",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <button
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>
          <div className="flex-1" />
          <div className="text-xs text-gray-400">
            العام الدراسي 2025/2026
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
