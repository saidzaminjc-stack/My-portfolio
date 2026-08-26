import React from 'react';
import { 
  Check, 
  X, 
  ArrowRight, 
  Clock, 
  RefreshCw 
} from 'lucide-react';
import { PricingPackage } from '../types';

interface PricingProps {
  packages: PricingPackage[];
  onOrderPackage: (packageName: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ packages, onOrderPackage }) => {
  return (
    <section id="pricing" className="py-24 lg:py-32 bg-[#0A0A0A] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Editorial Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-emerald-500"></span>
            <span className="text-emerald-500 text-[11px] uppercase tracking-[0.25em] font-semibold">
              Transparent Investment
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            CLEAR TIERS & <span className="italic font-serif normal-case font-normal text-white/90">Transparent Value</span>
          </h2>
          <p className="mt-4 text-base text-white/50 max-w-2xl leading-relaxed">
            No hidden retainers. 100% intellectual property ownership. Rigorous QA, Core Web Vitals optimization, and post-launch technical warranty.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              id={`pricing-card-${pkg.tier.toLowerCase()}`}
              className={`relative flex flex-col justify-between p-8 sm:p-10 rounded-sm transition-all duration-300 ${
                pkg.popular
                  ? 'bg-white/[0.04] border border-emerald-500/60 shadow-[0_0_40px_rgba(16,185,129,0.12)]'
                  : 'bg-white/[0.02] border border-white/10 hover:border-white/20'
              }`}
            >
              {/* Popular Flag */}
              {pkg.popular && (
                <div className="absolute -top-3 left-8 px-3 py-1 rounded-sm bg-emerald-500 text-[9px] font-bold uppercase tracking-widest text-black shadow-sm">
                  Recommended Choice
                </div>
              )}

              <div>
                {/* Header */}
                <div className="mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block mb-1">{pkg.tier} Tier</span>
                  <h3 className="text-2xl font-bold text-white tracking-tight">{pkg.name}</h3>
                  <p className="text-xs text-white/50 leading-relaxed mt-2 min-h-[36px]">{pkg.tagline}</p>
                </div>

                {/* Price Display */}
                <div className="mb-8 pb-6 border-b border-white/10">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tight">
                      {pkg.currency}{pkg.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-white/40 uppercase tracking-wider font-mono">/{pkg.billingPeriod || 'project'}</span>
                  </div>

                  <div className="flex items-center gap-5 mt-5 text-xs text-white/60 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      {pkg.deliveryDays} DAYS
                    </span>
                    <span className="flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5 text-white/40" />
                      {pkg.revisions}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Included Scope:</div>
                  {pkg.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/70">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}

                  {pkg.notIncluded && pkg.notIncluded.length > 0 && (
                    <div className="pt-2 space-y-2">
                      {pkg.notIncluded.map((notFeat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-white/30">
                          <X className="w-3.5 h-3.5 text-white/20 shrink-0 mt-0.5" />
                          <span>{notFeat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Order Button */}
              <div className="pt-6 border-t border-white/10 mt-auto">
                <button
                  id={`order-package-${pkg.id}`}
                  onClick={() => onOrderPackage(pkg.name)}
                  className={`w-full py-4 px-6 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    pkg.popular
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_20px_rgba(16,185,129,0.25)]'
                      : 'bg-white hover:bg-neutral-200 text-black'
                  }`}
                >
                  <span>Select {pkg.tier} Tier</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Custom Scope / Quote Callout */}
        <div className="mt-16 p-8 sm:p-10 rounded-sm bg-white/[0.02] border border-white/10 text-center max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">Have Custom Architectural Requirements?</h3>
          <p className="text-xs sm:text-sm text-white/50 mb-6 leading-relaxed">
            If your project requires specialized integrations (AI LLM models, custom WebSockets, CRM sync, or multi-tenant database systems), request a tailored quote.
          </p>
          <button
            onClick={() => onOrderPackage("Custom Budget / Specialized Architecture")}
            className="px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-colors"
          >
            Request Custom Scope & Quote &rarr;
          </button>
        </div>

      </div>
    </section>
  );
};
