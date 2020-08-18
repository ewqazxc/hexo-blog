---
title: JavaScript深入理解之对象创建
date: 2020-08-18
# http://cavszhouyou.top/JavaScript%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3%E4%B9%8B%E5%AF%B9%E8%B1%A1%E5%88%9B%E5%BB%BA.html
---

在JavaScript中虽然Object构造函数或对象字面量都可以用来创建单个对象，但是这些方法都有一个明显的缺点:使用同一个接口创建很多对象，活产数大量的重复代码。为了解决这些问题，人们提出了很多对象创建的解决办法，下面是对JavaScript 对象创建的一些理解和总结。

## 1 工厂模式

  工厂模式是软件工厂领域一种广为人知的设计模式，这种模式抽离了创建对象的具体过程。考虑到在ECMAScript 中无法创建类，开发人员发明以一种函数，用函数来封装特定接口创建对象的细节。如下面的例子所示：
  ```js
    function createPerson(name,age,job){
      var o = new Object();
      o.name = name;
      o.age = age;
      o.job = job;
      o.sayName = function(){
        alert(this.name);
      };
      return o;
    }
    var person1 = createPerson('Tom',9,'cat');
    var person2 = createPerson('Jerry',8,'mouse');
  ```
  * 优点 解决了创建多个相似对象时，代码复用问题
  * 缺点 使用工程模式创建的对象，没有解决对象识别的问题（对象的类型不明确）
  ```
    1. 工厂模式：主要工作原理是用函数来封装创建对象的细节，从而通过调用函数来达到复用的目的。但是它有一个很大的问题就是创建出来的对象无法和某个类型联系起来，只是简单的封装了复用代码，没有建立起对象和类型间的关系
  ```

## 2 构造函数模式

  ECMAScript 中的构造函数可用来创建特定类型的对象。像Object 和Array 这样的原生构造函数，在运行时自动出现在执行环境中。此外我们也可以创建自定义的构造函数，从而定义对象类型的属性和方法。如下例子：
  ```js
    function createPerson(name,age,job){
      this.name = name;
      this.age = age;
      this.job = job;
      this.sayName = function(){
        alert(this.name);
      }
      return this; // 使用new 时不写返回 也会默认返回this 对象
    }
    var person1 = new createPerson('Tom',9,'cat');
    var person2 = new createPerson('Jerry',8,'mouse');
  ```
  当我们使用构造函数实例化一个对象的时候，对象中会包含一个_proto_ 属性指向构造函数原型对象，而原型对象中则包含一个constructor 属性指向构造函数。因此在实例对象中，我们可以通过原型链来访问到constructor 属性，从而判断对象的类型。

  * 优点 解决了工厂模式中对象类型无法识别的问题，并且创建自定义的构造函数意味着将来可以将它的实例标识为一种特定的类型

  * 缺点 在Js 中函数是对象，在使用构造函数创建对象是，每个方法都会在实例对象中重写创建一遍。拿上面的例子来说，就意味着每创建一个对象，都会创建一个sayName 函数的实例，但它们其实做的都是相同的事，因此造成了内存的浪费

  ```
    2. 构造函数模式：Js 中每一个函数都可以作为构造函数，只要一个函数是通过new 来调用的，那么我们就可以把它称为构造函数。执行构造函数首先会创建一个对象，然后将对象的原型指向构造函数的prototype 属性，然后将执行上下文中的this 指向这个对象，最后再执行整个函数，如果返回值不是对象，则返回新建的对象。因为this 的值指向了新建的对象，所以我们可以使用this 给对象赋值，
  ```

## 3 原型模式

  我们创建的每一个函数都有一个prototype 属性，这个属性指向函数的原型对象，这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。我们通过使用原型对象可以让所有的对象实例共享它所包含的属性和方法，因此也解决了代码的复用问题。如下例子：
  ```js
    function Person(){}

    Person.prototype.name = 'Tom';
    Person.prototype.age = 9;
    Person.prototype.sayName = function(){
      alert(this.name);
    }

    var p1 = new Person();
    p1.sayName(); // Tom

    var p2 = new Person();
    p2.sayName(); // Tom

    p1.sayName === p2.sayName; // true
  ```
  与构造函数不同的是，原型对象上的属性和方法是所有实例所共享的。也就是说，p1 和p2 访问的都是同一组属性和同一个sayName() 函数

  * 优点 解决了构造函数模式中多次创建相同函数对象的问题，所有实例可以共享同一组属性和函数
  * 缺点 
    1. 省略了构造函数模式传递初始化参数的过程，所有实例在默认情况下都会取得默认的属性值，造成不便
    2. 因为所有实例都是共享一组属性，对于包含基本知识的属性来说没有问题，但是对于包含引用类型的值来说，所有的实例都是对同一个引用类型进行操作，那么属性的操作就不是独立的，最后导致读写的混乱。我们创建的实例一般都是要有属于自己的全部属性的，因此单独使用原型模式的情况是很少存在的

  ```
    3. 原型模式：因为每一个函数都有一个prototype 属性，这个属性是一个对象，它包含了通过构造函数创建的所有实例都能共享的属性和方法。因此我们可以使用原型对象来添加公用属性和方法，从而实现代码的复用。
  ```

## 4 组合使用构造函数和原型模式

  创建自定义类型的最常见方式，就是组合使用构造函数模式和原型模式。构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性。这种模式的好处就是，每个实例都会有自己的一份实例属性副本，但同时又共享着对方法的引用，最大限度地节省了内存，而且这种混合模式还支持向构造函数传递参数，可以说是集两种模式之长
  ```js
    function Person(name,age,job){
      this.name = name;
      this.age = age;
      this.obj = obj;
    }
    Person.prototype = {
      constructor: Person,
      sayName: function(){
        console.log(this.name);
      }
    }

    var tom = new Person('Tom',9,'cat');
    var jerry = new Person('Jerry',8,'mouse');

    tom.name; // Tom
    jerry.name; // Jerry
    tom.sayName === jerry.sayName; // true
  ```

  * 优点 采用了构造函数模式和原型模式的优点，这种混合模式是目前使用最广泛，认同度最高的一种创建自定义类型的方法

  * 缺点 由于使用了两种模式，对于代码的封装性来说不是很好

## 5 动态原型模式

  由于上面的混合模式存在封装性的问题，动态原型模式就是解决这个问题的一个方案。这个方法把所有信息都封装到了构造函数当中，而在构造函数中通过判断只初始化一次原型

  ```js
    function Person(name,age,job){
      this.name = name;
      this.age = age;
      this.job = job;

      if(typeof this.sayName !== 'function'){
        Person.prototype.sayName = function(){
          console.log('My name is ' + this.name);
        }
      }
    }

    var tom = new Person('Tom',9,'cat');
    tom.sayName(); // My name is Tom
  ```

## 6 寄生构造函数模式

  如果在前面几种模式不适用的情况下，可以使用寄生构造函数模式。这种模式的基本思想就是创建一个函数，该函数的作用仅仅是封装创建对象的代码，然后返回新创建的对象

  ```js
    function Person(name,age,job){
      var o = new Object();
      o.name = name;
      o.age = age;
      o.job = job;
      o.sayName = function(){
        console.log(this.name);
      }
      return 0;
    }
    var p1 = new Person('Tom',9,'cat');
  ```
  可以看出这个模式和工厂模式基本上一样，只不过我们是采用new 操作符最后来创建对象

  在构造函数不返回值的情况下，会默认返回新创建的对象，而通过在末尾添加的return 语句，可以重写调用构造函数时返回的值

  * 优点 基于一个已有的类型，在实例化时对实例化的对象进行扩展，既不用修改原来的构造函数，也达到了扩展对象的目的

  * 缺点 和工厂模式一样，不能依赖instanceof 操作符来确定对象的类型

## 7 稳妥构造函数模式

  Douglas Crockford 发明了JavaScript 中的稳妥对象这个概念。

  所谓稳妥对象，指的就是，没有公共属性，而且其方法也不实用this 的对象

  稳妥对象最适合在一些安全的环境中（这些环境会禁用this 和 new），或者在防止数据被其他应用程序改动时使用

  稳妥构造函数遵循与寄生构造函数类似的模式，但有两点不同
  1. 新创建的对象的实例方法不引用this
  2. 不使用 new 操作符调用构造函数

  ```js
    function Person(name,age,job){
      var o = new Object();

      o.sayName = function(){
        console.log( name );
      }

      return o;
    }

    var p1 = Person('Tom',9,'cat');
    p1.sayName(); // Tom
  ```
  * 优点 除了暴露的方法（sayName）外，没有别的办法可以访问数据成员，这就是稳妥构造函数提供的安全性
  * 缺点 和寄生构造函数一样，没有办法使用instanceof 判断对象的类型
