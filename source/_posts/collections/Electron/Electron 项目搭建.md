---
title: Electron 项目搭建
date: 2021-06-18 20:56
---

## 创建项目

创建工程目录

```sh
mkdir my-electron-app && cd my-electron-app
npm init
```

安装 electron

```sh
npm install --save-dev electron
```

添加启动脚本

```json
{
  "scripts": {
    "start": "electron ."
  }
}
```

## 运行主进程

任何 Electron 应用程序的入口都是 main 文件。 这个文件控制了主进程，它运行在一个完整的 Node.js 环境中，负责控制您应用的生命周期，显示原生界面，执行特殊操作并管理渲染器进程
执行期间，Electron 将依据应用中 package.json 配置下 main 字段中配置的值查找此文件，您应该已在应用脚手架步骤中配置。
要初始化这个 main 文件，需要在您项目的根目录下创建一个名为 main.js 的空文件。

> 注意：如果您此时再次运行 start 命令，您的应用将不再抛出任何错误！ 然而，它不会做任何事因为我们还没有在 main.js 中添加任何代码。

## 创建页面

```html index.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <meta http-equiv="X-Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using Node.js <span id="node-version"></span>,
    Chromium <span id="chrome-version"></span>,
    and Electron <span id="electron-version"></span>.
  </body>
</html>
```

## 在窗口中打开页面
1. 引入electron 模块
  - app 控制应用程序的事件生命周期
  - BrowserWindow 创建和管理应用程序的窗口
```js main.js
const { app, BrowserWindow } = require('electron')
```
2. 添加createWindow() 方法 将index.html 加载到窗口实例中
```js main.js
function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })
  win.loadFile('index.html')
}
```
3. 调用createWindow() 打开新窗口
```js main.js
app.whenReady().then(() => {
  createWindow()
})
```
> 在 Electron 中，只有在 app 模块的 ready 事件被激发后才能创建浏览器窗口。 您可以通过使用 app.whenReady() API来监听此事件。 在whenReady()成功后调用createWindow()。
## 管理窗口的生命周期
- 关闭所有窗口时 退出应用
```js main.js
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
```
- 如果没有窗口打开则打开一个新窗口
```js main.js
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
```
## 通过预加载脚本从渲染器访问Node.js
```js preload.js
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})
```
```js main.js
// 在文件头部引入 Node.js 中的 path 模块
const path = require('path')

// 修改现有的 createWindow() 函数
function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}
// ...
```
- __dirname 字符串指向当前正在执行脚本的路径 (本例中，你的项目的根文件夹)。
- path.join API 将多个路径段联结在一起，创建一个跨平台的组合路径字符串。

## 为页面添加脚本
```html index.html
<script src="./renderer.js"></script>
```

## 打包发布
1. 将 Electron Forge 添加到您应用的开发依赖中，并使用其"import"命令设置 Forge 的脚手架：
```sh
npm install --save-dev @electron-forge/cli
npx electron-forge import

```

2. 使用Forge 的make 命令来创建可发布的应用
```sh
npm run make
```

##
