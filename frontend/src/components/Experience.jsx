import React from 'react';
import { experienceData } from '../data/portfolioData';
import { 
  Briefcase, 
  Calendar, 
  CheckCircle2, 
  Layers, 
  Code2, 
  GraduationCap, 
  Search,
  Sparkles
} from 'lucide-react';

export default function Experience() {
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Development':
        return Code2;
      case 'Training & Education':
        return GraduationCap;
      default:
        return Search;
    }
  };

  return (
    <section id="experience" className="py-24 bg-charcoal-900 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Practical Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Approximately 1 Year of Real-World Work & Teaching
          </h2>
          <p className="text-muted-400 text-sm sm:text-base max-w-2xl mt-3">
            Honest, verified practical involvement spanning client web delivery, machine learning experiments, and instructional training.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-teal-700 rounded-full mt-4" />
        </div>

        {/* Experience Timeline Grid */}
        <div className="max-w-4xl mx-auto space-y-8 relative">
          
          {/* Subtle vertical spine line */}
          <div className="hidden md:block absolute left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-teal-500/40 via-white/10 to-transparent" />

          {experienceData.map((item, index) => {
            const Icon = getCategoryIcon(item.category);
            return (
              <div 
                key={index}
                className="relative flex flex-col md:flex-row items-start gap-6 group"
              >
                {/* Timeline node icon */}
                <div className="hidden md:flex w-16 h-16 rounded-2xl bg-charcoal-850 border border-teal-500/30 text-teal-400 items-center justify-center shrink-0 z-10 shadow-lg group-hover:scale-110 group-hover:border-teal-400 transition-all">
                  <Icon className="w-7 h-7" />
                </div>

                {/* Experience Card */}
                <div className="flex-1 w-full glass-card rounded-2xl p-6 sm:p-7 border border-white/10 hover:border-teal-500/40 transition-all duration-300 shadow-card">
                  
                  {/* Role Header */}
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-xs font-mono text-teal-400 uppercase tracking-wider mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                        <span>{item.category}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-teal-300 transition-colors">
                        {item.role}
                      </h3>
                      <div className="text-sm font-medium text-muted-300">
                        {item.organization}
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-charcoal-900 border border-white/10 text-xs font-mono text-muted-400">
                      <Calendar className="w-3.5 h-3.5 text-teal-400" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-muted-400 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="space-y-2 border-t border-white/5 pt-4">
                    {item.points.map((point, ptIdx) => (
                      <div key={ptIdx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-normal">
                        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

