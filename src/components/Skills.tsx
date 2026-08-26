import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';
import { Skill } from '../types';

interface SkillsProps {
  skills: Skill[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Frontend', 'Backend', 'CMS & Platforms', 'Tools & DevOps', 'Design & SEO'];

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter(s => s.category === selectedCategory);

  return (
    <section id="skills" className="py-24 lg:py-32 bg-[#0A0A0A] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Editorial Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-emerald-500"></span>
            <span className="text-emerald-500 text-[11px] uppercase tracking-[0.25em] font-semibold">
              Tech Stack & Expertise
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            SKILLS & MODERN <span className="italic font-serif normal-case font-normal text-white/90">Technologies</span>
          </h2>
          <p className="mt-4 text-base text-white/50 max-w-2xl leading-relaxed">
            Engineered with modern, battle-tested programming languages, frontend libraries, backend databases, and SEO best practices.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`skill-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-sm text-xs font-mono uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'bg-white/[0.03] text-white/60 hover:text-white hover:bg-white/[0.08] border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-5 rounded-sm bg-white/[0.02] border border-white/10 hover:border-emerald-500/40 hover:bg-white/[0.04] transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-white tracking-tight">
                  {skill.name}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {skill.proficiency}%
                </span>
              </div>

              {/* Progress Indicator Bar */}
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-3">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${skill.proficiency}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-white/40 uppercase tracking-wider">
                <span>{skill.category}</span>
                <span>{skill.experienceYears}+ YRS EXP</span>
              </div>
            </div>
          ))}
        </div>

        {/* Development Guarantee Bar */}
        <div className="mt-14 p-6 sm:p-8 rounded-sm bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 rounded-sm bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white uppercase tracking-tight">Full-Stack Type Safety & Modular Architecture</div>
              <div className="text-xs text-white/50 mt-0.5">Every codebase comes with strict linting, zero console errors, and guaranteed cross-device compatibility.</div>
            </div>
          </div>
          <a
            href="#projects"
            className="px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-all shrink-0 flex items-center gap-2"
          >
            <span>View Case Studies</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};

