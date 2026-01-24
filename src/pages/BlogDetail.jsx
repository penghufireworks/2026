import React, { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft, Calendar, User, Tag, Share2, MessageCircle, Info, Star, ChevronRight, Map, Anchor, Compass, Ticket, Sun, Wind, Plane, Ship, Waves, Sunset, Fish, Flame, Sparkles, Moon, Glasses, Shell } from 'lucide-react'
import { blogArticles } from '../data/articles'
import SEO from '../components/SEO'

const iconMap = {
    "Waves": Waves,
    "Ship": Ship,
    "Compass": Compass,
    "Sunset": Sunset,
    "Fish": Fish,
    "Map": Map,
    "Anchor": Anchor,
    "Ticket": Ticket,
    "Flame": Flame,
    "Sparkles": Sparkles,
    "Moon": Moon,
    "Goggles": Glasses,
    "Shell": Shell,
    "Sun": Sun
};

const BlogDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const article = blogArticles.find(a => a.id === parseInt(id))

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!article) return <div className="text-center py-20">文章不存在</div>

  const tags = Array.isArray(article.tags) ? article.tags : [];
  const relatedArticles = Array.isArray(blogArticles) 
    ? blogArticles.filter(a => a.id !== article.id).slice(0, 3) 
    : [];

  // Custom Markdown Components for "Beautification"
  const markdownComponents = {
    // Elegant H2 with left border
    h2: ({node, ...props}) => (
      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mt-12 mb-6 border-l-4 border-ocean-blue pl-4 flex items-center" {...props} />
    ),
    // Styled H3 with color
    h3: ({node, ...props}) => (
      <h3 className="text-xl md:text-2xl font-bold text-ocean-blue mt-8 mb-4 flex items-center gap-2" {...props} />
    ),
    // Custom List Bullets
    ul: ({node, ...props}) => (
      <ul className="space-y-3 my-6 list-none pl-0" {...props} />
    ),
    li: ({node, ...props}) => (
      <li className="flex items-start gap-3 text-slate-700 leading-relaxed" {...props}>
        <span className="mt-1.5 w-2 h-2 rounded-full bg-ocean-blue shrink-0" />
        <span className="flex-1">{props.children}</span>
      </li>
    ),
    // Beautified Blockquote (Tips/Info)
    blockquote: ({node, ...props}) => (
      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 my-8 rounded-r-xl">
        <div className="flex gap-3 mb-2 font-bold text-blue-800 items-center">
          <Info size={20} />
          <span>貼心筆記</span>
        </div>
        <div className="text-slate-700 italic pl-1" {...props} />
      </div>
    ),
    // Styled Tables
    table: ({node, ...props}) => (
      <div className="overflow-x-auto my-8 rounded-xl border border-slate-200 shadow-sm">
        <table className="w-full text-left border-collapse bg-white" {...props} />
      </div>
    ),
    thead: ({node, ...props}) => (
      <thead className="bg-slate-100 text-slate-700 font-bold" {...props} />
    ),
    th: ({node, ...props}) => (
      <th className="p-4 border-b border-slate-200" {...props} />
    ),
    td: ({node, ...props}) => (
      <td className="p-4 border-b border-slate-100 text-slate-600" {...props} />
    ),
    // Highlighted Strong text
    strong: ({node, ...props}) => (
      <strong className="text-ocean-blue font-bold bg-blue-50 px-1 rounded" {...props} />
    ),
    // Links
    a: ({node, ...props}) => (
      <a className="text-ocean-blue underline decoration-2 underline-offset-2 hover:text-blue-600 transition-colors" {...props} />
    )
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <SEO 
        title={article.title} 
        description={article.summary}
        keywords={tags.join(', ')}
      />

      {/* Hero Image */}
      <div className="relative h-[50vh] w-full group">
        <div className={`w-full h-full bg-gradient-to-br ${article.gradient || 'from-slate-800 to-slate-900'} flex items-center justify-center`}>
            {(() => {
                const IconComponent = iconMap[article.icon] || Tag;
                return <IconComponent size={120} className="text-white/20" />;
            })()}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        <button 
            onClick={() => navigate('/blog')} 
            className="absolute top-24 left-6 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/30 transition-all z-10 hover:scale-110"
        >
            <ArrowLeft size={24} />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-4xl mx-auto w-full text-white">
          <span className="bg-ocean-blue/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold mb-4 inline-block shadow-lg border border-white/20">
            {article.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-lg">
            {article.title}
          </h1>
          <div className="flex items-center gap-6 text-sm opacity-90 font-medium">
            <span className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
              <Calendar size={16} className="text-yellow-400" /> {article.date}
            </span>
            <span className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
              <User size={16} className="text-yellow-400" /> {article.author}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="prose prose-lg prose-slate max-w-none mb-12 prose-headings:font-serif">
            <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-ocean-blue mb-10 shadow-sm">
                <p className="text-xl text-slate-700 font-serif italic m-0 flex gap-4">
                    <MessageCircle className="text-ocean-blue shrink-0 mt-1" />
                    {article.summary}
                </p>
            </div>
            
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {article.content}
            </ReactMarkdown>
          </div>

          <div className="border-t border-slate-100 pt-8 mt-8">
            <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Tag size={18} className="text-ocean-blue" /> 相關文章標籤
            </h4>
            <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                    <Link key={tag} to="/blog" className="bg-slate-50 text-slate-600 px-4 py-2 rounded-full text-sm hover:bg-ocean-blue hover:text-white transition-all shadow-sm hover:shadow-md border border-slate-100 hover:border-ocean-blue">
                        #{tag}
                    </Link>
                ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          {/* Booking CTA */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-3xl shadow-xl text-white sticky top-24 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12 blur-xl"></div>
            
            <h3 className="text-2xl font-bold mb-4 relative z-10">喜歡這篇文章嗎？</h3>
            <p className="text-blue-100 text-sm mb-6 leading-relaxed relative z-10">
                我們提供最在地的旅遊諮詢與舒適的住宿體驗。
            </p>
            <a href="https://line.me/ti/p/2R6s8FaJ6Q" target="_blank" rel="noreferrer" className="block w-full bg-white text-blue-700 text-center py-3 rounded-xl font-bold shadow-lg hover:bg-blue-50 transition-colors mb-3 relative z-10">
                前往預約詢價
            </a>
            <Link to="/itinerary" className="block w-full bg-blue-700/50 border border-white/30 text-white text-center py-3 rounded-xl font-bold hover:bg-blue-700/70 transition-colors relative z-10 backdrop-blur-sm">
                AI 行程規劃
            </Link>
          </div>

          {/* Related Articles */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg">
            <h3 className="font-bold text-slate-900 mb-6 text-lg flex items-center gap-2">
              <Star className="text-yellow-400 fill-yellow-400" size={20} /> 延伸閱讀
            </h3>
            <div className="space-y-6">
                {relatedArticles.map(a => (
                    <Link key={a.id} to={`/blog/${a.id}`} className="flex gap-4 group items-start">
                        <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 shadow-md">
                          <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                             <Tag size={32} className="text-slate-400" />
                          </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800 text-sm group-hover:text-ocean-blue transition-colors line-clamp-2 mb-2 leading-relaxed">
                                {a.title}
                            </h4>
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                              <Calendar size={12} /> {a.date}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogDetail
