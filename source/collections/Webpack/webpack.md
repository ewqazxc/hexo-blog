---
title: webpack 5项目搭建
date: 2020-12-05
---

## 1 基本安装

创建项目陆慕，初始化npm，然后安装webpack
```sh
mkdir webpack5 && cd webpack5
npm init -y
npm install webpack webpack-cli --save-dev
# webpack 5.10.0 
# webpack-cli 4.2.0
```

## 2 创建目录结构文件

```diff
  webpack-5
  |- package.json
  |- /dist
    |- index.html
  |- src
    |- index.js
```
src/index,js
```js
function component() {
  var element = document.createElement('div');
  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  return element;
}
document.body.appendChild(component());
```
dist/index.html
```html
<!doctype html>
<html>
  <head>
    <title>起步</title>
    <script src="https://unpkg.com/lodash@4.16.6"></script>
  </head>
  <body>
    <script src="./main.js"></script>
  </body>
</html>
```

## 3 创建webpack 配置文件

webpack.config.js
```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```
添加npm 脚本
```json
"build": "webpack"
```

## 4 添加Typescript
1. 安装Typescript 编译器和loader
```sh
npm install --save-dev typescript ts-loader
```
2. Typescript 配置,tsconfig.json
```json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "jsx": "react",
    "allowJs": true
  }
}
```
3. webpack 配置中处理Typescript
```js
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```
## 


