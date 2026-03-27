import re

def extract():
    with open('tide_data_4_10.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Simple extraction logic for JS object literal parts
    months = {}
    for m in range(1, 13):
        # Look for m:[...]
        pattern = rf'({m}:\[.*?\])(?=,\d+:|}})'
        match = re.search(pattern, content)
        if match:
            months[m] = match.group(1)
            
    with open('tide_final.js', 'w', encoding='utf-8') as f:
        f.write('const tideData2026 = {\n')
        for m in range(1, 13):
            if m in months:
                f.write(f'  {months[m]},\n')
        f.write('};\n')

if __name__ == '__main__':
    extract()
