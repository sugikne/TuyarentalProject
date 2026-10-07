import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { packages, motorbikes } from '@/constants';
import { 
  Star, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ArrowLeft, 
  Calendar, 
  User, 
  Info, 
  Car, 
  Bike, 
  Key, 
  ShieldCheck, 
  Wrench, 
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import BookingDialog from '@/components/BookingDialog';
import SEO from '@/components/SEO';

export default function PackageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language ? i18n.language.substring(0, 2).toLowerCase() : 'en';

  const cleanId = id?.replace(/^rental-/, '');
  const pkg = packages.find(p => p.id === id || p.id === cleanId);
  const bike = !pkg ? motorbikes.find(m => m.id === id || m.id === cleanId) : null;
  const item = pkg || bike;
  const isRental = !!bike;

  if (!item) {
    return (
      <div className="pt-32 pb-24 text-center min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <Info className="w-8 h-8 text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-brand-navy">
          {t('service_not_found')}
        </h2>
        <p className="text-muted-foreground text-sm max-w-md mb-6">
          {t('service_not_found_desc')}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button onClick={() => navigate('/packages')} className="bg-brand-blue text-white rounded-xl">
            {t('nav_packages')}
          </Button>
          <Button onClick={() => navigate('/rental')} variant="outline" className="rounded-xl">
            {t('nav_rental')}
          </Button>
        </div>
      </div>
    );
  }

  const isCar = item.cardType === 'car';
  const isMotorTour = item.cardType === 'motorcycle';
  const titleText = currentLang === 'id' && item.name_id ? item.name_id : item.name;
  const descriptionText = currentLang === 'id' && item.description_id ? item.description_id : item.description;
  const vehicleNameText = currentLang === 'id' && item.vehicleName_id ? item.vehicleName_id : (item.vehicleName || item.specs);
  const durationText = currentLang === 'id' && item.duration_id ? item.duration_id : item.duration;
  const highlightsList = currentLang === 'id' && item.highlights_id ? item.highlights_id : (item.highlights || []);
  const inclusionsList = currentLang === 'id' && item.inclusions_id ? item.inclusions_id : (item.inclusions || []);

  const badgeIcon = isCar ? Car : isMotorTour ? Bike : Key;
  const badgeLabel = isCar 
    ? t('car_tour_badge') 
    : isMotorTour 
    ? t('motor_tour_badge') 
    : t('rental_badge');

  return (
    <div className="pt-24 sm:pt-28 md:pt-32 pb-20 sm:pb-24 bg-background min-h-screen">
      <SEO 
        title={`${titleText} - Nusa Penida ${isRental ? 'Motor Rental' : 'Tour'}`}
        description={descriptionText}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Back Navigation Bar */}
        <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
          <button 
            onClick={() => navigate(isRental ? '/rental' : '/packages')}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-brand-blue transition-colors group font-semibold text-xs sm:text-sm py-1.5 px-2.5 -ml-2.5 rounded-lg hover:bg-slate-100"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{isRental ? t('back_to_rentals') : t('back_to_packages')}</span>
          </button>

          <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">
            ID: {item.id}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Visuals & Quick Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Main Featured Image Card (no shadow) */}
            <div className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden relative border border-slate-200 bg-slate-900 group">
              <img 
                src={item.image} 
                alt={titleText} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
              
              {/* Type Badge */}
              <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10">
                <span className={`px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${
                  isCar 
                    ? 'bg-emerald-600 text-white' 
                    : isMotorTour 
                    ? 'bg-amber-500 text-white' 
                    : 'bg-sky-600 text-white'
                }`}>
                  {isCar && <Car className="w-3.5 h-3.5" />}
                  {isMotorTour && <Bike className="w-3.5 h-3.5" />}
                  {isRental && <Key className="w-3.5 h-3.5" />}
                  {badgeLabel}
                </span>
              </div>

              {/* Price Tag Overlay on Image */}
              <div className="absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-4 z-10 bg-black/80 backdrop-blur-md px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl border border-white/10 text-white flex flex-col items-end">
                <span className="text-[10px] uppercase font-bold text-slate-300">
                  {isRental ? t('rental_rate_day') : t('price_package')}
                </span>
                <span className="text-base sm:text-lg font-black text-white">
                  IDR {(item.price / 1000).toFixed(0)}K
                </span>
              </div>
            </div>

            {/* Quick Metrics Bar (no shadow) */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
              <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200 flex flex-col items-center text-center">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-brand-blue mb-1 sm:mb-2 shrink-0" />
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t('duration')}</span>
                <span className="text-xs sm:text-sm font-extrabold text-brand-navy mt-0.5 truncate w-full">{durationText}</span>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200 flex flex-col items-center text-center">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-brand-blue mb-1 sm:mb-2 shrink-0" />
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {isRental ? t('coverage') : t('destinations')}
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-brand-navy mt-0.5 truncate w-full">
                  {isRental 
                    ? t('all_penida')
                    : `${item.destinations?.length || 0} ${t('stops')}`}
                </span>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200 flex flex-col items-center text-center">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-brand-blue fill-brand-blue mb-1 sm:mb-2 shrink-0" />
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t('rating')}</span>
                <span className="text-xs sm:text-sm font-extrabold text-brand-navy mt-0.5">{item.rating} / 5</span>
              </div>
            </div>

            {/* Highlights Box (no shadow) */}
            <div className="bg-brand-blue/5 rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-brand-blue/15">
              <h3 className="text-sm sm:text-base font-extrabold text-brand-navy mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-brand-blue shrink-0" />
                {isRental ? t('scooter_highlights') : t('plan_highlights')}
              </h3>
              <ul className="space-y-2.5 sm:space-y-3">
                {highlightsList.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right Column: In-Depth Service Specifications & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-7 flex flex-col gap-8"
          >
            {/* Header Title & Subtitle */}
            <div>
              <div className="flex flex-wrap gap-2 items-center mb-3">
                <span className="bg-brand-blue/10 text-brand-blue px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                  {isRental ? t('daily_rental_tag') : `${item.category} Tour`}
                </span>
                <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                  isCar ? 'bg-emerald-100 text-emerald-800' : isMotorTour ? 'bg-amber-100 text-amber-800' : 'bg-sky-100 text-sky-800'
                }`}>
                  {vehicleNameText}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-black tracking-tight text-brand-navy mb-4">
                {titleText}
              </h1>

              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {descriptionText}
              </p>
            </div>

            {/* Rental Specific Specifications OR Tour Package Itinerary */}
            {isRental ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-brand-navy mb-4 flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-brand-blue shrink-0" />
                    {t('vehicle_specs')}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    {(item.specsList || []).map((spec, idx) => (
                      <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground font-semibold">
                          {currentLang === 'id' && spec.label_id ? spec.label_id : spec.label}
                        </span>
                        <span className="text-xs sm:text-sm font-extrabold text-brand-navy">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rental Requirements Cards */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    {t('quick_rental_req')}
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 font-medium">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      {t('req_id')}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      {t('req_sim')}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      {t('req_delivery')}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      {t('req_deposit')}
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              /* Tour Package Itinerary (all starting directly at Penida harbor) */
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-brand-navy mb-4 sm:mb-6 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-brand-blue shrink-0" />
                  {t('trip_itinerary')}
                </h3>
                <div className="space-y-4 sm:space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-slate-200">
                  {(item.itinerary || []).map((step, index) => {
                    const activityText = currentLang === 'id' && step.activity_id ? step.activity_id : step.activity;
                    return (
                      <div key={index} className="flex gap-4 sm:gap-6 relative">
                        <div className="w-6 h-6 rounded-full bg-white border-4 border-brand-blue shrink-0 z-10" />
                        <div className="bg-slate-50/80 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200 flex-1">
                          <span className="text-[11px] sm:text-xs font-bold text-brand-blue uppercase tracking-tight block mb-0.5">
                            {step.time}
                          </span>
                          <p className="text-brand-navy font-bold text-xs sm:text-sm leading-snug">
                            {activityText}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Inclusions Checklist (no shadow) */}
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-brand-navy mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-brand-blue shrink-0" />
                {isRental ? t('included_in_rental') : t('whats_included')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {inclusionsList.map((inclusion, index) => (
                  <div key={index} className="flex items-start gap-2.5 bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-700 leading-snug">{inclusion}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price & Booking Action Card (no shadow) */}
            <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6">
                <div>
                  <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider block mb-1">
                    {isRental ? t('daily_rental_rate') : t('price_per_adult')}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black text-brand-navy">
                      IDR {(item.price / 1000).toFixed(0)}K
                    </span>
                    <span className="text-muted-foreground text-xs sm:text-sm font-medium">
                      {isRental ? t('per_bike_day') : t('all_inclusive')}
                    </span>
                  </div>
                </div>

                <div className="w-full sm:w-auto">
                  <BookingDialog type={isRental ? "rental" : "package"} itemName={item.name}>
                    <Button 
                      size="lg" 
                      className="w-full sm:w-auto bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl sm:rounded-2xl px-8 sm:px-10 h-12 sm:h-14 text-sm sm:text-base font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <span>{isRental ? t('rent_this_bike_cta') : t('book_now')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </BookingDialog>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {t('free_cancel')}
                </span>
                <span>{t('instant_wa')}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
