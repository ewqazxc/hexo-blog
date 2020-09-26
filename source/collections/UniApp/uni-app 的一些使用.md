---
title: uni-app 的一些使用
date: 2020-09-22
---

## 路由与页面跳转

1. uni.navigateTo(OBJ)

保留当前页面，跳转到应用内的某个页面，使用`uni.navigateBack` 可以返回到原页面

**OBJ 参数说明**

参数 | 类型 | 必填 | 默认值 | 说明 | 平台差异说明
---  | --- | ---  | -----  | --- | ---
url | String | 是 | - | 需要跳转的应用内非tabBar 的页面路径，路径后可以带参数。 | -
animationType | String | 否 | pop-in | 窗口显示的动画效果，详见：[窗口动画](https://uniapp.dcloud.io/api/router?id=animation) | App
animationDuration | Number | 否 | 300 | 窗口动画持续时间，单位：ms | App
events | Object | 否 | - | 页面间通信接口，用于蒋婷被打开页面发送到当前页面的数据。2.8.9+ | - 
success | Function | 否 | - | 接口调用成功的回调函数 | - 
fail | Function | 否 | - | 接口调用失败的回调函数	 | - 
complete | Function | 否 | - | 接口调用结束的回调函数（调用成功、失败都会执行） | - 

**示例**

```js
  // 在起始页跳转到 test.vue 页面并传递参数
  uni.navigateTo({
    url: 'test?id=1&name=uniapp'
  });
```
```js
  // 在 test.vue 页面接受参数
  export default {
    onLoad: function (option) { // 序列化上个页面传递的参数
      option.id; // 1
      option.name; // uniapp
    }
  }
```
