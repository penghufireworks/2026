import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Plane, Ship, Car, MapPin, Send, CheckCircle, Info, Plus, Minus, Home, Sparkles, Flame, Waves, Moon, Anchor, Shell, Fish, Compass, Map, Sun, Sunset, Copy, UserPlus } from 'lucide-react';
import SEO from '../components/SEO';
import { activities } from '../data/activities';

const iconMap = {
  Flame, Waves, Sparkles, Moon, Anchor, Goggles: Fish, Shell, Fish, Compass, Map, Sun, Ship, Sunset
};

const Counter = ({ label, value, onChange, min = 0, max = 99, subLabel = '' }) => (
  <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
    <div className="flex flex-col">
      <span className="font-bold text-slate-700">{label}</span>
      {subLabel && <span className="text-xs text-slate-400">{subLabel}</span>}
    </div>
    <div className="flex items-center gap-3">
      <button 
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Minus size={14} />
      </button>
      <span className="w-6 text-center font-bold text-slate-900">{value}</span>
      <button 
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-ocean-blue text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm shadow-blue-500/30"
      >
        <Plus size={14} />
      </button>
    </div>
  </div>
);

const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <div className="mb-6">
    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-ocean-blue">
        <Icon size={20} />
      </div>
      {title}
    </h2>
    {subtitle && <p className="text-slate-500 text-sm ml-12 mt-1">{subtitle}</p>}
  </div>
);

const BookingInquiry = () => {
  const [formData, setFormData] = useState({
    departureDate: '',
    returnDate: '',
    under3: 0,
    child3_12: 0,
    adult12_65: 6,
    senior65: 0,
    transportation: {
      flight: {
        taipei: 0,
        taichung: 0,
        kaohsiung: 0,
        chiayi: 0,
        tainan: 0
      },
      boat: {
        chiayi: 0,
        kaohsiung: 0
      }
    },
    rentals: {
      car5: 0,
      car9: 0,
      scooter: 0
    },
    roomCount: 1,
    roomRemarks: '',
    activities: [],
    remarks: ''
  });

  const handleTransportChange = (type, city, value) => {
    setFormData(prev => ({
      ...prev,
      transportation: {
        ...prev.transportation,
        [type]: {
          ...prev.transportation[type],
          [city]: Math.max(0, parseInt(value) || 0)
        }
      }
    }));
  };

  const handleRentalChange = (type, value) => {
    setFormData(prev => ({
      ...prev,
      rentals: {
        ...prev.rentals,
        [type]: Math.max(0, parseInt(value) || 0)
      }
    }));
  };

  const toggleActivity = (activity) => {
    setFormData(prev => {
      const newActivities = prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity];
      return { ...prev, activities: newActivities };
    });
  };

  const generateLineMessage = () => {
    let msg = `【預約詢價】\n`;
    msg += `日期：${formData.departureDate} ~ ${formData.returnDate}\n`;
    msg += `人數：\n`;
    if (formData.under3 > 0) msg += `未滿3歲：${formData.under3}人\n`;
    if (formData.child3_12 > 0) msg += `3-12歲：${formData.child3_12}人\n`;
    if (formData.adult12_65 > 0) msg += `12-65歲：${formData.adult12_65}人\n`;
    if (formData.senior65 > 0) msg += `65歲以上：${formData.senior65}人\n`;
    msg += `\n`;

    msg += `【住宿房型需求】\n`;
    msg += `4-10人房：${formData.roomCount}間\n`;
    if (formData.roomRemarks) msg += `房間備註：${formData.roomRemarks}\n`;
    msg += `\n`;

    const flights = Object.entries(formData.transportation.flight).filter(([_, count]) => count > 0);
    const boats = Object.entries(formData.transportation.boat).filter(([_, count]) => count > 0);

    if (flights.length > 0 || boats.length > 0) {
      msg += `【台澎交通】\n`;
      flights.forEach(([city, count]) => {
        const cityName = { taipei: '台北', taichung: '台中', kaohsiung: '高雄', chiayi: '嘉義', tainan: '台南' }[city];
        msg += `機票-${cityName}：${count}人\n`;
      });
      boats.forEach(([city, count]) => {
         const cityName = { chiayi: '嘉義', kaohsiung: '高雄' }[city];
         msg += `船票-${cityName}：${count}人\n`;
      });
      msg += `\n`;
    }

    if (formData.rentals.car5 > 0 || formData.rentals.car9 > 0 || formData.rentals.scooter > 0) {
      msg += `【島上交通】\n`;
      if (formData.rentals.car5 > 0) msg += `五人座轎車：${formData.rentals.car5}台\n`;
      if (formData.rentals.car9 > 0) msg += `九人座休旅：${formData.rentals.car9}台\n`;
      if (formData.rentals.scooter > 0) msg += `機車：${formData.rentals.scooter}台\n`;
      msg += `\n`;
    }

    if (formData.activities.length > 0) {
      msg += `【代訂活動】\n`;
      formData.activities.forEach(act => msg += `• ${act}\n`);
      msg += `\n`;
    }

    if (formData.remarks) {
      msg += `【備註】\n${formData.remarks}`;
    }

    return msg;
  };

  const activityList = activities.map(act => ({
    name: act.title,
    sub: act.features.slice(0, 2).join('/'),
    icon: iconMap[act.icon] || Sparkles,
    tag: act.tags[0]
  }));

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4 md:px-8">
      <SEO title="預約詢價" />
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-ocean-blue text-xs font-bold mb-4">
            2026 花火節開放預訂中
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
            開始規劃您的<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean-blue to-blue-400">
              澎湖夢幻旅程
            </span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            填寫下方需求單，我們將為您安排最適合的住宿與行程方案。
            專人透過 Line 一對一服務，輕鬆搞定所有預訂。
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100"
        >
          {/* Progress / Decoration Header */}
          <div className="h-2 bg-gradient-to-r from-ocean-blue via-blue-400 to-purple-400" />
          
          <div className="p-6 md:p-12">
            
            {/* Date & People */}
            <section className="mb-12">
              <SectionHeader icon={Calendar} title="日期與人數" subtitle="" />
              
              <div className="bg-slate-50/50 rounded-3xl p-6 md:p-8 border border-slate-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">出發日期</label>
                    <input 
                      type="date" 
                      value={formData.departureDate}
                      onChange={e => setFormData({...formData, departureDate: e.target.value})}
                      className="w-full p-4 bg-white rounded-xl shadow-sm border border-slate-100 focus:outline-none focus:border-ocean-blue"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">回程日期</label>
                    <input 
                      type="date" 
                      value={formData.returnDate}
                      onChange={e => setFormData({...formData, returnDate: e.target.value})}
                      className="w-full p-4 bg-white rounded-xl shadow-sm border border-slate-100 focus:outline-none focus:border-ocean-blue"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Counter 
                    label="未滿3歲" 
                    value={formData.under3} 
                    onChange={v => setFormData({...formData, under3: v})} 
                  />
                  <Counter 
                    label="3-12歲" 
                    value={formData.child3_12} 
                    onChange={v => setFormData({...formData, child3_12: v})} 
                  />
                  <Counter 
                    label="12歲-65歲" 
                    value={formData.adult12_65} 
                    onChange={v => setFormData({...formData, adult12_65: v})} 
                    min={1}
                  />
                  <Counter 
                    label="65歲以上" 
                    value={formData.senior65} 
                    onChange={v => setFormData({...formData, senior65: v})} 
                  />
                </div>
              </div>
            </section>

            <hr className="border-slate-100 my-10" />

            {/* Accommodation */}
            <section className="mb-12">
              <SectionHeader icon={Home} title="住宿房型需求" subtitle="我們房間都是以大房型為主(4-10人房)歡迎預訂" />
              <div className="bg-slate-50/50 rounded-3xl p-6 md:p-8 border border-slate-100">
                 <div className="mb-6">
                   <Counter 
                     label="4-10人房" 
                     subLabel="間數"
                     value={formData.roomCount} 
                     onChange={v => setFormData({...formData, roomCount: v})} 
                     min={1}
                   />
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">房間備註</label>
                    <textarea 
                      value={formData.roomRemarks}
                      onChange={e => setFormData({...formData, roomRemarks: e.target.value})}
                      className="w-full p-4 bg-white rounded-xl shadow-sm border border-slate-100 focus:outline-none focus:border-ocean-blue h-24 resize-none"
                      placeholder="例如：需要嬰兒澡盆..."
                    />
                 </div>
              </div>
            </section>

            <hr className="border-slate-100 my-10" />

            {/* Transportation */}
            <section className="mb-12">
              <SectionHeader icon={Plane} title="台澎交通工具" subtitle="" />
              
              <div className="space-y-6">
                <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100">
                  <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Plane size={18} className="text-ocean-blue"/> 搭機 (填寫人數)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {Object.entries({ taipei: '台北', taichung: '台中', kaohsiung: '高雄', chiayi: '嘉義', tainan: '台南' }).map(([key, label]) => (
                      <Counter 
                        key={key}
                        label={label} 
                        value={formData.transportation.flight[key]} 
                        onChange={v => handleTransportChange('flight', key, v)} 
                      />
                    ))}
                  </div>
                </div>

                <div className="bg-orange-50/50 p-6 rounded-3xl border border-orange-100">
                  <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Ship size={18} className="text-orange-500"/> 搭船 (填寫人數)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                     {Object.entries({ chiayi: '嘉義', kaohsiung: '高雄' }).map(([key, label]) => (
                      <Counter 
                        key={key}
                        label={label} 
                        value={formData.transportation.boat[key]} 
                        onChange={v => handleTransportChange('boat', key, v)} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-slate-100 my-10" />

            {/* Island Transportation */}
            <section className="mb-12">
              <SectionHeader icon={Car} title="島上交通租賃" subtitle="配合合法租賃業者，提供機場/碼頭接送" />
              
              <div className="bg-orange-50 p-4 rounded-2xl mb-6 flex items-start gap-3 text-sm text-orange-800 border border-orange-100">
                <Info size={18} className="mt-0.5 shrink-0 text-orange-600" />
                <p>租車皆包含機場/碼頭接送服務。如需接送請在備註欄註明班機/船班時間。</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Counter 
                  label="五人座轎車" 
                  subLabel="VIOS"
                  value={formData.rentals.car5} 
                  onChange={v => handleRentalChange('car5', v)} 
                />
                <Counter 
                  label="九人座休旅" 
                  subLabel="Hyundai Starex"
                  value={formData.rentals.car9} 
                  onChange={v => handleRentalChange('car9', v)} 
                />
                <Counter 
                  label="機車" 
                  subLabel="125cc"
                  value={formData.rentals.scooter} 
                  onChange={v => handleRentalChange('scooter', v)} 
                />
              </div>
            </section>

            <hr className="border-slate-100 my-10" />

            {/* Activities */}
            <section className="mb-12">
              <SectionHeader icon={Sparkles} title="精選澎湖必玩行程" subtitle="我們旅行社代訂享優惠價" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {activityList.map(act => (
                  <motion.div 
                    key={act.name}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleActivity(act.name)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col gap-2 relative overflow-hidden ${
                      formData.activities.includes(act.name)
                        ? 'bg-blue-50 border-ocean-blue shadow-md'
                        : 'bg-white border-slate-100 hover:border-blue-200 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className={`p-2 rounded-lg ${formData.activities.includes(act.name) ? 'bg-white text-ocean-blue' : 'bg-blue-50 text-ocean-blue'}`}>
                        <act.icon size={24} />
                      </div>
                      {formData.activities.includes(act.name) && (
                        <div className="bg-ocean-blue text-white p-1 rounded-full">
                          <CheckCircle size={14} />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className={`font-bold ${formData.activities.includes(act.name) ? 'text-ocean-blue' : 'text-slate-700'}`}>
                        {act.name}
                      </h4>
                      {act.sub && <p className="text-xs text-slate-500 mt-1">{act.sub}</p>}
                    </div>
                    <div className="absolute -bottom-2 -right-2 opacity-5 pointer-events-none text-slate-900">
                      <act.icon size={80} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Remarks */}
            <section className="mb-12">
              <h2 className="text-xl font-bold text-slate-900 mb-4">其他備註需求</h2>
              <textarea 
                value={formData.remarks}
                onChange={e => setFormData({...formData, remarks: e.target.value})}
                className="w-full p-6 bg-slate-50 rounded-3xl border-0 focus:ring-2 focus:ring-ocean-blue h-40 resize-none text-slate-700 placeholder:text-slate-400"
                placeholder="例如：需要嬰兒澡盆..."
              ></textarea>
            </section>

            {/* Preview */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Info size={24} className="text-ocean-blue" /> 詢價內容預覽
              </h2>
              <div className="bg-slate-100 p-6 rounded-2xl border border-slate-200 text-slate-700 font-mono text-sm whitespace-pre-wrap leading-relaxed shadow-inner">
                {generateLineMessage()}
              </div>
            </section>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center pt-4">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generateLineMessage());
                  alert('詢價內容已複製！請點擊右側「加 Line 好友」按鈕，加入後貼上內容即可。');
                }}
                className="group flex-1 flex items-center justify-center gap-3 text-white font-black text-xl py-5 px-8 rounded-2xl bg-gradient-to-r from-slate-700 to-slate-800 shadow-xl shadow-slate-500/20 hover:shadow-2xl hover:shadow-slate-500/30 hover:-translate-y-1 transition-all w-full relative overflow-hidden"
              >
                 <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <Copy size={24} /> 複製需求內容
              </button>
              
              <a
                href="https://line.me/ti/p/2R6s8FaJ6Q"
                target="_blank"
                rel="noreferrer"
                className="group flex-1 flex items-center justify-center gap-3 text-white font-black text-xl py-5 px-8 rounded-2xl bg-gradient-to-r from-[#06C755] to-[#00B900] shadow-xl shadow-green-500/20 hover:shadow-2xl hover:shadow-green-500/30 hover:-translate-y-1 transition-all w-full relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <UserPlus size={24} /> 加 Line 好友貼上
              </a>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingInquiry;
