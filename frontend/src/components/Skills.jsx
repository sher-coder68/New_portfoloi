import React, { useState } from 'react';
import { skillsData } from '../data/portfolioData';
import { 
  Code2, 
  BrainCircuit, 
  Cloud, 
  Palette, 
  Terminal, 
  Cpu, 
  Sparkles, 
  Layers, 
  CheckCircle,
  Flame,
  Globe,
  Database,
  Box,
  Server,
  Wand2
} from 'lucide-react';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories', icon: Layers },
    { id: 'programming', name: 'Programming & Dev', icon: Code2 },
    { id: 'aiMl', name: 'AI & Machine Learning', icon: BrainCircuit },
    { id: 'cloudDevOps', name: 'Cloud & DevOps', icon: Cloud },
    { id: 'creative', name: 'Creative & AI Design', icon: Palette },
  ];

  const getSkillIcon = (skillName) => {
    switch (skillName) {
      case 'Python':
        return Terminal;
      case 'JavaScript':
        return Code2;
      case 'Ruby on Rails':
        return Server;
      case 'HTML5 / CSS3':
        return Globe;
      case 'Machine Learning':
        return BrainCircuit;
      case 'Deep Learning':
        return Cpu;
      case 'OpenAI API':
      case 'Anthropic API':
      case 'Google Gemini API':
      case 'LLM Integrations':
        return Sparkles;
      case 'Open-Source LLM Deployment':
        return Database;
      case 'Docker':
      case 'Kubernetes':
        return Box;
      case 'AWS':
      case 'Microsoft Azure':
      case 'Google Cloud Platform (GCP)':
        return Cloud;
      case 'AI-Assisted Graphic Design':
      case 'AI Image Generation':
      case 'Creative Design Workflows':
        return Wand2;
      default:
        return CheckCircle;
    }
  };

  const getTierColor = (level) => {
    switch (level) {
      case 'Primary Language':
      case 'Core Language':
      case 'Intermediate':
        return 'text-teal-300 bg-teal-500/15 border-teal-500/30';
      case 'Integration':
      case 'Applied':
      case 'Advanced Workflow':
        return 'text-sky-300 bg-sky-500/15 border-sky-500/30';
      default:
        return 'text-slate-300 bg-slate-800 border-white/10';
    }
  };

  const activeCategoriesList = activeCategory === 'all' 
    ? Object.keys(skillsData) 
    : [activeCategory];

  return (
    <section id="skills" className="py-24 bg-charcoal-950 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Curated Skills & Technologies
          </h2>
          <p className="text-muted-400 text-sm sm:text-base max-w-2xl mt-3">
            Grounded in core fundamentals without inflated percentage bars. Each technology represents applied knowledge and real-world project usage.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-teal-700 rounded-full mt-4" />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                  isSelected
                    ? 'bg-teal-500 text-charcoal-950 font-bold shadow-glow-teal -translate-y-0.5'
                    : 'bg-charcoal-850 text-muted-300 hover:text-white border border-white/5 hover:border-teal-500/30'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Categories Grid */}
        <div className="space-y-10">
          {activeCategoriesList.map((catKey) => {
            const categoryObj = skillsData[catKey];
            if (!categoryObj) return null;

            return (
              <div 
                key={catKey}
                className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden"
              >
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-white/10 mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
                      <span>{categoryObj.title}</span>
                    </h3>
                    <p className="text-xs text-muted-400 mt-1">
                      {categoryObj.description}
                    </p>
                  </div>
                  <div className="text-[11px] font-mono text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded border border-teal-500/20 self-start sm:self-auto">
                    {categoryObj.skills.length} Competencies
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {categoryObj.skills.map((skill, sIdx) => {
                    const SkillIcon = getSkillIcon(skill.name);
                    const tierBadgeStyle = getTierColor(skill.level);

                    return (
                      <div
                        key={sIdx}
                        className="p-4 rounded-xl bg-charcoal-900/80 border border-white/5 hover:border-teal-500/40 transition-all duration-200 hover:-translate-y-0.5 group flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400 group-hover:bg-teal-500/20 transition-colors">
                                <SkillIcon className="w-4 h-4" />
                              </div>
                              <span className="font-bold text-sm text-white group-hover:text-teal-300 transition-colors">
                                {skill.name}
                              </span>
                            </div>
                          </div>

                          <p className="text-[11px] text-muted-400 leading-snug mt-2">
                            {skill.note}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                          <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-md border ${tierBadgeStyle}`}>
                            {skill.level}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 opacity-60 group-hover:opacity-100" />
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

