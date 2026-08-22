import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { motorbikes } from '@/constants';
import { ShieldCheck, CheckCircle2, Bike, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import BookingDialog from '@/components/BookingDialog';

export default function Rental() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language ? i18n.language.substring(0, 2).toLowerCase() : 'en';

  return (
    <div className="pt-32 pb-24 bg-brand-navy/[0.02]">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sky-600 font-bold text-xs uppercase tracking-widest block mb-2">{t('rental_tag')}</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tighter mb-4">{t('rental_title')}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('rental_subtitle')}
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {motorbikes.map((bike) => (
            <motion.div
              key={bike.id}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.98 },
                show: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { 
                    duration: 0.6,
                    ease: [0.215, 0.61, 0.355, 1]
                  } 
                }
              }}
            >
              <Card className="rounded-[2.5rem] overflow-hidden border border-sky-100 shadow-xl hover:shadow-2xl hover:shadow-sky-500/10 transition-all group bg-white flex flex-col justify-between h-full">
                <div>
                  <div className="h-56 overflow-hidden relative">
                    <img src={bike.image} alt={bike.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    
                    {/* Rental Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-sky-600 text-white px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-md flex items-center gap-1.5">
                        <Key className="w-3.5 h-3.5" /> {t('rental_badge')}
                      </span>
                    </div>

                    <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-2xl font-black text-sm">
                      IDR {bike.pricePerDay / 1000}K {t('per_day')}
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-2">{bike.name}</h3>
                    <div className="flex items-center gap-2 text-brand-blue font-medium text-sm mb-6">
                      <Bike size={16} /> {bike.specs}
                    </div>
                    
                    <div className="space-y-3 mb-8">
                      {bike.inclusions.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 size={16} className="text-emerald-500 shrink-0" /> {item}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </div>

                <div className="p-8 pt-0">
                  <BookingDialog type="rental" itemName={bike.name}>
                    <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white rounded-2xl py-6 shadow-lg shadow-brand-blue/20 font-bold">
                      {t('rent_this_bike')}
                    </Button>
                  </BookingDialog>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Rental Rules */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-[3rem] p-10 md:p-16 border border-border shadow-sm"
        >
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
              <h2 className="text-3xl font-display font-bold mb-4">{t('rental_req_title')}</h2>
              <div className="w-20 h-1 bg-brand-blue rounded-full mb-6" />
              <p className="text-muted-foreground leading-relaxed">
                {t('rental_req_desc')}
              </p>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { title: t('valid_license'), desc: t('valid_license_desc') },
                { title: t('id_verification'), desc: t('id_verification_desc') },
                { title: t('safety_first'), desc: t('safety_first_desc') },
                { title: t('deposit'), desc: t('deposit_desc') },
              ].map((rule, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center shrink-0">
                    <ShieldCheck className="text-brand-navy" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{rule.title}</h4>
                    <p className="text-sm text-muted-foreground">{rule.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
