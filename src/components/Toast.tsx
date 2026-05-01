import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            className={cn(
              "pointer-events-auto flex items-center gap-3 px-5 py-4 min-w-[280px] bg-[#12121A] border border-[#2A2A35] rounded-xl shadow-2xl overflow-hidden relative group",
              toast.type === 'success' && "border-l-4 border-l-green-500",
              toast.type === 'error' && "border-l-4 border-l-red-500",
              toast.type === 'info' && "border-l-4 border-l-[#7C3AED]"
            )}
          >
            <div className={cn(
              "flex-shrink-0",
              toast.type === 'success' && "text-green-500",
              toast.type === 'error' && "text-red-500",
              toast.type === 'info' && "text-[#7C3AED]"
            )}>
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5" />}
              {toast.type === 'info' && <Info className="w-5 h-5" />}
            </div>
            
            <p className="text-[13px] font-bold text-white pr-4">{toast.message}</p>
            
            <button 
              onClick={() => removeToast(toast.id)}
              className="absolute top-1/2 -translate-y-1/2 right-3 p-1 opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            
            <motion.div 
               initial={{ scaleX: 1 }}
               animate={{ scaleX: 0 }}
               transition={{ duration: 3.5, ease: 'linear' }}
               className={cn(
                 "absolute bottom-0 left-0 right-0 h-0.5 origin-left",
                 toast.type === 'success' && "bg-green-500/20",
                 toast.type === 'error' && "bg-red-500/20",
                 toast.type === 'info' && "bg-[#7C3AED]/20"
               )}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
