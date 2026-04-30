import React from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  Target, 
  Clock, 
  MessageSquare, 
  Calendar, 
  PieChart, 
  Users, 
  ShieldCheck, 
  Repeat
} from 'lucide-react';
import { cn } from '../../lib/utils';

const features = [
  {
    title: "Instant Lead Capture",
    description: "Capture leads from your website, Facebook Ads, and GMB instantly with zero lag.",
    icon: Zap,
  },
  {
    title: "AI Follow-Up",
    description: "Intelligent AI sequences that sound human and respond in under 60 seconds.",
    icon: MessageSquare,
  },
  {
    title: "Lead Qualification",
    description: "Automatically filter out tyre-kickers and focus only on high-intent prospects.",
    icon: Target,
  },
  {
    title: "WhatsApp Automation",
    description: "Reach customers where they are. Full WhatsApp Business API integration.",
    icon: Repeat,
  },
  {
    title: "Auto-Booking",
    description: "Leads can book directly into your calendar without manual coordination.",
    icon: Calendar,
  },
  {
    title: "CRM Pipeline",
    description: "Visualize your entire sales process with a clean, drag-and-drop Kanban board.",
    icon: Users,
  },
  {
    title: "Unified Inbox",
    description: "Every conversation—WhatsApp, SMS, Email—all in one elegant interface.",
    icon: ShieldCheck,
  },
  {
    title: "Advanced Analytics",
    description: "Know exactly which marketing channels are driving your actual revenue.",
    icon: PieChart,
  },
  {
    title: "60-Second Response",
    description: "Massively increase conversion rates by responding while the lead is hot.",
    icon: Clock,
  }
];

export const FeaturesGrid: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-muted/30 relative" id="features">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-heading mb-6 tracking-tight">
            Everything You Need To <span className="text-primary">Dominate</span> Your local Market
          </h2>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
            We've built the ultimate toolset for South African service businesses to automate growth and reclaim their time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group"
            >
              <div className="h-full p-8 rounded-3xl bg-background border border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
