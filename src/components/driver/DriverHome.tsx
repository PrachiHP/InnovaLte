import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, MapPin, RefreshCw, Mic, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ParkingLocation, ParkingSlot } from '@/lib/types';
import { mockLocations } from '@/lib/mockData';
import BottomNav from './BottomNav';
import ParkingCard from './ParkingCard';
import SlotSelector from './SlotSelector';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type Tab = 'discover' | 'active' | 'history' | 'profile';
type ParkingFilter = 'private' | 'public';

const DriverHome = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('discover');
  const [filter, setFilter] = useState<ParkingFilter>('private');
  const [selectedLocation, setSelectedLocation] = useState<ParkingLocation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLocations = mockLocations.filter((loc) =>
    filter === 'private' ? loc.isPrivate : !loc.isPrivate
  );

  const handleBook = (slot: ParkingSlot, duration: number) => {
    toast.success(`Slot ${slot.slotNumber} booked for ${duration} hours!`, {
      description: 'Check Active tab for booking details',
    });
    setSelectedLocation(null);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'discover':
        return (
          <>
            {/* Location Bar */}
            <div className="flex items-center gap-3 rounded-xl bg-card p-3 shadow-card">
              <MapPin className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Current Location</p>
                <p className="font-medium">Ahmedabad, Gujarat</p>
              </div>
              <button className="p-2 text-muted-foreground hover:text-primary">
                <RefreshCw className="h-5 w-5" />
              </button>
              <button className="p-2 text-primary">
                <MapPin className="h-5 w-5" />
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="mt-4 flex gap-2 border-b">
              <button
                onClick={() => setFilter('private')}
                className={`flex-1 border-b-2 pb-3 text-sm font-medium transition-colors ${
                  filter === 'private'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground'
                }`}
              >
                Private Parking
              </button>
              <button
                onClick={() => setFilter('public')}
                className={`flex-1 border-b-2 pb-3 text-sm font-medium transition-colors ${
                  filter === 'public'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground'
                }`}
              >
                Public Parking
              </button>
            </div>

            {/* Parking List */}
            <div className="mt-4 space-y-4 pb-24">
              {filteredLocations.map((location) => (
                <ParkingCard
                  key={location.id}
                  location={location}
                  onViewDetails={setSelectedLocation}
                />
              ))}
            </div>
          </>
        );

      case 'active':
        return (
          <div className="flex flex-1 flex-col items-center justify-center pb-24 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <span className="text-3xl">🅿️</span>
            </div>
            <h3 className="text-lg font-semibold">No Active Bookings</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Your active parking bookings will appear here
            </p>
          </div>
        );

      case 'history':
        return (
          <div className="flex flex-1 flex-col items-center justify-center pb-24 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <span className="text-3xl">📋</span>
            </div>
            <h3 className="text-lg font-semibold">No Booking History</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Your past bookings will appear here
            </p>
          </div>
        );

      case 'profile':
        return (
          <div className="pb-24">
            <div className="flex flex-col items-center rounded-2xl bg-card p-6 shadow-card">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-xl font-semibold">{user?.name}</h2>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
            <Button
              variant="outline"
              className="mt-6 w-full"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 px-4 pb-2 pt-4 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">ParkEasy</h1>
            <p className="text-xs text-muted-foreground">📍 Low Accuracy</p>
          </div>
          <div className="flex gap-2">
            <button className="rounded-full p-2 hover:bg-muted">
              <Search className="h-5 w-5" />
            </button>
            <button className="rounded-full p-2 hover:bg-muted">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {activeTab === 'discover' && (
          <div className="relative mt-4">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search parking locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 w-full rounded-xl border-2 bg-card pl-12 pr-12 text-sm focus:border-primary focus:outline-none"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-primary">
              <Mic className="h-5 w-5" />
            </button>
          </div>
        )}
      </header>

      {/* Content */}
      <main className="px-4">{renderContent()}</main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Slot Selector Modal */}
      <AnimatePresence>
        {selectedLocation && (
          <SlotSelector
            location={selectedLocation}
            onClose={() => setSelectedLocation(null)}
            onBook={handleBook}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DriverHome;
