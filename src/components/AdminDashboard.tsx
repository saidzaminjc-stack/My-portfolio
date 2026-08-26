import React, { useState, useEffect } from 'react';
import { 
  X, 
  Shield, 
  Lock, 
  Check, 
  Trash2, 
  Edit, 
  Plus, 
  Layers, 
  Users, 
  ShoppingBag, 
  Settings, 
  Search, 
  DollarSign, 
  Cpu, 
  Star, 
  MessageSquare, 
  Globe, 
  Phone, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  RefreshCw,
  Eye,
  FileText,
  Send,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { AppStateData, ClientOrder, ContactMessage, Project, Service, Skill, PricingPackage, Testimonial, SiteProfile, SeoSettings } from '../types';
import { 
  adminLogin, 
  fetchAdminData, 
  updateAdminProfile, 
  updateAdminSeo, 
  saveAdminProject, 
  deleteAdminProject, 
  saveAdminService, 
  deleteAdminService, 
  saveAdminPricing, 
  deleteAdminPricing, 
  saveAdminSkill, 
  deleteAdminSkill, 
  saveAdminTestimonial, 
  deleteAdminTestimonial, 
  updateAdminOrder, 
  updateAdminMessageStatus,
  resetDemoDatabase
} from '../lib/api';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onDataUpdated: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  onDataUpdated
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('admin@portfolio.dev');
  const [password, setPassword] = useState('admin123');
  const [authError, setAuthError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<
    'orders' | 'projects' | 'services' | 'pricing' | 'skills' | 'testimonials' | 'messages' | 'profile' | 'seo' | 'whatsapp' | 'clients'
  >('orders');

  const [adminData, setAdminData] = useState<AppStateData | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Edit states for modals inside admin
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);

  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [isNewService, setIsNewService] = useState(false);

  const [editingPricing, setEditingPricing] = useState<Partial<PricingPackage> | null>(null);
  const [isNewPricing, setIsNewPricing] = useState(false);

  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);
  const [isNewSkill, setIsNewSkill] = useState(false);

  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);
  const [isNewTestimonial, setIsNewTestimonial] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState<ClientOrder | null>(null);

  // Load data when opened and authenticated
  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadData();
    }
  }, [isOpen, isAuthenticated]);

  if (!isOpen) return null;

  const showNotification = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const loadData = async () => {
    setLoading(true);
    const res = await fetchAdminData();
    setLoading(false);
    if (res.success && res.data) {
      setAdminData(res.data);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setLoading(true);

    const res = await adminLogin({ email, password });
    setLoading(false);

    if (res.success) {
      setIsAuthenticated(true);
      loadData();
    } else {
      setAuthError(res.error || 'Invalid credentials');
    }
  };

  // Orders updates
  const handleUpdateOrderStatus = async (orderId: string, status: ClientOrder['status']) => {
    await updateAdminOrder(orderId, { status });
    showNotification(`Order status updated to "${status}"`);
    loadData();
    onDataUpdated();
  };

  const handleSaveOrderChanges = async (order: ClientOrder) => {
    await updateAdminOrder(order.id, order);
    showNotification('Order details saved successfully.');
    setSelectedOrder(null);
    loadData();
    onDataUpdated();
  };

  // Profile Save
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminData) return;
    await updateAdminProfile(adminData.profile);
    showNotification('Developer Profile & Stats updated successfully.');
    onDataUpdated();
  };

  // SEO Save
  const handleSaveSeo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminData) return;
    await updateAdminSeo(adminData.seo);
    showNotification('SEO & Metadata settings updated successfully.');
    onDataUpdated();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      
      <div 
        className="relative w-full max-w-6xl bg-[#0A0A0A] border border-white/10 rounded-sm shadow-2xl overflow-hidden my-4 max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 bg-black/90 border-b border-white/10 sticky top-0 z-30 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-emerald-500 flex items-center justify-center text-black font-bold">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-white">System Administration</h2>
                {isAuthenticated && (
                  <span className="px-2 py-0.5 rounded-sm text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Session Active
                  </span>
                )}
              </div>
              <p className="text-[11px] font-mono text-white/50">Manage telemetry, pipeline orders, portfolio archive & engine settings</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={async () => {
                  if (confirm('Reset database to original demo state?')) {
                    await resetDemoDatabase();
                    loadData();
                    onDataUpdated();
                    showNotification('Database reset to defaults.');
                  }
                }}
                className="px-3 py-1.5 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white/70 transition-colors flex items-center gap-1.5"
                title="Reset database to initial demo state"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset Demo</span>
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

        {/* Global Toast Banner */}
        {actionSuccess && (
          <div className="bg-emerald-500 text-black px-4 py-2 text-xs font-mono font-bold flex items-center justify-center gap-2 animate-in slide-in-from-top duration-200">
            <CheckCircle2 className="w-4 h-4" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          
          {/* LOGIN SCREEN */}
          {!isAuthenticated ? (
            <div className="max-w-md mx-auto py-12 text-center space-y-6">
              <div className="w-14 h-14 rounded-sm bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">Security Gate</span>
                <h3 className="text-2xl font-bold uppercase tracking-tight text-white mt-1">Admin Access</h3>
                <p className="text-xs text-white/50 mt-2 font-light">
                  Sign in to access portfolio configuration, pipeline orders, and client communications.
                </p>
              </div>

              {authError && (
                <div className="p-3.5 rounded-sm bg-rose-950/30 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 text-left font-mono">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1.5">Admin Identifier</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-sm bg-black border border-white/10 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1.5">Passcode</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-sm bg-black border border-white/10 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-sm text-xs font-mono font-bold uppercase tracking-wider text-black bg-emerald-500 hover:bg-emerald-400 transition-all"
                >
                  {loading ? 'Authenticating...' : 'Authorize Session'}
                </button>
              </form>

              <div className="p-4 rounded-sm bg-white/[0.02] border border-white/10 text-xs text-white/50">
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/70">Demo Session Credentials:</span>
                <div className="mt-1 font-mono text-[11px] text-emerald-400">
                  admin@portfolio.dev / admin123
                </div>
              </div>
            </div>
          ) : (
            /* AUTHENTICATED ADMIN MANAGEMENT INTERFACE */
            adminData && (
              <div className="space-y-6">
                
                {/* Admin Navigation Tabs */}
                <div className="flex items-center gap-1.5 border-b border-white/10 pb-3 overflow-x-auto">
                  {[
                    { key: 'orders', label: 'Orders', count: adminData.orders.length },
                    { key: 'projects', label: 'Projects', count: adminData.projects.length },
                    { key: 'services', label: 'Services', count: adminData.services.length },
                    { key: 'pricing', label: 'Pricing', count: adminData.pricing.length },
                    { key: 'skills', label: 'Skills', count: adminData.skills.length },
                    { key: 'testimonials', label: 'Reviews', count: adminData.testimonials.length },
                    { key: 'messages', label: 'Inquiries', count: adminData.messages.filter(m => !m.read).length },
                    { key: 'profile', label: 'Profile & Stats' },
                    { key: 'seo', label: 'SEO & Schema' },
                    { key: 'whatsapp', label: 'WhatsApp' }
                  ].map((tab: any) => (
                    <button
                      key={tab.key}
                      id={`admin-tab-${tab.key}`}
                      onClick={() => setActiveTab(tab.key)}
                      className={`px-3.5 py-2 rounded-sm text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
                        activeTab === tab.key
                          ? 'bg-emerald-500 text-black font-bold'
                          : 'bg-white/[0.02] text-white/60 hover:text-white border border-white/10'
                      }`}
                    >
                      <span>{tab.label}</span>
                      {typeof tab.count === 'number' && (
                        <span className={`px-1.5 py-0.2 rounded-sm text-[10px] font-mono ${
                          activeTab === tab.key ? 'bg-black text-emerald-400' : 'bg-white/10 text-white/80'
                        }`}>
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* 1. ORDERS TAB */}
                {activeTab === 'orders' && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">Client Orders Pipeline</h3>
                        <p className="text-xs text-white/50">Review specs, set deadlines & pricing, and update project pipeline</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {adminData.orders.map((order) => (
                        <div
                          key={order.id}
                          className="p-5 rounded-sm bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono font-bold text-emerald-400">{order.trackingCode}</span>
                              <span className="px-2 py-0.5 rounded-sm text-[10px] font-mono uppercase bg-white/5 text-white/70 border border-white/10">
                                {order.projectType}
                              </span>
                              <span className="text-[11px] font-mono text-white/40">• {new Date(order.createdAt).toLocaleDateString()}</span>
                            </div>

                            <div className="text-sm font-bold text-white">
                              {order.clientName} {order.clientCompany && <span className="text-white/50 font-normal">({order.clientCompany})</span>}
                            </div>

                            <div className="text-xs text-white/60 flex flex-wrap gap-3 font-mono">
                              <span>Email: <strong className="text-white">{order.clientEmail}</strong></span>
                              {order.clientPhone && <span>Phone: <strong className="text-white">{order.clientPhone}</strong></span>}
                              <span>Budget: <strong className="text-emerald-400">{order.currency}{order.agreedPrice || 'Pending'}</strong></span>
                            </div>
                          </div>

                          {/* Quick Status Selector & Details */}
                          <div className="flex flex-wrap items-center gap-2">
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as any)}
                              className="px-3 py-1.5 rounded-sm bg-black border border-white/10 text-xs font-mono text-white focus:border-emerald-500 focus:outline-none"
                            >
                              <option value="New">New</option>
                              <option value="Reviewing">Reviewing</option>
                              <option value="Approved">Approved</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Review">Review</option>
                              <option value="Completed">Completed</option>
                            </select>

                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="px-4 py-1.5 rounded-sm bg-white/5 hover:bg-white/10 text-xs font-mono uppercase tracking-wider text-white border border-white/10 flex items-center gap-1.5"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span>Edit Scope</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. PROJECTS TAB */}
                {activeTab === 'projects' && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">Portfolio Projects Archive</h3>
                        <p className="text-xs text-white/50">Add, edit, or remove showcase case studies and live demo links</p>
                      </div>

                      <button
                        onClick={() => {
                          setIsNewProject(true);
                          setEditingProject({
                            title: '',
                            category: 'Business',
                            shortDescription: '',
                            fullDescription: '',
                            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
                            technologies: ['React', 'TypeScript', 'Tailwind CSS'],
                            liveUrl: '',
                            githubUrl: '',
                            featured: false,
                            completionDate: '2026',
                            caseStudy: {
                              overview: '',
                              clientRequirements: ['Responsive Layout', 'Fast Loading Speed'],
                              problem: '',
                              solution: '',
                              results: ['+100% Increase in Conversions'],
                              developmentProcess: [
                                { step: 'Discovery', description: 'Requirements intake and wireframing' },
                                { step: 'Development', description: 'Clean code and performance tuning' }
                              ],
                              screenshots: []
                            }
                          });
                        }}
                        className="px-4 py-2 rounded-sm text-xs font-mono font-bold uppercase tracking-wider text-black bg-emerald-500 hover:bg-emerald-400 flex items-center gap-1.5"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Project</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {adminData.projects.map((proj) => (
                        <div key={proj.id} className="p-4 rounded-sm bg-white/[0.02] border border-white/10 flex flex-col justify-between">
                          <div>
                            <div className="aspect-video rounded-sm overflow-hidden mb-3 bg-black border border-white/5">
                              <img src={proj.image} alt={proj.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">{proj.category}</span>
                            <h4 className="text-sm font-bold text-white mt-0.5">{proj.title}</h4>
                            <p className="text-xs text-white/50 mt-1 line-clamp-2">{proj.shortDescription}</p>
                          </div>

                          <div className="pt-3 border-t border-white/10 mt-3 flex items-center justify-between">
                            <button
                              onClick={() => {
                                setIsNewProject(false);
                                setEditingProject(proj);
                              }}
                              className="px-3 py-1.5 rounded-sm bg-white/5 hover:bg-white/10 text-xs font-mono uppercase text-white/80 flex items-center gap-1 border border-white/10"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>

                            <button
                              onClick={async () => {
                                if (confirm(`Delete project "${proj.title}"?`)) {
                                  await deleteAdminProject(proj.id);
                                  showNotification('Project deleted');
                                  loadData();
                                  onDataUpdated();
                                }
                              }}
                              className="p-1.5 rounded-sm bg-rose-950/30 hover:bg-rose-900/40 text-rose-400 border border-rose-500/30"
                              title="Delete Project"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. SERVICES TAB */}
                {activeTab === 'services' && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">Services Matrix</h3>
                        <p className="text-xs text-white/50">Edit offered services, starting prices, and key feature checklists</p>
                      </div>

                      <button
                        onClick={() => {
                          setIsNewService(true);
                          setEditingService({
                            title: '',
                            slug: 'custom-service',
                            shortDesc: '',
                            fullDesc: '',
                            iconName: 'Globe',
                            features: ['100% Mobile Responsive', 'Fast Delivery', 'Clean Code'],
                            startingPrice: 500,
                            currency: '$',
                            deliveryTime: '5-7 Days',
                            popular: false
                          });
                        }}
                        className="px-4 py-2 rounded-sm text-xs font-mono font-bold uppercase tracking-wider text-black bg-emerald-500 hover:bg-emerald-400 flex items-center gap-1.5"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Service</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {adminData.services.map((srv) => (
                        <div key={srv.id} className="p-5 rounded-sm bg-white/[0.02] border border-white/10 flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-white">{srv.title}</h4>
                              {srv.popular && <span className="px-2 py-0.5 rounded-sm text-[10px] bg-emerald-500/10 text-emerald-400 font-mono border border-emerald-500/20 uppercase">Popular</span>}
                            </div>
                            <p className="text-xs text-white/50 mt-1 font-light">{srv.shortDesc}</p>
                            <div className="text-xs font-mono font-bold text-emerald-400 mt-2">
                              Starting: {srv.currency}{srv.startingPrice} • {srv.deliveryTime}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 ml-4">
                            <button
                              onClick={() => {
                                setIsNewService(false);
                                setEditingService(srv);
                              }}
                              className="p-2 rounded-sm bg-white/5 hover:bg-white/10 text-white/70 border border-white/10"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={async () => {
                                if (confirm(`Delete service "${srv.title}"?`)) {
                                  await deleteAdminService(srv.id);
                                  showNotification('Service deleted');
                                  loadData();
                                  onDataUpdated();
                                }
                              }}
                              className="p-2 rounded-sm bg-rose-950/30 hover:bg-rose-900/40 text-rose-400 border border-rose-500/30"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. PRICING PACKAGES TAB */}
                {activeTab === 'pricing' && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">Investment Tiers</h3>
                        <p className="text-xs text-white/50">Edit package tiers, prices, currency, and included features</p>
                      </div>

                      <button
                        onClick={() => {
                          setIsNewPricing(true);
                          setEditingPricing({
                            name: 'Custom Tier',
                            tier: 'Starter',
                            tagline: 'Custom package description',
                            price: 900,
                            currency: '$',
                            billingPeriod: 'project',
                            features: ['Responsive Layout', 'Contact Form', 'SEO Setup'],
                            deliveryDays: 7,
                            revisions: '3 Rounds',
                            popular: false
                          });
                        }}
                        className="px-4 py-2 rounded-sm text-xs font-mono font-bold uppercase tracking-wider text-black bg-emerald-500 hover:bg-emerald-400 flex items-center gap-1.5"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Package</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {adminData.pricing.map((pkg) => (
                        <div key={pkg.id} className="p-5 rounded-sm bg-white/[0.02] border border-white/10 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-bold text-white">{pkg.name}</h4>
                              {pkg.popular && <span className="text-[10px] font-mono uppercase text-emerald-400">Popular</span>}
                            </div>
                            <div className="text-2xl font-bold font-mono text-white mt-2">
                              {pkg.currency}{pkg.price}
                            </div>
                            <p className="text-xs text-white/50 mt-1">{pkg.tagline}</p>
                          </div>

                          <div className="pt-3 border-t border-white/10 mt-4 flex items-center justify-between">
                            <button
                              onClick={() => {
                                setIsNewPricing(false);
                                setEditingPricing(pkg);
                              }}
                              className="px-3 py-1.5 rounded-sm bg-white/5 hover:bg-white/10 text-xs font-mono uppercase text-white/80 border border-white/10"
                            >
                              Edit Tier
                            </button>
                            <button
                              onClick={async () => {
                                if (confirm(`Delete package "${pkg.name}"?`)) {
                                  await deleteAdminPricing(pkg.id);
                                  showNotification('Package deleted');
                                  loadData();
                                  onDataUpdated();
                                }
                              }}
                              className="p-1.5 rounded-sm bg-rose-950/30 text-rose-400 border border-rose-500/30"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. SKILLS TAB */}
                {activeTab === 'skills' && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">Technical Arsenal</h3>
                        <p className="text-xs text-white/50">Edit technology badges, proficiency percentages, and categories</p>
                      </div>

                      <button
                        onClick={() => {
                          setIsNewSkill(true);
                          setEditingSkill({
                            name: 'TypeScript',
                            category: 'Frontend',
                            proficiency: 95,
                            experienceYears: 5,
                            featured: true
                          });
                        }}
                        className="px-4 py-2 rounded-sm text-xs font-mono font-bold uppercase tracking-wider text-black bg-emerald-500 hover:bg-emerald-400 flex items-center gap-1.5"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Skill</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                      {adminData.skills.map((sk) => (
                        <div key={sk.id} className="p-3.5 rounded-sm bg-white/[0.02] border border-white/10 flex items-center justify-between text-xs">
                          <div>
                            <div className="font-bold text-white">{sk.name}</div>
                            <div className="text-[11px] font-mono text-white/50">{sk.category} • {sk.proficiency}%</div>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setIsNewSkill(false);
                                setEditingSkill(sk);
                              }}
                              className="p-1.5 rounded-sm bg-white/5 text-white/70 hover:text-white border border-white/10"
                            >
                              <Edit className="w-3 h-3" />
                            </button>
                            <button
                              onClick={async () => {
                                await deleteAdminSkill(sk.id);
                                loadData();
                                onDataUpdated();
                              }}
                              className="p-1.5 rounded-sm bg-rose-950/30 text-rose-400 border border-rose-500/30"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. TESTIMONIALS TAB */}
                {activeTab === 'testimonials' && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">Client Endorsements</h3>
                        <p className="text-xs text-white/50">Manage client reviews, verified badges, and ratings</p>
                      </div>

                      <button
                        onClick={() => {
                          setIsNewTestimonial(true);
                          setEditingTestimonial({
                            clientName: 'Jane Doe',
                            clientRole: 'Founder & CEO',
                            company: 'Tech Brand Co',
                            clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
                            rating: 5,
                            projectType: 'E-Commerce Website',
                            comment: 'Outstanding developer with remarkable speed and attention to detail.',
                            date: '2026',
                            verified: true
                          });
                        }}
                        className="px-4 py-2 rounded-sm text-xs font-mono font-bold uppercase tracking-wider text-black bg-emerald-500 hover:bg-emerald-400 flex items-center gap-1.5"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Review</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {adminData.testimonials.map((t) => (
                        <div key={t.id} className="p-5 rounded-sm bg-white/[0.02] border border-white/10 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-bold text-white">{t.clientName} ({t.company})</span>
                              <span className="text-xs text-emerald-400 font-mono font-bold">{t.rating} ★</span>
                            </div>
                            <p className="text-xs text-white/60 italic font-serif">"{t.comment}"</p>
                          </div>

                          <div className="pt-3 border-t border-white/10 mt-3 flex justify-end gap-2">
                            <button
                              onClick={() => {
                                setIsNewTestimonial(false);
                                setEditingTestimonial(t);
                              }}
                              className="px-2.5 py-1 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white/80"
                            >
                              Edit
                            </button>
                            <button
                              onClick={async () => {
                                await deleteAdminTestimonial(t.id);
                                loadData();
                                onDataUpdated();
                              }}
                              className="px-2.5 py-1 rounded-sm bg-rose-950/30 text-rose-400 border border-rose-500/30 text-xs font-mono"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 7. CONTACT MESSAGES TAB */}
                {activeTab === 'messages' && (
                  <div className="space-y-4 animate-in fade-in">
                    <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">Inbound Inquiries & Telemetry</h3>

                    <div className="space-y-3">
                      {adminData.messages.map((msg) => (
                        <div key={msg.id} className="p-5 rounded-sm bg-white/[0.02] border border-white/10 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-white">{msg.name}</span>
                              <span className="text-xs font-mono text-emerald-400">&lt;{msg.email}&gt;</span>
                            </div>
                            <span className="text-[11px] font-mono text-white/40">{new Date(msg.createdAt).toLocaleString()}</span>
                          </div>

                          <div className="text-xs font-mono font-semibold text-white/80">Subject: {msg.subject}</div>
                          <p className="text-xs text-white/70 leading-relaxed p-3 rounded-sm bg-black border border-white/10 font-light">
                            {msg.message}
                          </p>

                          <div className="flex items-center justify-end gap-2 pt-2">
                            <a
                              href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                              className="px-3 py-1.5 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-mono uppercase flex items-center gap-1.5"
                            >
                              <Send className="w-3 h-3 text-emerald-400" />
                              <span>Reply Direct</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 8. PROFILE & CONTACT INFO TAB */}
                {activeTab === 'profile' && (
                  <form onSubmit={handleSaveProfile} className="space-y-6 animate-in fade-in">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div>
                        <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">Personal Contact & Profile Telemetry</h3>
                        <p className="text-xs text-white/50">Edit your public developer identity, contact coordinates, bio, and YouTube showcase</p>
                      </div>
                      <button
                        type="submit"
                        className="px-6 py-2 rounded-sm text-xs font-mono font-bold uppercase tracking-wider text-black bg-emerald-500 hover:bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
                      >
                        Save Profile Changes
                      </button>
                    </div>

                    {/* Personal Contact Details Group */}
                    <div className="p-5 rounded-sm bg-white/[0.02] border border-white/10 space-y-4">
                      <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                        <span>1. Personal & Contact Information</span>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">
                            Full Name <span className="text-emerald-400">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={adminData.profile.name}
                            onChange={(e) => setAdminData({
                              ...adminData,
                              profile: { ...adminData.profile, name: e.target.value }
                            })}
                            className="w-full px-4 py-2.5 rounded-sm bg-black border border-white/10 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">
                            Professional Title <span className="text-emerald-400">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={adminData.profile.title}
                            onChange={(e) => setAdminData({
                              ...adminData,
                              profile: { ...adminData.profile, title: e.target.value }
                            })}
                            className="w-full px-4 py-2.5 rounded-sm bg-black border border-white/10 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">
                            Email Address <span className="text-emerald-400">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={adminData.profile.email}
                            onChange={(e) => setAdminData({
                              ...adminData,
                              profile: { ...adminData.profile, email: e.target.value }
                            })}
                            className="w-full px-4 py-2.5 rounded-sm bg-black border border-white/10 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">
                            Phone Number <span className="text-emerald-400">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={adminData.profile.phone}
                            onChange={(e) => setAdminData({
                              ...adminData,
                              profile: { ...adminData.profile, phone: e.target.value }
                            })}
                            placeholder="03419068797"
                            className="w-full px-4 py-2.5 rounded-sm bg-black border border-white/10 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">
                            WhatsApp Number <span className="text-emerald-400">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={adminData.profile.whatsappNumber}
                            onChange={(e) => setAdminData({
                              ...adminData,
                              profile: { ...adminData.profile, whatsappNumber: e.target.value }
                            })}
                            placeholder="03419068797"
                            className="w-full px-4 py-2.5 rounded-sm bg-black border border-white/10 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">
                            Location
                          </label>
                          <input
                            type="text"
                            value={adminData.profile.location}
                            onChange={(e) => setAdminData({
                              ...adminData,
                              profile: { ...adminData.profile, location: e.target.value }
                            })}
                            placeholder="Islamabad, Pakistan"
                            className="w-full px-4 py-2.5 rounded-sm bg-black border border-white/10 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">
                            Profile Photo URL
                          </label>
                          <input
                            type="text"
                            value={adminData.profile.avatarUrl}
                            onChange={(e) => setAdminData({
                              ...adminData,
                              profile: { ...adminData.profile, avatarUrl: e.target.value }
                            })}
                            className="w-full px-4 py-2.5 rounded-sm bg-black border border-white/10 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bio & Tagline */}
                    <div className="p-5 rounded-sm bg-white/[0.02] border border-white/10 space-y-4">
                      <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                        2. Headline & Bio Statements
                      </h4>

                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">Hero Tagline</label>
                        <input
                          type="text"
                          value={adminData.profile.tagline}
                          onChange={(e) => setAdminData({
                            ...adminData,
                            profile: { ...adminData.profile, tagline: e.target.value }
                          })}
                          className="w-full px-4 py-2.5 rounded-sm bg-black border border-white/10 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">Short Statement</label>
                          <textarea
                            rows={3}
                            value={adminData.profile.bio}
                            onChange={(e) => setAdminData({
                              ...adminData,
                              profile: { ...adminData.profile, bio: e.target.value }
                            })}
                            className="w-full px-4 py-2.5 rounded-sm bg-black border border-white/10 text-white text-xs focus:border-emerald-500 focus:outline-none resize-y font-light"
                          ></textarea>
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">Detailed Technical Bio</label>
                          <textarea
                            rows={3}
                            value={adminData.profile.detailedBio}
                            onChange={(e) => setAdminData({
                              ...adminData,
                              profile: { ...adminData.profile, detailedBio: e.target.value }
                            })}
                            className="w-full px-4 py-2.5 rounded-sm bg-black border border-white/10 text-white text-xs focus:border-emerald-500 focus:outline-none resize-y font-light"
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    {/* YouTube Media Showcase Section Settings */}
                    <div className="p-5 rounded-sm bg-white/[0.02] border border-white/10 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-mono font-bold text-rose-400 uppercase tracking-widest flex items-center gap-2">
                          <span>3. YouTube Showcase Configuration</span>
                        </h4>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={adminData.profile.showYoutubeSection !== false}
                            onChange={(e) => setAdminData({
                              ...adminData,
                              profile: { ...adminData.profile, showYoutubeSection: e.target.checked }
                            })}
                            className="accent-rose-500 rounded"
                          />
                          <span className="text-xs font-mono text-white/80">Display YouTube Section on Portfolio</span>
                        </label>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-white/50 mb-1">YouTube Channel URL</label>
                          <input
                            type="text"
                            value={adminData.profile.youtubeUrl || ''}
                            onChange={(e) => setAdminData({
                              ...adminData,
                              profile: { ...adminData.profile, youtubeUrl: e.target.value }
                            })}
                            placeholder="https://www.youtube.com/@dakaravines"
                            className="w-full px-3 py-2 rounded-sm bg-black border border-white/10 text-white font-mono text-xs focus:border-rose-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono uppercase text-white/50 mb-1">Featured Video ID or Embed ID</label>
                          <input
                            type="text"
                            value={adminData.profile.youtubeFeaturedVideoId || ''}
                            onChange={(e) => setAdminData({
                              ...adminData,
                              profile: { ...adminData.profile, youtubeFeaturedVideoId: e.target.value }
                            })}
                            placeholder="dQw4w9WgXcQ"
                            className="w-full px-3 py-2 rounded-sm bg-black border border-white/10 text-white font-mono text-xs focus:border-rose-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/50 mb-1">Showcase Block Title</label>
                        <input
                          type="text"
                          value={adminData.profile.youtubeShowcaseTitle || ''}
                          onChange={(e) => setAdminData({
                            ...adminData,
                            profile: { ...adminData.profile, youtubeShowcaseTitle: e.target.value }
                          })}
                          placeholder="Web Development Tutorials & System Architecture"
                          className="w-full px-3 py-2 rounded-sm bg-black border border-white/10 text-white font-mono text-xs focus:border-rose-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/50 mb-1">Showcase Description</label>
                        <textarea
                          rows={2}
                          value={adminData.profile.youtubeShowcaseDescription || ''}
                          onChange={(e) => setAdminData({
                            ...adminData,
                            profile: { ...adminData.profile, youtubeShowcaseDescription: e.target.value }
                          })}
                          className="w-full px-3 py-2 rounded-sm bg-black border border-white/10 text-white text-xs focus:border-rose-500 focus:outline-none"
                        ></textarea>
                      </div>
                    </div>

                    {/* Dynamic Social Accounts Manager */}
                    <div className="p-5 rounded-sm bg-white/[0.02] border border-white/10 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                            4. Dynamic Social Media Accounts Manager
                          </h4>
                          <p className="text-[11px] text-white/50">Add, edit, or toggle channels. Empty/disabled channels are automatically hidden.</p>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            const newId = `soc-${Date.now()}`;
                            const newLink = {
                              id: newId,
                              platform: 'Custom',
                              label: 'New Link',
                              url: 'https://',
                              icon: 'globe',
                              enabled: true,
                              order: (adminData.profile.socialLinks?.length || 0) + 1
                            };
                            setAdminData({
                              ...adminData,
                              profile: {
                                ...adminData.profile,
                                socialLinks: [...(adminData.profile.socialLinks || []), newLink]
                              }
                            });
                          }}
                          className="px-3 py-1.5 rounded-sm text-xs font-mono uppercase tracking-wider text-black bg-emerald-500 hover:bg-emerald-400 flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Social Platform</span>
                        </button>
                      </div>

                      <div className="space-y-2.5">
                        {(adminData.profile.socialLinks || []).map((soc, idx) => (
                          <div
                            key={soc.id || idx}
                            className="p-3.5 rounded-sm bg-black/70 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs"
                          >
                            <div className="flex items-center gap-2.5 w-full md:w-auto">
                              <label className="flex items-center gap-1.5 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={soc.enabled !== false}
                                  onChange={(e) => {
                                    const updated = [...(adminData.profile.socialLinks || [])];
                                    updated[idx] = { ...updated[idx], enabled: e.target.checked };
                                    setAdminData({
                                      ...adminData,
                                      profile: { ...adminData.profile, socialLinks: updated }
                                    });
                                  }}
                                  className="accent-emerald-500 rounded"
                                />
                                <span className={`text-[10px] font-mono uppercase ${soc.enabled ? 'text-emerald-400' : 'text-white/30'}`}>
                                  {soc.enabled ? 'Active' : 'Disabled'}
                                </span>
                              </label>

                              <input
                                type="text"
                                value={soc.platform}
                                onChange={(e) => {
                                  const updated = [...(adminData.profile.socialLinks || [])];
                                  updated[idx] = { ...updated[idx], platform: e.target.value };
                                  setAdminData({
                                    ...adminData,
                                    profile: { ...adminData.profile, socialLinks: updated }
                                  });
                                }}
                                placeholder="Platform (e.g. YouTube)"
                                className="w-28 px-2.5 py-1.5 rounded-sm bg-white/5 border border-white/10 text-white font-mono text-xs focus:border-emerald-500 focus:outline-none"
                              />

                              <input
                                type="text"
                                value={soc.label || ''}
                                onChange={(e) => {
                                  const updated = [...(adminData.profile.socialLinks || [])];
                                  updated[idx] = { ...updated[idx], label: e.target.value };
                                  setAdminData({
                                    ...adminData,
                                    profile: { ...adminData.profile, socialLinks: updated }
                                  });
                                }}
                                placeholder="Label"
                                className="w-32 px-2.5 py-1.5 rounded-sm bg-white/5 border border-white/10 text-white font-mono text-xs focus:border-emerald-500 focus:outline-none"
                              />
                            </div>

                            <div className="flex-1 w-full md:w-auto">
                              <input
                                type="text"
                                value={soc.url}
                                onChange={(e) => {
                                  const updated = [...(adminData.profile.socialLinks || [])];
                                  updated[idx] = { ...updated[idx], url: e.target.value };
                                  setAdminData({
                                    ...adminData,
                                    profile: { ...adminData.profile, socialLinks: updated }
                                  });
                                }}
                                placeholder="https://..."
                                className="w-full px-2.5 py-1.5 rounded-sm bg-white/5 border border-white/10 text-white font-mono text-xs focus:border-emerald-500 focus:outline-none"
                              />
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                const updated = (adminData.profile.socialLinks || []).filter((_, i) => i !== idx);
                                setAdminData({
                                  ...adminData,
                                  profile: { ...adminData.profile, socialLinks: updated }
                                });
                              }}
                              className="p-1.5 rounded-sm bg-rose-950/30 text-rose-400 border border-rose-500/30 hover:bg-rose-900/40"
                              title="Delete Social Channel"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Statistics Counters */}
                    <div className="p-5 rounded-sm bg-white/[0.02] border border-white/10">
                      <h4 className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-widest mb-3">5. Counter Metrics</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-white/50 mb-1">Projects Completed</label>
                          <input
                            type="number"
                            value={adminData.profile.projectsCompleted}
                            onChange={(e) => setAdminData({
                              ...adminData,
                              profile: { ...adminData.profile, projectsCompleted: parseInt(e.target.value) || 0 }
                            })}
                            className="w-full px-3 py-2 rounded-sm bg-black border border-white/10 text-white font-mono text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono uppercase text-white/50 mb-1">Happy Clients</label>
                          <input
                            type="number"
                            value={adminData.profile.happyClients}
                            onChange={(e) => setAdminData({
                              ...adminData,
                              profile: { ...adminData.profile, happyClients: parseInt(e.target.value) || 0 }
                            })}
                            className="w-full px-3 py-2 rounded-sm bg-black border border-white/10 text-white font-mono text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono uppercase text-white/50 mb-1">Technologies Count</label>
                          <input
                            type="number"
                            value={adminData.profile.technologiesCount}
                            onChange={(e) => setAdminData({
                              ...adminData,
                              profile: { ...adminData.profile, technologiesCount: parseInt(e.target.value) || 0 }
                            })}
                            className="w-full px-3 py-2 rounded-sm bg-black border border-white/10 text-white font-mono text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono uppercase text-white/50 mb-1">Years Experience</label>
                          <input
                            type="number"
                            value={adminData.profile.yearsExperience}
                            onChange={(e) => setAdminData({
                              ...adminData,
                              profile: { ...adminData.profile, yearsExperience: parseInt(e.target.value) || 0 }
                            })}
                            className="w-full px-3 py-2 rounded-sm bg-black border border-white/10 text-white font-mono text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-sm text-xs font-mono font-bold uppercase tracking-wider text-black bg-emerald-500 hover:bg-emerald-400"
                    >
                      Commit Profile & Metrics
                    </button>
                  </form>
                )}

                {/* 9. SEO & SCHEMA TAB */}
                {activeTab === 'seo' && (
                  <form onSubmit={handleSaveSeo} className="space-y-4 animate-in fade-in">
                    <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">Technical Indexing & SEO</h3>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">Site Title Header</label>
                      <input
                        type="text"
                        value={adminData.seo.siteTitle}
                        onChange={(e) => setAdminData({
                          ...adminData,
                          seo: { ...adminData.seo, siteTitle: e.target.value }
                        })}
                        className="w-full px-4 py-2.5 rounded-sm bg-black border border-white/10 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">Meta Description</label>
                      <textarea
                        rows={2}
                        value={adminData.seo.metaDescription}
                        onChange={(e) => setAdminData({
                          ...adminData,
                          seo: { ...adminData.seo, metaDescription: e.target.value }
                        })}
                        className="w-full px-4 py-2.5 rounded-sm bg-black border border-white/10 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">Canonical Domain URI</label>
                        <input
                          type="text"
                          value={adminData.seo.canonicalUrl}
                          onChange={(e) => setAdminData({
                            ...adminData,
                            seo: { ...adminData.seo, canonicalUrl: e.target.value }
                          })}
                          className="w-full px-4 py-2.5 rounded-sm bg-black border border-white/10 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">Google Search Console Verification</label>
                        <input
                          type="text"
                          value={adminData.seo.googleSiteVerification}
                          onChange={(e) => setAdminData({
                            ...adminData,
                            seo: { ...adminData.seo, googleSiteVerification: e.target.value }
                          })}
                          className="w-full px-4 py-2.5 rounded-sm bg-black border border-white/10 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* SITEMAP & ROBOTS LINKS */}
                    <div className="p-4 rounded-sm bg-white/[0.02] border border-white/10 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-mono font-bold uppercase tracking-wider text-white">Dynamic Index Files</div>
                        <div className="text-[11px] text-white/50">Auto-generated XML Sitemap and indexing rules for search bots.</div>
                      </div>

                      <div className="flex gap-2">
                        <a
                          href="/sitemap.xml"
                          target="_blank"
                          className="px-3 py-1.5 rounded-sm bg-white/5 border border-white/10 text-xs font-mono text-emerald-400 hover:text-white flex items-center gap-1"
                        >
                          <span>/sitemap.xml</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <a
                          href="/robots.txt"
                          target="_blank"
                          className="px-3 py-1.5 rounded-sm bg-white/5 border border-white/10 text-xs font-mono text-emerald-400 hover:text-white flex items-center gap-1"
                        >
                          <span>/robots.txt</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-sm text-xs font-mono font-bold uppercase tracking-wider text-black bg-emerald-500 hover:bg-emerald-400"
                    >
                      Commit SEO Directives
                    </button>
                  </form>
                )}

                {/* 10. WHATSAPP & CONTACT HUB TAB */}
                {activeTab === 'whatsapp' && (
                  <form onSubmit={handleSaveProfile} className="space-y-5 animate-in fade-in">
                    <div className="border-b border-white/10 pb-3">
                      <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
                        WhatsApp, Email & Floating Contact System
                      </h3>
                      <p className="text-xs text-white/50">Configure direct messaging templates, automated click-to-chat links, and the floating speed-dial hub</p>
                    </div>

                    {/* WhatsApp Configuration Group */}
                    <div className="p-5 rounded-sm bg-white/[0.02] border border-white/10 space-y-4">
                      <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                        WhatsApp Direct Parameters
                      </h4>

                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">
                          WhatsApp Phone Number (with Country Code)
                        </label>
                        <input
                          type="text"
                          value={adminData.profile.whatsappNumber}
                          onChange={(e) => setAdminData({
                            ...adminData,
                            profile: { ...adminData.profile, whatsappNumber: e.target.value }
                          })}
                          placeholder="03419068797"
                          className="w-full px-4 py-2.5 rounded-sm bg-black border border-white/10 text-white text-xs focus:border-emerald-500 focus:outline-none font-mono"
                        />
                        <span className="text-[10px] text-white/40 font-mono mt-1 block">
                          Format: International or local with country code (e.g. 03419068797 or 923419068797). Auto-formatted cleanly in wa.me links.
                        </span>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">
                          WhatsApp Default General Message
                        </label>
                        <textarea
                          rows={2}
                          value={adminData.profile.whatsappDefaultMessage}
                          onChange={(e) => setAdminData({
                            ...adminData,
                            profile: { ...adminData.profile, whatsappDefaultMessage: e.target.value }
                          })}
                          className="w-full px-4 py-2.5 rounded-sm bg-black border border-white/10 text-white text-xs focus:border-emerald-500 focus:outline-none"
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">
                          WhatsApp Project Order Pre-Filled Message
                        </label>
                        <textarea
                          rows={2}
                          value={adminData.profile.whatsappProjectMessage || 'Hello Touseef, I would like to order a website. Here are my project requirements:'}
                          onChange={(e) => setAdminData({
                            ...adminData,
                            profile: { ...adminData.profile, whatsappProjectMessage: e.target.value }
                          })}
                          className="w-full px-4 py-2.5 rounded-sm bg-black border border-white/10 text-white text-xs focus:border-emerald-500 focus:outline-none"
                        ></textarea>
                      </div>
                    </div>

                    {/* Email Templates Group */}
                    <div className="p-5 rounded-sm bg-white/[0.02] border border-white/10 space-y-4">
                      <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                        Email Mailto Parameters
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">
                            Default Email Subject Line
                          </label>
                          <input
                            type="text"
                            value={adminData.profile.emailSubject || 'Website Project Inquiry'}
                            onChange={(e) => setAdminData({
                              ...adminData,
                              profile: { ...adminData.profile, emailSubject: e.target.value }
                            })}
                            className="w-full px-4 py-2.5 rounded-sm bg-black border border-white/10 text-white text-xs focus:border-emerald-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">
                            Default Email Body Message
                          </label>
                          <input
                            type="text"
                            value={adminData.profile.emailDefaultMessage || 'Hello Touseef, I found your portfolio and would like to discuss a new website project.'}
                            onChange={(e) => setAdminData({
                              ...adminData,
                              profile: { ...adminData.profile, emailDefaultMessage: e.target.value }
                            })}
                            className="w-full px-4 py-2.5 rounded-sm bg-black border border-white/10 text-white text-xs focus:border-emerald-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Floating Contact Widget Settings */}
                    <div className="p-5 rounded-sm bg-white/[0.02] border border-white/10 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                          Floating Contact Hub Speed-Dial Controls
                        </h4>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={adminData.profile.floatingContactEnabled !== false}
                            onChange={(e) => setAdminData({
                              ...adminData,
                              profile: { ...adminData.profile, floatingContactEnabled: e.target.checked }
                            })}
                            className="accent-emerald-500 rounded"
                          />
                          <span className="text-xs font-mono text-white/90">Enable Floating Contact Button</span>
                        </label>
                      </div>

                      <p className="text-xs text-white/50">Toggle specific channels to display inside the floating action popup:</p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                        <label className="p-3 rounded-sm bg-black/60 border border-white/10 flex items-center gap-2 cursor-pointer hover:border-emerald-500/40">
                          <input
                            type="checkbox"
                            checked={adminData.profile.floatingShowWhatsapp !== false}
                            onChange={(e) => setAdminData({
                              ...adminData,
                              profile: { ...adminData.profile, floatingShowWhatsapp: e.target.checked }
                            })}
                            className="accent-emerald-500 rounded"
                          />
                          <span className="text-xs font-mono text-white/80">WhatsApp</span>
                        </label>

                        <label className="p-3 rounded-sm bg-black/60 border border-white/10 flex items-center gap-2 cursor-pointer hover:border-emerald-500/40">
                          <input
                            type="checkbox"
                            checked={adminData.profile.floatingShowEmail !== false}
                            onChange={(e) => setAdminData({
                              ...adminData,
                              profile: { ...adminData.profile, floatingShowEmail: e.target.checked }
                            })}
                            className="accent-emerald-500 rounded"
                          />
                          <span className="text-xs font-mono text-white/80">Email</span>
                        </label>

                        <label className="p-3 rounded-sm bg-black/60 border border-white/10 flex items-center gap-2 cursor-pointer hover:border-emerald-500/40">
                          <input
                            type="checkbox"
                            checked={adminData.profile.floatingShowPhone !== false}
                            onChange={(e) => setAdminData({
                              ...adminData,
                              profile: { ...adminData.profile, floatingShowPhone: e.target.checked }
                            })}
                            className="accent-emerald-500 rounded"
                          />
                          <span className="text-xs font-mono text-white/80">Phone Call</span>
                        </label>

                        <label className="p-3 rounded-sm bg-black/60 border border-white/10 flex items-center gap-2 cursor-pointer hover:border-emerald-500/40">
                          <input
                            type="checkbox"
                            checked={adminData.profile.floatingShowYoutube !== false}
                            onChange={(e) => setAdminData({
                              ...adminData,
                              profile: { ...adminData.profile, floatingShowYoutube: e.target.checked }
                            })}
                            className="accent-emerald-500 rounded"
                          />
                          <span className="text-xs font-mono text-white/80">YouTube</span>
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-sm text-xs font-mono font-bold uppercase tracking-wider text-black bg-emerald-500 hover:bg-emerald-400"
                    >
                      Commit WhatsApp & Contact Directives
                    </button>
                  </form>
                )}

              </div>
            )
          )}

        </div>

        {/* MODAL: EDIT PROJECT */}
        {editingProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#0A0A0A] border border-white/10 rounded-sm p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-white">{isNewProject ? 'Add Project Record' : 'Edit Project Record'}</h4>
                <button onClick={() => setEditingProject(null)}><X className="w-5 h-5 text-white/50 hover:text-white" /></button>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-white/70 mb-1">Project Title</label>
                <input
                  type="text"
                  value={editingProject.title || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-') })}
                  className="w-full px-3 py-2 rounded-sm bg-black border border-white/10 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-white/70 mb-1">Category</label>
                  <select
                    value={editingProject.category || 'Business'}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-sm bg-black border border-white/10 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="Business">Business</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Web Application">Web Application</option>
                    <option value="WordPress">WordPress</option>
                    <option value="Landing Page">Landing Page</option>
                    <option value="Portfolio">Portfolio</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-white/70 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={editingProject.image || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                    className="w-full px-3 py-2 rounded-sm bg-black border border-white/10 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-white/70 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={editingProject.shortDescription || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-sm bg-black border border-white/10 text-white text-xs focus:border-emerald-500 focus:outline-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-white/70 mb-1">Live URL</label>
                  <input
                    type="text"
                    value={editingProject.liveUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-sm bg-black border border-white/10 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-white/70 mb-1">Technologies (comma separated)</label>
                  <input
                    type="text"
                    value={editingProject.technologies?.join(', ') || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, technologies: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                    className="w-full px-3 py-2 rounded-sm bg-black border border-white/10 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button onClick={() => setEditingProject(null)} className="px-4 py-2 rounded-sm bg-white/5 border border-white/10 text-xs font-mono text-white/70">Cancel</button>
                <button
                  onClick={async () => {
                    await saveAdminProject(editingProject, isNewProject);
                    setEditingProject(null);
                    showNotification('Project saved successfully');
                    loadData();
                    onDataUpdated();
                  }}
                  className="px-5 py-2 rounded-sm bg-emerald-500 font-mono font-bold uppercase tracking-wider text-black text-xs"
                >
                  Save Project
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: EDIT ORDER DETAILS */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#0A0A0A] border border-white/10 rounded-sm p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-white">Pipeline Order {selectedOrder.trackingCode}</h4>
                  <div className="text-xs text-white/50 font-mono">Client: {selectedOrder.clientName} ({selectedOrder.clientEmail})</div>
                </div>
                <button onClick={() => setSelectedOrder(null)}><X className="w-5 h-5 text-white/50 hover:text-white" /></button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-white/70 mb-1">Agreed Price ($)</label>
                  <input
                    type="number"
                    value={selectedOrder.agreedPrice || ''}
                    onChange={(e) => setSelectedOrder({ ...selectedOrder, agreedPrice: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-sm bg-black border border-white/10 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-white/70 mb-1">Payment Status</label>
                  <select
                    value={selectedOrder.paymentStatus}
                    onChange={(e) => setSelectedOrder({ ...selectedOrder, paymentStatus: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-sm bg-black border border-white/10 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="Pending Deposit">Pending Deposit</option>
                    <option value="Deposit Paid">Deposit Paid</option>
                    <option value="Fully Paid">Fully Paid</option>
                    <option value="Payment On Completion">Payment On Completion</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-white/70 mb-1">Target Milestone Deadline</label>
                <input
                  type="date"
                  value={selectedOrder.deadline || ''}
                  onChange={(e) => setSelectedOrder({ ...selectedOrder, deadline: e.target.value })}
                  className="w-full px-3 py-2 rounded-sm bg-black border border-white/10 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-white/70 mb-1">Private Internal Notes</label>
                <textarea
                  rows={3}
                  value={selectedOrder.adminNotes || ''}
                  onChange={(e) => setSelectedOrder({ ...selectedOrder, adminNotes: e.target.value })}
                  placeholder="Notes about client requirements, architecture choices, special requests..."
                  className="w-full px-3 py-2 rounded-sm bg-black border border-white/10 text-white text-xs font-light focus:border-emerald-500 focus:outline-none"
                ></textarea>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button onClick={() => setSelectedOrder(null)} className="px-4 py-2 rounded-sm bg-white/5 border border-white/10 text-xs font-mono text-white/70">Cancel</button>
                <button
                  onClick={() => handleSaveOrderChanges(selectedOrder)}
                  className="px-5 py-2 rounded-sm bg-emerald-500 font-mono font-bold uppercase tracking-wider text-black text-xs"
                >
                  Commit Order
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: EDIT SERVICE */}
        {editingService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#0A0A0A] border border-white/10 rounded-sm p-6 max-w-lg w-full max-h-[85vh] overflow-y-auto space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-white">{isNewService ? 'Add Service Matrix' : 'Edit Service Matrix'}</h4>
                <button onClick={() => setEditingService(null)}><X className="w-5 h-5 text-white/50 hover:text-white" /></button>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-white/70 mb-1">Service Title</label>
                <input
                  type="text"
                  value={editingService.title || ''}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-') })}
                  className="w-full px-3 py-2 rounded-sm bg-black border border-white/10 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-white/70 mb-1">Short Summary</label>
                <input
                  type="text"
                  value={editingService.shortDesc || ''}
                  onChange={(e) => setEditingService({ ...editingService, shortDesc: e.target.value })}
                  className="w-full px-3 py-2 rounded-sm bg-black border border-white/10 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-white/70 mb-1">Starting Price ($)</label>
                  <input
                    type="number"
                    value={editingService.startingPrice || 0}
                    onChange={(e) => setEditingService({ ...editingService, startingPrice: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-sm bg-black border border-white/10 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-white/70 mb-1">Turnaround Estimate</label>
                  <input
                    type="text"
                    value={editingService.deliveryTime || ''}
                    onChange={(e) => setEditingService({ ...editingService, deliveryTime: e.target.value })}
                    placeholder="e.g. 5-7 Days"
                    className="w-full px-3 py-2 rounded-sm bg-black border border-white/10 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-white/70 mb-1">Features (comma separated)</label>
                <input
                  type="text"
                  value={editingService.features?.join(', ') || ''}
                  onChange={(e) => setEditingService({ ...editingService, features: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                  className="w-full px-3 py-2 rounded-sm bg-black border border-white/10 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button onClick={() => setEditingService(null)} className="px-4 py-2 rounded-sm bg-white/5 border border-white/10 text-xs font-mono text-white/70">Cancel</button>
                <button
                  onClick={async () => {
                    await saveAdminService(editingService, isNewService);
                    setEditingService(null);
                    showNotification('Service saved successfully');
                    loadData();
                    onDataUpdated();
                  }}
                  className="px-5 py-2 rounded-sm bg-emerald-500 font-mono font-bold uppercase tracking-wider text-black text-xs"
                >
                  Save Service
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: EDIT PRICING */}
        {editingPricing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#0A0A0A] border border-white/10 rounded-sm p-6 max-w-lg w-full max-h-[85vh] overflow-y-auto space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-white">{isNewPricing ? 'Add Investment Tier' : 'Edit Investment Tier'}</h4>
                <button onClick={() => setEditingPricing(null)}><X className="w-5 h-5 text-white/50 hover:text-white" /></button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-white/70 mb-1">Package Name</label>
                  <input
                    type="text"
                    value={editingPricing.name || ''}
                    onChange={(e) => setEditingPricing({ ...editingPricing, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-sm bg-black border border-white/10 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-white/70 mb-1">Price ($)</label>
                  <input
                    type="number"
                    value={editingPricing.price || 0}
                    onChange={(e) => setEditingPricing({ ...editingPricing, price: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-sm bg-black border border-white/10 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-white/70 mb-1">Tagline</label>
                <input
                  type="text"
                  value={editingPricing.tagline || ''}
                  onChange={(e) => setEditingPricing({ ...editingPricing, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-sm bg-black border border-white/10 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-white/70 mb-1">Included Deliverables (comma separated)</label>
                <input
                  type="text"
                  value={editingPricing.features?.join(', ') || ''}
                  onChange={(e) => setEditingPricing({ ...editingPricing, features: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                  className="w-full px-3 py-2 rounded-sm bg-black border border-white/10 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button onClick={() => setEditingPricing(null)} className="px-4 py-2 rounded-sm bg-white/5 border border-white/10 text-xs font-mono text-white/70">Cancel</button>
                <button
                  onClick={async () => {
                    await saveAdminPricing(editingPricing, isNewPricing);
                    setEditingPricing(null);
                    showNotification('Package saved successfully');
                    loadData();
                    onDataUpdated();
                  }}
                  className="px-5 py-2 rounded-sm bg-emerald-500 font-mono font-bold uppercase tracking-wider text-black text-xs"
                >
                  Save Tier
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: EDIT SKILL */}
        {editingSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#0A0A0A] border border-white/10 rounded-sm p-6 max-w-md w-full max-h-[85vh] overflow-y-auto space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-white">{isNewSkill ? 'Add Skill Record' : 'Edit Skill Record'}</h4>
                <button onClick={() => setEditingSkill(null)}><X className="w-5 h-5 text-white/50 hover:text-white" /></button>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-white/70 mb-1">Skill / Technology Name</label>
                <input
                  type="text"
                  value={editingSkill.name || ''}
                  onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-sm bg-black border border-white/10 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-white/70 mb-1">Category</label>
                  <input
                    type="text"
                    value={editingSkill.category || ''}
                    onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                    placeholder="Frontend, Backend..."
                    className="w-full px-3 py-2 rounded-sm bg-black border border-white/10 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-white/70 mb-1">Proficiency (%)</label>
                  <input
                    type="number"
                    value={editingSkill.proficiency || 90}
                    onChange={(e) => setEditingSkill({ ...editingSkill, proficiency: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-sm bg-black border border-white/10 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button onClick={() => setEditingSkill(null)} className="px-4 py-2 rounded-sm bg-white/5 border border-white/10 text-xs font-mono text-white/70">Cancel</button>
                <button
                  onClick={async () => {
                    await saveAdminSkill(editingSkill, isNewSkill);
                    setEditingSkill(null);
                    showNotification('Skill saved successfully');
                    loadData();
                    onDataUpdated();
                  }}
                  className="px-5 py-2 rounded-sm bg-emerald-500 font-mono font-bold uppercase tracking-wider text-black text-xs"
                >
                  Save Skill
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: EDIT TESTIMONIAL */}
        {editingTestimonial && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#0A0A0A] border border-white/10 rounded-sm p-6 max-w-lg w-full max-h-[85vh] overflow-y-auto space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-white">{isNewTestimonial ? 'Add Endorsement' : 'Edit Endorsement'}</h4>
                <button onClick={() => setEditingTestimonial(null)}><X className="w-5 h-5 text-white/50 hover:text-white" /></button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-white/70 mb-1">Client Name</label>
                  <input
                    type="text"
                    value={editingTestimonial.clientName || ''}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, clientName: e.target.value })}
                    className="w-full px-3 py-2 rounded-sm bg-black border border-white/10 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-white/70 mb-1">Company / Role</label>
                  <input
                    type="text"
                    value={editingTestimonial.company || ''}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-sm bg-black border border-white/10 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-white/70 mb-1">Testimonial Quote</label>
                <textarea
                  rows={3}
                  value={editingTestimonial.comment || ''}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, comment: e.target.value })}
                  className="w-full px-3 py-2 rounded-sm bg-black border border-white/10 text-white text-xs focus:border-emerald-500 focus:outline-none font-light"
                ></textarea>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button onClick={() => setEditingTestimonial(null)} className="px-4 py-2 rounded-sm bg-white/5 border border-white/10 text-xs font-mono text-white/70">Cancel</button>
                <button
                  onClick={async () => {
                    await saveAdminTestimonial(editingTestimonial, isNewTestimonial);
                    setEditingTestimonial(null);
                    showNotification('Testimonial saved successfully');
                    loadData();
                    onDataUpdated();
                  }}
                  className="px-5 py-2 rounded-sm bg-emerald-500 font-mono font-bold uppercase tracking-wider text-black text-xs"
                >
                  Save Endorsement
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
