import pandas as pd 
from pytrends.request import TrendReq 
from datetime import datetime 
import time 
import os

# 1. 配置與初始化 
pytrends = TrendReq(hl='zh-TW', tz=-480) 

# 監測關鍵字清單 (涵蓋台灣主要旅遊、美食、生活與熱門話題)
KEYWORDS = [
    "澎湖", "嘉義", "宜蘭", "花蓮", "台東", "台北", "台中", "台南", "高雄", "屏東", 
    "南投", "桃園", "新竹", "苗栗", "彰化", "雲林", "基隆", "金門", "馬祖", "小琉球",
    "旅遊", "住宿", "美食", "飯店", "景點", "機票", "船票", "民宿", "連假",
    "火車", "租車", "夜市", "特產", "伴手禮", "下午茶", "景觀餐廳", "露營",
    "咖啡廳", "早午餐", "火鍋", "壽司", "燒肉", "拉麵", "甜點", "手搖飲"
]

# 嘗試抓取即時趨勢話題並加入監測清單
try:
    print("正在抓取台灣即時趨勢話題...")
    # realtime_trending_searches 獲取即時話題 (pn='TW' 為台灣)
    rt_trends = pytrends.realtime_trending_searches(pn='TW')
    if rt_trends is not None and not rt_trends.empty:
        # 取得前 10 個熱門話題加入關鍵字清單
        top_titles = rt_trends['title'].head(10).tolist()
        KEYWORDS.extend(top_titles)
        print(f"已加入即時趨勢話題: {top_titles}")
except Exception as e:
    print(f"抓取即時趨勢話題失敗 (跳過): {e}")

EXCLUDE_WORDS = ["空難", "復興", "墜機", "災難", "事故", "死亡", "受傷", "失蹤", "喪命", "意外", "確診", "遺體", "命案", "自殺", "受虐", "性侵"] 

print(f"正在執行全台熱搜趨勢抓取 (50筆，依飆升排序)...") 

all_rising_items = {} # 使用 dict 避免重複，key 是 query

for kw in KEYWORDS:
    try:
        print(f"正在抓取關鍵字: {kw} ...")
        pytrends.build_payload([kw], cat=0, timeframe='now 1-d', geo='TW') 
        related_data = pytrends.related_queries() 
        
        if kw in related_data: 
            rising = related_data[kw]['rising'] 
            if rising is not None and not rising.empty: 
                for _, row in rising.iterrows(): 
                    query = row['query']
                    value = row['value'] # 數值，如 1500
                    
                    # 過濾與去重
                    if not any(neg in query for neg in EXCLUDE_WORDS):
                        if query not in all_rising_items or value > all_rising_items[query]['value']:
                            all_rising_items[query] = {
                                "query": query,
                                "value": value,
                                "type": "竄升"
                            }
        # 增加延遲避免被封
        time.sleep(1)
    except Exception as e:
        print(f"抓取關鍵字 {kw} 時出錯: {e}")
        time.sleep(5) # 出錯時等久一點

# 2. 排序與取前 50 筆
# 依 value (飆升百分比) 從大到小排序
sorted_items = sorted(all_rising_items.values(), key=lambda x: x['value'], reverse=True)
final_list = sorted_items[:50]

# 3. 生成 HTML 內容
update_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S") 
html_list = "" 
for i, item in enumerate(final_list): 
    # 格式化顯示
    val_display = f"飆升 {item['value']}%" if isinstance(item['value'], int) else item['value']
    html_list += f''' 
    <div style="display:flex; justify-content:space-between; padding:12px; margin-bottom:6px; border-bottom:1px solid #eee; font-size:1em;"> 
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
