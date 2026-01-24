import React from 'react'
import { Star, Quote } from 'lucide-react'

const reviews = [
  {
    id: 1,
    name: "陳小姐",
    date: "2025/06/15",
    rating: 5,
    text: "管家超級貼心！我們一家老小 10 個人包棟，空間非常大，小孩在客廳跑跳很安全。還幫我們代訂了很難買的二信飯糰當早餐，真的太感動了！下次一定再來。",
    tag: "家庭包棟"
  },
  {
    id: 2,
    name: "Jason Wu",
    date: "2025/05/20",
    rating: 5,
    text: "離花火節觀音亭很近，騎車一下子就到了。房間乾淨整潔，床很好睡。最棒的是民宿有提供機場接送，對我們這種沒租車的人來說很方便。",
    tag: "情侶出遊"
  },
  {
    id: 3,
    name: "林同學",
    date: "2025/07/02",
    rating: 5,
    text: "畢業旅行選這裡真的選對了！晚上大家在客廳一起吃宵夜聊天，完全不用擔心吵到別人。老闆還推薦了很多在地人才知道的隱藏版美食，大推！",
    tag: "學生團體"
  },
  {
    id: 4,
    name: "王先生",
    date: "2025/04/10",
    rating: 5,
    text: "住過很多澎湖民宿，沐月的服務真的是數一數二。不只幫忙規劃行程，連我們想去離島的船票都幫忙搞定。有一種回到家的感覺。",
    tag: "家族旅遊"
  }
]

const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            聽聽住客怎麼說
          </h2>
          <div className="flex justify-center items-center gap-2 mb-2">
            <div className="flex text-yellow-400">
                <Star className="fill-yellow-400" size={24} />
                <Star className="fill-yellow-400" size={24} />
                <Star className="fill-yellow-400" size={24} />
                <Star className="fill-yellow-400" size={24} />
                <Star className="fill-yellow-400" size={24} />
            </div>
            <span className="text-xl font-bold text-slate-700">4.9 / 5.0</span>
          </div>
          <p className="text-slate-500">Google 商家真實好評，超過 500 組旅客的共同推薦</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 relative hover:shadow-lg transition-shadow">
              <Quote className="absolute top-4 right-4 text-slate-200" size={40} />
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-ocean-blue/20 rounded-full flex items-center justify-center text-ocean-blue font-bold">
                    {review.name[0]}
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 text-sm">{review.name}</h4>
                    <span className="text-xs text-slate-400">{review.date}</span>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-3">
                {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} className="fill-yellow-400" />)}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 min-h-[80px]">
                {review.text}
              </p>
              <span className="inline-block bg-white border border-slate-200 text-xs px-2 py-1 rounded text-slate-500">
                #{review.tag}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
            <a 
                href="https://www.google.com/maps" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-ocean-blue font-bold hover:underline"
            >
                查看更多 Google 評論 →
            </a>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
