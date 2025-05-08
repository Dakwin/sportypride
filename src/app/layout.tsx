import type { Metadata } from 'next';
import { GeistSans } from 'next/font/google'; // Changed from Geist to GeistSans for consistency
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

const geistSans = GeistSans({ // Updated variable name
  variable: '--font-geist-sans',
  subsets: ['latin'], // Hebrew characters might need a different subset or font if Geist doesn't support them well. For now, this is standard.
});


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
      <body className={cn(geistSans.variable, "min-h-screen bg-background font-sans antialiased")}>
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
