import pandas as pd 
from pytrends.request import TrendReq 
from datetime import datetime 
import time 
import os

# 1. 配置與初始化 
# hl='zh-TW' 繁體中文, tz=-480 台北時區
pytrends = TrendReq(hl='zh-TW', tz=-480) 

# 負面/政治/行政過濾清單
EXCLUDE_WORDS = [
    "空難", "復興", "墜機", "災難", "事故", "死亡", "受傷", "失蹤", "喪命", "意外", "確診", "遺體", "命案", "自殺", "受虐", "性侵",
    "政治", "選舉", "政黨", "民進黨", "國民黨", "民眾黨", "立院", "立法院", "議員", "市長", "總統", "罷免", "抗議", "示威", "暴力", 
    "槍擊", "搶劫", "詐騙", "毒品", "刑案", "法院", "判刑", "被捕", "涉嫌", "弊案", "貪汙", "共機", "兩岸", "軍事", "演習",
    "火災", "起火", "火警", "閃電", "雷擊", "停電", "政府", "機關", "辦事處", "分局", "派出所", "公所", "地檢署", "稅務", "健保"
] 

# 備用關鍵字 (API 全失效時使用)
BACKUP_DATA = ["澎湖旅遊", "澎湖花火節", "澎湖美食", "澎湖景點", "澎湖民宿"]

print(f"正在抓取 Google Trends 台灣今日熱門搜尋...") 

final_keywords = []

try:
    # 策略 1: 直接抓取每日熱門搜尋 (Daily Search Trends)
    # pn='taiwan' 是 Google Trends 頁面 https://trends.google.com/trending?geo=TW 的數據來源
    df_trending = pytrends.trending_searches(pn='taiwan')
    
    if df_trending is not None and not df_trending.empty:
        all_keywords = df_trending[0].tolist()
        print(f"成功獲取 {len(all_keywords)} 筆熱搜關鍵字。")
        
        # 進行過濾
        for kw in all_keywords:
            if any(neg in kw for neg in EXCLUDE_WORDS):
                continue
            final_keywords.append(kw)
            if len(final_keywords) >= 50:
                break
    else:
        print("無法取得數據，切換至備援策略...")
        # 策略 2: 嘗試即時趨勢接口
        rt_trends = pytrends.realtime_trending_searches(pn='TW')
        if rt_trends is not None and not rt_trends.empty:
            for _, row in rt_trends.iterrows():
                query = row['title']
                if any(neg in query for neg in EXCLUDE_WORDS): continue
                final_keywords.append(query)
                if len(final_keywords) >= 50: break

except Exception as e:
    print(f"抓取流程失敗: {e}")

# 如果最終還是沒數據，使用備用
if not final_keywords:
    final_keywords = BACKUP_DATA

# 2. 生成 HTML 內容
update_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S") 
html_list = "" 
for i, kw in enumerate(final_keywords): 
    # 單純顯示排名與關鍵字，緊湊排版
    html_list += f''' 
    <div style="display:flex; align-items:center; padding:4px 12px; border-bottom:1px solid #eee; font-size:1em; line-height:1.2; margin-bottom:1px;"> 
        <b style="color:#e67e22; width:40px; font-size:0.9em;">#{i+1}</b> 
        <span style="color:#2c3e50; font-weight:500;">{kw}</span> 
    </div>''' 

html_template = f''' 
<!DOCTYPE html> 
<html lang="zh-TW"> 
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>台灣熱門搜尋趨勢 - 沐月民宿</title>
    <style>
        body {{ font-family: "Microsoft JhengHei", sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #f0f2f5; }}
        .container {{ background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); }}
        h2 {{ margin: 0; color: #1a73e8; text-align: center; font-size: 1.6em; }}
        .subtitle {{ font-size: 0.85em; color: #888; text-align: center; margin: 8px 0 15px; }}
        .item-list {{ margin-top: 5px; }}
        .footer {{ text-align: center; margin-top: 25px; font-size: 0.75em; color: #bbb; }}
    </style>
</head> 
<body> 
    <div class="container"> 
        <h2>🔥 台灣今日熱門搜尋</h2> 
        <p class="subtitle">同步自 Google Trends | 最後更新：{update_time}</p> 
        <div class="item-list">
            {html_list} 
        </div>
    </div> 
    <div class="footer">
        <p>© 2026 沐月民宿 Moonlight Villa - 數據來源: Google Trends</p>
    </div>
</body> 
</html>''' 

with open("googletrendforall.html", "w", encoding="utf-8") as f: 
    f.write(html_template)
print(f"✅ googletrendforall.html 產出成功！共 {len(final_keywords)} 筆。") 
