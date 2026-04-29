import Link from "next/link";

export const metadata = {
  title: "דירות להשכרה בתל אביב | דירות למכירה בתל אביב | Brown Group",
  description:
    "מחפשים דירה בתל אביב? דירות להשכרה ולמכירה, נכסי יוקרה, פנטהאוזים ונכסים בבלעדיות. צרו קשר עם Brown Group למציאת הנכס המתאים לכם.",
  alternates: {
    canonical: "https://browngroup.it.com/apartments-tel-aviv",
  },
};

export default function ApartmentsTelAvivPage() {
  return (
    <main className="bg-white px-6 py-20 text-right text-neutral-900" dir="rtl">
      <section className="mx-auto max-w-4xl">
        <p className="mb-4 text-sm font-medium text-[#d9873b]">
          Brown Group Real Estate
        </p>

       <h1 className="text-4xl font-bold leading-tight md:text-6xl">
       דירות להשכרה בתל אביב ודירות למכירה בתל אביב
       </h1>

        <p className="mt-6 text-lg leading-8 text-neutral-600">
          בראון גרופ מתמחה באיתור ושיווק דירות בתל אביב להשכרה ולמכירה,
          עם דגש על דירות יוקרה, פנטהאוזים, נכסים בבלעדיות ונכסים באזורים
          המבוקשים ביותר בעיר.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Link
            href="/properties/rent"
            className="rounded-3xl border border-neutral-200 p-6 transition hover:border-[#d9873b]"
          >
            <h2 className="text-2xl font-semibold">דירות להשכרה בתל אביב</h2>
            <p className="mt-3 text-neutral-600">
              מבחר דירות להשכרה בתל אביב, כולל דירות יוקרה, דירות חדשות
              ונכסים באזורים מרכזיים.
            </p>
          </Link>

          <Link
            href="/properties/sale"
            className="rounded-3xl border border-neutral-200 p-6 transition hover:border-[#d9873b]"
          >
            <h2 className="text-2xl font-semibold">דירות למכירה בתל אביב</h2>
            <p className="mt-3 text-neutral-600">
              נכסים למכירה בתל אביב, דירות להשקעה, דירות מגורים ופנטהאוזים
              במיקומים מבוקשים.
            </p>
          </Link>
        </div>

      <section className="mt-14 space-y-5 leading-8 text-neutral-700">
     <h2 className="text-3xl font-semibold">
    דירות להשכרה, דירות למכירה ונכסי יוקרה בתל אביב
   </h2>

   <p>
    אם אתם מחפשים דירות להשכרה בתל אביב, דירות למכירה בתל אביב או
    נכסי יוקרה באזורים המבוקשים בעיר, Brown Group מסייעת לכם לאתר
    נכסים שמתאימים לצרכים, לתקציב ולסגנון החיים שלכם.
   </p>

  <p>
    הצוות שלנו מתמחה בנדל״ן בתל אביב, כולל דירות יוקרה בתל אביב,
    פנטהאוזים בתל אביב ונכסים נבחרים להשקעה או למגורים. המטרה שלנו
    היא להפוך את תהליך החיפוש לפשוט, מדויק ואישי יותר.
  </p>
</section>

<section className="mt-14 space-y-5 leading-8 text-neutral-700">
  <h2 className="text-3xl font-semibold">
    דירות יוקרה בתל אביב – למה לבחור נכון
  </h2>

  <p>
    דירות יוקרה בתל אביב מציעות חוויית מגורים ברמה הגבוהה ביותר,
    עם מיקומים מרכזיים, נוף פתוח לים, מפרטים טכניים מתקדמים ועיצוב מודרני.
    שוק הנדל״ן בעיר מתאפיין בביקוש גבוה, ולכן חשוב לעבוד עם צוות מקצועי
    שמכיר את השוק לעומק.
  </p>

  <p>
    בראון גרופ מתמחה באיתור דירות יוקרה בתל אביב להשכרה ולמכירה,
    תוך התאמה מלאה לצרכים האישיים של כל לקוח — בין אם מדובר בדירה
    למגורים, השקעה או נכס פרימיום.
  </p>

  <h2 className="text-3xl font-semibold mt-10">
    אזורים מבוקשים בתל אביב
  </h2>

  <p>
    תל אביב מציעה מגוון אזורים מבוקשים כגון צפון תל אביב, לב העיר,
    נווה צדק ורמת אביב. כל אזור מציע אופי שונה וסוגי נכסים שונים,
    ולכן חשוב להבין מה מתאים בדיוק לכם.
  </p>
</section>
<section className="mt-14 rounded-3xl border border-neutral-200 bg-[#faf8f5] p-8 text-right">
  <h2 className="text-2xl font-semibold leading-tight">
    מחפשים דירה בתל אביב? אנחנו כאן לעזור
  </h2>
  <p className="mt-4 text-base leading-8 text-neutral-600">
    השאירו פרטים או שלחו הודעה בוואטסאפ ואנו נחזור אליכם עם נכסים
    רלוונטיים בהתאם לצרכים שלכם.
  </p>
  <div className="mt-6 flex flex-wrap gap-4">
    <a
      href="https://wa.me/972535994391"
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-2xl bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
    >
      שליחה בוואטסאפ
    </a>
    <Link
      href="/#contact"
      className="rounded-2xl border border-neutral-300 px-6 py-3 text-sm font-medium transition hover:border-[#d9873b] hover:bg-white"
    >
      השאירו פרטים
    </Link>
  </div>
</section>
        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/properties/rent"
            className="rounded-2xl bg-black px-6 py-3 text-white transition hover:bg-neutral-800"
          >
            נכסים להשכרה
          </Link>

          <Link
            href="/properties/sale"
            className="rounded-2xl border border-neutral-300 px-6 py-3 transition hover:border-black"
          >
            נכסים למכירה
          </Link>

          <Link
            href="/#contact"
            className="rounded-2xl border border-neutral-300 px-6 py-3 transition hover:border-black"
          >
            צור קשר
          </Link>
        </div>
      </section>
    </main>
  );
}