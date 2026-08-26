import React from 'react';
import { 
  Star, 
  Quote, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-[#0A0A0A] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Editorial Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-emerald-500"></span>
            <span className="text-emerald-500 text-[11px] uppercase tracking-[0.25em] font-semibold">
              Client Endorsements
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            VERIFIED REVIEWS & <span className="italic font-serif normal-case font-normal text-white/90">Client Outcomes</span>
          </h2>
          <p className="mt-4 text-base text-white/50 max-w-2xl leading-relaxed">
            Real feedback from business owners, founders, and creative directors who launched high-performing digital products with me.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="relative p-8 sm:p-10 rounded-sm bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-white/5 group-hover:text-emerald-500/10 transition-colors pointer-events-none" />

              <div>
                {/* Rating Stars & Project Type */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < test.rating ? 'text-emerald-400 fill-emerald-400' : 'text-white/20'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-sm border border-emerald-500/20">
                    {test.projectType}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-8 font-light">
                  "{test.comment}"
                </p>
              </div>

              {/* Client Info Bar */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <div className="flex items-center gap-3.5">
                  <img
                    src={test.clientAvatar}
                    alt={test.clientName}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover grayscale border border-white/10"
                  />
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-1.5">
                      {test.clientName}
                      {test.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" title="Verified Client" />
                      )}
                    </div>
                    <div className="text-xs text-white/40">{test.clientRole} &mdash; {test.company}</div>
                  </div>
                </div>

                {test.projectUrl && (
                  <a
                    href={test.projectUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-white/40 hover:text-emerald-400 flex items-center gap-1 transition-colors"
                    title="View Project"
                  >
                    <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-wider">Live URL</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Trust Guarantee Badge */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 rounded-sm bg-white/[0.02] border border-white/10 text-xs text-white/60">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% Client Satisfaction & QA Guarantee</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Fixed-Price Milestone Invoicing</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>30-Day Post-Launch Code Warranty</span>
          </div>
        </div>

      </div>
    </section>
  );
};

