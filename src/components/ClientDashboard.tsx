import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Search, 
  CheckCircle2, 
  Clock, 
  Send, 
  Paperclip, 
  Upload, 
  Download, 
  FileText, 
  DollarSign, 
  Calendar, 
  Layers, 
  MessageSquare, 
  ShieldCheck, 
  AlertCircle,
  ChevronRight,
  ExternalLink,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { ClientOrder, OrderAttachment, OrderMessage } from '../types';
import { trackOrder, sendOrderMessage, uploadOrderAttachment } from '../lib/api';

interface ClientDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  initialTrackingCode?: string;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({
  isOpen,
  onClose,
  initialTrackingCode
}) => {
  const [identifier, setIdentifier] = useState(initialTrackingCode || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [currentOrder, setCurrentOrder] = useState<ClientOrder | null>(null);
  const [allOrders, setAllOrders] = useState<ClientOrder[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'milestones' | 'messages' | 'files' | 'invoices'>('overview');

  // New message state
  const [newMessage, setNewMessage] = useState('');
  const [sendingMsg, setSendingMsg] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-search if initial tracking code passed
  useEffect(() => {
    if (initialTrackingCode && isOpen) {
      setIdentifier(initialTrackingCode);
      handleTrack(initialTrackingCode);
    }
  }, [initialTrackingCode, isOpen]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (activeTab === 'messages') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeTab, currentOrder?.messages]);

  if (!isOpen) return null;

  const handleTrack = async (searchId?: string) => {
    const code = (searchId || identifier).trim();
    if (!code) {
      setError('Please enter your tracking code or email address.');
      return;
    }

    setLoading(true);
    setError(null);

    const res = await trackOrder(code);
    setLoading(false);

    if (res.success && res.order) {
      setCurrentOrder(res.order);
      setAllOrders(res.allOrders || [res.order]);
    } else {
      setError(res.error || 'No project order found with this tracking code or email.');
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentOrder || !newMessage.trim()) return;

    setSendingMsg(true);
    const res = await sendOrderMessage(currentOrder.id, {
      sender: 'client',
      senderName: currentOrder.clientName,
      content: newMessage.trim()
    });
    setSendingMsg(false);

    if (res.success && res.order) {
      setCurrentOrder(res.order);
      setNewMessage('');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !currentOrder) return;

    const file = files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      const res = await uploadOrderAttachment(currentOrder.id, {
        name: file.name,
        size: file.size,
        type: file.type,
        dataUrl: reader.result as string
      });

      if (res.success && res.order) {
        setCurrentOrder(res.order);
      }
    };
    reader.readAsDataURL(file);
  };

  const statuses = ['New', 'Reviewing', 'Approved', 'In Progress', 'Review', 'Completed'] as const;
  const currentStatusIndex = currentOrder ? statuses.indexOf(currentOrder.status) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      
      <div 
        className="relative w-full max-w-5xl bg-[#0A0A0A] border border-white/10 rounded-sm shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dashboard Header */}
        <div className="flex items-center justify-between px-8 py-5 bg-black/90 border-b border-white/10 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-emerald-500 flex items-center justify-center text-black shadow-md font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold uppercase tracking-tight text-white">Client Portal & Order Hub</h2>
                {currentOrder && (
                  <span className="px-2.5 py-0.5 rounded-sm text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {currentOrder.trackingCode}
                  </span>
                )}
              </div>
              <p className="text-[11px] font-mono text-emerald-400">Track project milestones, messages, and invoices</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {currentOrder && (
              <button
                onClick={() => setCurrentOrder(null)}
                className="text-xs font-mono uppercase tracking-wider text-white/50 hover:text-white px-3 py-1.5 rounded-sm bg-white/5 hover:bg-white/10 transition-colors hidden sm:block border border-white/10"
              >
                Switch Order
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-sm text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          
          {/* LOGIN / TRACKING LOOKUP VIEW */}
          {!currentOrder ? (
            <div className="max-w-md mx-auto py-10 text-center space-y-6">
              <div className="w-16 h-16 rounded-sm bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto shadow-inner">
                <Search className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">Access Project Portal</h3>
                <p className="text-xs sm:text-sm text-white/60 mt-2 font-light">
                  Enter your Order Hash (e.g. <strong className="text-emerald-400 font-mono">ORD-89214</strong>) or associated client email.
                </p>
              </div>

              {error && (
                <div className="p-4 rounded-sm bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2 text-left font-mono">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={(e) => { e.preventDefault(); handleTrack(); }} className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Enter Hash (ORD-...) or Email"
                    className="w-full pl-4 pr-10 py-3.5 rounded-sm bg-black/60 border border-white/10 text-white text-sm focus:border-emerald-500 focus:outline-none placeholder:text-white/20 font-mono"
                  />
                  <Search className="w-4 h-4 text-white/40 absolute right-4 top-4" />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-sm text-xs font-bold uppercase tracking-wider text-black bg-emerald-500 hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Verifying telemetry...</span>
                  ) : (
                    <>
                      <span>Open Workspace</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Sample quick login demo pill */}
              <div className="pt-6 border-t border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-3">Load Demo Telemetry Orders</span>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setIdentifier('ORD-89214');
                      handleTrack('ORD-89214');
                    }}
                    className="px-3 py-1.5 rounded-sm bg-white/5 hover:bg-white/10 text-[10px] font-mono text-emerald-400 border border-white/10 uppercase tracking-wider"
                  >
                    ORD-89214 (In Progress)
                  </button>
                  <button
                    onClick={() => {
                      setIdentifier('ORD-94301');
                      handleTrack('ORD-94301');
                    }}
                    className="px-3 py-1.5 rounded-sm bg-white/5 hover:bg-white/10 text-[10px] font-mono text-emerald-400 border border-white/10 uppercase tracking-wider"
                  >
                    ORD-94301 (New)
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ACTIVE ORDER DASHBOARD VIEW */
            <div className="space-y-6">
              
              {/* Order Status Progress Pipeline */}
              <div className="p-6 rounded-sm bg-black/60 border border-white/10 shadow-inner">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">Execution Pipeline Status:</span>
                    <h3 className="text-lg font-black uppercase tracking-tight text-white flex items-center gap-2 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      {currentOrder.status}
                    </h3>
                  </div>
                  <div className="text-[11px] font-mono text-white/40">
                    Telemetry updated: {new Date(currentOrder.updatedAt).toLocaleDateString()}
                  </div>
                </div>

                {/* Stepper Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                  {statuses.map((st, idx) => {
                    const isDone = idx < currentStatusIndex;
                    const isCurrent = idx === currentStatusIndex;

                    return (
                      <div
                        key={st}
                        className={`p-3 rounded-sm border text-center transition-all ${
                          isCurrent
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                            : isDone
                            ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
                            : 'bg-white/[0.02] border-white/5 text-white/30'
                        }`}
                      >
                        <div className="text-[9px] font-mono uppercase tracking-widest mb-1">0{idx + 1}</div>
                        <div className="text-xs uppercase font-mono truncate">{st}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 rounded-sm text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                    activeTab === 'overview' ? 'bg-emerald-500 text-black font-bold' : 'text-white/50 hover:text-white bg-white/5'
                  }`}
                >
                  Overview & Specs
                </button>
                <button
                  onClick={() => setActiveTab('milestones')}
                  className={`px-4 py-2 rounded-sm text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'milestones' ? 'bg-emerald-500 text-black font-bold' : 'text-white/50 hover:text-white bg-white/5'
                  }`}
                >
                  <span>Milestones</span>
                  <span className={`px-1.5 py-0.2 rounded-sm text-[10px] ${activeTab === 'milestones' ? 'bg-black/20 text-black' : 'bg-white/10'}`}>
                    {currentOrder.milestones.filter(m => m.status === 'completed').length}/{currentOrder.milestones.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`px-4 py-2 rounded-sm text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'messages' ? 'bg-emerald-500 text-black font-bold' : 'text-white/50 hover:text-white bg-white/5'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Messages</span>
                  <span className={`px-1.5 py-0.2 rounded-sm text-[10px] ${activeTab === 'messages' ? 'bg-black/20 text-black' : 'bg-white/10'}`}>
                    {currentOrder.messages.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('files')}
                  className={`px-4 py-2 rounded-sm text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'files' ? 'bg-emerald-500 text-black font-bold' : 'text-white/50 hover:text-white bg-white/5'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Assets</span>
                  <span className={`px-1.5 py-0.2 rounded-sm text-[10px] ${activeTab === 'files' ? 'bg-black/20 text-black' : 'bg-white/10'}`}>
                    {currentOrder.attachments.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('invoices')}
                  className={`px-4 py-2 rounded-sm text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'invoices' ? 'bg-emerald-500 text-black font-bold' : 'text-white/50 hover:text-white bg-white/5'
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Financial</span>
                </button>
              </div>

              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Project Specifications */}
                    <div className="p-6 rounded-sm bg-white/[0.02] border border-white/10">
                      <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-emerald-400" />
                        <span>Project Architecture</span>
                      </h4>
                      <div className="space-y-3 text-xs">
                        <div className="flex justify-between py-2 border-b border-white/10">
                          <span className="text-white/50 font-mono">Project Type:</span>
                          <span className="font-semibold text-white">{currentOrder.projectType}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-white/10">
                          <span className="text-white/50 font-mono">Page Footprint:</span>
                          <span className="font-semibold text-white">{currentOrder.pageCount}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-white/10">
                          <span className="text-white/50 font-mono">Core Stack:</span>
                          <span className="font-semibold text-white">{currentOrder.preferredTechnology}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-white/10">
                          <span className="text-white/50 font-mono">Design Style:</span>
                          <span className="font-semibold text-white">{currentOrder.designPreference}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-white/10">
                          <span className="text-white/50 font-mono">Target Timeline:</span>
                          <span className="font-semibold font-mono text-emerald-400">{currentOrder.timeline}</span>
                        </div>
                        {currentOrder.deadline && (
                          <div className="flex justify-between py-2 border-b border-white/10">
                            <span className="text-white/50 font-mono">Delivery Milestone:</span>
                            <span className="font-semibold font-mono text-emerald-400">{currentOrder.deadline}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Client & Description */}
                    <div className="p-6 rounded-sm bg-white/[0.02] border border-white/10">
                      <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-4">Client Telemetry & Objectives</h4>
                      <div className="space-y-3 text-xs mb-4">
                        <div className="flex justify-between py-2 border-b border-white/10">
                          <span className="text-white/50 font-mono">Client Name:</span>
                          <span className="font-semibold text-white">{currentOrder.clientName}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-white/10">
                          <span className="text-white/50 font-mono">Email:</span>
                          <span className="font-semibold text-white">{currentOrder.clientEmail}</span>
                        </div>
                        {currentOrder.clientCompany && (
                          <div className="flex justify-between py-2 border-b border-white/10">
                            <span className="text-white/50 font-mono">Company:</span>
                            <span className="font-semibold text-white">{currentOrder.clientCompany}</span>
                          </div>
                        )}
                      </div>

                      <div className="p-4 rounded-sm bg-black/60 border border-white/10 text-xs">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 block mb-1">Project Scope Summary:</span>
                        <p className="text-white/70 leading-relaxed font-light">{currentOrder.projectDescription || 'No initial description provided.'}</p>
                      </div>
                    </div>

                  </div>

                  {/* Required Features Chips */}
                  {currentOrder.requiredFeatures && currentOrder.requiredFeatures.length > 0 && (
                    <div className="p-6 rounded-sm bg-white/[0.02] border border-white/10">
                      <h4 className="text-[10px] font-mono uppercase tracking-widest text-white/50 mb-3">
                        Included Functional Modules
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {currentOrder.requiredFeatures.map((feat) => (
                          <span
                            key={feat}
                            className="px-3 py-1.5 rounded-sm bg-black/60 border border-white/10 text-xs text-white/80 flex items-center gap-2"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{feat}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: MILESTONES */}
              {activeTab === 'milestones' && (
                <div className="space-y-4 animate-in fade-in">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-2">Project Execution Milestones</h4>
                  
                  <div className="space-y-3">
                    {currentOrder.milestones.map((ms, idx) => (
                      <div
                        key={ms.id}
                        className={`p-5 rounded-sm border flex items-start gap-4 ${
                          ms.status === 'completed'
                            ? 'bg-emerald-500/5 border-emerald-500/30'
                            : ms.status === 'in-progress'
                            ? 'bg-emerald-500/10 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                            : 'bg-white/[0.02] border-white/10'
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-sm flex items-center justify-center shrink-0 mt-0.5 ${
                          ms.status === 'completed'
                            ? 'bg-emerald-500 text-black font-bold'
                            : ms.status === 'in-progress'
                            ? 'bg-emerald-500 text-black animate-pulse font-bold'
                            : 'bg-white/10 text-white/40'
                        }`}>
                          {ms.status === 'completed' ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            <span className="font-mono text-xs font-bold">{idx + 1}</span>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h5 className="text-sm font-bold uppercase tracking-tight text-white">{ms.title}</h5>
                            <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-sm ${
                              ms.status === 'completed'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                : ms.status === 'in-progress'
                                ? 'bg-emerald-500 text-black'
                                : 'bg-white/5 text-white/40'
                            }`}>
                              {ms.status}
                            </span>
                          </div>
                          <p className="text-xs text-white/60 mt-1 leading-relaxed font-light">{ms.description}</p>
                          {ms.completedAt && (
                            <div className="text-[10px] font-mono text-emerald-400 mt-1">
                              Completed on {ms.completedAt}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: MESSAGES & COMMUNICATIONS */}
              {activeTab === 'messages' && (
                <div className="p-5 rounded-sm bg-black/60 border border-white/10 flex flex-col h-[480px] animate-in fade-in">
                  
                  {/* Messages Feed */}
                  <div className="flex-1 overflow-y-auto space-y-3 p-2">
                    {currentOrder.messages.map((msg) => {
                      const isClient = msg.sender === 'client';
                      return (
                        <div
                          key={msg.id}
                          className={`flex flex-col ${isClient ? 'items-end' : 'items-start'}`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">
                              {msg.senderName} {isClient ? '(You)' : '(Developer)'}
                            </span>
                            <span className="text-[9px] font-mono text-white/30">
                              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>

                          <div
                            className={`p-3.5 rounded-sm max-w-lg text-xs leading-relaxed ${
                              isClient
                                ? 'bg-emerald-500 text-black font-medium'
                                : 'bg-white/5 border border-white/10 text-white'
                            }`}
                          >
                            {msg.content}
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input Box */}
                  <form onSubmit={handleSendMessage} className="pt-4 border-t border-white/10 flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a communication or inquiry..."
                      className="flex-1 px-4 py-3 rounded-sm bg-black border border-white/10 text-white text-xs focus:border-emerald-500 focus:outline-none placeholder:text-white/20"
                    />
                    <button
                      type="submit"
                      disabled={sendingMsg || !newMessage.trim()}
                      className="px-5 py-3 rounded-sm text-xs font-bold uppercase tracking-wider text-black bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit</span>
                    </button>
                  </form>

                </div>
              )}

              {/* TAB 4: FILES & ATTACHMENTS */}
              {activeTab === 'files' && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-tight text-white">Project Assets & Schematics</h4>
                      <p className="text-xs text-white/50 font-mono">Upload logos, brand guidelines, or wireframes</p>
                    </div>

                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider text-black bg-emerald-500 hover:bg-emerald-400 flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Ingest Asset</span>
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>

                  {currentOrder.attachments.length === 0 ? (
                    <div className="p-8 rounded-sm bg-black/60 border border-white/10 text-center text-xs text-white/40 font-mono">
                      No assets cataloged. Use the button above to upload brand assets or documents.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentOrder.attachments.map((att) => (
                        <div
                          key={att.id}
                          className="p-4 rounded-sm bg-white/[0.02] border border-white/10 flex items-center justify-between gap-3 text-xs"
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-8 h-8 rounded-sm bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div className="overflow-hidden">
                              <div className="font-semibold text-white truncate">{att.name}</div>
                              <div className="text-[10px] text-white/40 font-mono">
                                {(att.size / 1024).toFixed(0)} KB • {new Date(att.uploadedAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>

                          {att.dataUrl && att.dataUrl !== '#' && (
                            <a
                              href={att.dataUrl}
                              download={att.name}
                              className="p-2 rounded-sm bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
                              title="Download Asset"
                            >
                              <Download className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: INVOICES & PAYMENTS */}
              {activeTab === 'invoices' && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="p-6 rounded-sm bg-black/60 border border-white/10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                      <div>
                        <div className="text-[10px] uppercase font-mono tracking-widest text-white/50">Agreed Project Investment</div>
                        <div className="text-3xl font-mono font-black text-white mt-1">
                          {currentOrder.currency}{currentOrder.agreedPrice || 1250}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-white/50 font-mono">Status:</span>
                        <span className={`px-3 py-1 rounded-sm text-[10px] font-mono font-bold uppercase tracking-widest ${
                          currentOrder.paymentStatus === 'Fully Paid'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : currentOrder.paymentStatus === 'Deposit Paid'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        }`}>
                          {currentOrder.paymentStatus}
                        </span>
                      </div>
                    </div>

                    <div className="pt-6 space-y-3 text-xs text-white/70 font-mono">
                      <div className="flex justify-between py-1">
                        <span>Invoice Reference:</span>
                        <span className="font-bold text-white">INV-{currentOrder.trackingCode.replace('ORD-', '')}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Payment Terms:</span>
                        <span className="text-white">50% Kickoff Deposit / 50% Upon Final Launch Approval</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Settlement Channels:</span>
                        <span className="text-white">Stripe, Bank Wire / ACH, Wise, PayPal</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
