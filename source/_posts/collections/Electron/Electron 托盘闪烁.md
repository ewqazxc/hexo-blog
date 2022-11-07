---
title: Electron 托盘闪烁
date: 2021-06-24 12:00:00
---

## Electron如何实现 托盘闪烁?
-  通过托盘图标在一定时间内不断切换实现
```js
// 当前目录下的app.ico图标
let iconPath = path.join(__dirname, 'app.icon');
appTray = new Tray(iconPath);

let count = 0;
setInterval(function () {
  count++;
  if (count % 2 == 0) {
    appTray.setImage(path.join(__dirname, 'empty.icon'))
  } else {
    appTray.setImage(path.join(__dirname, 'app.icon'))
  }
}, 500);
```
