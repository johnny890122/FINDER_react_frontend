# Finder (Frontend)

## Introduction

此專案為 Finder 遊戲的前端部分，可以從[此入口](https://finder-react-frontend-c6157901d82e.herokuapp.com)進入

## Development

使用以下命令在本機啟動開發環境

```bash
npm install
npm start
```

### Tech. Stack

此 React 專案使用 [Create React App](https://create-react-app.dev/) 建立

- 使用 [React](https://react.dev/) v18
- 搭配套件管理工具 [npm](https://github.com/npm/cli)
- 核心 UI 套件為 [Material UI](https://mui.com/material-ui/) v5
- 狀態管理工具為 [Redux](https://redux.js.org/) 和 [Tanstack Query](https://tanstack.com/query/v4/docs/framework/react/overview) v4
  - 注意：若將 Tanstack Query 升到 v5 將導致很多 callback function 無法使用，不建議升級
- 用於展示網絡圖的套件為 [react-force-graph](https://github.com/vasturiano/react-force-graph)
- 用 [Formik](https://formik.org/) + [Yup](https://github.com/jquense/yup) 做表單整合和驗證
- 使用 [Jest](https://jestjs.io/) 做單元測試

## Test

### 在本機進行測試

使用以下命令在本機進行 `.spec.js` 結尾的檔案的測試

```bash
npm test
```

### GitHub Action

- 發出 Pull Request 和直接推到 Main Branch 時會觸發 GitHub Action，進行 `npm test`
- GitHub Action 相關設定寫在專案中的 `.github/workflows/test.yml`

## Deployment

此專案部署在 [Heroku](https://dashboard.heroku.com/apps) 上

- 需要在 Heroku 介面上手動 Deploy
- 打包及部署相關設定寫在專案的 `Procfile` 和 `scripts/heroku-start.js` 中
