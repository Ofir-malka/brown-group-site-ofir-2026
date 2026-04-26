"use client";

import { useEffect, useState } from "react";

type Property = {
  id: number;
  title: string;
  price: string;
  city: string;
  address: string;
  deal_type: string;
  description: string;
  image_url: string;
  status: string;
};

const emptyForm = {
  title: "",
  price: "",
  city: "",
  address: "",
  deal_type: "",
  description: "",
  image_url: "",
};

export default function AdminProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const fetchProperties = async () => {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/properties?select=*&order=created_at.desc`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      }
    );

    const data = await res.json();
    setProperties(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSave = async () => {
    const url = editingId
      ? `${supabaseUrl}/rest/v1/properties?id=eq.${editingId}`
      : `${supabaseUrl}/rest/v1/properties`;

    await fetch(url, {
      method: editingId ? "PATCH" : "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        status: "active",
      }),
    });

    resetForm();
    fetchProperties();
  };

  const handleDelete = async (id: number) => {
    await fetch(`${supabaseUrl}/rest/v1/properties?id=eq.${id}`, {
      method: "DELETE",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    });

    fetchProperties();
  };

  return (
    <main dir="rtl" className="min-h-screen bg-[#050505] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(249,115,22,0.20),transparent_30%),radial-gradient(circle_at_15%_15%,rgba(59,130,246,0.14),transparent_25%),radial-gradient(circle_at_50%_90%,rgba(34,197,94,0.10),transparent_30%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-xs tracking-[0.45em] text-orange-400">
              BROWN GROUP
            </p>
            <h1 className="mt-3 bg-gradient-to-l from-orange-300 via-orange-500 to-red-600 bg-clip-text text-5xl font-black text-transparent">
              ניהול נכסים
            </h1>
            <p className="mt-2 text-sm text-white/45">
              הוספה, עריכה ומחיקה של נכסים באתר במקום אחד
            </p>
          </div>

          <button
            onClick={fetchProperties}
            className="rounded-2xl border border-white/10 bg-white/10 px-6 py-3 font-bold backdrop-blur transition hover:-translate-y-1 hover:border-orange-500/60 hover:bg-orange-500 hover:text-black active:scale-95"
          >
            רענן נתונים
          </button>
        </div>

        <section className="mb-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-black">
              {editingId ? "עריכת נכס" : "הוספת נכס חדש"}
            </h2>

            {editingId && (
              <button
                onClick={resetForm}
                className="rounded-xl bg-white/10 px-4 py-2 text-sm transition hover:bg-white/20"
              >
                ביטול עריכה
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input label="כותרת הנכס" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
            <Input label="מחיר" value={form.price} onChange={(v) => setForm({ ...form, price: v })} />
            <Input label="עיר" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
            <Input label="כתובת" value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
            <Input label="סוג עסקה" value={form.deal_type} onChange={(v) => setForm({ ...form, deal_type: v })} />
            <Input label="קישור תמונה" value={form.image_url} onChange={(v) => setForm({ ...form, image_url: v })} />
          </div>

          <textarea
            placeholder="תיאור הנכס"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="mt-4 min-h-32 w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-white outline-none transition focus:border-orange-500"
          />

          <button
            onClick={handleSave}
            className="mt-5 rounded-2xl bg-orange-500 px-8 py-4 font-black text-black shadow-lg shadow-orange-500/20 transition hover:-translate-y-1 hover:bg-orange-400 active:scale-95"
          >
            {editingId ? "שמור עדכון" : "הוסף נכס"}
          </button>
        </section>

        <section>
          <h2 className="mb-5 text-2xl font-black">נכסים קיימים</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {properties.map((p) => (
              <div
                key={p.id}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-2xl transition hover:-translate-y-1 hover:border-orange-500/30"
              >
                <div className="h-48 bg-white/5">
                  {p.image_url ? (
                    <img
                      src={p.image_url}
                      alt={p.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-white/30">
                      אין תמונה
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <p className="text-xs text-orange-400">{p.deal_type || "נכס"}</p>
                  <h3 className="mt-2 text-xl font-black">{p.title || "ללא כותרת"}</h3>
                  <p className="mt-1 text-white/50">{p.city} {p.address && `• ${p.address}`}</p>
                  <p className="mt-3 text-2xl font-black text-orange-400">{p.price || "-"}</p>
                  <p className="mt-3 line-clamp-3 text-sm text-white/50">{p.description}</p>

                  <div className="mt-5 flex gap-3">
                    <button
                      onClick={() => {
                        setForm({
                          title: p.title || "",
                          price: p.price || "",
                          city: p.city || "",
                          address: p.address || "",
                          deal_type: p.deal_type || "",
                          description: p.description || "",
                          image_url: p.image_url || "",
                        });
                        setEditingId(p.id);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="flex-1 rounded-xl bg-blue-500 px-4 py-2 font-bold text-black transition hover:bg-blue-400"
                    >
                      ערוך
                    </button>

                    <button
                      onClick={() => handleDelete(p.id)}
                      className="flex-1 rounded-xl bg-red-500 px-4 py-2 font-bold text-black transition hover:bg-red-400"
                    >
                      מחק
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {properties.length === 0 && (
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-10 text-center text-white/40">
              עדיין אין נכסים להצגה
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      placeholder={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-2xl border border-white/10 bg-black/40 p-4 text-white outline-none transition focus:border-orange-500"
    />
  );
}