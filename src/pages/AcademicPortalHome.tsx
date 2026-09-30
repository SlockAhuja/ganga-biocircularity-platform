import React, { useState } from 'react';
import { Navbar } from '../components/academic/Navbar';
import { HeroSection } from '../components/academic/HeroSection';
import { AboutSection } from '../components/academic/AboutSection';
import { ResearchAreasSection } from '../components/academic/ResearchAreasSection';
import { CollaborationSection } from '../components/academic/CollaborationSection';
import { InstitutionalPartnersSection } from '../components/academic/InstitutionalPartnersSection';
import { ResearchProfileSection } from '../components/academic/ResearchProfileSection';
import { GangaPlatformIntegrationSection } from '../components/academic/GangaPlatformIntegrationSection';
import { PublicationsSection } from '../components/academic/PublicationsSection';
import { ContactSection } from '../components/academic/ContactSection';
import { CollaborationModal } from '../components/academic/CollaborationModal';
import { Footer } from '../components/academic/Footer';
import type { ResearchArea } from '../data/researchData';

interface AcademicPortalHomeProps {
  onOpenGangaPlatform: () => void;
}

export const AcademicPortalHome: React.FC<AcademicPortalHomeProps> = ({
  onOpenGangaPlatform
}) => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [collabModalOpen, setCollabModalOpen] = useState<boolean>(false);
  const [selectedAreaForModal, setSelectedAreaForModal] = useState<string>('');

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'ganga-initiative') {
      const el = document.getElementById('ganga-initiative');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectResearchArea = (area: ResearchArea) => {
    setSelectedAreaForModal(area.title);
    setCollabModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* 1. Academic Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenGangaPlatform={onOpenGangaPlatform}
        onOpenCollaborationModal={() => {
          setSelectedAreaForModal('');
          setCollabModalOpen(true);
        }}
      />

      {/* 2. Hero Section */}
      <HeroSection
        onExploreResearch={() => handleNavigate('research')}
        onExploreGangaPlatform={() => handleNavigate('ganga-initiative')}
        onProposeCollaboration={() => {
          setSelectedAreaForModal('');
          setCollabModalOpen(true);
        }}
      />

      {/* 3. About Section */}
      <AboutSection onExploreCollab={() => handleNavigate('collaboration')} />

      {/* 4. Research Areas Section */}
      <ResearchAreasSection
        onSelectArea={handleSelectResearchArea}
        onOpenGanga={onOpenGangaPlatform}
      />

      {/* 5. Ganga Biocircularity Flagship Integration Section */}
      <GangaPlatformIntegrationSection onLaunchFullPlatform={onOpenGangaPlatform} />

      {/* 6. Academic Collaboration Section */}
      <CollaborationSection
        onProposeCollaboration={() => {
          setSelectedAreaForModal('');
          setCollabModalOpen(true);
        }}
      />

      {/* 7. Institutional Partners Section */}
      <InstitutionalPartnersSection
        onProposePartner={() => {
          setSelectedAreaForModal('Institutional Partnership');
          setCollabModalOpen(true);
        }}
      />

      {/* 8. Research Profile Section (Dr. Praveen Kumar Sharma) */}
      <ResearchProfileSection
        onContact={() => handleNavigate('contact')}
      />

      {/* 9. Publications & Intellectual Property Section */}
      <PublicationsSection />

      {/* 10. Contact & Proposal Section */}
      <ContactSection />

      {/* 11. Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenGanga={onOpenGangaPlatform}
      />

      {/* Collaboration Dialog Modal */}
      <CollaborationModal
        isOpen={collabModalOpen}
        onClose={() => setCollabModalOpen(false)}
        prefilledArea={selectedAreaForModal}
      />
    </div>
  );
};
