"use client";

import { useEffect, useState } from "react";

type Lead = {
  id: number;
  name: string;
  phone: string;
  email: string;
  message: string;
  created_at: string;
  status: string;
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

      const res = await fetch(
        `${supabaseUrl}/rest/v1/leads?select=*&order=created_at.desc`,
        {
          headers: {
            apikey: supabaseKey!,
            Authorization: `Bearer ${supabaseKey}`,
          },
        }
      );

      const data = await res.json();
      setLeads(data);
      setFilteredLeads(data);
    } catch (err) {
      setError("שגיאה בטעינת לידים");
    } finally {
      setLoading(false);
    }
  };

  // ✅ פונקציה מתוקנת
  const updateStatus = async (id: number, newStatus: string) => {
    try {
      await fetch(`${supabaseUrl}/rest/v1/leads?id=eq.${id}`, {
        method: "PATCH",
        headers: {
          apikey: supabaseKey!,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      setLeads((prev) =>
        prev.map((l) =>
          l.id === id ? { ...l, status: newStatus } : l
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchLeads();
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
      <main className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-black p-8 rounded-2xl w-96">
          <h1 className="text-white text-2xl mb-6">כניסה</h1>

          <input
            placeholder="שם משתמש"
            className="w-full mb-3 p-3 rounded bg-neutral-800 text-white"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            placeholder="סיסמה"
            type="password"
            className="w-full mb-3 p-3 rounded bg-neutral-800 text-white"
            onChange={(e) => setPassword(e.target.value)}
          />

          {loginError && <p className="text-red-500">{loginError}</p>}

          <button className="w-full bg-orange-500 p-3 rounded mt-3">
            התחבר
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white p-8">

      <h1 className="text-3xl font-bold mb-6">CRM לידים</h1>

      <input
        placeholder="חיפוש..."
        className="mb-6 w-full p-3 rounded bg-neutral-800"
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={fetchLeads} className="mb-6 bg-blue-500 px-4 py-2 rounded">
        רענן
      </button>

      {loading && <p>טוען...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <table className="w-full border border-white/10">
        <thead className="bg-neutral-800">
          <tr>
            <th>שם</th>
            <th>טלפון</th>
            <th>סטטוס</th>
            <th>פעולות</th>
          </tr>
        </thead>

        <tbody>
          {filteredLeads.map((lead) => (
            <tr key={lead.id} className="border-t border-white/10">

              <td>{lead.name}</td>
              <td>{lead.phone}</td>

              {/* סטטוס */}
              <td>
                <span
                  className={
                    lead.status === "new"
                      ? "text-blue-400"
                      : lead.status === "in_progress"
                      ? "text-yellow-400"
                      : "text-green-400"
                  }
                >
                  {lead.status}
                </span>
              </td>

              {/* כפתורים */}
              <td className="space-x-2">

                <button
                  onClick={() => updateStatus(lead.id, "new")}
                  className="bg-blue-500 px-2 py-1 rounded"
                >
                  חדש
                </button>

                <button
                  onClick={() => updateStatus(lead.id, "in_progress")}
                  className="bg-yellow-500 px-2 py-1 rounded"
                >
                  בטיפול
                </button>

                <button
                  onClick={() => updateStatus(lead.id, "closed")}
                  className="bg-green-500 px-2 py-1 rounded"
                >
                  נסגר
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}