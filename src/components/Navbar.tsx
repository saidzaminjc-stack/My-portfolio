import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Sparkles, 
  UserCheck, 
  Shield, 
  ArrowRight,
  Youtube,
  MessageSquare
} from 'lucide-react';
import { SiteProfile } from '../types';
import { getWhatsAppLink } from '../lib/contactUtils';

interface NavbarProps {
  profile: SiteProfile;
  onOpenOrderModal: (defaultService?: string, defaultPackage?: string) => void;
  onOpenClientPortal?: () => void;
  onOpenAdminPortal?: () => void;
  onOpenClientDashboard?: () => void;
  onOpenAdminDashboard?: () => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  onOpenOrderModal,
  onOpenClientPortal,
  onOpenAdminPortal,
  onOpenClientDashboard,
  onOpenAdminDashboard,
  activeSection = 'home'
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleClientClick = onOpenClientDashboard || onOpenClientPortal || (() => {});
  const handleAdminClick = onOpenAdminDashboard || onOpenAdminPortal || (() => {});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Reviews', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  const brandFirst = profile.name.split(' ')[0] || 'TOUSEEF';
  const whatsappUrl = getWhatsAppLink(profile.whatsappNumber, profile.whatsappDefaultMessage);
  const youtubeUrl = profile.youtubeUrl || 'https://www.youtube.com/@dakaravines';

  return (
    <header 
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'py-4 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/10 shadow-2xl' 
          : 'py-6 bg-[#0A0A0A]/40 backdrop-blur-xs border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          
          {/* Editorial Brand / Logo */}
          <a 
            id="brand-logo-link"
            href="#home" 
            className="flex items-center gap-2 group focus:outline-none"
          >
            <span className="text-xl sm:text-2xl font-black tracking-tighter uppercase text-white">
              {brandFirst}<span className="text-emerald-500">.</span>DEV
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-8 xl:gap-10 text-[11px] uppercase tracking-[0.2em] font-medium text-white/60">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  id={`nav-link-${link.name.toLowerCase()}`}
                  href={link.href}
                  className={`transition-colors hover:text-white ${
                    isActive ? 'text-white font-semibold' : 'text-white/60'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {profile.youtubeUrl && (
              <a
                id="nav-youtube-link"
                href={youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-sm text-white/60 hover:text-rose-400 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                title="YouTube Channel"
              >
                <Youtube className="w-4 h-4" />
              </a>
            )}

            <a
              id="nav-whatsapp-link"
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-sm text-white/60 hover:text-emerald-400 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            <button
              id="nav-client-portal-btn"
              onClick={handleClientClick}
              className="px-3.5 py-2 rounded-sm text-[10px] uppercase tracking-widest font-semibold text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center gap-1.5"
              title="Track submitted orders and communicate with developer"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Track Order</span>
            </button>

            <button
              id="nav-admin-portal-btn"
              onClick={handleAdminClick}
              className="px-3 py-2 rounded-sm text-[10px] uppercase tracking-widest font-semibold text-white/50 hover:text-white/80 bg-transparent hover:bg-white/5 border border-white/10 transition-all flex items-center gap-1.5"
              title="Admin CMS & Orders Management"
            >
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>CMS</span>
            </button>

            <button
              id="nav-start-project-btn"
              onClick={() => onOpenOrderModal()}
              className="bg-emerald-500 hover:bg-emerald-400 text-black text-[11px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-full transition-all shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] flex items-center gap-1.5"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="mobile-order-btn-header"
              onClick={() => onOpenOrderModal()}
              className="sm:hidden px-3.5 py-1.5 rounded-full bg-emerald-500 text-black text-[10px] font-bold uppercase tracking-wider"
            >
              <span>Order</span>
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-sm text-white/70 hover:text-white bg-white/5 border border-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div id="mobile-nav-menu" className="lg:hidden bg-[#0A0A0A]/98 border-b border-white/10 px-6 pt-4 pb-8 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-xs uppercase tracking-[0.2em] font-medium text-white/70 hover:text-white border-b border-white/5 transition-colors"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-4 mt-2 flex flex-col gap-3">
              <button
                id="mobile-start-project-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrderModal();
                }}
                className="w-full py-3.5 bg-emerald-500 text-black font-bold uppercase text-xs tracking-[0.2em] rounded-sm transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                Start a Project
              </button>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  id="mobile-client-portal-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleClientClick();
                  }}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-sm text-[10px] uppercase tracking-widest font-semibold text-white/80 bg-white/5 border border-white/10"
                >
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Track Order</span>
                </button>
                <button
                  id="mobile-admin-portal-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleAdminClick();
                  }}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-sm text-[10px] uppercase tracking-widest font-semibold text-white/60 bg-white/5 border border-white/10"
                >
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin CMS</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

