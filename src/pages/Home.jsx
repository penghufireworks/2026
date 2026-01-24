import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Calendar, Map, Camera, Anchor, Utensils } from 'lucide-react'
import { Link } from 'react-router-dom'
import AestheticSection from '../components/AestheticSection'
import SEO from '../components/SEO'

// Components for Bento Grid
const BentoItem = ({ className, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={`bg-white rounded-3xl p-6 shadow-lg border border-slate-100 overflow-hidden relative group hover:shadow-xl transition-shadow ${className}`}
  >
    {children}
  </motion.div>
)

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-900 overflow-x-hidden">
      <SEO title="首頁" />
      {/* --- Hero Section: Dragon Ball Z Theme --- */}
      <section className="relative h-[90vh] -mt-20 flex items-center justify-center overflow-hidden bg-slate-900">
        {/* Background Gradient (Simulating Night Sky & Energy) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1c2c] via-[#2d1b4e] to-[#ff7e5f] opacity-90"></div>
        {/* Background Gradient Replaces Image */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900/10 via-slate-900/50 to-slate-900/90"></div>
        
        {/* Animated Particles/Stars (Simplified) */}
        {/* Removed potentially causing complex animation */}

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/50 text-sm font-bold tracking-widest mb-4 backdrop-blur-sm">
              沐月民宿 MOONLIGHT VILLA
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight drop-shadow-lg">
              七龍珠 Z <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">熱血開戰</span>
            </h1>
            <p className="text-lg md:text-2xl text-slate-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              澎湖團體首選｜6-12人團體旅遊
              <br/>今年夏天，與悟空一起在澎湖夜空釋放龜派氣功。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/fireworks-2026" className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-bold text-lg hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                查看場次表
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <AestheticSection />

      {/* --- Bento Grid Section --- */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px] grid-flow-dense">
          
          {/* 1. Smart Planner (Large) - Hidden per request
          <BentoItem className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 !p-0 group cursor-pointer">
            <Link to="/itinerary" className="block h-full w-full p-8 relative">
                <div className="relative z-10">
                    <div className="bg-white/80 w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm backdrop-blur-sm">
                        <Map className="text-blue-600" size={24} />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-2">智能行程規劃</h3>
                    <p className="text-slate-600 mb-6 max-w-xs">
                        不用動腦！輸入日期與人數，AI 幫你排好「每日時間軸」行程表，連美食都幫你找好了。
                    </p>
                    <span className="inline-flex items-center text-blue-600 font-bold group-hover:translate-x-1 transition-transform">
                        開始規劃 <ArrowRight size={18} className="ml-1" />
                    </span>
                </div>
                <div className="absolute right-0 bottom-0 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl -mr-16 -mb-16"></div>
                <div className="absolute right-0 bottom-0 w-1/2 h-2/3 bg-gradient-to-tl from-blue-300 to-indigo-400 rounded-tl-3xl opacity-80 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                    <Map size={80} className="text-white/50" />
                </div>
            </Link>
          </BentoItem>
          */}

          {/* 2. Fireworks Info */}
          <BentoItem className="md:col-span-1 md:row-span-2 !p-0 bg-slate-900 text-white relative overflow-hidden group">
             <Link to="/fireworks-2026" className="block h-full w-full p-6 relative z-10">
                <div className="bg-white/10 w-10 h-10 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                    <Calendar className="text-orange-400" size={20} />
                </div>
                <h3 className="text-xl font-bold mb-2">2026 花火節場次</h3>
                <p className="text-slate-300 text-sm mb-4">七龍珠 Z 限定場次、無人機展演時間表一次看。</p>
                <div className="space-y-2 mt-4 text-sm text-slate-400">
                    <div className="flex justify-between border-b border-white/10 pb-1"><span>首場</span> <span className="text-white">4/20 (一)</span></div>
                    <div className="flex justify-between border-b border-white/10 pb-1"><span>閉幕</span> <span className="text-white">8/25 (二)</span></div>
                </div>
             </Link>
             {/* Background Pattern */}
             <div className="absolute inset-0 bg-gradient-to-b from-slate-900/0 via-slate-900/50 to-slate-900 opacity-90 group-hover:opacity-80 transition-opacity duration-500"></div>
             <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[length:10px_10px]"></div>
          </BentoItem>

          {/* 3. Food Map (New!) */}
          <BentoItem className="md:col-span-1 md:row-span-1 bg-rose-50 group">
             <Link to="/food-map" className="block h-full">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-rose-900">美食地圖</h3>
                    <Utensils className="text-rose-500" size={20} />
                </div>
                <p className="text-sm text-rose-800/70 mb-2">必吃名單，一鍵導航。</p>
                <span className="text-xs font-bold text-rose-600 group-hover:underline">查看地圖 →</span>
             </Link>
          </BentoItem>

          {/* 4. Activities Guide */}
          <BentoItem className="md:col-span-1 md:row-span-1 bg-amber-50">
             <Link to="/activities" className="block h-full">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-amber-900">熱門活動</h3>
                    <Sparkles className="text-amber-500" size={20} />
                </div>
                <p className="text-sm text-amber-800/70">跳島、夜釣、水上活動，15+ 精選行程一次看。</p>
             </Link>
          </BentoItem>

          {/* 5. IG Spots (Wide) */}
          <BentoItem className="md:col-span-3 lg:col-span-4 md:row-span-1 !p-0 relative group overflow-hidden bg-slate-800">
             <Link to="/ig-spots" className="block h-full w-full relative p-8 flex items-center justify-between">
                <div className="z-10">
                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                        <Camera size={28} className="text-pink-500" /> 探索網美地圖
                    </h3>
                    <p className="text-slate-400">收錄澎湖 20+ 個絕美拍照點，跟著拍就是大片。</p>
                </div>
                <div className="flex gap-4 opacity-50">
                    <div className="w-20 h-20 bg-pink-500/20 rounded-2xl rotate-12"></div>
                    <div className="w-20 h-20 bg-purple-500/20 rounded-2xl -rotate-6"></div>
                    <div className="w-20 h-20 bg-blue-500/20 rounded-2xl rotate-3"></div>
                </div>
             </Link>
          </BentoItem>

        </div>
      </section>
    </div>
  )
}

export default Home
