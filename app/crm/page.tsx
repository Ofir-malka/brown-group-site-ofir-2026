"use client";

import { useEffect, useState } from "react";

type Lead = {
  id: number;
  name: string;
  phone: string;
  email: string;
  message: string;
  created_at: string;
};

const CRM_USER = "Gefen Brown";
const CRM_PASS = "Brown0511!";

export default function CRMPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState<string | null>(null);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  useEffect(() => {
    if (sessionStorage.getItem("crm_logged_in") === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchLeads = async () => {
      try {
        if (!supabaseUrl || !supabaseKey) {
          setError("חסר חיבור ל-Supabase");
          return;
        }

        const res = await fetch(
          `${supabaseUrl}/rest/v1/leads?select=*&order=created_at.desc`,
          {
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
            },
          }
        );

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text);
        }

        setLeads(await res.json());
      } catch (err) {
        setError(err instanceof Error ? err.message : "שגיאה לא ידועה");
      }
    };

    fetchLeads();
  }, [isLoggedIn]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (username === CRM_USER && password === CRM_PASS) {
      sessionStorage.setItem("crm_logged_in", "true");
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("שם משתמש או סיסמה שגויים");
    }
  }

  if (!isLoggedIn) {
    return (
      <main dir="rtl" className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl"
        >
          <p className="text-sm tracking-[0.3em] text-orange-400 text-center">
            BROWN GROUP CRM
          </p>
          <h1 className="mt-4 text-3xl font-bold text-center">כניסה למערכת</h1>
          <p className="mt-2 text-center text-neutral-400">
            הזן פרטי התחברות לניהול הלידים
          </p>

          <div className="mt-8 space-y-4">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="שם משתמש"
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-orange-400"
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="סיסמה"
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-orange-400"
            />
          </div>

          {loginError && (
            <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-center text-red-300">
              {loginError}
            </div>
          )}

          <button
            type="submit"
            className="mt-6 w-full rounded-2xl bg-orange-500 px-5 py-4 font-bold text-black hover:bg-orange-400"
          >
            התחברות
          </button>
        </form>
      </main>
    );
  }

  return (
    <main dir="rtl" className="min-h-screen bg-neutral-950 text-white p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-sm tracking-[0.3em] text-orange-400">BROWN GROUP CRM</p>
            <h1 className="mt-3 text-4xl font-bold">מערכת ניהול לידים</h1>
            <p className="mt-2 text-neutral-400">כל הפניות מהאתר במקום אחד.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-center">
              <div className="text-3xl font-bold">{leads.length}</div>
              <div className="text-sm text-neutral-400">לידים</div>
            </div>

            <button
              onClick={() => {
                sessionStorage.removeItem("crm_logged_in");
                setIsLoggedIn(false);
              }}
              className="rounded-full border border-white/10 px-5 py-3 text-sm text-neutral-300 hover:bg-white/10"
            >
              יציאה
            </button>
          </div>
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-red-300">
            שגיאה: {error}
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-2xl">
            <table className="w-full text-right">
              <thead className="bg-white/5 text-sm text-neutral-300">
                <tr>
                  <th className="p-5">תאריך</th>
                  <th className="p-5">שם</th>
                  <th className="p-5">טלפון</th>
                  <th className="p-5">אימייל</th>
                  <th className="p-5">הודעה</th>
                  <th className="p-5">פעולה</th>
                </tr>
              </thead>

              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-t border-white/10 hover:bg-white/[0.04]">
                    <td className="p-5 text-sm text-neutral-400">
                      {new Date(lead.created_at).toLocaleDateString("he-IL")}
                    </td>
                    <td className="p-5 font-semibold">{lead.name || "-"}</td>
                    <td className="p-5">{lead.phone || "-"}</td>
                    <td className="p-5 text-neutral-300">{lead.email || "-"}</td>
                    <td className="p-5 max-w-md text-neutral-300">{lead.message || "-"}</td>
                    <td className="p-5">
                      <a
                        href={`https://wa.me/972${lead.phone?.replace(/^0/, "")}`}
                        target="_blank"
                        className="rounded-full bg-green-500 px-4 py-2 text-sm font-bold text-black"
                      >
                        וואטסאפ
                      </a>
                    </td>
                  </tr>
                ))}

                {!leads.length && (
                  <tr>
                    <td colSpan={6} className="p-10 text-center text-neutral-400">
                      אין לידים עדיין
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}