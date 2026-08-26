import React, { useState } from 'react';
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  Youtube, 
  X, 
  Send, 
  Sparkles,
  ExternalLink,
  ChevronUp
} from 'lucide-react';
import { SiteProfile } from '../types';
import { getWhatsAppLink, getTelLink, getMailtoLink } from '../lib/contactUtils';

interface FloatingContactHubProps {
  profile: SiteProfile;
  onOpenOrderModal?: () => void;
}

export const FloatingContactHub: React.FC<FloatingContactHubProps> = ({ 
  profile,
  onOpenOrderModal 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // If globally disabled by admin
  if (profile.floatingContactEnabled === false) {
    return null;
  }

  const showWhatsapp = profile.floatingShowWhatsapp !== false;
  const showEmail = profile.floatingShowEmail !== false;
  const showPhone = profile.floatingShowPhone !== false;
  const showYoutube = profile.floatingShowYoutube !== false && !!profile.youtubeUrl;

  const whatsappUrl = getWhatsAppLink(profile.whatsappNumber, profile.whatsappDefaultMessage);
  const telUrl = getTelLink(profile.phone);
  const mailtoUrl = getMailtoLink(profile.email, profile.emailSubject || 'Project Inquiry', profile.emailDefaultMessage);
  const youtubeUrl = profile.youtubeUrl || 'https://www.youtube.com/@dakaravines';

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end print:hidden">
      
      {/* Expanded Contact Speed-Dial Card */}
      {isOpen && (
        <div 
          id="floating-contact-menu"
          className="mb-3 w-80 max-w-[calc(100vw-2rem)] p-4 rounded-sm bg-[#0A0A0A] border border-white/10 shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom-4 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <img
                  src={profile.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-sm object-cover border border-white/10"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black animate-pulse"></span>
              </div>
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-tight flex items-center gap-1.5">
                  <span>{profile.name}</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-sm bg-emerald-500/10 text-emerald-400 font-mono border border-emerald-500/30">ONLINE</span>
                </div>
                <div className="text-[10px] text-white/50 font-mono truncate max-w-[160px]">
                  {profile.title || "Professional Web Developer"}
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-sm text-white/40 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close Contact Menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-white/60 my-3 font-light leading-relaxed">
            Choose your preferred channel for immediate technical consultation or quotes:
          </p>

          {/* Action Channels List */}
          <div className="space-y-2">
            {/* 1. WhatsApp Button */}
            {showWhatsapp && (
              <a
                id="floating-whatsapp-link"
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full p-2.5 rounded-sm bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-sm bg-emerald-500 text-black flex items-center justify-center font-bold">
                    <MessageSquare className="w-3.5 h-3.5 fill-black/20" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-white group-hover:text-emerald-300">
                      WhatsApp Chat
                    </div>
                    <div className="text-[10px] text-emerald-400/80 font-mono">
                      {profile.whatsappNumber || profile.phone}
                    </div>
                  </div>
                </div>
                <Send className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
              </a>
            )}

            {/* 2. Email Button */}
            {showEmail && (
              <a
                id="floating-email-link"
                href={mailtoUrl}
                className="w-full p-2.5 rounded-sm bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 text-white/80 hover:text-white flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-white">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                      Send Email
                    </div>
                    <div className="text-[10px] text-white/40 font-mono truncate max-w-[170px]">
                      {profile.email}
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-white/40 group-hover:text-white" />
              </a>
            )}

            {/* 3. Phone Call Button */}
            {showPhone && (
              <a
                id="floating-phone-link"
                href={telUrl}
                className="w-full p-2.5 rounded-sm bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 text-white/80 hover:text-white flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-white">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                      Direct Phone Call
                    </div>
                    <div className="text-[10px] text-white/40 font-mono">
                      {profile.phone}
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-white/40 group-hover:text-white" />
              </a>
            )}

            {/* 4. YouTube Channel */}
            {showYoutube && (
              <a
                id="floating-youtube-link"
                href={youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full p-2.5 rounded-sm bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 text-white/80 hover:text-white flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-sm bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                    <Youtube className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-white group-hover:text-rose-300">
                      YouTube Channel
                    </div>
                    <div className="text-[10px] text-white/40 font-mono">
                      @dakaravines
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-white/40 group-hover:text-white" />
              </a>
            )}
          </div>

          {/* Start Project Direct CTA if provided */}
          {onOpenOrderModal && (
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenOrderModal();
              }}
              className="mt-3 w-full py-2.5 rounded-sm bg-white hover:bg-neutral-200 text-black text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Commission Project</span>
            </button>
          )}

          <div className="mt-2.5 text-center">
            <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">
              Location: {profile.location}
            </span>
          </div>
        </div>
      )}

      {/* Primary Floating Action Trigger Button */}
      <div className="relative group">
        <button
          id="floating-contact-trigger"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-4 py-3 rounded-sm font-mono text-xs font-bold uppercase tracking-wider shadow-2xl transition-all transform hover:scale-105 active:scale-95 ${
            isOpen 
              ? 'bg-white text-black border border-white' 
              : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_25px_rgba(16,185,129,0.4)]'
          }`}
          aria-label="Toggle Contact Hub"
        >
          {isOpen ? (
            <>
              <X className="w-4 h-4" />
              <span>Close</span>
            </>
          ) : (
            <>
              <div className="relative">
                <MessageSquare className="w-4 h-4 fill-black/20" />
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                </span>
              </div>
              <span>Contact</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};
