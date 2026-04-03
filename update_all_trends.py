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

print(f"正在執行台灣今日熱門搜尋抓取...") 

final_keywords = []

try:
    # 僅抓取每日熱門搜尋 (Daily Trending Searches)
    print("正在嘗試抓取台灣今日熱搜趨勢 (pn='taiwan')...")
    df_trending = pytrends.trending_searches(pn='taiwan')
    
    if df_trending is not None and not df_trending.empty:
        all_keywords = df_trending[0].tolist()
        print(f"成功獲取 {len(all_keywords)} 筆熱門關鍵字。")
        
        # 進行過濾
        for kw in all_keywords:
            if any(neg in kw for neg in EXCLUDE_WORDS):
                continue
            final_keywords.append(kw)
            if len(final_keywords) >= 50:
                break
    else:
        print("無法取得每日熱門搜尋數據。")

except Exception as e:
    print(f"抓取流程失敗: {e}")

# 如果最終還是沒數據，給個提示
if not final_keywords:
    final_keywords = ["目前無符合的熱門搜尋數據，請稍後再試。"]

# 2. 生成 HTML 內容
update_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S") 
html_list = "" 
for i, kw in enumerate(final_keywords): 
    # 只有一列：排名與關鍵字
    rank = f"#{i+1}" if len(final_keywords) > 1 else ""
    html_list += f''' 
    <div style="display:flex; padding:8px 12px; border-bottom:1px solid #eee; font-size:1.05em; line-height:1.4;"> 
        <b style="color:#e67e22; width:40px;">{rank}</b> 
        <span style="color:#2c3e50; font-weight:bold;">{kw}</span> 
    </div>''' 

html_template = f''' 
<!DOCTYPE html> 
<html lang="zh-TW"> 
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>台灣今日熱搜趨勢 - 沐月民宿</title>
    <style>
        body {{ font-family: "Microsoft JhengHei", sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #f0f2f5; }}
        .container {{ background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }}
        h2 {{ margin: 0; color: #1a73e8; text-align: center; font-size: 1.8em; }}
        .subtitle {{ font-size: 0.9em; color: #666; text-align: center; margin: 10px 0 20px; }}
        .item-list {{ margin-top: 10px; }}
        .footer {{ text-align: center; margin-top: 30px; font-size: 0.8em; color: #999; }}
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
