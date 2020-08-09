---
title: Symbol 类型
date: 2020-08-05
---

## Symbol

  `Symbol`是一种基本数据类型。
  
  `Symbol()`函数会返回`symbol`类型的值，该类型具有静态属性和静态方法。
  
  它的静态属性会暴露几个内建的成员对象；
  它的静态方法会暴露全局的symbol注册，且类似于内建对象类，但作为构造函数来说它并不完整，因为它不支持语法`new Symbol()`

  每个`Symbol`返回的`symbol`值都是唯一的。一个symbol值能作为对象属性的标识符；这是改数据类型仅有的目的。

  ### Demo

  ```js
    const symbol1 = Symbol();
    const symbol2 = Symbol(2);
    const symbol3 = Symbol('foo');

    console.log(typeof symbol1); // symbol 字符串
    console.log(symbol2 === 2); // false
    console.log(symbol3.toString()); // Symbol(foo) 字符串
    console.log(Symbol('foo')===Symbol('foo')); // false
  ```
  ### 语法

  Symbol([description])

  * 参数
    description 可选 字符串类型。
    对symbol的描述，可用于调试但不是访问symbol本身

  ### 描述

  直接使用`Symbol()`创建新的symbol类型，并用一个可选的字符串作为其描述

  ```js
    const sym1 = Symbol();
    const sym2 = Symbol('foo');
    const sym3 = Symbol('foo');
  ```

  上面代码创建了三个新的symbol类型。注意，`Symbol('foo')`不会强制将字符串`'foo'`转换成symbol类型。他每次都会创建一个新的symbol类型：

  ```js
    Symbol('foo') === Symbol('foo'); // false
  ```

  下面带有`new`运算符的语法将抛出`TypeError`错误：

  ```js
    const sym = new Symbol(); // TypeError
  ```

  这会阻止创建一个显式的Symbol包装器对象而不是一个Symbol值。围绕原始数据类型创建一个显式包装器对象从ECMAScript 6开始不再被支持。
  然而，现有的原始包装器对象，如`new Boolean`、`new String`以及`new Number`,因为遗留原因仍可被创建

  如果想要创建一个Symbol包装器对象，可以使用Object函数

  ```js
    const sym = Symbol('foo');
    typeof sym; // symbol
    const symObj = Object(sym);
    typeof symObj; // object
  ```

  * 全局共享的Symbol
    
    上面使用Symbol()函数的语法，不会在整个代码中创建一个可用的全局Symbol类型
    要创建跨文件可用的symbol，甚至跨域（每个都有其自己的全局作用域），使用`Symbol.for()`方法和`Symbol.keyFor()`方法从全局的symbol注册表设置和取得symbol。

  * 在对象中查找Symbol 属性

    `Object.getOwnPRopertySymbols()`方法让你在查找一个给定对象的符号属性时返回一个symbol类型的数组。注意，每个初始化的对象都是没有自己的symbol属性的，因此这个数组可能为空，除非已经在对象上设置了symbol属性

  ### 属性
  
  Symbol.length 长度属性，值为 0

  Symbol.prototype symbol构造函数的原型

  * 众所周知的symbols
    
    除了自己创建的symbol，JavaScript还内建了一些在ECMAScript 5 之前没有暴露给开发者的symbol，它们代表了内部语言行为。可以使用以下属性访问

    * 迭代symbols
      * Symbol.iterator
      一个返回一个对象默认迭代器的方法。被for...of 使用
      * Symbol.asyncIterator
      一个返回对象默认的异步迭代器的方法。被 for await of 使用

    * 正则表达式symbols
      * Symbol.match
      一个用于对字符串进行匹配的方法，也用于确定一个对象是否可以作为正则表达式使用。被`String.prototype.match()`使用
      * Symbol.replace
      一个替换匹配字符串的子串的方法 被`String.prototype.replace()`使用
      * Symbol.search
      一个返回一个字符串中与正则表达式相匹配的索引的方法 被`Stirng.prototype.search()`使用
      * Symbol.split
      一个在匹配正则表达式的索引处拆分一个字符串的方法 被`String.prototype.split()`使用

    * 其他 symbols
      * Symbol.hasInstance
        一个确定一个构造器对象识别的对象是否为它的实例的方法 被`instanceof`使用
      * Symbol.isConcatSpreadable
        一个布尔值，表明一个对象是否应该`flattened`(平铺)为它的数组元素 被`Array.prototype.concat()`使用
      * Symbol.unscopables
        拥有和继承属性名的一个对象的值被排除在与环境绑定的相关对象外
      * Symbol.species
        用于创建派生对象的构造器函数
      * Symbol.toPrimitive
        将对象转化为基本数据类型的方法
      * Symbol.toStringTag
        用于对象的默认描述的字符串值 被`Object.prototype.toString()` 使用
  
  ### 方法

  * Symbol.for(key)
    使用给定的key搜索现有的symbol，如果找到则返回该symbol。否则将使用给定的key在全局symbol注册表中创建一个新的symbol
  * Symbol.keyFor(sym)
    从全局symbol注册表中，为给定的symbol检索一个共享的symbol key

  


***
  包装器对象？

  Object.getOwnPRopertySymbols()？

  `Symbol.for()`方法和`Symbol.keyFor()`？

  `for...of` `for await of`

  `String.prototype.match()`
  `String.prototype.replace()`
  `String.prototype.search()`
  `String.prototype.split()`
