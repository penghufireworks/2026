import React from 'react'
import { motion } from 'framer-motion'
import { Sun, Wind } from 'lucide-react'

const AestheticSection = () => {
  return (
    <section className="py-32 bg-[#F5F5F0] overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-ocean-blue/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-100/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-ocean-blue font-serif italic text-lg mb-6 tracking-widest">The Art of Island Life</p>
              <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight mb-8">
                有一種藍，<br/>
                叫做<span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean-blue to-blue-400">澎湖藍</span>。
              </h2>
              <div className="space-y-6 text-slate-600 font-light leading-loose text-lg">
                <p>
                  在這裡，時間是被海風吹慢的。<br/>
                  清晨的陽光穿透玄武岩的縫隙，灑落在古老的咾咕石牆上。<br/>
                  午後的潮汐退去，露出蘊藏生命的潮間帶。
                </p>
                <p>
                  我們不趕行程，只趕著去赴一場與夕陽的約會。<br/>
                  在沐月，您可以找回久違的寧靜，<br/>
                  讓靈魂在海浪的節拍中，獲得真正的休憩。
                </p>
              </div>
              
              <div className="mt-10 flex items-center gap-4">
                <div className="h-[1px] w-12 bg-slate-300"></div>
                <span className="text-slate-400 font-serif italic">Moonlight Villa</span>
              </div>
            </motion.div>
          </div>

          {/* Image Grid */}
          <div className="order-1 lg:order-2 relative">
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="space-y-4 mt-12"
              >
                <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-lg flex items-center justify-center">
                  <Sun size={64} className="text-blue-400/50" />
                </div>
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                    <p className="font-serif text-slate-800 text-lg">光影</p>
                    <p className="text-xs text-slate-400 mt-1">Light & Shadow</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="space-y-4"
              >
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 text-right">
                    <p className="font-serif text-slate-800 text-lg">海風</p>
                    <p className="text-xs text-slate-400 mt-1">Sea Breeze</p>
                </div>
                <div className="w-full h-80 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl shadow-lg flex items-center justify-center">
                  <Wind size={64} className="text-orange-400/50" />
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default AestheticSection
