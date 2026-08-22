import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Shield, Star, Compass, Car, Bike } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { packages } from '@/constants';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import BookingDialog from '@/components/BookingDialog';

export default function Home() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language ? i18n.language.substring(0, 2).toLowerCase() : 'en';

  return (
    <div className="overflow-hidden">
      <SEO />
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/60 to-transparent z-10" />
          <img 
            src="/img/east.jpg" 
            alt="Nusa Penida" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-blue/10 mix-blend-overlay z-20" />
        </div>

        <div className="relative z-30 max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-white font-bold tracking-[0.2em] uppercase text-xs mb-6 flex items-center gap-3"
            >
              <span className="w-8 h-px bg-white"></span> {t('hero_tag')}
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-7xl font-display font-black text-white mb-6 leading-[1.1] tracking-tight"
            >
              {t('hero_title')}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-slate-200 opacity-90 mb-10 max-w-lg leading-relaxed font-sans"
            >
              {t('hero_desc')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link to="/packages">
                <Button size="lg" className="bg-brand-blue hover:bg-brand-blue/90 text-white rounded-full px-8 py-6 text-base font-bold shadow-xl shadow-brand-blue/30 group">
                  {t('hero_cta')}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="pt-24 pb-24 max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Featured Packages */}
        <div className="md:col-span-8 flex flex-col gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between"
          >
            <div>
              <span className="text-brand-blue text-xs font-bold uppercase tracking-widest block mb-1">
                {t('pkg_tag')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-navy">
                {t('popular_tours')}
              </h2>
            </div>
            <Link to="/packages" className="text-xs sm:text-sm font-bold text-brand-blue hover:underline flex items-center gap-1">
              {t('view_all')} <ArrowRight size={14} />
            </Link>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8"
          >
            {packages.map((pkg) => {
              const isCar = pkg.cardType === 'car';
              const isMotor = pkg.cardType === 'motorcycle';

              const descriptionText = currentLang === 'id' && pkg.description_id ? pkg.description_id : pkg.description;
              const vehicleNameText = currentLang === 'id' && pkg.vehicleName_id ? pkg.vehicleName_id : pkg.vehicleName;
              const durationText = currentLang === 'id' && pkg.duration_id ? pkg.duration_id : pkg.duration;

              return (
                <motion.div 
                  key={pkg.id}
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.95 },
                    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
                  }}
                  className={`group bg-white rounded-3xl overflow-hidden border transition-all hover:shadow-2xl flex flex-col justify-between ${
                    isCar ? 'border-emerald-200 hover:border-emerald-400' : 'border-amber-200 hover:border-amber-400'
                  }`}
                >
                  <div>
                    <Link to={`/package/${pkg.id}`} className="h-48 overflow-hidden relative block">
                      <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      
                      {/* Vehicle Badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1 ${
                          isCar ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'
                        }`}>
                          {isCar ? <Car className="w-3 h-3" /> : <Bike className="w-3 h-3" />}
                          {isCar ? t('car_tour_badge') : t('motor_tour_badge')}
                        </span>
                      </div>

                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                        {durationText}
                      </div>
                    </Link>
                    <div className="p-6">
                      <div className="mb-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          isCar ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {vehicleNameText}
                        </span>
                      </div>

                      <div className="flex justify-between items-start mb-3">
                        <Link to={`/package/${pkg.id}`} className="hover:text-brand-blue transition-colors">
                          <h3 className="text-base font-bold text-brand-navy leading-snug">{pkg.name}</h3>
                        </Link>
                      </div>
                      <p className="text-slate-500 text-xs mb-4 line-clamp-2 leading-relaxed">{descriptionText}</p>
                    </div>
                  </div>
                  
                  <div className="px-6 pb-6">
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-bold uppercase">{t('price_package')}</span>
                        <span className="text-brand-navy font-black text-lg">IDR {pkg.price/1000}K</span>
                      </div>
                      <BookingDialog type="package" itemName={pkg.name}>
                        <Button className="text-xs font-bold text-white rounded-xl px-5 h-9 bg-brand-blue hover:bg-brand-blue/90 shadow-md shadow-brand-blue/20">
                          {t('book_trip')}
                        </Button>
                      </BookingDialog>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Sidebar Info */}
        <div className="md:col-span-4 flex flex-col gap-8">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-brand-navy text-white p-8 rounded-3xl relative overflow-hidden"
          >
            <div className="relative z-10">
              <h3 className="font-display font-bold text-xl mb-6 text-white">{t('why_us_title')}</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/20 flex items-center justify-center shrink-0">
                    <Shield className="text-brand-blue h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{t('safety_title')}</p>
                    <p className="text-xs text-slate-400 mt-1">{t('safety_desc')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/20 flex items-center justify-center shrink-0">
                    <Compass className="text-brand-blue h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{t('hidden_title')}</p>
                    <p className="text-xs text-slate-400 mt-1">{t('hidden_desc')}</p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-navy bg-slate-300 relative overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?u=${i}`} alt="User" />
                    </div>
                  ))}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">4.9/5 from 2k+ Guests</span>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/10 blur-[80px] -translate-y-1/2 translate-x-1/2" />
          </motion.div>

          {/* Mini Fleet Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white border border-slate-200 p-8 rounded-3xl"
          >
            <h3 className="font-display font-bold text-brand-navy text-xs mb-6 uppercase tracking-wider">{t('fleet_title')}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 mb-1">Vario 125</p>
                <p className="text-sm font-black text-brand-blue">IDR 100K</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 mb-1">SCOOPY</p>
                <p className="text-sm font-black text-brand-navy">IDR 80K</p>
              </div>
            </div>
            <Link to="/rental">
              <Button variant="ghost" className="w-full mt-6 text-xs text-slate-500 font-bold hover:text-brand-blue">
                {t('explore_fleet')} →
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
