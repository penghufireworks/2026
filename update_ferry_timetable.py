import requests
from bs4 import BeautifulSoup
import re
import os
import datetime

def scrape_timetable():
    url = "https://tnc-kao.com.tw/schedule/timetable"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=15)
        response.encoding = 'utf-8'
        soup = BeautifulSoup(response.text, 'html.parser')
        
        timetable_html = ""
        target_months = ["04", "05", "06", "4", "5", "6"]
        processed_months = set()
        found_any = False
        
        # 1. 尋找「高雄 ↔︎ 澎湖船期表」標題區塊
        main_header = soup.find(string=re.compile(r"高雄\s*↔︎?\s*澎湖船期表"))
        
        if main_header:
            # 找到標題後，搜尋它之後的所有內容
            search_area = main_header.parent
            all_elements = search_area.find_all_next(string=re.compile(r"(\d+)\s*月(份)?船期表"))
        else:
            all_elements = soup.find_all(string=re.compile(r"(\d+)\s*月(份)?船期表"))
        
        month_data = {} # 使用字典儲存，避免重複並方便排序
        
        for element in all_elements:
            parent = element.parent
            text = element.strip()
            
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
            
            # 3. 提取月份
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
            table = element.find_parent('table')
            if not table:
                table = parent.find_next('table')
            if not table:
                curr = parent
                for _ in range(3):
                    if curr.parent:
                        curr = curr.parent
                        table = curr.find_next('table')
                        if table: break
            
            if not table:
                continue
                
            found_any = True
            title = f"{month_str}月 船期表"
            
            # 構建 HTML
            month_html = f'<div class="month-section" style="margin-bottom: 30px;">'
            # 移除 sticky-month 類別相關的固定邏輯，僅保留樣式類別
            month_html += f'<h3 class="sticky-month">{title}</h3>'
            month_html += '<div class="table-container">'
            month_html += '<table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; min-width: 300px; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">'
            
            rows = table.find_all('tr')
            if rows:
                start_row = 0
                first_row_cols = rows[0].find_all(['th', 'td'])
                if len(first_row_cols) == 1:
                    start_row = 1
                    headers = [th.get_text(strip=True) for th in rows[1].find_all(['th', 'td'])]
                    if len(headers) < 3 and len(rows) > 2:
                        start_row = 2
                        headers = [th.get_text(strip=True) for th in rows[2].find_all(['th', 'td'])]
                else:
                    headers = [th.get_text(strip=True) for th in first_row_cols]
                
                # 生成表頭 HTML
                month_html += '<thead><tr style="background-color: #0056b3; color: white;">'
                for h in headers:
                    h_simple = re.sub(r'[a-zA-Z\.\s/]+', '', h)
                    month_html += f'<th style="border: 1px solid #dee2e6; padding: 12px 5px; text-align: center; white-space: nowrap;">{h_simple}</th>'
                month_html += '</tr></thead>'
                
                # 數據行
                month_html += '<tbody>'
                for idx, row in enumerate(rows[start_row+1:]):
                    cols = row.find_all(['td', 'th'])
                    if len(cols) >= 3:
                        bg_color = "#f8f9fa" if idx % 2 == 0 else "#ffffff"
                        month_html += f'<tr style="background-color: {bg_color};">'
                        for i, col in enumerate(cols):
                            cell_text = col.get_text(strip=True)
                            style = "border: 1px solid #dee2e6; padding: 10px 5px; text-align: center;"
                            if i == 1: 
                                if "日" in cell_text or "六" in cell_text:
                                    style += " color: #d9534f; font-weight: bold;"
                            if cell_text == "-" or not cell_text:
                                cell_text = '<span style="color: #ccc;">-</span>'
                            elif "23:30" in cell_text:
                                cell_text = f'<span style="color: #0056b3; font-weight: bold;">{cell_text} (夜航)</span>'
                            month_html += f'<td style="{style}">{cell_text}</td>'
                        month_html += '</tr>'
                month_html += '</tbody>'
            
            month_html += '</table></div></div>'
            month_data[month_val] = month_html
            
        sorted_months = sorted(month_data.keys())
        for m in sorted_months:
            timetable_html += month_data[m]
        
        if not found_any:
            return None, "找不到 4-6 月的航班資訊"
            
        return timetable_html, None
        
    except Exception as e:
        return None, str(e)

def update_html(timetable_content):
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
        
    start_marker = '<!-- ferry-timetable-start -->'
    end_marker = '<!-- ferry-timetable-end -->'
    pattern = re.escape(start_marker) + r'.*?' + re.escape(end_marker)
    
    new_content_block = f'{start_marker}\n{timetable_content}\n{end_marker}'
    
    if start_marker in content and end_marker in content:
        updated_content = re.sub(pattern, new_content_block, content, flags=re.DOTALL)
    else:
        start_tag = '<div id="ferry-timetable">'
        pattern = re.escape(start_tag) + r'.*?(?=<p style="font-size: 0\.8rem)'
        new_timetable_div = f'{start_tag}\n{start_marker}\n{timetable_content}\n{end_marker}\n</div>\n'
        updated_content = re.sub(pattern, new_timetable_div, content, flags=re.DOTALL)
    
    utc_now = datetime.datetime.utcnow()
    tw_now = utc_now + datetime.timedelta(hours=8)
    now_str = tw_now.strftime("%Y-%m-%d %H:%M:%S")
    
    time_pattern = r'<span id="update-time">.*?</span>'
    new_time_span = f'<span id="update-time">{now_str}</span>'
    updated_content = re.sub(time_pattern, new_time_span, updated_content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(updated_content)
    
    return True

if __name__ == "__main__":
    content, error = scrape_timetable()
    if error:
        print(f"抓取失敗: {error}")
    else:
        if update_html(content):
            print("時刻表更新成功！")
        else:
            print("HTML 更新失敗。")
