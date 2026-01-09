import { MapPin, Navigation, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ParkingLocation } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ParkingCardProps {
  location: ParkingLocation;
  onViewDetails: (location: ParkingLocation) => void;
}

const ParkingCard = ({ location, onViewDetails }: ParkingCardProps) => {
  const availabilityPercent = (location.availableSlots / location.totalSlots) * 100;
  const isLow = availabilityPercent < 20;

  return (
    <div className="animate-fade-in overflow-hidden rounded-2xl bg-card shadow-card">
      {/* Image placeholder */}
      <div className="relative h-40 bg-gradient-to-br from-primary/20 to-primary/5">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl font-bold text-primary/20">P</div>
        </div>
        {location.isPrivate && (
          <Badge className="absolute right-3 top-3 bg-primary/90">
            {location.organizationName}
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="text-lg font-semibold text-foreground">{location.name}</h3>
        </div>

        <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Navigation className="h-4 w-4" />
            {location.distance} km
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            NE
          </span>
        </div>

        {/* Availability */}
        <div
          className={cn(
            'mb-4 flex items-center justify-between rounded-xl p-3',
            isLow ? 'bg-warning/10' : 'bg-success/10'
          )}
        >
          <div>
            <p className="text-xs text-muted-foreground">Available Slots</p>
            <p
              className={cn(
                'text-xl font-bold',
                isLow ? 'text-warning' : 'text-success'
              )}
            >
              {location.availableSlots}{' '}
              <span className="text-sm font-normal text-muted-foreground">
                / {location.totalSlots}
              </span>
            </p>
          </div>
          <CheckCircle
            className={cn('h-8 w-8', isLow ? 'text-warning' : 'text-success')}
          />
        </div>

        <Button onClick={() => onViewDetails(location)} className="w-full">
          VIEW DETAILS
        </Button>
      </div>
    </div>
  );
};

export default ParkingCard;
