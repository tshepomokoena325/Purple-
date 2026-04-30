import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, User, Zap, ArrowRight, CheckCircle2, ChevronRight, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/button';

interface ChatOption {
  label: string;
  value: string;
}

interface Question {
  id: number;
  text: string;
  options: ChatOption[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "What type of business do you run?",
    options: [
      { label: "Solar Company", value: "solar" },
      { label: "Dental Clinic", value: "dental" },
      { label: "Security Company", value: "security" },
      { label: "Agency", value: "agency" },
      { label: "Contractor", value: "contractor" },
      { label: "Real Estate", value: "real-estate" },
      { label: "Other", value: "other" },
    ]
  },
  {
    id: 2,
    text: "How many leads do you receive per month?",
    options: [
      { label: "0–20", value: "low" },
      { label: "20–50", value: "medium" },
      { label: "50–100", value: "high" },
      { label: "100+", value: "enterprise" },
    ]
  },
  {
    id: 3,
    text: "How are you currently following up with leads?",
    options: [
      { label: "Manually", value: "manual" },
      { label: "CRM / Software", value: "crm" },
      { label: "WhatsApp Only", value: "whatsapp" },
      { label: "We Don't Have a Process", value: "none" },
    ]
  },
  {
    id: 4,
    text: "How quickly do you respond to new leads?",
    options: [
      { label: "Under 5 Minutes", value: "instant" },
      { label: "5–30 Minutes", value: "fast" },
      { label: "30+ Minutes", value: "slow" },
      { label: "Usually Same Day / Later", value: "very-slow" },
    ]
  },
  {
    id: 5,
    text: "What is your biggest challenge right now?",
    options: [
      { label: "Leads Go Cold", value: "cold-leads" },
      { label: "Slow Response Times", value: "response-time" },
      { label: "Missed Follow-Up", value: "missed-followup" },
      { label: "Team Not Tracking Leads", value: "tracking" },
      { label: "Booking More Appointments", value: "booking" },
    ]
  },
  {
    id: 6,
    text: "What would you like to do next?",
    options: [
      { label: "Book a Demo", value: "demo" },
      { label: "Start My Free Trial", value: "trial" },
      { label: "See Pricing First", value: "pricing" },
    ]
  }
];

export const ChatAssistant: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // 0 is initial, 1-6 are questions
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [messages, setMessages] = useState<{ sender: 'ai' | 'user', text: string, options?: ChatOption[] }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      startChat();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const startChat = async () => {
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 1000));
    setMessages([
      { sender: 'ai', text: "Hi 👋 I'm Purple AI. Want to see how Purple can help automate your lead follow-up? Answer a few quick questions and I'll recommend the best next step." }
    ]);
    setIsTyping(false);
    
    await new Promise(r => setTimeout(r, 800));
    showQuestion(0);
  };

  const showQuestion = async (index: number) => {
    const q = QUESTIONS[index];
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 1200));
    setMessages(prev => [...prev, { sender: 'ai', text: q.text, options: q.options }]);
    setIsTyping(false);
    setCurrentStep(index + 1);
  };

  const handleOptionClick = async (option: ChatOption) => {
    const nextStepIndex = currentStep; // currentStep is 1-indexed for questions
    const updatedAnswers = { ...answers, [currentStep]: option.value };
    setAnswers(updatedAnswers);

    // Remove options from the last message to "lock" it
    setMessages(prev => {
      const newMessages = [...prev];
      if (newMessages.length > 0) {
        const last = newMessages[newMessages.length - 1];
        if (last.sender === 'ai') {
          newMessages[newMessages.length - 1] = { ...last, options: undefined };
        }
      }
      return [...newMessages, { sender: 'user', text: option.label }];
    });

    if (nextStepIndex < QUESTIONS.length) {
      showQuestion(nextStepIndex);
    } else {
      showRecommendation(updatedAnswers);
    }
  };

  const showRecommendation = async (allAnswers: Record<number, string>) => {
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 1500));
    
    // Calculation Logic
    let score = 0;
    const bizType = allAnswers[1];
    const volume = allAnswers[2];
    const currentFollowup = allAnswers[3];
    const responseTime = allAnswers[4];
    const painPoint = allAnswers[5];

    // 1. Business Type
    const idealBizTypes = ['solar', 'security', 'real-estate', 'contractor'];
    if (idealBizTypes.includes(bizType)) score += 2;

    // 2. Lead Volume
    if (volume === 'enterprise') score += 3;
    else if (volume === 'high') score += 2;

    // 3. Follow-up System
    if (['manual', 'none'].includes(currentFollowup)) score += 3;
    else if (currentFollowup === 'whatsapp') score += 2;

    // 4. Response Time
    if (responseTime === 'very-slow') score += 3;
    else if (responseTime === 'slow') score += 2;
    else if (responseTime === 'fast') score += 1;

    // 5. Pain Point Urgency
    if (['response-time', 'missed-followup'].includes(painPoint)) score += 3;
    else if (['cold-leads', 'booking'].includes(painPoint)) score += 2;
    else if (painPoint === 'tracking') score += 1;

    // Personalization Mapping
    const bizLabels: Record<string, string> = {
      solar: "solar installation",
      dental: "clinical",
      security: "security services",
      agency: "agency",
      contractor: "contracting",
      'real-estate': "real estate",
      other: "business"
    };

    const painLabels: Record<string, string> = {
      'cold-leads': "preventing leads from going cold",
      'response-time': "fixing slow response times",
      'missed-followup': "stopping missed follow-ups",
      'tracking': "improving lead tracking",
      'booking': "maximizing your appointment bookings"
    };

    const volumeLabels: Record<string, string> = {
      low: "growth phase",
      medium: "scaling",
      high: "high-volume",
      enterprise: "enterprise-scale"
    };

    // Decision Routing
    let recommendation = "";
    let actionType: 'demo' | 'trial' | 'pricing' = 'trial';

    if (score >= 8) {
      recommendation = `Based on your ${volumeLabels[volume] || 'current'} volume, Purple is a critical asset. For a ${bizLabels[bizType] || 'service'} business, ${painLabels[painPoint] || 'automating growth'} is essential. We recommend a personalized demo to show how we'll solve your follow-up gaps.`;
      actionType = 'demo';
    } else if (score >= 4) {
      recommendation = `You're in a great position to scale. Purple can help you with ${painLabels[painPoint] || 'lead management'} immediately. We recommend starting a 14-day free trial to see the AI assistant in action with your real leads.`;
      actionType = 'trial';
    } else {
      recommendation = `Thanks for sharing! Purple is perfect for streamlining operations. Check out our pricing packages to see which tier fits your current lead flow best.`;
      actionType = 'pricing';
    }
    
    setMessages(prev => [...prev, { sender: 'ai', text: recommendation }]);
    setIsTyping(false);

    // Store responses (Simulated CRM Integration)
    console.log("CRM ENTRY - Lead Qualified:", {
      email: "visitor@example.com", // Placeholder
      score,
      routing: actionType,
      data: allAnswers,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-8 right-8 w-16 h-16 rounded-full bg-primary text-white shadow-2xl flex items-center justify-center z-[100] transition-all",
          isOpen ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"
        )}
      >
        <div className="absolute -inset-1 bg-primary/30 blur-lg rounded-full animate-pulse" />
        <MessageCircle className="w-8 h-8 relative z-10" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-8 right-8 w-[400px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-4rem)] bg-white rounded-3xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] border border-slate-100 flex flex-col overflow-hidden z-[110]"
          >
            {/* Header */}
            <div className="p-6 bg-slate-900 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-purple-900/40">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm leading-tight">Purple AI Assistant</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active & Online</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white" onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Progress bar */}
            <div className="h-1 w-full bg-slate-100">
              <motion.div 
                className="h-full bg-primary" 
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / QUESTIONS.length) * 100}%` }}
              />
            </div>

            {/* Chat Content */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
              <AnimatePresence mode="popLayout">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={cn(
                      "flex flex-col gap-2 max-w-[85%] animate-in fade-in slide-in-from-bottom-2",
                      msg.sender === 'ai' ? "mr-auto" : "ml-auto"
                    )}
                  >
                    <div className={cn(
                      "p-4 rounded-2xl text-sm leading-relaxed font-medium shadow-sm",
                      msg.sender === 'ai' 
                        ? "bg-white text-slate-900 rounded-tl-none border border-slate-100" 
                        : "bg-slate-900 text-white rounded-tr-none"
                    )}>
                      {msg.text}
                    </div>

                    {msg.options && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {msg.options.map((opt) => (
                          <motion.button
                            key={opt.value}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleOptionClick(opt)}
                            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:border-primary hover:text-primary transition-all shadow-sm"
                          >
                            {opt.label}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-2 p-4 bg-white border border-slate-100 rounded-2xl rounded-tl-none w-16"
                  >
                    <div className="flex gap-1">
                      <span className="w-1 h-1 rounded-full bg-slate-300 animate-bounce" />
                      <span className="w-1 h-1 rounded-full bg-slate-300 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1 h-1 rounded-full bg-slate-300 animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </motion.div>
                )}

                {/* Final Recommendations */}
                {currentStep > QUESTIONS.length && !isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4 pt-4"
                  >
                     <div className="p-1 bg-gradient-to-br from-primary to-blue-500 rounded-2xl shadow-xl">
                        <div className="bg-white p-6 rounded-[calc(1rem-2px)] space-y-4">
                           <div className="flex items-center gap-3 text-primary">
                              <CheckCircle2 className="w-6 h-6" />
                              <span className="text-sm font-black uppercase tracking-wider">Our recommendation</span>
                           </div>
                           <div className="space-y-3">
                              <Button className="w-full bg-primary py-6 rounded-xl font-bold shadow-lg shadow-purple-900/20" onClick={() => { setIsOpen(false); onStart(); }}>
                                 Get Started Now
                                 <ChevronRight className="ml-2 w-4 h-4" />
                              </Button>
                           </div>
                        </div>
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-between">
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Powered by Purple AI Engineering</span>
               <div className="flex items-center gap-2 opacity-30">
                  <Zap className="w-3 h-3 text-primary" />
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
