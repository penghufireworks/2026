
import re
import json

def fix_yummy():
    # 1. Read the correct tide data (4-10)
    with open('tide_data_4_10.js', 'r', encoding='utf-8') as f:
        tide_content = f.read().strip()
    
    # Extract the object content manually to avoid JSON parsing issues with non-quoted keys
    # Actually, the format is {4:[...], 5:[...], ...}
    # We want months 4, 5, 6, 7, 8, 9
    
    months_to_keep = {}
    for m in range(4, 10):
        # Find the start of month m: m:[
        start_pattern = rf'{m}:\['
        match = re.search(start_pattern, tide_content)
        if not match: continue
        start_idx = match.start()
        
        # Find the matching closing bracket for this month's array
        bracket_count = 0
        end_idx = -1
        # Start scanning from the first [
        first_bracket_idx = tide_content.find('[', start_idx)
        for i in range(first_bracket_idx, len(tide_content)):
            if tide_content[i] == '[':
                bracket_count += 1
            elif tide_content[i] == ']':
                bracket_count -= 1
                if bracket_count == 0:
                    end_idx = i + 1
                    break
        
        if end_idx != -1:
            months_to_keep[m] = tide_content[start_idx:end_idx]

    # Rebuild the object string
    new_tide_obj = '{\n    ' + ',\n    '.join([months_to_keep[m] for m in sorted(months_to_keep.keys())]) + '\n    }'

    # 2. Read yummy.html
    with open('yummy.html', 'r', encoding='utf-8') as f:
        html = f.read()
    
    # 3. Replace the broken tideData2026 object
    # The broken object starts with 'const tideData2026 = {' and ends with '};'
    pattern = r'const tideData2026 = \{.*?\};'
    replacement = f'const tideData2026 = {new_tide_obj};'
    
    new_html = re.sub(pattern, replacement, html, flags=re.DOTALL)
    
    # 4. Write back
    with open('yummy.html', 'w', encoding='utf-8') as f:
        f.write(new_html)
    
    print("yummy.html has been fixed with correct 4-9 month tide data.")

if __name__ == '__main__':
    fix_yummy()
