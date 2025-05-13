import 'dotenv/config';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

// GeistSans from 'geist/font/sans' is an object, not a function to be called.
// It directly provides properties like .variable.
// const geistSans = GeistSans({ // This was causing the TypeError
//   variable: '--font-geist-sans',
//   subsets: ['latin'], 
// });


export const metadata: Metadata = {
  title: 'Active Hub | מצא פעילויות ספורט בקהילה שלך',
  description: 'Active Hub - הפלטפורמה שלך למציאת פעילויות ספורט וכושר בקהילה.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={cn(GeistSans.variable, "min-h-screen bg-background font-sans antialiased")}>
        <div className="relative flex min-h-dvh flex-col">
          <Header />
          <main className="flex-1 py-8">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
