import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const currentLang = i18n.language ? i18n.language.substring(0, 2).toLowerCase() : 'en';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md border-b border-slate-200 py-2' 
          : 'bg-white/50 backdrop-blur-sm md:bg-transparent py-4 md:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center transition-transform group-hover:rotate-12">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <span className="text-xl font-display font-bold text-brand-navy tracking-tight">
              Tuya<span className="text-brand-blue">Rental</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/packages" className="text-sm font-semibold text-slate-600 hover:text-brand-blue transition-colors">
              {t('nav_packages')}
            </Link>
            <Link to="/rental" className="text-sm font-semibold text-slate-600 hover:text-brand-blue transition-colors">
              {t('nav_rental')}
            </Link>
            <Link to="/blog" className="text-sm font-semibold text-slate-600 hover:text-brand-blue transition-colors">
              {t('nav_blog')}
            </Link>
            <Link to="/about" className="text-sm font-semibold text-slate-600 hover:text-brand-blue transition-colors">
              {t('nav_about')}
            </Link>
            
            <div className="flex items-center gap-4 ml-4">
              <div className="h-4 w-px bg-slate-300 mx-2"></div>
              
              {/* Desktop Language Toggle */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1.5 text-slate-700 font-extrabold text-xs uppercase tracking-wider bg-slate-100/80 hover:bg-slate-200/80 rounded-full px-3 h-8">
                    <Globe className="h-3.5 w-3.5 text-brand-blue" />
                    <span>{currentLang === 'id' ? 'ID' : 'EN'}</span>
                    <ChevronDown className="h-3 w-3 opacity-60" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-36 rounded-xl p-1">
                  <DropdownMenuItem 
                    onClick={() => changeLanguage('en')}
                    className={`rounded-lg cursor-pointer text-xs font-semibold ${currentLang === 'en' ? 'bg-brand-blue/10 text-brand-blue' : ''}`}
                  >
                    🇬🇧 English (EN)
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => changeLanguage('id')}
                    className={`rounded-lg cursor-pointer text-xs font-semibold ${currentLang === 'id' ? 'bg-brand-blue/10 text-brand-blue' : ''}`}
                  >
                    🇮🇩 Indonesia (ID)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link to="/packages">
                <Button className="bg-brand-orange text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-brand-orange/20 hover:bg-brand-orange/90 transition-all hover:-translate-y-0.5 text-xs">
                  {t('nav_book')}
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Right Controls */}
          <div className="md:hidden flex items-center gap-3">
            {/* Mobile Language Toggle */}
            <button
              onClick={() => changeLanguage(currentLang === 'en' ? 'id' : 'en')}
              className="flex items-center gap-1.5 bg-slate-100 text-slate-800 text-xs font-extrabold px-3 py-1.5 rounded-full border border-slate-200"
            >
              <Globe className="h-3.5 w-3.5 text-brand-blue" />
              <span>{currentLang === 'id' ? 'ID' : 'EN'}</span>
            </button>

            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-dark absolute top-full left-0 right-0 p-6 border-t border-white/10 shadow-2xl animate-in slide-in-from-top">
          <div className="flex flex-col gap-4 text-white">
            <Link to="/packages" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-bold py-1 border-b border-white/10 flex items-center justify-between">
              <span>{t('nav_packages')}</span>
              <span className="text-xs text-brand-blue">→</span>
            </Link>
            <Link to="/rental" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-bold py-1 border-b border-white/10 flex items-center justify-between">
              <span>{t('nav_rental')}</span>
              <span className="text-xs text-brand-blue">→</span>
            </Link>
            <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-bold py-1 border-b border-white/10 flex items-center justify-between">
              <span>{t('nav_blog')}</span>
              <span className="text-xs text-brand-blue">→</span>
            </Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-bold py-1 border-b border-white/10 flex items-center justify-between">
              <span>{t('nav_about')}</span>
              <span className="text-xs text-brand-blue">→</span>
            </Link>

            <div className="pt-2">
              <Link to="/packages" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="bg-brand-orange text-white w-full py-3 rounded-full font-bold shadow-lg">
                  {t('nav_book')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
