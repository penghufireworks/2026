import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, MapPin, Phone, MessageCircle } from 'lucide-react'

const seoKeywords = [
  "澎湖花火節2026", "澎湖民宿推薦dcard", "澎湖海景民宿",  
  "澎湖旅遊三天兩夜", "澎湖四天三夜行程", "澎湖美食地圖", "澎湖租車推薦",
  "澎湖親子民宿", "澎湖花火節日期", "澎湖船票", "澎湖機票", "澎湖自由行",
  "馬公市區住宿", "澎湖cp值高民宿", "澎湖花火節郵輪", "澎湖水族館門票"
];

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-black text-white mb-4 font-serif">Moonlight Villa</h3>
            <p className="text-sm leading-relaxed mb-6">
              沐月民宿致力於提供最舒適的澎湖住宿體驗。
              <br/>讓每一位旅人都能在這裡找到回家的感覺。
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-ocean-blue hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">快速導覽</h4>
            <ul className="space-y-3 text-sm">
              {/* <li><Link to="/rooms" className="hover:text-ocean-blue transition-colors">房型總覽</Link></li> */}
              <li><Link to="/fireworks-2026" className="hover:text-ocean-blue transition-colors">2026 花火節</Link></li>
              <li><Link to="/food-map" className="hover:text-ocean-blue transition-colors">美食地圖</Link></li>
              {/* <li><Link to="/itinerary" className="hover:text-ocean-blue transition-colors">智能行程</Link></li> */}
              {/* <li><Link to="/blog" className="hover:text-ocean-blue transition-colors">澎湖美學</Link></li> */}
            </ul>
          </div>

          {/* Booking CTA */}
          <div>
            <a 
              href="https://line.me/ti/p/2R6s8FaJ6Q" 
              target="_blank" 
              rel="noreferrer" 
              className="block w-full bg-ocean-blue text-white text-center py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-900/50"
            >
                前往預約詢價
            </a>
          </div>
        </div>

        {/* SEO Keywords Area (Low Contrast) */}
        <div className="border-t border-slate-800 pt-8 mt-8">
            <p className="text-xs font-bold text-slate-500 mb-4">熱門搜尋</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-slate-600">
                {seoKeywords.map((kw, i) => (
                    <span key={i} className="hover:text-slate-400 transition-colors cursor-default">
                        {kw}
                    </span>
                ))}
            </div>
        </div>

        <div className="text-center text-xs text-slate-600 mt-12">
          &copy; 2026沐月民宿 安讚旅行社
        </div>
      </div>
    </footer>
  )
}

export default Footer
