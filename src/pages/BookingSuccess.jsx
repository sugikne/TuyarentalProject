import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, Calendar, MapPin, ArrowRight, Share2, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import SEO from '@/components/SEO';
import { format } from 'date-fns';

export default function BookingSuccess() {
  const { t } = useTranslation();
  const location = useLocation();
  const bookingData = location.state || {};
  
  // Mock booking reference
  const bookingRef = "NP-" + Math.random().toString(36).substring(2, 8).toUpperCase();
  
  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <SEO title={`${t('trip_confirmed')} | Nusa Penida Motor Trip`} description="Your adventure is confirmed!" />
      
      <div className="max-w-3xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden"
        >
          {/* Header Section */}
          <div className="bg-brand-blue/5 p-12 text-center relative overflow-hidden">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, delay: 0.2 }}
              className="w-24 h-24 bg-brand-blue rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-brand-blue/30 relative z-10"
            >
              <CheckCircle2 className="text-white w-12 h-12" />
            </motion.div>
            
            <h1 className="text-3xl md:text-5xl font-display font-black text-brand-navy mb-4 relative z-10">
              {t('trip_confirmed')}
            </h1>
            <p className="text-slate-500 font-medium relative z-10">
              {t('ready_adv')}
            </p>
            
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-brand-blue/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-brand-orange/5 rounded-full translate-x-1/4 translate-y-1/4" />
          </div>

          {/* Details Section */}
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">{t('booking_ref')}</label>
                  <p className="text-xl font-black text-brand-navy font-mono tracking-tighter">{bookingRef}</p>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                    <Calendar className="text-brand-blue h-5 w-5" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">{t('travel_date')}</label>
                    <p className="font-bold text-brand-navy">
                      {bookingData.date ? format(new Date(bookingData.date), "MMMM dd, yyyy") : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                    <MapPin className="text-brand-blue h-5 w-5" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">{t('meeting_point')}</label>
                    <p className="font-bold text-brand-navy">Toya Pakeh / Sanur Harbour</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h4 className="font-bold text-brand-navy mb-4">{t('whats_next')}</h4>
                <ul className="space-y-4">
                  {[
                    t('step1'),
                    t('step2'),
                    t('step3'),
                    t('step4')
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3 text-xs text-slate-600 font-medium">
                      <div className="w-5 h-5 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0 text-[10px] font-bold">
                        {i+1}
                      </div>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/" className="flex-1">
                <Button className="w-full bg-brand-navy hover:bg-brand-blue text-white py-6 rounded-2xl font-bold transition-all flex items-center justify-center gap-2">
                  {t('back_to_home')} <ArrowRight size={18} />
                </Button>
              </Link>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="w-14 h-14 rounded-2xl border-slate-200" title="Print">
                  <Printer size={20} className="text-slate-400" />
                </Button>
                <Button variant="outline" size="icon" className="w-14 h-14 rounded-2xl border-slate-200" title="Share">
                  <Share2 size={20} className="text-slate-400" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-50 p-6 border-t border-slate-100 text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {t('need_changes')} <span className="text-brand-blue">+62 857 3787 2793</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
