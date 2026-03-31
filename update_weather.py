import requests
import json
import os
from datetime import datetime, timedelta

# 設定區
API_KEY = os.environ.get('CWA_API_KEY', 'CWA-E7C2B3A9-CB04-43A1-9D6F-75FE9590A029')
# F-D0047-047 是澎湖縣各鄉鎮未來一週預報 (最精確)
URL = "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-047"

def fetch_penghu_7day_weather():
    params = {
        "Authorization": API_KEY,
        "locationName": "馬公市",
        "format": "JSON"
    }

    try:
        response = requests.get(URL, params=params)
        response.raise_for_status()
        data = response.json()
        
        # 提取馬公市資料
        records = data.get('records', {})
        locations_list = records.get('locations', records.get('Locations', []))
        if not locations_list:
            raise Exception("找不到 Locations 資料")
            
        location_list = locations_list[0].get('location', locations_list[0].get('Location', []))
        magong_data = None
        for loc in location_list:
            if loc.get('locationName') == '馬公市' or loc.get('LocationName') == '馬公市':
                magong_data = loc
                break
        
        if not magong_data:
            raise Exception("找不到「馬公市」的氣象資料")
            
        elements = magong_data.get('weatherElement', magong_data.get('WeatherElement', []))
        
        # 建立元素地圖，方便按時間尋找
        # 結構: { 'ElementName': { 'StartTime': 'Value' } }
        element_lookup = {}
        
        # 映射表：(中文 ElementName, Value Key)
        mapping = {
            'wx': ('天氣現象', 'Weather'),
            'pop': ('12小時降雨機率', 'ProbabilityOfPrecipitation'),
            'minT': ('最低溫度', 'MinTemperature'),
            'maxT': ('最高溫度', 'MaxTemperature'),
            'ws': ('風速', 'WindSpeed'),
            'uvi': ('紫外線指數', 'UVIndex')
        }

        for el in elements:
            e_name = el.get('elementName', el.get('ElementName'))
            times = el.get('time', el.get('Time', []))
            element_lookup[e_name] = {}
            for t in times:
                st = t.get('startTime', t.get('StartTime'))
                vals = t.get('elementValue', t.get('ElementValue', []))
                if vals:
                    # 儲存所有可能的 value key 以防萬一
                    val_dict = vals[0]
                    element_lookup[e_name][st] = val_dict

        # 以「天氣現象」的時段作為基準
        wx_key = '天氣現象'
        if wx_key not in element_lookup:
            raise Exception("資料中缺少 '天氣現象' 欄位")

        base_times = sorted(element_lookup[wx_key].keys())
        processed_data = []
        
        for st in base_times:
            # 格式化時間
            try:
                if 'T' in st:
                    base_time = st.split('+')[0]
                    dt = datetime.strptime(base_time, "%Y-%m-%dT%H:%M:%S")
                else:
                    dt = datetime.strptime(st, "%Y-%m-%d %H:%M:%S")
            except:
                continue

            # 判斷時段與日期
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

            # 提取各項數值 (精確匹配時間)
            def get_exact_val(key_name, target_st):
                info = mapping.get(key_name)
                if not info: return "0"
                real_key, val_key = info
                
                if real_key in element_lookup:
                    # 紫外線 (UVI) 的時間點可能不同，需要特別處理
                    if key_name == 'uvi':
                        # 尋找同一天且包含 12:00 的時段
                        for u_st, u_vals in element_lookup[real_key].items():
                            if display_date in u_st:
                                return u_vals.get(val_key, list(u_vals.values())[0])
                        return "0"
                    
                    # 其他一般項目直接匹配時間
                    if target_st in element_lookup[real_key]:
                        val_dict = element_lookup[real_key][target_st]
                        return val_dict.get(val_key, list(val_dict.values())[0])
                return "0"

            wx = get_exact_val('wx', st)
            pop = get_exact_val('pop', st)
            min_t = get_exact_val('minT', st)
            max_t = get_exact_val('maxT', st)
            ws = get_exact_val('ws', st)
            uvi = get_exact_val('uvi', st) if time_label == "白天" else "0"

            # 處理風速字串
            try:
                ws_clean = str(ws).replace('>=', '').replace('<=', '').split('-')[-1].strip()
                ws_val = float(ws_clean)
            except:
                ws_val = 0

            processed_data.append({
                "date": display_date,
                "period": time_label,
                "wx": wx,
                "pop": pop if pop not in [" ", "", "-"] else "0",
                "minT": min_t,
                "maxT": max_t,
                "ws": ws,
                "uvi": uvi,
                "sort_key": dt.timestamp()
            })

        # 排序並過濾重複
        processed_data.sort(key=lambda x: x['sort_key'])
        
        final_data = []
        seen = set()
        for item in processed_data:
            key = f"{item['date']}_{item['period']}"
            if key not in seen:
                # 檢查日期是否為今天或未來 (避免出現昨天的晚上)
                today_str = datetime.now().strftime("%m/%d")
                # 這裡簡單處理：只要有 14 個就夠了
                final_data.append(item)
                seen.add(key)
            del item['sort_key']

        # 儲存 JSON (移除 warning 欄位)
        output_path = os.path.join(os.getcwd(), 'weather_7day.json')
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(final_data[:14], f, ensure_ascii=False, indent=4)
            
        print(f"成功更新馬公市精確資料！最後更新時間：{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

    except Exception as e:
        print(f"抓取失敗：{e}")

if __name__ == "__main__":
    fetch_penghu_7day_weather()
