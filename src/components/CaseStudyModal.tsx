import React from 'react';
import { 
  X, 
  ExternalLink, 
  Github, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Activity, 
  Calendar, 
  User, 
  Award, 
  Zap 
} from 'lucide-react';
import { Project } from '../types';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onStartSimilarProject: (projectTitle: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onStartSimilarProject
}) => {
  if (!project) return null;

  const { caseStudy } = project;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-4xl bg-[#0A0A0A] border border-white/10 rounded-sm shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header bar */}
        <div className="flex items-center justify-between px-8 py-5 bg-black/80 border-b border-white/10 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-sm text-[10px] font-mono font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              {project.category}
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-white/50 hidden sm:inline">Engineering Case Study</span>
          </div>

          <button
            id="close-case-study-btn"
            onClick={onClose}
            className="p-2 rounded-sm text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          
          {/* Main Hero Header */}
          <div>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mb-3">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed mb-6 font-light">
              {project.fullDescription || project.shortDescription}
            </p>

            {/* Quick Metadata Info */}
            <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-white/50 pb-6 border-b border-white/10">
              {project.clientName && (
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-emerald-400" />
                  <span>CLIENT: <strong className="text-white">{project.clientName}</strong></span>
                </div>
              )}
              {project.completionDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>DELIVERED: <strong className="text-white">{project.completionDate}</strong></span>
                </div>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold ml-auto uppercase tracking-wider text-[11px]"
                >
                  <span>Explore Live Deployment</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Featured Image / Showcase */}
          <div className="rounded-sm overflow-hidden border border-white/10 shadow-xl bg-black max-h-[380px]">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Key Metrics / Results Callout */}
          {caseStudy.metrics && caseStudy.metrics.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {caseStudy.metrics.map((m, idx) => (
                <div key={idx} className="p-6 rounded-sm bg-emerald-500/5 border border-emerald-500/20 text-center">
                  <div className="text-3xl font-mono font-black text-emerald-400">{m.value}</div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-white/60 mt-1">{m.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Problem vs Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-sm bg-white/[0.02] border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <h3 className="text-sm font-mono uppercase tracking-widest text-white">The Challenge & Architecture Bottlenecks</h3>
              </div>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                {caseStudy.problem}
              </p>
            </div>

            <div className="p-6 rounded-sm bg-white/[0.02] border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <h3 className="text-sm font-mono uppercase tracking-widest text-white">The Engineering Implementation</h3>
              </div>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                {caseStudy.solution}
              </p>
            </div>
          </div>

          {/* Client Requirements List */}
          {caseStudy.clientRequirements && caseStudy.clientRequirements.length > 0 && (
            <div className="p-6 rounded-sm bg-white/[0.02] border border-white/10">
              <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Client Key Deliverables & Specifications</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {caseStudy.clientRequirements.map((req, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/70">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Development Process Steps */}
          {caseStudy.developmentProcess && caseStudy.developmentProcess.length > 0 && (
            <div>
              <h3 className="text-sm font-mono uppercase tracking-widest text-white mb-4">Development Phases & Execution Roadmap</h3>
              <div className="space-y-3">
                {caseStudy.developmentProcess.map((proc, idx) => (
                  <div key={idx} className="p-5 rounded-sm bg-white/[0.02] border border-white/10 flex items-start gap-4">
                    <span className="w-6 h-6 rounded-sm bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </span>
                    <div>
                      <div className="text-sm font-bold uppercase tracking-tight text-white">{proc.step}</div>
                      <div className="text-xs text-white/60 mt-1 leading-relaxed font-light">{proc.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Tags */}
          <div>
            <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/50 mb-3">Technologies & Frameworks Deployed</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-3 py-1.5 rounded-sm bg-white/5 border border-white/10 text-xs font-mono text-white/80">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Results Outcome */}
          {caseStudy.results && caseStudy.results.length > 0 && (
            <div className="p-6 rounded-sm bg-emerald-500/5 border border-emerald-500/20">
              <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>Verified Client Outcomes</span>
              </h3>
              <div className="space-y-2">
                {caseStudy.results.map((res, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-white/90">
                    <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{res}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Bottom Sticky Action Footer */}
        <div className="p-6 bg-black border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 z-20">
          <div className="text-xs text-white/50 text-center sm:text-left font-mono">
            Inspired by this build? Let's design a custom solution for your enterprise.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-sm text-xs font-mono font-bold uppercase tracking-wider text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              id="similar-project-cta-btn"
              onClick={() => {
                onClose();
                onStartSimilarProject(project.title);
              }}
              className="flex-1 sm:flex-none px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-wider text-black bg-emerald-500 hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)] flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Commission Similar Project</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
