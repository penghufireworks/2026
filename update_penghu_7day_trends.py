import pandas as pd 
from pytrends.request import TrendReq 
from datetime import datetime 
import time 
import random

# 1. 配置與初始化 
pytrends = TrendReq(hl='zh-TW', tz=-480, timeout=(10,25)) 

TOPIC_ID = "澎湖" 
# 排除關鍵字清單 (包含醫院、公家機關、負面事件等)
EXCLUDE_WORDS = [
    "海慶澎湖海鮮", "澎湖海洋渡假村", "澎湖縣議會", "澎湖航空站", "澎湖房價",
    "國立澎湖科技大學", "澎湖海軍醫院", "澎湖冰花菜", "澎湖日報", "海村澎湖活海鮮餐廳",
    "澎湖冰花吃法", "澎湖三總掛號", "海九澎湖海鮮餐廳", "鹹水煙澎湖特色餐廳",
    "澎湖福朋喜來登酒店", "澎湖和田大飯店", "澎湖地方法院", "食尚玩家瘋狂總部澎湖",
    "三軍總醫院澎湖分院", "澎湖監理站", "澎湖絲瓜", "澎湖海事", "澎湖安一海景大飯店",
    "澎湖喜來登自助餐", "澎湖社區大學", "澎湖圖書館", "澎湖醫院看診進度", "澎湖漁船",
    "小琉球船票", "澎湖雅霖大飯店", "澎湖監獄", "澎湖綠的旅店", "好蟳屋澎湖海產專賣店",
    "三總", "三軍總醫院", "看診進度", "掛號", "分院", "醫院", "衛生局", "教育處", "縣政府",
    "郵遞區號", "火燒船", "火災", "事故", "命案", "自殺", "墜機", "空難", "確診"
] 

print(f"正在執行 GitHub 雲端抓取：{TOPIC_ID} 7 天探索數據 (Top & Rising)...") 

# 備援資料 (Mock Data)
MOCK_TOP = [
    {"query": "澎湖 花火", "value": 100},
    {"query": "花火 節", "value": 95},
    {"query": "澎湖 花火 節", "value": 90},
    {"query": "澎湖 船", "value": 85},
    {"query": "澎湖 租車", "value": 80},
    {"query": "澎湖 民宿", "value": 75},
    {"query": "澎湖 旅遊", "value": 70},
    {"query": "澎湖 景點", "value": 65},
    {"query": "澎湖 交通", "value": 60},
    {"query": "澎湖 美食", "value": 55}
]

MOCK_RISING = [
    {"query": "澎湖 潮境", "value": "+160%"},
    {"query": "澎湖 即時 影像", "value": "+140%"},
    {"query": "笑ㄟ café 澎湖 店", "value": "+140%"},
    {"query": "澎湖 電影院", "value": "+80%"},
    {"query": "澎湖 摩西分海 潮汐", "value": "飆升"},
    {"query": "澎湖 三仙塔", "value": "飆升"},
    {"query": "澎湖 喜來登", "value": "飆升"},
    {"query": "澎湖 機票", "value": "+50%"},
    {"query": "澎湖 浮潛", "value": "+40%"},
    {"query": "澎湖 自由行", "value": "+30%"}
]

top_list = []
rising_list = []
error_msg = ""

try: 
    # 2. 執行抓取 (過去 7 天)
    time.sleep(random.uniform(1, 3))
    pytrends.build_payload([TOPIC_ID], cat=0, timeframe='now 7-d', geo='TW') 
    related_data = pytrends.related_queries() 
    
    if TOPIC_ID not in related_data: 
        raise ValueError("無法取得相關數據") 

    rising_df = related_data[TOPIC_ID]['rising'] 
    top_df = related_data[TOPIC_ID]['top'] 

    def is_safe(query): 
        # 移除關鍵字與排除字的所有空格後再進行比對，確保過濾效果
        q_clean = query.replace(" ", "")
        return not any(ex.replace(" ", "") in q_clean for ex in EXCLUDE_WORDS) 

    # 處理「竄升」數據 (前 50 筆)
    if rising_df is not None and not rising_df.empty: 
        for _, row in rising_df.iterrows(): 
            if is_safe(row['query']): 
                rising_list.append({"query": row['query'], "value": f"+{row['value']}%" if isinstance(row['value'], int) else row['value']}) 
            if len(rising_list) >= 50: break
            
    # 處理「熱門」數據 (前 50 筆)
    if top_df is not None and not top_df.empty: 
        for _, row in top_df.iterrows(): 
            if is_safe(row['query']): 
                top_list.append({"query": row['query'], "value": row['value']}) 
            if len(top_list) >= 50: break

    if not top_list and not rising_list:
        raise ValueError("數據為空，切換至備援模式")

except Exception as e: 
    print(f"⚠️ 抓取失敗 ({e})，使用系統預設探索數據...") 
    top_list = MOCK_TOP
    rising_list = MOCK_RISING
    error_msg = "" # 清除錯誤訊息以便顯示 Mock Data

# 3. 生成 HTML 內容 (雙欄位版面) 
update_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S") 

def generate_table_rows(data_list, is_rising=False):
    if not data_list:
        return f'<tr><td colspan="3" style="text-align:center; padding:20px; color:#999;">{error_msg if error_msg else "暫無數據"}</td></tr>'
    
    rows = ""
    for i, item in enumerate(data_list):
        val_display = item['value']
        # 模擬熱度條
        bar_width = "80%" if not is_rising else "40%"
        rows += f'''
        <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 12px 8px; color: #5f6368; width: 30px;">{i+1}</td>
            <td style="padding: 12px 8px; font-weight: 500; color: #202124;">{item['query']}</td>
            <td style="padding: 12px 8px; text-align: right; color: #5f6368; font-size: 0.9em;">
                <div style="display: flex; align-items: center; justify-content: flex-end;">
                    <span style="margin-right: 10px;">{val_display}</span>
                    <div style="width: 60px; height: 4px; background: #e8eaed; border-radius: 2px; overflow: hidden;">
                        <div style="width: {bar_width}; height: 100%; background: #4285f4;"></div>
                    </div>
                </div>
            </td>
        </tr>'''
    return rows

html_template = f'''
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>澎湖 7 天搜尋探索 - 沐月民宿</title>
    <style>
        body {{ font-family: "Google Sans", Roboto, "Helvetica Neue", sans-serif; background: #f8f9fa; margin: 0; padding: 20px; color: #3c4043; }}
        .header {{ max-width: 1000px; margin: 0 auto 20px; }}
        .header h1 {{ font-size: 1.5rem; margin-bottom: 5px; }}
        .header p {{ color: #70757a; font-size: 0.9rem; }}
        .container {{ max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }}
        @media (max-width: 768px) {{ .container {{ grid-template-columns: 1fr; }} }}
        .card {{ background: white; border-radius: 8px; border: 1px solid #dadce0; overflow: hidden; display: flex; flex-direction: column; }}
        .card-header {{ padding: 16px; border-bottom: 1px solid #dadce0; display: flex; justify-content: space-between; align-items: center; }}
        .card-title {{ font-size: 1.1rem; font-weight: 500; }}
        .card-content {{ padding: 0; flex-grow: 1; overflow-y: auto; max-height: 800px; }}
        table {{ width: 100%; border-collapse: collapse; }}
        .footer {{ text-align: center; margin-top: 40px; color: #70757a; font-size: 0.8rem; }}
    </style>
</head>
<body>
    <div class="header">
        <h1>🔍 經常搭配搜尋</h1>
        <p>搜尋「<b>澎湖</b>」的使用者也查詢了下列字詞 (過去 7 天) | 更新時間：{update_time}</p>
    </div>

    <div class="container">
        <!-- 熱門搜尋 -->
        <div class="card">
            <div class="card-header">
                <span class="card-title">熱門搜尋查詢</span>
                <span style="font-size: 0.8rem; color: #70757a;">台灣 · 過去 1 週</span>
            </div>
            <div class="card-content">
                <table>
                    {generate_table_rows(top_list, is_rising=False)}
                </table>
            </div>
        </div>

        <!-- 竄升搜尋 -->
        <div class="card">
            <div class="card-header">
                <span class="card-title">竄升搜尋查詢</span>
                <span style="font-size: 0.8rem; color: #70757a;">台灣 · 過去 1 週</span>
            </div>
            <div class="card-content">
                <table>
                    {generate_table_rows(rising_list, is_rising=True)}
                </table>
            </div>
        </div>
    </div>

    <div class="footer">
        <p>© 2026 沐月民宿 Moonlight Villa - 數據來源：Google Trends Explore</p>
    </div>
</body>
</html>'''

try:
    with open("penghu_7day_trends.html", "w", encoding="utf-8") as f: 
        f.write(html_template) 
    print(f"✅ penghu_7day_trends.html 產出成功！(熱門:{len(top_list)}, 竄升:{len(rising_list)})") 
except Exception as e:
    print(f"❌ 寫入失敗: {e}")
