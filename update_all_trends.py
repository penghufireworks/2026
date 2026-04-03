import pandas as pd 
from pytrends.request import TrendReq 
from datetime import datetime 
import time 
import os

# 1. 配置與初始化 
# hl='zh-TW' 繁體中文, tz=-480 台北時區
pytrends = TrendReq(hl='zh-TW', tz=-480) 

# 負面/政治/行政過濾清單 (保持不變)
EXCLUDE_WORDS = [
    "空難", "復興", "墜機", "災難", "事故", "死亡", "受傷", "失蹤", "喪命", "意外", "確診", "遺體", "命案", "自殺", "受虐", "性侵",
    "政治", "選舉", "政黨", "民進黨", "國民黨", "民眾黨", "立院", "立法院", "議員", "市長", "總統", "罷免", "抗議", "示威", "暴力", 
    "槍擊", "搶劫", "詐騙", "毒品", "刑案", "法院", "判刑", "被捕", "涉嫌", "弊案", "貪汙", "共機", "兩岸", "軍事", "演習",
    "火災", "起火", "火警", "閃電", "雷擊", "停電", "政府", "機關", "辦事處", "分局", "派出所", "公所", "地檢署", "稅務", "健保"
] 

# 備用關鍵字
BACKUP_DATA = ["澎湖旅遊", "澎湖花火節", "澎湖美食", "澎湖景點", "澎湖民宿"]

print(f"正在抓取 Google Trends 台灣即時熱門趨勢 (Status: Active)... ") 

final_keywords = []

try:
    # 修改處：改用 realtime_trending_searches 獲取「活躍中」的趨勢
    # pn='TW' 代表台灣地區
    df_trends = pytrends.realtime_trending_searches(pn='TW')
    
    if df_trends is not None and not df_trends.empty:
        # 即時趨勢的關鍵字存放在 'title' 欄位
        all_keywords = df_trends['title'].tolist()
        print(f"成功獲取 {len(all_keywords)} 筆即時熱搜關鍵字。")
        
        # 進行過濾
        for kw in all_keywords:
            # 過濾負面字眼
            if any(neg in kw for neg in EXCLUDE_WORDS):
                continue
            final_keywords.append(kw)
            
            # 限制數量，避免頁面過長
            if len(final_keywords) >= 40:
                break
    else:
        print("無法取得即時數據，嘗試備援策略...")
        # 備援：嘗試每日熱搜
        df_daily = pytrends.trending_searches(pn='taiwan')
        if not df_daily.empty:
            final_keywords = [k for k in df_daily[0].tolist() if not any(neg in k for neg in EXCLUDE_WORDS)][:40]

except Exception as e:
    print(f"抓取流程失敗: {e}")

# 如果最終還是沒數據，使用備用
if not final_keywords:
    final_keywords = BACKUP_DATA

# 2. 生成 HTML 內容 (保持不變)
update_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S") 
html_list = "" 
for i, kw in enumerate(final_keywords): 
    html_list += f''' 
    <div style="display:flex; align-items:center; padding:6px 12px; border-bottom:1px solid #eee; font-size:1.05em; line-height:1.2; margin-bottom:1px;"> 
        <b style="color:#e67e22; width:40px; font-size:0.9em;">#{i+1}</b> 
        <span style="color:#2c3e50; font-weight:500;">{kw}</span> 
    </div>''' 

# HTML 模板與儲存邏輯 (保持不變)
# ... (此處省略與您原代碼相同的 html_template 部分)

with open("googletrendforall.html", "w", encoding="utf-8") as f: 
    f.write(html_template)
print(f"✅ googletrendforall.html 產出成功！共 {len(final_keywords)} 筆。")
