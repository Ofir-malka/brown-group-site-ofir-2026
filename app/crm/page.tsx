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
  notes?: string;
};

const CRM_USER = "Gefen Brown";
const CRM_PASS = "Brown0511!";

const statusLabels: Record<string, string> = {
  all: "הכל",
  new: "חדש",
  in_progress: "בטיפול",
  closed: "נסגר",
};
const buttonMotion =
  "transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.03] active:translate-y-0 active:scale-95";

export default function CRMPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState("");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  useEffect(() => {
    if (sessionStorage.getItem("crm_logged_in") === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (selectedLead) {
      setNotes(selectedLead.notes || "");
    }
  }, [selectedLead]);

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

    const text = await res.text();
    const data = text ? JSON.parse(text) : [];

    if (!Array.isArray(data)) {
      console.log("Supabase response:", data);
      setLeads([]);
      setFilteredLeads([]);
      return;
    }

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
      prev.map((lead) => (lead.id === id ? { ...lead, status } : lead))
    );

    if (selectedLead?.id === id) {
      setSelectedLead({ ...selectedLead, status });
    }
  };

  const updateNotes = async () => {
    if (!selectedLead) return;

    await fetch(`${supabaseUrl}/rest/v1/leads?id=eq.${selectedLead.id}`, {
      method: "PATCH",
      headers: {
        apikey: supabaseKey!,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notes }),
    });

    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === selectedLead.id ? { ...lead, notes } : lead
      )
    );

    setSelectedLead({ ...selectedLead, notes });
  };

  useEffect(() => {
    if (isLoggedIn) fetchLeads();
  }, [isLoggedIn]);

  useEffect(() => {
    setFilteredLeads(
      leads.filter((lead) => {
        const matchesSearch = `${lead.name} ${lead.phone} ${lead.email} ${lead.message}`
          .toLowerCase()
          .includes(search.toLowerCase());

        const matchesStatus =
          statusFilter === "all" || lead.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
    );
  }, [search, leads, statusFilter]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (username === CRM_USER && password === CRM_PASS) {
      sessionStorage.setItem("crm_logged_in", "true");
      setIsLoggedIn(true);
    }
  }

  const newCount = leads.filter((lead) => lead.status === "new").length;
  const progressCount = leads.filter((lead) => lead.status === "in_progress").length;
  const closedCount = leads.filter((lead) => lead.status === "closed").length;

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#2a1608,transparent_35%),#050505] flex items-center justify-center px-4 text-white">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 shadow-2xl backdrop-blur-xl transition duration-500 hover:border-orange-500/40"
        >
          <p className="mb-2 text-center text-xs tracking-[0.45em] text-orange-400">
            BROWN GROUP
          </p>
          <h1 className="mb-8 text-center text-3xl font-black">כניסה למערכת</h1>

          <input
            placeholder="שם משתמש"
            onChange={(e) => setUsername(e.target.value)}
            className="mb-3 w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-white outline-none transition focus:border-orange-500"
          />

          <input
            placeholder="סיסמה"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="mb-5 w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-white outline-none transition focus:border-orange-500"
          />

          <button
  className={`${buttonMotion} w-full rounded-2xl bg-orange-500 p-4 font-black text-black shadow-lg shadow-orange-500/20 hover:bg-orange-400`}
>
            התחבר
          </button>
        </form>
      </main>
    );
  }

  return (
    <main dir="rtl" className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(249,115,22,0.22),transparent_30%),radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.18),transparent_25%),radial-gradient(circle_at_50%_90%,rgba(34,197,94,0.10),transparent_30%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-8">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-xs tracking-[0.45em] text-orange-400">
              BROWN GROUP
            </p>
            <h1 className="mt-3 bg-gradient-to-l from-orange-300 via-orange-500 to-red-600 bg-clip-text text-5xl font-black text-transparent">
              Lead Control Center
            </h1>
            <p className="mt-2 text-sm text-white/45">
              מערכת ניהול לידים, סטטוסים, הערות ופעולות במקום אחד
            </p>
          </div>

          <button
            onClick={fetchLeads}
            className={`${buttonMotion} rounded-2xl border border-white/10 bg-white/10 px-6 py-3 font-bold backdrop-blur hover:border-orange-500/60 hover:bg-orange-500 hover:text-black`}
          >
            רענן נתונים
          </button>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          <StatCard title="סה״כ לידים" value={leads.length} color="orange" />
          <StatCard title="חדשים" value={newCount} color="blue" />
          <StatCard title="בטיפול" value={progressCount} color="yellow" />
          <StatCard title="נסגרו" value={closedCount} color="green" />
        </div>

        <div className="mb-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-2xl backdrop-blur-xl">
          <input
            placeholder="חיפוש לפי שם, טלפון, אימייל או הודעה..."
            className="mb-4 w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-white outline-none transition focus:border-orange-500"
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex flex-wrap gap-3">
            {[
              { key: "all", label: "הכל" },
              { key: "new", label: "חדש" },
              { key: "in_progress", label: "בטיפול" },
              { key: "closed", label: "נסגר" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setStatusFilter(item.key)}
                className={`rounded-full px-5 py-2 text-sm font-black transition duration-300 hover:-translate-y-1 active:scale-95 ${
                  statusFilter === item.key
                    ? "bg-orange-500 text-black shadow-lg shadow-orange-500/25"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-xl">
          <table className="w-full text-right">
            <thead className="bg-white/[0.06] text-sm text-white/60">
              <tr>
                <th className="p-5">שם</th>
                <th className="p-5">טלפון</th>
                <th className="p-5">סטטוס</th>
                <th className="p-5">פעולות</th>
              </tr>
            </thead>

            <tbody>
              {filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => {
                   setSelectedLead(null);
                  setTimeout(() => setSelectedLead(lead), 50);
                  }}
                  className={`group cursor-pointer border-t border-white/10 text-white transition-all duration-300
                  ${selectedLead?.id === lead.id ? "bg-orange-500/10 shadow-inner shadow-orange-500/10" : ""}
                  hover:bg-white/[0.07] hover:shadow-lg hover:shadow-orange-500/10`}
                   
                   >
                  <td className="p-5">
                    <div className="font-black text-white transition duration-300 group-hover:text-orange-400">
                     {lead.name}
                    </div>
                    <div className="mt-1 text-xs text-white/40">{lead.email}</div>
                  </td>

                  <td className="p-5 text-white/80">{lead.phone}</td>

                  <td className="p-5">
                    <StatusBadge status={lead.status} />
                  </td>

                  <td className="p-5">
                    <div className="flex gap-2">
                      <ActionButton
                        label="חדש"
                        color="blue"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateStatus(lead.id, "new");
                        }}
                      />
                      <ActionButton
                        label="בטיפול"
                        color="yellow"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateStatus(lead.id, "in_progress");
                        }}
                      />
                      <ActionButton
                        label="נסגר"
                        color="green"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateStatus(lead.id, "closed");
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredLeads.length === 0 && (
            <div className="p-10 text-center text-white/40">
              לא נמצאו לידים להצגה
            </div>
          )}
        </div>
      </div>

      {selectedLead && (
        <div className="fixed inset-0 z-50 flex">
          <div
            onClick={() => setSelectedLead(null)}
            className="flex-1 bg-black/70 backdrop-blur-md"
          />

          <aside className="h-full w-full max-w-md overflow-y-auto border-r border-white/10 bg-[#070707] p-6 shadow-2xl animate-[slideIn_0.28s_ease-out]">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-xs tracking-[0.35em] text-orange-400">
                  BROWN GROUP
                </p>
                <h2 className="mt-2 text-3xl font-black">פרטי ליד</h2>
              </div>

              <button
                onClick={() => setSelectedLead(null)}
                className="rounded-full bg-white/10 px-4 py-2 text-white/70 transition hover:bg-white/20 active:scale-95"
              >
                ✕
              </button>
            </div>

            <div className="mb-6 rounded-[1.5rem] border border-orange-500/20 bg-orange-500/10 p-5">
              <p className="text-sm text-orange-300">סטטוס נוכחי</p>
              <div className="mt-2">
                <StatusBadge status={selectedLead.status} />
              </div>
            </div>

            <div className="space-y-4">
              <InfoCard label="שם מלא" value={selectedLead.name} large />
              <InfoCard label="טלפון" value={selectedLead.phone} />
              <InfoCard label="אימייל" value={selectedLead.email} />
              <InfoCard label="הודעה" value={selectedLead.message} />
              <InfoCard
                label="תאריך"
                value={new Date(selectedLead.created_at).toLocaleDateString("he-IL")}
              />

              <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-4">
                <p className="mb-2 text-sm text-white/40">הערות פנימיות</p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/40 p-3 text-sm outline-none transition focus:border-orange-500"
                  rows={4}
                  placeholder="רשום כאן הערות על הלקוח..."
                />

                <button
                  onClick={updateNotes}
                 className={`${buttonMotion} mt-3 w-full rounded-2xl bg-orange-500 py-3 font-black text-black shadow-lg shadow-orange-500/20 hover:bg-orange-400`}
                >
                  שמור הערה
                </button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-2">
              <ActionButton
                label="חדש"
                color="blue"
                full
                onClick={() => updateStatus(selectedLead.id, "new")}
              />
              <ActionButton
                label="בטיפול"
                color="yellow"
                full
                onClick={() => updateStatus(selectedLead.id, "in_progress")}
              />
              <ActionButton
                label="נסגר"
                color="green"
                full
                onClick={() => updateStatus(selectedLead.id, "closed")}
              />
            </div>

            <a
              href={`https://wa.me/972${selectedLead.phone.replace(/^0/, "")}`}
              target="_blank"
              className="mt-4 block rounded-2xl bg-green-500 py-4 text-center font-black text-black transition duration-300 hover:-translate-y-1 hover:bg-green-400 active:scale-95"
            >
              פתיחה ב־WhatsApp
            </a>
          </aside>
        </div>
      )}

      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </main>
  );
}

function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: "orange" | "blue" | "yellow" | "green";
}) {
  const styles = {
    orange: "from-orange-500 to-red-700 shadow-orange-500/20",
    blue: "from-blue-500 to-blue-800 shadow-blue-500/20",
    yellow: "from-yellow-400 to-orange-600 shadow-yellow-500/20",
    green: "from-green-400 to-emerald-800 shadow-green-500/20",
  };

  return (
    <div
      className={`rounded-[2rem] bg-gradient-to-br ${styles[color]} p-6 shadow-2xl transition duration-300 hover:-translate-y-2`}
    >
      <p className="text-sm font-bold text-white/80">{title}</p>
      <h2 className="mt-3 text-4xl font-black">{value}</h2>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "new"
      ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
      : status === "in_progress"
      ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      : status === "closed"
      ? "bg-green-500/20 text-green-300 border-green-500/30"
      : "bg-white/10 text-white/60 border-white/10";

  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-black ${styles}`}>
      {statusLabels[status] || status}
    </span>
  );
}

function ActionButton({
  label,
  color,
  onClick,
  full,
}: {
  label: string;
  color: "blue" | "yellow" | "green";
  onClick: (e: any) => void;
  full?: boolean;
}) {
  const styles = {
    blue: "bg-blue-500 hover:bg-blue-400",
    yellow: "bg-yellow-500 hover:bg-yellow-400",
    green: "bg-green-500 hover:bg-green-400",
  };

  return (
    <button
      onClick={onClick}
      className={`${full ? "w-full" : ""} ${buttonMotion} rounded-full px-4 py-2 text-xs font-black text-black shadow-lg hover:shadow-xl ${styles[color]}`}
    >
      {label}
    </button>
  );
}

function InfoCard({
  label,
  value,
  large,
}: {
  label: string;
  value?: string;
  large?: boolean;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-4 transition hover:bg-white/[0.08]">
      <p className="text-sm text-white/40">{label}</p>
      <p className={`mt-1 font-bold ${large ? "text-2xl" : "text-base"}`}>
        {value || "-"}
      </p>
    </div>
  );
}