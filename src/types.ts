export interface ProjectCaseStudy {
  overview: string;
  clientRequirements: string[];
  problem: string;
  solution: string;
  results: string[];
  developmentProcess: {
    step: string;
    description: string;
  }[];
  screenshots: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: 'Business' | 'E-Commerce' | 'Portfolio' | 'Landing Page' | 'Web Application' | 'WordPress';
  shortDescription: string;
  fullDescription: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  completionDate: string;
  clientName?: string;
  caseStudy: ProjectCaseStudy;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  features: string[];
  startingPrice: number;
  currency: string;
  deliveryTime: string;
  popular?: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'CMS & Platforms' | 'Tools & DevOps' | 'Design & SEO';
  proficiency: number; // 0 - 100
  experienceYears: number;
  icon?: string;
  featured: boolean;
}

export interface PricingPackage {
  id: string;
  name: string;
  tier: 'Starter' | 'Professional' | 'Premium';
  tagline: string;
  price: number;
  currency: string;
  billingPeriod: string; // "one-time" | "project"
  features: string[];
  notIncluded?: string[];
  deliveryDays: number;
  revisions: string;
  popular: boolean;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  company: string;
  clientAvatar: string;
  rating: number; // 1-5
  projectType: string;
  comment: string;
  projectUrl?: string;
  date: string;
  verified: boolean;
}

export interface OrderAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  dataUrl: string; // base64 or url
  uploadedAt: string;
}

export interface OrderMilestone {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  completedAt?: string;
}

export interface OrderMessage {
  id: string;
  sender: 'client' | 'admin';
  senderName: string;
  content: string;
  timestamp: string;
  attachments?: OrderAttachment[];
}

export interface ClientOrder {
  id: string;
  trackingCode: string; // e.g. ORD-78219
  createdAt: string;
  updatedAt: string;
  status: 'New' | 'Reviewing' | 'Approved' | 'In Progress' | 'Review' | 'Completed';
  
  // Client Details
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientCountry: string;
  clientCompany?: string;

  // Project Details
  projectType: string;
  websiteType: string;
  pageCount: string;
  requiredFeatures: string[];
  preferredTechnology: string;
  designPreference: string;
  existingWebsiteUrl?: string;
  referenceWebsites?: string;
  projectDescription: string;
  additionalRequirements?: string;

  // Budget & Timeline
  selectedPackage?: string;
  customBudget?: string;
  currency: string;
  timeline: 'ASAP' | '1 Week' | '2 Weeks' | '1 Month' | 'Flexible';
  agreedPrice?: number;
  deadline?: string;

  // Files & Communications
  attachments: OrderAttachment[];
  milestones: OrderMilestone[];
  messages: OrderMessage[];

  // Admin Internal
  adminNotes?: string;
  paymentStatus: 'Pending Deposit' | 'Deposit Paid' | 'Fully Paid' | 'Payment On Completion';
  invoiceUrl?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
  replied: boolean;
}

export interface SocialLink {
  id: string;
  platform: 'YouTube' | 'WhatsApp' | 'LinkedIn' | 'GitHub' | 'Twitter' | 'Instagram' | 'Facebook' | 'TikTok' | 'Telegram' | 'Discord' | 'Custom';
  label: string;
  url: string;
  icon: string;
  enabled: boolean;
  order: number;
}

export interface SiteProfile {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  detailedBio: string;
  avatarUrl: string;
  location: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  whatsappDefaultMessage: string;
  whatsappProjectMessage?: string;
  emailSubject?: string;
  emailDefaultMessage?: string;
  
  // Legacy / Direct social properties for backward compatibility
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  telegramUrl?: string;
  discordUrl?: string;

  // YouTube Channel & Optional Showcase Section
  youtubeFeaturedVideoId?: string;
  youtubeShowcaseTitle?: string;
  youtubeShowcaseDescription?: string;
  showYoutubeSection?: boolean;

  // Floating Contact Hub settings
  floatingContactEnabled?: boolean;
  floatingShowWhatsapp?: boolean;
  floatingShowEmail?: boolean;
  floatingShowPhone?: boolean;
  floatingShowYoutube?: boolean;

  // Dynamic Social Links list
  socialLinks?: SocialLink[];

  yearsExperience: number;
  projectsCompleted: number;
  happyClients: number;
  technologiesCount: number;
  availableForHire: boolean;
  hourlyRate?: number;
  resumeUrl?: string;
}

export interface SeoSettings {
  siteTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage: string;
  googleSiteVerification: string;
  googleAnalyticsId: string;
  personSchemaJobTitle: string;
  serviceSchemaAreaServed: string;
}

export interface AppStateData {
  profile: SiteProfile;
  seo: SeoSettings;
  services: Service[];
  skills: Skill[];
  projects: Project[];
  pricing: PricingPackage[];
  testimonials: Testimonial[];
  orders: ClientOrder[];
  messages: ContactMessage[];
}
