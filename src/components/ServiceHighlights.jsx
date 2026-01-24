import React from 'react'
import { Plane, Coffee, Map, Key, Car, Camera } from 'lucide-react'

const features = [
  {
    icon: Plane,
    title: "免費機場接送",
    desc: "不用擔心行李大包小包，專車接送讓您優雅抵達。"
  },
  {
    icon: Key,
    title: "舒適住宿環境",
    desc: "精心設計的住宿空間，讓您享受最自在放鬆的度假時光。"
  },
  {
    icon: Map,
    title: "在地管家攻略",
    desc: "提供私房美食地圖與行程建議，不走觀光客冤枉路。"
  },
  {
    icon: Coffee,
    title: "代排網美早餐",
    desc: "想吃二信飯糰又不想早起？管家幫您排隊買回來！"
  },
  {
    icon: Car,
    title: "代租汽機車",
    desc: "配合優質車行，車況新、價格公道，民宿取車還車。"
  },
  {
    icon: Camera,
    title: "花火節專屬服務",
    desc: "協助預訂花火專船，或指引前往最佳拍攝秘密基地。"
  }
]

const ServiceHighlights = () => {
  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">為什麼選擇沐月民宿？</h2>
          <p className="text-slate-400">我們不只是提供住宿，更是您在澎湖的在地朋友</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon
            return (
              <div key={idx} className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="shrink-0 w-12 h-12 bg-gradient-to-br from-ocean-blue to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Icon size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{feat.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ServiceHighlights
