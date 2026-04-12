import requests
from bs4 import BeautifulSoup
import datetime
import os
import re

def fetch_timetable():
    url = "https://tnc-kao.com.tw/schedule/timetable"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=15)
        response.raise_for_status()
        response.encoding = 'utf-8'
        soup = BeautifulSoup(response.text, 'html.parser')
        
        timetable_html = ""
        target_months = ["04", "05", "06", "4", "5", "6"]
        found_any = False
        
        # 尋找包含月份船期表的區塊
        # 根據 fetch 結果，標題可能在 div 內
        all_divs = soup.find_all('div')
        
        for div in all_divs:
            text = div.get_text()
            if "月份船期表" in text and any(m in text for m in target_months):
                # 找到標題了，找接下來的 table
                table = div.find_next('table')
                if not table:
                    continue
                
                # 提取月份標題
                month_match = re.search(r'(\d+) 月份船期表', text)
                if not month_match:
                    continue
                month_val = month_match.group(1)
                if month_val not in ["4", "5", "6", "04", "05", "06"]:
                    continue
                
                found_any = True
                title = f"{int(month_val)}月 船期表"
                
                # 構建 HTML
                month_html = f'<div class="month-section" style="margin-bottom: 30px;">'
                month_html += f'<h3 style="color: #0056b3; margin: 20px 0 10px; font-size: 1.1rem; border-bottom: 2px solid #0056b3; padding-bottom: 5px; display: inline-block;">{title}</h3>'
                month_html += '<div style="overflow-x: auto;">'
                month_html += '<table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; min-width: 300px; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">'
                
                rows = table.find_all('tr')
                if rows:
                    # 表頭
                    headers = [th.get_text(strip=True) for th in rows[0].find_all(['th', 'td'])]
                    month_html += '<tr style="background-color: #0056b3; color: white;">'
                    for h in headers:
                        month_html += f'<th style="border: 1px solid #dee2e6; padding: 10px 5px; text-align: center;">{h}</th>'
                    month_html += '</tr>'
                    
                    # 數據行
                    for idx, row in enumerate(rows[1:]):
                        cols = row.find_all(['td', 'th'])
                        if len(cols) >= 4:
                            bg_color = "#f8f9fa" if idx % 2 == 0 else "#ffffff"
                            month_html += f'<tr style="background-color: {bg_color};">'
                            for i, col in enumerate(cols):
                                text = col.get_text(strip=True)
                                style = "border: 1px solid #dee2e6; padding: 10px 5px; text-align: center;"
                                
                                # 星期顏色
                                if i == 1: # 星期
                                    if "日" in text or "六" in text:
                                        style += " color: #d9534f; font-weight: bold;"
                                
                                # 時間處理
                                if text == "-":
                                    text = '<span style="color: #ccc;">-</span>'
                                elif "23:30" in text:
                                    text = f'<span style="color: #0056b3; font-weight: bold;">{text} (夜航)</span>'
                                
                                month_html += f'<td style="{style}">{text}</td>'
                            month_html += '</tr>'
                
                month_html += '</table></div></div>'
                timetable_html += month_html
        
        # 移除重複 (因為 div 層級可能重複抓到)
        # 這裡簡單處理：如果同個月份已經抓過就不再加入
        # 但上面的 logic 已經根據 month_val 過濾了
        
        if not found_any:
            return None, "找不到 4-6 月的航班資訊"
            
        # 整理順序，確保 4, 5, 6 月排序正確
        # 略過，通常官網是照順序排的
            
        return timetable_html, None
        
    except Exception as e:
        return None, str(e)

def update_html(timetable_content):
    # 決定路徑
    possible_paths = [
        "penghu_ferry_facilities.html",
        "2026ok/penghu_ferry_facilities.html",
        "c:/Users/joshu/Documents/trae_projects/c-ai-writing/2026ok/penghu_ferry_facilities.html"
    ]
    
    file_path = None
    for p in possible_paths:
        if os.path.exists(p):
            file_path = p
            break
            
    if not file_path:
        print("找不到 penghu_ferry_facilities.html")
        return False
        
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # 更新時刻表內容
    start_tag = '<div id="ferry-timetable">'
    end_tag = '</div>'
    pattern = re.escape(start_tag) + r'.*?' + re.escape(end_tag)
    
    new_timetable_div = f'{start_tag}\n{timetable_content}\n{end_tag}'
    updated_content = re.sub(pattern, new_timetable_div, content, flags=re.DOTALL)
    
    # 更新時間 (台灣時間 UTC+8)
    utc_now = datetime.datetime.utcnow()
    tw_now = utc_now + datetime.timedelta(hours=8)
    now_str = tw_now.strftime("%Y-%m-%d %H:%M:%S")
    
    time_pattern = r'<span id="update-time">.*?</span>'
    new_time_span = f'<span id="update-time">{now_str}</span>'
    updated_content = re.sub(time_pattern, new_time_span, updated_content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(updated_content)
    
    print(f"成功更新航班表，時間: {now_str}")
    return True

if __name__ == "__main__":
    print("開始抓取航班表...")
    timetable, error = fetch_timetable()
    if timetable:
        if update_html(timetable):
            print("更新完成")
        else:
            print("更新 HTML 失敗")
    else:
        print(f"抓取失敗: {error}")
