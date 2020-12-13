---
title: ECMAScript2021的几个新特性
date: 2020-12-13
---

## 1. String.prototype.replaceAll

[String.prototype.replaceAll](https://github.com/tc39/proposal-string-replaceall)

先来回顾下`String.prototype.replace` 的用法：
```js
const str = 'Hello World! Hello World!';
const newStr = str.replace('World','XiaoMing');
console.log(newStr);// Hello XiaoMing! Hello World!
```
这种写法，只有第一个匹配的会被替换，想要做到全部替换就需要使用正则表达式
```js
const str = 'Hello World! Hello World!';
const newStr = str.replace(/World/g,'XiaoMing');
console.log(newStr);// Hello XiaoMing! Hello XiaoMing!
```
不过，在使用正则的时候，如果需求是匹配`+`等符号时，还需要进行转义，如：`/\+/g`
也许你会想到另一种方案：使用`split + join` 的方式
但这样做也是有性能开销的，加上这种操作十分常见，于是就诞生了`String.prototype.replaceAll` 这个API，简化这个操作
```js
const str = 'Hello World! Hello World!';
const newStr = str.replaceAll('World','XiaoMing');
console.log(newStr);// Hello XiaoMing! Hello XiaoMing!
```
`String.prototype.replace(searchValue, replaceValue)`
* 注意：当searchValue 是非全局正则表达式时，replaceAll 会引发异常，如果searchValue 是全局正则表达式时，replaceAll 与replace 行为是一致的

## 2. Promise.any
[Promise.any](https://github.com/tc39/proposal-promise-any)

* Promise.all (ES2015)只有当传入的每个Promise 实例的状态都变成fulfilled 时，才返回fulfilled，只要有一个被reject，返回的状态就变成rejected
* Promise.race (ES2015)当传入的Promise 实例中有一个率先改变状态，那么就返回该状态，也就是返回最先改变的Promise 实例的返回值
* Promise.allSettled (ES2020)只有等到所有传入的Promise 实例都返回结果，不管是fulfilled 还是rejected，整个实例才会结束
* Promise.any (ES2021)当其中任何一个Promise 完成(fulfilled)时，就返回那个已经有完成值的Promise。如果所有的Promise 都变成rejected ，那么返回一个拒绝的Promise

* Promise.any() 跟Promise.race() 方法很像，有一个不同点是，any不会因为某个Promise 变成rejected 而结束

## 3. WeakRefs
[WeakRefs](https://github.com/tc39/proposal-weakrefs)

* 注意：要尽量避免使用WeakRef 和FinalizationRegistry ，垃圾回收机制依赖于JavaScript 引擎的实现，不同的引擎或是不同的版本的引擎可能会有所不同

这个提案主要包括两个主要的新功能：
- 使用 WeakRef 类创建对象的弱引用
- 使用 FinalizationRegistry 类对对象在进行垃圾回收后，运行用户定义的终结器

他们可以分开始用也可以一起使用，
WeakRef 实例不会阻止GC 回收，但是GC 会在两次EventLoop 之间回收WeakRef 实例。GC 回收后的WeakRef 实例的deref() 方法将会返回undefined
```js
let ref = new WeakRef(obj);
let isLive = ref.deref(); // 如果obj 被回收了，那么isLive 就是undefined
```
FinalizationRegistry 注册Callback，某个对象被GC 回收后调用。
```js
const registry = new FinalizationRegistry(heldValue => {
  //...
});
// 通过register 注册任何你想要清理回调的对象，传入该对象和所含的值
registry.register(theObj, 'some value');
```
[更多的细节](https://github.com/tc39/proposal-weakrefs/blob/master/reference.md)

## 4. Logical Assignment Operators 逻辑赋值操作符
[Logical Assignment Operators 逻辑赋值操作符](https://github.com/tc39/proposal-logical-assignment)

看下ES2020 新增的空值合并操作符 ??
当左操作数为undefined 或 null 时，该操作符会将右侧操作数赋值给左侧变量
```js
const name = null ?? 'value';
console.log(name); // value
```
有了逻辑赋值运算符，可以改写成：
```js
const name ??= 'value';

a ||= b; // == a || (a = b)
a &&= b; // == a && (a = b)
a ??= b; // == a ?? (a = b)

```

## 5. Numeric  separators 数字分隔符
[Numeric separators 数字分隔符](https://github.com/tc39/proposal-numeric-separator)

数字的可读性随着数字变长而变差，数字分隔符会让长数字更加清晰易读
```js
const x = 1000000000000;
const y = 1_000_000_000_000;
const.log(x === y); // true
```
在二进制、十六进制、BigInt 等中都可以使用
