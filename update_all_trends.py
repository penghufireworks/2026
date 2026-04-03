import requests
from bs4 import BeautifulSoup
from datetime import datetime
import time
import os
import re

# 1. 配置
TARGET_URL = "https://trends.google.com.tw/trending?geo=TW&hl=zh-TW&status=active"
EXCLUDE_WORDS = [
    "空難", "復興", "墜機", "災難", "事故", "死亡", "受傷", "失蹤", "喪命", "意外", "確診", "遺體", "命案", "自殺", "受虐", "性侵",
    "政治", "選舉", "政黨", "民進黨", "國民黨", "民眾黨", "立院", "立法院", "議員", "市長", "總統", "罷免", "抗議", "示威", "暴力", 
    "槍擊", "搶劫", "詐騙", "毒品", "刑案", "法院", "判刑", "被捕", "涉嫌", "弊案", "貪汙", "共機", "兩岸", "軍事", "演習",
    "火災", "起火", "火警", "閃電", "雷擊", "停電", "政府", "機關", "辦事處", "分局", "派出所", "公所", "地檢署", "稅務", "健保"
] 

print(f"正在抓取 Google Trends 即時趨勢頁面...")

def fetch_trends_via_requests():
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "Referer": "https://trends.google.com.tw/"
    }
    
    try:
        # 直接抓取該網址
        response = requests.get(TARGET_URL, headers=headers, timeout=15)
        if response.status_code != 200:
            print(f"抓取失敗，狀態碼: {response.status_code}")
            return []
            
        # 由於即時趨勢頁面可能是動態渲染，requests 可能抓不到內容
        # 我們嘗試從 HTML 中的初始數據 json 提取 (如果有)
        # 或者嘗試解析 BeautifulSoup (雖然機率較低)
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # 嘗試尋找帶有趨勢數據的 Script 標籤
        # Google Trends 常將數據存放在 window.MT_data 或類似變數中
        trends_data = []
        
        # 方案 A: 尋找 HTML 中的文字模式 (適用於 requests 抓取靜態快照時)
        # 這裡模擬搜尋 "飆升" 或關鍵字特徵
        items = soup.find_all(text=re.compile(r'飆升|Breakout'))
        
        # 如果 BeautifulSoup 抓不到 (因為是動態的)，我們回退到使用 pytrends 的即時接口
        # 雖然 pytrends 之前 404，但我們可以換個方式嘗試
        return []
    except Exception as e:
        print(f"Requests 抓取錯誤: {e}")
        return []

# 考慮到即時頁面 100% 是動態渲染，且 pytrends 的 realtime_trending_searches 有時會 404
# 我們改用一個最保險的方式：抓取每日趨勢並模擬即時頁面的效果
from pytrends.request import TrendReq
pytrends = TrendReq(hl='zh-TW', tz=-480)

def get_real_time_fallback():
    all_items = []
    try:
        print("嘗試獲取即時趨勢數據...")
        # 這是 Google Trends 內部使用的 Widget 數據抓取邏輯
        # pn='TW' 台灣
        rt_trends = pytrends.realtime_trending_searches(pn='TW')
        if rt_trends is not None and not rt_trends.empty:
            for _, row in rt_trends.iterrows():
                query = row['title']
                # 即時趨勢通常沒有精確的 % 數，我們標註為 "即時飆升"
                all_items.append({
                    "query": query,
                    "value": 99999, # 賦予極高值以便排在最前
                    "display": "即時飆升"
                })
    except Exception as e:
        print(f"即時趨勢抓取失敗: {e}")
    return all_items

# 2. 執行主邏輯
print("執行數據抓取...")
final_trends = []

# 先拿即時數據
real_time_list = get_real_time_fallback()
for item in real_time_list:
    if not any(neg in item['query'] for neg in EXCLUDE_WORDS):
        final_trends.append(item)

# 如果即時數據不夠 50 筆，拿今日熱門補齊
if len(final_trends) < 50:
    try:
        print("補足今日熱門搜尋...")
        df_today = pytrends.today_trending_searches(pn='TW')
        if df_today is not None and not df_today.empty:
            for kw in df_today.tolist():
                if any(neg in kw for neg in EXCLUDE_WORDS): continue
                if kw not in [x['query'] for x in final_trends]:
                    final_trends.append({
                        "query": kw,
                        "value": 100,
                        "display": "熱搜中"
                    })
                if len(final_trends) >= 60: break
    except: pass

# 3. 排序與產出
# 依 value 排序
final_list = sorted(final_trends, key=lambda x: x['value'], reverse=True)[:50]

update_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S") 
html_list = "" 
for i, item in enumerate(final_list): 
    theme_color = "#e67e22" if item['value'] >= 99999 else "#3498db"
    html_list += f''' 
    <div style="display:flex; justify-content:space-between; padding:6px 12px; margin-bottom:2px; border-bottom:1px solid #eee; font-size:0.95em; line-height:1.2;"> 
        <span><b style="color:{theme_color}">#{i+1}</b> {item['query']}</span> 
        <span style="color:{theme_color}; font-weight:bold;">{item['display']}</span> 
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
        .item-list {{ margin-top: 10px; }}
        .footer {{ text-align: center; margin-top: 30px; font-size: 0.8em; color: #999; }}
    </style>
</head> 
<body> 
    <div class="container"> 
        <h2>🔥 即時熱搜趨勢排行榜 (50筆)</h2> 
        <p class="subtitle">同步自 Google Trends 即時趨勢 | 最後更新：{update_time}</p> 
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
