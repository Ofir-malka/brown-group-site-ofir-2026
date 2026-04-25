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
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">ניהול לידים</h1>

          <div className="flex gap-3">
            <button
              onClick={fetchLeads}
              className="bg-blue-500 px-4 py-2 rounded-xl"
            >
              רענן
            </button>

            <button
              onClick={() => {
                sessionStorage.removeItem("crm_logged_in");
                setIsLoggedIn(false);
              }}
              className="border px-4 py-2 rounded-xl"
            >
              יציאה
            </button>
          </div>
        </div>

        {/* SEARCH */}
        <input
          placeholder="חפש לפי שם / טלפון / אימייל..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6 w-full rounded-xl bg-black/40 px-5 py-3"
        />

        {/* LOADING */}
        {loading && <p className="text-center">טוען לידים...</p>}

        {/* ERROR */}
        {error && <p className="text-red-400">{error}</p>}

        {/* TABLE */}
        {!loading && (
          <table className="w-full text-right">
            <thead>
              <tr>
                <th>שם</th>
                <th>טלפון</th>
                <th>אימייל</th>
                <th>הודעה</th>
              </tr>
            </thead>

            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.name}</td>
                  <td>{lead.phone}</td>
                  <td>{lead.email}</td>
                  <td>{lead.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}