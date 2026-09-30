import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X
} from 'lucide-react';
import { Button } from '../ui/Button';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenGangaPlatform: () => void;
  onOpenCollaborationModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenGangaPlatform,
  onOpenCollaborationModal
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'research', label: 'Research Areas' },
    { id: 'profile', label: 'Dr. Praveen Sharma' },
    { id: 'ganga-initiative', label: 'Ganga Biocircularity', badge: 'Flagship' },
    { id: 'collaboration', label: 'Academic Collaboration' },
    { id: 'partners', label: 'Institutions' },
    { id: 'publications', label: 'Publications' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-200 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2.5' 
        : 'bg-white border-b border-slate-100 py-3.5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name */}
          <div 
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
              <span className="font-mono text-base">Ψ</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-base tracking-tight font-sans">
                  ADVANCED ELECTROMAGNETICS & INTERDISCIPLINARY LAB
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Research Portal & Academic Collaboration Initiative • Dr. Praveen Kumar Sharma
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 text-xs font-medium text-slate-600">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 text-blue-800 font-semibold shadow-xs'
                      : 'hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full font-mono bg-emerald-100 text-emerald-800 font-semibold">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={onOpenGangaPlatform}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>🌿 Ganga Live Map</span>
            </button>
            <Button
              variant="primary"
              size="sm"
              onClick={onOpenCollaborationModal}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs"
            >
              Propose Collaboration
            </Button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="xl:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden pt-4 pb-3 border-t border-slate-100 mt-3 space-y-1 animate-in fade-in duration-200">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between cursor-pointer ${
                    isActive ? 'bg-blue-50 text-blue-900 font-bold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {link.label}
                  </span>
                  {link.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded font-mono bg-emerald-100 text-emerald-800">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => { onOpenGangaPlatform(); setMobileMenuOpen(false); }}
                className="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 text-center cursor-pointer"
              >
                🌿 Explore Ganga Biocircularity Platform
              </button>
              <button
                onClick={() => { onOpenCollaborationModal(); setMobileMenuOpen(false); }}
                className="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-slate-900 text-white text-center cursor-pointer"
              >
                Propose Academic Collaboration
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
