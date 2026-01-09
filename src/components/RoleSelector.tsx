import { motion } from 'framer-motion';
import { Car, Building2, Shield } from 'lucide-react';
import { UserRole } from '@/lib/types';

interface RoleSelectorProps {
  onSelectRole: (role: UserRole) => void;
}

const roles = [
  {
    id: 'driver' as UserRole,
    title: 'Driver',
    description: 'Find and book parking spots near you',
    icon: Car,
  },
  {
    id: 'organization' as UserRole,
    title: 'Organization',
    description: 'Manage your parking locations',
    icon: Building2,
  },
  {
    id: 'security' as UserRole,
    title: 'Security Guard',
    description: 'Monitor and manage parking slots',
    icon: Shield,
  },
];

const RoleSelector = ({ onSelectRole }: RoleSelectorProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-background px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-button">
          <span className="text-2xl font-bold text-primary-foreground">P</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground">Welcome to ParkEasy</h1>
        <p className="mt-2 text-muted-foreground">Select how you want to continue</p>
      </motion.div>

      {/* Role Cards */}
      <div className="flex flex-1 flex-col gap-4">
        {roles.map((role, index) => (
          <motion.button
            key={role.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelectRole(role.id)}
            className="group flex items-center gap-4 rounded-2xl bg-card p-5 shadow-card transition-all hover:shadow-lg active:scale-[0.98]"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <role.icon className="h-7 w-7" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-foreground">{role.title}</h3>
              <p className="text-sm text-muted-foreground">{role.description}</p>
            </div>
            <div className="text-muted-foreground/50 transition-transform group-hover:translate-x-1">
              →
            </div>
          </motion.button>
        ))}
      </div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center text-xs text-muted-foreground"
      >
        Demo Application • No real data
      </motion.p>
    </div>
  );
};

export default RoleSelector;
