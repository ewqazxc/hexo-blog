---
title: js放到head中失效的原因与解决方法
date: 2021-01-26 23:00:00
---

> 引用 C-Lodop 控件时，在umi项目中无法获取对应js，控制台报跨域异常，后发现将脚本插入body 是可行的
## 出现问题的场景
```js
//==加载引用CLodop的主JS,用双端口8000和18000(以防其中一个被占):==
function loadCLodop() {
    if (CLodopJsState == "loading" || CLodopJsState == "complete") return;
    CLodopJsState = "loading";
    var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
    var JS1 = document.createElement("script");
    var JS2 = document.createElement("script");
    JS1.src = "http://localhost:8000/CLodopfuncs.js?priority=1";
    JS2.src = "http://localhost:18000/CLodopfuncs.js";
    JS1.onload  = JS2.onload  = function()    {CLodopJsState = "complete";}
    JS1.onerror = JS2.onerror = function(evt) {CLodopJsState = "complete";}
    head.insertBefore(JS1, head.firstChild);
    head.insertBefore(JS2, head.firstChild);
    CLodopIsLocal = !!((JS1.src + JS2.src).match(/\/\/localho|\/\/127.0.0./i));
}
```

上面代码，在umi项目中无法获取相应js脚本（偶尔可以，也是比较神奇。。。）

## 解决方法
将head 改为body，使脚本嵌入body 中，可以正常加载js 脚本并执行

## 原因

可能：
  * 因为文档还没加载就读了js，js不起作用 这里可以用window.onload=function(){//执行代码}
  * umi项目中插入head 头的脚本进行了fetch 请求 导致跨域异常？

## 其它参考

js可以分为外部和内部的，外部的js一般放到head内，内部的js 也叫本页面的js 脚本，内部的js 一般放到body 内，这样的目的有很多：
1. 不阻塞页面的加载（js会被缓存）
2. 可以直接在js 里操作dom，这时候的dom 是准备好的，即保证js 运行时dom是存在的
3. 建议的方式是放在页面底部，监听window.onload 或 readystate 来触发js
4. head 内的js 会阻塞页面的传输和页面的渲染，umi 项目采用react 虚拟dom 加载，或许在动态插入head 时，产生了冲突
