import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, User, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserRole } from '@/lib/types';

interface LoginFormProps {
  role: UserRole;
  onBack: () => void;
  onLogin: (email: string, name?: string) => void;
}

const roleConfig = {
  driver: {
    title: 'Driver Login',
    subtitle: 'Enter your email to continue',
    showName: true,
  },
  organization: {
    title: 'Organization Login',
    subtitle: 'Login with your organization credentials',
    showName: true,
  },
  security: {
    title: 'Security Guard Login',
    subtitle: 'Enter the email registered by your organization',
    showName: false,
  },
};

const LoginForm = ({ role, onBack, onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const config = roleConfig[role];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onLogin(email, name || undefined);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 p-4">
        <button
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      </div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center px-6 pt-8"
      >
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary shadow-button">
          <span className="text-3xl font-bold text-primary-foreground">P</span>
        </div>
        <h1 className="text-2xl font-bold text-primary">ParkEasy</h1>
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
        className="flex flex-1 flex-col px-6 pt-10"
      >
        <h2 className="mb-2 text-xl font-semibold">{config.title}</h2>
        <p className="mb-8 text-muted-foreground">{config.subtitle}</p>

        <div className="space-y-4">
          {config.showName && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-14 rounded-xl border-2 pl-12 text-base"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 rounded-xl border-2 pl-12 text-base"
              required
            />
          </div>

          {role === 'organization' && (
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Organization name"
                className="h-14 rounded-xl border-2 pl-12 text-base"
              />
            </div>
          )}
        </div>

        <div className="mt-auto pb-8 pt-6">
          <Button type="submit" size="xl" className="w-full">
            Continue
          </Button>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Demo mode - any email works
          </p>
        </div>
      </motion.form>
    </div>
  );
};

export default LoginForm;
