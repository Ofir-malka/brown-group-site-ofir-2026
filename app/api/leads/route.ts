import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://lpoaampixotoyvzomqqp.supabase.co",
  "sb_publishable_tM198LKh5GTIpGNTqRW7uw_9dM81vzY"
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("BODY:", body); // חשוב לבדיקה

    const { error } = await supabase.from("leads").insert([
      {
        name: body.name,
        phone: body.phone,
        email: body.email,
        message: body.message,
      },
    ]);

    if (error) {
      console.error("SUPABASE ERROR:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}