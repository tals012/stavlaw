import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "תקנון השימוש | עו״ד סתיו אליהו שוקרון",
  description: "תקנון השימוש באתר משרד עו״ד סתיו אליהו שוקרון.",
};

export default function TermsPage() {
  return (
    <main className="bg-cream-100 min-h-screen py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[14px] text-navy/70 hover:text-peach transition-colors mb-8"
        >
          <ChevronRight className="h-4 w-4" />
          חזרה לעמוד הבית
        </Link>

        <h1 className="text-[clamp(2rem,3.5vw,44px)] font-bold text-navy leading-[1.15]">
          תקנון השימוש
        </h1>
        <p className="mt-3 text-[14px] text-navy/60">
          עודכן לאחרונה: אפריל 2026
        </p>

        <div className="mt-10 space-y-8 text-[16px] text-navy/85 leading-[1.8]">
          <section>
            <h2 className="text-[20px] font-bold text-navy mb-3">1. כללי</h2>
            <p>
              אתר זה (להלן: &quot;האתר&quot;) מופעל על ידי עו״ד סתיו אליהו שוקרון, בעלת רישיון לעסוק בעריכת
              דין במדינת ישראל. השימוש באתר מהווה הסכמה מלאה לתנאי השימוש המפורטים להלן. אם אינך מסכים/ה
              לתנאים אלו, אנא הימנע/י משימוש באתר.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-bold text-navy mb-3">2. אופי המידע באתר</h2>
            <p>
              התכנים והמידע המוצגים באתר נועדו למטרות אינפורמטיביות בלבד ואינם מהווים ייעוץ משפטי, חוות
              דעת או המלצה לפעולה משפטית כלשהי. אין להסתמך על התוכן באתר ככזה. כל פעולה משפטית ראויה
              להיעשות לאחר התייעצות אישית עם עורך/ת דין המכיר/ה את פרטי המקרה.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-bold text-navy mb-3">3. דוגמאות מקרים ועדויות</h2>
            <p>
              דוגמאות המקרים המוצגות באתר משקפות תוצאות שהושגו בתיקים קונקרטיים. כל תיק נדון לגופו, אין
              להסיק מתוצאה אחת על תוצאה זהה בתיק אחר, וכל מקרה מותאם לנסיבותיו. שמות הלקוחות והפרטים
              המזהים שונו או הוסתרו לצורך שמירה על פרטיותם.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-bold text-navy mb-3">4. קניין רוחני</h2>
            <p>
              כל הזכויות באתר - לרבות התכנים, העיצוב, התמונות, הלוגו והקוד - שמורות לעו״ד סתיו אליהו
              שוקרון או למי מטעמה. אין להעתיק, לשכפל, להפיץ, להציג בפומבי, לשנות או לעשות כל שימוש מסחרי
              בתכנים, ללא אישור מראש ובכתב.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-bold text-navy mb-3">5. יצירת קשר ושליחת פרטים</h2>
            <p>
              במסירת פרטים בטופס יצירת קשר או בשאלון הסינון, את/ה מסכים/ה לכך שעורכת הדין תיצור עמך קשר
              חזרה במגוון אמצעים (טלפון, וואטסאפ, דוא״ל) לצורך מתן מענה לפנייתך. הפרטים שתמסור/י יישמרו
              במאגר מידע של המשרד, יטופלו בסודיות ולא יועברו לצדדים שלישיים, אלא ככל הנדרש על פי דין.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-bold text-navy mb-3">6. קישורים חיצוניים</h2>
            <p>
              האתר עשוי להכיל קישורים לאתרים חיצוניים. עו״ד שוקרון אינה אחראית לתכנים, לשירותים או למדיניות
              הפרטיות של אתרים אלו, ואינה ערבה לזמינותם או לדיוקם.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-bold text-navy mb-3">7. שינויים בתקנון</h2>
            <p>
              עו״ד שוקרון שומרת לעצמה את הזכות לעדכן את תנאי השימוש מעת לעת, על פי שיקול דעתה הבלעדי.
              העדכון יפורסם באתר ותחילתו במועד פרסומו.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-bold text-navy mb-3">8. סמכות שיפוט והדין החל</h2>
            <p>
              על תקנון זה ועל כל סכסוך הנובע משימוש באתר יחולו דיני מדינת ישראל בלבד. סמכות השיפוט
              הבלעדית בכל עניין הקשור לאתר נתונה לבתי המשפט המוסמכים במחוז דרום, באר שבע.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-bold text-navy mb-3">9. יצירת קשר</h2>
            <p>
              לכל שאלה בנוגע לתקנון, ניתן לפנות בדוא״ל:{" "}
              <a href="mailto:s@stavlaw.co.il" className="text-peach hover:underline">
                s@stavlaw.co.il
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
