import tkinter as tk
import requests
from bs4 import BeautifulSoup
import json
import os
from datetime import datetime

# --- 設定 ---
TARGET_URL = "https://penghu2026.shop/googletrend.html"
DATA_FILE = "trend_stats.json"  # 儲存次數與最高%
CHECK_INTERVAL = 300000        # 5 分鐘
THRESHOLD = 1000               # 1000% 門檻

# --- 排除關鍵字清單 ---
EXCLUDE_KEYWORDS = [
    "海慶澎湖海鮮", "澎湖海洋渡假村", "澎湖縣議會", "澎湖航空站", "澎湖房價",
    "國立澎湖科技大學", "澎湖海軍醫院", "澎湖冰花菜", "澎湖日報", "海村澎湖活海鮮餐廳",
    "澎湖冰花吃法", "澎湖三總掛號", "海九澎湖海鮮餐廳", "鹹水煙澎湖特色餐廳",
    "澎湖福朋喜來登酒店", "澎湖和田大飯店", "澎湖地方法院", "食尚玩家瘋狂總部澎湖",
    "三軍總醫院澎湖分院", "澎湖監理站", "澎湖絲瓜", "澎湖海事", "澎湖安一海景大飯店",
    "澎湖喜來登自助餐", "澎湖社區大學", "澎湖圖書館", "澎湖醫院看診進度", "澎湖漁船",
    "小琉球船票", "澎湖雅霖大飯店", "澎湖監獄", "澎湖綠的旅店", "好蟳屋澎湖海產專賣店"
]

class RankMonitor:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("高頻流量監控")
        self.root.attributes("-topmost", True)
        self.root.overrideredirect(True)
        self.root.attributes("-alpha", 0.95)
        self.root.geometry("580x400+50+50")
        self.root.configure(bg='#121212')

        # 載入歷史統計數據
        self.stats = self.load_stats()

        # UI 標題
        self.header = tk.Label(self.root, text="📊 關鍵字頻次排行 (1000%↑)", bg='#2980b9', fg='white', 
                               font=("Microsoft JhengHei", 10, "bold"), pady=8)
        self.header.pack(fill=tk.X)

        # 欄位標題
        self.col_header = tk.Label(self.root, text="  次數  | 最近更新 |  最高%  |  關鍵字內容", bg='#1e1e1e', fg='#bdc3c7', 
                                   font=("Microsoft JhengHei", 9), anchor="w", padx=10)
        self.col_header.pack(fill=tk.X)

        # 顯示區
        self.display = tk.Text(self.root, bg='#121212', fg='#ecf0f1', borderwidth=0, 
                               font=("Microsoft JhengHei", 10), padx=10, pady=5)
        self.display.pack(expand=True, fill=tk.BOTH)
        
        # 底部狀態欄 (顯示最後更新時間)
        self.footer = tk.Label(self.root, text="等待抓取...", bg='#121212', fg='#7f8c8d', 
                               font=("Microsoft JhengHei", 8), anchor="e", padx=10, pady=5)
        self.footer.pack(fill=tk.X)

        # 標籤色
        self.display.tag_configure("high_freq", foreground="#f1c40f") # 高頻用金黃色
        self.display.tag_configure("new_hit", foreground="#ff4d4d")   # 第一次出現紅

        # 拖動與關閉
        self.header.bind("<Button-1>", self.start_move)
        self.header.bind("<B1-Motion>", self.do_move)
        self.close_btn = tk.Button(self.root, text="✕", command=self.root.destroy, bg='#2980b9', fg='white', bd=0, padx=10)
        self.close_btn.place(x=545, y=5)

        self.update_loop()
        self.root.mainloop()

    def load_stats(self):
        if os.path.exists(DATA_FILE):
            with open(DATA_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        return {}

    def save_stats(self):
        with open(DATA_FILE, 'w', encoding='utf-8') as f:
            json.dump(self.stats, f, ensure_ascii=False)

    def fetch_data(self):
        current_hits = []
        try:
            resp = requests.get(TARGET_URL, timeout=10)
            resp.encoding = 'utf-8'
            soup = BeautifulSoup(resp.text, 'html.parser')
            # 使用更精確的選取器，只抓取帶有 display:flex 的 div (趨勢列)
            # 避免抓到最外層包含所有內容的 white box div
            items = soup.select('div[style*="display:flex"]')
            for item in items:
                text = item.get_text().strip()
                if "飆升" in text:
                    # 分割 "關鍵字" 與 "百分比"
                    parts = text.split("飆升")
                    try:
                        # 1. 處理百分比 (只取第一個出現的數字序列)
                        # 防止因為嵌套或後續文字抓到多餘數字
                        p_val_str = ''.join(filter(str.isdigit, parts[1].split('%')[0]))
                        p_val = int(p_val_str)
                        
                        if p_val >= THRESHOLD:
                            # 2. 處理關鍵字 (保留完整名稱，移除 #1, #2 等編號)
                            kw_part = parts[0].strip()
                            kw_words = kw_part.split()
                            if kw_words and kw_words[0].startswith('#'):
                                kw = ' '.join(kw_words[1:]).strip()
                            else:
                                kw = kw_part
                            
                            current_hits.append((kw, p_val))
                    except Exception as e: 
                        print(f"解析單筆資料失敗: {e}")
                        continue
            return current_hits
        except Exception as e:
            print(f"抓取資料失敗: {e}")
            return []

    def update_loop(self):
        new_data = self.fetch_data()
        now_str = datetime.now().strftime("%m-%d %H:%M")
        
        # 更新統計量
        for kw, p_val in new_data:
            # 排除關鍵字過濾 (移除空格後比對)
            kw_clean = kw.replace(" ", "")
            if any(exclude.replace(" ", "") in kw_clean for exclude in EXCLUDE_KEYWORDS):
                continue
                
            if kw not in self.stats:
                self.stats[kw] = {"count": 1, "max_p": p_val, "is_new": True, "last_seen": now_str}
            else:
                self.stats[kw]["count"] += 1
                self.stats[kw]["is_new"] = False
                self.stats[kw]["last_seen"] = now_str
                if p_val > self.stats[kw]["max_p"]:
                    self.stats[kw]["max_p"] = p_val
        
        self.save_stats()
        self.render(new_data)
        
        # 更新底部時間
        footer_now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.footer.config(text=f"最後更新：{footer_now}")
        
        self.root.after(CHECK_INTERVAL, self.update_loop)

    def render(self, current_data):
        self.display.config(state=tk.NORMAL)
        self.display.delete('1.0', tk.END)

        # 排序邏輯：1. 次數(大->小) 2. 最高百分比(大->小)
        sorted_list = sorted(self.stats.items(), 
                             key=lambda x: (x[1]['count'], x[1]['max_p']), 
                             reverse=True)

        for kw, info in sorted_list:
            # 排除關鍵字過濾 (移除空格後比對)
            kw_clean = kw.replace(" ", "")
            if any(exclude.replace(" ", "") in kw_clean for exclude in EXCLUDE_KEYWORDS):
                continue
                
            # 格式化顯示，使用固定寬度對齊
            count_str = f"{info['count']}次".ljust(6)
            last_seen = info.get("last_seen", "00-00 00:00").ljust(12)
            max_p_str = f"{info['max_p']}%".ljust(10)
            line = f" {count_str} | {last_seen} |  {max_p_str} | {kw}\n"
            
            # 如果目前這波抓取中包含此關鍵字，且是第一次被抓到
            if info.get("is_new"):
                self.display.insert(tk.END, line, "new_hit")
                info["is_new"] = False # 顯示完就重設標記
            elif info['count'] > 10: # 如果出現超過 10 次，標註為高頻 (金黃色)
                self.display.insert(tk.END, line, "high_freq")
            else:
                self.display.insert(tk.END, line)

        self.display.config(state=tk.DISABLED)

    def start_move(self, event): self.x, self.y = event.x, event.y
    def do_move(self, event):
        x = self.root.winfo_x() + (event.x - self.x)
        y = self.root.winfo_y() + (event.y - self.y)
        self.root.geometry(f"+{x}+{y}")

if __name__ == "__main__":
    RankMonitor()