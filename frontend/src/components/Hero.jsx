import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { personalInfo } from '../data/portfolioData';
import userPhoto from '../assets/khan-sher.jpg';
import { 
  ArrowRight, 
  Send, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Terminal, 
  BrainCircuit, 
  Code2, 
  Palette,
  Sparkles,
  Layers,
  GraduationCap,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { GithubIcon, WhatsappIcon } from './Icons';

export default function Hero() {
  const [activeTitleIndex, setActiveTitleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTitleIndex((prev) => (prev + 1) % personalInfo.titles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-radial-vignette">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Decorative Subtle Glowing Orbs */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-teal-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-[350px] h-[350px] bg-teal-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Introduction & Primary CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal-850 border border-teal-500/30 text-teal-300 text-xs font-mono mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span>Available for Client Projects & Tech Training</span>
            </div>

            {/* Name Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              Hi, I'm <span className="text-gradient-teal">{personalInfo.name}</span>
            </h1>

            {/* Rotating Professional Titles */}
            <div className="h-10 sm:h-12 flex items-center mb-6">
              <span className="text-xl sm:text-2xl font-semibold text-muted-200 mr-2">I am an</span>
              <span 
                key={activeTitleIndex}
                className="text-xl sm:text-2xl font-bold font-mono text-teal-400 underline decoration-teal-500/40 decoration-2 underline-offset-4 animate-fade-in"
              >
                {personalInfo.titles[activeTitleIndex]}
              </span>
            </div>

            {/* Concise Value Proposition */}
            <p className="text-base sm:text-lg text-muted-400 max-w-2xl leading-relaxed mb-8">
              {personalInfo.aboutShort}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <Link
                to="/projects"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-teal-500 text-charcoal-950 font-bold text-sm hover:bg-teal-400 transition-all duration-200 shadow-glow-teal hover:shadow-glow-teal-strong hover:-translate-y-0.5 group"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/contact"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-charcoal-850 text-slate-100 font-semibold text-sm border border-white/10 hover:border-teal-500/40 hover:bg-charcoal-800 transition-all duration-200 hover:-translate-y-0.5"
              >
                <Send className="w-4 h-4 text-teal-400" />
                <span>Contact Me</span>
              </Link>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 w-full max-w-xl">
              <div>
                <div className="text-2xl font-extrabold text-white font-mono flex items-center gap-1">
                  ~1 <span className="text-teal-400 text-lg">Year</span>
                </div>
                <div className="text-xs text-muted-400 mt-0.5">Practical Experience</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-white font-mono flex items-center gap-1">
                  BSCS <span className="text-teal-400 text-xs uppercase px-1.5 py-0.5 rounded bg-teal-500/10 border border-teal-500/20">23-27</span>
                </div>
                <div className="text-xs text-muted-400 mt-0.5">Bacha Khan University</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-white font-mono flex items-center gap-1">
                  4+ <span className="text-teal-400 text-lg">Courses</span>
                </div>
                <div className="text-xs text-muted-400 mt-0.5">Taught & Mentored</div>
              </div>
            </div>

            {/* Direct Channels */}
            <div className="flex items-center gap-3 mt-6">
              <span className="text-xs font-mono text-muted-500 uppercase tracking-wider">Connect:</span>
              <a 
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-charcoal-850 border border-white/10 text-muted-400 hover:text-white hover:border-teal-500/40 transition-colors"
                title="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a 
                href={`mailto:${personalInfo.email}`}
                className="p-2.5 rounded-lg bg-charcoal-850 border border-white/10 text-muted-400 hover:text-teal-300 hover:border-teal-500/40 transition-colors"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a 
                href={personalInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-charcoal-850 border border-white/10 text-muted-400 hover:text-teal-300 hover:border-teal-500/40 transition-colors"
                title="Chat on WhatsApp"
              >
                <WhatsappIcon className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Right Column: Visual Portrait & Developer Persona Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md w-full">
              
              {/* Outer Glow Halo */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-teal-500/20 via-teal-500/10 to-teal-500/20 blur-xl opacity-80" />

              {/* Main Card with Real User Photo */}
              <div className="relative rounded-3xl bg-charcoal-850/90 border border-white/10 p-6 shadow-2xl backdrop-blur-xl">
                
                {/* Header Window Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-muted-400">
                    <Terminal className="w-3.5 h-3.5 text-teal-400" />
                    <span>khan-sher-developer.py</span>
                  </div>
                  <span className="text-[10px] font-mono text-teal-400/80 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                    Verified
                  </span>
                </div>

                {/* Profile Portrait Showcase */}
                <div className="relative mb-5 group">
                  <div className="overflow-hidden rounded-2xl border-2 border-teal-500/30 bg-charcoal-900 aspect-[4/3] flex items-center justify-center relative">
                    <img 
                      src={userPhoto} 
                      alt="Khan Sher - Machine Learning & Frontend Developer" 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Bottom overlay in image */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <div className="text-left">
                        <div className="text-white font-bold text-sm leading-tight drop-shadow-md">
                          Khan Sher
                        </div>
                        <div className="text-teal-300 font-mono text-[11px] drop-shadow-md">
                          Bacha Khan University
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-charcoal-900/90 border border-teal-500/40 text-[10px] font-mono text-teal-300">
                        BSCS (23-27)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Developer Persona Stack */}
                <div className="space-y-3 font-mono text-xs">
                  
                  {/* ML Badge Card */}
                  <div className="p-3 rounded-xl bg-charcoal-900/80 border border-teal-500/20 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 shrink-0">
                      <BrainCircuit className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-semibold text-xs flex items-center justify-between">
                        <span>Machine Learning Core</span>
                        <span className="text-[10px] text-teal-400">Scikit-learn</span>
                      </div>
                    </div>
                  </div>

                  {/* Frontend Badge Card */}
                  <div className="p-3 rounded-xl bg-charcoal-900/80 border border-white/10 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 shrink-0">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-semibold text-xs flex items-center justify-between">
                        <span>Frontend Engineering</span>
                        <span className="text-[10px] text-teal-400">React • Tailwind</span>
                      </div>
                    </div>
                  </div>

                  {/* AI Graphic Design Card */}
                  <div className="p-3 rounded-xl bg-charcoal-900/80 border border-white/10 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 shrink-0">
                      <Palette className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-semibold text-xs flex items-center justify-between">
                        <span>AI Graphic Design</span>
                        <span className="text-[10px] text-teal-400">Creative Gen</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Code-like Footer Status */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-muted-400">
                  <div className="flex items-center gap-1.5 text-teal-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                    <span>Real-World Tested</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-teal-400" />
                    <span>KP, Pakistan</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
