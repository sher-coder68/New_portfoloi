import React from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Tag, 
  BookOpen, 
  Share2, 
  Info,
  CheckCircle2
} from 'lucide-react';

export default function BlogModal({ article, onClose }) {
  if (!article) return null;

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

        {/* Demo Content Badge */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Demo Article Preview • {article.category}</span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white tracking-tight mb-4 pr-10">
          {article.title}
        </h3>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-400 pb-5 border-b border-white/10 mb-6">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-teal-400" />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-teal-400" />
            <span>{article.readTime}</span>
          </div>
          <div className="text-teal-400 font-sans">
            Author: Khan Sher
          </div>
        </div>

        {/* Summary Lead */}
        <div className="p-4 rounded-xl bg-charcoal-900/80 border-l-2 border-teal-500 mb-6">
          <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
            {article.summary}
          </p>
        </div>

        {/* Full Article Content Paragraphs */}
        <div className="space-y-4 text-xs sm:text-sm text-muted-300 leading-relaxed mb-6">
          {article.fullContent.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Topic Tags */}
        <div className="pt-4 border-t border-white/10 mb-6">
          <div className="text-[11px] font-mono uppercase text-muted-400 mb-2 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-teal-400" />
            <span>Related Topics:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="text-xs font-mono px-2.5 py-1 rounded-md bg-charcoal-900 border border-white/10 text-teal-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Demo Content Disclaimer Notice */}
        <div className="p-3 rounded-xl bg-charcoal-900 border border-white/5 flex items-start gap-2.5 text-[11px] text-muted-400 mb-6">
          <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
          <span>
            This article preview is structured demo content designed to showcase the blog UI. Individual full-length publications will be published here with code snippets and interactive demos.
          </span>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-teal-500 text-charcoal-950 font-bold text-xs hover:bg-teal-400 transition-colors shadow-glow-teal"
          >
            Close Preview
          </button>
        </div>

      </div>
    </div>
  );
}

