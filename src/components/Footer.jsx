import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Instagram, Youtube, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-display font-black tracking-tighter text-brand-navy">
                TUYA<span className="text-brand-blue">RENTAL</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              {t('footer_desc')}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-brand-blue hover:text-white transition-all shadow-sm">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-brand-blue hover:text-white transition-all shadow-sm">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-brand-navy font-bold text-sm uppercase tracking-widest mb-8">{t('nav_header')}</h4>
            <ul className="space-y-4">
              {[
                { label: t('nav_home'), path: '/' },
                { label: t('nav_packages'), path: '/packages' },
                { label: t('nav_rental'), path: '/rental' },
                { label: t('nav_blog'), path: '/blog' },
                { label: t('nav_about'), path: '/about' },
              ].map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className="text-slate-500 hover:text-brand-blue text-sm font-medium transition-colors flex items-center group"
                  >
                    <ArrowRight size={14} className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-brand-navy font-bold text-sm uppercase tracking-widest mb-8">{t('support_header')}</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/contact" className="text-slate-500 hover:text-brand-blue text-sm font-medium transition-colors">
                  {t('nav_contact')}
                </Link>
              </li>
              <li>
                <a href="#" className="text-slate-500 hover:text-brand-blue text-sm font-medium transition-colors">{t('booking_guide')}</a>
              </li>
              <li>
                <a href="#" className="text-slate-500 hover:text-brand-blue text-sm font-medium transition-colors">{t('terms')}</a>
              </li>
              <li>
                <a href="#" className="text-slate-500 hover:text-brand-blue text-sm font-medium transition-colors">{t('privacy')}</a>
              </li>
              <li>
                <a href="#" className="text-slate-500 hover:text-brand-blue text-sm font-medium transition-colors">{t('faq')}</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-brand-navy font-bold text-sm uppercase tracking-widest mb-8">{t('contact_header')}</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                  <MapPin size={16} />
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Sanur Harbor, Bali / Nusa Penida Harbor, Klungkung, Bali
                </p>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                  <Phone size={16} />
                </div>
                <p className="text-slate-500 text-sm font-semibold">+62 857 3787 2793</p>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                  <Mail size={16} />
                </div>
                <p className="text-slate-500 text-sm font-semibold">hello@nusapenidatrip.com</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
            © {currentYear} TUYA RENTAL NUSA PENIDA • ALL RIGHTS RESERVED
          </p>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{t('accepted_payments')}</span>
            <div className="flex gap-4 opacity-70 grayscale hover:grayscale-0 transition-all items-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg" alt="Dana" className="h-4" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg" alt="GoPay" className="h-4" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
