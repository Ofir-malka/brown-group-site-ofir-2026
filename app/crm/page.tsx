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
const [statusFilter, setStatusFilter] = useState("all");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  useEffect(() => {
    if (sessionStorage.getItem("crm_logged_in") === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const fetchLeads = async () => {
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
  };

  const updateStatus = async (id: number, status: string) => {
    await fetch(`${supabaseUrl}/rest/v1/leads?id=eq.${id}`, {
      method: "PATCH",
      headers: {
        apikey: supabaseKey!,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );
  };

  useEffect(() => {
    if (isLoggedIn) fetchLeads();
  }, [isLoggedIn]);

useEffect(() => {
  setFilteredLeads(
    leads.filter((l) => {
      const matchesSearch =
        `${l.name} ${l.phone} ${l.email}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || l.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
  );
}, [search, leads, statusFilter]);

  function handleLogin(e: any) {
    e.preventDefault();
    if (username === CRM_USER && password === CRM_PASS) {
      sessionStorage.setItem("crm_logged_in", "true");
      setIsLoggedIn(true);
    }
  }

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-neutral-950">
        <form onSubmit={handleLogin} className="bg-white/5 backdrop-blur p-8 rounded-3xl w-96">
          <h1 className="text-white text-3xl mb-6 text-center">כניסה</h1>

          <input placeholder="שם משתמש" onChange={(e)=>setUsername(e.target.value)}
            className="w-full mb-3 p-3 rounded-xl bg-black/40 text-white" />

          <input placeholder="סיסמה" type="password" onChange={(e)=>setPassword(e.target.value)}
            className="w-full mb-3 p-3 rounded-xl bg-black/40 text-white" />

          <button className="w-full bg-orange-500 p-3 rounded-xl font-bold">
            התחבר
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
  <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
    BROWN GROUP
  </h1>
  <p className="text-white/50 text-sm mt-1">Lead Management System</p>
</div>
        <button onClick={fetchLeads} className="bg-blue-500 px-5 py-2 rounded-xl">
          רענן
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mb-8">

        <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-700">
          <p>סה"כ לידים</p>
          <h2 className="text-3xl font-bold">{leads.length}</h2>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700">
          <p>בטיפול</p>
          <h2 className="text-3xl font-bold">
            {leads.filter(l=>l.status==="in_progress").length}
          </h2>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500 to-green-700">
          <p>נסגרו</p>
          <h2 className="text-3xl font-bold">
            {leads.filter(l=>l.status==="closed").length}
          </h2>
        </div>

      </div>

      {/* SEARCH */}
      <input
        placeholder="🔍 חיפוש..."
        className="mb-6 w-full p-4 rounded-xl bg-black/40 border border-white/10"
        onChange={(e)=>setSearch(e.target.value)}
      />

      {/* TABLE */}
      <div className="rounded-3xl overflow-hidden border border-white/10 bg-black/30">

        <table className="w-full text-right">

          <thead className="bg-white/5">
            <tr>
              <th className="p-5">שם</th>
              <th className="p-5">טלפון</th>
              <th className="p-5">סטטוס</th>
              <th className="p-5">פעולות</th>
            </tr>
          </thead>

          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="border-t border-white/10 hover:bg-white/5">

                <td className="p-5 font-semibold">{lead.name}</td>
                <td className="p-5">{lead.phone}</td>

                {/* STATUS */}
                <td className="p-5">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold
                    ${lead.status === "new" && "bg-blue-500/20 text-blue-400"}
                    ${lead.status === "in_progress" && "bg-yellow-500/20 text-yellow-400"}
                    ${lead.status === "closed" && "bg-green-500/20 text-green-400"}
                  `}>
                    {lead.status}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="p-5 flex gap-2">

                  <button onClick={()=>updateStatus(lead.id,"new")}
                    className="px-3 py-1 rounded-full bg-blue-500 text-black text-xs">
                    חדש
                  </button>

                  <button onClick={()=>updateStatus(lead.id,"in_progress")}
                    className="px-3 py-1 rounded-full bg-yellow-500 text-black text-xs">
                    בטיפול
                  </button>

                  <button onClick={()=>updateStatus(lead.id,"closed")}
                    className="px-3 py-1 rounded-full bg-green-500 text-black text-xs">
                    נסגר
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </main>
  );
}