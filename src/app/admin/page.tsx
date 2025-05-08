"use client"; // Required for future form interactions and auth

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock } from 'lucide-react';

// This is a placeholder for admin page. 
// Authentication and form for adding/editing activities will be implemented later.

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Super simple password check for MVP. Replace with proper auth.
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123"; 

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('סיסמה שגויה. נסה שוב.');
    }
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <Lock className="mx-auto h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-2xl">כניסת מנהלים</CardTitle>
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

  // Placeholder for authenticated admin content
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">אזור ניהול</h1>
        <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mt-2">
          כאן תוכל להוסיף ולערוך פעילויות בפלטפורמה.
        </p>
      </header>
      
      {/* Activity form will be implemented here */}
      <div className="bg-card p-8 rounded-xl shadow-xl">
        <h2 className="text-2xl font-semibold text-accent mb-6">הוספה / עריכת פעילות (בקרוב)</h2>
        <p className="text-muted-foreground">
          הטופס להוספה ועריכה של פעילויות יוטמע כאן בקרוב. 
          כרגע, זהו אזור שמור למנהלים לאחר אימות.
        </p>
        {/* Example: Button to log out */}
        <Button onClick={() => setIsAuthenticated(false)} variant="outline" className="mt-8">
          התנתק
        </Button>
      </div>
    </div>
  );
}
