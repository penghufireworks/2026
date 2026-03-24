import json
import os
from datetime import datetime
from openai import OpenAI

# 1. 取得 DeepSeek API Key (從環境變數讀取)
API_KEY = os.environ.get("DEEPSEEK_API_KEY", "")

def get_penghu_trends():
    """從你的網頁抓取當前熱搜關鍵字，並過濾掉可能的店名或人名"""
    try:
        # 為了避免在 GitHub Actions 中抓不到最新資料，直接讀取本地剛產生的 googletrend.html 
        # (因為它會在同一個 workflow 的上一步產生)
        raw_trends = []
        if os.path.exists("googletrend.html"):
            with open("googletrend.html", "r", encoding="utf-8") as f:
                content = f.read()
                # 簡單的字串解析來取得前 20 個關鍵字 (多抓一些來過濾)
                lines = content.split('</div>')
                for line in lines[:20]:
                    if '<b style="color:' in line and '</b>' in line:
                        keyword = line.split('</b>')[1].split('</span>')[0].strip()
                        if keyword:
                            raw_trends.append(keyword)
        
        # 建立一個簡單的過濾清單，只過濾特定的店名或人名
        # (保留了通用的飯店、民宿、醫院、餐飲、特產等詞彙)
        exclude_keywords = [
            "陳光復", "喜來登", "澎澄", "和田", "廣林"
        ]
        
        trends = []
        for kw in raw_trends:
            # 檢查關鍵字是否包含排除清單中的字眼
            if not any(ex in kw for ex in exclude_keywords):
                trends.append(kw)
            
            # 只要取前 10 個乾淨的關鍵字即可
            if len(trends) >= 10:
                break
                
        if not trends:
            return ["澎湖花火節", "島嶼生活", "海風", "夕陽", "潮汐"]
            
        return trends
    except Exception as e:
        print(f"抓取失敗: {e}")
        return ["澎湖花火節", "島嶼生活", "海風"]

def filter_keywords_with_ai(keywords, api_key):
    """使用 AI 來判斷並過濾掉含有特定店家名稱或人名的關鍵字"""
    if not api_key:
        return keywords
        
    keywords_str = "、".join(keywords)
    
    system_prompt = (
        "你是一個關鍵字過濾助手。我會給你一串關於澎湖的搜尋關鍵字。"
        "你的任務是檢查這些關鍵字中，是否包含『特定的真實店家名稱』（例如：某某飯店、某某海鮮餐廳、某某民宿）或是『特定的真實人名』（例如：政治人物、名人）。"
        "如果包含這些特定的名字，請將該關鍵字整組移除。"
        "注意：如果是『通用的名詞』，例如：飯店、民宿、伴手禮、特產、早餐、海鮮、醫院、傳票等，請『保留』它們。"
        "請直接回傳過濾後剩下的關鍵字，用逗號分隔，不要有任何其他解釋或對話。"
    )
    
    try:
        client = OpenAI(
            api_key=api_key,
            base_url="https://api.deepseek.com"
        )
        
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"請過濾以下關鍵字：{keywords_str}"}
            ],
            stream=False,
            temperature=0.1 # 降低溫度以獲得更確定的過濾結果
        )
        
        filtered_str = response.choices[0].message.content.strip()
        # 將回傳的字串重新轉為列表
        filtered_list = [k.strip() for k in filtered_str.replace("、", ",").split(",") if k.strip()]
        
        if not filtered_list:
            return ["澎湖花火節", "島嶼生活", "海風", "夕陽", "潮汐"]
            
        return filtered_list
    except Exception as e:
        print(f"AI 過濾關鍵字失敗: {e}")
        return keywords # 如果失敗就退回使用原始關鍵字

def generate_infj_article(trends):
    """以內斂、感性的筆觸生成內容"""
    if not API_KEY:
        print("未設定 DEEPSEEK_API_KEY，略過文章生成")
        return None
        
    keywords_str = "、".join(trends)
    
    # INFJ 靈魂指令：強調觀察、情緒與土地連結，隱藏 AI 痕跡
    system_prompt = (
        "你是一位長居澎湖的文字創作者。你的文字溫柔、細膩、帶著一點點孤獨感，對土地充滿觀察。"
        "絕對不要提到『我是AI』、『我是INFJ』或『根據數據顯示』。"
        "請將提供的關鍵字想像成島嶼當下的『情緒』或『呼吸』，自然地融入散文隨筆中。"
        "重要：如果關鍵字中仍不小心混入了任何『特定的真實人名』或『特定的真實店家/品牌名稱』（例如陳光復、喜來登等），請你在寫作時自動忽略它們。但是，對於通用的名詞（如：民宿、飯店、海鮮、醫院、傳票等），請發揮你的文學素養，將它們轉化為生活中的隱喻或島嶼的日常片段。"
        "使用第一人稱『我』，描述感官與心靈的共鳴。請以繁體中文回答，篇幅約 400 字。"
    )
    
    user_prompt = f"目前的島嶼氣息包含了：{keywords_str}。請以此寫下一篇關於澎湖的隨筆。"

    try:
        client = OpenAI(
            api_key=API_KEY,
            base_url="https://api.deepseek.com"
        )
        
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            stream=False,
            temperature=0.7
        )
        
        return response.choices[0].message.content
    except Exception as e:
        print(f"API 呼叫失敗: {e}")
        return None

def save_and_format(content, trends):
    """格式化結尾並儲存文章"""
    if not content:
        return
        
    # 第三重防線：如果在生成的內容中仍然發現這些絕對禁止的字眼，則不儲存
    absolute_blacklist = ["縣長", "陳光復", "海洋渡假村", "三總", "和田", "喜來登", "廣林"]
    for bad_word in absolute_blacklist:
        if bad_word in content:
            print(f"警告：生成的文章內包含禁止字眼「{bad_word}」，將拒絕寫入檔案。")
            return
            
    now = datetime.now()
    
    # 建立目錄
    POSTS_DIR = "ai_whispers/posts"
    INDEX_FILE = os.path.join(POSTS_DIR, "index.json")
    os.makedirs(POSTS_DIR, exist_ok=True)
    
    # 動態生成的詩意主題（由內容前幾個字或時間衍生，這裡簡單處理）
    topic = content.split('。')[0][:15] if '。' in content else "散步在海邊的時刻"
    topic = topic.replace("\n", "").replace("*", "")
    
    # 取前 10 個關鍵字作為標籤，不再直接寫入文章結尾，而是存入 json
    # 我們仍然保留這段邏輯，因為底下的 new_post 字典會用到 trends
    
    footer = (
        f"\n\n---\n"
        f"📖 2026 澎湖。島嶼私語：\n"
        f"《{topic}》"
    )
    
    full_post = content + footer
    
    # 儲存檔案 (檔名以時間到秒命名，確保每次執行都不重複)
    filename = f"{now.strftime('%Y-%m-%d-%H%M%S')}.md"
    filepath = os.path.join(POSTS_DIR, filename)
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(full_post)
    print(f"成功生成文章：{filename}")
    
    # 更新 index.json 供 blog.html 讀取
    posts = []
    if os.path.exists(INDEX_FILE):
        try:
            with open(INDEX_FILE, "r", encoding="utf-8") as f:
                posts = json.load(f)
        except:
            pass
    
    # 只要執行就新增，不檢查是否重複
    new_post = {
        "filename": filename,
        "title": f"島嶼私語：{topic}",
        "date": now.strftime("%Y-%m-%dT%H:%M:%S"),
        "tags": trends[:10] # 將抓取到的前 10 個關鍵字存入標籤
    }
    
    posts.insert(0, new_post)
    posts = posts[:100] # 最多保留 100 篇
    
    with open(INDEX_FILE, "w", encoding="utf-8") as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    raw_trends = get_penghu_trends()
    print(f"抓取到的原始關鍵字: {raw_trends}")
    
    # 先讓 AI 過濾一次關鍵字
    clean_trends = filter_keywords_with_ai(raw_trends, API_KEY)
    print(f"AI 過濾後的乾淨關鍵字: {clean_trends}")
    
    article_content = generate_infj_article(clean_trends)
    if article_content:
        save_and_format(article_content, clean_trends)