---
title: JavaScript深入理解之继承
date: 2020-09-01
---

——Js 继承的6种方式

首先，提供一个父类
```js
  function Person(name){
    this.name = name;
    this.sum = function(){
      console.log(this.name);
    }
  }
  Person.prototype.age = 10; // 原型属性
```

## 1 通过原型链继承
  * 重点：将实例的原型指向父类的实例，就是利用原型让一个引用类型继承另一个引用类型的属性和方法
  * 特点：
    1. 实例可继承的属性有：实例的构造函数的属性，父类构造函数的属性，父类原型的属性
    2. 新实例不会继承父类实例的属性
  * 缺点：
    1. 新实例无法向父类构造函数传参
    2. 继承单一
    3. 所有新实例都会共享父类实例的属性，原型上的属性时共享的，一个实例修改了原型属性，另一个实例的原型属性也会被修改
  ```js 原型链继承
    function Per(){
      this.name = 'per';
    }
    Per.prototype = new Person();

    let Per1 = new Per();
    per1.age; // 10
    per1 instanceof Person; // true
  ```
  
## 2 借用构造函数继承
  * 重点：用call()和apply()将父类构造函数引入子类函数，在子类函数中做了父类函数的自执行（复制）
  * 特点：
    1. 只继承父类构造函数的属性，没有继承父类原型的属性
    2. 解决了原型链继承的三个缺点
    3. 可以继承多个构造函数属性，执行多个父类
    4. 在子实例中可向父实例传参
  * 缺点：
    1. 只能继承父类构造函数的属性
    2. 无法实现构造函数的复用，每次都会重新调用
    3. 每个新实例都有父类构造函数的副本，臃肿

  ```js 借用构造函数继承
    function Con(){
      Person.call(this,'children');
      this.age = 12;
    }

    let con1 = new Con();
    con1.name; // children
    con1.age; // 12
    con1 instanceof Person; // false

  ```

## 3 组合继承（原型链+构造函数）
  * 重点：结合了两种模式的优点、传参和复用
  * 特点：
    1. 可以继承父类原型上的属性，可以传参，可复用
    2. 每个新实例引入的构造函数属性是私有的
  * 缺点：调用了两次父类构造函数（耗内存），子类的构造函数会代替原型上的那个父类构造函数

  ```js 组合继承
    function Sub(name){
      Person.call(this,name); // 借用构造函数模式
    }
    Sub.prototype = new Person(); // 原型链继承

    let sub1 = new Sub('sub');
    sub.name; // sub
    sub.age; // 10
  ```

## 4 原型式继承
  * 重点：用一个函数包装一个对象，然后返回这个函数的调用，这个函数就变成了可以随意添加属性的实例或对象。object.create()就是这个原理
  * 特点： 类似赋值一个对象，用函数来包装
  * 缺点：
    1. 所有实例都会继承原型上的属性
    2. 无法实现复用（新实例属性都是后面添加的）
  
  ```js 原型式继承
    function content(obj){
      function F(){};
      F.prototype = obj; // 继承传入的参数
      return new F(); // 返回函数对象
    }

    let sup = new Person();
    let sup1 = content(sup);
    sup1.age; // 10
  ```

## 5 寄生式继承
  * 重点：就是给原型式继承外面套了个壳子
  * 优点：没有创建自定义类型，因为只是套了个壳子返回对象，这个函数顺理成章就成了创建的新对象
  * 缺点：没用到原型，无法复用

  ```js 寄生式继承
    function content(obj){
      function F(){};
      F.prototype = obj;
      return new F();
    }
    let sup = new Person();
    // 套壳
    function subObj(obj){
      let sub = content(obj);
      sub.name = 'subObj';
      return sub;
    }

    let sub2 = subObj(sup);
    typeof subObj; // function
    typeof sup2; // object
    sup2.name; // subObj
  ```

## 6 寄生组合式继承
  * 寄生：在函数内返回对象然后调用
  * 组合：
    1. 函数的原型等于另一个实例
    2. 在函数中用apply 或者call 引入另一个构造函数，可传参
  * 重点：修复了组合继承的问题

  ```js 寄生组合式继承
    // 寄生
    function content(obj){
      function F(){};
      F.prototype = obj;
      return new F();
    }
    let con = content(Person.prototype);

    // 组合
    function Sub(){
      Person.call(this);
    } // 解决组合式两次调用的问题

    // 重点
    Sub.prototype = con; // 继承con 实例
    con.constructor = Sub; // 修复实例

    let sub1 = new Sub();
    sub1.age; // 10

  ```
