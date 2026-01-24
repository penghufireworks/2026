import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, Wifi, Coffee, Car, Star, CheckCircle } from 'lucide-react'

const rooms = [
  {
    id: 'room-6',
    name: '溫馨家庭六人房',
    capacity: '6 人',
    price: '平日 $4,800 起',
    features: ['獨立陽台', '兩套衛浴', '適合三代同堂']
  },
  {
    id: 'room-10',
    name: '豪華團體十人房',
    capacity: '10-12 人',
    price: '平日 $8,000 起',
    features: ['精選桌遊', '三套衛浴', '適合學生/公司團體']
  }
]

const Rooms = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">沐月民宿房型展示</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            專為團體與家庭打造的舒適空間。無論是 6 人小家庭，還是 10 人團體，
            <br/>我們都能滿足您對「聚在一起」的渴望。
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {rooms.map((room, idx) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`bg-white rounded-3xl overflow-hidden shadow-xl border ${
                room.highlight ? 'border-ocean-blue ring-4 ring-blue-100' : 'border-slate-100'
              } flex flex-col`}
            >
              {room.highlight && (
                <div className="bg-ocean-blue text-white text-center py-2 font-bold tracking-widest text-sm">
                  ✨ 2026 包棟首選 ✨
                </div>
              )}
              
              <div className="relative h-64 overflow-hidden group">
                <div className={`w-full h-full bg-gradient-to-br ${
                  idx === 0 ? 'from-orange-100 to-orange-200' :
                  idx === 1 ? 'from-blue-100 to-blue-200' :
                  'from-purple-100 to-purple-200'
                } flex items-center justify-center transition-transform duration-700 group-hover:scale-110`}>
                  <div className="text-white/30">
                    {idx === 0 ? <Users size={64} /> :
                     idx === 1 ? <Users size={64} /> :
                     <Star size={64} />}
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-sm">
                  <Users size={16} className="text-ocean-blue" /> {room.capacity}
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{room.name}</h3>
                <p className="text-slate-500 text-sm mb-6 flex items-center gap-1">
                   <Star size={14} className="text-yellow-400 fill-yellow-400" /> 4.9 顧客好評
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {(room.features || []).map(feat => (
                    <li key={feat} className="flex items-start gap-3 text-slate-700">
                      <CheckCircle size={20} className="text-green-500 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <p className="text-slate-400 text-xs mb-1">參考價格</p>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-black text-ocean-blue">{room.price}</span>
                  </div>
                  <a href="https://line.me/ti/p/2R6s8FaJ6Q" target="_blank" rel="noreferrer" className={`block w-full text-center py-4 rounded-xl font-bold transition-transform active:scale-95 shadow-lg ${
                    room.highlight 
                      ? 'bg-gradient-to-r from-ocean-blue to-blue-600 text-white shadow-blue-500/30' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}>
                    前往預約詢價
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Facilities Section */}
        <div className="mt-20 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 text-center">
            <h2 className="text-3xl font-bold mb-8">沐月貼心設施與服務</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-ocean-blue"><Wifi size={32}/></div>
                    <span className="font-bold text-slate-700">全館高速 WiFi</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-orange-500"><Star size={32}/></div>
                    <span className="font-bold text-slate-700">在地旅遊諮詢</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500"><Coffee size={32}/></div>
                    <span className="font-bold text-slate-700">迎賓點心 Bar</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center text-purple-500"><Car size={32}/></div>
                    <span className="font-bold text-slate-700">代租汽機車</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Rooms
