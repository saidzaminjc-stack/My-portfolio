import React from 'react';
import { 
  Globe, 
  Building2, 
  ShoppingBag, 
  Zap, 
  Code2, 
  Layers, 
  Palette, 
  ShieldCheck, 
  Check, 
  ArrowRight
} from 'lucide-react';
import { Service } from '../types';

interface ServicesProps {
  services: Service[];
  onSelectService?: (serviceTitle: string) => void;
  onOrderService?: (serviceTitle: string) => void;
  onOpenOrderModal?: () => void;
}

export const Services: React.FC<ServicesProps> = ({ 
  services, 
  onSelectService, 
  onOrderService,
  onOpenOrderModal 
}) => {
  const handleOrder = (title: string) => {
    if (onSelectService) {
      onSelectService(title);
    } else if (onOrderService) {
      onOrderService(title);
    } else if (onOpenOrderModal) {
      onOpenOrderModal();
    }
  };

  // Map icon name string to Lucide icon component
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return Globe;
      case 'Building2': return Building2;
      case 'ShoppingBag': return ShoppingBag;
      case 'Zap': return Zap;
      case 'Code2': return Code2;
      case 'Layers': return Layers;
      case 'Palette': return Palette;
      case 'ShieldCheck': return ShieldCheck;
      default: return Globe;
    }
  };

  return (
    <section id="services" className="py-24 lg:py-32 relative bg-[#0A0A0A] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Editorial Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-emerald-500"></span>
            <span className="text-emerald-500 text-[11px] uppercase tracking-[0.25em] font-semibold">
              Specialized Capabilities
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            TAILORED WEB SERVICES & <span className="italic font-serif normal-case font-normal text-white/90">Solutions</span>
          </h2>
          <p className="mt-4 text-base text-white/50 max-w-2xl leading-relaxed">
            From modern responsive marketing sites to complex web applications, every product is engineered for speed, clean code, and business conversions.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = getIcon(service.iconName);
            return (
              <div
                key={service.id}
                id={`service-card-${service.slug}`}
                className={`relative flex flex-col justify-between p-7 rounded-sm transition-all duration-300 group ${
                  service.popular 
                    ? 'bg-white/[0.04] border border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.1)]' 
                    : 'bg-white/[0.02] border border-white/10 hover:border-white/20'
                }`}
              >
                {/* Popular badge */}
                {service.popular && (
                  <div className="absolute -top-3 right-5 px-3 py-1 rounded-sm bg-emerald-500 text-[9px] font-bold uppercase tracking-widest text-black shadow-sm">
                    Most Popular
                  </div>
                )}

                <div>
                  {/* Icon & Title */}
                  <div className="w-12 h-12 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                    {service.title}
                  </h3>

                  <p className="text-xs text-white/50 leading-relaxed mb-6 min-h-[44px]">
                    {service.shortDesc}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2.5 mb-6 pt-5 border-t border-white/10">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-white/70">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Order Action */}
                <div className="pt-5 border-t border-white/10 mt-auto">
                  <div className="flex items-baseline justify-between mb-5">
                    <span className="text-[10px] uppercase tracking-widest text-white/40 font-medium">Starting from</span>
                    <div className="text-right">
                      <span className="text-xl font-bold font-mono text-white tracking-tight">
                        {service.currency}{service.startingPrice}
                      </span>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 block">{service.deliveryTime}</span>
                    </div>
                  </div>

                  <button
                    id={`order-service-${service.slug}`}
                    onClick={() => handleOrder(service.title)}
                    className={`w-full py-3 px-4 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      service.popular
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_20px_rgba(16,185,129,0.25)]'
                        : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/30'
                    }`}
                  >
                    <span>Request Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

