import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { blogPosts } from '@/data/blogData';
import { Calendar, Clock, ChevronRight, Search, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

export default function Blog() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language ? i18n.language.substring(0, 2).toLowerCase() : 'en';

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Beaches', 'Motorbike Guide', 'Destinations', 'Itinerary', 'Activity', 'Hidden Gems'];

  const filteredPosts = blogPosts.filter(post => {
    const title = (currentLang === 'id' && post.title_id ? post.title_id : post.title).toLowerCase();
    const excerpt = (currentLang === 'id' && post.excerpt_id ? post.excerpt_id : post.excerpt).toLowerCase();
    const query = searchQuery.toLowerCase();

    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = title.includes(query) || excerpt.includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <SEO 
        title={`${t('blog_title')} (15 Guides) - Tuya Rental Nusa Penida`}
        description={t('blog_subtitle')}
      />

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-brand-blue font-bold text-xs uppercase tracking-widest block mb-2">
            NUSA PENIDA INSIDER GUIDES
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tighter mb-4 text-brand-navy">
            {t('blog_title')}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('blog_subtitle')}
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-sm">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat 
                    ? 'bg-brand-navy text-white shadow-md' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat === 'All' ? (currentLang === 'id' ? 'Semua Artikel' : 'All Articles') : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text"
              placeholder={currentLang === 'id' ? 'Cari artikel...' : 'Search articles...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 ring-brand-blue"
            />
          </div>
        </div>

        {/* Article Counter */}
        <div className="mb-6 flex justify-between items-center text-xs text-slate-400 font-bold uppercase tracking-wider">
          <span>{currentLang === 'id' ? `Menampilkan ${filteredPosts.length} dari 15 artikel` : `Showing ${filteredPosts.length} of 15 articles`}</span>
        </div>

        {/* Blog Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredPosts.map((post, idx) => {
              const titleText = currentLang === 'id' && post.title_id ? post.title_id : post.title;
              const excerptText = currentLang === 'id' && post.excerpt_id ? post.excerpt_id : post.excerpt;
              const categoryText = currentLang === 'id' && post.category_id ? post.category_id : post.category;
              const readTimeText = currentLang === 'id' && post.readTime_id ? post.readTime_id : post.readTime;

              return (
                <motion.article 
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col justify-between"
                >
                  <div>
                    <Link to={`/blog/${post.id}`} className="h-56 overflow-hidden relative block">
                      <img 
                        src={post.image} 
                        alt={titleText} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-brand-navy px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-sm">
                        <Tag size={12} className="text-brand-blue" />
                        {categoryText}
                      </div>
                    </Link>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-3">
                        <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {readTimeText}</span>
                      </div>
                      
                      <Link to={`/blog/${post.id}`} className="hover:text-brand-blue transition-colors">
                        <h2 className="text-xl font-bold mb-3 text-brand-navy leading-snug line-clamp-2">
                          {titleText}
                        </h2>
                      </Link>

                      <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 mb-4">
                        {excerptText}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue font-bold text-xs">
                          {post.author[0]}
                        </div>
                        <span className="text-xs font-semibold text-slate-700">{post.author}</span>
                      </div>
                      
                      <Link 
                        to={`/blog/${post.id}`}
                        className="text-xs font-bold text-brand-blue hover:text-brand-blue/80 flex items-center gap-1 transition-colors"
                      >
                        {currentLang === 'id' ? 'Baca Selengkapnya' : 'Read Article'} <ChevronRight size={16} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Newsletter Section */}
        <div className="mt-24 p-8 md:p-16 rounded-[3rem] bg-brand-navy text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tighter">{t('blog_sub_title')}</h2>
            <p className="text-slate-300 mb-8 text-sm sm:text-base leading-relaxed">{t('blog_sub_desc')}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder={t('email_placeholder')} 
                className="bg-white/10 border border-white/20 rounded-2xl px-6 py-4 flex-1 focus:outline-none focus:ring-2 ring-brand-blue text-sm text-white placeholder:text-slate-400" 
              />
              <button className="bg-brand-blue hover:bg-brand-blue/90 text-white font-bold rounded-2xl px-10 py-4 transition-all whitespace-nowrap text-sm shadow-lg shadow-brand-blue/30">
                {t('subscribe')}
              </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/20 blur-[100px] -translate-y-1/2 translate-x-1/2" />
        </div>
      </div>
    </div>
  );
}
