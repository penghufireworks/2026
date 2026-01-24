import React from 'react'
import { Helmet } from 'react-helmet-async'

const defaultKeywords = [
  "澎湖花火節2026", "澎湖花火節dcard", "澎湖花火節值得去嗎ptt", "澎湖花火節郵輪", "澎湖花火節怎麼玩", 
  "澎湖花火節日期", "澎湖花火節放多久", "澎湖花火節英文", "2026花火節日期", "澎湖花火節2026旅行社", 
  "澎湖花火節2026時間", "澎湖花火節2026機票", "澎湖花火節2026主題", "澎湖花火節官網", "澎湖花火節節目表",
  "澎湖民宿推薦dcard", "澎湖民宿推薦ptt", "澎湖民宿包棟", "澎湖民宿推薦", "澎湖民宿排名", 
  "澎湖民宿套裝行程", "澎湖民宿親子", "澎湖民宿平價", "澎湖民宿villa", "澎湖海景民宿", 
  "澎湖馬公民宿推薦", "澎湖馬公市區民宿", "澎湖市區民宿推薦", "澎湖cp值高民宿", "澎湖馬公住宿", 
  "澎湖民宿推薦6人房", "澎湖民宿推薦包棟", "澎湖旅遊三天兩夜", "澎湖旅遊四天三夜", "澎湖旅遊跟團", 
  "澎湖旅遊套裝", "澎湖旅遊三天兩夜價格", "澎湖旅遊船票", "澎湖觀光局", "澎湖旅遊月份", 
  "澎湖旅遊三天兩夜費用", "澎湖旅遊三天兩夜自由行", "澎湖三天兩夜套裝行程", "澎湖三天兩夜雄獅", 
  "可樂旅遊澎湖三天兩夜", "澎湖4天3夜套裝行程", "澎湖三天兩夜機加酒", "澎湖行程四天三夜", 
  "澎湖4天3夜費用", "澎湖四天三夜旅行社", "澎湖四天三夜跟團", "澎湖4天3夜機加酒", 
  "澎湖四天三夜雄獅", "澎湖4天3夜親子", "澎湖四天三夜跳島"
].join(", ");

const SEO = ({ title, description, keywords }) => {
  const siteTitle = "沐月民宿 Moonlight Villa | 澎湖包棟首選";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const metaDesc = description || "2026澎湖花火節住宿首選，提供6-12人包棟、親子友善設施、機場接送與代訂行程服務。Google 4.9星好評，讓您享受最放鬆的菊島假期。";
  const metaKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta name="keywords" content={metaKeywords} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:type" content="website" />
    </Helmet>
  )
}

export default SEO
