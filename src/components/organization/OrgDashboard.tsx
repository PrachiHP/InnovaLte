import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, MapPin, Users, LogOut, Building2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface Location {
  id: string;
  name: string;
  address: string;
  slots: number;
}

const OrgDashboard = () => {
  const { user, logout } = useAuth();
  const [locations, setLocations] = useState<Location[]>([]);
  const [guards, setGuards] = useState<string[]>([]);
  const [showAddLocation, setShowAddLocation] = useState(false);
  const [showAddGuard, setShowAddGuard] = useState(false);
  const [newLocation, setNewLocation] = useState({ name: '', address: '', slots: '' });
  const [newGuardEmail, setNewGuardEmail] = useState('');

  const handleAddLocation = () => {
    if (newLocation.name && newLocation.address) {
      setLocations([
        ...locations,
        {
          id: Date.now().toString(),
          name: newLocation.name,
          address: newLocation.address,
          slots: parseInt(newLocation.slots) || 50,
        },
      ]);
      setNewLocation({ name: '', address: '', slots: '' });
      setShowAddLocation(false);
      toast.success('Location added successfully!');
    }
  };

  const handleAddGuard = () => {
    if (newGuardEmail && newGuardEmail.includes('@')) {
      setGuards([...guards, newGuardEmail]);
      setNewGuardEmail('');
      setShowAddGuard(false);
      toast.success('Security guard added!');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card px-4 py-4 lg:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <span className="text-lg font-bold text-primary-foreground">P</span>
            </div>
            <div>
              <h1 className="font-bold text-primary">ParkEasy</h1>
              <p className="text-xs text-muted-foreground">Organization Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-muted-foreground sm:block">
              {user?.email}
            </span>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl p-4 lg:p-8">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold">Welcome, {user?.name}!</h2>
          <p className="text-muted-foreground">
            Manage your parking locations and security guards
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Locations Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl bg-card p-6 shadow-card"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Parking Locations</h3>
                  <p className="text-sm text-muted-foreground">
                    {locations.length} location{locations.length !== 1 && 's'}
                  </p>
                </div>
              </div>
              <Button size="sm" onClick={() => setShowAddLocation(true)}>
                <Plus className="mr-1 h-4 w-4" />
                Add
              </Button>
            </div>

            {showAddLocation && (
              <div className="mb-4 space-y-3 rounded-xl bg-muted/50 p-4">
                <Input
                  placeholder="Location name"
                  value={newLocation.name}
                  onChange={(e) =>
                    setNewLocation({ ...newLocation, name: e.target.value })
                  }
                />
                <Input
                  placeholder="Address"
                  value={newLocation.address}
                  onChange={(e) =>
                    setNewLocation({ ...newLocation, address: e.target.value })
                  }
                />
                <Input
                  type="number"
                  placeholder="Total slots (default: 50)"
                  value={newLocation.slots}
                  onChange={(e) =>
                    setNewLocation({ ...newLocation, slots: e.target.value })
                  }
                />
                <div className="rounded-xl border-2 border-dashed p-4 text-center">
                  <Upload className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Upload floor plan image
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleAddLocation}>
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowAddLocation(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {locations.length === 0 ? (
              <div className="rounded-xl bg-muted/50 p-8 text-center">
                <MapPin className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  No locations added yet
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {locations.map((loc) => (
                  <div
                    key={loc.id}
                    className="flex items-center gap-3 rounded-xl bg-muted/50 p-3"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{loc.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {loc.address} • {loc.slots} slots
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Guards Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl bg-card p-6 shadow-card"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
                  <Users className="h-6 w-6 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold">Security Guards</h3>
                  <p className="text-sm text-muted-foreground">
                    {guards.length} guard{guards.length !== 1 && 's'}
                  </p>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={() => setShowAddGuard(true)}>
                <Plus className="mr-1 h-4 w-4" />
                Add
              </Button>
            </div>

            {showAddGuard && (
              <div className="mb-4 space-y-3 rounded-xl bg-muted/50 p-4">
                <Input
                  type="email"
                  placeholder="Guard's email address"
                  value={newGuardEmail}
                  onChange={(e) => setNewGuardEmail(e.target.value)}
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleAddGuard}>
                    Add Guard
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowAddGuard(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {guards.length === 0 ? (
              <div className="rounded-xl bg-muted/50 p-8 text-center">
                <Users className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  No guards added yet
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {guards.map((email, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl bg-muted/50 p-3"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/20 text-sm font-medium text-success">
                      {email.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm">{email}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default OrgDashboard;
