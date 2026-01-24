import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Clock, Info, Star } from 'lucide-react'
import FacebookFeed from '../components/FacebookFeed'
import SEO from '../components/SEO'

const schedule = [
  { month: '4月', events: [
    { date: '4/20 (一)', type: '試放場', desc: '10分鐘煙火秀' },
    { date: '4/27 (一)', type: '試放場', desc: '10分鐘煙火秀' }
  ]},
  { month: '5月', events: [
    { date: '5/04 (一)', type: '開幕盛典', desc: '12分鐘煙火 + 無人機', highlight: true },
    { date: '5/07 (四)', type: '主題場', desc: '10分鐘煙火 + 無人機' },
    { date: '5/11 (一)', type: '主題場', desc: '10分鐘煙火 + 無人機' },
    { date: '5/14 (四)', type: '主題場', desc: '10分鐘煙火 + 無人機' },
    { date: '5/18 (一)', type: '主題場', desc: '10分鐘煙火 + 無人機' },
    { date: '5/21 (四)', type: '主題場', desc: '10分鐘煙火 + 無人機' },
    { date: '5/25 (一)', type: '主題場', desc: '10分鐘煙火 + 無人機' },
    { date: '5/28 (四)', type: '主題場', desc: '10分鐘煙火 + 無人機' }
  ]},
  { month: '6月', events: [
    { date: '6/01 (一)', type: '主題場', desc: '10分鐘煙火 + 無人機' },
    { date: '6/04 (四)', type: '主題場', desc: '10分鐘煙火 + 無人機' },
    { date: '6/08 (一)', type: '主題場', desc: '10分鐘煙火 + 無人機' },
    { date: '6/11 (四)', type: '主題場', desc: '10分鐘煙火 + 無人機' },
    { date: '6/15 (一)', type: '主題場', desc: '10分鐘煙火 + 無人機' },
    { date: '6/18 (四)', type: '主題場', desc: '10分鐘煙火 + 無人機' },
    { date: '6/22 (一)', type: '主題場', desc: '10分鐘煙火 + 無人機' },
    { date: '6/25 (四)', type: '主題場', desc: '10分鐘煙火 + 無人機' },
    { date: '6/30 (二)', type: '加碼場', desc: '10分鐘煙火 + 無人機' }
  ]},
  { month: '7-8月', events: [
    { date: '每週二', type: '暑期場', desc: '7/7, 7/14, 7/21, 7/28, 8/4, 8/11, 8/18' },
    { date: '8/25 (二)', type: '閉幕大賞', desc: '12分鐘煙火 + 無人機', highlight: true }
  ]}
]

const Fireworks = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20">
      <SEO 
        title="2026 澎湖花火節場次表" 
        description="2026澎湖國際海上花火節完整場次表，七龍珠Z主題無人機秀時間、最佳觀賞地點攻略。入住沐月民宿享花火專船優惠。"
        keywords="澎湖花火節2026, 澎湖花火節日期, 澎湖花火節時間, 澎湖花火節主題, 七龍珠花火節"
      />

      {/* Hero Banner */}
      <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-purple-900 opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-purple-900"></div>
        
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-orange-300 font-bold tracking-widest text-sm md:text-base border border-orange-400/50 px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm mb-4 inline-block">
              2026 PENGHU FIREWORKS
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-4 drop-shadow-lg">
              七龍珠 Z <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">熱血開戰</span>
            </h1>
            <p className="text-slate-300 text-lg max-w-xl mx-auto">
              全台首創動漫主題無人機展演，與悟空一起點亮澎湖夜空！
              <br/>施放地點：馬公市觀音亭園區 (21:00 準時施放)
            </p>
          </motion.div>
        </div>
      </div>

      {/* Promotion Section Removed */}

      {/* Content Grid */}
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-3 gap-8">
        
        {/* Left Column: Schedule */}
        <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-8 text-left flex items-center gap-3">
                <Calendar className="text-orange-400" /> 2026 完整場次表
            </h2>

            <div className="w-full aspect-video mb-8 rounded-xl overflow-hidden shadow-2xl border border-slate-700">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/tJSJMfxfivY" 
                title="澎湖觀音亭 360 4K全景即時影像" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            
            <div className="grid gap-8">
                {schedule.map((monthData, idx) => (
                    <motion.div 
                        key={monthData.month}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-slate-800/50 rounded-3xl p-6 border border-slate-700 backdrop-blur-sm"
                    >
                        <h3 className="text-2xl font-bold text-orange-400 mb-6 border-b border-slate-700 pb-2 pl-2">
                            {monthData.month}
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {(monthData.events || []).map((evt, i) => (
                                <div key={i} className={`flex items-start gap-4 p-4 rounded-xl ${evt.highlight ? 'bg-orange-500/10 border border-orange-500/30' : 'bg-slate-800 hover:bg-slate-700 transition-colors'}`}>
                                    <div className="text-center min-w-[80px]">
                                        <span className={`block font-bold text-lg ${evt.highlight ? 'text-orange-400' : 'text-white'}`}>
                                          {evt.date ? evt.date.split(' ')[0] : ''}
                                        </span>
                                        <span className="text-xs text-slate-400">
                                          {evt.date && evt.date.split(' ')[1] ? evt.date.split(' ')[1] : ''}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-200 mb-1 flex items-center gap-2">
                                            {evt.type}
                                            {evt.highlight && <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full">必看</span>}
                                        </div>
                                        <p className="text-sm text-slate-400">{evt.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* Right Column: Facebook Feed & Info */}
        <div className="lg:col-span-1 space-y-8">
            <div className="bg-slate-800/50 rounded-3xl p-6 border border-slate-700 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Info size={20} className="text-blue-400" /> 觀賞資訊
                </h3>
                <ul className="space-y-4 text-slate-300 text-sm">
                    <li className="flex gap-3">
                        <Clock className="shrink-0 text-orange-400" size={18} />
                        <div>
                            <span className="block font-bold text-white">施放時間</span>
                            無人機 21:00 / 煙火 21:10 (約 10-15 分鐘)
                        </div>
                    </li>
                    <li className="flex gap-3">
                        <MapPin className="shrink-0 text-orange-400" size={18} />
                        <div>
                            <span className="block font-bold text-white">最佳觀賞點</span>
                            觀音亭園區、海豚亭海堤、籃球場階梯
                        </div>
                    </li>
                </ul>
            </div>

            {/* Facebook Feed Component */}
            <FacebookFeed />
        </div>
      </div>
    </div>
  )
}

export default Fireworks
