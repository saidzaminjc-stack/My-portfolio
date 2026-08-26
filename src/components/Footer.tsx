import React from 'react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Youtube,
  Instagram,
  Facebook,
  Mail, 
  MessageSquare, 
  Phone,
  MapPin,
  ShieldCheck, 
  Lock, 
  ArrowUp,
  ArrowRight,
  ExternalLink,
  Globe
} from 'lucide-react';
import { SiteProfile, SocialLink } from '../types';
import { getWhatsAppLink, getTelLink, getMailtoLink } from '../lib/contactUtils';

interface FooterProps {
  profile: SiteProfile;
  onOpenOrderModal: () => void;
  onOpenClientDashboard: () => void;
  onOpenAdminDashboard: () => void;
  onOpenPrivacyModal: () => void;
  onOpenTermsModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  profile,
  onOpenOrderModal,
  onOpenClientDashboard,
  onOpenAdminDashboard,
  onOpenPrivacyModal,
  onOpenTermsModal
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = getWhatsAppLink(profile.whatsappNumber, profile.whatsappDefaultMessage);
  const telUrl = getTelLink(profile.phone);
  const mailtoUrl = getMailtoLink(profile.email, profile.emailSubject || 'Project Inquiry', profile.emailDefaultMessage);

  // Dynamic social links from profile
  const activeSocialLinks: SocialLink[] = (profile.socialLinks || [])
    .filter(s => s.enabled && s.url && s.url.trim() !== '')
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const renderSocialIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('youtube')) return <Youtube className="w-4 h-4" />;
    if (p.includes('whatsapp')) return <MessageSquare className="w-4 h-4" />;
    if (p.includes('github')) return <Github className="w-4 h-4" />;
    if (p.includes('linkedin')) return <Linkedin className="w-4 h-4" />;
    if (p.includes('twitter') || p.includes('x')) return <Twitter className="w-4 h-4" />;
    if (p.includes('instagram')) return <Instagram className="w-4 h-4" />;
    if (p.includes('facebook')) return <Facebook className="w-4 h-4" />;
    return <Globe className="w-4 h-4" />;
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/10 relative">
      
      {/* Top Banner CTA */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        <div className="p-8 sm:p-14 rounded-sm bg-white/[0.02] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[1px] w-6 bg-emerald-500"></span>
              <span className="text-emerald-500 text-[10px] uppercase tracking-[0.25em] font-mono font-bold">
                Available For Direct Commission
              </span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              Ready to Architect <span className="italic font-serif normal-case font-normal text-white/90">Your Next Web Experience?</span>
            </h3>
            <p className="text-white/50 text-xs sm:text-sm mt-3 leading-relaxed font-light">
              From high-converting business portfolios and landing pages to custom full-stack web applications and scalable e-commerce systems.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto shrink-0">
            <button
              id="footer-start-project-cta"
              onClick={onOpenOrderModal}
              className="w-full sm:w-auto px-8 py-4 rounded-sm text-xs font-bold uppercase tracking-wider text-black bg-emerald-500 hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all flex items-center justify-center gap-2"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              id="footer-whatsapp-cta"
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-4 rounded-sm text-xs font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all flex items-center justify-center gap-2 font-mono"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>

        {/* Links Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-20 pb-16 border-b border-white/10">
          
          {/* Column 1: Brand Info & Description */}
          <div className="space-y-5">
            <div>
              <span className="text-xl font-bold tracking-tight text-white font-serif uppercase">
                {profile.name}
              </span>
              <span className="block text-[10px] font-mono uppercase tracking-widest text-emerald-400 mt-1">
                {profile.title || "Professional Web Developer"}
              </span>
            </div>

            <p className="text-xs text-white/50 leading-relaxed font-light">
              {profile.tagline || profile.bio || "I build modern, fast, responsive and high-converting websites for businesses, startups and personal brands using Next.js, React and Tailwind."}
            </p>

            {/* Social Media Icons */}
            <div className="pt-2">
              <div className="text-[10px] font-mono uppercase text-white/40 mb-2.5">Social Accounts</div>
              <div className="flex flex-wrap items-center gap-2">
                {activeSocialLinks.length > 0 ? (
                  activeSocialLinks.map((soc) => (
                    <a 
                      key={soc.id}
                      href={soc.url} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="p-2.5 rounded-sm bg-white/5 text-white/70 hover:text-emerald-400 hover:bg-white/10 border border-white/10 transition-colors"
                      title={soc.label || soc.platform}
                      aria-label={soc.label || soc.platform}
                    >
                      {renderSocialIcon(soc.platform)}
                    </a>
                  ))
                ) : (
                  <>
                    {profile.youtubeUrl && (
                      <a href={profile.youtubeUrl} target="_blank" rel="noreferrer" className="p-2.5 rounded-sm bg-white/5 text-white/60 hover:text-rose-400 hover:bg-white/10 border border-white/10 transition-colors" title="YouTube">
                        <Youtube className="w-4 h-4" />
                      </a>
                    )}
                    {profile.githubUrl && (
                      <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="p-2.5 rounded-sm bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10 transition-colors" title="GitHub">
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {profile.linkedinUrl && (
                      <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="p-2.5 rounded-sm bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10 transition-colors" title="LinkedIn">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Column 2: Contact Information */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest mb-5">Contact Information</h4>
            <ul className="space-y-3.5 text-xs text-white/60 font-mono">
              <li>
                <a 
                  href={mailtoUrl}
                  className="flex items-center gap-2.5 hover:text-emerald-400 transition-colors group"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-400/80 group-hover:text-emerald-300" />
                  <span className="truncate">{profile.email}</span>
                </a>
              </li>
              <li>
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 hover:text-emerald-400 transition-colors group"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400/80 group-hover:text-emerald-300" />
                  <span>WhatsApp: {profile.whatsappNumber || profile.phone}</span>
                </a>
              </li>
              <li>
                <a 
                  href={telUrl}
                  className="flex items-center gap-2.5 hover:text-emerald-400 transition-colors group"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400/80 group-hover:text-emerald-300" />
                  <span>Phone: {profile.phone}</span>
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-white/50">
                <MapPin className="w-3.5 h-3.5 text-emerald-400/80" />
                <span>{profile.location || "Islamabad, Pakistan"}</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest mb-5">Quick Links</h4>
            <ul className="space-y-3 text-xs text-white/60 font-mono">
              <li><a href="#home" className="hover:text-emerald-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-emerald-400 transition-colors">About</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Services</a></li>
              <li><a href="#projects" className="hover:text-emerald-400 transition-colors">Projects</a></li>
              <li><a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing</a></li>
              <li><a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a></li>
              <li>
                <button 
                  onClick={onOpenOrderModal} 
                  className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Portals & Legal */}
          <div>
            <h4 className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest mb-5">Client Portal & Access</h4>
            <ul className="space-y-3 text-xs text-white/60 mb-6 font-mono">
              <li>
                <button onClick={onOpenClientDashboard} className="hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Client Order Tracker</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenAdminDashboard} className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin Terminal</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenPrivacyModal} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={onOpenTermsModal} className="hover:text-white transition-colors">
                  Terms of Service
                </button>
              </li>
            </ul>
            <div className="p-3.5 rounded-sm bg-white/[0.02] border border-white/10 text-[11px] text-white/40 leading-relaxed font-light">
              Fast turnarounds & 100% complete intellectual property handover.
            </div>
          </div>

        </div>

        {/* Bottom Bar with Automatic Current Year */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <div>
            &copy; {new Date().getFullYear()} {profile.name}. All Rights Reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-white/50 hover:text-emerald-400 transition-colors uppercase tracking-wider text-[11px]"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </footer>
  );
};
