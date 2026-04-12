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
        processed_months = set()
        found_any = False
        
        # 1. 尋找「高雄 ↔︎ 澎湖船期表」標題區塊
        main_header = soup.find(string=re.compile(r"高雄\s*↔︎?\s*澎湖船期表"))
        
        if main_header:
            print(f"找到主標題: {main_header.strip()}")
            # 找到標題後，搜尋它之後的所有內容
            search_area = main_header.parent
            all_elements = search_area.find_all_next(string=re.compile(r"(\d+)\s*月(份)?船期表"))
        else:
            print("找不到主標題，執行全域搜尋")
            all_elements = soup.find_all(string=re.compile(r"(\d+)\s*月(份)?船期表"))
        
        month_data = {} # 使用字典儲存，避免重複並方便排序
        
        for element in all_elements:
            parent = element.parent
            text = element.strip()
            print(f"檢查元素: {text}")
            
            # 1. 排除包含 "icon" 或 "下載" 的文字 (這些通常是 PDF 下載按鈕)
            if 'icon' in text.lower() or '下載' in text or 'pdf' in text.lower():
                continue
                
            # 2. 排除 PDF 下載連結 (通常在 <a> 標籤內或包含 .pdf)
            is_pdf_link = False
            curr = parent
            for _ in range(3): # 向上檢查三層
                if curr.name == 'a':
                    href = curr.get('href', '')
                    if '.pdf' in href.lower():
                        is_pdf_link = True
                        break
                if not curr.parent: break
                curr = curr.parent
            
            if is_pdf_link:
                continue
            
            # 3. 提取月份 (支援 "4 月份船期表" 或 "115年4月船期表")
            month_match = re.search(r'(\d+)\s*月(份)?船期表', text)
            if not month_match:
                continue
                
            month_val = int(month_match.group(1))
            month_str = str(month_val)
            
            # 只處理目標月份 (4, 5, 6 月)
            if month_str not in ["4", "5", "6"]:
                continue
                
            # 如果這個月份已經抓過且成功，就跳過 (避免重複)
            if month_str in month_data:
                continue
                
            # 4. 尋找對應的表格
            # 檢查標題是否就在 table 裡面 (th/td)
            table = element.find_parent('table')
            
            if not table:
                # 如果不在 table 裡，才找下一個 table
                table = parent.find_next('table')
                
            if not table:
                # 嘗試從更高等級的父節點找下一個 table
                curr = parent
                for _ in range(3):
                    if curr.parent:
                        curr = curr.parent
                        table = curr.find_next('table')
                        if table: break
            
            if not table:
                print(f"找不到 {month_str} 月份的表格")
                continue
                
            print(f"成功對應 {month_str} 月份表格，列數: {len(table.find_all('tr'))}")
            found_any = True
            title = f"{month_str}月 船期表"
            
            # 構建 HTML
            month_html = f'<div class="month-section" style="margin-bottom: 30px;">'
            month_html += f'<h3 style="color: #0056b3; margin: 20px 0 10px; font-size: 1.1rem; border-bottom: 2px solid #0056b3; padding-bottom: 5px; display: inline-block;">{title}</h3>'
            month_html += '<div style="overflow-x: auto;">'
            month_html += '<table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; min-width: 300px; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">'
            
            rows = table.find_all('tr')
            if rows:
                # 處理表頭：有時第一行是跨欄的月份標題
                start_row = 0
                first_row_cols = rows[0].find_all(['th', 'td'])
                if len(first_row_cols) == 1:
                    # 第一行是標題，跳過它，使用第二行作為表頭
                    start_row = 1
                    headers = [th.get_text(strip=True) for th in rows[1].find_all(['th', 'td'])]
                    # 如果第二行看起來也不像表頭 (太短)，則再往下一行
                    if len(headers) < 3 and len(rows) > 2:
                        start_row = 2
                        headers = [th.get_text(strip=True) for th in rows[2].find_all(['th', 'td'])]
                else:
                    headers = [th.get_text(strip=True) for th in first_row_cols]
                
                # 生成表頭 HTML
                month_html += '<tr style="background-color: #0056b3; color: white;">'
                for h in headers:
                    # 移除英文部分以簡化移動端顯示 (選做)
                    # h = re.sub(r'[a-zA-Z\.\s/]+', '', h) 
                    month_html += f'<th style="border: 1px solid #dee2e6; padding: 10px 5px; text-align: center;">{h}</th>'
                month_html += '</tr>'
                
                # 數據行
                for idx, row in enumerate(rows[start_row+1:]):
                    cols = row.find_all(['td', 'th'])
                    if len(cols) >= 3: # 日期, 星期, 高雄, 澎湖 (至少要3欄)
                        bg_color = "#f8f9fa" if idx % 2 == 0 else "#ffffff"
                        month_html += f'<tr style="background-color: {bg_color};">'
                        for i, col in enumerate(cols):
                            cell_text = col.get_text(strip=True)
                            style = "border: 1px solid #dee2e6; padding: 10px 5px; text-align: center;"
                            
                            # 星期顏色 (通常在第2欄，索引 1)
                            if i == 1: 
                                if "日" in cell_text or "六" in cell_text:
                                    style += " color: #d9534f; font-weight: bold;"
                            
                            # 時間處理
                            if cell_text == "-" or not cell_text:
                                cell_text = '<span style="color: #ccc;">-</span>'
                            elif "23:30" in cell_text:
                                cell_text = f'<span style="color: #0056b3; font-weight: bold;">{cell_text} (夜航)</span>'
                            
                            month_html += f'<td style="{style}">{cell_text}</td>'
                        month_html += '</tr>'
            
            month_html += '</table></div></div>'
            month_data[month_val] = month_html
            
        # 按月份排序 (4, 5, 6)
        sorted_months = sorted(month_data.keys())
        for m in sorted_months:
            timetable_html += month_data[m]

        
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
    start_marker = '<!-- ferry-timetable-start -->'
    end_marker = '<!-- ferry-timetable-end -->'
    pattern = re.escape(start_marker) + r'.*?' + re.escape(end_marker)
    
    new_content_block = f'{start_marker}\n{timetable_content}\n{end_marker}'
    
    if start_marker in content and end_marker in content:
        updated_content = re.sub(pattern, new_content_block, content, flags=re.DOTALL)
    else:
        # 如果找不到 marker，則退回到舊的 ID 替換方式，但要更精確
        start_tag = '<div id="ferry-timetable">'
        # 這裡我們不找 </div>，而是找下一個明顯的標籤或段落
        pattern = re.escape(start_tag) + r'.*?(?=<p style="font-size: 0\.8rem)'
        new_timetable_div = f'{start_tag}\n{start_marker}\n{timetable_content}\n{end_marker}\n</div>\n'
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
