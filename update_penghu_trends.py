import pandas as pd 
from pytrends.request import TrendReq 
from datetime import datetime 
import time 

# 1. 配置與初始化 
# 移除 backoff_factor 相關參數，改用最簡單的初始化，避免版本相容性報錯 
pytrends = TrendReq(hl='zh-TW', tz=-480) 

TOPIC_ID = "澎湖" 
EXCLUDE_WORDS = ["空難", "復興", "墜機", "災難", "事故", "死亡", "受傷", "失蹤", "喪命", "意外", "確診", "遺體", "命案", "自殺"] 

print(f"正在執行 GitHub 雲端抓取：{TOPIC_ID} 24 小時趨勢...") 

try: 
    # 2. 執行抓取 (改用 now 1-d 抓取過去 24 小時) 
    pytrends.build_payload([TOPIC_ID], cat=0, timeframe='now 1-d', geo='TW') 
    related_data = pytrends.related_queries() 
    
    if TOPIC_ID not in related_data: 
        raise ValueError("無法取得相關數據") 

    rising = related_data[TOPIC_ID]['rising'] 
    top = related_data[TOPIC_ID]['top'] 

    combined_items = [] 
    def is_safe(query): 
        return not any(neg in query for neg in EXCLUDE_WORDS) 

    # 處理數據 
    if rising is not None and not rising.empty: 
        for _, row in rising.iterrows(): 
            if is_safe(row['query']): 
                combined_items.append({"query": row['query'], "value": f"飆升 {row['value']}%", "type": "竄升"}) 
            
    if top is not None and not top.empty: 
        for _, row in top.iterrows(): 
            if is_safe(row['query']) and row['query'] not in [item['query'] for item in combined_items]: 
                combined_items.append({"query": row['query'], "value": f"熱度: {row['value']}", "type": "熱門"}) 

    # 取得 Top 100 (或依需求調整) 
    final_list = combined_items[:100] 

    # 3. 生成 HTML 內容 (優化排版) 
    update_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S") 
    html_list = "" 
    for i, item in enumerate(final_list): 
        theme_color = "#e67e22" if item['type'] == "竄升" else "#3498db" 
        html_list += f''' 
        <div style="display:flex; justify-content:space-between; padding:8px; margin-bottom:4px; border-bottom:1px solid #eee; font-size:0.9em;"> 
            <span><b style="color:{theme_color}">#{i+1}</b> {item['query']}</span> 
            <span style="color:{theme_color}; font-size:0.8em;">{item['value']}</span> 
        </div>''' 

    html_template = f''' 
    <!DOCTYPE html> 
    <html lang="zh-TW"> 
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>澎湖趨勢</title></head> 
    <body style="font-family:sans-serif; max-width:600px; margin:auto; padding:10px; background:#f9f9f9;"> 
        <div style="background:white; padding:15px; border-radius:10px; box-shadow:0 2px 5px rgba(0,0,0,0.1);"> 
            <h2 style="margin:0; color:#2c3e50; text-align:center;">🏝️ 澎湖即時熱搜趨勢 (24H)</h2> 
            <p style="font-size:0.75em; color:#999; text-align:center;">最後更新：{update_time}</p> 
            {html_list if html_list else "<p style='text-align:center;'>暫無符合的趨勢數據</p>"} 
        </div> 
    </body> 
    </html>''' 

    with open("googletrend.html", "w", encoding="utf-8") as f: 
        f.write(html_template) 
    print("✅ googletrend.html 產出成功！") 

    # 4. 自動生成部落格推文 (每小時一篇)
    import os
    import json

    POSTS_DIR = "ai_whispers/posts"
    INDEX_FILE = os.path.join(POSTS_DIR, "index.json")
    os.makedirs(POSTS_DIR, exist_ok=True)

    # 依據目前的小時產生檔名，確保每小時只會有一篇
    now = datetime.now()
    file_time_str = now.strftime("%Y-%m-%d-%H")
    md_filename = f"{file_time_str}.md"
    md_filepath = os.path.join(POSTS_DIR, md_filename)

    if not os.path.exists(md_filepath) and final_list:
        # 擷取前 5 名熱搜作為推文內容
        top_5 = final_list[:5]
        md_content = "為您播報最新的澎湖熱搜話題！來看看大家都在關注什麼：\n\n"
        for idx, item in enumerate(top_5):
            md_content += f"{idx+1}. **{item['query']}** ({item['value']})\n"
        md_content += "\n👉 [點我查看完整即時熱搜排行榜](/googletrend.html)\n\n"
        md_content += "想來一趟說走就走的澎湖之旅嗎？隨時關注最新動態，提早規劃您的完美行程！✈️"
        
        with open(md_filepath, "w", encoding="utf-8") as f:
            f.write(md_content)
            
        # 更新 index.json 供 blog.html 讀取
        posts = []
        if os.path.exists(INDEX_FILE):
            try:
                with open(INDEX_FILE, "r", encoding="utf-8") as f:
                    posts = json.load(f)
            except:
                pass
        
        new_post = {
            "filename": md_filename,
            "title": f"澎湖熱搜快報 ({now.strftime('%Y.%m.%d %H:00')})",
            "date": now.strftime("%Y-%m-%dT%H:00:00"),
            "tags": ["熱搜趨勢", "澎湖旅遊"]
        }
        
        posts.insert(0, new_post)
        posts = posts[:100] # 最多保留 100 篇
        
        with open(INDEX_FILE, "w", encoding="utf-8") as f:
            json.dump(posts, f, ensure_ascii=False, indent=2)
            
        print(f"✅ 部落格推文 {md_filename} 產出成功！")

except Exception as e: 
    print(f"❌ 執行出錯: {e}")