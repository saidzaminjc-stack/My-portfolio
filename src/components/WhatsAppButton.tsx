import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { SiteProfile } from '../types';

interface WhatsAppButtonProps {
  profile: SiteProfile;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ profile }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const cleanNumber = profile.whatsappNumber.replace(/[^0-9]/g, '');
  const message = encodeURIComponent(
    profile.whatsappDefaultMessage || 'Hello, I found your portfolio and would like to discuss a website project.'
  );
  const waUrl = `https://wa.me/${cleanNumber}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Interactive Tooltip Card */}
      {showTooltip && (
        <div className="mb-3 w-72 p-4 rounded-sm bg-[#0A0A0A] border border-white/10 shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-start justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="relative">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-sm object-cover"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black"></span>
              </div>
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-tight">{profile.name}</div>
                <div className="text-[10px] text-emerald-400 font-mono">Available for consultation</div>
              </div>
            </div>

            <button
              onClick={() => setShowTooltip(false)}
              className="text-white/40 hover:text-white p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs text-white/60 my-3 leading-relaxed font-light">
            Have a question about your custom website build or need an immediate quote? Connect directly on WhatsApp.
          </p>

          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 px-3 rounded-sm bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.25)] transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Open WhatsApp</span>
          </a>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="relative group">
        <a
          id="floating-whatsapp-btn"
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          onMouseEnter={() => setShowTooltip(true)}
          className="w-13 h-13 rounded-sm bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all transform hover:scale-105 active:scale-95"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="w-6 h-6 fill-black/20" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 border border-black"></span>
          </span>
        </a>
      </div>

    </div>
  );
};
