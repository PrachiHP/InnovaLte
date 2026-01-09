import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Clock, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ParkingLocation, ParkingSlot } from '@/lib/types';
import { generateSlots } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface SlotSelectorProps {
  location: ParkingLocation;
  onClose: () => void;
  onBook: (slot: ParkingSlot, duration: number) => void;
}

const durations = [
  { value: 1, label: '1', sublabel: 'hour' },
  { value: 2, label: '2', sublabel: 'hours' },
  { value: 4, label: '4', sublabel: 'hours' },
  { value: 8, label: '8', sublabel: 'hours', recommended: true },
];

const SlotSelector = ({ location, onClose, onBook }: SlotSelectorProps) => {
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);
  const [selectedDuration, setSelectedDuration] = useState(2);
  const slots = generateSlots(location.id, location.totalSlots, location.availableSlots);

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-background"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <button onClick={onClose} className="p-2">
          <X className="h-5 w-5" />
        </button>
        <h1 className="font-semibold">Book Parking Slot</h1>
        <div className="w-9" />
      </div>

      <div className="flex-1 overflow-auto pb-24">
        {/* Selected Slot Header */}
        {selectedSlot && (
          <div className="m-4 flex items-center gap-4 rounded-2xl border-2 border-primary/20 bg-card p-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-xl font-bold text-primary-foreground">
              {selectedSlot.slotNumber}
            </div>
            <div>
              <h2 className="font-semibold">{location.name}</h2>
              <p className="text-sm text-muted-foreground">{location.address}</p>
            </div>
          </div>
        )}

        {/* Booking Summary */}
        <div className="mx-4 rounded-2xl bg-card p-4 shadow-card">
          <h3 className="mb-3 font-semibold">Booking Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Parking Location</span>
              <span className="font-medium">{location.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Selected Slot</span>
              <span className="font-medium">{selectedSlot?.slotNumber || '—'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Distance</span>
              <span className="font-medium">{location.distance} km away</span>
            </div>
          </div>

          <div className="my-4 border-t" />

          <div className="flex items-center justify-between">
            <span className="font-semibold">Parking Cost</span>
            <Badge variant="outline" className="bg-success/10 text-success">
              ₹0 FREE
            </Badge>
          </div>
          <p className="mt-1 flex items-center gap-1 text-xs text-success">
            <Info className="h-3 w-3" />
            No hidden charges. Completely free parking.
          </p>
        </div>

        {/* Date & Time */}
        <div className="mx-4 mt-4 rounded-2xl bg-card p-4 shadow-card">
          <h3 className="mb-1 font-semibold">Select Date & Time</h3>
          <p className="mb-4 flex items-center gap-1 text-xs text-muted-foreground">
            <Info className="h-3 w-3" />
            Book up to 48 hours in advance
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border-2 p-3">
              <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-4 w-4 text-primary" />
                Date
              </div>
              <p className="font-medium">{formattedDate}</p>
            </div>
            <div className="rounded-xl border-2 p-3">
              <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-4 w-4 text-primary" />
                Time
              </div>
              <p className="font-medium">
                {today.toLocaleTimeString('en-IN', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Duration */}
        <div className="mx-4 mt-4 rounded-2xl bg-card p-4 shadow-card">
          <h3 className="mb-1 font-semibold">Select Duration</h3>
          <p className="mb-4 flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            Fixed duration slots - no extensions available
          </p>
          <div className="grid grid-cols-4 gap-2">
            {durations.map((d) => (
              <button
                key={d.value}
                onClick={() => setSelectedDuration(d.value)}
                className={cn(
                  'relative rounded-xl border-2 p-3 text-center transition-all',
                  selectedDuration === d.value
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border hover:border-primary/50'
                )}
              >
                {d.recommended && (
                  <Badge className="absolute -right-1 -top-2 h-5 px-1.5 text-[10px]">
                    Rec
                  </Badge>
                )}
                <div className="text-xl font-bold">{d.label}</div>
                <div className="text-xs opacity-80">{d.sublabel}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Slot Grid */}
        <div className="mx-4 mt-4 rounded-2xl bg-card p-4 shadow-card">
          <h3 className="mb-4 font-semibold">Select Parking Slot</h3>
          <div className="grid grid-cols-5 gap-2">
            {slots.slice(0, 25).map((slot) => (
              <button
                key={slot.id}
                disabled={slot.status !== 'available'}
                onClick={() => setSelectedSlot(slot)}
                className={cn(
                  'flex h-12 items-center justify-center rounded-lg text-xs font-medium transition-all',
                  slot.status === 'available' &&
                    (selectedSlot?.id === slot.id
                      ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2'
                      : 'bg-success/20 text-success hover:bg-success/30'),
                  slot.status === 'occupied' && 'bg-muted text-muted-foreground',
                  slot.status === 'prebooked' && 'bg-warning/20 text-warning'
                )}
              >
                {slot.slotNumber}
              </button>
            ))}
          </div>
          <div className="mt-4 flex justify-center gap-6 text-xs">
            <span className="flex items-center gap-1">
              <div className="h-3 w-3 rounded bg-success/20" /> Available
            </span>
            <span className="flex items-center gap-1">
              <div className="h-3 w-3 rounded bg-warning/20" /> Pre-booked
            </span>
            <span className="flex items-center gap-1">
              <div className="h-3 w-3 rounded bg-muted" /> Occupied
            </span>
          </div>
        </div>
      </div>

      {/* Book Button */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-card p-4 pb-safe">
        <Button
          size="xl"
          className="w-full"
          disabled={!selectedSlot}
          onClick={() => selectedSlot && onBook(selectedSlot, selectedDuration)}
        >
          CONFIRM BOOKING
        </Button>
      </div>
    </motion.div>
  );
};

export default SlotSelector;
