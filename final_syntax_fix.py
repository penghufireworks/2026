
import re

def final_fix():
    # 1. Read the correct tide data from the source file
    with open('tide_data_4_10.js', 'r', encoding='utf-8') as f:
        source_data = f.read().strip()
    
    # Extract month arrays (4-9)
    months = {}
    for m in range(4, 10):
        # Look for "m:[...]"
        # We use a non-greedy match that stops at the end of the array
        # Since arrays are [{...},{...}], we look for the pattern m:[{...}]
        pattern = rf'{m}:\[{{.*?}}\]'
        match = re.search(pattern, source_data, re.DOTALL)
        if match:
            months[m] = match.group(0)
    
    # Rebuild the JS object string
    tide_obj_str = '{\n        ' + ',\n        '.join([months[m] for m in sorted(months.keys())]) + '\n    }'

    # 2. Read yummy.html
    with open('yummy.html', 'r', encoding='utf-8') as f:
        html = f.read()
    
    # 3. Replace the broken tideData2026 object
    # We'll use a very broad match for the broken object to ensure we catch it all
    pattern = r'const tideData2026 = \{.*?\};'
    replacement = f'const tideData2026 = {tide_obj_str};'
    
    new_html = re.sub(pattern, replacement, html, flags=re.DOTALL)
    
    # 4. Double check if any other syntax errors exist in the script
    # Ensure updateTide logic matches the 4-9 month range
    new_html = new_html.replace('month >= 4 && month <= 10 ? month : 4', 'month >= 4 && month <= 9 ? month : 4')
    new_html = new_html.replace('今日非 4-10 月公告開放時段', '今日非 4-9 月公告開放時段')
    new_html = new_html.replace('for (let m = 4; m <= 10; m++)', 'for (let m = 4; m <= 9; m++)')

    # 5. Write back
    with open('yummy.html', 'w', encoding='utf-8') as f:
        f.write(new_html)
    
    print("yummy.html syntax errors fixed and tide data restored.")

if __name__ == '__main__':
    final_fix()
