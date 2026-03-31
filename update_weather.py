import requests
import json
import os
from datetime import datetime

# 設定區
API_KEY = os.environ.get('CWA_API_KEY', 'CWA-E7C2B3A9-CB04-43A1-9D6F-75FE9590A029')
# F-D0047-091 是澎湖縣未來一週精細預報
URL = "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-091"

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
        
        records = data.get('records', {})
        locations_list = records.get('Locations', records.get('locations', []))
        if not locations_list:
            raise Exception("找不到 Locations 資料")
            
        location_list = locations_list[0].get('Location', locations_list[0].get('location', []))
        if not location_list:
            raise Exception("找不到 Location 資料")
            
        location_data = location_list[0]
        elements = location_data.get('WeatherElement', location_data.get('weatherElement', []))
        
        # 建立元素對照表，使用中文名稱
        element_map = {el.get('ElementName'): el.get('Time', el.get('time', [])) for el in elements}
        
        processed_data = []
        
        # 抓取主要參考的時段資料 (以天氣現象為準)
        wx_key = '天氣現象'
        if wx_key not in element_map:
            raise Exception(f"找不到天氣預報資料欄位 '天氣現象'")

        # 映射表：(中文 ElementName, Value Key)
        mapping = {
            'wx': ('天氣現象', 'Weather'),
            'pop': ('12小時降雨機率', 'ProbabilityOfPrecipitation'),
            'minT': ('最低溫度', 'MinTemperature'),
            'maxT': ('最高溫度', 'MaxTemperature'),
            'ws': ('風速', 'WindSpeed'),
            'uvi': ('紫外線指數', 'UVIndex')
        }
        
        # 實際可用的時段數量
        num_slots = len(element_map[wx_key])
        
        for i in range(num_slots):
            time_entry = element_map[wx_key][i]
            start_time = time_entry.get('StartTime', time_entry.get('startTime'))
            
            # 格式化時間，只保留日期與時段描述
            try:
                if 'T' in start_time:
                    base_time = start_time.split('+')[0]
                    dt = datetime.strptime(base_time, "%Y-%m-%dT%H:%M:%S")
                else:
                    dt = datetime.strptime(start_time, "%Y-%m-%d %H:%M:%S")
            except Exception as te:
                print(f"時間解析失敗: {start_time}, 錯誤: {te}")
                continue

            time_label = "白天" if 6 <= dt.hour < 18 else "晚上"
            date_str = dt.strftime("%m/%d")

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
                            # 優先取指定的 val_key，若無則取第一個 key
                            return vals[0].get(val_key, list(vals[0].values())[0])
                return "0"

            wx = get_val('wx', i)
            pop = get_val('pop', i)
            min_t = get_val('minT', i)
            max_t = get_val('maxT', i)
            ws = get_val('ws', i)
            
            # 紫外線資訊通常只有白天時段才有 (每 24 小時一筆)
            uvi = "0"
            if time_label == "白天":
                uvi_idx = i // 2
                uvi = get_val('uvi', uvi_idx)

            # 風力預警邏輯
            try:
                # 處理可能帶單位的數值
                ws_clean = ws.split(' ')[0] if isinstance(ws, str) else ws
                ws_val = float(ws_clean)
                if ws_val >= 10:
                    warning = "強風預警 (無人機可能暫停)"
                elif ws_val >= 7:
                    warning = "陣風較強 (請留意公告)"
                else:
                    warning = "風速適中"
            except:
                warning = "無資料"

            item = {
                "date": date_str,
                "period": time_label,
                "wx": wx,
                "pop": pop if pop != " " and pop != "" else "0",
                "minT": min_t,
                "maxT": max_t,
                "ws": ws,
                "uvi": uvi,
                "warning": warning
            }
            processed_data.append(item)

        # 儲存成精簡的 JSON 檔
        output_path = os.path.join(os.getcwd(), 'weather_7day.json')
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(processed_data, f, ensure_ascii=False, indent=4)
            
        print(f"成功更新！最後更新時間：{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

    except Exception as e:
        print(f"抓取失敗：{e}")

if __name__ == "__main__":
    fetch_penghu_7day_weather()
