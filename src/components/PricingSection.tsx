import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { cn } from '../../lib/utils';

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

const tiers: PricingTier[] = [
  {
    name: "Starter",
    price: "R499",
    description: "Perfect for solo practitioners and small businesses.",
    features: [
      "Up to 50 Leads / Month",
      "1 User",
      "Lead Capture Forms",
      "Basic Follow-Up Automation",
      "CRM Pipeline",
      "Calendar Booking",
      "Email Support",
      "14-Day Free Trial"
    ],
    cta: "Start Free Trial"
  },
  {
    name: "Growth",
    price: "R1,499",
    description: "The complete engine for growing service businesses.",
    popular: true,
    features: [
      "Up to 500 Leads / Month",
      "5 Users",
      "Everything in Starter",
      "AI Lead Qualification",
      "Multi-Step Automations",
      "WhatsApp / SMS Integration",
      "Advanced Analytics",
      "Priority Support",
      "14-Day Free Trial"
    ],
    cta: "Start Free Trial"
  },
  {
    name: "Professional",
    price: "R2,999",
    description: "Advanced controls for larger teams and agencies.",
    features: [
      "Unlimited Leads",
      "Unlimited Users",
      "Everything in Growth",
      "White Label Options",
      "Advanced Workflow Builder",
      "API / Webhooks",
      "Team Permissions",
      "Dedicated Account Support",
      "14-Day Free Trial"
    ],
    cta: "Start Free Trial"
  }
];

interface PricingSectionProps {
  onStart?: (plan: string) => void;
  onBookDemo?: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onStart, onBookDemo }) => {
  return (
    <section className="py-24 px-6 relative bg-[#0B0B0F]" id="pricing">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 px-4 py-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
            Pricing Plans
          </Badge>
          <h2 className="text-4xl md:text-5xl font-heading mb-4 text-white font-black">Simple, Transparent Pricing</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
            Choose the plan that fits your business stage. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="h-full"
            >
              <Card className={cn(
                "relative h-full flex flex-col border-white/5 transition-all duration-300 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] hover:border-primary/30 overflow-hidden bg-[#12121A]",
                tier.popular && "border-primary/50 border-2 shadow-[0_0_80px_-15px_rgba(124,58,237,0.3)] md:scale-105 z-10"
              )}>
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/10 text-[10px] font-bold uppercase tracking-wider">
                    14-Day Free Trial
                  </Badge>
                </div>
                {tier.popular && (
                  <div className="absolute top-5 -right-12 w-48 bg-primary text-white text-[9px] font-black uppercase tracking-[0.2em] py-2 rotate-45 shadow-xl border-y border-white/10 z-20 text-center">
                    Most Popular
                  </div>
                )}
                
                <CardHeader className="pt-12">
                  <CardTitle className="text-2xl font-extrabold tracking-tight text-white">{tier.name}</CardTitle>
                  <CardDescription className="min-h-[40px] font-medium text-slate-400">{tier.description}</CardDescription>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-black tracking-tight text-white">{tier.price}</span>
                    <span className="text-slate-500 font-bold text-sm">/month</span>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <ul className="space-y-4">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    onClick={() => onStart?.(tier.name)}
                    className={cn(
                      "w-full rounded-2xl py-6 text-lg font-bold transition-all duration-300", 
                      tier.popular ? "bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 text-white" : "bg-white/5 border-primary/50 text-white hover:bg-primary/10 hover:border-primary border-2"
                    )}
                    variant={tier.popular ? "default" : "outline"}
                  >
                    {tier.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <p className="text-center mt-12 text-slate-500 text-sm font-medium">
          Built for South African businesses. Prices in ZAR. 
          <a href="#" className="text-primary hover:underline ml-1">Custom enterprise plans available.</a>
        </p>
      </div>
    </section>
  );
};
