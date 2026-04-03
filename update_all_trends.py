import requests
import xml.etree.ElementTree as ET
from datetime import datetime
import time
import os

# 1. 配置
RSS_URL = "https://trends.google.com/trending/rss?geo=TW"
EXCLUDE_WORDS = [
    "空難", "墜機", "災難", "事故", "死亡", "受傷", "失蹤", "喪命", "意外", "確診", "遺體", "命案", "自殺", "受虐", "性侵",
    "政治", "選舉", "政黨", "民進黨", "國民黨", "民眾黨", "立院", "立法院", "議員", "市長", "總統", "罷免", "抗議", "示威", "暴力", 
    "槍擊", "搶劫", "詐騙", "毒品", "刑案", "法院", "判刑", "被捕", "涉嫌", "弊案", "貪汙", "共機", "兩岸", "軍事", "演習",
    "火災", "起火", "火警", "閃電", "雷擊", "停電", "政府", "機關", "辦事處", "分局", "派出所", "公所", "地檢署", "稅務", "健保"
] 

print(f"正在從 RSS 抓取 Google Trends 台灣熱門搜尋...")

def fetch_rss_trends():
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
        response = requests.get(RSS_URL, headers=headers, timeout=15)
        if response.status_code != 200:
            print(f"抓取失敗，狀態碼: {response.status_code}")
            return []
            
        # 解析 XML
        root = ET.fromstring(response.text)
        
        # 命名空間處理 (Google Trends RSS 使用 ht 命名空間)
        namespaces = {'ht': 'https://trends.google.com.tw/trending/rss'}
        
        items = []
        for item in root.findall('.//item'):
            title = item.find('title').text
            
            # 檢查過濾詞
            if any(neg in title for neg in EXCLUDE_WORDS):
                continue
                
            # 獲取搜尋量 (ht:approx_traffic)
            traffic = item.find('ht:approx_traffic', namespaces)
            traffic_text = traffic.text if traffic is not None else "未知"
            
            # 獲取新聞標題 (第一個 ht:news_item 下的 ht:news_item_title)
            news_title = "無相關新聞"
            news_item = item.find('ht:news_item', namespaces)
            if news_item is not None:
                nt = news_item.find('ht:news_item_title', namespaces)
                if nt is not None:
                    news_title = nt.text
            
            items.append({
                "title": title,
                "traffic": traffic_text,
                "news": news_title
            })
            
            if len(items) >= 50:
                break
                
        return items
    except Exception as e:
        print(f"RSS 解析錯誤: {e}")
        return []

# 2. 產出 HTML
trend_items = fetch_rss_trends()
update_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

html_list = ""
if not trend_items:
    html_list = "<p style='text-align:center; padding:20px; color:#666;'>目前無資料，請稍後再試。</p>"
else:
    for i, item in enumerate(trend_items):
        html_list += f'''
        <div style="padding:10px 15px; border-bottom:1px solid #eee; margin-bottom:2px; line-height:1.4;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <div style="flex:1; font-size:1.1em; font-weight:bold; color:#2c3e50;">
                    <span style="color:#e67e22; margin-right:8px;">#{i+1}</span> {item['title']}
                </div>
                <div style="width:100px; text-align:right; font-size:0.9em; color:#3498db; font-weight:bold;">
                    {item['traffic']}
                </div>
            </div>
            <div style="font-size:0.85em; color:#7f8c8d; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="{item['news']}">
                📰 {item['news']}
            </div>
        </div>'''

html_template = f'''
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>台灣今日熱搜 (RSS) - 沐月民宿</title>
    <style>
        body {{ font-family: "Microsoft JhengHei", sans-serif; max-width: 800px; margin: auto; padding: 20px; background: #f0f2f5; }}
        .container {{ background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); }}
        h2 {{ margin: 0; color: #1a73e8; text-align: center; font-size: 1.6em; }}
        .subtitle {{ font-size: 0.85em; color: #888; text-align: center; margin: 8px 0 15px; }}
        .item-list {{ margin-top: 5px; }}
        .footer {{ text-align: center; margin-top: 25px; font-size: 0.75em; color: #bbb; }}
    </style>
</head>
<body>
    <div class="container">
        <h2>🔥 台灣今日熱門搜尋 (RSS同步)</h2>
        <p class="subtitle">來源：Google Trends RSS | 最後更新：{update_time}</p>
        <div class="item-list">
            {html_list}
        </div>
    </div>
    <div class="footer">
        <p>© 2026 沐月民宿 Moonlight Villa - 數據來源: Google Trends RSS</p>
    </div>
</body>
</html>'''

try:
    with open("googletrendforall.html", "w", encoding="utf-8") as f:
        f.write(html_template)
    print(f"✅ googletrendforall.html 產出成功！共 {len(trend_items)} 筆。")
except Exception as e:
    print(f"❌ 寫入 HTML 失敗: {e}")
