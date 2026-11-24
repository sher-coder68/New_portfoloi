import React, { useState } from 'react';
import { projectsData } from '../data/portfolioData';
import ProjectModal from './ProjectModal';
import { GithubIcon } from './Icons';
import { 
  FolderGit2, 
  ExternalLink, 
  ArrowUpRight, 
  Filter, 
  BrainCircuit, 
  Code2, 
  Sparkles,
  CheckCircle2,
  Info
} from 'lucide-react';

export default function Projects() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [placeholderToast, setPlaceholderToast] = useState(null);

  const filters = ['All', 'Machine Learning', 'Frontend Development'];

  const filteredProjects = selectedFilter === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedFilter);

  const handlePlaceholderClick = (type, projectTitle) => {
    setPlaceholderToast({
      title: `${type} Placeholder`,
      message: `The ${type.toLowerCase()} for "${projectTitle}" is currently set to placeholder status as requested. The public repository will be linked upon completion.`
    });

    setTimeout(() => {
      setPlaceholderToast(null);
    }, 4500);
  };

  return (
    <section id="projects" className="py-24 bg-charcoal-900 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono uppercase tracking-widest mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Portfolio Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured Projects & Implementations
          </h2>
          <p className="text-muted-400 text-sm sm:text-base max-w-2xl mt-3">
            Real implementations solving academic prediction, market valuation, and institutional web management challenges.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-teal-700 rounded-full mt-4" />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                selectedFilter === filter
                  ? 'bg-teal-500 text-charcoal-950 font-bold shadow-glow-teal'
                  : 'bg-charcoal-850 text-muted-300 hover:text-white border border-white/5 hover:border-teal-500/30'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-2xl flex flex-col justify-between border border-white/10 hover:border-teal-500/40 transition-all duration-300 shadow-card hover:-translate-y-1.5 group"
            >
              {/* Card Top */}
              <div className="p-6 sm:p-7">
                
                {/* Header Tag & Category */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2.5 py-0.5 rounded-md">
                    {project.badge}
                  </span>
                  <span className="text-[10px] font-mono text-muted-400">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-teal-300 transition-colors">
                  {project.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-muted-400 leading-relaxed mb-6">
                  {project.shortDescription}
                </p>

                {/* Metrics Preview */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-charcoal-900/80 border border-white/5 mb-6">
                  {project.metrics.slice(0, 2).map((m, mIdx) => (
                    <div key={mIdx}>
                      <div className="text-[10px] font-mono text-muted-400 uppercase">{m.label}</div>
                      <div className="text-xs font-mono font-semibold text-slate-200 truncate">{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-charcoal-900 border border-white/5 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-[11px] font-mono px-1.5 py-0.5 text-muted-500">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModalProject(project)}
                  className="text-xs font-semibold text-teal-400 hover:text-teal-300 inline-flex items-center gap-1 py-2"
                >
                  <span>View Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handlePlaceholderClick('GitHub Repository', project.title)}
                    className="p-2 rounded-lg bg-charcoal-850 border border-white/10 text-muted-400 hover:text-white hover:border-teal-500/30 transition-colors"
                    title="GitHub Placeholder Link"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePlaceholderClick('Live Demo', project.title)}
                    className="p-2 rounded-lg bg-charcoal-850 border border-white/10 text-muted-400 hover:text-teal-300 hover:border-teal-500/30 transition-colors"
                    title="Demo Placeholder Link"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Modal for In-depth Project Details */}
        {activeModalProject && (
          <ProjectModal
            project={activeModalProject}
            onClose={() => setActiveModalProject(null)}
            onPlaceholderClick={handlePlaceholderClick}
          />
        )}

        {/* Interactive Toast for Placeholders */}
        {placeholderToast && (
          <div className="fixed bottom-6 right-6 z-50 max-w-sm p-4 rounded-xl bg-charcoal-850 border border-teal-500/40 shadow-2xl backdrop-blur-xl animate-fade-in flex items-start gap-3">
            <Info className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white">{placeholderToast.title}</div>
              <div className="text-xs text-muted-300 mt-1 leading-normal">{placeholderToast.message}</div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
