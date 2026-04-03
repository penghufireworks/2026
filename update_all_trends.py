import pandas as pd 
from pytrends.request import TrendReq 
from datetime import datetime 
import time 
import random
import os

# 1. 配置與初始化：加入 retries (重試) 與 backoff (退避) 機制
# 這能稍微降低被 Google 判定為機器人而回傳 404 的機率
pytrends = TrendReq(hl='zh-TW', tz=-480, retries=3, backoff_factor=1) 

# 負面/政治/行政過濾清單
EXCLUDE_WORDS = [
    "空難", "墜機", "災難", "事故", "死亡", "受傷", "失蹤", "喪命", "意外", "確診", "遺體", "命案", "自殺", "受虐", "性侵",
    "政治", "選舉", "政黨", "民進黨", "國民黨", "民眾黨", "立院", "立法院", "議員", "市長", "總統", "罷免", "抗議", "示威", "暴力", 
    "槍擊", "搶劫", "詐騙", "毒品", "刑案", "法院", "判刑", "被捕", "涉嫌", "弊案", "貪汙", "共機", "兩岸", "軍事", "演習",
    "火災", "起火", "火警", "閃電", "雷擊", "停電", "政府", "機關", "辦事處", "分局", "派出所", "公所", "地檢署", "稅務", "健保"
] 

# 備用關鍵字 (API 全失效時使用，維持民宿 SEO 權重)
BACKUP_DATA = ["澎湖旅遊", "澎湖花火節", "澎湖美食", "澎湖景點", "澎湖民宿"]

print("正在啟動抓取程序...")
# 模擬真人行為，隨機等待 5-12 秒再開始請求
time.sleep(random.randint(5, 12))

final_keywords = []
update_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

try:
    print(f"嘗試抓取 Google Trends 台灣即時熱門趨勢...") 
    # 策略 1: 即時趨勢 (Real-time trends)
    df_trends = pytrends.realtime_trending_searches(pn='TW')
    
    if df_trends is not None and not df_trends.empty:
        all_keywords = df_trends['title'].tolist()
        print(f"成功獲取 {len(all_keywords)} 筆即時關鍵字。")
        for kw in all_keywords:
            if any(neg in kw for neg in EXCLUDE_WORDS): continue
            final_keywords.append(kw)
            if len(final_keywords) >= 40: break
    else:
        print("即時趨勢數據為空，切換至策略 2...")
        # 策略 2: 每日熱搜 (Daily Trends)
        df_daily = pytrends.trending_searches(pn='taiwan')
        if not df_daily.empty:
            all_keywords = df_daily[0].tolist()
            final_keywords = [k for k in all_keywords if not any(neg in k for neg in EXCLUDE_WORDS)][:40]

except Exception as e:
    # 發生 404 或連線問題時，紀錄錯誤但不中斷程式
    print(f"抓取流程失敗 (可能是 Google 接口變動或頻率限制): {e}")

# 如果最終還是沒數據，使用備用數據
if not final_keywords:
    print("使用備援澎湖旅遊關鍵字。")
    final_keywords = BACKUP_DATA

# 2. 生成 HTML 內容
html_list = "" 
for i, kw in enumerate(final_keywords): 
    html_list += f''' 
    <div style="display:flex; align-items:center; padding:6px 12px; border-bottom:1px solid #eee; font-size:1.05em; line-height:1.2; margin-bottom:1px;"> 
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

# 3. 儲存檔案
try:
    with open("googletrendforall.html", "w", encoding="utf-8") as f: 
        f.write(html_template)
    print(f"✅ googletrendforall.html 產出成功！共 {len(final_keywords)} 筆。")
except Exception as e:
    print(f"檔案儲存失敗: {e}")
