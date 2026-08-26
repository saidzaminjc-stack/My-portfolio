import React from 'react';
import { 
  Compass, 
  Layers, 
  Code, 
  Rocket, 
  HeartHandshake, 
  Sparkles, 
  Clock, 
  ShieldCheck,
  Github,
  Linkedin,
  Twitter,
  Youtube,
  Mail,
  ArrowRight
} from 'lucide-react';
import { SiteProfile } from '../types';

interface AboutProps {
  profile: SiteProfile;
  onOpenOrderModal: () => void;
}

export const About: React.FC<AboutProps> = ({ profile, onOpenOrderModal }) => {
  const steps = [
    {
      num: "01",
      title: "Discovery & Strategy",
      desc: "Deep analysis of your market position, conversion pathways, brand identity, and technical roadmap before any code is produced.",
      icon: Compass
    },
    {
      num: "02",
      title: "UX & System Architecture",
      desc: "Architecting high-conversion interfaces, scalable component design systems, and robust database schemas with zero technical debt.",
      icon: Layers
    },
    {
      num: "03",
      title: "Clean Code & Performance",
      desc: "Hand-crafted Next.js, React & Tailwind codebases engineered for sub-second speeds, flawless responsiveness, and 95+ Core Web Vitals.",
      icon: Code
    },
    {
      num: "04",
      title: "Deployment & Growth",
      desc: "Automated CI/CD staging, SSL provisioning, Schema.org SEO indexing, and guaranteed 30-day post-launch technical warranty.",
      icon: Rocket
    }
  ];

  const whyWorkWithMe = [
    {
      title: "Direct Engineer Collaboration",
      desc: "No account manager intermediaries or lost translations. You communicate and strategize directly with the lead developer.",
      icon: HeartHandshake
    },
    {
      title: "Speed & Lighthouse Benchmark",
      desc: "Strict compliance with 95+ Google Lighthouse metrics to accelerate organic SEO and maximize customer conversion rates.",
      icon: Sparkles
    },
    {
      title: "Predictable Timeline Delivery",
      desc: "Rigorous milestone tracking and clear communication. Every sprint arrives strictly on schedule with verifiable progress.",
      icon: Clock
    },
    {
      title: "Full Intellectual Property Ownership",
      desc: "Clean, documented, and maintainable repositories. 100% of the code, domain rights, and assets belong entirely to your brand.",
      icon: ShieldCheck
    }
  ];

  return (
    <section id="about" className="py-24 lg:py-32 bg-[#0A0A0A] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Editorial Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-emerald-500"></span>
            <span className="text-emerald-500 text-[11px] uppercase tracking-[0.25em] font-semibold">
              Background & Philosophy
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            ABOUT ME & <span className="italic font-serif normal-case font-normal text-white/90">Engineering Approach</span>
          </h2>
          <p className="mt-4 text-base text-white/50 max-w-2xl leading-relaxed">
            Focused on building high-performance web products that transform visitor traffic into measurable business revenue.
          </p>
        </div>

        {/* Top Profile Overview & Live Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          {/* Avatar / Portrait & Social Links */}
          <div className="lg:col-span-5 flex flex-col items-center sm:items-start">
            <div className="relative group w-full max-w-sm">
              <div className="relative w-full aspect-[4/5] rounded-sm overflow-hidden bg-white/5 border border-white/10 shadow-2xl">
                <img 
                  src={profile.avatarUrl} 
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-500" 
                />
              </div>
            </div>

            {/* Social Icons & Email */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {profile.githubUrl && (
                <a 
                  href={profile.githubUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {profile.linkedinUrl && (
                <a 
                  href={profile.linkedinUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {profile.twitterUrl && (
                <a 
                  href={profile.twitterUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all"
                  aria-label="Twitter Profile"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {profile.youtubeUrl && (
                <a 
                  href={profile.youtubeUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-emerald-400 transition-all"
                  aria-label="YouTube Channel"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
              <a 
                href={`mailto:${profile.email}`}
                className="p-3 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all"
                aria-label="Email Alex"
              >
                <Mail className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-white hover:bg-neutral-200 text-black text-xs font-bold uppercase tracking-wider transition-all"
              >
                <span>Direct Contact</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Biography & Dynamic Stats */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="text-xs uppercase font-mono tracking-widest text-emerald-500 mb-2">
              {profile.title} &mdash; {profile.location}
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 tracking-tight">
              Crafting websites that are fast, intuitive, and profitable.
            </h3>

            <p className="text-white/70 text-base leading-relaxed mb-4">
              {profile.bio}
            </p>

            <p className="text-white/50 text-sm leading-relaxed mb-8">
              {profile.detailedBio}
            </p>

            {/* Editorial Statistics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-sm bg-white/[0.03] border border-white/10">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">
                  {profile.projectsCompleted}+
                </div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 font-medium mt-1">Completed</div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono tracking-tight">
                  {profile.happyClients}+
                </div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 font-medium mt-1">Happy Clients</div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">
                  {profile.technologiesCount}+
                </div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 font-medium mt-1">Tech Tools</div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono tracking-tight">
                  {profile.yearsExperience}+
                </div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 font-medium mt-1">Years Exp</div>
              </div>
            </div>

          </div>

        </div>

        {/* Development Approach Steps */}
        <div className="mb-24">
          <div className="mb-10">
            <h3 className="text-xs uppercase tracking-[0.25em] text-emerald-500 font-bold mb-2">
              Structured Workflow
            </h3>
            <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight uppercase">
              4-Step <span className="italic font-serif normal-case font-normal text-white/90">Development Cycle</span>
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div 
                  key={step.num}
                  className="p-6 rounded-sm bg-white/[0.02] border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs font-mono font-bold text-emerald-500">
                        // {step.num}
                      </span>
                      <Icon className="w-4 h-4 text-white/40 group-hover:text-emerald-400 transition-colors" />
                    </div>
                    <h5 className="text-base font-bold text-white mb-2">{step.title}</h5>
                    <p className="text-xs text-white/50 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why Work With Me */}
        <div>
          <div className="mb-10">
            <h3 className="text-xs uppercase tracking-[0.25em] text-emerald-500 font-bold mb-2">
              The Value Proposition
            </h3>
            <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight uppercase">
              Why Clients <span className="italic font-serif normal-case font-normal text-white/90">Choose Alex Morgan</span>
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyWorkWithMe.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="p-7 rounded-sm bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex items-start gap-5"
                >
                  <div className="p-3 rounded-sm bg-white/5 border border-white/10 text-emerald-400 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-base font-bold text-white mb-1.5">{item.title}</h5>
                    <p className="text-xs sm:text-sm text-white/50 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-14 text-center">
            <button
              onClick={onOpenOrderModal}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-sm font-bold text-xs uppercase tracking-widest text-black bg-emerald-500 hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all"
            >
              <span>Discuss Your Project Requirements</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

