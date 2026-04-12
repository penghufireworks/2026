import requests
from bs4 import BeautifulSoup
import re

url = "https://tnc-kao.com.tw/schedule/timetable"
headers = {"User-Agent": "Mozilla/5.0"}
response = requests.get(url, headers=headers)
response.encoding = 'utf-8'
soup = BeautifulSoup(response.text, 'html.parser')

target = soup.find(string=re.compile("04\s*月(份)?船期表"))
if target:
    print("Found target string")
    p = target.parent
    print(f"Parent tag: {p.name}")
    print(f"Parent HTML snippet: {str(p)[:200]}")
    
    # Check siblings
    print("Siblings:")
    for s in p.next_siblings:
        if s.name:
            print(f"Sibling tag: {s.name}")
            if s.name == 'table':
                print("Found table sibling!")
            elif s.find('table'):
                print("Found table inside sibling!")
    
    # Check ancestors and their siblings
    print("Ancestors siblings:")
    curr = p
    for i in range(3):
        if curr.parent:
            curr = curr.parent
            print(f"Ancestor {i+1} tag: {curr.name}")
            for s in curr.next_siblings:
                if s.name:
                    print(f"Ancestor sibling tag: {s.name}")
                    if s.name == 'table':
                        print("Found table ancestor sibling!")
                    elif s.find('table'):
                        print("Found table inside ancestor sibling!")
else:
    print("Target string NOT found")
