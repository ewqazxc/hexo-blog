---
title: call函数的实现
date: 2021-05-23 23:30:00
---

## .call 用途

改变函数内部 this 指向

```ts
const fun = function () {
  console.log("fun this::", this);
};
// 直接执行
fun(); // this 指向默认的window 对象

const str = "this";
fun.call(str); // this 指向 str
//指向第一个参数， 值为原始值的指向该原始值的自动包装对象，如 String、Number、Boolean
```

## .call 的实现

```ts
Function.prototype.myCall = function (context, ...args) {
  // 判断调用对象是否为函数
  if (typeof this !== "function") {
    throw new TypeError("This is not a function");
  }

  let cxt = context || window;
  //将当前被调用的方法定义在cxt.func上.(为了能以对象调用形式绑定this)
  //新建一个唯一的Symbol变量避免重复
  let func = Symbol();
  cxt[func] = this;
  // 获取参数
  args = args ? args : [];
  //以对象调用形式调用func,此时this指向cxt 也就是传入的需要绑定的this指向
  const res = args.length > 0 ? cxt[func](...args) : cxt[func]();
  //删除该方法，不然会对传入对象造成污染（添加该方法）
  delete cxt[func];
  return res;
};
```
