import React from 'react';
import { 
  Youtube, 
  Play, 
  ExternalLink, 
  CheckCircle2, 
  Tv, 
  Layers, 
  ArrowRight,
  Code2,
  Sparkles
} from 'lucide-react';
import { SiteProfile } from '../types';

interface YouTubeShowcaseProps {
  profile: SiteProfile;
}

export const YouTubeShowcase: React.FC<YouTubeShowcaseProps> = ({ profile }) => {
  // If explicitly disabled in admin profile
  if (profile.showYoutubeSection === false || !profile.youtubeUrl) {
    return null;
  }

  const channelUrl = profile.youtubeUrl || 'https://www.youtube.com/@dakaravines';
  const featuredVideoId = profile.youtubeFeaturedVideoId || 'dQw4w9WgXcQ';
  const title = profile.youtubeShowcaseTitle || 'Web Engineering & Architecture Tutorials';
  const description = profile.youtubeShowcaseDescription || 'Subscribe to my YouTube channel (@dakaravines) for in-depth tutorials on Next.js, React architecture, database performance, and building production web applications.';

  const featuredTopics = [
    'Full-Stack Next.js 15 & React 19 Architecture',
    'High-Converting E-Commerce & Stripe Integrations',
    'Tailwind CSS & Editorial Motion Design Systems',
    'Production Server Deployments & Cloud Run'
  ];

  return (
    <section id="youtube" className="py-20 lg:py-28 bg-black/60 relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[1px] w-8 bg-rose-500"></span>
              <span className="text-rose-500 text-[11px] uppercase tracking-[0.25em] font-semibold flex items-center gap-1.5">
                <Youtube className="w-3.5 h-3.5" />
                <span>Media & Knowledge Base</span>
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
              YOUTUBE <span className="italic font-serif normal-case font-normal text-white/90">Channel & Tutorials</span>
            </h2>
          </div>

          <a
            href={channelUrl}
            target="_blank"
            rel="noreferrer"
            className="self-start md:self-auto px-6 py-3 rounded-sm bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(225,29,72,0.3)] transition-all"
          >
            <Youtube className="w-4 h-4" />
            <span>Visit @dakaravines</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Video Embed / Player Frame */}
          <div className="lg:col-span-7">
            <div className="relative rounded-sm overflow-hidden border border-white/15 bg-[#0A0A0A] shadow-2xl group">
              <div className="aspect-video w-full bg-neutral-900 relative">
                {featuredVideoId ? (
                  <iframe
                    className="w-full h-full border-0"
                    src={`https://www.youtube-nocookie.com/embed/${featuredVideoId}?rel=0`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                    <Youtube className="w-16 h-16 text-rose-500/80 mb-3" />
                    <div className="text-white font-bold text-base uppercase">Watch on YouTube</div>
                    <div className="text-white/50 text-xs font-mono mt-1">@dakaravines</div>
                  </div>
                )}
              </div>
              
              {/* Lower bar */}
              <div className="p-4 bg-black/90 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-white/70">
                  <Tv className="w-3.5 h-3.5 text-rose-400" />
                  <span>Featured Video Broadcast</span>
                </div>
                <a
                  href={channelUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-rose-400 hover:text-rose-300 font-mono flex items-center gap-1"
                >
                  <span>Subscribe on YouTube</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Channel Highlights & Topics */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-sm bg-white/[0.02] border border-white/10">
              <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-3">
                {title}
              </h3>
              <p className="text-xs text-white/60 font-light leading-relaxed mb-6">
                {description}
              </p>

              <div className="space-y-3 pt-2 border-t border-white/10">
                <div className="text-[10px] font-mono uppercase text-white/40 tracking-wider">
                  Featured Topic Modules
                </div>
                {featuredTopics.map((topic, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-white/80">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-4">
                <a
                  href={channelUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 px-4 rounded-sm bg-white hover:bg-neutral-200 text-black text-xs font-mono font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-colors"
                >
                  <Youtube className="w-4 h-4 text-rose-600" />
                  <span>Explore Channel</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
