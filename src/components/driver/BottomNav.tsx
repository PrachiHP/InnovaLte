import { Compass, ParkingCircle, Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils';

type Tab = 'discover' | 'active' | 'history' | 'profile';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs = [
  { id: 'discover' as Tab, label: 'Discover', icon: Compass },
  { id: 'active' as Tab, label: 'Active', icon: ParkingCircle },
  { id: 'history' as Tab, label: 'History', icon: Clock },
  { id: 'profile' as Tab, label: 'Profile', icon: User },
];

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-card px-2 pb-safe">
      <div className="mx-auto flex max-w-lg items-center justify-around py-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'flex flex-1 flex-col items-center gap-1 py-2 transition-colors',
              activeTab === tab.id
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <tab.icon className={cn('h-6 w-6', activeTab === tab.id && 'stroke-[2.5]')} />
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
