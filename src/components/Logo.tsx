import React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className, iconOnly = false }) => {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative flex items-center justify-center">
        <div className="absolute -inset-1.5 bg-primary/20 blur-lg rounded-full" />
        <div className="relative bg-primary text-primary-foreground p-1.5 rounded-lg shadow-lg shadow-primary/20">
          <Sparkles className="w-5 h-5" fill="currentColor" />
        </div>
      </div>
      {!iconOnly && (
        <span className="font-heading font-bold text-xl tracking-tighter">
          Purple<span className="text-primary">.</span>
        </span>
      )}
    </div>
  );
};
