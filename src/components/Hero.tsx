import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  Code2,
  Layers,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { SiteProfile } from '../types';

interface HeroProps {
  profile: SiteProfile;
  onOpenOrderModal: () => void;
  onViewProjects?: () => void;
  onContactClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  profile, 
  onOpenOrderModal,
  onViewProjects,
  onContactClick
}) => {
  // Quick order interactive estimate state
  const [selectedType, setSelectedType] = useState('E-Commerce Website');
  const [selectedTimeline, setSelectedTimeline] = useState('Standard (2-4 Weeks)');

  const getBudgetForType = (type: string) => {
    switch (type) {
      case 'Custom Web Application':
        return { range: '$4,000 - $8,500', tier: 'ENTERPRISE' };
      case 'Landing Page':
        return { range: '$1,200 - $2,500', tier: 'STARTER' };
      case 'Business Portfolio':
        return { range: '$1,800 - $3,500', tier: 'GROWTH' };
      case 'E-Commerce Website':
      default:
        return { range: '$2,500 - $5,000', tier: 'PRO PACKAGE' };
    }
  };

  const currentBudget = getBudgetForType(selectedType);

  const handleScrollToProjects = () => {
    if (onViewProjects) {
      onViewProjects();
    } else {
      const el = document.getElementById('projects');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToContact = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      const el = document.getElementById('contact');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[92vh] flex items-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-[#0A0A0A] bg-grid-editorial"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Editorial Line Accent & Status */}
            <div className="mb-6 flex items-center gap-4">
              <span className="h-[1px] w-12 bg-emerald-500"></span>
              <span className="text-emerald-500 text-[11px] sm:text-[12px] uppercase tracking-[0.3em] font-semibold">
                Available for new projects
              </span>
            </div>

            {/* Editorial Title */}
            <h1 
              id="hero-main-heading"
              className="text-5xl sm:text-7xl lg:text-[80px] xl:text-[84px] leading-[0.92] font-black tracking-tight mb-8 text-white uppercase"
            >
              PROFESSIONAL <br />
              <span className="italic font-serif normal-case font-normal text-white/90 block sm:inline mt-1 sm:mt-0">
                Web Developer
              </span>
            </h1>

            {/* Editorial Subtitle */}
            <p 
              id="hero-subtitle"
              className="text-base sm:text-lg text-white/50 max-w-xl leading-relaxed mb-10 font-normal"
            >
              {profile.tagline || "I build modern, fast, responsive and high-converting websites for businesses, startups and personal brands using Next.js, React and Tailwind."}
            </p>

            {/* Editorial Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-12">
              <button
                id="hero-view-work-btn"
                onClick={handleScrollToProjects}
                className="px-8 py-4 bg-white hover:bg-neutral-200 text-black font-bold text-xs sm:text-sm uppercase tracking-wider rounded-sm transition-all"
              >
                View My Work
              </button>

              <button
                id="hero-start-project-btn"
                onClick={onOpenOrderModal}
                className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs sm:text-sm uppercase tracking-wider rounded-sm transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center gap-2"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 gap-6 sm:gap-12 border-t border-white/10 pt-10">
              <div>
                <div className="text-3xl sm:text-4xl font-bold mb-1 tracking-tight text-white">
                  {profile.projectsCompleted || '150'}+
                </div>
                <div className="text-[10px] sm:text-[11px] uppercase tracking-widest text-white/40 font-medium">
                  Projects Completed
                </div>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-bold mb-1 tracking-tight text-white">
                  {profile.yearsExperience || '8'}+
                </div>
                <div className="text-[10px] sm:text-[11px] uppercase tracking-widest text-white/40 font-medium">
                  Years Experience
                </div>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-bold mb-1 tracking-tight text-white">
                  99%
                </div>
                <div className="text-[10px] sm:text-[11px] uppercase tracking-widest text-white/40 font-medium">
                  Satisfaction Rate
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Quick Order System & Tech Stack Aside */}
          <div className="lg:col-span-5">
            <div className="bg-white/5 border border-white/10 p-7 sm:p-9 rounded-sm flex flex-col backdrop-blur-md">
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-emerald-500 font-bold">
                    Quick Order System
                  </h3>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-white/40 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                    Live Intake
                  </span>
                </div>

                <div className="space-y-4">
                  
                  {/* Project Type */}
                  <div className="bg-black/60 p-4 rounded border border-white/10 focus-within:border-emerald-500/60 transition-colors">
                    <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-1.5 font-medium">
                      Project Type
                    </label>
                    <select 
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full bg-transparent text-sm text-white font-medium focus:outline-none cursor-pointer"
                    >
                      <option value="E-Commerce Website" className="bg-[#111] text-white">E-Commerce Website</option>
                      <option value="Landing Page" className="bg-[#111] text-white">High-Converting Landing Page</option>
                      <option value="Business Portfolio" className="bg-[#111] text-white">Business Corporate Portfolio</option>
                      <option value="Custom Web Application" className="bg-[#111] text-white">Custom Full-Stack Web App</option>
                    </select>
                  </div>

                  {/* Estimated Budget */}
                  <div className="bg-black/60 p-4 rounded border border-white/10">
                    <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-1.5 font-medium">
                      Estimated Investment
                    </label>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-white tracking-wide">
                        {currentBudget.range}
                      </span>
                      <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {currentBudget.tier}
                      </span>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="bg-black/60 p-4 rounded border border-white/10 focus-within:border-emerald-500/60 transition-colors">
                    <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-1.5 font-medium">
                      Target Timeline
                    </label>
                    <select 
                      value={selectedTimeline}
                      onChange={(e) => setSelectedTimeline(e.target.value)}
                      className="w-full bg-transparent text-sm text-white font-medium focus:outline-none cursor-pointer"
                    >
                      <option value="Express (1 Week)" className="bg-[#111] text-white">Express Sprint (1 Week)</option>
                      <option value="Standard (2-4 Weeks)" className="bg-[#111] text-white">Standard Delivery (2-4 Weeks)</option>
                      <option value="Flexible Schedule" className="bg-[#111] text-white">Flexible Schedule (1-2 Months)</option>
                    </select>
                  </div>

                  {/* Submit CTA */}
                  <button 
                    onClick={onOpenOrderModal}
                    className="w-full py-4 bg-emerald-500 text-black font-bold uppercase text-xs tracking-[0.2em] rounded-sm mt-2 hover:bg-emerald-400 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2"
                  >
                    <span>Submit Project Request</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                </div>
              </div>

              {/* Recent Technologies Footer */}
              <div className="mt-auto pt-6 border-t border-white/10">
                <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3 font-medium">
                  Recent Technologies & Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['REACT', 'NEXT.JS', 'TYPESCRIPT', 'TAILWIND', 'NODE.JS', 'PRISMA', 'POSTGRESQL'].map((tech) => (
                    <span 
                      key={tech}
                      className="px-2.5 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-white/80 uppercase tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

