import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SEO from '@/components/SEO';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <SEO title={`${t('contact_title')} - Nusa Penida Tour`} />

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tighter mb-8">{t('contact_title')}</h1>
            <p className="text-muted-foreground text-lg mb-12">
              {t('contact_subtitle')}
            </p>

            <div className="space-y-8">
              {[
                { icon: Phone, title: t('phone_wa'), value: '+62 857 3787 2793' },
                { icon: Mail, title: t('email_lbl'), value: 'hello@nusapenidatrip.com' },
                { icon: MapPin, title: t('location_lbl'), value: 'Sanur Harbor, Bali / Nusa Penida Harbor, Klungkung, Bali' },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-center">
                  <div className="w-14 h-14 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue shrink-0">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold opacity-60 uppercase tracking-widest">{item.title}</h4>
                    <p className="text-lg font-bold text-brand-navy leading-snug mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-border shadow-xl">
            <h3 className="text-2xl font-bold mb-8">{t('send_msg_title')}</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('full_name')}</Label>
                  <Input id="name" placeholder="John Doe" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t('email_lbl')}</Label>
                  <Input id="email" type="email" placeholder="john@example.com" className="rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">{t('subject')}</Label>
                <Input id="subject" placeholder="Trip Inquiry" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{t('message')}</Label>
                <textarea 
                  id="message" 
                  rows={4} 
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 ring-brand-blue"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <Button className="w-full bg-brand-blue hover:bg-brand-orange py-6 rounded-2xl text-base font-bold transition-colors" type="button">
                {t('send_btn')} <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
