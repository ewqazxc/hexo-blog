---
title: Antd4项目搭建
date: 2021-05-18 23:45:00
---

## 安装

```sh
npm install --global rollup
```

## 三种打包方式

1. iife 浏览器 立即执行函数 IIFE

```sh
rollup main.js --file bundle-iife.js --format iife
```

2. cjs NodeJs

```sh
rollup main.js --file bundle-cjs.js --format cjs
```

3. umd 兼容浏览器和 NodeJs

- 多了个包名 "myBundle"

```sh
rollup main.js --file bundle-umd.js --format umd --name "myBundle"
```

## 配置文件

> [选项列表](https://www.rollupjs.com/guide/big-list-of-options)

```js
// rollup.config.js
export default {
  // 核心选项
  input, // 必须
  external,
  plugins,

  // 额外选项
  onwarn,

  // danger zone
  acorn,
  context,
  moduleContext,
  legacy,

  output: {
    // 必须 (如果要输出多个，可以是一个数组)
    // 核心选项
    file, // 必须
    format, // 必须
    name,
    globals,

    // 额外选项
    paths,
    banner,
    footer,
    intro,
    outro,
    sourcemap,
    sourcemapFile,
    interop,

    // 高危选项
    exports,
    amd,
    indent,
    strict,
  },
};
```

命令行中使用配置文件 在命令后加上 --config 或者 -c

```sh
# 默认使用rollup.config.js
rollup --config

# 或者, 使用自定义的配置文件，这里使用my.config.js作为配置文件
rollup --config my.config.js
```

## 命令行参数

> 参数选项与配置文件等价，但使用命令的参数将重写配置文件

```md
-i, --input <filename> 要打包的文件（必须）
-o, --file <output> 输出的文件 (如果没有这个参数，则直接输出到控制台)
-f, --format <format> 输出的文件类型 (amd, cjs, esm, iife, umd)
-e, --external <ids> 将模块 ID 的逗号分隔列表排除
-g, --globals <pairs> 以`module ID:Global` 键值对的形式，用逗号分隔开
任何定义在这里模块 ID 定义添加到外部依赖
-n, --name <name> 生成 UMD 模块的名字
-h, --help 输出 help 信息
-m, --sourcemap 生成 sourcemap (`-m inline` for inline map)
--amd.id AMD 模块的 ID，默认是个匿名函数
--amd.define 使用 Function 来代替`define`
--no-strict 在生成的包中省略`"use strict";`
--no-conflict 对于 UMD 模块来说，给全局变量生成一个无冲突的方法
--intro 在打包好的文件的块的内部(wrapper 内部)的最顶部插入一段内容
--outro 在打包好的文件的块的内部(wrapper 内部)的最底部插入一段内容
--banner 在打包好的文件的块的外部(wrapper 外部)的最顶部插入一段内容
--footer 在打包好的文件的块的外部(wrapper 外部)的最底部插入一段内容
--interop 包含公共的模块（这个选项是默认添加的）
```

此外，还可以使用以下参数：

- -h/--help# 打印帮助文档。
- -v/--version# 打印已安装的 Rollup 版本号。
- -w/--watch# 监听源文件是否有改动，如果有改动，重新打包
- --silent# 不要将警告打印到控制台。

## 创建一个简单的项目

直接 `rollup` 会打印出使用说明，和`rollup --help` 或`rollup -h` 效果一致

- 创建 bundle

```sh
rollup src/main.js -f cjs
```

-f 选项（--output.format 的缩写）指定了所创建 bundle 的类型——这里是 CommonJS（在 Node.js 中运行）。由于没有指定输出文件，所以会直接打印在终端中：

```sh
src\main.js
'use strict';

// src/foo.js
var foo = 'hello world!';

// src/main.js
function main () {
  console.log(foo);
}

module.exports = main;
```

生成 bundle.js

```sh
rollup src/main.js -o bundle.js -f cjs
```
* 也可以用 rollup src/main.js -f cjs > bundle.js，但是这种方法在生成 sourcemap 时灵活性不高。

- 在node 中使用生成的bundle.js
```js
var myBundle = require('./bundle.js');
myBundle();
// 'hello world!'
```

- 添加配置文件
```js
// rollup.config.js
export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  }
};
```
删除并重新生成
```sh
rm bundle.js # 不删除也会重新覆盖
rollup -c
```
同样的命令行选项会覆盖配置文件
```sh
rollup -c -o bundle-2.js
```

- 使用插件
使用 `rollup-plugin-json`，令 Rollup 从 JSON 文件中读取数据
```sh
npm install --save-dev rollup-plugin-json
```

## 
