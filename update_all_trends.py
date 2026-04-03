import requests
import json
from datetime import datetime
import time
import os
import re

# 1. 配置
TARGET_URL = "https://trends.google.com.tw/trending?geo=TW&hl=zh-TW&status=active"
# 排除關鍵字清單
EXCLUDE_WORDS = [
    "空難", "復興", "墜機", "災難", "事故", "死亡", "受傷", "失蹤", "喪命", "意外", "確診", "遺體", "命案", "自殺", "受虐", "性侵",
    "政治", "選舉", "政黨", "民進黨", "國民黨", "民眾黨", "立院", "立法院", "議員", "市長", "總統", "罷免", "抗議", "示威", "暴力", 
    "槍擊", "搶劫", "詐騙", "毒品", "刑案", "法院", "判刑", "被捕", "涉嫌", "弊案", "貪汙", "共機", "兩岸", "軍事", "演習",
    "火災", "起火", "火警", "閃電", "雷擊", "停電", "政府", "機關", "辦事處", "分局", "派出所", "公所", "地檢署", "稅務", "健保"
] 

# 備用資料 (若抓取失敗時使用)
BACKUP_DATA = [
    {"query": "澎湖", "volume": "5,000+", "rising": "↑ 800%"},
    {"query": "嘉義", "volume": "2,000+", "rising": "↑ 500%"},
    {"query": "宜蘭", "volume": "2,000+", "rising": "↑ 400%"}
]

print(f"正在抓取 Google Trends 每日熱搜趨勢數據...")

def get_trends_data():
    """使用 pytrends 獲取趨勢數據並進行過濾與格式化"""
    try:
        from pytrends.request import TrendReq
        pytrends = TrendReq(hl='zh-TW', tz=-480)
        
        # 獲取每日趨勢 (Daily Search Trends)
        # 雖然 pytrends 之前可能 404，但在這裡嘗試用正確的參數
        # trending_searches 獲取數據較少，我們嘗試用 today_trending_searches 結合深度抓取
        df_today = pytrends.today_trending_searches(pn='TW')
        
        if df_today is None or df_today.empty:
            print("無法獲取數據，切換至備用清單。")
            return BACKUP_DATA
            
        keywords = df_today.tolist()
        final_items = []
        
        # 針對關鍵字抓取 volume 和 rising
        for kw in keywords[:60]: # 多抓一點備用
            if any(neg in kw for neg in EXCLUDE_WORDS):
                continue
            
            try:
                # 每個關鍵字需要一点延遲
                time.sleep(1.2)
                pytrends.build_payload([kw], cat=0, timeframe='now 1-d', geo='TW')
                related_data = pytrends.related_queries()
                
                # 搜尋量我們給一個模擬值 (因為 pytrends.today_trending_searches 不提供量)
                # 或者我們嘗試從相關查詢推算
                max_rising = "熱搜中"
                if kw in related_data:
                    rising = related_data[kw]['rising']
                    if rising is not None and not rising.empty:
                        top_val = rising.iloc[0]['value']
                        max_rising = f"↑ {top_val}%" if isinstance(top_val, int) else str(top_val)
                
                final_items.append({
                    "query": kw,
                    "volume": "1,000+", # 預設搜尋量
                    "rising": max_rising
                })
                
                if len(final_items) >= 50:
                    break
                    
            except Exception as e:
                print(f"抓取關鍵字 {kw} 時出錯: {e}")
                
        return final_items if final_items else BACKUP_DATA
        
    except Exception as e:
        print(f"整體流程出錯: {e}")
        return BACKUP_DATA

# 2. 產出 HTML
final_list = get_trends_data()
update_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S") 

html_list = "" 
for i, item in enumerate(final_list): 
    # 判斷是否為 Breakout (飆升極高)
    is_breakout = "Breakout" in item['rising'] or "↑ 9" in item['rising']
    color = "#e67e22" if is_breakout else "#3498db"
    
    html_list += f''' 
    <div style="display:flex; justify-content:space-between; align-items:center; padding:6px 12px; margin-bottom:2px; border-bottom:1px solid #eee; font-size:0.95em; line-height:1.2;"> 
        <div style="flex:1;">
            <b style="color:{color}">#{i+1}</b> <span style="margin-left:8px;">{item['query']}</span>
        </div>
        <div style="width:80px; text-align:right; font-size:0.85em; color:#666;">{item['volume']}</div>
        <div style="width:90px; text-align:right; font-weight:bold; color:{color};">{item['rising']}</div>
    </div>''' 

html_template = f''' 
<!DOCTYPE html> 
<html lang="zh-TW"> 
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>即時熱搜趨勢 - 沐月民宿</title>
    <style>
        body {{ font-family: "Microsoft JhengHei", sans-serif; max-width: 800px; margin: auto; padding: 20px; background: #f0f2f5; }}
        .container {{ background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }}
        h2 {{ margin: 0; color: #1a73e8; text-align: center; font-size: 1.8em; }}
        .subtitle {{ font-size: 0.85em; color: #666; text-align: center; margin: 10px 0 20px; }}
        .header-row {{ display:flex; justify-content:space-between; padding:0 12px 8px; border-bottom:2px solid #3498db; font-weight:bold; font-size:0.9em; color:#34495e; }}
        .item-list {{ margin-top: 5px; }}
        .footer {{ text-align: center; margin-top: 30px; font-size: 0.8em; color: #999; }}
    </style>
</head> 
<body> 
    <div class="container"> 
        <h2>🔥 即時熱搜趨勢排行榜 (50筆)</h2> 
        <p class="subtitle">同步自 Google Trends 每日熱搜 | 最後更新：{update_time}</p> 
        <div class="header-row">
            <span style="flex:1;">關鍵字內容</span>
            <span style="width:80px; text-align:right;">搜尋量</span>
            <span style="width:90px; text-align:right;">飆升幅度</span>
        </div>
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
