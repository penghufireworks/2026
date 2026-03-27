
import re

def final_fix():
    # 1. Read the correct tide data from the source file
    with open('tide_data_4_10.js', 'r', encoding='utf-8') as f:
        source_data = f.read().strip()
    
    # The source data is an object like {4:[...],5:[...],...,10:[...]}
    # We want to extract exactly what's between "m:[" and the next "m+1:[" or "}"
    
    months = {}
    for m in range(4, 10):
        start_marker = f'{m}:['
        end_marker = f'{m+1}:[' if m < 9 else '},10:[' # Month 10 exists in source
        if m == 9:
            # For month 9, it's followed by 10:
            end_marker = '10:['
            
        start_idx = source_data.find(start_marker)
        end_idx = source_data.find(end_marker)
        
        if m == 9:
             # Find the last ] before 10:[
             obj_part = source_data[start_idx:end_idx].strip().rstrip(',')
             months[m] = obj_part
        else:
             obj_part = source_data[start_idx:end_idx].strip().rstrip(',')
             months[m] = obj_part

    # Rebuild the JS object string
    tide_obj_str = '{\n        ' + ',\n        '.join([months[m] for m in sorted(months.keys())]) + '\n    }'

    # 2. Read yummy.html
    with open('yummy.html', 'r', encoding='utf-8') as f:
        html = f.read()
    
    # 3. Replace the broken tideData2026 object
    pattern = r'const tideData2026 = \{.*?\};'
    replacement = f'const tideData2026 = {tide_obj_str};'
    
    new_html = re.sub(pattern, replacement, html, flags=re.DOTALL)
    
    with open('yummy.html', 'w', encoding='utf-8') as f:
        f.write(new_html)
    
    print("yummy.html syntax errors fixed and tide data restored correctly.")

if __name__ == '__main__':
    final_fix()
