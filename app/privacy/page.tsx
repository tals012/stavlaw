import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "מדיניות פרטיות | עו״ד סתיו אליהו שוקרון",
  description: "מדיניות הפרטיות של אתר משרד עו״ד סתיו אליהו שוקרון.",
};

export default function PrivacyPage() {
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
          מדיניות פרטיות
        </h1>
        <p className="mt-3 text-[14px] text-navy/60">
          עודכן לאחרונה: אפריל 2026
        </p>

        <div className="mt-10 space-y-8 text-[16px] text-navy/85 leading-[1.8]">
          <section>
            <h2 className="text-[20px] font-bold text-navy mb-3">1. כללי</h2>
            <p>
              משרד עו״ד סתיו אליהו שוקרון (להלן: &quot;המשרד&quot; / &quot;אנו&quot;) מכבד את פרטיות
              המשתמשים באתר ומחויב לשמור על המידע האישי הנמסר אליו. מסמך זה מתאר את אופן איסוף, שימוש
              ושמירת המידע באתר.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-bold text-navy mb-3">2. איזה מידע אנו אוספים</h2>
            <ul className="list-disc list-inside space-y-1.5 ps-2">
              <li>
                <strong>פרטי קשר שמסרת באופן יזום:</strong> שם מלא, מספר טלפון, כתובת דוא״ל ותיאור פנייתך,
                ככל שמילאת טופס יצירת קשר או שאלון סינון.
              </li>
              <li>
                <strong>נתוני שימוש באתר:</strong> כתובת IP, סוג הדפדפן ומערכת ההפעלה, דפים בהם ביקרת,
                משך הביקור ומקור ההפניה. נתונים אלו נאספים באמצעות עוגיות וכלי אנליטיקה.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-[20px] font-bold text-navy mb-3">3. שימוש במידע</h2>
            <p>אנו עושים שימוש במידע למטרות הבאות בלבד:</p>
            <ul className="list-disc list-inside space-y-1.5 mt-2 ps-2">
              <li>יצירת קשר חוזר עם פונים, מתן מענה לשאלות וזימון לפגישת ייעוץ.</li>
              <li>שיפור התוכן ועיצוב האתר על בסיס נתוני שימוש אגרגטיביים.</li>
              <li>שליחת מידע פרסומי או ניוזלטר - רק אם נתת לכך הסכמה מפורשת.</li>
              <li>עמידה בדרישות חוק או צו שיפוטי, ככל שיידרש.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[20px] font-bold text-navy mb-3">4. עוגיות (Cookies)</h2>
            <p>
              האתר עושה שימוש בעוגיות לצורך תפעול תקין, ניתוח שימוש (Google Analytics ו-Vercel
              Analytics) ושיפור החוויה. בכניסתך הראשונה לאתר תוצג לך הודעת הסכמה לעוגיות; באפשרותך לאשר
              או לדחות. ניתן בכל עת למחוק את העוגיות מהדפדפן באמצעות הגדרות הדפדפן.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-bold text-navy mb-3">5. העברת מידע לצדדים שלישיים</h2>
            <p>
              איננו מוכרים, משכירים או מעבירים את המידע האישי שלך לצדדים שלישיים, למעט במקרים הבאים:
            </p>
            <ul className="list-disc list-inside space-y-1.5 mt-2 ps-2">
              <li>ספקי שירות טכניים הכרחיים להפעלת האתר (אחסון, שליחת אימיילים, אנליטיקה).</li>
              <li>על פי דרישת רשות מוסמכת או צו בית משפט.</li>
              <li>במקרה של מיזוג, רכישה או העברת פעילות המשרד.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[20px] font-bold text-navy mb-3">6. שמירת המידע ואבטחתו</h2>
            <p>
              המידע נשמר בשרתים מאובטחים. אנו נוקטים באמצעי אבטחה סבירים על מנת להגן על המידע מפני גישה
              לא מורשית, אובדן או שינוי. עם זאת, אין באפשרותנו להבטיח חסינות מוחלטת מפני חדירות.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-bold text-navy mb-3">7. זכויותיך</h2>
            <p>
              בהתאם לחוק הגנת הפרטיות, התשמ״א-1981, עומדות לך הזכויות הבאות:
            </p>
            <ul className="list-disc list-inside space-y-1.5 mt-2 ps-2">
              <li>לעיין במידע אודותיך השמור במאגר.</li>
              <li>לבקש לתקן או למחוק מידע שאינו נכון.</li>
              <li>לבטל את הסכמתך לקבלת דיוור פרסומי בכל עת.</li>
            </ul>
            <p className="mt-3">
              למימוש זכויותיך, ניתן לפנות אלינו בדוא״ל:{" "}
              <a href="mailto:s@stavlaw.co.il" className="text-peach hover:underline">
                s@stavlaw.co.il
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-bold text-navy mb-3">8. שינויים במדיניות</h2>
            <p>
              עו״ד שוקרון רשאית לעדכן את מדיניות הפרטיות מעת לעת. הגרסה העדכנית תפורסם באתר ותחייב
              ממועד פרסומה.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-bold text-navy mb-3">9. יצירת קשר</h2>
            <p>
              לשאלות בנושא פרטיות, אנא פנו אלינו:{" "}
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
