import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { blogPosts } from '@/data/blogData';
import { Calendar, Clock, ArrowLeft, Share2, Tag, Car, Bike } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language ? i18n.language.substring(0, 2).toLowerCase() : 'en';

  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="pt-32 pb-24 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Article not found</h2>
        <Button onClick={() => navigate('/blog')}>Back to Blog</Button>
      </div>
    );
  }

  const titleText = currentLang === 'id' && post.title_id ? post.title_id : post.title;
  const excerptText = currentLang === 'id' && post.excerpt_id ? post.excerpt_id : post.excerpt;
  const contentText = currentLang === 'id' && post.content_id ? post.content_id : post.content;
  const categoryText = currentLang === 'id' && post.category_id ? post.category_id : post.category;
  const readTimeText = currentLang === 'id' && post.readTime_id ? post.readTime_id : post.readTime;

  // Format content paragraphs and subheadings
  const renderFormattedContent = (rawText) => {
    return rawText
      .trim()
      .split('\n\n')
      .map((block, index) => {
        const trimmed = block.trim();
        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={index} className="text-2xl font-display font-bold text-brand-navy mt-8 mb-4">
              {trimmed.replace('### ', '')}
            </h3>
          );
        } else if (trimmed.startsWith('- ')) {
          const items = trimmed.split('\n- ').map(item => item.replace('- ', ''));
          return (
            <ul key={index} className="space-y-3 my-4">
              {items.map((it, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700 text-base leading-relaxed">
                  <span className="w-2 h-2 rounded-full bg-brand-blue shrink-0 mt-2.5" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          );
        } else {
          return (
            <p key={index} className="text-slate-600 text-base leading-relaxed mb-6">
              {trimmed}
            </p>
          );
        }
      });
  };

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <SEO 
        title={`${titleText} - Tuya Rental Blog`}
        description={excerptText}
        image={post.image}
      />

      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 text-muted-foreground hover:text-brand-blue transition-colors mb-8 group font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {currentLang === 'id' ? 'Kembali ke Blog' : 'Back to Blog'}
        </button>

        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-brand-blue/10 text-brand-blue font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Tag size={12} /> {categoryText}
              </span>
              <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                <Calendar size={12} /> {post.date}
              </span>
              <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                <Clock size={12} /> {readTimeText}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-brand-navy tracking-tight leading-tight mb-6">
              {titleText}
            </h1>

            <div className="flex items-center justify-between py-4 border-y border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue font-bold text-sm">
                  {post.author[0]}
                </div>
                <div>
                  <p className="text-sm font-bold text-brand-navy">{post.author}</p>
                  <p className="text-xs text-slate-400">Local Travel Expert</p>
                </div>
              </div>

              <button 
                onClick={() => navigator.clipboard?.writeText(window.location.href)}
                className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-brand-blue bg-slate-50 hover:bg-slate-100 px-4 py-2.5 rounded-xl transition-all"
                title="Copy link"
              >
                <Share2 size={14} />
                {currentLang === 'id' ? 'Bagikan' : 'Share'}
              </button>
            </div>
          </div>

          {/* Hero Featured Image */}
          <div className="aspect-[16/9] rounded-3xl overflow-hidden mb-12 shadow-2xl">
            <img 
              src={post.image} 
              alt={titleText} 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Body Content */}
          <div className="prose prose-lg max-w-none mb-16">
            {renderFormattedContent(contentText)}
          </div>

          {/* Action CTA Card */}
          <div className="bg-brand-navy text-white p-8 sm:p-12 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-xl">
              <span className="text-brand-orange text-xs font-bold uppercase tracking-widest block mb-2">
                {currentLang === 'id' ? 'SIAP BERPETUALANG?' : 'READY FOR YOUR TRIP?'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold mb-4 leading-tight">
                {currentLang === 'id' 
                  ? 'Jelajahi Nusa Penida Dengan Mobil Private & Motor Prima' 
                  : 'Explore Nusa Penida with Private Cars & Quality Scooters'}
              </h3>
              <p className="text-slate-300 text-sm mb-8 leading-relaxed">
                {currentLang === 'id'
                  ? 'Nikmati kebebasan liburan tanpa ribet. Sudah termasuk helm, bensin, supir lokal, dan bantuan darurat 24 jam.'
                  : 'Enjoy hassle-free island travel. Includes helmets, fuel, local drivers, and 24/7 roadside assistance.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/packages">
                  <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold rounded-2xl px-6 py-6 text-sm flex items-center gap-2">
                    <Car size={18} />
                    {currentLang === 'id' ? 'Paket Tour Mobil' : 'View Car Packages'}
                  </Button>
                </Link>
                <Link to="/rental">
                  <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 font-bold rounded-2xl px-6 py-6 text-sm flex items-center gap-2">
                    <Bike size={18} />
                    {currentLang === 'id' ? 'Sewa Motor' : 'Rent Motorbike'}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/20 blur-[100px] -translate-y-1/2 translate-x-1/2" />
          </div>
        </motion.article>
      </div>
    </div>
  );
}
