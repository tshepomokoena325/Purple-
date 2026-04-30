import React from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform, animate } from 'motion/react';
import { 
  ChevronRight, 
  ArrowRight, 
  ShieldCheck, 
  Globe, 
  MapPin, 
  MessageCircle,
  Play,
  Star,
  Calendar
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Logo } from '../components/Logo';
import { FeaturesGrid } from '../components/FeaturesGrid';
import { PricingSection } from '../components/PricingSection';
import { DashboardMockup } from '../components/DashboardMockup';
import { ChatAssistant } from '../components/ChatAssistant';
import { TestimonialMarquee } from '../components/TestimonialMarquee';
import { FAQSection } from '../components/FAQSection';

interface LandingPageProps {
  onStart: () => void;
}

const AnimatedNumber = ({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 60,
  });
  const displayValue = useTransform(springValue, (latest) => latest.toFixed(decimals));

  React.useEffect(() => {
    if (isInView) {
      animate(motionValue, value, { duration: 2.5, ease: "easeOut", delay: 0.2 });
    }
  }, [isInView, value, motionValue]);

  return (
    <span ref={ref}>
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
};

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-[#0B0B0F] selection:bg-primary/20 selection:text-primary font-sans overflow-x-hidden text-white">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 bg-[#0B0B0F]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
            <a href="#" className="hover:text-primary transition-colors">Integrations</a>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden sm:inline-flex text-slate-400 hover:text-primary" onClick={onStart}>Login</Button>
            <Button onClick={onStart} className="rounded-full px-6 bg-primary text-white hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 font-semibold">Start Free Trial</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-24 px-6 md:px-12 overflow-hidden bg-[#0B0B0F]">
        {/* Background Decorative Elements */}
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] opacity-40 -z-10" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-900/10 rounded-full blur-[80px] opacity-40 -z-10" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-bold uppercase tracking-wider mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Built for South African Service Businesses
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-6xl font-extrabold leading-[1.1] text-white mb-6 tracking-tight"
            >
              Turn Every Lead Into a <span className="text-primary">Booked Appointment</span> Automatically
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm md:text-lg text-slate-400 mb-10 leading-relaxed max-w-[480px]"
            >
              Purple helps Solar Installers, Dentists, and Contractors instantly follow up with leads, qualify them with AI, and book directly into your calendar.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12"
            >
              <Button size="lg" className="px-8 py-6 bg-primary text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-primary/30 transition-all w-full sm:w-auto" onClick={onStart}>
                Start Free 14-Day Trial
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-6 bg-white/5 border border-white/10 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all w-full sm:w-auto" onClick={onStart}>
                Book Demo
              </Button>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.4 }}
               className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
                <ShieldCheck className="w-5 h-5 text-green-400" />
                WhatsApp AI Follow-ups
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
                <ShieldCheck className="w-5 h-5 text-green-400" />
                Instant Qualification
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 relative w-full lg:w-auto hidden lg:block"
          >
            <div className="relative shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden border border-white/10 bg-[#12121A]">
              <DashboardMockup />
            </div>
          </motion.div>
        </div>
      </section>



      {/* How It Works */}
      <section className="py-24 px-6 md:px-12 bg-[#0B0B0F]" id="how-it-works">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                step: "01",
                title: "Capture Leads Instantly",
                desc: "Purple integrates with your Facebook Ads, Google Ads, and website forms to capture every lead in real-time.",
                icon: MapPin
              },
              {
                step: "02",
                title: "AI Qualifies & Follows Up",
                desc: "Our AI immediately reaches out via WhatsApp, SMS, or Email to qualify the lead and answer their questions.",
                icon: MessageCircle
              },
              {
                step: "03",
                title: "Book More Appointments",
                desc: "Once qualified, the AI sends your booking link and schedules them directly into your calendar. No human input needed.",
                icon: Calendar
              }
            ].map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="text-8xl font-black text-white/5 absolute -top-10 -left-6 group-hover:text-primary/10 transition-colors uppercase italic">{item.step}</div>
                <div className="relative pt-4">
                   <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 border border-primary/20">
                      <item.icon className="w-6 h-6" />
                   </div>
                   <h3 className="text-2xl font-extrabold text-white mb-4 tracking-tight">{item.title}</h3>
                   <p className="text-slate-400 leading-relaxed font-medium">
                     {item.desc}
                   </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturesGrid />

      {/* ROI Section */}
      <section className="py-24 px-6 md:px-12 bg-slate-900 text-white rounded-[2rem] md:rounded-[2.5rem] mx-4 md:mx-12 my-12 overflow-hidden relative border border-primary/20 shadow-[0_0_100px_-20px_rgba(124,58,237,0.4)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -z-10" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { value: 60, suffix: "s", label: "Average Response Time" },
              { value: 4.5, decimals: 1, suffix: "x", label: "Increase in Bookings" },
              { value: 20, suffix: "+", label: "Admin Hours Saved Weekly" },
              { value: 100, suffix: "%", label: "Lead Response Rate" }
            ].map((stat, idx) => (
              <div key={idx} className="space-y-4">
                <div className="text-5xl md:text-6xl font-extrabold tracking-tighter text-white">
                  <AnimatedNumber value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                </div>
                <div className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
        </div>
      </section>

      <PricingSection onStart={onStart} />

      <TestimonialMarquee />

      <FAQSection onStart={onStart} />

      {/* Footer */}
      <footer className="py-20 px-6 md:px-12 bg-[#08080C] border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16 text-white">
          <div className="space-y-8 max-w-sm">
            <Logo />
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              Automating business growth for service providers. Built for the local market with real WhatsApp and calendar integrations.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-16">
            {[
              { title: "Product", items: ["Features", "Pricing", "Integrations", "API"] },
              { title: "Company", items: ["About Us", "Contact", "Terms", "Privacy"] },
              { title: "Use Cases", items: ["Solar", "Real Estate", "Healthcare", "Service Pros"] }
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] mb-6 text-primary">{col.title}</h4>
                <ul className="space-y-4">
                  {col.items.map((item) => (
                    <li key={item}><a href="#" className="text-sm font-semibold text-slate-300 hover:text-primary transition-colors">{item}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6 text-[11px] font-bold text-slate-500 tracking-wider">
          <span className="uppercase">© 2026 Purple AI. All Rights Reserved.</span>
          <div className="flex gap-8 uppercase">
            <a href="#" className="hover:text-primary transition-colors">Facebook</a>
            <a href="#" className="hover:text-primary transition-colors">Instagram</a>
            <a href="#" className="hover:text-primary transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
      
      <ChatAssistant onStart={onStart} />
    </div>
  );
};
