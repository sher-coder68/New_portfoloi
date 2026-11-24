import React from 'react';
import { testimonialsData } from '../data/portfolioData';
import { 
  MessageSquare, 
  Star, 
  CheckCircle, 
  AlertCircle, 
  UserCheck, 
  ShieldCheck,
  Quote
} from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-charcoal-900 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono uppercase tracking-widest mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Testimonial Placeholders</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Client & Student Feedback Slots
          </h2>
          <p className="text-muted-400 text-sm sm:text-base max-w-2xl mt-3">
            In adherence to strict professional transparency, these sample feedback cards are structured placeholders ready to receive verified client and student reviews.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-teal-700 rounded-full mt-4" />
        </div>

        {/* Transparent Compliance Alert */}
        <div className="max-w-3xl mx-auto mb-12 p-4 rounded-xl bg-charcoal-850 border border-teal-500/30 flex items-start gap-3.5 shadow-sm">
          <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
          <div className="text-xs text-muted-300 leading-relaxed">
            <strong className="text-white">Professional Authenticity Notice:</strong> No fabricated names, fake emails, or artificial ratings are used on this portfolio. These placeholder slots are pre-configured to showcase real reviews from clients and course attendees as testimonials are finalized.
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-2xl p-6 sm:p-7 border border-white/10 hover:border-teal-500/30 transition-all duration-300 flex flex-col justify-between relative group"
            >
              {/* Card Top */}
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-teal-500/10 border border-teal-500/20 text-teal-400">
                    {item.clientType}
                  </span>
                  
                  {/* Rating Stars */}
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Quote Icon */}
                <Quote className="w-6 h-6 text-teal-500/30 mb-3" />

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              {/* Author & Placeholder Info */}
              <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                {/* Avatar Placeholder */}
                <div className="w-10 h-10 rounded-full bg-charcoal-800 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-teal-400 text-xs">
                  KS
                </div>
                <div>
                  <div className="text-xs font-bold text-white">
                    {item.label}
                  </div>
                  <div className="text-[11px] text-muted-400">
                    {item.clientRole}
                  </div>
                  <div className="text-[10px] text-teal-400/80 font-mono mt-0.5">
                    {item.institution}
                  </div>
                </div>
              </div>

              {/* Watermark Tag */}
              <div className="mt-3 text-[10px] font-mono text-center text-muted-500 bg-charcoal-900/50 py-1 rounded border border-white/5">
                Status: {item.date}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

