import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Map, Anchor, Compass, Ticket, Sun, Wind, Plane, Ship, Waves, Sunset, Fish, Flame, Sparkles, Moon, Glasses, Shell } from 'lucide-react'
import { activities, activityCategories } from '../data/activities'

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

const Activities = () => {
  const [activeCategory, setActiveCategory] = useState('all')

  // Defensive check for data
  if (!activities || !Array.isArray(activities) || !activityCategories) {
      console.warn('Activities data is missing or invalid');
      return <div className="min-h-screen pt-32 text-center">資料載入中...</div>;
  }

  const filteredActivities = activeCategory === 'all' 
    ? activities 
    : activities.filter(act => act.category === activeCategory)

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* --- Hero Section: 觀光局文案改寫 --- */}
      <div className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/90 to-slate-900/95 z-10"></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <Compass size={400} className="text-white" />
        </div>
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-ocean-blue bg-white/10 backdrop-blur px-4 py-1 rounded-full text-sm font-bold tracking-widest mb-4 inline-block border border-white/20">
              PENGHU TRAVEL GUIDE
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 drop-shadow-lg font-serif">
              上帝的石雕公園，<br/>台灣海峽最閃耀的明珠
            </h1>
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed font-light">
              九十座島嶼上累積著歷史人文的智慧結晶。
              <br/>從壯麗的玄武岩地質，到清澈見底的澎湖灣；
              <br/>從春夏的花火綻放，到秋冬的海鮮盛宴。
              <br/>碧海藍天與柔白沙灘的雙重享受，成串美景等待您的讚嘆。
            </p>
          </motion.div>
        </div>
      </div>

      {/* --- Transport Info: 交通資訊 --- */}
      <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-30 mb-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100 grid md:grid-cols-2 gap-8">
            <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-ocean-blue shrink-0">
                    <Plane size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">空中交通 (Air)</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        台灣本島遊客可從 <span className="font-bold text-slate-800">臺北、臺中、臺南、嘉義、高雄</span> 直飛澎湖馬公機場。
                        <br/>金門亦有定期包機往返。航程約 30-50 分鐘，快速便捷。
                    </p>
                </div>
            </div>
            <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-ocean-blue shrink-0">
                    <Ship size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">海上交通 (Sea)</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        可從 <span className="font-bold text-slate-800">嘉義布袋港</span> (航程約 80 分鐘) 或 <span className="font-bold text-slate-800">高雄港</span> 搭乘客輪前往。
                        <br/>適合想體驗海上風光或攜帶大型行李的旅客。
                    </p>
                </div>
            </div>
        </div>
      </div>

      {/* --- Filter Tabs --- */}
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {activityCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-ocean-blue text-white shadow-lg scale-105'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* --- Activity Grid --- */}
      <div className="max-w-6xl mx-auto px-4">
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredActivities.map(act => (
              <motion.div
                layout
                key={act.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 group cursor-pointer hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                    {(() => {
                        const IconComponent = iconMap[act.icon] || Compass;
                        return (
                            <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${
                                act.gradient || 'from-blue-100 to-cyan-200'
                            } transition-transform duration-700 group-hover:scale-110`}>
                                <IconComponent size={48} className="text-white/50" />
                            </div>
                        );
                    })()}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                        {act.category === 'island' ? '🏝️ 跳島' : 
                         act.category === 'water' ? '🌊 水上' :
                         act.category === 'experience' ? '🎣 體驗' : '🎫 票券'}
                    </div>
                </div>
                
                <div className="p-6">
                    <div className="flex gap-2 mb-3">
                        {act.tags.map(tag => (
                            <span key={tag} className="text-xs font-bold text-ocean-blue bg-blue-50 px-2 py-1 rounded-md">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-ocean-blue transition-colors">
                        {act.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-6 line-clamp-2">
                        {act.desc}
                    </p>
                    

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* --- Call to Action --- */}
      <div className="max-w-4xl mx-auto px-4 mt-20 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">放鬆心情、休閒渡假，澎湖絕對是您最佳的選擇！</h2>
        <p className="text-slate-600 mb-8">
            不知道怎麼安排行程嗎？交給沐月民宿專業管家，
            <br/>我們提供一站式代訂服務，讓您輕鬆享受菊島之旅。
        </p>
        <div className="flex justify-center gap-4">
            <Link to="/booking" className="px-8 py-3 bg-ocean-blue text-white rounded-xl font-bold shadow-lg hover:bg-blue-600 transition-colors">
                預約詢價
            </Link>
        </div>
      </div>
    </div>
  )
}

export default Activities
