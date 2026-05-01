import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { useSubscription, PlanTier, PLANS } from '../contexts/SubscriptionContext';
import { Sparkles, Check, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { toast } from 'sonner';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetPlan?: PlanTier;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose, targetPlan = 'Growth' }) => {
  const { upgradePlan, profile } = useSubscription();

  const handleUpgrade = async () => {
    try {
      await upgradePlan(targetPlan);
      toast.success(`Successfully upgraded to ${targetPlan}!`);
      onClose();
    } catch (error) {
      toast.error('Upgrade failed. Please try again.');
    }
  };

  const planInfo = PLANS[targetPlan];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] bg-[#0B0B0F] border-[#2A2A35] p-0 overflow-hidden text-white rounded-3xl shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-500" />
        
        <div className="p-8 space-y-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary border border-primary/30 rotate-3">
              <Sparkles size={32} />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black tracking-tight">Unlock {targetPlan}</h2>
              <p className="text-slate-400 text-sm">
                Get more leads and advanced automation tools to scale your business.
              </p>
            </div>
          </div>

          <div className="bg-[#12121A] border border-[#2A2A35] rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">What's included:</h3>
            <div className="space-y-3">
              {planInfo.features.filter(f => f !== 'all' && !PLANS.Starter.features.includes(f)).map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-sm font-bold text-slate-300 capitalize">{feature.replace(/_/g, ' ')}</span>
                </div>
              ))}
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span className="text-sm font-bold text-slate-300">Up to {planInfo.leadLimit} Leads / Month</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-lg group shadow-xl shadow-primary/20"
              onClick={handleUpgrade}
            >
              Upgrade Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="ghost" 
              className="w-full h-10 text-slate-500 hover:text-white"
              onClick={onClose}
            >
              Maybe Later
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
