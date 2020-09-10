---
title: commitizen 工具的使用
date: 2020-09-10
---

## 填写提示工具 [commitizen](https://github.com/commitizen/cz-cli)

这个工具将给git commit 提供一个引导的功能，便于开发者根据提示完善commit 信息

1. 安装commitizen
```bash
  npm install commitizen -g
```
2. 在项目中进行初始化
```sh
  commitizen init cz-conventional-changelog --save-dev --save-exact
  # 或者使用yarn 命令
  yarn commitizen init cz-conventional-changelog --save-dev --save-exact
```
3. 利用`git cz`代替平时使用的`git commit`，即可根据提示一步步完善提交信息
