---
title: Antd4项目搭建
date: 2020-09-15
---

## 初始化
1. 使用create umi 快速的初始化脚手架
```sh
  # 使用 npm
  npx create umi
  # 使用 yarn
  yarn create umi
```
2. 选择开发项目模板 - ant-design-pro
3. 选择对应模板版本 - Pro V5
```tips
  这里包了个错：在空文件夹中使用，或者使用用 yarn create umi myapp
  因此重新选个空文件夹继续
```
4. 项目初始化成功，拉取依赖包后进入开发
```sh
  yarn install
```

```tips
  install时报错：error puppeteer-core@5.3.0: The engine "node" is incompatible with this module. Expected version ">=10.18.1". Got "10.16.0

  升级下node...windows 下需要到官网下载最新包安装
```

## 开发

install 相关依赖后，即可进入正常开发，以下是一些辅助命令

* start 启动
* build 编译项目 输出至 dist
* analyze 分析依赖大小
* lint 代码检查
* lint:fix 自动修复lint 错误
* i18n-remove 尝试删除项目中所有的i18n代码，对于复杂的运行时代码，表现并不好，慎用