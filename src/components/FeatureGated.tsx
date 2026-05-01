import React, { useState } from 'react';
import { useSubscription, PlanTier } from '../contexts/SubscriptionContext';
import { Lock } from 'lucide-react';
import { cn } from '../../lib/utils';
import { UpgradeModal } from './UpgradeModal';
import { motion } from 'motion/react';

interface FeatureGatedProps {
  feature: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requiredPlan?: PlanTier;
  className?: string;
  showOverlay?: boolean;
}

export const FeatureGated: React.FC<FeatureGatedProps> = ({ 
  feature, 
  children, 
  fallback, 
  requiredPlan = 'Growth',
  className,
  showOverlay = true 
}) => {
  const { isFeatureLocked, profile } = useSubscription();
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  
  const isLocked = isFeatureLocked(feature);

  if (!isLocked) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  const handleLockedClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsUpgradeModalOpen(true);
  };

  return (
    <div className={cn("relative group", className)}>
      <div 
        className={cn(
          "pointer-events-none transition-all duration-300",
          showOverlay && "opacity-40 grayscale"
        )}
      >
        {children}
      </div>
      
      {showOverlay && (
        <div 
          className="absolute inset-0 z-10 flex flex-col items-center justify-center cursor-pointer p-4"
          onClick={handleLockedClick}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="bg-[#12121A]/80 backdrop-blur-md border border-[#2A2A35] p-3 rounded-2xl flex items-center gap-3 shadow-2xl"
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <Lock size={14} />
            </div>
            <div className="text-left">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Locked Feature</div>
              <div className="text-xs font-bold text-white">Upgrade to {requiredPlan} to Unlock</div>
            </div>
          </motion.div>
        </div>
      )}

      {!showOverlay && (
        <div 
          className="absolute inset-x-0 bottom-2 flex justify-center z-20"
          onClick={handleLockedClick}
        >
           <Lock size={12} className="text-slate-600" />
        </div>
      )}

      <UpgradeModal 
        isOpen={isUpgradeModalOpen} 
        onClose={() => setIsUpgradeModalOpen(false)} 
        targetPlan={requiredPlan}
      />
    </div>
  );
};
