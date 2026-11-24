import React from 'react';
import { Link } from 'react-router-dom';
import { personalInfo } from '../data/portfolioData';
import userPhoto from '../assets/khan-sher.jpg';
import { 
  ArrowUp, 
  Mail, 
  Phone, 
  Heart, 
  Code2, 
  BrainCircuit, 
  Sparkles, 
  ExternalLink 
} from 'lucide-react';
import { GithubIcon, WhatsappIcon } from './Icons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-950 border-t border-white/10 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4 text-left">
            <Link to="/" className="flex items-center gap-3 group inline-flex">
              <img 
                src={userPhoto} 
                alt="Khan Sher" 
                className="w-10 h-10 rounded-xl object-cover border-2 border-teal-500/40 shadow-glow-teal group-hover:scale-105 transition-transform"
              />
              <div>
                <span className="font-bold text-lg text-white group-hover:text-teal-400 transition-colors">
                  {personalInfo.name}
                </span>
                <div className="text-[11px] font-mono text-muted-400">
                  ML Developer & Frontend Engineer
                </div>
              </div>
            </Link>

            <p className="text-xs text-muted-400 leading-relaxed max-w-sm">
              Machine Learning Developer, Frontend Developer, and AI-Assisted Graphic Designer. Computer Science undergraduate at Bacha Khan University (2023–2027) building practical, real-world solutions.
            </p>

            <div className="inline-flex items-center gap-2 text-xs font-mono text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              <span>{personalInfo.status}</span>
            </div>
          </div>

          {/* Quick Nav Anchors */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4 text-xs font-medium text-left">
            <div>
              <div className="font-mono uppercase text-muted-400 text-[11px] mb-3">Pages</div>
              <ul className="space-y-2 text-muted-400">
                <li><Link to="/" className="hover:text-teal-400 transition-colors">Home</Link></li>
                <li><Link to="/about" className="hover:text-teal-400 transition-colors">About Me</Link></li>
                <li><Link to="/education" className="hover:text-teal-400 transition-colors">Education (BSCS)</Link></li>
                <li><Link to="/experience" className="hover:text-teal-400 transition-colors">Experience (~1 Year)</Link></li>
                <li><Link to="/skills" className="hover:text-teal-400 transition-colors">Technical Skills</Link></li>
              </ul>
            </div>

            <div>
              <div className="font-mono uppercase text-muted-400 text-[11px] mb-3">Showcase & Info</div>
              <ul className="space-y-2 text-muted-400">
                <li><Link to="/projects" className="hover:text-teal-400 transition-colors">Featured Projects</Link></li>
                <li><Link to="/services" className="hover:text-teal-400 transition-colors">Training & Courses</Link></li>
                <li><Link to="/testimonials" className="hover:text-teal-400 transition-colors">Client Testimonials</Link></li>
                <li><Link to="/blog" className="hover:text-teal-400 transition-colors">Blog & Guides</Link></li>
                <li><Link to="/contact" className="hover:text-teal-400 transition-colors">Contact Form</Link></li>
                <li><Link to="/admin/login" className="hover:text-teal-400 transition-colors text-teal-400/80">Admin Portal</Link></li>
              </ul>
            </div>
          </div>

          {/* Connect & Back to Top */}
          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end">
            <div>
              <div className="font-mono uppercase text-muted-400 text-[11px] mb-3 md:text-right">
                Connect Directly
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-charcoal-850 border border-white/10 text-muted-400 hover:text-white hover:border-teal-500/40 transition-colors"
                  title="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="p-2.5 rounded-xl bg-charcoal-850 border border-white/10 text-muted-400 hover:text-teal-300 hover:border-teal-500/40 transition-colors"
                  title="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-charcoal-850 border border-white/10 text-muted-400 hover:text-emerald-300 hover:border-teal-500/40 transition-colors"
                  title="WhatsApp"
                >
                  <WhatsappIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="mt-6 md:mt-0 inline-flex items-center gap-1.5 text-xs font-mono text-muted-400 hover:text-teal-300 p-2.5 rounded-xl bg-charcoal-850 border border-white/5 hover:border-teal-500/30 transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-400 font-mono">
          <div>
            © {currentYear} {personalInfo.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Bacha Khan University Undergraduate • ML & Frontend Developer</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
