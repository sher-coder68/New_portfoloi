import React from 'react';
import Education from '../components/Education';
import { GraduationCap } from 'lucide-react';

export default function EducationPage() {
  return (
    <div className="pt-24 min-h-screen">
      <div className="bg-charcoal-950 py-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono uppercase tracking-widest mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Qualifications</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Education & University Studies
          </h1>
          <p className="text-muted-400 text-sm sm:text-base max-w-2xl mx-auto mt-3">
            Bachelor of Science in Computer Science (BSCS) at Bacha Khan University (2023–2027).
          </p>
        </div>
      </div>
      <Education />
    </div>
  );
}

