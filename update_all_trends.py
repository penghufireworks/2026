import pandas as pd 
from pytrends.request import TrendReq 
from datetime import datetime 
import time 

# 1. 配置與初始化 
pytrends = TrendReq(hl='zh-TW', tz=-480) 

EXCLUDE_WORDS = ["空難", "墜機", "災難", "事故", "死亡", "政治", "選舉", "罷免", "抗議", "暴力", "槍擊", "詐騙", "政府"] 
BACKUP_DATA = ["澎湖旅遊", "澎湖花火節", "澎湖美食", "澎湖景點", "澎湖民宿"]

print(f"正在抓取 Google Trends 台灣即時熱門趨勢 (Status: Active)... ") 

final_keywords = []

# --- 修正處：先給予預設值，避免後續報錯 ---
update_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

try:
    # 嘗試即時趨勢
    df_trends = pytrends.realtime_trending_searches(pn='TW')
    if df_trends is not None and not df_trends.empty:
        all_keywords = df_trends['title'].tolist()
        for kw in all_keywords:
            if any(neg in kw for neg in EXCLUDE_WORDS): continue
            final_keywords.append(kw)
            if len(final_keywords) >= 40: break
    else:
        # 如果即時趨勢空了，試試看每日趨勢
        df_daily = pytrends.trending_searches(pn='taiwan')
        if not df_daily.empty:
            all_keywords = df_daily[0].tolist()
            final_keywords = [k for k in all_keywords if not any(neg in k for neg in EXCLUDE_WORDS)][:40]

except Exception as e:
    print(f"抓取流程失敗（這可能是 Google 接口變動造成的）: {e}")

# 如果最終還是沒數據，強制使用備用
if not final_keywords:
    final_keywords = BACKUP_DATA

# 2. 生成 HTML 內容 (確保變數一定會被定義)
html_list = "" 
for i, kw in enumerate(final_keywords): 
    html_list += f''' 
    <div style="display:flex; align-items:center; padding:6px 12px; border-bottom:1px solid #eee; font-size:1.05em; line-height:1.2; margin-bottom:1px;"> 
        <b style="color:#e67e22; width:40px; font-size:0.9em;">#{i+1}</b> 
        <span style="color:#2c3e50; font-weight:500;">{kw}</span> 
    </div>''' 

# --- 修正處：確保 html_template 在 try/except 之外定義 ---
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

try:
    with open("googletrendforall.html", "w", encoding="utf-8") as f: 
        f.write(html_template)
    print(f"✅ googletrendforall.html 產出成功！共 {len(final_keywords)} 筆。")
except Exception as e:
    print(f"檔案寫入失敗: {e}")
