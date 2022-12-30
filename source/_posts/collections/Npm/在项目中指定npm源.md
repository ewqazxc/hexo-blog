---
title: 在项目中指定npm源
date: 2022-12-27 13:00
categories: 
  - npm
---

## .npmrc 文件配置

1. 项目根目录下创建`.npmrc`文件
2. 编辑文件，输入`registry="目标源地址"`

```.npmrc
registry="https://registry.npmmirror.com/"
```

3. 通过命令`npm config ls`查看当前项目的源地址

## package.json 文件配置

在 package.json 文件中，添加 publishConfig 属性，可以指定 npm 源发布仓库

```package.json
  "publishConfig": {
    "registry": "http://xxxxx/"
  }
```
