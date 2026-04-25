import { createClient } from "@supabase/supabase-js";
console.log("CRM LOADED");
export const dynamic = "force-dynamic";
export const maxDuration = 30;
export const preferredRegion = "fra1";

type Lead = {
  id: number;
  name: string;
  phone: string;
  email: string;
  message: string;
  created_at: string;
};

export default async function CRMPage() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("SERVICE ROLE:", process.env.SUPABASE_SERVICE_ROLE_KEY ? "EXISTS" : "MISSING");

  if (!supabaseUrl || !supabaseKey) {
    return (
      <main dir="rtl" className="min-h-screen bg-neutral-950 text-white p-8">
        חסרים משתני סביבה של Supabase
      </main>
    );
  }

let leads = null;
let error = null;

try {
  const res = await fetch(`${supabaseUrl}/rest/v1/leads?select=*&order=created_at.desc`, {
    headers: {
      apikey: supabaseKey!,
      Authorization: `Bearer ${supabaseKey}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch leads");
  }

  leads = await res.json();
} catch (err: any) {
  error = err;
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

          <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-center">
            <div className="text-3xl font-bold">{leads?.length || 0}</div>
            <div className="text-sm text-neutral-400">לידים</div>
          </div>
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-red-300">
            שגיאה בטעינת הלידים: {error.message}שגיאה בטעינת הלידים
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
                {(leads as Lead[] | null)?.map((lead) => (
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

                {!leads?.length && (
                  <tr>
                    <td colSpan={6} className="p-10 text-center text-neutral-400">
                      אין לידים עדיין.
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