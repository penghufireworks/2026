import pandas as pd 
from pytrends.request import TrendReq 
from datetime import datetime 
import time 
import random

# 1. 配置與初始化 
pytrends = TrendReq(hl='zh-TW', tz=-480, timeout=(10,25)) 

TOPIC_ID = "澎湖" 
EXCLUDE_WORDS = [
    "海慶澎湖海鮮", "澎湖海洋渡假村", "澎湖縣議會", "澎湖航空站", "澎湖房價",
    "國立澎湖科技大學", "澎湖海軍醫院", "澎湖冰花菜", "澎湖日報", "海村澎湖活海鮮餐廳",
    "澎湖冰花吃法", "澎湖三總掛號", "海九澎湖海鮮餐廳", "鹹水煙澎湖特色餐廳",
    "澎湖福朋喜來登酒店", "澎湖和田大飯店", "澎湖地方法院", "食尚玩家瘋狂總部澎湖",
    "三軍總醫院澎湖分院", "澎湖監理站", "澎湖絲瓜", "澎湖海事", "澎湖安一海景大飯店",
    "澎湖喜來登自助餐", "澎湖社區大學", "澎湖圖書館", "澎湖醫院看診進度", "澎湖漁船",
    "小琉球船票", "澎湖雅霖大飯店", "澎湖監獄", "澎湖綠的旅店", "好蟳屋澎湖海產專賣店",
    "三總", "三軍總醫院", "看診進度", "掛號", "分院", "醫院", "衛生局", "教育處", "縣政府",
    "郵遞區號", "火燒船", "火災", "事故", "命案", "自殺", "墜機", "空難", "確診"
] 

print(f"正在執行 GitHub 雲端抓取：{TOPIC_ID} 24 小時趨勢...") 

final_list = []
error_msg = ""

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
        # 移除關鍵字與排除字的所有空格後再進行比對，確保過濾效果
        q_clean = query.replace(" ", "")
        return not any(ex.replace(" ", "") in q_clean for ex in EXCLUDE_WORDS) 

    # 處理數據 
    if rising is not None and not rising.empty: 
        for _, row in rising.iterrows(): 
            if is_safe(row['query']): 
                final_list.append({"query": row['query'], "value": f"飆升 {row['value']}%", "type": "竄升"}) 
            
    if top is not None and not top.empty: 
        for _, row in top.iterrows(): 
            if is_safe(row['query']) and row['query'] not in [item['query'] for item in final_list]: 
                final_list.append({"query": row['query'], "value": f"熱度: {row['value']}", "type": "熱門"}) 

except Exception as e: 
    print(f"❌ 抓取失敗: {e}") 
    error_msg = f"⚠️ 數據抓取失敗: {str(e)}"

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

content_display = html_list if html_list else f"<p style='text-align:center; padding:20px; color:#666;'>{error_msg if error_msg else '暫無符合的趨勢數據'}</p>"

html_template = f''' 
<!DOCTYPE html> 
<html lang="zh-TW"> 
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>澎湖趨勢</title></head> 
<body style="font-family:sans-serif; max-width:600px; margin:auto; padding:10px; background:#f9f9f9;"> 
    <div style="background:white; padding:15px; border-radius:10px; box-shadow:0 2px 5px rgba(0,0,0,0.1);"> 
        <h2 style="margin:0; color:#2c3e50; text-align:center;">🏝️ 澎湖即時熱搜趨勢 (24H)</h2> 
        <p style="font-size:0.75em; color:#999; text-align:center; margin-bottom:15px;">最後更新：{update_time}</p> 
        {content_display}
    </div> 
</body> 
</html>''' 

try:
    with open("googletrend.html", "w", encoding="utf-8") as f: 
        f.write(html_template) 
    print(f"✅ googletrend.html 產出成功！") 
except Exception as e:
    print(f"❌ 寫入失敗: {e}")