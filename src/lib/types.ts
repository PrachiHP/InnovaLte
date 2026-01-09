export type UserRole = 'driver' | 'organization' | 'security';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  vehiclePlate?: string;
  organizationId?: string;
}

export interface ParkingLocation {
  id: string;
  name: string;
  address: string;
  organizationId: string;
  organizationName: string;
  totalSlots: number;
  availableSlots: number;
  distance: number;
  isPrivate: boolean;
  floorPlanUrl?: string;
  latitude: number;
  longitude: number;
}

export interface ParkingSlot {
  id: string;
  locationId: string;
  slotNumber: string;
  status: 'available' | 'occupied' | 'prebooked';
  bookedBy?: string;
  bookedUntil?: Date;
}

export interface Booking {
  id: string;
  userId: string;
  locationId: string;
  slotId: string;
  slotNumber: string;
  locationName: string;
  date: Date;
  startTime: string;
  duration: number;
  status: 'active' | 'completed' | 'cancelled';
}
