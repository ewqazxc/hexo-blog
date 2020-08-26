---
title: js模拟new操作符的实现
date: 2020-08-26
---

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 对new 的解释：

new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。new 关键字会进行如下的操作：

1. 创建一个空的简单JavaScript 对象（{}）;
2. 链接该对象（即设置该对象的构造函数）到另一个对象
3. 将步骤1新创建的对象作为this 的上下文
4. 如果该函数没有返回对象，则返回this

## 通过具体实现来解释

```js
  function Dog(name, color, age){
    this.name = name;
    this.color = color;
    this.age = age;
  }

  Dog.prototype = {
    getName: function(){
      return this.name;
    }
  }

  let dog = new Dog('小明', 'yellow', 8);
```

1. 创建一个简单的空对象
```js
let obj = {}
```
2. 链接该对象到另一个对象（原型链）
```js
  obj._proto_ = Dog.prototype;
```
3. 将步骤1新船就的对象作为this 的上下文
```js
  Dog.apply(obj,['小明', 'yellow', 8]);
```
4. 如果该函数没有返回对象，则返回this
```js
  let dog = obj;
  dog.getName(); // 小明
```

如果，Dog() 有return 则返回return 的值
```js
  let rtnObj = {};
  function Dog(name, color, age){
    // ...
    this.name = name;
    this.color = color;
    this.age = age;
    return rtnObj;
  }

  let dog = new Dog('小明', 'yellow', 3);
  dog === rtnObj; // true
```

## 自己封装一个对象实例化方法，即模拟new 的操作

```js
  function objFactory(){
    let obj = {};
    // 取得该方法的第一个参数（并删除第一个参数），该参数是构造函数
    let Constructor = [].shift.apply(arguments);
    // 将新对象的内部属性_proto_ 指向构造函数的原型，这样新对象就可以访问原型中的属性和方法
    obj._proto_ = Constructor.prototype;
    // 取得构造函数的返回值
    let ret = Constructor.apply(obj, arguments);
    // 如果返回值是一个对象就返回该对象，否则返回构造函数的一个实例对象
    return typeof ret === 'object' ? ret : obj;
  }
```

