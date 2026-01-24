# 澎湖沐月民宿 AI 智慧官網 (Moonlight Villa AI Platform)

![Project Banner](https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=2000&auto=format&fit=crop)

> **2026 澎湖國際花火節 x 七龍珠 Z 指定住宿合作夥伴**
> 
> 專為 6-12 人團體打造的包棟首選，結合 AI 智慧行程規劃、百大美食地圖與網美打卡導航，提供一站式深度旅遊體驗。

## 📖 專案文件導覽 (Documentation)

本專案擁有完整的企業級技術文件，請參閱 `docs/` 資料夾：

| 文件名稱 | 說明 | 適用對象 |
| :--- | :--- | :--- |
| [**1. 終極全功能優化藍圖**](docs/FUTURE_ROADMAP.md) | 產品願景、七大優化維度 (UX/AI/Perf/Biz/SEO/DevOps) | 產品經理、架構師 |
| [**2. 架構深度剖析**](docs/ARCHITECTURE_DEEP_DIVE.md) | Next.js 遷移指南、狀態管理、資料庫 Schema、設計系統實作 | 資深工程師、技術主管 |
| [**3. 營運與 SEO 實戰手冊**](docs/OPS_AND_SEO_MANUAL.md) | Vercel 部署設定、監控告警、關鍵字佈局、內容行銷策略 | SRE、行銷人員 |
| [**4. 開發者手冊**](docs/DEVELOPER_HANDBOOK.md) | 環境建置、程式碼規範、Git 工作流、測試策略 | 新進工程師 |

## 🚀 快速開始 (Quick Start)

### 1. 安裝依賴
```bash
npm install
```

### 2. 設定環境變數
複製 `.env.example` 並填入必要的 API Keys。
```bash
cp .env.example .env
```

### 3. 啟動開發伺服器
```bash
npm run dev
```
開啟瀏覽器訪問 [http://localhost:5175](http://localhost:5175)。

## ✨ 核心功能 (Features)

*   **🤖 AI 智慧行程規劃**: 模擬真人管家，根據天數、成員、偏好自動生成三種風格 (經典/慢活/熱血) 的多日遊行程。
*   **🗺️ 澎湖百大美食地圖**: 整合 Leaflet 地圖，收錄 100+ 間在地必吃美食，支援區域與類別篩選。
*   **📸 網美打卡導航**: 瀑布流展示 IG 熱門景點，一鍵導航至秘境。
*   **🎆 2026 花火節專區**: 提供施放時間表與最佳觀賞點攻略。

## 🛠️ 技術堆疊 (Tech Stack)

*   **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion
*   **Map**: Leaflet, React Leaflet
*   **AI**: OpenAI API (Simulated Logic implemented)
*   **Icons**: Lucide React

## 📄 授權 (License)

Private Property of Moonlight Villa. All rights reserved.
