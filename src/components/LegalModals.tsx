import React from 'react';
import { X, Shield, FileText, CheckCircle2 } from 'lucide-react';
import { SiteProfile } from '../types';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
  profile: SiteProfile;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose, profile }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      
      <div 
        className="relative w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-sm shadow-2xl overflow-hidden my-8 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 bg-black/90 border-b border-white/10 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-emerald-500 flex items-center justify-center text-black font-bold">
              {type === 'privacy' ? <Shield className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
            </div>
            <h3 className="text-base font-bold uppercase tracking-tight text-white">
              {type === 'privacy' ? 'Privacy Policy & Data Security' : 'Terms & Conditions of Service'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-sm text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-xs sm:text-sm text-white/70 leading-relaxed font-light">
          {type === 'privacy' ? (
            <>
              <p className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">Policy Specification • Updated 2026</p>
              
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white mt-4">1. Ingested Data & Telemetry</h4>
              <p>
                When you submit a project request or contact inquiry through {profile.name}'s portal, we collect the telemetry you provide, including your name, email address, phone number, company name, project specifications, and uploaded brand assets.
              </p>

              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white mt-4">2. Utilization Protocol</h4>
              <p>
                We use the information collected solely to review your project scope, deliver tailored estimates, provide web development services, update milestone progress, and communicate about active deliverables.
              </p>

              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white mt-4">3. Data Confidentiality & Protection</h4>
              <p>
                We do not sell, rent, or trade your personal or business data to third parties. All proprietary assets, source code, and project documentation remain strictly confidential.
              </p>

              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white mt-4">4. Direct Inquiries</h4>
              <p>
                If you have questions regarding this privacy policy or your stored information, contact {profile.email}.
              </p>
            </>
          ) : (
            <>
              <p className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">Service Terms • Updated 2026</p>

              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white mt-4">1. Scope of Development Work</h4>
              <p>
                All web development projects are executed based on the finalized and agreed-upon scope of work, milestone schedule, and project package specifications.
              </p>

              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white mt-4">2. Code Ownership & Intellectual Property</h4>
              <p>
                Upon receipt of full and final payment for the project, 100% intellectual property ownership of the custom code, design files, and digital deliverables is transferred directly to the client.
              </p>

              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white mt-4">3. Payment & Milestone Schedules</h4>
              <p>
                Standard projects require a 50% kickoff deposit to secure the development timeline, with the remaining 50% balance settled upon final staging approval prior to production domain launch.
              </p>

              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white mt-4">4. Post-Launch Warranty & Support</h4>
              <p>
                Every completed project includes 30 days of complimentary technical warranty support to ensure zero bugs and seamless operation in production.
              </p>
            </>
          )}

          <div className="pt-6 border-t border-white/10 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs uppercase tracking-wider"
            >
              Acknowledge & Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
