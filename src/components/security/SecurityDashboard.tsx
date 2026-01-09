import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, MapPin, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { mockLocations } from '@/lib/mockData';
import { generateSlots } from '@/lib/mockData';
import { ParkingSlot } from '@/lib/types';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const SecurityDashboard = () => {
  const { user, logout } = useAuth();
  const [selectedLocationId, setSelectedLocationId] = useState(mockLocations[0].id);
  const location = mockLocations.find((l) => l.id === selectedLocationId)!;
  const [slots, setSlots] = useState<ParkingSlot[]>(() =>
    generateSlots(location.id, location.totalSlots, location.availableSlots)
  );

  const handleSlotAction = (slot: ParkingSlot) => {
    if (slot.status === 'available') return;

    setSlots((prev) =>
      prev.map((s) =>
        s.id === slot.id ? { ...s, status: 'available' } : s
      )
    );
    toast.success(`Slot ${slot.slotNumber} marked as vacant`);
  };

  const stats = {
    available: slots.filter((s) => s.status === 'available').length,
    occupied: slots.filter((s) => s.status === 'occupied').length,
    prebooked: slots.filter((s) => s.status === 'prebooked').length,
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b bg-card/80 px-4 py-3 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <span className="font-bold text-primary-foreground">P</span>
            </div>
            <div>
              <h1 className="font-bold text-primary">ParkEasy</h1>
              <p className="text-xs text-muted-foreground">Security Portal</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="px-4 pt-4">
        {/* Location Selector */}
        <div className="mb-4 flex items-center gap-3 rounded-xl bg-card p-3 shadow-card">
          <MapPin className="h-5 w-5 text-primary" />
          <select
            value={selectedLocationId}
            onChange={(e) => setSelectedLocationId(e.target.value)}
            className="flex-1 bg-transparent font-medium focus:outline-none"
          >
            {mockLocations.filter((l) => l.isPrivate).map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
          <RefreshCw className="h-5 w-5 text-muted-foreground" />
        </div>

        {/* Stats */}
        <div className="mb-4 grid grid-cols-3 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-success/10 p-4 text-center"
          >
            <p className="text-2xl font-bold text-success">{stats.available}</p>
            <p className="text-xs text-muted-foreground">Available</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl bg-muted p-4 text-center"
          >
            <p className="text-2xl font-bold text-foreground">{stats.occupied}</p>
            <p className="text-xs text-muted-foreground">Occupied</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl bg-warning/10 p-4 text-center"
          >
            <p className="text-2xl font-bold text-warning">{stats.prebooked}</p>
            <p className="text-xs text-muted-foreground">Pre-booked</p>
          </motion.div>
        </div>

        {/* Slot Grid */}
        <div className="rounded-2xl bg-card p-4 shadow-card">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Parking Floor Plan</h3>
            <p className="text-xs text-muted-foreground">Tap occupied to free</p>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {slots.slice(0, 30).map((slot) => (
              <button
                key={slot.id}
                onClick={() => handleSlotAction(slot)}
                disabled={slot.status === 'available'}
                className={cn(
                  'flex h-14 flex-col items-center justify-center rounded-lg text-xs font-medium transition-all',
                  slot.status === 'available' &&
                    'bg-success/20 text-success',
                  slot.status === 'occupied' &&
                    'bg-muted text-muted-foreground hover:bg-destructive/20 hover:text-destructive',
                  slot.status === 'prebooked' &&
                    'bg-warning/20 text-warning hover:bg-warning/30'
                )}
              >
                <span className="text-[10px] opacity-70">
                  {slot.status === 'available' ? '✓' : slot.status === 'prebooked' ? '⏱' : '🚗'}
                </span>
                {slot.slotNumber}
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-4 flex justify-center gap-4 border-t pt-4 text-xs">
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

        {/* User Info */}
        <div className="mt-6 rounded-xl bg-card p-4 shadow-card">
          <p className="text-sm text-muted-foreground">Logged in as</p>
          <p className="font-medium">{user?.email}</p>
        </div>
      </main>
    </div>
  );
};

export default SecurityDashboard;
