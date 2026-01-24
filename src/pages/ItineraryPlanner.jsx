import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Users, Home, Camera, Utensils, Gift, ArrowRight, ArrowLeft, Check, Sparkles, MessageCircle, MapPin, Clock, Share2, Copy, Sun, Sunset, Moon, Coffee } from 'lucide-react'

// Mock AI Service since backend is removed
const generateItineraryPlan = async (formData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    options: [
      {
        name: "經典觀光",
        tags: ["必去景點", "打卡熱點", "輕鬆"],
        title: "澎湖經典三日遊",
        description: "精選澎湖最著名的景點，適合第一次來澎湖的旅客，輕鬆走訪不趕路。",
        dailyItinerary: [
          {
            day: 1,
            title: "馬公市區巡禮",
            morning: [{ time: "09:00", activity: "抵達澎湖" }, { time: "10:30", activity: "中央老街散策" }],
            lunch: "在地海鮮小吃",
            afternoon: [{ time: "14:00", activity: "篤行十村" }, { time: "16:00", activity: "觀音亭親水遊憩區" }],
            dinner: "馬公港海鮮餐廳",
            evening: [{ time: "19:00", activity: "市區逛街購物" }]
          },
          {
            day: 2,
            title: "北環島風光",
            morning: [{ time: "09:00", activity: "中屯風車" }, { time: "10:30", activity: "通梁古榕" }],
            lunch: "小門嶼小管麵線",
            afternoon: [{ time: "14:00", activity: "跨海大橋" }, { time: "15:30", activity: "大菓葉玄武岩" }],
            dinner: "西嶼夕陽晚餐",
            evening: [{ time: "20:00", activity: "觀星活動" }]
          },
          {
            day: 3,
            title: "南環島與免稅店",
            morning: [{ time: "09:00", activity: "山水沙灘" }, { time: "10:30", activity: "風櫃洞" }],
            lunch: "鎖港美食",
            afternoon: [{ time: "14:00", activity: "澎湖免稅店" }, { time: "16:00", activity: "前往機場/碼頭" }],
            dinner: "溫暖的家",
            evening: []
          }
        ]
      },
      {
        name: "玩水冒險",
        tags: ["水上活動", "刺激", "跳島"],
        title: "熱血玩水跳島行",
        description: "專為喜愛水上活動的你設計，包含吉貝嶼水上活動與海洋牧場體驗。",
        dailyItinerary: [
          {
            day: 1,
            title: "海洋牧場體驗",
            morning: [{ time: "09:00", activity: "抵達澎湖" }, { time: "10:30", activity: "前往南海碼頭" }],
            lunch: "海洋牧場烤牡蠣吃到飽",
            afternoon: [{ time: "14:00", activity: "海上釣魚體驗" }, { time: "16:00", activity: "回程馬公" }],
            dinner: "燒烤吃到飽",
            evening: [{ time: "19:30", activity: "夜釣小管" }]
          },
          {
            day: 2,
            title: "吉貝嶼水上樂園",
            morning: [{ time: "08:30", activity: "前往北海遊客中心" }, { time: "09:30", activity: "吉貝嶼水上活動無限玩" }],
            lunch: "吉貝在地料理",
            afternoon: [{ time: "14:00", activity: "吉貝沙尾拍照" }, { time: "16:00", activity: "返回本島" }],
            dinner: "海鮮餐廳",
            evening: [{ time: "19:00", activity: "自由活動" }]
          },
          {
            day: 3,
            title: "南環沙灘巡禮",
            morning: [{ time: "09:00", activity: "隘門沙灘" }, { time: "10:30", activity: "林投公園" }],
            lunch: "及林春咖啡館",
            afternoon: [{ time: "14:00", activity: "購買伴手禮" }, { time: "16:00", activity: "前往機場/碼頭" }],
            dinner: "溫暖的家",
            evening: []
          }
        ]
      },
      {
        name: "悠閒慢活",
        tags: ["放鬆", "美食", "人文"],
        title: "慢活澎湖美食旅",
        description: "睡到自然醒，品嚐在地美食，深入了解澎湖的人文歷史與慢活步調。",
        dailyItinerary: [
          {
            day: 1,
            title: "慢遊馬公",
            morning: [{ time: "10:00", activity: "抵達澎湖" }, { time: "11:30", activity: "文康商圈早餐街" }],
            lunch: "土魠魚羹",
            afternoon: [{ time: "14:00", activity: "潘安邦紀念館" }, { time: "16:00", activity: "張雨生故事館" }],
            dinner: "精緻無菜單料理",
            evening: [{ time: "19:00", activity: "觀音亭漫步" }]
          },
          {
            day: 2,
            title: "湖西人文散策",
            morning: [{ time: "10:00", activity: "南寮古厝" }, { time: "11:30", activity: "浮球秘境" }],
            lunch: "湖西鄉村料理",
            afternoon: [{ time: "14:00", activity: "奎壁山摩西分海" }, { time: "16:00", activity: "菓葉灰窯" }],
            dinner: "在地海鮮熱炒",
            evening: [{ time: "20:00", activity: "民宿談心" }]
          },
          {
            day: 3,
            title: "最後採買",
            morning: [{ time: "10:00", activity: "Pier3 三號港" }, { time: "12:00", activity: "享用午餐" }],
            lunch: "百貨美食",
            afternoon: [{ time: "14:00", activity: "黑糖糕觀光工廠" }, { time: "16:00", activity: "前往機場/碼頭" }],
            dinner: "溫暖的家",
            evening: []
          }
        ]
      }
    ]
  };
};

// --- UI Components ---
const StepIndicator = ({ currentStep, totalSteps }) => (
  <div className="flex justify-center items-center gap-2 mb-8">
    {[...Array(totalSteps)].map((_, i) => (
      <div key={i} className="flex items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
          i + 1 <= currentStep ? 'bg-ocean-blue text-white shadow-lg shadow-blue-200 scale-110' : 'bg-slate-100 text-slate-400'
        }`}>
          {i + 1}
        </div>
        {i < totalSteps - 1 && (
          <div className={`w-8 h-1 transition-colors duration-300 ${
            i + 1 < currentStep ? 'bg-ocean-blue' : 'bg-slate-100'
          }`} />
        )}
      </div>
    ))}
  </div>
)

const OptionCard = ({ icon: Icon, title, subtitle, selected, onClick, image }) => (
  <motion.button
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`relative p-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 transition-all w-full h-40 overflow-hidden group ${
      selected 
        ? 'border-ocean-blue bg-blue-50/50 text-ocean-blue shadow-lg shadow-blue-100' 
        : 'border-slate-100 bg-white text-slate-600 hover:border-blue-200 hover:bg-slate-50 hover:shadow-md'
    }`}
  >
    <div className="relative z-10 flex flex-col items-center">
        <div className={`p-3 rounded-full mb-2 ${selected ? 'bg-ocean-blue text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-ocean-blue'}`}>
            <Icon size={24} />
        </div>
        <span className="font-bold text-lg">{title}</span>
        {subtitle && <span className="text-xs text-slate-400">{subtitle}</span>}
    </div>
    
    {selected && (
        <div className="absolute top-3 right-3 text-ocean-blue bg-white rounded-full p-1 shadow-sm">
            <Check size={14} strokeWidth={3} />
        </div>
    )}
  </motion.button>
)

const Counter = ({ label, value, onChange, min = 0, icon: Icon }) => (
  <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3">
        {Icon && <div className="p-2 bg-blue-50 text-ocean-blue rounded-lg"><Icon size={20}/></div>}
        <span className="font-bold text-slate-700 text-lg">{label}</span>
    </div>
    <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-1">
      <button 
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-8 h-8 rounded-lg bg-white text-slate-600 shadow-sm flex items-center justify-center hover:bg-slate-100 disabled:opacity-50"
        disabled={value <= min}
      >
        -
      </button>
      <span className="w-6 text-center font-bold text-lg">{value}</span>
      <button 
        onClick={() => onChange(value + 1)}
        className="w-8 h-8 rounded-lg bg-ocean-blue text-white shadow-sm flex items-center justify-center hover:bg-blue-600"
      >
        +
      </button>
    </div>
  </div>
)

// --- Main Component ---
const ItineraryPlanner = () => {
  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState(null)
  const [activePlanId, setActivePlanId] = useState(0) // Index of the active plan

  // Form State
  const [formData, setFormData] = useState({
    adults: 2,
    children: 0,
    infants: 0,
    days: 3,
    roomType: 'double',
    preferences: [],
    food: [],
    souvenirs: []
  })

  const toggleSelection = (category, value) => {
    setFormData(prev => {
      const list = prev[category]
      return {
        ...prev,
        [category]: list.includes(value) ? list.filter(i => i !== value) : [...list, value]
      }
    })
  }

  const handleNext = () => {
    if (step < 5) setStep(step + 1)
    else handleGenerate()
  }

  const handleBack = () => setStep(step - 1)

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      const planData = await generateItineraryPlan(formData)
      if (planData && planData.options) {
          setResult(planData)
          setActivePlanId(0) // Default to first plan
      } else {
          throw new Error("Invalid format")
      }
    } catch (error) {
      console.error("Failed to generate itinerary:", error)
      alert("AI 生成失敗，請檢查 API Key 或稍後再試。")
    } finally {
      setIsGenerating(false)
    }
  }

  const activePlan = result?.options[activePlanId]

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-ocean-blue text-sm font-bold mb-4">
                <Sparkles size={16} /> AI 智能領航
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                客製化您的澎湖旅程
            </h1>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
                只需簡單 5 步驟，為您生成 <span className="text-ocean-blue font-bold">3 種不同風格</span> 的專屬玩法。
            </p>
        </div>

        {!result && !isGenerating && (
          <>
            <StepIndicator currentStep={step} totalSteps={5} />
            
            <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 p-6 md:p-10 min-h-[500px] relative border border-white">
              <AnimatePresence mode="wait">
                
                {/* Step 1: Basic Info */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">成員與天數</h2>
                        <p className="text-slate-500">讓我們知道您的旅遊規模，安排最合適的交通與餐廳</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <Counter icon={Calendar} label="旅遊天數" value={formData.days} onChange={v => setFormData({...formData, days: v})} min={2} max={10} />
                        <Counter icon={Users} label="大人 (12歲+)" value={formData.adults} onChange={v => setFormData({...formData, adults: v})} min={1} />
                        <Counter icon={Users} label="兒童 (3-12歲)" value={formData.children} onChange={v => setFormData({...formData, children: v})} />
                        <Counter icon={Users} label="幼兒 (3歲以下)" value={formData.infants} onChange={v => setFormData({...formData, infants: v})} />
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Accommodation */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">住宿需求</h2>
                        <p className="text-slate-500">選擇最適合您的沐月民宿房型</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <OptionCard 
                        icon={Users} title="溫馨六人房" subtitle="適合小家庭/閨蜜"
                        selected={formData.roomType === '6-person'} 
                        onClick={() => setFormData({...formData, roomType: '6-person'})} 
                      />
                      <OptionCard 
                        icon={Users} title="豪華十人房" subtitle="大家族/學生團體"
                        selected={formData.roomType === '10-person'} 
                        onClick={() => setFormData({...formData, roomType: '10-person'})} 
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Activities */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">玩法偏好</h2>
                        <p className="text-slate-500">告訴我們您喜歡什麼，AI 將為您客製化行程</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {['玩水/浮潛', '網美打卡', '古蹟巡禮', '悠閒放空', '跳島行程', '夜釣小管'].map(opt => (
                        <OptionCard 
                          key={opt} icon={Sparkles} title={opt} 
                          selected={formData.preferences.includes(opt)} 
                          onClick={() => toggleSelection('preferences', opt)} 
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Food */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">美食興趣</h2>
                        <p className="text-slate-500">民以食為天，您絕對不能錯過的澎湖味</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {['海鮮大餐', '在地小吃', '景觀餐廳', '燒烤吃到飽'].map(opt => (
                        <OptionCard 
                          key={opt} icon={Utensils} title={opt} 
                          selected={formData.food.includes(opt)} 
                          onClick={() => toggleSelection('food', opt)} 
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Souvenirs */}
                {step === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">特產伴手禮</h2>
                        <p className="text-slate-500">最後一天想帶什麼回家分享呢？</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {['黑糖糕', '干貝醬', '花生酥', '仙人掌製品'].map(opt => (
                        <OptionCard 
                          key={opt} icon={Gift} title={opt} 
                          selected={formData.souvenirs.includes(opt)} 
                          onClick={() => toggleSelection('souvenirs', opt)} 
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-12 pt-6 border-t border-slate-100">
                <button 
                  onClick={handleBack}
                  disabled={step === 1}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
                    step === 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <ArrowLeft size={18} /> 上一步
                </button>
                <button 
                  onClick={handleNext}
                  className="flex items-center gap-2 px-8 py-3 bg-ocean-blue text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-600 hover:scale-105 transition-all active:scale-95"
                >
                  {step === 5 ? '生成 3 款行程' : '下一步'} <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </>
        )}

        {/* Loading State */}
        {isGenerating && (
          <div className="text-center py-20 bg-white rounded-[2rem] shadow-xl p-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 border-4 border-ocean-blue border-t-transparent rounded-full mx-auto mb-8"
            />
            <h3 className="text-2xl font-bold text-slate-800 mb-2">AI 正在進行多輪推理...</h3>
            <p className="text-slate-500">正在分析您的偏好，並模擬最佳路徑與時間安排</p>
            <div className="mt-6 space-y-2 text-sm text-slate-400">
                <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 0.5}}>✓ 分析成員結構與需求...</motion.div>
                <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 1.5}}>✓ 檢索澎湖在地美食資料庫...</motion.div>
                <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 2.5}}>✓ 優化每日動線與時間軸...</motion.div>
            </div>
          </div>
        )}

        {/* Result State */}
        {result && activePlan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Plan Switcher Tabs */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                {result.options.map((opt, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActivePlanId(idx)}
                        className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                            activePlanId === idx 
                                ? 'border-ocean-blue bg-white shadow-lg scale-105 z-10' 
                                : 'border-transparent bg-white/50 hover:bg-white text-slate-500 hover:shadow-md'
                        }`}
                    >
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                            activePlanId === idx ? 'bg-blue-100 text-ocean-blue' : 'bg-slate-200 text-slate-500'
                        }`}>
                            方案 {idx + 1}
                        </span>
                        <span className={`font-bold ${activePlanId === idx ? 'text-slate-900' : 'text-slate-500'}`}>
                            {opt.name}
                        </span>
                    </button>
                ))}
            </div>

            {/* Active Plan Content */}
            <div className="bg-white rounded-[2rem] shadow-2xl p-6 md:p-10 border border-slate-100 overflow-hidden relative">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50 pointer-events-none"></div>
                
                {/* Header */}
                <div className="relative z-10 mb-10 text-center">
                    <div className="flex justify-center gap-2 mb-4">
                        {activePlan.tags.map(tag => (
                            <span key={tag} className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                                #{tag}
                            </span>
                        ))}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-4">
                        {activePlan.title}
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        {activePlan.description}
                    </p>
                </div>

                {/* Timeline */}
                <div className="space-y-12 relative z-10 max-w-4xl mx-auto">
                    
                    {(activePlan.dailyItinerary || []).map((day, dayIdx) => (
                        <div key={dayIdx} className="relative">
                            {/* Day Header */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className="bg-ocean-blue text-white px-4 py-2 rounded-xl font-black text-xl shadow-lg shadow-blue-500/30">
                                    Day {day.day}
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800">{day.title}</h3>
                            </div>

                            <div className="space-y-6 pl-4 md:pl-0">
                                {/* Morning */}
                                {day.morning && day.morning.length > 0 && (
                                    <div className="flex flex-col md:flex-row gap-6 group">
                                        <div className="md:w-32 flex md:justify-end items-start pt-1 shrink-0">
                                            <span className="flex items-center gap-2 text-orange-500 font-bold bg-orange-50 px-3 py-1 rounded-full text-sm">
                                                <Sun size={16} /> 上午
                                            </span>
                                        </div>
                                        <div className="flex-1 space-y-4 border-l-2 border-orange-100 pl-6 md:pl-8 relative pb-2">
                                            <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-orange-300 ring-4 ring-white"></div>
                                            {day.morning.map((item, idx) => (
                                                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                                                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-1">
                                                        <Clock size={12} /> {item.time}
                                                    </div>
                                                    <h4 className="font-bold text-slate-800 text-lg mb-2">{item.activity}</h4>
                                                    <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Afternoon */}
                                {day.afternoon && day.afternoon.length > 0 && (
                                    <div className="flex flex-col md:flex-row gap-6 group">
                                        <div className="md:w-32 flex md:justify-end items-start pt-1 shrink-0">
                                            <span className="flex items-center gap-2 text-yellow-600 font-bold bg-yellow-50 px-3 py-1 rounded-full text-sm">
                                                <Coffee size={16} /> 下午
                                            </span>
                                        </div>
                                        <div className="flex-1 space-y-4 border-l-2 border-yellow-100 pl-6 md:pl-8 relative pb-2">
                                            <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-yellow-400 ring-4 ring-white"></div>
                                            {day.afternoon.map((item, idx) => (
                                                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                                                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-1">
                                                        <Clock size={12} /> {item.time}
                                                    </div>
                                                    <h4 className="font-bold text-slate-800 text-lg mb-2">{item.activity}</h4>
                                                    <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Evening */}
                                {day.evening && day.evening.length > 0 && (
                                    <div className="flex flex-col md:flex-row gap-6 group">
                                        <div className="md:w-32 flex md:justify-end items-start pt-1 shrink-0">
                                            <span className="flex items-center gap-2 text-indigo-500 font-bold bg-indigo-50 px-3 py-1 rounded-full text-sm">
                                                <Moon size={16} /> 晚上
                                            </span>
                                        </div>
                                        <div className="flex-1 space-y-4 border-l-2 border-indigo-100 pl-6 md:pl-8 relative pb-2">
                                            <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-indigo-300 ring-4 ring-white"></div>
                                            {day.evening.map((item, idx) => (
                                                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                                                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-1">
                                                        <Clock size={12} /> {item.time}
                                                    </div>
                                                    <h4 className="font-bold text-slate-800 text-lg mb-2">{item.activity}</h4>
                                                    <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Actions */}
                <div className="mt-12 flex flex-col md:flex-row gap-4 relative z-10 pt-8 border-t border-slate-100">
                    <button className="flex-1 bg-[#00C300] text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-green-500/30 hover:bg-[#00B300] hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                        <MessageCircle size={24} /> 預約此行程 (加LINE)
                    </button>
                    <button className="px-6 py-4 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 flex items-center gap-2 justify-center">
                        <Share2 size={20} /> 分享
                    </button>
                    <button 
                        onClick={() => { setResult(null); setStep(1); }}
                        className="px-6 py-4 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50"
                    >
                        重新規劃
                    </button>
                </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ItineraryPlanner
