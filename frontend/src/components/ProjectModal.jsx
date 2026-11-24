import React from 'react';
import { GithubIcon } from './Icons';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  Code2, 
  AlertCircle,
  Layers,
  Sparkles
} from 'lucide-react';

export default function ProjectModal({ project, onClose, onPlaceholderClick }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-charcoal-950/80 backdrop-blur-md overflow-y-auto">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-2xl bg-charcoal-850 border border-teal-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden my-8 animate-fade-in"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-charcoal-900 border border-white/10 text-muted-400 hover:text-white hover:border-teal-500/40 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pr-12 mb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono mb-2">
            <span>{project.badge}</span>
            <span>•</span>
            <span>{project.category}</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            {project.title}
          </h3>
          <p className="text-muted-400 text-sm mt-2">
            {project.shortDescription}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-charcoal-900/90 border border-white/10 mb-6">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="text-left">
              <div className="text-[10px] font-mono uppercase text-muted-400">{m.label}</div>
              <div className="text-xs font-bold text-white font-mono mt-0.5">{m.value}</div>
            </div>
          ))}
        </div>

        {/* In-depth Overview */}
        <div className="mb-6">
          <h4 className="text-xs font-mono uppercase tracking-wider text-teal-400 mb-2">
            Architecture & Methodology
          </h4>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {project.fullDescription}
          </p>
        </div>

        {/* Tech Stack Badges */}
        <div className="mb-6">
          <h4 className="text-xs font-mono uppercase tracking-wider text-muted-400 mb-2">
            Technologies Applied
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="text-xs font-mono px-2.5 py-1 rounded-lg bg-charcoal-900 border border-white/10 text-teal-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Transparent Placeholder Notice */}
        <div className="p-3.5 rounded-xl bg-teal-500/10 border border-teal-500/20 mb-6 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
          <p className="text-xs text-muted-300 leading-normal">
            <span className="font-semibold text-teal-300">Verified Placeholder:</span> GitHub repository & live demo links are placeholder endpoints. Source code and deployment will be attached as repositories transition from private review to public release.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={() => onPlaceholderClick('GitHub Repository', project.title)}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-charcoal-900 border border-white/10 hover:border-teal-500/40 text-xs font-medium text-white transition-colors"
          >
            <GithubIcon className="w-4 h-4 text-teal-400" />
            <span>GitHub (Placeholder)</span>
          </button>

          <button
            type="button"
            onClick={() => onPlaceholderClick('Live Demo', project.title)}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-500 text-charcoal-950 hover:bg-teal-400 text-xs font-bold transition-colors shadow-glow-teal"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Demo (Placeholder)</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="ml-auto text-xs font-medium text-muted-400 hover:text-white py-2 px-3"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
