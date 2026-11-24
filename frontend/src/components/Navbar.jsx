import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { personalInfo } from '../data/portfolioData';
import userPhoto from '../assets/khan-sher.jpg';
import { 
  Menu, 
  X, 
  Code2, 
  Send, 
  ExternalLink,
  ChevronRight,
  Home
} from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Education', path: '/education' },
  { name: 'Experience', path: '/experience' },
  { name: 'Skills', path: '/skills' },
  { name: 'Projects', path: '/projects' },
  { name: 'Training & Services', path: '/services' },
  { name: 'Testimonials', path: '/testimonials' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-nav py-3.5 shadow-lg shadow-black/30' 
          : 'bg-charcoal-950/80 backdrop-blur-md py-4 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo with Khan Sher's Profile Picture */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <img 
                src={userPhoto} 
                alt="Khan Sher" 
                className="w-10 h-10 rounded-xl object-cover border-2 border-teal-500/40 shadow-glow-teal group-hover:border-teal-400 group-hover:scale-105 transition-all duration-200"
              />
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-teal-400 border-2 border-charcoal-900 rounded-full" />
            </div>

            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-white group-hover:text-teal-400 transition-colors">
                {personalInfo.name}
              </span>
              <span className="text-[11px] text-muted-400 font-mono tracking-wider uppercase -mt-0.5">
                ML & Frontend Dev
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-charcoal-850/80 border border-white/5 rounded-full px-4 py-1.5 backdrop-blur-md">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-200 ${
                    isActive 
                      ? 'text-teal-300 bg-teal-500/15 font-semibold border border-teal-500/30 shadow-sm' 
                      : 'text-muted-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Link 
              to="/contact"
              className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-teal-500 text-charcoal-950 hover:bg-teal-400 transition-all duration-200 shadow-glow-teal hover:shadow-glow-teal-strong hover:-translate-y-0.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Let's Connect</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-charcoal-800 border border-white/10 text-muted-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-teal-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[64px] bg-charcoal-900/95 backdrop-blur-2xl border-b border-white/10 px-5 py-6 shadow-2xl transition-all max-h-[calc(100vh-64px)] overflow-y-auto">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30 font-semibold'
                      : 'text-muted-400 hover:text-white hover:bg-charcoal-800'
                  }`
                }
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </NavLink>
            ))}

            <div className="pt-4 border-t border-white/10 mt-3 flex flex-col gap-2">
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold rounded-lg bg-teal-500 text-charcoal-950 hover:bg-teal-400"
              >
                <Send className="w-4 h-4" />
                <span>Contact Khan Sher</span>
              </Link>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium rounded-lg bg-charcoal-800 text-muted-200 border border-white/10 hover:border-teal-500/30"
              >
                <Code2 className="w-4 h-4 text-teal-400" />
                <span>GitHub Profile</span>
                <ExternalLink className="w-3.5 h-3.5 text-muted-400" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
