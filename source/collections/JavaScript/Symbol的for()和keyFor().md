---
title: Symbol.for() 和 Symbol.keyFor()
date: 2020-08-09
---

## Symbol.for()

  Symbol.for(key) 方法会根据给定的键key，来从运行时的symbol 注册表中找到对应的symbol 

  如果找到了就返回它，否则，新建一个与该键关联的symbol，并放入全局symbol 注册表中。

  ### 语法
  Symbol.for(key)

  * 参数

    key 一个字符串，作为symbol 注册表中与某symbol 关联的键（同时也会作为该symbol 的描述）
  
  * 返回值

    返回由给定的key 找到的symbol ，否则就是返回新创建的symbol
  
  ### 描述

  和Symbol() 不同的是，用Symbol.for() 方法创建的symbol 会被放入一个全局symbol 注册表中。Symbol.for() 并不是每次都会创建一个新的symbol，它会先检查给定的key 是否已经在注册表中了。假如是，则会返回上次存储的那个，否则才新建一个。

  * 全局symbol 注册表

  symbol 注册表中的记录结构：

  #### 全局symbol 注册表中的一个记录
  
字段名 | 字段值
--- | ---
[[key]]    | 一个字符串，用来标识每个symbol
[[symbol]] | 存储的symbol 值

  #### 示例
  ```js
    Symbol.for("foo"); // 创建一个symbol 并放入symbol 注册表中，键为"foo"
    Symbol.for("foo"); // 从symbol 注册表中读取键为"foo" 的symbol

    Symbol.for('bar') === Symbol.for('bar'); // true 证明第二次并未新建
    Symbol('bar') === Symbol('bar'); // false 每次都是一个新的symbol

    let sym = Symbol.for('mario');
    sym.toString(); // "Symbol(mario)"
    // mario 既是该symbol 在symbol 注册表中的键名，又是该symbol 自身的描述字符串
  ```
  为了防止冲突，最好给放入symbol 注册表中的symbol 带上前缀`Symbol.for("who.ami")`

## Symbol.keyFor()

  Symbol.keyFor(sym) 方法用来获取symbol 注册表中与某个symbol 关联的键

  ### 语法

  Symbol.keyFor(sym)

  * 参数 必选参数，存储在symbol 注册表中的某个symbol
  * 返回值 如果在全局注册表中查找到该symbol ,则返回该symbol 的key 值，形式为string ，如果symbol 未在注册表中，则返回undefined

  ### 示例
  ```js
    // 创建一个 symbol 并放入Symbol 注册表，key 为'foo'
    let globalSym = Symbol.for('foo');
    Symbol.keyFor(globalSym); // "foo"

    // 创建一个symbol 但不放入symbol 注册表中
    let localSym = Symbol();
    Symbol.keyFor(localSym); // undefined

    // weel-konwn symbols 并不在 symbol 注册表中
    Symbol.keyFor(Symbol.iterator); // undefined
  ```

