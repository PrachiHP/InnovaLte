import { ParkingLocation, ParkingSlot, Booking } from './types';

export const mockLocations: ParkingLocation[] = [
  {
    id: '1',
    name: 'TechHub Office Complex',
    address: 'Sector 21, Gandhinagar',
    organizationId: 'org1',
    organizationName: 'TechHub Pvt Ltd',
    totalSlots: 50,
    availableSlots: 12,
    distance: 0.8,
    isPrivate: true,
    latitude: 23.2156,
    longitude: 72.6369,
  },
  {
    id: '2',
    name: 'City Mall Parking',
    address: 'MG Road, Ahmedabad',
    organizationId: 'org2',
    organizationName: 'City Mall',
    totalSlots: 200,
    availableSlots: 45,
    distance: 1.2,
    isPrivate: false,
    latitude: 23.0225,
    longitude: 72.5714,
  },
  {
    id: '3',
    name: 'Metro Station P1',
    address: 'Kankaria, Ahmedabad',
    organizationId: 'public',
    organizationName: 'MEGA',
    totalSlots: 100,
    availableSlots: 28,
    distance: 2.3,
    isPrivate: false,
    latitude: 23.0069,
    longitude: 72.6017,
  },
  {
    id: '4',
    name: 'Business Park Tower',
    address: 'SG Highway, Ahmedabad',
    organizationId: 'org3',
    organizationName: 'Adani Group',
    totalSlots: 150,
    availableSlots: 5,
    distance: 3.5,
    isPrivate: true,
    latitude: 23.0469,
    longitude: 72.5297,
  },
];

export const generateSlots = (locationId: string, total: number, available: number): ParkingSlot[] => {
  const slots: ParkingSlot[] = [];
  const rows = ['A', 'B', 'C', 'D', 'E'];
  
  for (let i = 0; i < total; i++) {
    const row = rows[Math.floor(i / 10)];
    const num = (i % 10) + 1;
    const isAvailable = i < available;
    const isPrebooked = !isAvailable && Math.random() > 0.5;
    
    slots.push({
      id: `${locationId}-${i}`,
      locationId,
      slotNumber: `${row}-${num}`,
      status: isAvailable ? 'available' : isPrebooked ? 'prebooked' : 'occupied',
    });
  }
  
  return slots;
};

export const mockBookings: Booking[] = [
  {
    id: 'b1',
    userId: 'driver1',
    locationId: '1',
    slotId: '1-5',
    slotNumber: 'A-6',
    locationName: 'TechHub Office Complex',
    date: new Date(),
    startTime: '10:00 AM',
    duration: 2,
    status: 'active',
  },
];
