import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { packages, motorbikes } from '@/constants';
import { Star, MapPin, Clock, ArrowRight, Filter, Car, Bike, Key, ShieldCheck, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import BookingDialog from '@/components/BookingDialog';

export default function Packages() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language ? i18n.language.substring(0, 2).toLowerCase() : 'en';

  const [activeCategory, setActiveCategory] = useState('All');
  const [activeVehicleType, setActiveVehicleType] = useState('All'); // 'All' | 'car' | 'motorcycle' | 'rental'

  const categories = ['All', 'West', 'East', 'Full Island', 'Sunset'];
  const vehicleTypes = [
    { key: 'All', label: t('tab_all_services'), icon: null },
    { key: 'car', label: t('tab_car_package'), icon: Car },
    { key: 'motorcycle', label: t('tab_motor_package'), icon: Bike },
    { key: 'rental', label: t('tab_scooter_rental'), icon: Key },
  ];

  // Combine packages and rental items based on selected vehicle type
  const combinedItems = useMemo(() => {
    let list = [...packages];
    
    // Format motorbikes as rental cards when activeVehicleType is 'All' or 'rental'
    if (activeVehicleType === 'All' || activeVehicleType === 'rental') {
      const formattedRentals = motorbikes.map(bike => ({
        id: `rental-${bike.id}`,
        name: bike.name,
        description: currentLang === 'id' 
          ? `Sewa motor harian ${bike.specs}. Termasuk helm, jas hujan, bensin awal & bantuan 24 jam.` 
          : `Daily scooter rental (${bike.specs}). Includes SNI helmets, raincoats, starting fuel, and 24/7 roadside assist.`,
        price: bike.pricePerDay,
        duration: currentLang === 'id' ? '1 Hari (Sewa)' : '1 Day (Rental)',
        destinations: currentLang === 'id' ? ['Seluruh Nusa Penida'] : ['All Nusa Penida'],
        rating: 4.9,
        image: bike.image,
        category: 'Rental',
        cardType: 'rental',
        badgeLabel: t('rental_badge'),
        vehicleName: currentLang === 'id' ? (bike.vehicleName_id || 'Sewa Motor Harian') : (bike.vehicleName || 'Daily Scooter Rental'),
        isRental: true,
        inclusions: bike.inclusions
      }));

      if (activeVehicleType === 'rental') {
        list = formattedRentals;
      } else {
        list = [...list, ...formattedRentals];
      }
    } else {
      list = list.filter(item => item.cardType === activeVehicleType);
    }

    return list;
  }, [activeVehicleType, currentLang, t]);

  const filteredItems = useMemo(() => {
    let result = [...combinedItems];

    // Filter by destination category (only applies to tour packages)
    if (activeCategory !== 'All') {
      result = result.filter(pkg => pkg.category && pkg.category.toLowerCase() === activeCategory.toLowerCase());
    }

    return result;
  }, [combinedItems, activeCategory]);

  return (
    <div className="pt-28 md:pt-32 pb-24 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Title Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <span className="text-brand-blue font-bold text-xs uppercase tracking-widest block mb-2">
                {t('pkg_tag')}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold tracking-tight mb-3">
                {t('pkg_title')}
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
                {t('pkg_subtitle')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Vehicle Type Tabs (Clean Responsive Grid) */}
        <div className="mb-6">
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3 p-1.5 sm:p-2 bg-slate-100/90 rounded-2xl sm:rounded-full">
            {vehicleTypes.map((vt) => {
              const Icon = vt.icon;
              const isActive = activeVehicleType === vt.key;
              return (
                <button
                  key={vt.key}
                  onClick={() => setActiveVehicleType(vt.key)}
                  className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-navy text-white shadow-md'
                      : 'text-slate-600 hover:text-brand-navy hover:bg-white/70'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />}
                  <span className="truncate">{vt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Destination Category Filter Bar */}
        <div className="flex flex-col gap-4 mb-8 md:mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-2 rounded-2xl md:rounded-full border border-border flex items-center shadow-sm"
          >
            <div className="overflow-x-auto flex items-center gap-1.5 p-1 no-scrollbar w-full">
              {categories.map((cat) => (
                <Button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  variant="ghost"
                  className={`rounded-full px-5 h-9 text-xs sm:text-sm whitespace-nowrap transition-all font-medium shrink-0 ${
                    activeCategory === cat 
                      ? 'bg-brand-blue text-white hover:bg-brand-blue/90' 
                      : 'text-muted-foreground hover:bg-muted font-normal'
                  }`}
                >
                  {cat === 'All' ? t('tab_all_destinations') : `${cat} Penida`}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Active Filter Tag Chips */}
          {(activeCategory !== 'All' || activeVehicleType !== 'All') && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-wrap gap-2 items-center"
            >
              {[
                { 
                  type: 'vehicle', 
                  value: activeVehicleType !== 'All' ? vehicleTypes.find(v => v.key === activeVehicleType)?.label : null, 
                  Icon: activeVehicleType !== 'All' ? vehicleTypes.find(v => v.key === activeVehicleType)?.icon : null,
                  clear: () => setActiveVehicleType('All') 
                },
                { type: 'category', value: activeCategory !== 'All' ? `${activeCategory} Penida` : null, clear: () => setActiveCategory('All') }
              ].filter(f => f.value).map(filter => (
                <span key={filter.type} className="inline-flex items-center gap-1.5 bg-brand-navy text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                  {filter.Icon && <filter.Icon className="w-3.5 h-3.5 text-white" />}
                  <span>{filter.value}</span>
                  <button 
                    onClick={filter.clear} 
                    className="hover:bg-white/20 p-0.5 rounded-full transition-colors ml-0.5"
                    title="Remove filter"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
              <button 
                onClick={() => {
                  setActiveVehicleType('All');
                  setActiveCategory('All');
                }}
                className="text-xs font-bold text-brand-blue hover:underline px-2 py-1"
              >
                {t('reset_filters')}
              </button>
            </motion.div>
          )}
        </div>

        {/* Results Info */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-xs sm:text-sm font-medium text-muted-foreground">
            {t('showing_results', { count: filteredItems.length })}
          </p>
        </div>

        {/* Item Cards Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const isCar = item.cardType === 'car';
              const isMotor = item.cardType === 'motorcycle';
              const isRental = item.cardType === 'rental' || item.isRental;

              const descriptionText = currentLang === 'id' && item.description_id ? item.description_id : item.description;
              const vehicleNameText = currentLang === 'id' && item.vehicleName_id ? item.vehicleName_id : item.vehicleName;
              const durationText = currentLang === 'id' && item.duration_id ? item.duration_id : item.duration;

              return (
                <motion.div 
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className={`bg-white rounded-3xl md:rounded-[2.5rem] overflow-hidden border flex flex-col lg:flex-row group hover:shadow-xl transition-all duration-300 relative ${
                    isCar 
                      ? 'border-emerald-200 hover:shadow-emerald-500/10' 
                      : isMotor 
                      ? 'border-amber-200 hover:shadow-amber-500/10' 
                      : 'border-sky-200 hover:shadow-sky-500/10'
                  }`}
                >
                  {/* Card Image */}
                  <div className="lg:w-1/2 h-56 sm:h-64 lg:h-auto overflow-hidden block relative">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-col gap-2 items-start z-10">
                      {/* Vector Line Icon Badge */}
                      <span className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-md flex items-center gap-1.5 ${
                        isCar 
                          ? 'bg-emerald-600 text-white' 
                          : isMotor 
                          ? 'bg-amber-500 text-white' 
                          : 'bg-sky-600 text-white'
                      }`}>
                        {isCar && <Car className="w-3.5 h-3.5" />}
                        {isMotor && <Bike className="w-3.5 h-3.5" />}
                        {isRental && <Key className="w-3.5 h-3.5" />}
                        {isCar ? t('car_tour_badge') : isMotor ? t('motor_tour_badge') : t('rental_badge')}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="lg:w-1/2 p-5 sm:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center text-brand-blue text-xs font-bold bg-brand-blue/10 px-2 py-0.5 rounded-lg">
                          <Star className="w-3.5 h-3.5 fill-current mr-1" /> {item.rating}
                        </div>
                        <div className="flex items-center gap-1 text-xs font-bold text-slate-500 uppercase tracking-wider">
                          <Clock className="w-3.5 h-3.5 text-brand-blue" /> {durationText}
                        </div>
                      </div>

                      {/* Vehicle Sub-Spec Badge */}
                      <div className="mb-2.5">
                        <span className={`inline-flex items-center text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-lg border ${
                          isCar 
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                            : isMotor 
                            ? 'bg-amber-50 text-amber-800 border-amber-200' 
                            : 'bg-sky-50 text-sky-800 border-sky-200'
                        }`}>
                          {vehicleNameText}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold mb-2 tracking-tight text-brand-navy group-hover:text-brand-blue transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-muted-foreground text-xs mb-4 leading-relaxed line-clamp-2">
                        {descriptionText}
                      </p>
                      
                      <div className="flex items-center gap-4 mb-4">
                        {!isRental ? (
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-navy/70">
                            <MapPin className="w-3.5 h-3.5 text-brand-blue" /> {item.destinations?.length} {currentLang === 'id' ? 'Destinasi' : 'Stops'}
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                            <ShieldCheck className="w-3.5 h-3.5" /> {currentLang === 'id' ? 'Helm & Jas Hujan' : 'Helmets & Insurance'}
                          </div>
                        )}

                        {!isRental && (
                          <Link 
                            to={`/package/${item.id}`}
                            className="text-xs font-bold text-brand-blue hover:underline ml-auto flex items-center"
                          >
                            {t('route_details')} <ArrowRight className="ml-1 w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* Price & Action */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div>
                        <span className="text-[10px] text-muted-foreground block font-bold uppercase tracking-widest mb-0.5">
                          {isRental ? t('price_per_day') : t('price_package')}
                        </span>
                        <span className="text-lg sm:text-xl font-extrabold text-brand-navy">
                          IDR {(item.price / 1000).toFixed(0)}K
                        </span>
                      </div>
                      <BookingDialog type={isRental ? "rental" : "package"} itemName={item.name}>
                        <Button className="rounded-xl px-4 sm:px-5 h-9 sm:h-10 text-xs sm:text-sm font-bold text-white transition-all bg-brand-blue hover:bg-brand-blue/90 shadow-md shadow-brand-blue/20">
                          {isRental ? t('rent_bike') : t('book_trip')}
                        </Button>
                      </BookingDialog>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          {filteredItems.length === 0 && (
            <div className="col-span-full py-16 sm:py-24 text-center">
              <div className="bg-muted w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Filter className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2">{t('no_results')}</h3>
              <p className="text-muted-foreground text-xs sm:text-sm mb-6 sm:mb-8">{t('no_results_desc')}</p>
              <Button onClick={() => {setActiveVehicleType('All'); setActiveCategory('All');}} variant="outline">
                {t('reset_filters')}
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
