import OpenAI from "openai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const apiKey = process.env.OPENAI_API_KEY;

const openai = apiKey
  ? new OpenAI({
      apiKey,
    })
  : null;

export async function POST(req: Request) {
  try {
    if (!openai) {
      return Response.json(
        {
          reply:
            "שירות ה-AI לא מוגדר כרגע. יש להוסיף OPENAI_API_KEY בקובץ הסביבה או ב-Vercel.",
        },
        { status: 500 }
      );
    }

    const body = await req.json();
    const message =
      typeof body?.message === "string" ? body.message.trim() : "";

    if (!message) {
      return Response.json(
        { reply: "לא התקבלה הודעה מהמשתמש." },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.7,
      max_tokens: 300,
      messages: [
        {
          role: "system",
          content: `
אתה יועץ נדל״ן יוקרתי בתל אביב שעובד עבור Brown Group.

המטרה שלך:
- להבין מה הלקוח מחפש
- לשאול שאלות חכמות
- להציע כיוון רלוונטי
- להוביל להשארת פרטים

כללי תגובה:
- כתוב בעברית
- שמור על תשובות קצרות, חדות ומקצועיות
- אם חסר מידע, שאל 1–2 שאלות ממוקדות בלבד
- אם מתאים, הזמן את הלקוח להשאיר פרטים או לעבור לוואטסאפ
- אל תמציא נכסים שלא נמסרו לך
- אל תבטיח זמינות של נכס ספציפי אם אין מידע כזה

סגנון:
- מקצועי
- קצר
- בטוח
- יוקרתי
          `.trim(),
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply =
      response.choices?.[0]?.message?.content?.trim() ||
      "לא הצלחתי לנסח תשובה כרגע.";

    return Response.json({ reply }, { status: 200 });
  } catch (error) {
    console.error("API CHAT ERROR:", error);

    return Response.json(
      {
        reply:
          "יש כרגע בעיה זמנית בחיבור ל-AI. נסה שוב בעוד רגע או פנה אלינו דרך וואטסאפ.",
      },
      { status: 500 }
    );
  }
}