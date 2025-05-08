import { ContactForm } from '@/components/contact-form';
import { Heart, Users, Target } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          צור קשר / אודות Active Hub
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
          אנחנו כאן כדי לעזור לך להתחבר לקהילת ספורט תוססת ולמצוא פעילויות שמתאימות בדיוק לך.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold text-accent mb-6">על היוזמה שלנו</h2>
          
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">המטרה שלנו</h3>
              <p className="text-foreground/70 leading-relaxed">
                Active Hub נולד מתוך רצון להפוך את החיפוש אחר פעילויות ספורט ופנאי לקל, נגיש ומהנה יותר. אנו שואפים לחבר בין אנשים, לעודד אורח חיים בריא ופעיל, ולבנות קהילות ספורטיביות חזקות ומגוונות.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-accent/10 rounded-full">
              <Users className="h-8 w-8 text-accent" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">למי זה מיועד?</h3>
              <p className="text-foreground/70 leading-relaxed">
                הפלטפורמה מיועדת לכל מי שמחפש להוסיף קצת יותר תנועה לחיים - מחובבי ספורט ותיקים ועד למתחילים שרוצים לעשות את הצעד הראשון. אנו תומכים במגוון רחב של פעילויות וקהלים, עם דגש על הכלה ויצירת מרחב בטוח לכולם.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
             <div className="p-3 bg-tertiary/10 rounded-full"> {/* Using tertiary for queer-friendly accent */}
              <Heart className="h-8 w-8 text-tertiary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">הערכים שלנו</h3>
              <p className="text-foreground/70 leading-relaxed">
                אנו מאמינים בכוחה של קהילה, בחשיבות של נגישות ובצורך ליצור סביבה מכילה ותומכת. Active Hub מחויבת לקידום גיוון והכלה בעולם הספורט, ומציעה מרחב ידידותי לקהילת הלהטב"ק ולכלל האוכלוסיה.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-accent mb-6 text-center md:text-right">יש לך שאלה? דברו איתנו!</h2>
          <ContactForm />
        </section>
      </div>
    </div>
  );
}
