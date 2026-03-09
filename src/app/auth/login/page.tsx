"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

const GOLD = "#c9970c";

export default function LoginPage() {
  const [nationalId, setNationalId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data, error: qErr } = await supabase
        .from("users")
        .select("*")
        .eq("national_id", nationalId)
        .eq("password_hash", password)
        .single();
      if (qErr || !data) {
        setError("رقم الهوية أو كلمة المرور غير صحيحة");
        setLoading(false);
        return;
      }
      localStorage.setItem("rifa_user", JSON.stringify(data));
      const dest =
        data.role === "teacher" ? "/teacher"
        : data.role === "admin" ? "/admin"
        : "/student";
      window.location.href = dest;
    } catch {
      setError("حدث خطأ، يرجى المحاولة مجدداً");
    }
    setLoading(false);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "linear-gradient(135deg, #080c14 0%, #0f1a2e 100%)" }}
      dir="rtl"
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-4"
            style={{ background: `${GOLD}20`, color: GOLD, border: `2px solid ${GOLD}30` }}
          >
            ر
          </div>
          <h1 className="text-2xl font-black text-white">مدرسة الرفعة</h1>
          <p className="text-sm mt-1" style={{ color: GOLD }}>
            النموذجية
          </p>
        </div>

        {/* Form */}
        <div
          className="rounded-2xl p-6"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,151,12,0.2)" }}
        >
          <h2 className="text-lg font-black text-white mb-5">تسجيل الدخول</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold mb-1.5" style={{ color: "#94a3b8" }}>
                رقم الهوية الوطنية
              </label>
              <input
                type="text"
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value)}
                required
                className="w-full rounded-xl px-4 py-3 text-sm font-bold outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(201,151,12,0.2)",
                  color: "white",
                }}
                placeholder="1234567890"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1.5" style={{ color: "#94a3b8" }}>
                كلمة المرور
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(201,151,12,0.2)",
                  color: "white",
                }}
                placeholder="••••••••"
              />
            </div>
            {error && (
              <p className="text-xs text-red-400 font-semibold">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-black text-sm transition-all disabled:opacity-50"
              style={{ background: GOLD, color: "white" }}
            >
              {loading ? "جاري الدخول..." : "دخول"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
