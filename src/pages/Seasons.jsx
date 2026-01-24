import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, CloudRain, Wind, Snowflake, MapPin, Thermometer, Shirt, Camera, BookOpen } from 'lucide-react'

const seasons = [
  {
    id: 'spring',
    name: '春之賞鷗',
    engName: 'Spring',
    icon: CloudRain,
    color: 'bg-emerald-500',
    gradient: 'from-emerald-400 to-teal-600',
    textColor: 'text-emerald-600',
    quote: "萬物甦醒，燕鷗歸來。在無人島的峭壁上，聆聽生命的樂章。",
    desc: "春天的澎湖，是候鳥的樂園。數以萬計的燕鷗回到東海的無人島繁衍，這是攝影愛好者最期待的季節。氣候舒適涼爽，避開了夏季的酷熱，最適合進行深度的生態之旅。",
    fullContent: `
      <h4 class="text-xl font-bold mb-3 text-emerald-700">燕鷗歸來的季節</h4>
      <p class="mb-4">
        當春風吹拂過澎湖群島，喚醒了沉睡的海洋，也帶來了遠方的嬌客。每年四月至九月，是澎湖燕鷗的繁殖季，成千上萬的燕鷗不遠千里而來，選擇在澎湖無人島的玄武岩峭壁上築巢繁衍。其中以「貓嶼」的海鳥保護區最為壯觀，被譽為「海上的野生鳥園」。
      </p>
      <p class="mb-4">
        搭乘遊艇巡航於東海或南海的無人島之間，您可以近距離觀察到鳳頭燕鷗、蒼燕鷗、白眉燕鷗等珍稀鳥類。牠們在藍天碧海間展翅翱翔，或俯衝捕食，或在岩壁上哺育幼鳥，鳴叫聲此起彼落，譜寫出一曲充滿生命力的自然樂章。這不僅是攝影愛好者捕捉精彩瞬間的絕佳時機，更是親子生態教育最生動的課堂。
      </p>
      
      <h4 class="text-xl font-bold mb-3 text-emerald-700">氣候宜人，漫步沙灘</h4>
      <p class="mb-4">
        春季的澎湖，氣溫回暖至 20-26 度之間，褪去了冬日的寒意，又尚未迎來夏日的酷暑，是整年中最舒適宜人的季節。此時的海水清澈見底，沙灘潔白細緻，著名的「摩西分海」在春季的潮汐配合下，更顯得神秘而壯觀。
      </p>
      <p class="mb-4">
        除了賞鷗，春季也是探訪綠蠵龜產卵的前奏。雖然產卵季主要在夏季，但在春末夏初之際，幸運的遊客或許能在望安島的沙灘上，發現海龜媽媽上岸探勘的蹤跡。這是一個充滿生機與希望的季節，適合放慢腳步，用心感受澎湖獨特的島嶼生態。
      </p>
    `,
    weather: "20°C - 26°C，舒適涼爽，偶有微風。",
    wear: "薄長袖、風衣外套，建議洋蔥式穿法。",
    activities: ['東海巡航賞鷗', '摩西分海', '潮間帶生態導覽', '綠蠵龜產卵季(5月起)'],
    price: '$ 1,500 起'
  },
  {
    id: 'summer',
    name: '夏之花火',
    engName: 'Summer',
    icon: Sun,
    color: 'bg-orange-500',
    gradient: 'from-orange-400 to-red-500',
    textColor: 'text-orange-600',
    quote: "璀璨花火，點亮夜空。與海浪共舞，享受最熱情的島嶼時光。",
    desc: "澎湖的夏天屬於海洋與天空。國際海上花火節每週綻放，無人機與煙火交織出最夢幻的夜景。白天跳入清澈的海水消暑，晚上大啖露天燒烤，這是年輕人最愛的熱血季節。",
    fullContent: `
      <h4 class="text-xl font-bold mb-3 text-orange-700">國際海上花火節的視覺饗宴</h4>
      <p class="mb-4">
        夏天的澎湖，是熱情與浪漫的代名詞。年度盛事「澎湖國際海上花火節」在此時盛大登場，每週一、四的夜晚，觀音亭園區的虹橋上空，絢麗的煙火與無人機燈光秀交織，點亮了漆黑的夜空。倒映在海面上的波光粼粼，與天上的繁星相互輝映，震撼的視覺效果讓人終身難忘。
      </p>
      <p class="mb-4">
        除了在岸上觀賞，您更可以選擇搭乘花火船出海，從海上的獨特視角仰望這場光影盛宴，避開擁擠的人潮，享受專屬於您的浪漫時刻。花火節不僅是煙火表演，更結合了國際知名動漫IP（如迪士尼、海賊王等），每年都吸引無數遊客前來朝聖。
      </p>
      
      <h4 class="text-xl font-bold mb-3 text-orange-700">擁抱海洋，盡情玩水</h4>
      <p class="mb-4">
        夏日的艷陽高照，是親近海洋的最佳時刻。吉貝沙尾的黃金沙灘綿延數公里，各式水上活動如香蕉船、水上摩托車應有盡有；或是前往七美島，在雙心石滬前許下心願，潛入海底欣賞美麗的珊瑚礁與熱帶魚群。
      </p>
      <p class="mb-4">
        夜晚的活動同樣精彩，搭乘夜釣小管的船隻出海，體驗親手釣起晶瑩剔透小管的成就感，隨後在船上享用現煮的小管麵線與刺身，鮮甜的滋味是夏夜最完美的句點。澎湖的夏天，充滿了青春的氣息與無盡的歡笑。
      </p>
    `,
    weather: "28°C - 33°C，艷陽高照，紫外線強。",
    wear: "短袖、短褲、比基尼、墨鏡、帽子、防曬乳必備。",
    activities: ['海上花火船', '夜釣小管', '吉貝水上活動', '七美雙心石滬'],
    price: '$ 2,999 起'
  },
  {
    id: 'autumn',
    name: '秋之奇岩',
    engName: 'Autumn',
    icon: Wind,
    color: 'bg-amber-600',
    textColor: 'text-amber-700',
    quote: "風起之時，海鮮正肥。在壯麗的玄武岩下，品嚐大海的餽贈。",
    desc: "秋風起，遊客漸少，澎湖回歸寧靜。這時候的海鮮最為肥美，尤其是螃蟹與鮮蚵。適合喜歡慢活、不喜歡排隊的旅客。騎著車漫遊北環，欣賞世界級的玄武岩地質景觀。",
    fullContent: `
      <h4 class="text-xl font-bold mb-3 text-amber-700">鬼斧神工的玄武岩地質</h4>
      <p class="mb-4">
        秋季的澎湖，東北季風漸起，雖然不適合下水，卻是欣賞地質景觀的絕佳時機。澎湖群島由火山熔岩冷卻形成，擁有世界級的柱狀玄武岩景觀。西嶼的「大菓葉玄武岩」，高聳壯麗的石柱倒映在雨後積水中，宛如一幅潑墨山水畫；小門嶼的「鯨魚洞」，則是海蝕作用下的傑作，見證了大自然千萬年的雕琢。
      </p>
      <p class="mb-4">
        在這個季節，您可以放慢腳步，騎著機車漫遊北環路線，探訪池西岩瀑（九孔瀑布）的幾何之美，或是前往桶盤嶼，欣賞有「澎湖黃石公園」美譽的環島玄武岩柱。少了夏季的喧囂，更能細細品味這些地質奇觀的震撼。
      </p>
      
      <h4 class="text-xl font-bold mb-3 text-amber-700">秋蟹肥美，饕客首選</h4>
      <p class="mb-4">
        俗話說「秋風起，蟹腳癢」，秋天是品嚐澎湖海鮮的黃金季節。此時的螃蟹肉質飽滿、蟹膏濃郁，著名的「澎湖三點蟹」、「花蟹」正值產季。此外，經過夏季滋養的鮮蚵也依然肥美，各式海鮮料理如海膽炒飯、清蒸石斑等，都是不可錯過的美味。
      </p>
      <p class="mb-4">
        秋季旅遊還有一個隱藏優勢：不需要排隊！無論是知名的小吃店還是熱門的打卡景點，都多了幾分悠閒與從容。您可以像個在地人一樣，悠閒地穿梭在巷弄間，尋找那些隱藏版的古早味，享受一場視覺與味覺的雙重饗宴。
      </p>
    `,
    weather: "23°C - 29°C，早晚偏涼，東北季風漸強。",
    wear: "短袖搭配薄外套，騎車務必戴防風鏡。",
    activities: ['大菓葉玄武岩', '池西岩瀑', '秋蟹海鮮宴', '篤行十村'],
    price: '$ 2,200 起'
  },
  {
    id: 'winter',
    name: '冬之訪古',
    engName: 'Winter',
    icon: Snowflake,
    color: 'bg-blue-500',
    textColor: 'text-blue-600',
    quote: "老街古厝，歲月靜好。體驗風帆極速，感受菊島的堅韌生命力。",
    desc: "冬天的澎湖有著獨特的滄桑美。走入二崁古聚落，在咾咕石牆下喝一杯熱杏仁茶。強勁的東北季風讓澎湖成為世界級的風帆與風浪板聖地，吸引各國好手前來挑戰。",
    fullContent: `
      <h4 class="text-xl font-bold mb-3 text-blue-700">穿越時空的古蹟巡禮</h4>
      <p class="mb-4">
        冬天的澎湖，展現出另一種沉靜與堅韌的面貌。這是探訪人文古蹟的最佳季節。全台最古老的媽祖廟「澎湖天后宮」，保存了豐富的歷史文物與精美的木雕藝術，是信仰與文化的中心。漫步在「中央老街」，紅磚瓦牆與四眼井訴說著馬公港的繁華過往。
      </p>
      <p class="mb-4">
        西嶼的「二崁聚落」是必訪之地，這裡是全台保存最完整的閩南式傳統聚落。咾咕石砌成的防風牆（菜宅），展現了先民與自然共存的智慧。走進古厝，品嚐一杯溫熱濃郁的二崁杏仁茶，或是來塊傳統的土仁粿，在寒風中感受濃濃的人情味與懷舊氛圍。
      </p>
      
      <h4 class="text-xl font-bold mb-3 text-blue-700">風的故鄉，極限挑戰</h4>
      <p class="mb-4">
        許多人畏懼澎湖冬天的東北季風，但對風帆運動愛好者來說，這卻是上帝的恩賜。強勁而穩定的風力，讓澎湖成為世界級的風帆與風浪板聖地，每年冬天都吸引來自全球的好手前來挑戰極限。
      </p>
      <p class="mb-4">
        此外，冬季也是「訪古」的季節，除了建築，還可以探訪澎湖生活博物館，深入了解島嶼的民俗風情與海洋文化。如果您喜歡安靜、喜歡歷史、想要體驗不同於觀光客視角的澎湖，冬天絕對是您深度探索這座島嶼靈魂的最佳時機。
      </p>
    `,
    weather: "16°C - 22°C，風大體感溫度較低。",
    wear: "防風保暖外套、帽子（必備，防頭痛）。",
    activities: ['二崁聚落', '天后宮祈福', '風帆/風浪板體驗', '室內博物館'],
    price: '$ 1,200 起'
  }
]

const Seasons = () => {
  const [activeTab, setActiveTab] = useState('summer')
  const activeSeason = seasons.find(s => s.id === activeTab)

  if (!activeSeason) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight font-serif">
            澎湖四季，<br className="md:hidden"/>皆是風景
          </h1>
          <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto">
            春賞鷗、夏花火、秋奇岩、冬訪古。
            <br/>打破夏天才能去澎湖的迷思，每個季節都有專屬的玩法與感動。
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {seasons.map((season) => {
            const Icon = season.icon
            const isActive = activeTab === season.id
            return (
              <button
                key={season.id}
                onClick={() => setActiveTab(season.id)}
                className={`flex items-center gap-2 px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 ${
                  isActive
                    ? `${season.color} text-white shadow-xl scale-105 ring-4 ring-white`
                    : 'bg-white text-slate-400 hover:bg-slate-100'
                }`}
              >
                <Icon size={20} />
                {season.name}
              </button>
            )
          })}
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-12 items-start"
          >
            {/* Image Side */}
            <div className={`relative group rounded-[2.5rem] overflow-hidden shadow-2xl h-[600px] lg:h-[800px] bg-gradient-to-br ${activeSeason.gradient}`}>
              <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-40 transition-opacity duration-700">
                <activeSeason.icon size={300} className="text-white" />
              </div>
              
              {/* Quote Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <p className="text-white/80 text-sm font-bold tracking-widest mb-2 uppercase">{activeSeason.engName}</p>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-serif leading-tight">
                    {activeSeason.quote}
                </h2>
              </div>
            </div>

            {/* Info Side */}
            <div className="space-y-8 lg:pt-4">
                {/* Description - Expanded */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <h3 className={`text-3xl font-bold mb-6 ${activeSeason.textColor} flex items-center gap-3`}>
                        {activeSeason.name} <span className="text-lg text-slate-300 font-normal">/ 深度導覽</span>
                    </h3>
                    
                    {/* Render Full HTML Content */}
                    <div 
                        className="text-slate-600 text-lg leading-loose font-light prose prose-slate max-w-none"
                        dangerouslySetInnerHTML={{ __html: activeSeason.fullContent }}
                    />
                </div>

                {/* Practical Info Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-3 mb-3 text-slate-400">
                            <Thermometer /> <span className="font-bold text-sm">平均氣溫</span>
                        </div>
                        <p className="text-slate-800 font-medium">{activeSeason.weather}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-3 mb-3 text-slate-400">
                            <Shirt /> <span className="font-bold text-sm">穿搭建議</span>
                        </div>
                        <p className="text-slate-800 font-medium">{activeSeason.wear}</p>
                    </div>
                </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Seasons
