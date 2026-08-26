import React, { useState, useEffect } from 'react';
import { fetchPortfolioData } from './lib/api';
import { initialData } from './data/initialData';
import { AppStateData, Project, Service, PricingPackage } from './types';
import { injectStructuredData } from './lib/seo';

// Subcomponents
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { YouTubeShowcase } from './components/YouTubeShowcase';
import { Footer } from './components/Footer';
import { FloatingContactHub } from './components/FloatingContactHub';

// Modals
import { CaseStudyModal } from './components/CaseStudyModal';
import { StartProjectModal } from './components/StartProjectModal';
import { ClientDashboard } from './components/ClientDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { LegalModal } from './components/LegalModals';

export const App: React.FC = () => {
  // State
  const [data, setData] = useState<AppStateData>(initialData);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderDefaultService, setOrderDefaultService] = useState<string | undefined>(undefined);
  const [orderDefaultPackage, setOrderDefaultPackage] = useState<string | undefined>(undefined);

  const [isClientDashboardOpen, setIsClientDashboardOpen] = useState(false);
  const [clientTrackingCode, setClientTrackingCode] = useState<string | undefined>(undefined);

  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  // Fetch portfolio data from backend on load
  const loadPortfolioData = async () => {
    try {
      const portfolioData = await fetchPortfolioData();
      if (portfolioData) {
        setData(portfolioData);
        
        // Update document title and meta description dynamically
        if (portfolioData.seo) {
          document.title = portfolioData.seo.siteTitle || 'Alex Morgan | Professional Full-Stack Web Developer & Engineer';
          
          let metaDesc = document.querySelector('meta[name="description"]');
          if (metaDesc) {
            metaDesc.setAttribute('content', portfolioData.seo.metaDescription);
          } else {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            metaDesc.setAttribute('content', portfolioData.seo.metaDescription);
            document.head.appendChild(metaDesc);
          }

          // Inject Structured Data (Schema.org JSON-LD)
          injectStructuredData(portfolioData.profile, portfolioData.seo, portfolioData.projects);
        }
      }
    } catch (err) {
      console.error('Failed to load portfolio data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPortfolioData();
  }, []);

  // Handlers
  const handleOpenOrderWithService = (serviceTitle: string) => {
    setOrderDefaultService(serviceTitle);
    setOrderDefaultPackage(undefined);
    setIsOrderModalOpen(true);
  };

  const handleOpenOrderWithPackage = (packageName: string) => {
    setOrderDefaultPackage(packageName);
    setOrderDefaultService(undefined);
    setIsOrderModalOpen(true);
  };

  const handleOpenOrderGeneral = () => {
    setOrderDefaultService(undefined);
    setOrderDefaultPackage(undefined);
    setIsOrderModalOpen(true);
  };

  const handleOpenClientTracker = (trackingCode?: string) => {
    setClientTrackingCode(trackingCode);
    setIsClientDashboardOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white font-sans antialiased overflow-x-hidden">
      
      {/* Navigation Header */}
      <Navbar
        profile={data.profile}
        onOpenOrderModal={handleOpenOrderGeneral}
        onOpenClientDashboard={() => handleOpenClientTracker()}
        onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
      />

      {/* Main Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero
          profile={data.profile}
          onOpenOrderModal={handleOpenOrderGeneral}
          onViewProjects={() => {
            const el = document.getElementById('projects');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onContactClick={() => {
            const el = document.getElementById('contact');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 2. About Me Section */}
        <About
          profile={data.profile}
          onOpenOrderModal={handleOpenOrderGeneral}
        />

        {/* 3. Services Section */}
        <Services
          services={data.services}
          onSelectService={handleOpenOrderWithService}
          onOpenOrderModal={handleOpenOrderGeneral}
        />

        {/* 4. Skills & Technologies Section */}
        <Skills
          skills={data.skills}
        />

        {/* 5. Projects & Case Studies Gallery */}
        <Projects
          projects={data.projects}
          onSelectProject={(project) => setSelectedCaseStudy(project)}
          onOpenOrderModal={handleOpenOrderGeneral}
        />

        {/* 6. Pricing Packages Section */}
        <Pricing
          packages={data.pricing}
          onOrderPackage={handleOpenOrderWithPackage}
        />

        {/* 7. Client Reviews & Testimonials */}
        <Testimonials
          testimonials={data.testimonials}
        />

        {/* 8. YouTube Showcase & Tutorials */}
        <YouTubeShowcase
          profile={data.profile}
        />

        {/* 9. Contact & Direct Collaboration Section */}
        <Contact
          profile={data.profile}
          onOpenOrderModal={handleOpenOrderGeneral}
        />
      </main>

      {/* Footer Section */}
      <Footer
        profile={data.profile}
        onOpenOrderModal={handleOpenOrderGeneral}
        onOpenClientDashboard={() => handleOpenClientTracker()}
        onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
        onOpenPrivacyModal={() => setLegalModalType('privacy')}
        onOpenTermsModal={() => setLegalModalType('terms')}
      />

      {/* Floating Contact Hub & WhatsApp Speed-Dial */}
      <FloatingContactHub
        profile={data.profile}
        onOpenOrderModal={handleOpenOrderGeneral}
      />

      {/* MODALS */}
      
      {/* Detailed Case Study Modal */}
      <CaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onOpenOrderModal={handleOpenOrderGeneral}
      />

      {/* Client Order Submission Intake Wizard */}
      <StartProjectModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        services={data.services}
        packages={data.pricing}
        defaultService={orderDefaultService}
        defaultPackage={orderDefaultPackage}
        onOpenClientDashboard={(code) => handleOpenClientTracker(code)}
      />

      {/* Client Portal & Tracking Hub */}
      <ClientDashboard
        isOpen={isClientDashboardOpen}
        onClose={() => setIsClientDashboardOpen(false)}
        initialTrackingCode={clientTrackingCode}
      />

      {/* Developer Admin Dashboard CMS */}
      <AdminDashboard
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        onDataUpdated={loadPortfolioData}
      />

      {/* Privacy Policy / Terms Modals */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
        profile={data.profile}
      />

    </div>
  );
};

export default App;
