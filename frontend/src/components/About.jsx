import React from 'react';
import { Link } from 'react-router-dom';
import { personalInfo } from '../data/portfolioData';
import userPhoto from '../assets/khan-sher.jpg';
import { 
  UserCheck, 
  Target, 
  Code2, 
  BrainCircuit, 
  Palette, 
  GraduationCap, 
  Briefcase, 
  CheckCircle,
  Sparkles,
  MapPin,
  Calendar,
  Send,
  ArrowRight
} from 'lucide-react';

export default function About() {
  const pillars = [
    {
      title: "Machine Learning & AI",
      desc: "Focusing on supervised regression, classification, and exploratory data analysis using Python and Scikit-learn.",
      icon: BrainCircuit,
      highlight: "Python & Scikit-learn"
    },
    {
      title: "Frontend Engineering",
      desc: "Creating responsive, clean, component-driven web interfaces with modern JavaScript, React, and CSS architectures.",
      icon: Code2,
      highlight: "Responsive & Modern"
    },
    {
      title: "Technical Training & Mentorship",
      desc: "Teaching hands-on courses in ML, Frontend, AI Design, and MS Office to empower newcomers in tech.",
      icon: GraduationCap,
      highlight: "4+ Core Domains"
    },
    {
      title: "AI Graphic Design",
      desc: "Harnessing cutting-edge generative AI models and creative prompt engineering for modern visual communication.",
      icon: Palette,
      highlight: "Creative Visuals"
    }
  ];

  return (
    <section id="about" className="py-24 bg-charcoal-900 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono uppercase tracking-widest mb-3">
            <UserCheck className="w-3.5 h-3.5" />
            <span>About Khan Sher</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Bridging Technical Logic with Creative Ingenuity
          </h2>
          <p className="text-teal-400 font-mono text-xs sm:text-sm mt-2 font-medium tracking-wide">
            Machine Learning Developer • Frontend Developer • AI Graphic Designer
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-teal-700 rounded-full mt-4" />
        </div>

        {/* Profile Card & Bio Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* User Photo Spotlight Card */}
          <div className="lg:col-span-5">
            <div className="relative max-w-sm mx-auto">
              <div className="absolute -inset-1 rounded-3xl bg-teal-500/20 blur-xl opacity-75" />
              <div className="relative rounded-3xl bg-charcoal-850 border border-teal-500/30 p-5 shadow-2xl overflow-hidden">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-charcoal-900 border border-white/10 mb-4 relative">
                  <img 
                    src={userPhoto} 
                    alt="Khan Sher" 
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <span className="px-2.5 py-1 rounded-md bg-teal-500/20 border border-teal-500/30 text-teal-300 text-[11px] font-mono">
                      Active Student & Instructor
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-left font-mono text-xs">
                  <div className="flex items-center justify-between text-muted-300 pb-2 border-b border-white/5">
                    <span className="text-muted-500 uppercase">Degree:</span>
                    <span className="text-white font-sans font-semibold">BSCS (2023–2027)</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-300 pb-2 border-b border-white/5">
                    <span className="text-muted-500 uppercase">University:</span>
                    <span className="text-teal-400">Bacha Khan University</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-300 pb-2 border-b border-white/5">
                    <span className="text-muted-500 uppercase">Experience:</span>
                    <span className="text-white font-sans">~1 Year Practical</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-300">
                    <span className="text-muted-500 uppercase">Location:</span>
                    <span className="text-slate-200">Charsadda, KP, Pakistan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Biography Narrative */}
          <div className="lg:col-span-7 space-y-6 text-muted-400 leading-relaxed text-base text-left">
            <p className="text-lg text-slate-200 font-medium">
              I am a dedicated Computer Science student and aspiring Machine Learning Developer with an interest in Artificial Intelligence, Deep Learning, frontend web engineering, and AI-powered graphic design.
            </p>
            
            <p>
              Over the past year, I have built approximately one year of practical experience working on different projects and collaborating with clients. Rather than relying solely on theoretical principles, I enjoy initiating, developing, and deploying practical projects that solve real-world problems.
            </p>

            <p>
              Alongside engineering, I have a passion for pedagogy. I regularly conduct online technical training and lead courses covering Machine Learning, Frontend Development, AI-Assisted Graphic Design, and Microsoft Office tools for academic and business productivity.
            </p>

            {/* Core Values checklist */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Pragmatic, clean-code developer mindset",
                "Rigorous academic CS foundation (BSCS)",
                "Transparent project deliverables & metrics",
                "Clear, empathetic technical communication",
                "Experienced online instructor & trainer",
                "Continuous explorer of modern LLM APIs"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-300 font-mono">
                  <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Quick Contact & Action row */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-xl bg-teal-500 text-charcoal-950 hover:bg-teal-400 transition-colors shadow-glow-teal"
              >
                <span>Discuss a Collaboration</span>
                <Send className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/education"
                className="inline-flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-xl bg-charcoal-800 text-muted-200 border border-white/10 hover:border-teal-500/30 transition-colors"
              >
                <GraduationCap className="w-3.5 h-3.5 text-teal-400" />
                <span>View Education Roadmap</span>
              </Link>
            </div>
          </div>

        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-charcoal-850/80 border border-white/5 hover:border-teal-500/30 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-teal-400 mb-1">
                  {pillar.highlight}
                </div>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-muted-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
