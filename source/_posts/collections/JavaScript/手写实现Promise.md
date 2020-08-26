---
title: Promise是什么？手写实现下？
date: 2020-08-27
---

## Promise是什么？

Promise，翻译过来就是承诺，承诺它过一段时间会给你一个结果。从编程讲Promise 是异步编程的一种解决方案。下面是Promise 在[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 的相关说明：

Promise 对象是一个代理对象（代理一个值），被代理的值在Promise 对象创建时可能是未知的。它允许你为异步操作的成功和失败分别绑定相应的处理方法（handlers）。这让异步方法可以像同步方法哪样返回值，但并不是立即返回最终执行结果，而是一个能够代表未来出现的结果的promise对象

一个Promise 有以下几种状态：
* pending：初始状态，既不是成功，也不是失败状态
* fulfilled：意味着操作成功完成
* rejected：意味着操作失败

这个承诺一旦从等待状态变为其它状态，就永远不能更改状态了，也就是说一旦状态变为fulfilled/rejected 后，就不能再次改变。

举个栗子：假如我有个女朋友，下周五是她的生日，我答应她生日给她一个蛋糕，那么从现在开始这个承诺就进入等待状态，等待下周四的到来，然后状态改变。如果，我如约给了她一个蛋糕，那么这个承诺的状态就会由pending 切换为fulfilled，表示承诺成功兑现，一旦是这个结果了，就不回再有其他结果，即状态不会再发生改变；反之，如果没有兑现承诺，状态就会有pending 切换为rejected，时间不可倒流，所以状态也不能再发生变化

## 通过Promise 解决回调地狱的问题

pending 状态的Promise 状态的Promise 兑现会触发 fulfilled/rejected 状态，一旦状态改变，Promise兑现的then 方法就会被调用；否则就会触发catch

```js
  new Promise((resolve, reject)=>{
    setTimeout(()=>{
      console.log(1);
      resolve(true);
    },1000);
  }).then((res)=>{
    setTimeout(()=>{
      console.log(2);
    },1000);
  }).then((res)=>{
    setTimeout(()=>{
      console.log(3);
    },1000);
  }).catch((err)=>{
    console.log(err);
  })
```

## 手写实现Promise

**简易版**

```js

  function myPromise(constructor){
    let self = this;
    self.status = 'pending'; // 定义状态改变前的初始状态
    self.value = void 0; // 定义状态为resolved 时的状态
    self.reason = void 0; // 定义状态为rejected 时的状态 

    function resolve(value){
      // 两个=== 'pending' 保证了状态的改变是不可逆的
      if(self.status === 'pending'){
        self.value = value;
        self.status = 'resolved';
      }
    }

    function reject(reason){
      if(self.status === 'pending'){
        self.reason = reason;
        self.status = 'rejected';
      }
    }

    // 捕获构造异常
    try{
      constructor(resolve, reject);
    }catch(err){
      reject(e);
    }

  }

  // 定义链式调用的then 方法
  myPromise.prototype.then = fucntion(onFulfilled, onRejected){
    let self = this;
    switch(self.status){
      case 'resolved':
        onFulfilled(self.value);
        break;
      case 'rejected':
        onRejected(self.reason);
        break;
      default:break;
    }
  }

```

参考资料：
* [「硬核JS」深入了解异步解决方案](https://juejin.im/post/6844904064614924302#heading-69)
* [【翻译】Promises/A+规范](https://www.ituring.com.cn/article/66566#)

