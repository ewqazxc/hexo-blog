---
title: JavaScript的临时包装对象
date: 2020-08-09
---

## 包装对象
  JavaScript语言中对象和基础类型string、number、boolean都可以使用`“.”`符号访问属性和方法，但是本质上只有对象才可以使用`“.”`，那么基础类型在使用`“.”`时的内部机制是什么呢？

  这里就要引入一个概念：`包装对象`

  JavaScript对象时一个符合值，它是一组属性和方法的集合，使用`“.”`符号可以直接访问其属性和方法，但是基础类型数据在使用`“.”`符号时，
  JavaScript解析器首先调用基础类型对应的构造函数构建一个临时包装对象，然后再访问包装对象的属性
  比如以下代码：
  ```js
    let str = 'string';
    str.len = 4;
    console.log(str.len); // undefined
  ```
  上述代码中第二行使用`“.”`为str变量赋值属性len，这时JavaScript解析器首先调用构造函数：
  ```js
    let strObj = new String(str);
    strObj.len = 4;
  ```
  属性len的赋值对象实际是字符串对象strObj，而不是字符串值str。随后访问str.len返回值是undefined。strObj边称为包装对象，这个包装对象是临时的，一旦属性的引用和操作执行完毕后便会被回收，也就是说在`strObj.len=4`执行完毕后，strObj便被回收，不可再次访问。

  number 和boolean 也有对应的构造函数Number() 和bBoolean() 

  null 和undefined 没有包装对象，尝试使用`“.”`访问它们的属性会报错

  当然也可以手动创建基础类型对应的包装对象，但要注意：包装对象和基础类型使用`==`返回true，`===`返回false


***
手动创建基础类型对应的包装对象?
