"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ActivityList from '@/app/activities/ActivityList';
import { ActivityForm } from '@/components/activity-form';
import { LogOut, Settings, Users, ActivitySquare, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Activity } from '@/lib/types';

export default function ManagementPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('activities');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>();

  const handleLogout = () => {
    // Remove the admin password cookie
    document.cookie = 'admin_password=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/management/login');
    toast({
      title: "התנתקת בהצלחה",
      description: "התנתקת ממערכת הניהול",
    });
  };

  const handleAddActivity = () => {
    setSelectedActivity(undefined);
    setIsFormOpen(true);
  };

  const handleEditActivity = (activity: Activity) => {
    setSelectedActivity(activity);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/activities', {
        method: selectedActivity ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedActivity ? { ...data, id: selectedActivity.id } : data),
      });

      if (!response.ok) {
        throw new Error('Failed to save activity');
      }

      // Close the form dialog
      setIsFormOpen(false);
      
      // Refresh the page to show updated data
      router.refresh();
      
      toast({
        title: selectedActivity ? "פעילות עודכנה בהצלחה" : "פעילות נוספה בהצלחה",
        description: selectedActivity ? "הפעילות עודכנה במערכת" : "הפעילות נוספה למערכת",
      });
    } catch (error) {
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה בעת שמירת הפעילות",
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">מערכת ניהול</h1>
          <p className="text-muted-foreground">ניהול פעילויות ותוכן האתר</p>
        </div>
        <Button variant="outline" onClick={handleLogout} className="gap-2">
          <LogOut className="h-4 w-4" />
          התנתק
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="activities" className="gap-2">
            <ActivitySquare className="h-4 w-4" />
            פעילויות
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" />
            משתמשים
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="h-4 w-4" />
            הגדרות
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>ניהול פעילויות</CardTitle>
                <CardDescription>הוסף, ערוך או מחק פעילויות באתר</CardDescription>
              </div>
              <Button onClick={handleAddActivity} className="gap-2">
                <Plus className="h-4 w-4" />
                הוסף פעילות
              </Button>
            </CardHeader>
            <CardContent>
              <ActivityList onEdit={handleEditActivity} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>ניהול משתמשים</CardTitle>
              <CardDescription>ניהול משתמשים והרשאות</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">תכונה זו תהיה זמינה בקרוב.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>הגדרות מערכת</CardTitle>
              <CardDescription>הגדרות כלליות של המערכת</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">תכונה זו תהיה זמינה בקרוב.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedActivity ? 'עריכת פעילות' : 'הוספת פעילות חדשה'}</DialogTitle>
          </DialogHeader>
          <ActivityForm
            activity={selectedActivity}
            onSubmit={handleFormSubmit}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
} 