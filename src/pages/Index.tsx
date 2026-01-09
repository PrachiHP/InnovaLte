import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/lib/types';
import SplashScreen from '@/components/SplashScreen';
import RoleSelector from '@/components/RoleSelector';
import LoginForm from '@/components/LoginForm';
import DriverHome from '@/components/driver/DriverHome';
import OrgDashboard from '@/components/organization/OrgDashboard';
import SecurityDashboard from '@/components/security/SecurityDashboard';

const AppContent = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const { user, login, isAuthenticated } = useAuth();

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  if (isAuthenticated && user) {
    switch (user.role) {
      case 'driver':
        return <DriverHome />;
      case 'organization':
        return <OrgDashboard />;
      case 'security':
        return <SecurityDashboard />;
    }
  }

  if (selectedRole) {
    return (
      <LoginForm
        role={selectedRole}
        onBack={() => setSelectedRole(null)}
        onLogin={(email, name) => login(email, selectedRole, name)}
      />
    );
  }

  return <RoleSelector onSelectRole={setSelectedRole} />;
};

const Index = () => {
  return (
    <AuthProvider>
      <AnimatePresence mode="wait">
        <AppContent />
      </AnimatePresence>
    </AuthProvider>
  );
};

export default Index;
