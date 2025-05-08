import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react'; // For RTL, ArrowLeft indicates "forward" or "next"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
          ברוכים הבאים ל-Active Hub!
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-8">
          Active Hub היא הפלטפורמה שלכם למציאת מגוון פעילויות ספורט וכושר בקהילה. בין אם אתם מחפשים משחק טניס שכונתי, קבוצת ריצה או שיעור יוגה מרגיע - כאן תמצאו הכל. הצטרפו אלינו ועשו את הצעד הראשון לחיים פעילים ובריאים יותר!
        </p>
        <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
          <Link href="/activities">
            מצאו פעילויות עכשיו
            <ArrowLeft className="mr-2 h-5 w-5" />
          </Link>
        </Button>
      </section>

      <section className="mt-16 grid md:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-card rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-2xl font-semibold mb-3 text-accent">מגוון רחב</h3>
          <p className="text-foreground/70">גלו עשרות פעילויות ספורט שונות המתאימות לכל רמה וגיל.</p>
        </div>
        <div className="p-6 bg-card rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-2xl font-semibold mb-3 text-accent">קהילה תומכת</h3>
          <p className="text-foreground/70">התחברו לאנשים עם תחומי עניין דומים וצרו קשרים חדשים.</p>
        </div>
        <div className="p-6 bg-card rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-2xl font-semibold mb-3 text-accent">קל ונוח</h3>
          <p className="text-foreground/70">מערכת סינון פשוטה למציאת הפעילות המושלמת עבורכם.</p>
        </div>
      </section>
    </div>
  );
}
