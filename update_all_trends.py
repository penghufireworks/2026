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

print(f"【細節增強模式】正在從 RSS 抓取 Google Trends 台灣熱門搜尋...")

def parse_traffic(traffic_str):
    """將搜尋量字串 (如 50,000+) 轉換為數字以便排序"""
    if not traffic_str: return 0
    clean_str = traffic_str.replace('+', '').replace(',', '')
    try:
        return int(clean_str)
    except:
        return 0

def fetch_rss_trends_detailed():
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
        response = requests.get(RSS_URL, headers=headers, timeout=15)
        if response.status_code != 200:
            print(f"抓取失敗，狀態碼: {response.status_code}")
            return []
            
        root = ET.fromstring(response.text)
        namespaces = {'ht': 'https://trends.google.com.tw/trending/rss'}
        
        items = []
        for item in root.findall('.//item'):
            title = item.find('title').text
            if any(neg in title for neg in EXCLUDE_WORDS): continue
                
            traffic = item.find('ht:approx_traffic', namespaces)
            traffic_text = traffic.text if traffic is not None else "0+"
            traffic_num = parse_traffic(traffic_text)
            
            # 提取圖片
            picture = item.find('ht:picture', namespaces)
            picture_url = picture.text if picture is not None else ""
            
            # 提取多則新聞
            news_list = []
            for news in item.findall('ht:news_item', namespaces):
                n_title = news.find('ht:news_item_title', namespaces).text
                n_url = news.find('ht:news_item_url', namespaces).text
                n_source = news.find('ht:news_item_source', namespaces).text
                news_list.append({"title": n_title, "url": n_url, "source": n_source})
                if len(news_list) >= 2: break # 最多取兩則
            
            items.append({
                "title": title,
                "traffic_text": traffic_text,
                "traffic_num": traffic_num,
                "picture": picture_url,
                "news": news_list,
                "pubDate": item.find('pubDate').text
            })
            
        # 2. 排序：依搜尋量數字從大到小
        items.sort(key=lambda x: x['traffic_num'], reverse=True)
        
        return items[:50]
    except Exception as e:
        print(f"RSS 解析錯誤: {e}")
        return []

def group_trends(items):
    """簡單的分組邏輯：依關鍵字特徵或搜尋量級距"""
    groups = {
        "🔥 超熱門 (10,000+)": [],
        "📈 竄升中 (2,000+)": [],
        "🔍 其他趨勢": []
    }
    
    for item in items:
        if item['traffic_num'] >= 10000:
            groups["🔥 超熱門 (10,000+)"].append(item)
        elif item['traffic_num'] >= 2000:
            groups["📈 竄升中 (2,000+)"].append(item)
        else:
            groups["🔍 其他趨勢"].append(item)
            
    return {k: v for k, v in groups.items() if v} # 移除空分組

# 執行抓取與分組
trend_items = fetch_rss_trends_detailed()
grouped_data = group_trends(trend_items)
update_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

# 3. 生成 HTML 內容
html_content = ""
for group_name, items in grouped_data.items():
    html_content += f'<div style="background:#f8f9fa; padding:10px 15px; margin:20px 0 10px; border-radius:8px; font-weight:bold; color:#2c3e50; border-left:5px solid #e67e22;">{group_name}</div>'
    
    for item in items:
        news_html = ""
        for n in item['news']:
            news_html += f'<div style="font-size:0.85em; color:#7f8c8d; margin-top:4px;">📰 <a href="{n["url"]}" target="_blank" style="text-decoration:none; color:#34495e;">{n["title"]}</a> <span style="font-size:0.8em; color:#bdc3c7;">({n["source"]})</span></div>'
        
        pic_html = f'<img src="{item["picture"]}" style="width:60px; height:60px; border-radius:8px; object-fit:cover; margin-left:15px;">' if item['picture'] else ""
        
        html_content += f'''
        <div style="padding:15px; border-bottom:1px solid #eee; display:flex; align-items:flex-start; background:white; margin-bottom:5px; border-radius:8px;">
            <div style="flex:1;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-size:1.15em; font-weight:bold; color:#2c3e50;">{item['title']}</span>
                    <span style="color:#e67e22; font-weight:bold; font-size:0.95em;">{item['traffic_text']} 搜尋</span>
                </div>
                {news_html}
            </div>
            {pic_html}
        </div>'''

html_template = f'''
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>全台熱搜趨勢 (進階版) - 沐月民宿</title>
    <style>
        body {{ font-family: "Microsoft JhengHei", sans-serif; max-width: 800px; margin: auto; padding: 20px; background: #f0f2f5; }}
        .container {{ background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }}
        h2 {{ margin: 0; color: #1a73e8; text-align: center; font-size: 1.8em; }}
        .subtitle {{ font-size: 0.85em; color: #888; text-align: center; margin: 10px 0 20px; }}
        .footer {{ text-align: center; margin-top: 30px; font-size: 0.8em; color: #bbb; }}
        a:hover {{ text-decoration: underline !important; }}
    </style>
</head>
<body>
    <div class="container">
        <h2>🔥 全台熱搜趨勢排行榜 (分組細節版)</h2>
        <p class="subtitle">來源：Google Trends RSS | 最後更新：{update_time}</p>
        <div class="item-list">
            {html_content if html_content else "<p style='text-align:center; padding:20px;'>目前無符合條件的趨勢數據。</p>"}
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
