import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, AlertCircle, Video, MapPin, Info } from 'lucide-react';
import { getTideData } from '../data/tides';
import SEO from '../components/SEO';

const MosesSea = () => {
  const [activeMonth, setActiveMonth] = useState(4);
  const [currentTides, setCurrentTides] = useState([]);
  const todayRef = useRef(null);

  useEffect(() => {
    // 載入當前月份資料
    const data = getTideData(2026, activeMonth);
    setCurrentTides(data);
  }, [activeMonth]);

  // Scroll to today's date on load
  useEffect(() => {
    // Current environment date is 2026-01-24, but let's simulate checking against the data year
    // If the real date matches an entry, scroll to it.
    const now = new Date();
    // In a real scenario, we'd use the actual year, but the data is specifically for 2026 (115年)
    // So we check if "now" matches any date in our list.
    // For demo purposes, if today is not in range, we might not scroll, 
    // or if the user is testing in 2026, it will work.
    
    // Logic to scroll if reference exists
    if (todayRef.current) {
        setTimeout(() => {
            todayRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 500); // Small delay to ensure render
    }
  }, []);

  const months = [4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <SEO 
        title="奎壁山摩西分海潮汐表 | 2026 澎湖旅遊"
        description="2026年4月-10月奎壁山摩西分海完整潮汐表與即時影像，掌握最佳通行時間。"
      />

      {/* Hero / Video Section */}
      <div className="bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-blue-900 to-slate-900">
             {/* Background Gradient */}
        </div>
        
        <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 bg-ocean-blue/20 border border-ocean-blue/30 text-ocean-blue px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm">
                <MapPin size={16} /> 澎湖縣湖西鄉北寮村
              </div>
              <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight">
                奎壁山<span className="text-ocean-blue">摩西分海</span>
              </h1>
              <p className="text-slate-300 text-lg max-w-xl">
                每逢退潮時，海中會露出一條S型的玄武岩步道，彷彿摩西分海的奇景。
                請務必參考下方潮汐表，在安全時段內通行。
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
              </div>
            </div>

            {/* Video Embed */}
            <div className="flex-1 w-full max-w-xl">
                <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 bg-black relative group">
                    <iframe 
                        width="100%" 
                        height="100%" 
                        src="https://www.youtube.com/embed/zgPJbQzlQmw" 
                        title="Moses Sea Video" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        className="w-full h-full"
                    ></iframe>
                    <div className="absolute inset-0 pointer-events-none border-inner rounded-2xl ring-1 ring-white/10"></div>
                </div>
                <p className="text-center text-slate-400 text-sm mt-2">
                    * 畫面僅供參考，實際潮汐請以現場廣播為主
                </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Tide Tables */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        
        {/* Month Navigation (Sticky) */}
        <div className="sticky top-20 z-30 bg-slate-50/95 backdrop-blur-sm py-4 mb-8 border-b border-slate-200 overflow-x-auto">
            <div className="flex items-center gap-2 min-w-max px-2">
                {months.map(m => (
                    <button
                        key={m}
                        onClick={() => {
                            setActiveMonth(m);
                        }}
                        className={`px-6 py-2 rounded-full font-bold transition-all ${
                            activeMonth === m 
                            ? 'bg-ocean-blue text-white shadow-lg shadow-blue-500/30 scale-105' 
                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                        }`}
                    >
                        {m} 月
                    </button>
                ))}
            </div>
        </div>

        <div className="space-y-16">
            <div id={`month-${activeMonth}`} className="scroll-mt-40">
                <div className="flex items-end gap-4 mb-6 border-l-4 border-ocean-blue pl-4">
                    <h2 className="text-3xl font-bold text-slate-800">{activeMonth} 月</h2>
                    <span className="text-slate-500 font-medium pb-1">2026 (民國115年)</span>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="grid grid-cols-12 bg-slate-50 border-b border-slate-200 py-4 px-4 text-sm font-bold text-slate-600 gap-2">
                        <div className="col-span-2 md:col-span-1 text-center">日期</div>
                        <div className="col-span-2 md:col-span-1 text-center">星期</div>
                        <div className="col-span-8 md:col-span-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="hidden md:block text-center text-blue-600">滿潮時間</div>
                            <div className="hidden md:block text-center text-orange-600">乾潮時間</div>
                            <div className="text-center text-green-700">建議安全通行時段</div>
                        </div>
                    </div>

                    <div className="divide-y divide-slate-100">
                        {currentTides.map((item, idx) => {
                            // Check if this is "today"
                            const now = new Date();
                            // Check against current real year or specific 2026 year if desired.
                            // Assuming we want to highlight if today matches the date in 2026 context
                            // OR if we are strictly in 2026.
                            // For demo, let's match Month/Date regardless of year if not 2026, or match fully.
                            // But requirement says "2026". Let's stick to strict match or partial.
                            // Let's use strict match for correctness in 2026, but loose for demo?
                            // User asked for "today's date highlighting".
                            const isToday = (now.getMonth() + 1) === activeMonth && now.getDate() === parseInt(item.date);
                            
                            return (
                                <motion.div 
                                    key={`${activeMonth}-${idx}`}
                                    ref={isToday ? todayRef : null}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    className={`group relative transition-colors duration-200 hover:bg-blue-50/50 ${isToday ? 'bg-yellow-50 ring-2 ring-yellow-400 z-10' : ''}`}
                                >
                                    {isToday && (
                                        <div className="absolute -left-2 top-1/2 -translate-y-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-r shadow-sm">
                                            今日
                                        </div>
                                    )}

                                    <div className="grid grid-cols-12 py-4 px-4 items-center gap-2">
                                        <div className="col-span-2 md:col-span-1 text-center font-bold text-xl text-slate-700 font-serif">
                                            {activeMonth}/{item.date}
                                        </div>
                                        <div className={`col-span-2 md:col-span-1 text-center font-medium ${
                                            ['六', '日'].includes(item.day) ? 'text-red-500' : 'text-slate-500'
                                        }`}>
                                            {item.day}
                                        </div>
                                        
                                        <div className="col-span-8 md:col-span-10 space-y-2">
                                            {item.tides.map((tide, tIdx) => (
                                                <div key={tIdx} className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 items-center p-2 rounded-lg group-hover:bg-white/50 transition-colors">
                                                    {/* Mobile Labels */}
                                                    <div className="md:hidden flex justify-between text-xs text-slate-400 mb-1">
                                                        <span>滿潮 {tide.high}</span>
                                                        <span>乾潮 {tide.low}</span>
                                                    </div>

                                                    <div className="hidden md:flex items-center justify-center gap-2 text-slate-600 bg-blue-50/50 py-1 rounded">
                                                        <span className="text-blue-500"><Clock size={14}/></span>
                                                        滿潮時間 {tide.high}
                                                    </div>
                                                    <div className="hidden md:flex items-center justify-center gap-2 text-slate-600 bg-orange-50/50 py-1 rounded">
                                                        <span className="text-orange-500"><Clock size={14}/></span>
                                                        乾潮時間 {tide.low}
                                                    </div>
                                                    <div className="flex items-center justify-center gap-2 text-green-700 font-bold bg-green-50 py-2 px-3 rounded-lg border border-green-100 group-hover:border-green-200 shadow-sm">
                                                        {tide.range.includes("非公告") ? (
                                                             <span className="flex items-center gap-1 text-slate-400 font-normal">
                                                                <AlertCircle size={14} /> {tide.range}
                                                             </span>
                                                        ) : (
                                                            <>
                                                                <span className="animate-pulse text-green-500">●</span>
                                                                步道開放時段 {tide.range}
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                            {item.special && (
                                                <div className="text-xs text-center text-orange-600 font-medium bg-orange-50 py-1 rounded mt-1">
                                                    ⚠️ {item.special}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MosesSea;
