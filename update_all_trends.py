import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime
import os

# 1. 配置與過濾清單
RSS_URL = "https://trends.google.com/trending/rss?geo=TW"

# 負面與無關詞彙過濾
EXCLUDE_WORDS = [
    "空難", "墜機", "災難", "事故", "死亡", "受傷", "失蹤", "喪命", "意外", "確診", "遺體", "命案", "自殺", "受虐", "性侵",
    "政治", "選舉", "政黨", "民進黨", "國民黨", "民眾黨", "立院", "立法院", "議員", "市長", "總統", "罷免", "抗議", "示威", "暴力", 
    "槍擊", "搶劫", "詐騙", "毒品", "刑案", "法院", "判刑", "被捕", "涉嫌", "弊案", "貪汙", "共機", "兩岸", "軍事", "演習",
    "火災", "起火", "火警", "閃電", "雷擊", "停電", "政府", "機關", "辦事處", "分局", "派出所", "公所", "地檢署", "稅務", "健保"
]

# 備援數據（確保頁面永遠有民宿相關關鍵字）
BACKUP_DATA = ["澎湖旅遊", "澎湖花火節", "澎湖美食", "澎湖景點", "澎湖民宿"]

print(f"正在透過 RSS 獲取 Google Trends 台灣熱門搜尋...")

final_keywords = []
update_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

try:
    # 建立請求，加入 User-Agent 避免被基本爬蟲偵測擋下
    req = urllib.request.Request(RSS_URL, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
    
    with urllib.request.urlopen(req) as response:
        rss_content = response.read().decode('utf-8')
    
    # 解析 XML 結構
    root = ET.fromstring(rss_content)
    
    # Google Trends RSS 的格式：channel -> item -> title
    for item in root.findall('./channel/item'):
        title = item.find('title').text
        
        # 執行關鍵字過濾
        if title and not any(word in title for word in EXCLUDE_WORDS):
            final_keywords.append(title)
            
        # 限制顯示數量，保持網頁美觀
        if len(final_keywords) >= 40:
            break

    print(f"成功處理 {len(final_keywords)} 筆 RSS 數據。")

except Exception as e:
    print(f"RSS 抓取失敗: {e}")

# 若 RSS 抓取失敗或過濾後無結果，使用備援
if not final_keywords:
    print("使用備援關鍵字補位。")
    final_keywords = BACKUP_DATA

# 2. 生成 HTML 列表
html_list = ""
for i, kw in enumerate(final_keywords):
    html_list += f'''
    <div style="display:flex; align-items:center; padding:6px 12px; border-bottom:1px solid #eee; font-size:1.05em; line-height:1.2; margin-bottom:1px;">
        <b style="color:#e67e22; width:40px; font-size:0.9em;">#{i+1}</b>
        <span style="color:#2c3e50; font-weight:500;">{kw}</span>
    </div>'''

# 3. 完整的 HTML 模板
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
        <p class="subtitle">同步自 Google Trends RSS | 最後更新：{update_time}</p>
        <div class="item-list">
            {html_list}
        </div>
    </div>
    <div class="footer">
        <p>© 2026 沐月民宿 Moonlight Villa - 數據來源: Google Trends</p>
    </div>
</body>
</html>'''

# 4. 寫入檔案
try:
    with open("googletrendforall.html", "w", encoding="utf-8") as f:
        f.write(html_template)
    print(f"✅ googletrendforall.html 產出成功！共 {len(final_keywords)} 筆。")
except Exception as e:
    print(f"檔案寫入失敗: {e}")
