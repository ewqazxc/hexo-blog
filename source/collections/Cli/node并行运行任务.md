---
title: node并行运行任务
date: 2020-10-06
---

## 使用 concurrently 并行地运行多个命令（同时跑前端和后端的服务）

1. 在项目根目录下安装concurrently
```sh
yarn add concurrently
```

2. 更改 package.json 文件中的script 脚本
```json
  "start": "npm start",
  "server": "npm start --prefix backend",
  "dev": "concurrently \"npm run server\" \"npm run start\""
```

3. 运行`npm run dev` 即同时运行`start`和`server`任务
