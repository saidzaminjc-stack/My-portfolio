import React, { useState } from 'react';
import { 
  ExternalLink, 
  BookOpen, 
  ArrowRight, 
  Sparkles
} from 'lucide-react';
import { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onOpenOrderModal: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({
  projects,
  onSelectProject,
  onOpenOrderModal
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  // Filter categories as explicitly requested: All | Websites | E-Commerce | Web Apps | WordPress
  const filterTabs = [
    { label: 'All', value: 'All' },
    { label: 'Websites', value: 'Websites' },
    { label: 'E-Commerce', value: 'E-Commerce' },
    { label: 'Web Apps', value: 'Web Apps' },
    { label: 'WordPress', value: 'WordPress' }
  ];

  const filteredProjects = projects.filter((project) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Websites') {
      return project.category === 'Business' || project.category === 'Landing Page' || project.category === 'Portfolio';
    }
    if (selectedFilter === 'E-Commerce') {
      return project.category === 'E-Commerce';
    }
    if (selectedFilter === 'Web Apps') {
      return project.category === 'Web Application';
    }
    if (selectedFilter === 'WordPress') {
      return project.category === 'WordPress';
    }
    return true;
  });

  return (
    <section id="projects" className="py-24 lg:py-32 relative bg-[#0A0A0A] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Editorial Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-emerald-500"></span>
            <span className="text-emerald-500 text-[11px] uppercase tracking-[0.25em] font-semibold">
              Featured Archive
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            SELECTED WORKS & <span className="italic font-serif normal-case font-normal text-white/90">Case Studies</span>
          </h2>
          <p className="mt-4 text-base text-white/50 max-w-2xl leading-relaxed">
            Explore a curated selection of live production websites, custom e-commerce stores, and high-performance web applications.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              id={`project-filter-${tab.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => setSelectedFilter(tab.value)}
              className={`px-4 py-2 rounded-sm text-xs font-mono uppercase tracking-wider transition-all ${
                selectedFilter === tab.value
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'bg-white/[0.03] text-white/60 hover:text-white hover:bg-white/[0.08] border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`project-card-${project.slug || project.id}`}
              className="group relative flex flex-col justify-between rounded-sm bg-white/[0.02] border border-white/10 overflow-hidden hover:border-emerald-500/40 transition-all duration-300"
            >
              {/* Image & Category Pill */}
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80"></div>
                
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-sm text-[9px] font-mono font-bold uppercase tracking-widest bg-black/80 backdrop-blur-md text-emerald-400 border border-white/10">
                    {project.category}
                  </span>
                </div>

                {project.featured && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-sm text-[9px] font-mono font-bold uppercase tracking-widest bg-emerald-500 text-black shadow-sm flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-white/50 leading-relaxed mb-5 line-clamp-2">
                    {project.shortDescription}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 rounded-sm bg-white/5 text-white/70 text-[10px] font-mono border border-white/10 uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 rounded-sm bg-white/5 text-white/40 text-[10px] font-mono border border-white/10">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions: Case Study & Live Demo */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <button
                    id={`open-case-study-${project.id}`}
                    onClick={() => onSelectProject(project)}
                    className="flex-1 py-2.5 px-3 rounded-sm bg-white hover:bg-neutral-200 text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Case Study</span>
                  </button>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-sm bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors"
                      title="View Live Website Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8 rounded-sm bg-white/[0.02] border border-white/10">
            <span className="text-sm text-white/70">
              Need a bespoke website matching these performance and conversion standards?
            </span>
            <button
              onClick={onOpenOrderModal}
              className="px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-wider text-black bg-emerald-500 hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)] flex items-center gap-2"
            >
              <span>Commission A Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

