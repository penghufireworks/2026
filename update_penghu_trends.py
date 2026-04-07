import pandas as pd 
from pytrends.request import TrendReq 
from datetime import datetime 
import time 
import random

# 1. 配置與初始化 
pytrends = TrendReq(hl='zh-TW', tz=-480, timeout=(10,25)) 

TOPIC_ID = "澎湖" 
EXCLUDE_WORDS = ["空難", "復興", "墜機", "災難", "事故", "死亡", "受傷", "失蹤", "喪命", "意外", "確診", "遺體", "命案", "自殺"] 

# 備援資料 (Mock Data) - 當 Google 封鎖 IP 時顯示這些熱門關鍵字
MOCK_DATA = [
    {"query": "澎湖花火節 2026", "value": "飆升 5000%+", "type": "竄升"},
    {"query": "澎湖摩西分海 潮汐表", "value": "飆升 1200%", "type": "竄升"},
    {"query": "澎湖租車 推薦", "value": "熱度: 98", "type": "熱門"},
    {"query": "澎湖必吃美食", "value": "熱度: 95", "type": "熱門"},
    {"query": "澎湖民宿 包棟", "value": "熱度: 92", "type": "熱門"},
    {"query": "澎湖三仙塔 拍照", "value": "飆升 800%", "type": "竄升"},
    {"query": "澎湖跳島 行程", "value": "熱度: 88", "type": "熱門"},
    {"query": "澎湖天氣 預報", "value": "熱度: 85", "type": "熱門"},
    {"query": "澎湖名產 伴手禮", "value": "熱度: 82", "type": "熱門"},
    {"query": "澎湖自由行 攻略", "value": "熱度: 80", "type": "熱門"}
]

print(f"正在執行 GitHub 雲端抓取：{TOPIC_ID} 24 小時趨勢...") 

final_list = []
source_info = "Google Trends 即時數據"

try: 
    # 2. 執行抓取 (加入隨機延遲避免被鎖)
    time.sleep(random.uniform(1, 3))
    pytrends.build_payload([TOPIC_ID], cat=0, timeframe='now 1-d', geo='TW') 
    related_data = pytrends.related_queries() 
    
    if TOPIC_ID not in related_data: 
        raise ValueError("無法取得相關數據") 

    rising = related_data[TOPIC_ID]['rising'] 
    top = related_data[TOPIC_ID]['top'] 

    def is_safe(query): 
        return not any(neg in query for neg in EXCLUDE_WORDS) 

    # 處理數據 
    if rising is not None and not rising.empty: 
        for _, row in rising.iterrows(): 
            if is_safe(row['query']): 
                final_list.append({"query": row['query'], "value": f"飆升 {row['value']}%", "type": "竄升"}) 
            
    if top is not None and not top.empty: 
        for _, row in top.iterrows(): 
            if is_safe(row['query']) and row['query'] not in [item['query'] for item in final_list]: 
                final_list.append({"query": row['query'], "value": f"熱度: {row['value']}", "type": "熱門"}) 

    # 如果抓到資料太少，也補一點 Mock 資料
    if len(final_list) < 3:
        raise ValueError("數據不足，切換至備援模式")

except Exception as e: 
    print(f"⚠️ 抓取失敗 ({e})，切換至穩定備援模式...") 
    final_list = MOCK_DATA
    source_info = "系統推薦趨勢 (備援模式)"

# 3. 生成 HTML 內容 (優化排版) 
update_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S") 
html_list = "" 
for i, item in enumerate(final_list[:50]): # 最多 50 筆
    theme_color = "#e67e22" if item['type'] == "竄升" else "#3498db" 
    html_list += f''' 
    <div style="display:flex; justify-content:space-between; padding:8px; margin-bottom:4px; border-bottom:1px solid #eee; font-size:0.9em;"> 
        <span><b style="color:{theme_color}">#{i+1}</b> {item['query']}</span> 
        <span style="color:{theme_color}; font-size:0.8em;">{item['value']}</span> 
    </div>''' 

html_template = f''' 
<!DOCTYPE html> 
<html lang="zh-TW"> 
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>澎湖趨勢</title></head> 
<body style="font-family:sans-serif; max-width:600px; margin:auto; padding:10px; background:#f9f9f9;"> 
    <div style="background:white; padding:15px; border-radius:10px; box-shadow:0 2px 5px rgba(0,0,0,0.1);"> 
        <h2 style="margin:0; color:#2c3e50; text-align:center;">🏝️ 澎湖即時熱搜趨勢 (24H)</h2> 
        <p style="font-size:0.75em; color:#999; text-align:center; margin-bottom:15px;">最後更新：{update_time}<br><span style="color:#e74c3c;">來源：{source_info}</span></p> 
        {html_list if html_list else "<p style='text-align:center;'>暫無符合的趨勢數據</p>"} 
    </div> 
</body> 
</html>''' 

try:
    with open("googletrend.html", "w", encoding="utf-8") as f: 
        f.write(html_template) 
    print(f"✅ googletrend.html 產出成功！(來源: {source_info})") 
except Exception as e:
    print(f"❌ 寫入失敗: {e}")