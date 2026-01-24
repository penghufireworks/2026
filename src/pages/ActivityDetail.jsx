import React, { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Clock, AlertCircle, CheckCircle, MessageCircle, Shield } from 'lucide-react'
import { activities } from '../data/activities'

const ActivityDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const activity = activities.find(a => a.id === id)

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!activity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">找不到此活動</h2>
          <button onClick={() => navigate('/activities')} className="text-ocean-blue underline">
            返回活動列表
          </button>
        </div>
      </div>
    )
  }

  const tags = Array.isArray(activity.tags) ? activity.tags : [];
  const features = Array.isArray(activity.features) ? activity.features : [];
  const included = Array.isArray(activity.included) ? activity.included : [];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Image */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
            <CheckCircle size={120} className="text-white/20" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        {/* Navigation & Title */}
        <div className="absolute top-0 left-0 right-0 p-6 pt-24 z-10 flex justify-between items-start max-w-7xl mx-auto w-full">
          <button 
            onClick={() => navigate(-1)} 
            className="bg-white/20 backdrop-blur p-2 rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-7xl mx-auto w-full text-white">
          <div className="flex gap-2 mb-4">
            {tags.map(tag => (
              <span key={tag} className="bg-ocean-blue px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-2">{activity.title}</h1>
          <p className="text-lg md:text-xl opacity-90 flex items-center gap-2">
            <MapPin size={18} className="text-orange-400" /> 地點：{activity.location}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-20 grid lg:grid-cols-3 gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Features */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <CheckCircle className="text-ocean-blue" /> 行程特色
            </h2>
            <ul className="space-y-4">
              {features.map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700 leading-relaxed text-lg">
                  <span className="w-6 h-6 rounded-full bg-blue-50 text-ocean-blue flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {feat}
                </li>
              ))}
            </ul>
          </div>

          {/* Included & Notice */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Shield className="text-green-500" /> 費用包含
              </h3>
              <ul className="space-y-2">
                {included.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <AlertCircle className="text-orange-500" /> 注意事項
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {activity.notice}
              </p>
            </div>
          </div>

        </div>

        {/* Sticky Sidebar (Booking) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-3xl p-6 shadow-2xl border-t-4 border-ocean-blue">
            <div className="flex justify-between items-end mb-6">
              <span className="text-slate-500 font-bold">參考價格</span>
              <span className="text-4xl font-black text-ocean-blue">{activity.price || '請洽詢'}</span>
            </div>
            
            <div className="space-y-3">
              <button className="w-full bg-[#06C755] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-[#05b54d] transition-colors flex items-center justify-center gap-2">
                <MessageCircle size={24} /> 加 LINE 預約 / 諮詢
              </button>
              <p className="text-xs text-center text-slate-400 mt-2">
                * 實際價格與船班時間請以 LINE 客服報價為準
              </p>
            </div>

            <hr className="my-6 border-slate-100" />

            <div className="bg-blue-50 p-4 rounded-xl">
              <h4 className="font-bold text-ocean-blue mb-2 text-sm">為什麼選擇沐月代訂？</h4>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex gap-2">✨ <b>免排隊購票</b>：保證有位，直接取票</li>
                <li className="flex gap-2">✨ <b>在地專業諮詢</b>：不踩雷，玩得最道地</li>
                <li className="flex gap-2">✨ <b>行程整合</b>：幫您安排順路行程，不繞路</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ActivityDetail
