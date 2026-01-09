import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(onComplete, 500);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gradient-primary"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex flex-col items-center"
      >
        {/* Logo */}
        <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-card shadow-xl">
          <span className="text-5xl font-extrabold text-primary">P</span>
        </div>

        {/* Brand Name */}
        <h1 className="mb-2 text-4xl font-bold text-primary-foreground">ParkEasy</h1>
        <p className="text-lg text-primary-foreground/80">Find. Book. Park.</p>

        {/* Loading indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex flex-col items-center"
        >
          <div className="mb-3 h-1 w-8 animate-pulse rounded-full bg-primary-foreground/40" />
          <p className="text-sm text-primary-foreground/60">Preparing your data...</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
