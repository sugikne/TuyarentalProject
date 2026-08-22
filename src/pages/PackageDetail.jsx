import { useParams, useNavigate } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { packages } from '@/constants';
import { Star, Clock, MapPin, CheckCircle2, ArrowLeft, Calendar, User, Info, Car, Bike } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BookingDialog from '@/components/BookingDialog';
import SEO from '@/components/SEO';

export default function PackageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language ? i18n.language.substring(0, 2).toLowerCase() : 'en';

  const pkg = packages.find(p => p.id === id);

  if (!pkg) {
    return (
      <div className="pt-32 pb-24 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Package not found</h2>
        <Button onClick={() => navigate('/packages')}>Back to Packages</Button>
      </div>
    );
  }

  const isCar = pkg.cardType === 'car';
  const descriptionText = currentLang === 'id' && pkg.description_id ? pkg.description_id : pkg.description;
  const vehicleNameText = currentLang === 'id' && pkg.vehicleName_id ? pkg.vehicleName_id : pkg.vehicleName;
  const durationText = currentLang === 'id' && pkg.duration_id ? pkg.duration_id : pkg.duration;

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <SEO 
        title={`${pkg.name} - Nusa Penida Tour`}
        description={descriptionText}
      />
      
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/packages')}
          className="flex items-center gap-2 text-muted-foreground hover:text-brand-blue transition-colors mb-8 group font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {t('back_to_packages')}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side: Images & Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-8 shadow-2xl relative">
              <img 
                src={pkg.image} 
                alt={pkg.name} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute top-4 left-4">
                <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-md flex items-center gap-1.5 ${
                  isCar ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'
                }`}>
                  {isCar ? <Car className="w-4 h-4" /> : <Bike className="w-4 h-4" />}
                  {isCar ? t('car_tour_badge') : t('motor_tour_badge')}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-4 rounded-2xl border border-border flex flex-col items-center text-center">
                <Clock className="w-5 h-5 text-brand-blue mb-2" />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t('duration')}</span>
                <span className="text-sm font-bold">{durationText}</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-border flex flex-col items-center text-center">
                <MapPin className="w-5 h-5 text-brand-blue mb-2" />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t('destinations')}</span>
                <span className="text-sm font-bold">{pkg.destinations.length} {currentLang === 'id' ? 'Tempat' : 'Stops'}</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-border flex flex-col items-center text-center">
                <Star className="w-5 h-5 text-brand-blue mb-2" />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t('rating')}</span>
                <span className="text-sm font-bold">{pkg.rating} / 5</span>
              </div>
            </div>

            <div className="bg-brand-blue/5 rounded-3xl p-8 border border-brand-blue/10">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-brand-blue" />
                {t('plan_highlights')}
              </h3>
              <ul className="space-y-4">
                {pkg.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right Side: Details & Booking */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 items-center mb-4">
                <span className="bg-brand-blue/10 text-brand-blue px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {pkg.category} Side Trip
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  isCar ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {vehicleNameText}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6">{pkg.name}</h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {descriptionText}
              </p>
            </div>

            <div className="space-y-12">
              {/* Itinerary */}
              <div>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-brand-blue" />
                  {t('trip_itinerary')}
                </h3>
                <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-border">
                  {pkg.itinerary.map((item, index) => (
                    <div key={index} className="flex gap-6 relative">
                      <div className="w-6 h-6 rounded-full bg-white border-4 border-brand-blue shrink-0 z-10" />
                      <div>
                        <span className="text-xs font-bold text-brand-blue uppercase tracking-tighter block mb-1">{item.time}</span>
                        <p className="text-brand-navy font-semibold text-sm sm:text-base">{item.activity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions */}
              <div>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-brand-blue" />
                  {t('whats_included')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pkg.inclusions.map((inclusion, index) => (
                    <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-border shadow-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                      <span className="text-sm font-medium">{inclusion}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Booking Footer */}
              <div className="bg-white border border-border rounded-3xl p-8 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <span className="text-sm text-muted-foreground font-medium block">{t('price_per_adult')}</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-brand-navy">IDR {(pkg.price / 1000).toFixed(0)}K</span>
                      <span className="text-muted-foreground text-sm">{t('all_inclusive')}</span>
                    </div>
                  </div>
                  <BookingDialog type="package" itemName={pkg.name}>
                    <Button size="lg" className="bg-brand-blue hover:bg-brand-blue/90 text-white rounded-2xl px-12 h-16 text-lg font-bold shadow-xl shadow-brand-blue/30 group">
                      {t('book_now')}
                      <ArrowLeft className="w-5 h-5 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </BookingDialog>
                </div>
                <p className="mt-6 text-center text-xs text-muted-foreground bg-muted p-3 rounded-lg">
                  {t('free_cancel')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
