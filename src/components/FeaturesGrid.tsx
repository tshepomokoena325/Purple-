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
    <section className="py-24 px-6 bg-[#0E0E14] relative" id="features">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 text-white">
          <h2 className="text-4xl md:text-5xl font-heading mb-6 tracking-tight font-black">
            Everything You Need To <span className="text-primary">Dominate</span> Your Market
          </h2>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto font-medium">
            We've built the ultimate toolset for service businesses to automate growth and reclaim their time.
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
              <div className="h-full p-8 rounded-[2.5rem] bg-[#16161E] border border-white/5 transition-all duration-300 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed font-medium">
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
