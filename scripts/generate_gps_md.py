import re
import os

def generate_gps_md():
    source_path = os.path.join('src', 'data', 'places.js')
    output_path = os.path.join('docs', 'FOOD_MAP_GPS.md')
    
    # Ensure docs directory exists
    os.makedirs('docs', exist_ok=True)
    
    with open(source_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract place objects
    # We look for patterns like: id: 1, name: "...", ... lat: 23.xxx, lng: 119.xxx
    
    # Regex to find all items
    # We'll use a simplified approach: find all {...} blocks inside placesData
    # Then parse specific fields from each block
    
    # Find the placesData array content
    start_marker = "const placesData = ["
    end_marker = "];"
    
    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker, start_idx)
    
    if start_idx == -1 or end_idx == -1:
        print("Could not find placesData array")
        return

    data_block = content[start_idx:end_idx]
    
    # Split by curly braces to get individual items roughly
    # This is a bit hacky but works for the known format
    items = []
    
    # Regex to extract fields from each line/block
    # Pattern designed for the specific format in places.js
    pattern = re.compile(r'id:\s*(\d+),\s*name:\s*"(.*?)",\s*category:\s*"(.*?)",\s*area:\s*"(.*?)",\s*lat:\s*([\d\.]+),\s*lng:\s*([\d\.]+)')
    
    matches = pattern.findall(data_block)
    
    markdown_content = "# 澎湖百大美食 GPS 定位列表\n\n"
    markdown_content += "本列表包含 100 家精選美食的精準 GPS 定位資料。\n\n"
    markdown_content += "| ID | 店名 | 分類 | 地區 | 緯度 (Lat) | 經度 (Lng) | Google Maps 連結 |\n"
    markdown_content += "|----|------|------|------|------------|------------|------------------|\n"
    
    category_map = {
        'core': '核心必吃',
        'queue': '排隊小吃',
        'scenic': '景點隨餐',
        'hidden': '在地隱藏',
        'feast': '聚餐大菜',
        'cafe': '網美午茶',
        'night': '宵夜必備',
        'gift': '伴手禮'
    }
    
    for match in matches:
        p_id, name, cat, area, lat, lng = match
        cat_name = category_map.get(cat, cat)
        maps_link = f"[導航](https://www.google.com/maps/search/?api=1&query={lat},{lng})"
        markdown_content += f"| {p_id} | {name} | {cat_name} | {area} | {lat} | {lng} | {maps_link} |\n"
        
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(markdown_content)
        
    print(f"Successfully generated {output_path} with {len(matches)} items.")

if __name__ == "__main__":
    generate_gps_md()
