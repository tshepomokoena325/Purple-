import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { AuthPage } from './pages/AuthPage';

type AppView = 'landing' | 'auth' | 'dashboard';

export default function App() {
  const [view, setView] = useState<AppView>('landing');
  const [selectedPlan, setSelectedPlan] = useState<string>('Starter');
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    // Initial theme setup
    const saved = localStorage.getItem('purple-theme') as 'dark' | 'light' | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Simulate initial load for that premium feel
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('purple-theme', newTheme);
  };

  const handleStart = (plan?: string) => {
    if (plan) setSelectedPlan(plan);
    setView('auth');
  };

  const handleAuthSuccess = (user: any) => {
    setView('dashboard');
  };

  const handleLogout = () => {
    setView('landing');
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#0B0B0F]">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="relative">
             <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full animate-pulse" />
             <div className="relative h-12 w-12 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/40">
                <div className="w-6 h-6 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
             </div>
          </div>
          <span className="font-heading font-bold text-2xl tracking-tighter text-white">
            Purple<span className="text-primary">.</span>
          </span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={cn(
      theme === 'dark' ? "dark" : "",
      "min-h-screen bg-background text-foreground selection:bg-primary/20 transition-colors duration-500"
    )}>
      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <LandingPage onStart={handleStart} />
          </motion.div>
        )}
        
        {view === 'auth' && (
          <motion.div
            key="auth"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <AuthPage 
              onSuccess={handleAuthSuccess} 
              onBackToHome={handleLogout} 
              initialPlan={selectedPlan as any}
            />
          </motion.div>
        )}

        {view === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Dashboard 
              onLogout={handleLogout} 
              theme={theme} 
              toggleTheme={toggleTheme} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
