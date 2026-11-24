import React from 'react';
import { servicesData } from '../data/portfolioData';
import { 
  BrainCircuit, 
  Layout, 
  GraduationCap, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  BookOpen,
  Send
} from 'lucide-react';

export default function Services() {
  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'BrainCircuit':
        return BrainCircuit;
      case 'Layout':
        return Layout;
      case 'GraduationCap':
        return GraduationCap;
      case 'Sparkles':
        return Sparkles;
      default:
        return BookOpen;
    }
  };

  const coursesOffered = [
    { title: "Machine Learning Foundations", desc: "Python, Scikit-learn, regression & classification pipelines." },
    { title: "Frontend Web Development", desc: "HTML5, modern CSS/Tailwind, JavaScript ES6+, responsive design." },
    { title: "AI-Assisted Graphic Design", desc: "Generative AI engines, prompt workflows, and digital graphics." },
    { title: "Microsoft Office Productivity", desc: "Advanced Word, Excel data analysis, and professional PowerPoint." }
  ];

  return (
    <section id="services" className="py-24 bg-charcoal-950 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono uppercase tracking-widest mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Services & Training</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical Offerings & Online Training
          </h2>
          <p className="text-muted-400 text-sm sm:text-base max-w-2xl mt-3">
            Bridging end-to-end development with hands-on coaching across machine learning, web engineering, and creative AI workflows.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-teal-700 rounded-full mt-4" />
        </div>

        {/* 4 Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {servicesData.map((service) => {
            const Icon = getServiceIcon(service.iconName);
            return (
              <div 
                key={service.id}
                className="glass-card rounded-2xl p-7 sm:p-8 border border-white/10 hover:border-teal-500/40 transition-all duration-300 flex flex-col justify-between group shadow-card"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-400 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Deliverables List */}
                  <div className="space-y-2.5 border-t border-white/5 pt-5">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-muted-400 mb-2">
                      Key Deliverables & Topics:
                    </div>
                    {service.deliverables.map((del, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-normal">
                        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between">
                  <a
                    href="#contact"
                    className="text-xs font-semibold text-teal-400 hover:text-teal-300 inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>Inquire About This Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <span className="text-[10px] font-mono text-muted-500 uppercase">Available</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Specialized Training Cohort Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-charcoal-850 via-charcoal-800 to-charcoal-850 border border-teal-500/30 p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-mono mb-3">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Online Mentorship & Courses</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
                Looking for 1-on-1 or Cohort Training?
              </h3>
              <p className="text-muted-300 text-xs sm:text-sm leading-relaxed mb-6">
                I help students, aspiring developers, and professionals build real-world confidence in Machine Learning, Frontend Web Development, Creative AI Prompts, and Microsoft Office tools through practical exercises.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {coursesOffered.map((c, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-charcoal-900/80 border border-white/5">
                    <div className="text-xs font-bold text-white mb-0.5">{c.title}</div>
                    <div className="text-[11px] text-muted-400">{c.desc}</div>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500 text-charcoal-950 font-bold text-xs hover:bg-teal-400 transition-colors shadow-glow-teal"
              >
                <Send className="w-4 h-4" />
                <span>Book a Training Consultation</span>
              </a>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-xl bg-charcoal-900/60 border border-white/10 text-center">
              <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center mb-4">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div className="text-white font-bold text-base mb-1">
                Khan Sher's Teaching Philosophy
              </div>
              <p className="text-xs text-muted-400 leading-relaxed max-w-xs">
                "Real understanding comes from building things that work—starting with simple intuition and turning it into working code."
              </p>
              <div className="mt-4 pt-4 border-t border-white/5 w-full text-[11px] font-mono text-teal-400">
                Online Remote / Google Meet / Zoom
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

