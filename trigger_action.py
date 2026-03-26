import requests
import time
from datetime import datetime

# 請將這裡換成您申請的 GitHub Personal Access Token
GITHUB_TOKEN = "YOUR_GITHUB_TOKEN_HERE"
REPO_OWNER = "penghufireworks"
REPO_NAME = "2026"
EVENT_TYPE = "trigger-update"

url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/dispatches"

headers = {
    "Accept": "application/vnd.github.v3+json",
    "Authorization": f"Bearer {GITHUB_TOKEN}"
}

data = {
    "event_type": EVENT_TYPE
}

def trigger_github_action():
    try:
        response = requests.post(url, headers=headers, json=data)
        if response.status_code == 204:
            print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] ✅ 成功觸發 GitHub Action！")
        else:
            print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] ❌ 觸發失敗，狀態碼: {response.status_code}, 訊息: {response.text}")
    except Exception as e:
        print(f"發生錯誤: {e}")

if __name__ == "__main__":
    print(" 開始執行本地觸發器，每 60 分鐘自動觸發一次...")
    print(" 提示：請確保不要關閉這個黑色視窗，程式才能持續運行。")
    
    # 啟動時先觸發一次
    trigger_github_action()
    
    # 進入無窮迴圈，每 60 分鐘 (3600 秒) 執行一次
    while True:
        time.sleep(3600)
        trigger_github_action()

