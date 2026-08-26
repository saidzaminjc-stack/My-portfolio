import React, { useState } from 'react';
import { 
  Mail, 
  MessageSquare, 
  Phone,
  MapPin, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  Github,
  Linkedin,
  Twitter,
  Youtube,
  Instagram,
  Facebook,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Globe
} from 'lucide-react';
import { SiteProfile, SocialLink } from '../types';
import { submitContactMessage } from '../lib/api';
import { getWhatsAppLink, getTelLink, getMailtoLink } from '../lib/contactUtils';

interface ContactProps {
  profile: SiteProfile;
  onOpenOrderModal: () => void;
}

export const Contact: React.FC<ContactProps> = ({ profile, onOpenOrderModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    setError(null);

    const res = await submitContactMessage(formData);
    setSubmitting(false);

    if (res.success) {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      setError(res.error || 'Failed to send message. Please try again or email directly.');
    }
  };

  const whatsappUrl = getWhatsAppLink(profile.whatsappNumber, profile.whatsappDefaultMessage);
  const whatsappProjectUrl = getWhatsAppLink(
    profile.whatsappNumber, 
    profile.whatsappProjectMessage || 'Hello Touseef, I would like to order a website. Here are my project requirements:'
  );
  const mailtoUrl = getMailtoLink(profile.email, profile.emailSubject || 'Project Inquiry', profile.emailDefaultMessage);
  const telUrl = getTelLink(profile.phone);
  const youtubeUrl = profile.youtubeUrl || 'https://www.youtube.com/@dakaravines';

  // Extract enabled social links (filter out disabled or empty)
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
    if (p.includes('mail')) return <Mail className="w-4 h-4" />;
    if (p.includes('phone')) return <Phone className="w-4 h-4" />;
    return <Globe className="w-4 h-4" />;
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-[#0A0A0A] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-emerald-500"></span>
            <span className="text-emerald-500 text-[11px] uppercase tracking-[0.25em] font-semibold">
              Get In Touch & Social Channels
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            CONTACT & <span className="italic font-serif normal-case font-normal text-white/90">Direct Collaboration</span>
          </h2>
          <p className="mt-4 text-base text-white/50 max-w-2xl leading-relaxed">
            Connect directly through WhatsApp, phone, email, or explore my YouTube channel. Send a technical inquiry below or commission a complete project.
          </p>
        </div>

        {/* 4 Modern Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          
          {/* 1. WhatsApp Card */}
          <div className="p-6 rounded-sm bg-white/[0.02] border border-emerald-500/30 hover:border-emerald-500/60 transition-all group flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-sm bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-5 h-5 fill-emerald-500/20" />
              </div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 mb-1">
                WhatsApp
              </h3>
              <p className="text-base font-bold text-white mb-2">
                Chat with me on WhatsApp
              </p>
              <div className="text-xs text-white/50 font-mono mb-6">
                {profile.whatsappNumber || profile.phone}
              </div>
            </div>
            <a
              id="contact-card-whatsapp-btn"
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 px-4 rounded-sm bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-mono font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.25)] transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Message Me</span>
            </a>
          </div>

          {/* 2. Email Card */}
          <div className="p-6 rounded-sm bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all group flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-white mb-4 group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-white/50 mb-1">
                Email
              </h3>
              <p className="text-base font-bold text-white mb-2">
                Send me an email
              </p>
              <div className="text-xs text-white/50 font-mono mb-6 truncate" title={profile.email}>
                {profile.email}
              </div>
            </div>
            <a
              id="contact-card-email-btn"
              href={mailtoUrl}
              className="w-full py-3 px-4 rounded-sm bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10 text-xs font-mono font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Me</span>
            </a>
          </div>

          {/* 3. Phone Card */}
          <div className="p-6 rounded-sm bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all group flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-white mb-4 group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-white/50 mb-1">
                Phone Call
              </h3>
              <p className="text-base font-bold text-white mb-2">
                Call me
              </p>
              <div className="text-xs text-white/50 font-mono mb-6">
                {profile.phone}
              </div>
            </div>
            <a
              id="contact-card-phone-btn"
              href={telUrl}
              className="w-full py-3 px-4 rounded-sm bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10 text-xs font-mono font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Now</span>
            </a>
          </div>

          {/* 4. YouTube Card */}
          <div className="p-6 rounded-sm bg-white/[0.02] border border-rose-500/20 hover:border-rose-500/40 transition-all group flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-sm bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4 group-hover:scale-105 transition-transform">
                <Youtube className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-rose-400 mb-1">
                YouTube
              </h3>
              <p className="text-base font-bold text-white mb-2">
                Follow my YouTube channel
              </p>
              <div className="text-xs text-white/50 font-mono mb-6">
                @dakaravines
              </div>
            </div>
            <a
              id="contact-card-youtube-btn"
              href={youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 px-4 rounded-sm bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-mono font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-all"
            >
              <Youtube className="w-3.5 h-3.5" />
              <span>Visit Channel</span>
            </a>
          </div>

        </div>

        {/* Form and Detailed Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Contact Info & Socials */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Direct Location & Status Card */}
            <div className="p-8 rounded-sm bg-white/[0.02] border border-white/10 space-y-5">
              <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-emerald-400">
                Direct Channels & Coordinates
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-sm bg-white/[0.02] border border-white/5">
                  <div className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-white/60">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-mono tracking-wider text-white/40">Location & Base</div>
                    <div className="text-sm font-semibold text-white">
                      {profile.location || 'Islamabad, Pakistan'}
                    </div>
                  </div>
                </div>

                <a
                  href={whatsappProjectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-3 rounded-sm bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-500/20 transition-all group"
                >
                  <div className="w-10 h-10 rounded-sm bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] uppercase font-mono tracking-wider text-emerald-400">WhatsApp Fast Quote</div>
                    <div className="text-xs font-semibold text-white group-hover:text-emerald-300">
                      Send Project Requirements directly
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Dynamic Social Accounts Manager display */}
              <div className="pt-4 border-t border-white/10">
                <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/50 mb-3">
                  Verified Social Channels
                </div>
                
                {activeSocialLinks.length > 0 ? (
                  <div className="flex flex-wrap gap-2.5">
                    {activeSocialLinks.map((soc) => (
                      <a
                        key={soc.id}
                        href={soc.url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-2.5 rounded-sm bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 hover:border-emerald-500/40 text-xs font-mono flex items-center gap-2 transition-all group"
                        title={soc.label || soc.platform}
                      >
                        <span className="text-emerald-400 group-hover:scale-110 transition-transform">
                          {renderSocialIcon(soc.platform)}
                        </span>
                        <span>{soc.label || soc.platform}</span>
                        <ExternalLink className="w-3 h-3 text-white/30 group-hover:text-white/70" />
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    {profile.youtubeUrl && (
                      <a
                        href={profile.youtubeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 rounded-sm bg-white/5 hover:bg-white/10 text-white/70 hover:text-rose-400 border border-white/10 transition-colors"
                        title="YouTube Channel"
                      >
                        <Youtube className="w-4 h-4" />
                      </a>
                    )}
                    {profile.githubUrl && (
                      <a
                        href={profile.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 rounded-sm bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors"
                        title="GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {profile.linkedinUrl && (
                      <a
                        href={profile.linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 rounded-sm bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors"
                        title="LinkedIn"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Ready to order box */}
            <div className="p-8 rounded-sm bg-white/[0.04] border border-emerald-500/30 text-left">
              <h4 className="text-base font-bold text-white mb-2 uppercase tracking-tight">
                Commission a Custom Project
              </h4>
              <p className="text-xs text-white/50 mb-6 leading-relaxed font-light">
                Configure your required pages, target milestones, and upload design assets with real-time status tracking hash.
              </p>
              <button
                id="contact-commission-project-btn"
                onClick={onOpenOrderModal}
                className="w-full py-3.5 px-4 rounded-sm text-xs font-bold uppercase tracking-wider text-black bg-emerald-500 hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)] flex items-center justify-center gap-2 transition-all"
              >
                <span>Start Project Form</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-sm bg-white/[0.02] border border-white/10 shadow-2xl">
              
              <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">
                Send a Direct Message
              </h3>
              <p className="text-xs text-white/50 mb-8 font-mono">
                Direct transmission. Guaranteed response within 4-12 hours.
              </p>

              {submitted ? (
                <div className="p-8 rounded-sm bg-emerald-950/30 border border-emerald-500/40 text-center space-y-4">
                  <div className="w-12 h-12 rounded-sm bg-emerald-500 text-black flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white uppercase tracking-tight">
                    Message Transmitted Successfully
                  </h4>
                  <p className="text-xs text-white/70 max-w-md mx-auto leading-relaxed font-light">
                    Thank you for reaching out. I have received your message and will review your technical specifications promptly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-sm text-xs font-mono font-bold uppercase tracking-wider text-black bg-white hover:bg-neutral-200"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="p-4 rounded-sm bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                        Your Name <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Smith"
                        className="w-full px-4 py-3 rounded-sm bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500 transition-all placeholder:text-white/20"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                        Email Address <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 rounded-sm bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500 transition-all placeholder:text-white/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Next.js Website Build & E-Commerce Integration"
                      className="w-full px-4 py-3 rounded-sm bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500 transition-all placeholder:text-white/20"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                      Message / Technical Requirements <span className="text-emerald-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline your timeline, desired features, inspirations, or questions..."
                      className="w-full px-4 py-3 rounded-sm bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500 transition-all placeholder:text-white/20 resize-y"
                    ></textarea>
                  </div>

                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-sm text-xs font-bold uppercase tracking-wider text-black bg-emerald-500 hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {submitting ? (
                        <span>Transmitting...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto px-6 py-3.5 rounded-sm text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
