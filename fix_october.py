
import re

with open('yummy.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Correct October data
oct_data = '  10:[{date:"01",day:"四",tides:[{high:"07:32",low:"01:26",range:"08:00-09:30"}],special:null},{date:"02",day:"五",tides:[{high:"08:25",low:"02:05",range:"08:00-10:00"}],special:null},{date:"03",day:"六",tides:[{high:"09:29",low:"02:52",range:"08:00-11:30"}],special:null},{date:"04",day:"日",tides:[{high:"10:46",low:"03:51",range:"08:00-12:30"}],special:null},{date:"05",day:"一",tides:[{high:"12:09",low:"05:13",range:"08:30-14:00"}],special:null},{date:"06",day:"二",tides:[{high:"13:28",low:"06:48",range:"10:00-15:30"}],special:null},{date:"07",day:"三",tides:[{high:"14:36",low:"08:09",range:"11:30-16:30"}],special:null},{date:"08",day:"四",tides:[{high:"15:33",low:"09:14",range:"12:30-17:30"}],special:null},{date:"09",day:"五",tides:[{high:"16:19",low:"10:08",range:"13:30-17:30"}],special:null},{date:"10",day:"六",tides:[{high:"16:57",low:"10:54",range:"14:00-17:30"}],special:null},{date:"11",day:"日",tides:[{high:"17:29",low:"11:37",range:"15:00-17:30"}],special:null},{date:"12",day:"一",tides:[{high:"17:57",low:"12:16",range:"15:30-17:30"}],special:null},{date:"13",day:"二",tides:[{high:"06:24",low:"00:10",range:"08:00-08:30"},{high:"12:53",low:"18:26",range:"16:00-17:30"}],special:null},{date:"14",day:"三",tides:[{high:"06:55",low:"00:38",range:"08:00-09:00"},{high:"13:31",low:"18:59",range:"16:30-17:30"}],special:null},{date:"15",day:"四",tides:[{high:"07:31",low:"01:06",range:"08:00-09:30"}],special:null},{date:"16",day:"五",tides:[{high:"08:12",low:"01:37",range:"08:00-10:00"}],special:null},{date:"17",day:"六",tides:[{high:"09:00",low:"02:13",range:"08:00-11:00"}],special:null},{date:"18",day:"日",tides:[{high:"09:57",low:"02:57",range:"08:00-12:00"}],special:null},{date:"19",day:"一",tides:[{high:"11:01",low:"03:54",range:"08:00-13:00"}],special:null},{date:"20",day:"二",tides:[{high:"12:08",low:"05:13",range:"08:30-14:00"}],special:null},{date:"21",day:"三",tides:[{high:"13:11",low:"06:42",range:"10:00-15:00"}],special:null},{date:"22",day:"四",tides:[{high:"14:05",low:"07:54",range:"11:00-16:00"}],special:null},{date:"23",day:"五",tides:[{high:"14:52",low:"08:52",range:"12:00-16:30"}],special:null},{date:"24",day:"六",tides:[{high:"15:34",low:"09:38",range:"12:30-17:00"}],special:null},{date:"25",day:"日",tides:[{high:"16:11",low:"10:19",range:"13:00-17:30"}],special:null},{date:"26",day:"一",tides:[{high:"16:45",low:"10:55",range:"14:00-17:30"}],special:null},{date:"27",day:"二",tides:[{high:"17:15",low:"11:29",range:"14:30-17:30"}],special:null},{date:"28",day:"三",tides:[{high:"17:44",low:"12:01",range:"15:00-17:30"}],special:null},{date:"29",day:"四",tides:[{high:"06:17",low:"12:33",range:"08:00-08:30"},{high:"18:14",low:"00:03",range:"15:30-17:30"}],special:null},{date:"30",day:"五",tides:[{high:"06:44",low:"13:06",range:"08:00-09:00"},{high:"18:46",low:"00:27",range:"16:00-17:30"}],special:null},{date:"31",day:"六",tides:[{high:"07:13",low:"01:00",range:"08:00-09:30"}],special:null}]'

# Find the start of 10: and the end of its array
pattern = r'  10:\[\{date:"01".*?\}\]'
new_content = re.sub(pattern, oct_data, content, flags=re.DOTALL)

with open('yummy.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("yummy.html October tide data updated successfully.")
