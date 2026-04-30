import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MessageCircle, HelpCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/button';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is Purple?",
    answer: "Purple is an AI-powered lead follow-up CRM built for South African service businesses. It helps you instantly follow up with leads, qualify them automatically, and book appointments into your calendar."
  },
  {
    question: "Who is Purple designed for?",
    answer: "Purple is built for South African local service businesses including solar companies, dentists, security firms, contractors, agencies, real estate businesses, and other appointment-based service providers."
  },
  {
    question: "How does the 14-day free trial work?",
    answer: "You get full access to Purple for 14 days with no commitment, allowing you to test the platform and automate your lead follow-up before subscribing."
  },
  {
    question: "Do I need technical skills to use Purple?",
    answer: "No. Purple is designed to be simple and user-friendly, with guided onboarding and pre-built automation templates to get you started quickly."
  },
  {
    question: "Can Purple integrate with WhatsApp?",
    answer: "Yes. Purple supports WhatsApp automation so you can instantly follow up with leads where your customers are most responsive."
  },
  {
    question: "Can I connect Purple to my website or Facebook Lead Forms?",
    answer: "Yes. Purple integrates with website forms, Meta Lead Forms, landing pages, webhooks, and other lead sources."
  },
  {
    question: "What happens after my trial ends?",
    answer: "You can choose one of our pricing plans and continue using Purple without losing your data or automations."
  },
  {
    question: "Can my team use Purple?",
    answer: "Yes. Depending on your plan, multiple team members can access the platform and manage leads together."
  },
  {
    question: "Is Purple suitable for agencies?",
    answer: "Yes. Our Professional plan includes advanced features ideal for agencies and teams managing multiple users or client accounts."
  },
  {
    question: "How quickly can I get set up?",
    answer: "Most businesses can get fully set up and running in under 30 minutes."
  }
];

const FAQAccordionItem = ({ item, isOpen, onClick }: { item: FAQItem; isOpen: boolean; onClick: () => void }) => {
  return (
    <div className={cn(
      "border border-slate-100 rounded-[2rem] overflow-hidden transition-all duration-500",
      isOpen ? "bg-white shadow-[0_20px_60px_-10px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(124,58,237,0.1)] border-primary/20" : "bg-slate-50/50 hover:bg-white hover:border-slate-200 hover:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)]"
    )}>
      <button
        onClick={onClick}
        className="w-full py-6 px-8 flex items-center justify-between text-left group"
      >
        <span className={cn(
          "text-lg font-bold transition-colors duration-300",
          isOpen ? "text-primary" : "text-slate-900 group-hover:text-primary"
        )}>
          {item.question}
        </span>
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500",
          isOpen ? "bg-primary text-white rotate-180" : "bg-white text-slate-400 group-hover:text-primary shadow-sm"
        )}>
          <ChevronDown size={18} />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="px-8 pb-8 text-slate-500 font-medium leading-relaxed">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQSection = ({ onStart }: { onStart: () => void }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 px-6 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6"
          >
            <HelpCircle size={14} />
            Support
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6 italic">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 font-semibold text-lg">
            Everything you need to know about Purple before getting started.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <FAQAccordionItem
              key={idx}
              item={faq}
              isOpen={openIndex === idx}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>

        {/* Bottom CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 p-12 bg-slate-900 rounded-[3rem] text-center relative overflow-hidden group border border-primary/20 shadow-[0_50px_100px_-20px_rgba(124,58,237,0.3),0_30px_60px_-30px_rgba(0,0,0,0.5)]"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] group-hover:scale-125 transition-transform duration-1000" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-[100px]" />
          
          <div className="relative z-10 space-y-8">
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4 border border-white/5">
              <MessageCircle size={32} />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl md:text-4xl font-black text-white italic tracking-tight">Still Have Questions?</h3>
              <p className="text-slate-400 font-medium text-lg max-w-xl mx-auto">
                Book a demo and we'll show you exactly how Purple can work for your business.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              <Button 
                size="lg" 
                onClick={onStart} 
                className="px-12 py-8 bg-primary text-white rounded-2xl font-bold text-xl hover:shadow-[0_20px_50px_rgba(124,58,237,0.3)] transition-all transform hover:-translate-y-1 w-full sm:w-auto"
              >
                Book Demo
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={onStart}
                className="px-12 py-8 bg-white/5 border-white/10 text-white rounded-2xl font-bold text-xl hover:bg-white/10 transition-all w-full sm:w-auto"
              >
                Start Free Trial
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
