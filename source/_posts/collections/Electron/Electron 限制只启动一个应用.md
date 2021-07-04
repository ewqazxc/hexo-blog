---
title: Electron 限制只启动一个应用
date: 2021-06-22 14:32:00
---
## 4.x 版本
```js

// 限制只可以打开一个应用
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // 当运行第二个实例时,将会聚焦到mainWindow这个窗口
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
      mainWindow.show()
    } else {
      createWindow();
    }
  })
  // 创建 myWindow, 加载应用的其余部分, etc...
  // app.on('ready', () => {
  // })
}
}
// ==========================================================
```

## 旧版本 2.x
```js

// ==========================================================
// 限制只可以打开一个应用,2.x的文档
// const isSecondInstance = app.makeSingleInstance((commandLine, workingDirectory) => {
//   // Someone tried to run a second instance, we should focus our window.
//   if (mainWindow) {
//     if (mainWindow.isMinimized()) mainWindow.restore()
//     mainWindow.focus()
//     mainWindow.show()
//   }
// })

// if (isSecondInstance) {
//   app.quit()
// }
// Create myWindow, load the rest of the app, etc...
```