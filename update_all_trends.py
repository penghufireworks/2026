import pandas as pd 
from pytrends.request import TrendReq 
from datetime import datetime 
import time 
import os

# 1. 配置與初始化 
pytrends = TrendReq(hl='zh-TW', tz=-480) 

EXCLUDE_WORDS = [
    "空難", "復興", "墜機", "災難", "事故", "死亡", "受傷", "失蹤", "喪命", "意外", "確診", "遺體", "命案", "自殺", "受虐", "性侵",
    "政治", "選舉", "政黨", "民進黨", "國民黨", "民眾黨", "立院", "立法院", "議員", "市長", "總統", "罷免", "抗議", "示威", "暴力", 
    "槍擊", "搶劫", "詐騙", "毒品", "刑案", "法院", "判刑", "被捕", "涉嫌", "弊案", "貪汙", "共機", "兩岸", "軍事", "演習",
    "火災", "起火", "火警", "閃電", "雷擊", "停電", "政府", "機關", "辦事處", "分局", "派出所", "公所", "地檢署", "稅務", "健保"
] 

# 備用關鍵字 (若每日熱搜抓取失敗時使用)
BACKUP_KEYWORDS = [
    "澎湖", "嘉義", "宜蘭", "花蓮", "台東", "台北", "台中", "台南", "高雄", "屏東", 
    "旅遊", "住宿", "美食", "飯店", "景點", "機票", "船票", "民宿", "連假", "露營"
]

print(f"正在執行全台每日熱搜趨勢抓取 (50筆，依飆升排序)...") 

all_trending_items = []

try:
    # 使用 today_trending_searches 取代 trending_searches 以避免 404 錯誤
    print("正在抓取台灣今日熱門搜尋...")
    df_trending = None
    try:
        df_trending = pytrends.today_trending_searches(pn='TW')
    except Exception as e:
        print(f"today_trending_searches 失敗: {e}")

    if df_trending is not None and not df_trending.empty:
        keywords = df_trending.tolist()
        print(f"成功抓取 {len(keywords)} 筆今日熱門搜尋關鍵字。")
    else:
        print("無法取得每日熱門搜尋數據，切換至備用關鍵字清單。")
        keywords = BACKUP_KEYWORDS
        
    # 針對關鍵字進行深度抓取以獲取「飆升」數據
    for kw in keywords[:60]:
        if any(neg in kw for neg in EXCLUDE_WORDS):
            continue
            
        try:
            print(f"正在分析趨勢: {kw} ...")
            pytrends.build_payload([kw], cat=0, timeframe='now 1-d', geo='TW')
            related_data = pytrends.related_queries()
            
            max_rising_val = 0
            if kw in related_data:
                rising = related_data[kw]['rising']
                if rising is not None and not rising.empty:
                    for _, row in rising.iterrows():
                        val = row['value']
                        if val == 'Breakout':
                            val = 99999
                        if isinstance(val, int) and val > max_rising_val:
                            max_rising_val = val
            
            if max_rising_val == 0:
                max_rising_val = 100 
            
            all_trending_items.append({
                "query": kw,
                "value": max_rising_val,
                "type": "竄升"
            })
            
            time.sleep(1.5) # 稍微增加延遲
            
            if len(all_trending_items) >= 50:
                break
        except Exception as e:
            print(f"分析 {kw} 時出錯: {e}")
            time.sleep(5)
            
except Exception as e:
    print(f"抓取流程整體失敗: {e}")

# 2. 排序與取前 50 筆
sorted_items = sorted(all_trending_items, key=lambda x: x['value'], reverse=True)
final_list = sorted_items[:50]

# 3. 生成 HTML 內容
update_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S") 
html_list = "" 
for i, item in enumerate(final_list): 
    val_display = "Breakout" if item['value'] == 99999 else (f"飆升 {item['value']}%" if item['value'] > 100 else "熱搜中")
    html_list += f''' 
    <div style="display:flex; justify-content:space-between; padding:6px 12px; margin-bottom:2px; border-bottom:1px solid #eee; font-size:0.95em; line-height:1.2;"> 
        <span><b style="color:#e67e22">#{i+1}</b> {item['query']}</span> 
        <span style="color:#e67e22; font-weight:bold;">{val_display}</span> 
    </div>''' 

html_template = f''' 
<!DOCTYPE html> 
<html lang="zh-TW"> 
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>全台熱搜趨勢排行榜 - 沐月民宿</title>
    <style>
        body {{ font-family: "Microsoft JhengHei", sans-serif; max-width: 800px; margin: auto; padding: 20px; background: #f0f2f5; }}
        .container {{ background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }}
        h2 {{ margin: 0; color: #1a73e8; text-align: center; font-size: 1.8em; }}
        .subtitle {{ font-size: 0.85em; color: #666; text-align: center; margin: 10px 0 20px; }}
        .item-list {{ margin-top: 10px; }}
        .footer {{ text-align: center; margin-top: 30px; font-size: 0.8em; color: #999; }}
    </style>
</head> 
<body> 
    <div class="container"> 
        <h2>🔥 全台熱搜趨勢排行榜 (50筆)</h2> 
        <p class="subtitle">依搜尋飆升幅度排序 (24H內) | 最後更新：{update_time}</p> 
        <div class="item-list">
            {html_list if html_list else "<p style='text-align:center;'>目前無符合的趨勢數據，請稍後再試。</p>"} 
        </div>
    </div> 
    <div class="footer">
        <p>© 2026 沐月民宿 Moonlight Villa - 數據來源: Google Trends</p>
    </div>
</body> 
</html>''' 

try:
    with open("googletrendforall.html", "w", encoding="utf-8") as f: 
        f.write(html_template) 
    print(f"✅ googletrendforall.html 產出成功！共 {len(final_list)} 筆。") 
except Exception as e:
    print(f"❌ 寫入 HTML 失敗: {e}")
