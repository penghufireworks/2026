import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Tag, Calendar, User, ArrowRight, Sparkles, Home, Map, Compass, Camera, Utensils } from 'lucide-react'
import { blogArticles } from '../data/articles'
import SEO from '../components/SEO'

const iconMap = {
  Sparkles,
  Home,
  Map,
  Compass,
  Camera,
  Utensils,
  Tag // Add Tag as fallback
}

const categories = ["全部", "花火節攻略", "民宿推薦", "美食地圖", "深度旅遊", "澎湖美學"]

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("全部")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredArticles = React.useMemo(() => {
    // Defensive check
    if (!blogArticles || !Array.isArray(blogArticles)) {
        console.warn('Blog data is missing or invalid');
        return [];
    }

    return blogArticles.filter(article => {
      const matchCat = activeCategory === "全部" || article.category === activeCategory
      const matchSearch = article.title.includes(searchQuery) || article.tags.some(t => t.includes(searchQuery))
      return matchCat && matchSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-20">
      <SEO 
        title="澎湖美學專欄" 
        description="探索澎湖花火節2026最新攻略、在地民宿推薦、私房美食地圖。為您整理最深度的菊島旅遊指南。"
        keywords="澎湖美學, 澎湖旅遊攻略, 澎湖花火節2026, 澎湖民宿推薦"
      />

      {/* Hero Header */}
      <div className="bg-slate-900 text-white py-20 px-4 mb-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-ocean-blue/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-ocean-blue font-serif italic text-lg tracking-widest block mb-4">Penghu Aesthetics</span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 font-serif">澎湖美學 · 深度專欄</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto font-light">
            不只是旅遊資訊，更是對這座島嶼的深情凝視。<br/>
            從花火節的璀璨到古厝的靜謐，我們紀錄澎湖的每一種表情。
          </p>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="max-w-7xl mx-auto px-4 mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                activeCategory === cat 
                  ? 'bg-slate-900 text-white' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="搜尋文章關鍵字..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ocean-blue/50"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map(article => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group flex flex-col h-full border border-slate-100"
          >
            {/* Image */}
            <Link to={`/blog/${article.id}`} className="block h-56 overflow-hidden relative">
              <div className={`w-full h-full bg-gradient-to-br ${article.gradient || 'from-slate-100 to-slate-200'} flex items-center justify-center transition-transform duration-700 group-hover:scale-110`}>
                {(() => {
                    const IconComponent = iconMap[article.icon] || Tag;
                    return <IconComponent size={48} className="text-white/40" />;
                })()}
              </div>
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-800">
                {article.category}
              </div>
            </Link>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
                <span className="flex items-center gap-1"><User size={12} /> {article.author}</span>
              </div>
              
              <Link to={`/blog/${article.id}`} className="block mb-3">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-ocean-blue transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h3>
              </Link>
              
              <p className="text-slate-600 text-sm line-clamp-3 mb-6 leading-relaxed">
                {article.summary}
              </p>

              <div className="mt-auto pt-4 border-t border-slate-50">
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[10px] bg-slate-50 text-slate-500 px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
                <Link 
                  to={`/blog/${article.id}`} 
                  className="inline-flex items-center gap-1 text-sm font-bold text-ocean-blue hover:gap-2 transition-all"
                >
                  閱讀全文 <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* SEO Keywords Cloud (Bottom) */}
      <div className="max-w-7xl mx-auto px-4 mt-20 pt-12 border-t border-slate-200">
        <h4 className="text-center text-slate-400 font-bold mb-6 text-sm">熱門搜尋關鍵字</h4>
        <div className="flex flex-wrap justify-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
          {filteredArticles.flatMap(a => a.tags).slice(0, 50).filter((v, i, a) => a.indexOf(v) === i).map(tag => (
            <span key={tag} className="text-xs text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded cursor-default hover:border-ocean-blue hover:text-ocean-blue">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blog
