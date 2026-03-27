
import re

def final_fix():
    # 1. Read the correct tide data from the source file
    with open('tide_data_4_10.js', 'r', encoding='utf-8') as f:
        source_data = f.read().strip()
    
    # The source data is an object like {4:[...],5:[...],...,10:[...]}
    # We want months 4-9
    
    # Let's extract each month's array correctly
    months_data = {}
    for m in range(4, 10):
        # Find the start of the month: "m:["
        start_tag = f'{m}:['
        start_idx = source_data.find(start_tag)
        if start_idx == -1: continue
        
        # Find the matching closing bracket for the array [ ... ]
        bracket_count = 0
        end_idx = -1
        # The scan should start from the first '[' of the month's array
        scan_start = source_data.find('[', start_idx)
        for i in range(scan_start, len(source_data)):
            if source_data[i] == '[':
                bracket_count += 1
            elif source_data[i] == ']':
                bracket_count -= 1
                if bracket_count == 0:
                    end_idx = i + 1
                    break
        
        if end_idx != -1:
            # We want to keep "m:[...]"
            months_data[m] = source_data[start_idx:end_idx]

    # Rebuild the JS object string
    tide_obj_str = '{\n        ' + ',\n        '.join([months_data[m] for m in sorted(months_data.keys())]) + '\n    }'

    # 2. Read yummy.html
    with open('yummy.html', 'r', encoding='utf-8') as f:
        html = f.read()
    
    # 3. Replace the broken tideData2026 object
    # We'll use a regex that matches from "const tideData2026 =" to the next "};"
    # To be safe, we'll match until we see "function updateTide"
    pattern = r'const tideData2026 = \{.*?\};'
    replacement = f'const tideData2026 = {tide_obj_str};'
    
    new_html = re.sub(pattern, replacement, html, flags=re.DOTALL)
    
    # 4. Write back
    with open('yummy.html', 'w', encoding='utf-8') as f:
        f.write(new_html)
    
    print("yummy.html syntax errors fixed and tide data restored correctly (v3).")

if __name__ == '__main__':
    final_fix()
