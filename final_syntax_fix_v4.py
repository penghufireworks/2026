
import re
import json

def final_fix_v4():
    # 1. Read the correct tide data from the source file
    with open('tide_data_4_10.js', 'r', encoding='utf-8') as f:
        source_data = f.read().strip()
    
    # The source data is NOT strict JSON (keys are not quoted)
    # So we'll use a more robust way to parse it or just fix the keys
    
    # Let's fix the keys to be quoted so we can use json.loads
    # {4:[...],5:[...]} -> {"4":[...],"5":[...]}
    fixed_source = re.sub(r'(\d+):', r'"\1":', source_data)
    # Also fix null -> "null" if needed, but null is valid in JSON.
    
    try:
        data_dict = json.loads(fixed_source)
        # Remove month 10
        if "10" in data_dict:
            del data_dict["10"]
        
        # Convert back to JSON string
        clean_json = json.dumps(data_dict, ensure_ascii=False)
        
    except Exception as e:
        print(f"JSON parsing failed: {e}. Falling back to manual extraction.")
        # Manual fallback
        months_data = {}
        for m in range(4, 10):
            start_tag = f'{m}:['
            start_idx = source_data.find(start_tag)
            if start_idx == -1: continue
            bracket_count = 0
            scan_start = source_data.find('[', start_idx)
            for i in range(scan_start, len(source_data)):
                if source_data[i] == '[': bracket_count += 1
                elif source_data[i] == ']':
                    bracket_count -= 1
                    if bracket_count == 0:
                        months_data[m] = source_data[start_idx:i+1]
                        break
        clean_json = '{\n        ' + ',\n        '.join([months_data[m] for m in sorted(months_data.keys())]) + '\n    }'

    # 2. Read yummy.html
    with open('yummy.html', 'r', encoding='utf-8') as f:
        html = f.read()
    
    # 3. Replace the broken tideData2026 object
    # We'll match from 'const tideData2026 = {' to the next '};'
    pattern = r'const tideData2026 = \{.*?\};'
    replacement = f'const tideData2026 = {clean_json};'
    
    new_html = re.sub(pattern, replacement, html, flags=re.DOTALL)
    
    # 4. Final safety check on titles and ranges
    new_html = new_html.replace('2026 摩西分海時刻表 (4月-10月)', '2026 摩西分海時刻表 (4月-9月)')
    new_html = new_html.replace('month >= 4 && month <= 10 ? month : 4', 'month >= 4 && month <= 9 ? month : 4')
    new_html = new_html.replace('今日非 4-10 月公告開放時段', '今日非 4-9 月公告開放時段')
    
    with open('yummy.html', 'w', encoding='utf-8') as f:
        f.write(new_html)
    
    print("yummy.html fixed successfully (v4).")

if __name__ == '__main__':
    final_fix_v4()
