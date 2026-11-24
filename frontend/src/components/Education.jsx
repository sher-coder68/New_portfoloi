import React from 'react';
import { educationData } from '../data/portfolioData';
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  BookOpen, 
  CheckCircle2, 
  Award,
  Sparkles
} from 'lucide-react';

export default function Education() {
  const edu = educationData[0];

  const milestones = [
    { year: "2023", title: "Commenced BSCS Program", detail: "Enrolled at Bacha Khan University with focus on computational fundamentals and programming logic." },
    { year: "2024", title: "Algorithms & Machine Learning Foundations", detail: "Deep dive into Data Structures, Discrete Math, Scikit-learn, and predictive regression pipelines." },
    { year: "2025–2026", title: "Advanced Computing & AI Integration", detail: "Operating systems, databases, distributed cloud systems, and applied deep learning models." },
    { year: "2027", title: "Final Capstone & Graduation", detail: "Completion of Bachelor of Science in Computer Science with real-world ML capstone research." }
  ];

  return (
    <section id="education" className="py-24 bg-charcoal-950 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono uppercase tracking-widest mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education & Academic Roadmap
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-teal-700 rounded-full mt-4" />
        </div>

        {/* Main Education Showcase Card */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl p-6 sm:p-8 md:p-10 border border-white/10 hover:border-teal-500/30 transition-all shadow-subtle relative overflow-hidden">
            
            {/* Top Badge & Status */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {edu.degree}
                  </h3>
                  <div className="text-teal-400 font-semibold text-sm">
                    {edu.institution}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                  <span>{edu.status}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-400 mt-2 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-teal-400" />
                  <span>{edu.duration}</span>
                  <span className="text-white/20">•</span>
                  <MapPin className="w-3.5 h-3.5 text-teal-400" />
                  <span>{edu.location}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-300 text-sm sm:text-base leading-relaxed my-6">
              {edu.description}
            </p>

            {/* Key Curriculum Pillars */}
            <div className="mb-8">
              <h4 className="text-xs font-mono uppercase tracking-wider text-muted-400 mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-teal-400" />
                <span>Key Academic Competencies & Study Modules</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {edu.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-charcoal-900/60 border border-white/5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4-Year Academic Progression Roadmap */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-muted-400 mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-teal-400" />
                <span>Degree Progression Timeline (2023 – 2027)</span>
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {milestones.map((m, idx) => (
                  <div 
                    key={idx} 
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      idx === 1 
                        ? 'bg-teal-500/10 border-teal-500/40 shadow-glow-teal' 
                        : idx === 0 
                        ? 'bg-charcoal-900/80 border-white/10' 
                        : 'bg-charcoal-900/40 border-white/5 opacity-80'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-mono font-bold text-teal-400">{m.year}</span>
                      {idx <= 1 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-teal-500/20 text-teal-300">
                          {idx === 1 ? 'Current' : 'Completed'}
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-bold text-white mb-1">{m.title}</div>
                    <div className="text-[11px] text-muted-400 leading-snug">{m.detail}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

