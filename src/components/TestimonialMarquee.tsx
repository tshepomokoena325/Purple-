import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Testimonial {
  text: string;
  author: string;
  role: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    text: "Purple helped us respond to solar leads instantly and increased our booked consultations by 43% in the first month.",
    author: "James M.",
    role: "Solar Company Owner",
    avatar: "https://i.pravatar.cc/150?u=james"
  },
  {
    text: "We stopped losing leads to slow follow-up. Purple completely changed how we handle inbound enquiries.",
    author: "Sarah T.",
    role: "Dental Practice Manager",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    text: "Our team used to manually chase every lead on WhatsApp. Now Purple automates the whole process.",
    author: "Michael R.",
    role: "Security Company Director",
    avatar: "https://i.pravatar.cc/150?u=michael"
  },
  {
    text: "The AI qualification feature saves our sales reps hours every week.",
    author: "Lebo N.",
    role: "Real Estate Agency Owner",
    avatar: "https://i.pravatar.cc/150?u=lebo"
  },
  {
    text: "Purple paid for itself in the first week just from improved follow-up speed.",
    author: "Andre P.",
    role: "Contractor",
    avatar: "https://i.pravatar.cc/150?u=andre"
  }
];

export const TestimonialMarquee: React.FC = () => {
  return (
    <section className="py-32 bg-slate-50/50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6">
          Loved by Local Leaders
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto font-semibold text-lg leading-relaxed">
          The smart choice for South African service providers automating their client acquisition.
        </p>
      </div>

      <div className="relative flex group">
        {/* Gradient Masks */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-slate-50 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-slate-50 to-transparent z-20 pointer-events-none" />

        <div className="flex overflow-hidden relative">
          <div className="flex animate-marquee-slower whitespace-nowrap group-hover:[animation-play-state:paused] py-10">
            {[...testimonials, ...testimonials, ...testimonials].map((t, idx) => (
              <div
                key={idx}
                className="inline-block w-[450px] mx-10 whitespace-normal shrink-0"
              >
                <div className="h-full bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_70px_rgba(124,58,237,0.1)] hover:border-primary/20 transition-all duration-500 relative group/card flex flex-col justify-between">
                  <div>
                    <div className="absolute top-8 right-10 text-primary/5 group-hover/card:text-primary/10 transition-colors">
                      <Quote size={64} fill="currentColor" />
                    </div>
                    
                    <div className="flex gap-1.5 mb-8">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    <p className="text-slate-800 font-bold text-xl leading-relaxed mb-10 tracking-tight">
                      "{t.text}"
                    </p>
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/10 group-hover/card:border-primary/30 transition-colors shadow-lg">
                      <img src={t.avatar} alt={t.author} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900 text-lg">{t.author}</div>
                      <div className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">{t.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-slower {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee-slower {
          display: flex;
          width: fit-content;
          animation: marquee-slower 60s linear infinite;
        }
      `}} />
    </section>
  );
};
