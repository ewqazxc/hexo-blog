---
title: Electron 最小化到托盘
date: 2021-06-23 13:16:00
---

## 监听主窗口关闭事件
* 主窗口关闭后将`mainWindow` 对象置空，方便点击托盘显示主窗口时判断
```js
mainWindow.on('closed', (event) => {
    mainWindow = null;// 关闭后 清空对象
})
```

## 实现最小化到托盘

```js
const { app, Menu, ipcMain, Tray } = require('electron');
let appTray = null;   // 引用放外部，防止被当垃圾回收

// 隐藏主窗口，并创建托盘，绑定关闭事件
function setTray() {
  // 用一个 Tray 来表示一个图标,这个图标处于正在运行的系统的通知区
  //  ，通常被添加到一个 context menu 上.
  // const Menu = electron.Menu;
  // const Tray = electron.Tray;
  // 系统托盘右键菜单
  let trayMenuTemplate = [
    {     // 主界面
      label: '主界面',
      click: function () {
        if (mainWindow) {
          mainWindow.show();
        } else {
          createWindow();
        }
      }
    },
    {     // 系统托盘图标目录
      label: '退出',
      click: function () {
        app.quit();
      }
    }];
  // 当前目录下的app.ico图标
  let iconPath = path.join(__dirname, 'app.ico');
  appTray = new Tray(iconPath);
  // 图标的上下文菜单
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
  // 隐藏主窗口
  // mainWindow.hide();
  // 设置托盘悬浮提示
  appTray.setToolTip('悬浮提示...');
  // 设置托盘菜单
  appTray.setContextMenu(contextMenu);
  // 单击托盘小图标显示应用
  appTray.on('click', function () {
    // 显示主窗口 mainWindow存在时可直接调用`show` 方法
    if (mainWindow) {
      mainWindow.show();
    } else {
      createWindow();
    }
    // 关闭托盘显示
    // appTray.destroy();
  });
};
```

## 主进程中启用

```js
app.whenReady().then(() => {
  // 创建主窗口方法
  // createWindow();
  // 最小化到托盘 多次调用会生成多个托盘
  setTray();
  
  
  app.on('window-all-closed', function () {
    // 全部窗口关闭时 是否退出应用
    // if (process.platform !== 'darwin') app.quit();
  })
});
```