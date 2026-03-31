import requests
import json
import os
from datetime import datetime, timedelta

# 設定區
API_KEY = os.environ.get('CWA_API_KEY', 'CWA-E7C2B3A9-CB04-43A1-9D6F-75FE9590A029')
# F-D0047-091 是全台縣市未來一週預報
URL = "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-091"

def fetch_penghu_7day_weather():
    params = {
        "Authorization": API_KEY,
        "locationName": "澎湖縣",
        "format": "JSON"
    }

    try:
        response = requests.get(URL, params=params)
        response.raise_for_status()
        data = response.json()
        
        # 提取澎湖縣資料 (處理大小寫與結構差異)
        records = data.get('records', {})
        locations_list = records.get('Locations', records.get('locations', []))
        if not locations_list:
            raise Exception("找不到 Locations 資料")
            
        location_list = locations_list[0].get('Location', locations_list[0].get('location', []))
        penghu_data = None
        for loc in location_list:
            if loc.get('LocationName') == '澎湖縣':
                penghu_data = loc
                break
        
        if not penghu_data:
            raise Exception("找不到「澎湖縣」的氣象資料")
            
        elements = penghu_data.get('WeatherElement', penghu_data.get('weatherElement', []))
        element_map = {el.get('ElementName'): el.get('Time', el.get('time', [])) for el in elements}
        
        processed_data = []
        
        # 映射表
        mapping = {
            'wx': ('天氣現象', 'Weather'),
            'pop': ('12小時降雨機率', 'ProbabilityOfPrecipitation'),
            'minT': ('最低溫度', 'MinTemperature'),
            'maxT': ('最高溫度', 'MaxTemperature'),
            'ws': ('風速', 'WindSpeed'),
            'uvi': ('紫外線指數', 'UVIndex')
        }
        
        wx_key = '天氣現象'
        num_slots = len(element_map[wx_key])
        
        for i in range(num_slots):
            time_entry = element_map[wx_key][i]
            start_time_str = time_entry.get('StartTime', time_entry.get('startTime'))
            
            # 格式化時間
            try:
                if 'T' in start_time_str:
                    base_time = start_time_str.split('+')[0]
                    dt = datetime.strptime(base_time, "%Y-%m-%dT%H:%M:%S")
                else:
                    dt = datetime.strptime(start_time_str, "%Y-%m-%d %H:%M:%S")
            except:
                continue

            # 判斷時段與日期
            # 氣象局 12 小時預報通常是 06:00-18:00 (白天) 與 18:00-06:00 (晚上)
            # 若為 00:00 開始，通常是第一天的前 6 小時補償，我們將其歸類為「晚上」並標註為前一天的日期
            if dt.hour == 0:
                time_label = "晚上"
                display_date = (dt - timedelta(days=1)).strftime("%m/%d")
            elif dt.hour == 6:
                time_label = "白天"
                display_date = dt.strftime("%m/%d")
            elif dt.hour == 18:
                time_label = "晚上"
                display_date = dt.strftime("%m/%d")
            else:
                time_label = "白天" if 6 <= dt.hour < 18 else "晚上"
                display_date = dt.strftime("%m/%d")

            # 提取各項數值
            def get_val(key_name, idx):
                info = mapping.get(key_name)
                if not info: return "0"
                real_key, val_key = info
                if real_key in element_map:
                    time_list = element_map[real_key]
                    if idx < len(time_list):
                        vals = time_list[idx].get('ElementValue', time_list[idx].get('elementValue', []))
                        if vals:
                            return vals[0].get(val_key, list(vals[0].values())[0])
                return "0"

            wx = get_val('wx', i)
            pop = get_val('pop', i)
            min_t = get_val('minT', i)
            max_t = get_val('maxT', i)
            ws = get_val('ws', i)
            
            uvi = "0"
            if time_label == "白天":
                # 紫外線通常只有白天有，且索引可能不同 (每 24h 一筆)
                # 這裡尋找最接近該日期的紫外線資料
                uvi_found = False
                for u_idx in range(len(element_map.get('紫外線指數', []))):
                    u_time = element_map['紫外線指數'][u_idx].get('StartTime', element_map['紫外線指數'][u_idx].get('startTime'))
                    if display_date in u_time:
                        uvi = get_val('uvi', u_idx)
                        uvi_found = True
                        break
                if not uvi_found:
                    uvi = "0"

            # 風力預警邏輯 (增強型)
            warning = "風速適中"
            try:
                # 處理 ">= 11" 或 "8-10" 這種字串
                ws_str = str(ws).replace('>=', '').replace('<=', '').split('-')[-1].strip()
                ws_val = float(ws_str)
                if ws_val >= 10:
                    warning = "強風預警 (無人機可能暫停)"
                elif ws_val >= 7:
                    warning = "陣風較強 (請留意公告)"
            except:
                warning = "無資料"

            processed_data.append({
                "date": display_date,
                "period": time_label,
                "wx": wx,
                "pop": pop if pop not in [" ", "", "-"] else "0",
                "minT": min_t,
                "maxT": max_t,
                "ws": ws,
                "uvi": uvi,
                "warning": warning,
                "sort_key": dt.timestamp()
            })

        # 排序並過濾
        processed_data.sort(key=lambda x: x['sort_key'])
        
        # 移除重複或過時時段 (例如同時有 00:00 和 06:00 的情況)
        final_data = []
        seen = set()
        for item in processed_data:
            key = f"{item['date']}_{item['period']}"
            if key not in seen:
                final_data.append(item)
                seen.add(key)
            del item['sort_key']

        # 儲存 JSON
        output_path = os.path.join(os.getcwd(), 'weather_7day.json')
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(final_data[:14], f, ensure_ascii=False, indent=4) # 最多取 14 個時段 (7天)
            
        print(f"成功更新澎湖縣馬公市資料！最後更新時間：{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

    except Exception as e:
        print(f"抓取失敗：{e}")

if __name__ == "__main__":
    fetch_penghu_7day_weather()
