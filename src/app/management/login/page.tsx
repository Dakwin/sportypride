"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ManagementLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = () => {
    const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

    if (password === ADMIN_PASSWORD) {
      // Set cookie for authentication
      document.cookie = `admin_password=${password}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days
      router.push('/management');
    } else {
      setError('סיסמה שגויה. נסה שוב.');
      toast({
        title: "שגיאה",
        description: "הסיסמה שהוזנה שגויה",
        variant: "destructive",
      });
    }
    setPassword('');
  };

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <Lock className="mx-auto h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-2xl">כניסה למערכת הניהול</CardTitle>
          <CardDescription>יש להזין סיסמה כדי לגשת לאזור הניהול.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="password"
            placeholder="סיסמה"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            className="text-lg"
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button onClick={handleLogin} className="w-full text-lg">
            כניסה
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 