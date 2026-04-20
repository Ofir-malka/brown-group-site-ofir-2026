import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = body?.message;

    if (!message) {
      return Response.json(
        { reply: "לא התקבלה הודעה מהמשתמש." },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
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

סגנון התשובה:
- מקצועי
- קצר
- בטוח
- יוקרתי
          `,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply =
      response.choices?.[0]?.message?.content ||
      "לא הצלחתי לנסח תשובה כרגע.";

    return Response.json({ reply });
  } catch (error) {
    console.error("API CHAT ERROR:", error);

    return Response.json(
      {
        reply:
          "יש כרגע בעיה זמנית בחיבור ל-AI. בדוק את המפתח, את ההתקנה, ונסה שוב.",
      },
      { status: 500 }
    );
  }
}