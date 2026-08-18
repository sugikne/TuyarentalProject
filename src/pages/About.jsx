import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Target, Heart, Award, Users } from 'lucide-react';
import SEO from '@/components/SEO';

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <SEO title={`${t('nav_about')} - Nusa Penida Tour`} />

      <div className="max-w-7xl mx-auto px-4">
        {/* Story Section */}
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <span className="text-brand-blue font-bold uppercase tracking-widest text-xs">{t('about_story_tag')}</span>
            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tighter mt-4 mb-8">
              {t('about_title')}
            </h1>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              {t('about_p1')}
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t('about_p2')}
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative"
          >
            <div className="rounded-[3rem] overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-500 shadow-2xl">
              <img 
                src="/img/east.jpg" 
                alt="About us" 
                className="w-full h-[500px] object-cover"
              />
            </div>
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -bottom-10 -left-10 bg-brand-orange text-white p-8 rounded-3xl hidden md:block shadow-xl"
            >
              <span className="text-5xl font-bold font-display">5K+</span>
              <p className="text-sm font-medium opacity-90 uppercase tracking-widest mt-2">{t('happy_adventurers')}</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Values */}
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            { icon: Target, title: t('mission_title'), desc: t('mission_desc') },
            { icon: Heart, title: t('passion_title'), desc: t('passion_desc') },
            { icon: Award, title: t('quality_title'), desc: t('quality_desc') },
            { icon: Users, title: t('community_title'), desc: t('community_desc') },
          ].map((v, i) => (
            <motion.div 
              key={i} 
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              className="p-10 bg-brand-navy/5 rounded-[2.5rem] hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-border"
            >
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <v.icon className="text-brand-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
