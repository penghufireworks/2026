import React from 'react'
import { motion } from 'framer-motion'
import { Camera, MapPin, Hash, ArrowLeft, Footprints, Grid, Anchor, Music, Wind, Home, Waves, Sun, Landmark, Fish } from 'lucide-react'
import { Link } from 'react-router-dom'
import { igSpots } from '../data/igSpots'
import SEO from '../components/SEO'

const iconMap = {
    "Footprints": Footprints,
    "Grid": Grid,
    "Anchor": Anchor,
    "Music": Music,
    "Wind": Wind,
    "Home": Home,
    "Waves": Waves,
    "Sun": Sun,
    "Landmark": Landmark,
    "Fish": Fish
};

const IGSpots = () => {
  // IG Spots Page
  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      <SEO title="網美地圖" />
      
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-600">
        </div>
        
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-sm font-bold mb-6">
                <Camera size={16} /> 澎湖 IG 打卡攻略
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-xl">
              探索 10 大絕美秘境
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
              準備好你的相機與洋裝，跟著網美的視角，
              <br className="hidden md:block" />
              收藏澎湖最夢幻的藍色角落，怎麼拍都是時尚大片。
            </p>
          </motion.div>
        </div>
      </div>

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-ocean-blue transition-colors font-bold">
            <ArrowLeft size={20} /> 返回首頁
        </Link>
      </div>

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {igSpots.map((spot, index) => (
                <motion.div
                    key={spot.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-slate-100"
                >
                    {/* Image Container */}
                    <div className="relative h-80 overflow-hidden">
                        {(() => {
                            const IconComponent = iconMap[spot.icon] || Camera;
                            return (
                                <div className={`w-full h-full bg-gradient-to-br ${spot.gradient || 'from-indigo-200 to-purple-300'} flex items-center justify-center transition-transform duration-700 group-hover:scale-110`}>
                                    <IconComponent size={64} className="text-white/50" />
                                </div>
                            );
                        })()}
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1 shadow-sm">
                            <MapPin size={12} className="text-ocean-blue" /> {spot.location}
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-20">
                            <h2 className="text-2xl font-bold text-white mb-1 group-hover:translate-x-1 transition-transform">{spot.name}</h2>
                            <p className="text-white/80 text-sm font-medium tracking-wide">{spot.enName}</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {spot.tags.map(tag => (
                                <span key={tag} className="text-xs font-bold text-ocean-blue bg-blue-50 px-2.5 py-1 rounded-md">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <p className="text-slate-600 leading-loose text-justify font-light">
                                {spot.desc}
                            </p>
                        </div>

                        {/* Action */}
                        <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                            <a 
                                href={`https://www.google.com/maps/search/?api=1&query=澎湖 ${spot.name}`} 
                                target="_blank" 
                                rel="noreferrer"
                                className="text-sm font-bold text-slate-400 hover:text-ocean-blue transition-colors flex items-center gap-1"
                            >
                                <MapPin size={16} /> Google 導航
                            </a>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
      
      {/* Footer Call to Action */}
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h3 className="text-3xl font-bold text-slate-800 mb-6">心動了嗎？來澎湖拍出妳的人生美照</h3>
        <p className="text-slate-500 mb-8">
            入住沐月民宿，我們提供最完整的網美地圖與私房拍攝點建議，<br/>
            還能幫您預訂機車，輕鬆跑遍所有景點！
        </p>
      </div>

    </div>
  )
}

export default IGSpots
