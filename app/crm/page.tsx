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
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  useEffect(() => {
    if (sessionStorage.getItem("crm_logged_in") === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);

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

      const data = await res.json();
      setLeads(data);
      setFilteredLeads(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "שגיאה לא ידועה");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchLeads();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const filtered = leads.filter((lead) =>
      `${lead.name} ${lead.phone} ${lead.email} ${lead.message}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredLeads(filtered);
  }, [search, leads]);

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
          <h1 className="text-3xl font-bold text-center">כניסה למערכת</h1>

          <div className="mt-8 space-y-4">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="שם משתמש"
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4"
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="סיסמה"
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4"
            />
          </div>

          {loginError && <p className="mt-4 text-red-400">{loginError}</p>}

          <button className="mt-6 w-full rounded-2xl bg-orange-500 px-5 py-4 font-bold text-black">
            התחברות
          </button>
        </form>
      </main>
    );
  }

return (
  <main dir="rtl" className="min-h-screen bg-neutral-950 text-white p-8">
    <div className="mx-auto max-w-7xl">

      {/* HEADER */}
      <div className="mb-10 flex flex-col gap-6">

        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">מערכת ניהול לידים</h1>

          <div className="flex gap-3">
            <button
              onClick={fetchLeads}
              className="rounded-xl bg-blue-500 px-5 py-2 font-bold"
            >
              רענן
            </button>

            <button
              onClick={() => {
                sessionStorage.removeItem("crm_logged_in");
                setIsLoggedIn(false);
              }}
              className="rounded-xl border border-white/20 px-5 py-2"
            >
              יציאה
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-2xl bg-white/5 p-6 text-center">
            <p className="text-sm text-neutral-400">סה״כ לידים</p>
            <p className="text-3xl font-bold">{leads.length}</p>
          </div>

          <div className="rounded-2xl bg-white/5 p-6 text-center">
            <p className="text-sm text-neutral-400">תוצאות חיפוש</p>
            <p className="text-3xl font-bold">{filteredLeads.length}</p>
          </div>

          <div className="rounded-2xl bg-white/5 p-6 text-center">
            <p className="text-sm text-neutral-400">חדשים היום</p>
            <p className="text-3xl font-bold">
              {
                leads.filter(l =>
                  new Date(l.created_at).toDateString() === new Date().toDateString()
                ).length
              }
            </p>
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <input
        placeholder="חפש לפי שם / טלפון / אימייל..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full rounded-xl bg-black/40 px-5 py-4 text-white"
      />

      {/* LOADING */}
      {loading && <p className="text-center text-neutral-400">טוען לידים...</p>}

      {/* ERROR */}
      {error && <p className="text-red-400">{error}</p>}

      {/* TABLE */}
      {!loading && (
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
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-t border-white/10 hover:bg-white/[0.04]">
                  
                  <td className="p-5 text-sm text-neutral-400">
                    {new Date(lead.created_at).toLocaleDateString("he-IL")}
                  </td>

                  <td className="p-5 font-semibold">{lead.name || "-"}</td>

                  <td className="p-5">{lead.phone || "-"}</td>

                  <td className="p-5 text-neutral-300">{lead.email || "-"}</td>

                  <td className="p-5 max-w-md text-neutral-300">
                    {lead.message || "-"}
                  </td>

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

              {!filteredLeads.length && (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-neutral-400">
                    אין תוצאות
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