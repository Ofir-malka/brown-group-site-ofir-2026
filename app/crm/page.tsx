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

export default function CRMPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState<string | null>(null);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        console.log("CLIENT SUPABASE URL:", supabaseUrl);
console.log("CLIENT HAS ANON KEY:", !!supabaseKey);

if (!supabaseUrl || !supabaseKey) {
  setError("חסר NEXT_PUBLIC_SUPABASE_URL או NEXT_PUBLIC_SUPABASE_ANON_KEY ב-Vercel");
  return;
}
        const res = await fetch(
          `${supabaseUrl}/rest/v1/leads?select=*&order=created_at.desc`,
          {
            headers: {
              apikey: supabaseKey!,
              Authorization: `Bearer ${supabaseKey}`,
            },
          }
        );

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Status ${res.status}: ${text}`);
        }

        const data = await res.json();
        setLeads(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchLeads();
  }, []);

  return (
    <main dir="rtl" className="min-h-screen bg-neutral-950 text-white p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-sm tracking-[0.3em] text-orange-400">
              BROWN GROUP CRM
            </p>
            <h1 className="mt-3 text-4xl font-bold">מערכת ניהול לידים</h1>
            <p className="mt-2 text-neutral-400">
              כל הפניות מהאתר במקום אחד.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-center">
            <div className="text-3xl font-bold">{leads.length}</div>
            <div className="text-sm text-neutral-400">לידים</div>
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
                  <tr key={lead.id} className="border-t border-white/10">
                    <td className="p-5 text-sm text-neutral-400">
                      {new Date(lead.created_at).toLocaleDateString("he-IL")}
                    </td>
                    <td className="p-5 font-semibold">{lead.name}</td>
                    <td className="p-5">{lead.phone}</td>
                    <td className="p-5">{lead.email}</td>
                    <td className="p-5">{lead.message}</td>
                    <td className="p-5">
                      <a
                        href={`https://wa.me/972${lead.phone.replace(/^0/, "")}`}
                        target="_blank"
                        className="bg-green-500 px-4 py-2 rounded-full text-black font-bold"
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
}// reload env