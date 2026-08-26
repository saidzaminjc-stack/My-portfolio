import React, { useState, useRef } from 'react';
import { 
  X, 
  Sparkles, 
  Upload, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  DollarSign, 
  Clock, 
  Layers, 
  ShieldCheck, 
  AlertCircle,
  Copy,
  Check,
  Paperclip,
  Trash2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ClientOrder, OrderAttachment, PricingPackage, Service } from '../types';
import { submitOrder } from '../lib/api';

interface StartProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  packages: PricingPackage[];
  defaultService?: string;
  defaultPackage?: string;
  onOpenClientDashboard: (trackingCode: string) => void;
}

export const StartProjectModal: React.FC<StartProjectModalProps> = ({
  isOpen,
  onClose,
  services,
  packages,
  defaultService,
  defaultPackage,
  onOpenClientDashboard
}) => {
  const [step, setStep] = useState<number>(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<ClientOrder | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    // Client Info
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientCountry: 'United States',
    clientCompany: '',

    // Project Info
    projectType: defaultService || 'Website Development',
    websiteType: '',
    pageCount: '4-7 Pages',
    requiredFeatures: ['Responsive Design', 'SEO Setup', 'Contact Form'] as string[],
    preferredTechnology: 'React / Next.js',
    designPreference: 'Modern, High-Contrast Clean & Sleek',
    existingWebsiteUrl: '',
    referenceWebsites: '',
    projectDescription: '',

    // Budget & Timeline
    selectedPackage: defaultPackage || '',
    customBudget: '',
    currency: '$',
    timeline: '2 Weeks' as 'ASAP' | '1 Week' | '2 Weeks' | '1 Month' | 'Flexible',
    additionalRequirements: '',
    attachments: [] as OrderAttachment[]
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const featureOptions = [
    'Responsive Design (Mobile/Tablet/Desktop)',
    'E-Commerce & Online Store (Cart, Checkout, Stripe)',
    'User Accounts & Authentication Portal',
    'Custom CMS or Blog System',
    'Interactive Animations & 3D/Canvas Elements',
    'Booking & Calendar Scheduling System',
    'SEO Optimization & Schema Structured Data',
    'Multi-Language / Localization',
    'Dark Mode / Light Mode Toggle',
    'CRM & Email Marketing Webhook Integrations',
    'REST / GraphQL API Connections',
    'Google Analytics & Pixel Tracking'
  ];

  const handleFeatureToggle = (feat: string) => {
    setFormData((prev) => {
      const exists = prev.requiredFeatures.includes(feat);
      return {
        ...prev,
        requiredFeatures: exists
          ? prev.requiredFeatures.filter((f) => f !== feat)
          : [...prev.requiredFeatures, feat]
      };
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file: File) => {
      if (file.size > 15 * 1024 * 1024) {
        alert(`File ${file.name} is too large (max 15MB).`);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const newAttachment: OrderAttachment = {
          id: `att-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          name: file.name,
          size: file.size,
          type: file.type || 'file',
          dataUrl: reader.result as string,
          uploadedAt: new Date().toISOString()
        };

        setFormData((prev) => ({
          ...prev,
          attachments: [...prev.attachments, newAttachment]
        }));
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeAttachment = (attId: string) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((a) => a.id !== attId)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.clientEmail) {
      setError('Please fill in your name and email address.');
      setStep(1);
      return;
    }

    setSubmitting(true);
    setError(null);

    const res = await submitOrder(formData);
    setSubmitting(false);

    if (res.success && res.order) {
      setSubmittedOrder(res.order);
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore if not supported
      }
    } else {
      setError(res.error || 'Failed to submit project request. Please try again.');
    }
  };

  const handleCopyCode = () => {
    if (!submittedOrder) return;
    navigator.clipboard.writeText(submittedOrder.trackingCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      
      <div 
        className="relative w-full max-w-3xl bg-[#0A0A0A] border border-white/10 rounded-sm shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 bg-black/90 border-b border-white/10 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-emerald-500 flex items-center justify-center text-black shadow-md font-bold">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold uppercase tracking-tight text-white">Commission Project Order</h2>
              <p className="text-[11px] font-mono text-emerald-400">Detailed requirements & scope intake</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-sm text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          
          {/* Submission Success View */}
          {submittedOrder ? (
            <div className="text-center py-6 space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-sm bg-emerald-500 text-black flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-sm text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-widest">
                  Transmission Confirmed
                </span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-white mt-4 tracking-tight">
                  Project Request Received
                </h3>
                <p className="text-xs sm:text-sm text-white/60 max-w-lg mx-auto mt-2 leading-relaxed font-light">
                  Your project specifications have been cataloged. I will review the architecture requirements and contact you within 4-12 hours.
                </p>
              </div>

              {/* Tracking Code Card */}
              <div className="max-w-md mx-auto p-6 rounded-sm bg-black/60 border border-white/10 shadow-inner">
                <div className="text-[10px] font-mono font-bold text-white/40 mb-1 uppercase tracking-widest">
                  Order Tracking Hash
                </div>
                <div className="flex items-center justify-center gap-3 my-3">
                  <span className="text-2xl sm:text-3xl font-mono font-black text-emerald-400 tracking-widest">
                    {submittedOrder.trackingCode}
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="p-2.5 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors"
                    title="Copy Tracking Code"
                  >
                    {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-white/40 font-mono">
                  Preserve this code to review milestones, inspect status, and exchange messages.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => {
                    onClose();
                    onOpenClientDashboard(submittedOrder.trackingCode);
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-sm text-xs font-bold uppercase tracking-wider text-black bg-emerald-500 hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)] flex items-center justify-center gap-2"
                >
                  <span>Open Client Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-sm text-xs font-bold uppercase tracking-wider text-white hover:text-white bg-white/5 hover:bg-white/10 border border-white/10"
                >
                  Return to Portfolio
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Step Navigation Pill Indicator */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-sm text-xs font-mono font-bold flex items-center justify-center ${step >= 1 ? 'bg-emerald-500 text-black' : 'bg-white/5 text-white/40'}`}>
                    1
                  </span>
                  <span className={`text-xs font-mono uppercase tracking-wider ${step === 1 ? 'text-white font-bold' : 'text-white/40'}`}>
                    Client Info
                  </span>
                </div>
                <div className="h-[1px] w-8 bg-white/10"></div>

                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-sm text-xs font-mono font-bold flex items-center justify-center ${step >= 2 ? 'bg-emerald-500 text-black' : 'bg-white/5 text-white/40'}`}>
                    2
                  </span>
                  <span className={`text-xs font-mono uppercase tracking-wider ${step === 2 ? 'text-white font-bold' : 'text-white/40'}`}>
                    Scope & Features
                  </span>
                </div>
                <div className="h-[1px] w-8 bg-white/10"></div>

                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-sm text-xs font-mono font-bold flex items-center justify-center ${step >= 3 ? 'bg-emerald-500 text-black' : 'bg-white/5 text-white/40'}`}>
                    3
                  </span>
                  <span className={`text-xs font-mono uppercase tracking-wider ${step === 3 ? 'text-white font-bold' : 'text-white/40'}`}>
                    Budget & Assets
                  </span>
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 rounded-sm bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                
                {/* STEP 1: Client Information */}
                {step === 1 && (
                  <div className="space-y-5 animate-in fade-in">
                    <h3 className="text-sm font-mono uppercase tracking-widest text-emerald-400 mb-2">1. Organization & Contact Details</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                          Full Name <span className="text-emerald-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.clientName}
                          onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                          placeholder="e.g. John Smith"
                          className="w-full px-4 py-3 rounded-sm bg-black/60 border border-white/10 text-white text-sm focus:border-emerald-500 focus:outline-none placeholder:text-white/20"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                          Email Address <span className="text-emerald-400">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.clientEmail}
                          onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                          placeholder="john@company.com"
                          className="w-full px-4 py-3 rounded-sm bg-black/60 border border-white/10 text-white text-sm focus:border-emerald-500 focus:outline-none placeholder:text-white/20"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                          WhatsApp / Phone
                        </label>
                        <input
                          type="text"
                          value={formData.clientPhone}
                          onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-4 py-3 rounded-sm bg-black/60 border border-white/10 text-white text-sm focus:border-emerald-500 focus:outline-none placeholder:text-white/20"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                          Country / Region
                        </label>
                        <input
                          type="text"
                          value={formData.clientCountry}
                          onChange={(e) => setFormData({ ...formData, clientCountry: e.target.value })}
                          placeholder="e.g. United States"
                          className="w-full px-4 py-3 rounded-sm bg-black/60 border border-white/10 text-white text-sm focus:border-emerald-500 focus:outline-none placeholder:text-white/20"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                          Company / Business Name
                        </label>
                        <input
                          type="text"
                          value={formData.clientCompany}
                          onChange={(e) => setFormData({ ...formData, clientCompany: e.target.value })}
                          placeholder="Acme Corp (Optional)"
                          className="w-full px-4 py-3 rounded-sm bg-black/60 border border-white/10 text-white text-sm focus:border-emerald-500 focus:outline-none placeholder:text-white/20"
                        />
                      </div>
                    </div>

                    <div className="pt-6 flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          if (!formData.clientName || !formData.clientEmail) {
                            setError('Please enter your full name and email to proceed.');
                            return;
                          }
                          setError(null);
                          setStep(2);
                        }}
                        className="px-8 py-3.5 rounded-sm text-xs font-bold uppercase tracking-wider text-black bg-emerald-500 hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)] flex items-center gap-2"
                      >
                        <span>Next: Project Scope</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Project Scope & Specifications */}
                {step === 2 && (
                  <div className="space-y-5 animate-in fade-in">
                    <h3 className="text-sm font-mono uppercase tracking-widest text-emerald-400 mb-2">2. Architecture & Required Features</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                          Project Type
                        </label>
                        <select
                          value={formData.projectType}
                          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                          className="w-full px-4 py-3 rounded-sm bg-black/60 border border-white/10 text-white text-sm focus:border-emerald-500 focus:outline-none"
                        >
                          {services.map((s) => (
                            <option key={s.id} value={s.title}>{s.title}</option>
                          ))}
                          <option value="Custom Web Application">Custom Web Application</option>
                          <option value="Other Specialized Solution">Other Specialized Solution</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                          Estimated Page Count
                        </label>
                        <select
                          value={formData.pageCount}
                          onChange={(e) => setFormData({ ...formData, pageCount: e.target.value })}
                          className="w-full px-4 py-3 rounded-sm bg-black/60 border border-white/10 text-white text-sm focus:border-emerald-500 focus:outline-none"
                        >
                          <option value="Single Landing Page (1 Page)">Single Landing Page (1 Page)</option>
                          <option value="Starter (2-4 Pages)">Starter (2-4 Pages)</option>
                          <option value="Standard Business (5-8 Pages)">Standard Business (5-8 Pages)</option>
                          <option value="Full Portal / Store (9-15 Pages)">Full Portal / Store (9-15 Pages)</option>
                          <option value="Large Web Platform (15+ Pages)">Large Web Platform (15+ Pages)</option>
                        </select>
                      </div>
                    </div>

                    {/* Preferred Tech & Design Preference */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                          Preferred Technology Stack
                        </label>
                        <select
                          value={formData.preferredTechnology}
                          onChange={(e) => setFormData({ ...formData, preferredTechnology: e.target.value })}
                          className="w-full px-4 py-3 rounded-sm bg-black/60 border border-white/10 text-white text-sm focus:border-emerald-500 focus:outline-none"
                        >
                          <option value="React / Next.js (Recommended for speed & modern UI)">React / Next.js (Recommended for speed & modern UI)</option>
                          <option value="WordPress / WooCommerce (Easy client editing)">WordPress / WooCommerce (Easy client editing)</option>
                          <option value="HTML5 / Modern JavaScript / Tailwind">HTML5 / Modern JavaScript / Tailwind</option>
                          <option value="Developer's Choice (Best for project goals)">Developer's Choice (Best for project goals)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                          Design Aesthetic Direction
                        </label>
                        <input
                          type="text"
                          value={formData.designPreference}
                          onChange={(e) => setFormData({ ...formData, designPreference: e.target.value })}
                          placeholder="e.g. Minimalist Dark, Luxury Editorial, Clean Tech"
                          className="w-full px-4 py-3 rounded-sm bg-black/60 border border-white/10 text-white text-sm focus:border-emerald-500 focus:outline-none placeholder:text-white/20"
                        />
                      </div>
                    </div>

                    {/* URLs & Reference Sites */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                          Existing Website URL (if redesign)
                        </label>
                        <input
                          type="text"
                          value={formData.existingWebsiteUrl}
                          onChange={(e) => setFormData({ ...formData, existingWebsiteUrl: e.target.value })}
                          placeholder="https://yoursite.com"
                          className="w-full px-4 py-3 rounded-sm bg-black/60 border border-white/10 text-white text-sm focus:border-emerald-500 focus:outline-none placeholder:text-white/20"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                          Reference Websites You Admire
                        </label>
                        <input
                          type="text"
                          value={formData.referenceWebsites}
                          onChange={(e) => setFormData({ ...formData, referenceWebsites: e.target.value })}
                          placeholder="e.g. stripe.com, linear.app, vercel.com"
                          className="w-full px-4 py-3 rounded-sm bg-black/60 border border-white/10 text-white text-sm focus:border-emerald-500 focus:outline-none placeholder:text-white/20"
                        />
                      </div>
                    </div>

                    {/* Required Features Checklist */}
                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                        Select Required Functional Modules:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-4 rounded-sm bg-black/60 border border-white/10">
                        {featureOptions.map((feat) => {
                          const checked = formData.requiredFeatures.includes(feat);
                          return (
                            <label
                              key={feat}
                              className={`flex items-start gap-2.5 p-2 rounded-sm text-xs cursor-pointer transition-colors ${
                                checked ? 'bg-emerald-500/10 text-white border border-emerald-500/30' : 'text-white/60 hover:bg-white/5'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => handleFeatureToggle(feat)}
                                className="rounded-sm bg-black border-white/20 text-emerald-500 focus:ring-emerald-500 mt-0.5"
                              />
                              <span>{feat}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {/* Project Description */}
                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                        Project Overview & Key Objectives <span className="text-emerald-400">*</span>
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={formData.projectDescription}
                        onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                        placeholder="Describe your organization, target audience, conversion goals, and architectural scope..."
                        className="w-full px-4 py-3 rounded-sm bg-black/60 border border-white/10 text-white text-sm focus:border-emerald-500 focus:outline-none placeholder:text-white/20 resize-y"
                      ></textarea>
                    </div>

                    <div className="pt-6 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-6 py-3.5 rounded-sm text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white bg-white/5 flex items-center gap-1.5"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="px-8 py-3.5 rounded-sm text-xs font-bold uppercase tracking-wider text-black bg-emerald-500 hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)] flex items-center gap-2"
                      >
                        <span>Next: Budget & Files</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Budget, Timeline & Files */}
                {step === 3 && (
                  <div className="space-y-5 animate-in fade-in">
                    <h3 className="text-sm font-mono uppercase tracking-widest text-emerald-400 mb-2">3. Investment, Timeline & Asset Ingestion</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                          Select Package or Custom
                        </label>
                        <select
                          value={formData.selectedPackage}
                          onChange={(e) => setFormData({ ...formData, selectedPackage: e.target.value })}
                          className="w-full px-4 py-3 rounded-sm bg-black/60 border border-white/10 text-white text-sm focus:border-emerald-500 focus:outline-none"
                        >
                          <option value="">Custom Budget (Specify below)</option>
                          {packages.map((pkg) => (
                            <option key={pkg.id} value={pkg.name}>
                              {pkg.name} ({pkg.currency}{pkg.price})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                          Custom Budget Range (if not package)
                        </label>
                        <input
                          type="text"
                          value={formData.customBudget}
                          onChange={(e) => setFormData({ ...formData, customBudget: e.target.value })}
                          placeholder="e.g. $1,000 - $2,500"
                          className="w-full px-4 py-3 rounded-sm bg-black/60 border border-white/10 text-white text-sm focus:border-emerald-500 focus:outline-none placeholder:text-white/20"
                        />
                      </div>
                    </div>

                    {/* Timeline */}
                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                        Target Delivery Horizon
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {(['ASAP', '1 Week', '2 Weeks', '1 Month', 'Flexible'] as const).map((t) => (
                          <button
                            type="button"
                            key={t}
                            onClick={() => setFormData({ ...formData, timeline: t })}
                            className={`py-3 px-3 rounded-sm text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                              formData.timeline === t
                                ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                                : 'bg-black/60 text-white/50 border border-white/10 hover:text-white'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* File Upload Zone */}
                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                        Upload Project Assets (Brand identity, Figma links, PDFs, wireframes)
                      </label>
                      
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="p-8 rounded-sm bg-black/60 border border-dashed border-white/20 hover:border-emerald-500/60 transition-colors cursor-pointer text-center group"
                      >
                        <input
                          type="file"
                          ref={fileInputRef}
                          multiple
                          accept="image/*,.pdf,.doc,.docx,.zip,.fig,.xd"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <Upload className="w-8 h-8 text-white/30 group-hover:text-emerald-400 mx-auto mb-2 transition-colors" />
                        <div className="text-xs font-bold uppercase tracking-wider text-white">
                          Select or Drop Assets Here
                        </div>
                        <div className="text-[10px] text-white/40 font-mono mt-1">
                          PNG, JPG, SVG, PDF, DOCX, ZIP (Max 15MB each)
                        </div>
                      </div>

                      {/* Uploaded files list */}
                      {formData.attachments.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {formData.attachments.map((att) => (
                            <div
                              key={att.id}
                              className="flex items-center justify-between p-3 rounded-sm bg-white/[0.02] border border-white/10 text-xs"
                            >
                              <div className="flex items-center gap-2 overflow-hidden">
                                <Paperclip className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                <span className="text-white truncate">{att.name}</span>
                                <span className="text-[10px] text-white/40 font-mono">
                                  ({(att.size / 1024).toFixed(0)} KB)
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeAttachment(att.id)}
                                className="p-1 text-white/40 hover:text-rose-400"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Additional Requirements */}
                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                        Specialized Integrations & Notes
                      </label>
                      <textarea
                        rows={2}
                        value={formData.additionalRequirements}
                        onChange={(e) => setFormData({ ...formData, additionalRequirements: e.target.value })}
                        placeholder="Any additional specific features, third-party APIs, or preferences..."
                        className="w-full px-4 py-3 rounded-sm bg-black/60 border border-white/10 text-white text-sm focus:border-emerald-500 focus:outline-none placeholder:text-white/20 resize-y"
                      ></textarea>
                    </div>

                    <div className="pt-6 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-6 py-3.5 rounded-sm text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white bg-white/5 flex items-center gap-1.5"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="px-8 py-3.5 rounded-sm text-xs font-bold uppercase tracking-wider text-black bg-emerald-500 hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)] flex items-center gap-2 disabled:opacity-50"
                      >
                        {submitting ? (
                          <span>Processing Request...</span>
                        ) : (
                          <>
                            <Check className="w-4 h-4 text-black" />
                            <span>Confirm & Transmit Order</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

              </form>
            </div>
          )}

        </div>

      </div>
    </div>

  );
};
