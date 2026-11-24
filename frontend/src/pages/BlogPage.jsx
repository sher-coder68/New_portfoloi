import React from 'react';
import Blog from '../components/Blog';
import { BookOpen } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="pt-24 min-h-screen">
      <div className="bg-charcoal-950 py-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono uppercase tracking-widest mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Articles & Guides</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Blog & Technical Notes
          </h1>
          <p className="text-muted-400 text-sm sm:text-base max-w-2xl mx-auto mt-3">
            Sample article previews covering Machine Learning, Deep Learning, Python foundations, LLM integrations, and modern frontend best practices.
          </p>
        </div>
      </div>
      <Blog />
    </div>
  );
}

