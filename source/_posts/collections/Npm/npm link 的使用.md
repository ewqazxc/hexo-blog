---
title: npm link 的使用
date: 2022-04-10 15:30
categories: npm
---

## 使用 npm link 后，编译失败

> webpack 中。默认传给 loader 的是模块的绝对路径，需要修改这个配置[webpack 官方文档](https://webpack.js.org/configuration/resolve/#resolvesymlinks)

- 在 umi 项目中的配置
```js config.js
export default {
  chainWebpack(config) {
    config.resolve.symlinks(false);
  },

  // or (env dev)
  cssModulesExcludes: [xxx],
};
```

- webpack.config.js
```js webpack.config.js
module.exports = {
  //...
  resolve: {
    symlinks: true,
  },
};
```
