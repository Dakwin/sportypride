import type { Activity } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Users, User, UserRound, ExternalLink, Phone, Mail, Orbit, Volleyball, Bike, TrendingUp, Leaf } from 'lucide-react'; // Leaf for Yoga, TrendingUp for Running
import Image from 'next/image';

interface ActivityCardProps {
  activity: Activity;
}

const SportIcons: Record<Activity['sportType'], React.ElementType> = {
  "Tennis": Orbit,
  "Beach Volleyball": Volleyball,
  "Cycling": Bike,
  "Yoga": Leaf,
  "Running": TrendingUp,
};

const AudienceIcons: Record<Activity['audience'], React.ElementType> = {
  "All": Users,
  "Men Only": User,
  "Women Only": UserRound,
};

export function ActivityCard({ activity }: ActivityCardProps) {
  const SportIcon = SportIcons[activity.sportType] || Orbit;
  const AudienceIcon = AudienceIcons[activity.audience] || Users;

  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden rounded-lg">
      {activity.image && (
        <div className="relative w-full h-48">
          <Image 
            src={activity.image} 
            alt={activity.name} 
            layout="fill" 
            objectFit="cover" 
            data-ai-hint={`${activity.sportType.toLowerCase()} activity`}
          />
        </div>
      )}
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-semibold mb-1">{activity.name}</CardTitle>
          <div className="flex gap-2">
            <Badge variant="secondary" className="flex items-center gap-1 capitalize">
              <SportIcon className="h-4 w-4" />
              {activity.sportType}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 capitalize">
              <AudienceIcon className="h-4 w-4" />
              {activity.audience}
            </Badge>
          </div>
        </div>
        {activity.description && (
          <CardDescription className="text-sm text-muted-foreground leading-relaxed min-h-[40px]">
            {activity.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex-grow space-y-3 text-sm">
        <div className="flex items-center gap-2 text-foreground/80">
          <MapPin className="h-4 w-4 text-primary" />
          <span>{activity.location}</span>
        </div>
        <div className="flex items-center gap-2 text-foreground/80">
          <Clock className="h-4 w-4 text-primary" />
          <span>{activity.time}</span>
        </div>
        {activity.contactInfo && (
          <div className="flex items-center gap-2 text-foreground/80">
            {activity.contactInfo.includes('@') ? <Mail className="h-4 w-4 text-accent" /> : <Phone className="h-4 w-4 text-accent" />}
            <span>{activity.contactInfo}</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {activity.externalLink && (
          <Button asChild variant="default" size="sm" className="w-full shadow-md hover:shadow-lg transition-shadow">
            <a href={activity.externalLink} target="_blank" rel="noopener noreferrer">
              לפרטים נוספים והרשמה
              <ExternalLink className="mr-2 h-4 w-4" />
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
