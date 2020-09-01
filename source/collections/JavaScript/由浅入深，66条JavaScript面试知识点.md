---
title: 由浅入深，66条JavaScript面试知识点
date: 2020-08-16
---
  * 作者：Jake Zhang
  * 来源：https://juejin.im/post/5ef8377f6fb9a07e693a6061

## 分类

1. HTML&CSS
  - 浏览器内核
  - 盒模型、flex布局、两/三栏布局、水平/垂直居中
  - BFC、清楚浮动
  - css3动画、H5新特性

2. JavaScript
  - 继承、原型链、this 指向、设计模式、call,apply,bind
  - new 实现、防抖节流、let,var,const 区别、暂时性死区、event、loop
  - promise 使用及实现、promise 并行执行和顺序执行
  - async/await 的优缺点
  - 闭包、垃圾回收和内存泄露、数组方法、数组乱序、数组扁平化、事件委托、事件监听、事件模型

3. Vue
  - vue数据双向绑定原理
  - vue computed原理、computed和watch的区别
  - vue编译器结构图、生命周期、vue组件通信
  - mvvm模式、mvc模式理解
  - vue dom diff、vuex、vue-router

4. 网络
  - HTTP1, HTTP2, HTTPS、常见的http状态码
  - 浏览从输入网址到回车发生了什么
  - 前端安全（CSRF、XSS）
  - 前端跨域、浏览器缓存、cookie, session, token, localstorage, sessionstorage
  - TCP连接(三次握手, 四次挥手)

5. 性能相关
  - 图片优化的方式 
  - 500 张图片，如何实现预加载优化 
  - 懒加载具体实现 
  - 减少http请求的方式

## 正题
### 1 介绍一下js 的数据类型有哪些，值是如何存储的
  * JavaScript 共有8种数据类型
    - 7种基本数据类型：undefined null boolean number string Symbol 和BigInt
    - 1种引用数据类型：object Object本质上是由一组无序的键值对组成的，包含function、Array、Date等。
    - JavaScript 不支持任何创建自定义类型的机制，所有的值最终都将是上述8种数据类型之一
  * 原始数据类型：直接存储在栈（stack）中，占据空间小、大小固定，属于被频繁使用的数据，所以放入栈中存储
  * 引用数据类型：同时存储在栈（stack）和堆（heap）中，占据空间大、大小不固定。引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体值

### 2 && || !! 运算符
  * && ：逻辑与，在其操作数中找到第一个虚值表达式并返回它，如果没有找到任何虚值表达式，则返回最后一个真值表达式。它采用短路来防止不必要的工作
  * || ：逻辑或，在其操作数中找到第一个真值表达式并返回它。这也使用了短路来防止不必要的工作。在支持ES6 默认函数参数之前，它用于初始化函数中的默认参数
  * !! ：可以将右侧的值强制转换为布尔值，这也是将值转换为布尔值的一种简单方法

### 3 js的数据类型的转换
  在js 中类型转换只有三种情况
  * 转换为布尔值（Boolean()）
  
    原始值 | 转换目标 | 结果 
    --- | --- | ---
    number | 布尔值 | 除了 0、NaN 都为 true
    string | 布尔值 | 除了 空字符串'' 都为 true
    undefined、null | 布尔值 | false
    引用类型 | 布尔值 | true

  * 转换为数字（Number() parseInt() parseFloat()）

    原始值 | 转换目标 | 结果 
    --- | --- | ---
    string | 数字 | '0' => 0 'a' => NaN
    数组 | 数字 | []=>0 存在一个元素且为数字时转数字 其它情况为NaN
    null | 数字 | 0
    除了数组的引用类型 | 数字 | NaN
    Symbol | 数字 | 报错 Uncaught TypeError: Cannot convert a Symbol value to a number

  * 转换为字符串（toString() String()）
    
    原始值 | 转换目标 | 结果 
    --- | --- | ---
    number | 字符串 | 0 => '0'
    boolean | 字符串 | 'true' 'false'
    function | 字符串 | function(){something} = > 'function(){something}'
    Symbol | 字符串 | Symbol(1) => 'Symbol(1)'
    数组 | 字符串 | [1,2] => '1,2'
    对象 | 字符串 | '[object,object]'
    
    ```
      null 和 undefined 没有 .toString() 方法
    ```

### 4 JS中数据类型的判断（typeof instanceof constructor Object.prototype.toString.call() ） 
  1. typeof `typeof 对于原始类型来说，除了null 都可以显示正确的类型`
  ```js
    typeof 2; // number
    typeof true; // boolean
    typeof 'str'; // string
    typeof []; // object
    typeof function(){}; // function
    typeof {}; // object
    typeof undefined; // undefined
    typeof null; // object
  ```
  typeof 对于对象来说，除了函数都会显示 object，所以说 typeof 并不能准确判断变量到底是什么类型,所以想判断一个对象的正确类型，这时候可以考虑使用 instanceof

  2. instanceof `instanceof 可以正确的判断对象的类型，因为内部机制是通过判断对象的原型链中是不是能找到类型的 prototype`
  ```js
    2 instanceof Number; // false
    true instanceof Boolean; // false
    'str' instanceof String; // false
    [] instanceof Array; // true
    function(){} instanceof Function; // true
    {} instanceof Object; // true
  ```
  直接的字面量判断数据类型，instanceof 可以精准判断引用数据类型（Array Function Object），而基本数据类型不能被instanceof 精准判断

  `instanceof` 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。其意思就是判断对象是否是某一数据类型（如Array）的实例，请重点关注一下是判断一个对象是否是数据类型的实例。在这里字面量值，2， true ，'str'不是实例，所以判断值为false。

  3. constructor
  ```js
    (2).constructor === Number; // true
    (true).constructor === Boolean; // true
    ('str').constructor === String; // true
    ([]).constructor === Array; // true
    (function(){}).constructor === Function; // true
    ({}).constructor === Object; // true

    <!-- 改变对象的原型，constructor 就不可靠了 -->
    function Fn(){};
    Fn.prototype = new Array();
    var f = new Fn();

    Fn.constructor === Function; // true
    f.constructor === Fn; // false
    f.constructor === Array; // true
  ```
  4. Object.prototype.toString.call() `使用Object 对象的原型方法toString，使用call 进行狸猫换太子，借用Object 的toString 方法`
  ```js
    let a = Object.ptototype.toString;

    a.call(2); // [object Number]
    a.call('string'); // [object String]
    a.call([]); // [object Array]
    a.call(function(){}); // [object Function]
    a.call({}); // [object Object]
    a.call(undefined); // [object Undefined]
    a.call(null); // [object Null]
  ```

### 5 js 有哪些内置对象

  * js 内置对象主要是指在程序执行前存在全局作用域里的由js定义的一些全局值属性、函数和用来实例化其它对象的构造函数对象。

  * 一般我们经常用到的如：
    - 全局变量值 NaN undefined
    - 全局函数 parseInt() oarseFloat()
    - 用来实例化对象的构造函数 Date Object 
    - 提供数学计算的单体内置对象 Math

  * 全局的对象（global objects）或者称为标准内置对象，不要和“全局对象（global object）”混淆。这里说的全局的对象是说在全局作用域里的对象。全局作用域中的其它对象可以由用户的脚本创建或由宿主程序提供。

  * 标准内置对象的分类
    
    1. 值属性 这些全局属性返回一个简单之，这些值没有自己的属性和方法
        - 例如：Infintity NaN undefiend null 字面量
    
    2. 函数属性 全局函数可以直接调用，不需要再调用时指定所属对象，执行结束后将结果直接返回给调用者
        - 例如：eval() parseFloat() parseInt() 等
    
    3. 基本对象 定义或使用其它对象的基础，包括一般对象、函数对象和错误对象
        - 例如：Object Function Boolean Symbol Error 等

    4. 数字和日期对象 用来表示数字、日期、和执行数学计算的对象
        - 例如：Number Math Date
    
    5. 字符串 用来表示和操作字符串的对象
        - 例如： String RegExp
    
    6. 可索引的集合对象 这些对象表示按照索引值来排序的数据集合，包括数组和类型化数组，以及类数组结构的对象。
        - 例如：Array
    
    7. 使用键的集合对象 这些集合对象再存储数据是会使用到键，支持按照插入顺序来迭代元素
        - 例如：Map Set WeakMap WeakSet
    
    8. 矢量集合 SIMD 矢量集合中的数据会被组织为一个数据序列
        - 例如：SIMD 等
    
    9. 结构化数据 这些对象用来表示和操作结构化的缓冲区数据，或使用JSON 编码的数据
        - 例如：JSON
    
    10. 控制抽象对象
        - 例如：Promise Generator 等
    
    11. 反射
        - 例如：Reflect Proxy
    
    12. 国际化 为了支持多语言处理而引入的对象
        - 例如：Intl Intl.Collator 等
    
    13. WebAssembly
    14. 其他
        - 例如：arguments

    15. 详细资料可以参考：[《表内置对象的分类》](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects)、[《JS 所有内置对象属性和方法汇总》](https://segmentfault.com/a/1190000011467723#articleHeader24)

### 6 undefined 与 undeclared 的区别

  * undefined 已在作用域中声明但是还没有赋值的变量
  * undeclared 没有在作用域中声明过的变量

  对于undeclared 变量的引用，浏览器会报引用错误，如ReferenceError: b is not defined。我们可以使用typeof 的安全防范机制来避免报错，对于undecalared 变量,typeof 会返回 undefined

### 7 null 和 undefined 的区别

  首先，undefined 和 null 都是基本数据类型，这两个基本数据类型分别都只有一个值
  
  undefined 代表的含义是未定义，null 代表的含义是空对象（不是真正的对象）

  一般变量声明了但还没有定义的时候会返回undefined，null 主要用于赋值给一些可能会返回对象的变量作为初始化

  `其实，null 不是对象，虽然typeof null 会输出object，但是这只是JS 存在的一个历史悠久的BUG 在JS 的最初版本中使用的是32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表的是对象，然而null 表示全为0，所以将它错误地判断为object 虽然现在的内部类型判断代码已经改变了，但是对于这个Bug 还是一直流传下来` 

  undefined 在js 中不是一个保留字，这意味着我们可以使用undefined 来作为一个变量名，这样的做法是非常危险的，它会影响我们对undefined 值的判断。但是我们可以通过一些方法获得安全的undefined 值，void 0

  当我们对这两种类型使用typeof 进行判断的时候，null 类型化会返回"object",这是一个历史遗留问题，当我们使用双等号对两种类型的值进行比较时会返回true，使用三个等号（全等）会返回false

  详细资料可以参考，[《JavaScript 深入理解之 undefined 与 null》](http://cavszhouyou.top/JavaScript%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3%E4%B9%8Bundefined%E4%B8%8Enull.html)

### 8 {}和[]的valueOf 和toString 的结果是什么？

  * {} 的valueOf 结果为 {}，toString 的结果为 "[object object]"
  * [] 的valueOf 结果为 []，toString 的结果为 ""

### 9 JavaScript 的作用域和作用域链
  * 作用域：作用域是定义变量的区域，它有一套访问变量的规则，这套规则来管理浏览器引擎如何在当前作用域以及嵌套的作用域中根据变量（标识符）进行变量查找

  * 作用域链：作用域链的作用是保证对执行环节有权访问的所有变量和函数的有序访问，通过作用域链，我们可以访问到外层环节的变量和函数

  作用域链的本质上是一个指向变量的指针列表，变量对象是一个包含了执行环境中所有变量和函数的对象。作用域链的前端始终都是当前执行上下文的变量对象。全局执行上下文的变量对象（也就是全局对象）始终是作用域链的最后一个对象

  当我们查找一个变量时，如果当前执行环境中没有找到，可以沿着作用域链向后查找

  作用域链的创建过程跟执行上下文的建立有关

  详细资料参考：[《JavaScript 深入理解之作用域链》](http://cavszhouyou.top/JavaScript%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3%E4%B9%8B%E4%BD%9C%E7%94%A8%E5%9F%9F%E9%93%BE.html),[「前端料包」深究JavaScript作用域（链）知识点和闭包](https://juejin.im/post/6844904126216830984)

### 10 JavaScript 创建对象的几种方式

  我们一般使用字面量的形式直接创建对象，但是这种创建方式对于创建大量相似对象的时候，会产生大量的重复代码。但Js 和一般的面向对象的语言不同，在ES6 之前没有类的概念，我们可以使用函数来进行模拟，从而产生出可以复用的对象创建方式
  
  1. 工厂模式：主要工作原理是用函数来封装创建对象的细节，从而通过调用函数来达到复用的目的。但是它有一个很大的问题就是创建出来的对象无法和某个类型联系起来，只是简单的封装了复用代码，没有建立起对象和类型间的关系

  2. 构造函数模式：Js 中每一个函数都可以作为构造函数，只要一个函数是通过new 来调用的，那么我们就可以把它称为构造函数。执行构造函数首先会创建一个对象，然后将对象的原型指向构造函数的prototype 属性，然后将执行上下文中的this 指向这个对象，最后再执行整个函数，如果返回值不是对象，则返回新建的对象。因为this 的值指向了新建的对象，所以我们可以使用this 给对象赋值，

  - 构造函数相对于工厂模式的优点是，所创建的对象和构造函数之间建立起了联系，引起我们可以通过原型来识别对象的类型。

  - 但是构造函数存在一个缺点就是，造成了不必要的函数对象的创建，因为在js 中函数也是一个对象，因此如果对象属性中包含元素的话，那么每次都会新建一个函数对象，浪费了不必要的内存空间，因为函数时所有的实例都可以通用的。

  3. 原型模式：因为每一个函数都有一个prototype 属性，这个属性是一个对象，它包含了通过构造函数创建的所有实例都能共享的属性和方法。因此我们可以使用原型对象来添加公用属性和方法，从而实现代码的复用。

  - 这种方式相对于构造函数模式来说，解决了函数对象的复用问题，但是这种模式也存在一些问题，一是没有办法通过传入参数来初始化值，另一个是如果存在一个引用类型如Array 这样的值，name所有的实例将共享一个对象，一个实例对引用类型值的改变会影响所有的实例。

  4. 组合使用构造函数模式和原型模式：这是创建自定义类型的最常见方式。

  - 因为构造函数和原型模式分开使用都存在一些问题，因此我们可以组合使用者两种模式，通过构造函数来初始化对象的属性，通过原型对象来实现函数方法的复用

  - 这种方法很好地解决了两种模式单独使用时的缺点，但是有一点不足的就是，因为使用了两种不同的模式，所以对于代码的封装性不是很好

  5. 动态原型模式：这一种模式将原型方法赋值的创建过程移动到了构造函数的内部，通过对属性是否存在的判断，可以实现仅在第一次调用函数时对原型对象赋值一次的结果

  - 这一种方式很好地对上面的混合模式进行了封装

  6. 寄生构造函数模式：这一种模式和工厂模式的实现基本相同，它主要是基于一个已有的类型，在实例化时对实例化的对象进行扩展，这样既不用修改原来的构造函数，也达到了扩展对象的目的

  - 它的缺点和工厂模式一样，无法实现对象的识别

  详细资料可以参考：[《JavaScript 深入理解之对象创建》](http://cavszhouyou.top/JavaScript%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3%E4%B9%8B%E5%AF%B9%E8%B1%A1%E5%88%9B%E5%BB%BA.html)

### 11 JavaScript 继承的几种实现方式
  1. 以原型链的方式来实现继承

  - 但是这种方法存在的缺点，在包含有引用类型的数据时，会被所有的实例对象共享，容易造成修改的混乱；并且在创建子类型的时候不能向超类型传递参数

  2. 借用构造函数 这种方式是通过在子类型的函数中调用超类型的构造函数来实现的

  - 这种方法解决了不能向超类型传递参数的缺点，但是它无法实现函数方法的复用，并且超类型原型定义的方法，子类也没有办法访问到

  3. 组合继承 组合继承是将原型链和借用构造函数组合起来使用的一种方式。

  - 通过借用构造函数的方式来实现类型的属性的继承，通过将子类型的原型设置为超类型的实例来实现方法的继承。
  
  - 通过这种方式解决了上面的两种模式单独使用时的问题，但是由于我们是以超类型的实例来作为子类型的原型，所以调用了两次超类型的构造函数，造成了子类型的原型中多了很多不必要的属性

  4. 原型式继承 主要思路就是基于已有的对象来创建新对象

  - 实现原理：向函数中传入一个对象，然后返回一个以这个对象为原型的对象。这种继承的思路主要不是为了实现创造一种新的类型，只是对某个对象实现一种简单继承

  - ES5 汇总定义的Object.create() 方法就是原型式继承的实现，缺点与原型链方式相同

  5. 寄生式继承 寄生式的思路是创建一个用于封装继承过程的函数，通过传入一个对象，然后复制一个对象的副本，然后进行扩展，最后返回这个对象。

  - 这个扩展的过程就可以理解是一种继承，这种继承的优点就是对一个简单对象实现继承，如果这个对象不是我们自定义类型时。

  - 缺点是没有办法实现函数的复用

  6. 寄生式组合继承 使用超类型的原型副本作为子类型的原型，避免了不必要的属性

  - 缺点就是使用超类型的实例作为子类型的原型，导致了不必要的原型属性

  详细参考：[《JavaScript 深入理解之继承》](http://cavszhouyou.top/JavaScript%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3%E4%B9%8B%E7%BB%A7%E6%89%BF.html)

### 12 寄生式组合继承的实现

    ```js
      function Person(name){
        this.name = name;
      }
      Person.prototype.sayName = function(){
        console.log(this.name);
      }
      function Student(name,grade){
        Person.call(this,name);
        this.grade = grade;
      }

      Student.prototype = Object.create(Person.prototype);
      Student.prototype.constructor = Student;

      Student.prototype.sayMyGrade = function(){
        console.log('grade is ',this.grade);
      }
    ```

### 13 对this、call、apply 和bind 的理解

  1. 在浏览器中，全局范围内this 指向window 对象
  2. 在函数中，this 永远指向最后调用他的那个对象
  3. 构造函数中，this 指向new 出来的那个新的对象
  4. call、apply、bind 中的this 被强绑定在指定的那个对象上
  5. 箭头函数中this 比较特殊，箭头函数this 为父作用域的this，不是调用时的this，前四种都是调用时确定（动态），而箭头函数的this 指向是静态的，声明的时候就确定了下来
  6. apply、call、bind 都是js给函数内置的API，调用他们可以为函数指定this 的指向，同时也可以传参

### 14 JavaScript 原型、原型链？有什么特点？

  在js 中我们是使用构造函数来新建一个对象的，每一个构造函数的内部都有一个prototype 属性值，这个属性值是一个对象，这个对象包含了可以由该构造函数的所有实例共享的属性和方法。

  当我们使用构造函数新建一个对象后，在这个对象的内部将包含一个指针，这个指针指向构造函数的prototype 属性对应的值，在ES5 中这个指针被称为对象的原型。

  一般来说，我们是不应该能够获取到这个值的，但是现在浏览器中都实现了**proto**属性来让我们访问这个属性，但是我们最好不要使用这个属性，因为它不是规范中规定的。

  ES5 中新增了一个Object.getPrototypeOf() 方法，我们可以通过这个方法来获取对象的原型。

  当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么它就会去它的原型对象里找到这个属性，这个原型对象又会有自己的原型，于是这样一直找下去，也就是原型链的概念。

  原型链的尽头一般来说是Object.prototypr 所以这就是我们新建的对象，为什么能够使用toString() 等方法的原因

  * 特点 JavaScript 对象是通过引用来传递的，我们创建的每个新对象实体中并没有一份属于自己的原型副本。当我们修改原型时，与之相关的对象也会继承这一改变。

  参考资料：[《JavaScript 深入理解之原型与原型链》](http://cavszhouyou.top/JavaScript%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3%E4%B9%8B%E5%8E%9F%E5%9E%8B%E4%B8%8E%E5%8E%9F%E5%9E%8B%E9%93%BE.html)

### 15 js 获取原型的方法

  * obj.__proto__
  * obj.constructor.prototype
  * Object.getPrototypeOf(obj)

### 16 什么是闭包，为什么要使用它？

  闭包是指有权访问另一个函数作用域内变量的函数，创建闭包的常见方式就是在一个函数内创建另一个函数，创建的函数可以访问到当前函数的局部变量。

  闭包的常用用途：
  1. 使我们在函数外部能够访问到函数内部的变量，通过闭包，我们可以在外部调用闭包函数，从而在外部访问到函数内部的变量，可以使用这种方法来创建私有变量
  2. 使已经运行结束的函数上下文中的变量对象继续留在内存中，因为闭包函数保留了这个变量的对象的引用，所以这个变量对象不会被回收

  ```js
    function a(){
      let a = 0;
      function add(){
        n++;
        console.log(n);
      }
      return add;
    }
    let a1 = a(); // 返回函数add
    a1(); // 1
    a1(); // 2
  ```

  闭包的本质就是作用域链的一个特殊的应用，了解作用域链的创建过程，就能够理解闭包的实现原理

### 17 什么是DOM BOM ?

  DOM：文档对象模型，它指的是把文档当做一个对象来对待，这个对象主要定义了处理网页内容的方法和接口

  BOM：浏览器对象模型，把浏览器当做一个对象来对待，这个对象主要定义了与浏览器进行交互的方法和接口。

  BOM 的核心是window，而window 对象具有双重角色，及时通过js 访问浏览器窗口的一个接口，又是一个Global（全局）对象。这意味着在网页中定义的任何对象、变量和函数，都作为全局对象的一个属性或者方法存在。window 对象含有location对象、navigator对象、screen 对象等子对象，并且DOM 的最根本的对象document 对象也是BOM 的window 对象的子对象

### 18 三种事件模型

  事件 是用户操作网页时发生的交互动作或者网页本身的一些操作，现代浏览器一共有三种事件模型

  1. DOM0级模型：这种模型不会传播，所以没有事件流的概念，但是现在有的浏览器支持以冒泡的方式实现，他可以在网页中直接定义监听函数，也可以通过js属性来指定监听函数，这种方式是所有浏览器都兼容的

  2. IE 事件模型：在改时间模型中，一次事件共有两个过程，事件处理阶段和时间冒泡阶段。事件处理阶段会首先执行目标元素绑定的监听事件。然后是事件冒泡阶段，冒泡指的是事件从目标元素冒泡到document，一次检查经过的节点是否绑定了事件监听函数，如果有就执行。这种模型通过attachEvent 来添加监听函数，可以添加多个监听函数，会按顺序依次执行

  3. DOM2级事件模型：在该事件模型中，依次事件共有三个过程，第一个过程是事件捕获阶段，捕获指的是事件从document 一直向下传播到目标元素，依次检查经过的节点是否绑定了事件监听函数，如果有就执行。后面两个阶段和IE事件模型的两个阶段相同。这种事件模型，事件绑定的函数时addEventListener，其中第三个参数可以指定时间是否在捕获阶段执行

  参考资料：[《一个 DOM 元素绑定多个事件时，先执行冒泡还是捕获》](https://blog.csdn.net/u013217071/article/details/77613706)

### 19 事件委托是什么

  事件委托 本质上是利用了浏览器事件冒泡的机制。

  因为事件在冒泡过程中会上传到父节点，并且父节点可以通过对象获取到目标节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件，这种方式称为事件代理

  使用事件代理我们可以不必要为每一个子元素都绑定一个监听事件，这样就减少了内存上的消耗。并且使用事件代理我们还可以实现事件的动态绑定，比如说新增了一个子节点，我们并不需要单独地为它添加一个监听事件，它所发生的事件会交给父元素中的监听函数来处理

  参考资料：[《JavaScript 事件委托详解》](https://zhuanlan.zhihu.com/p/26536815)

### 20 什么是事件传播

  当事件发生在DOM元素上时，该事件并不完全发生在那个元素上。

  事件传播的三个阶段：
  1. 捕获阶段 事件从window 开始，向下到每个元素，直到到达目标元素事件或event.tartget
  2. 目标阶段 事件已经到达目标元素
  3. 冒泡阶段 事件从目标元素冒泡，上升到每个元素，直到到达window

### 21 什么是事件捕获

  当事件发生在DOM 元素上时，该事件并不完全发生在那个元素上。在捕获阶段，事件从window 开始，一直到触发事件的元素
  ```
    window -> document -> html -> body ----> 目标元素
  ```

### 22 什么是事件冒泡

  事件冒泡正好与事件捕获相反，当事件发生在DOM 元素上时，该事件并不完全发生在那个元素上。在冒泡阶段，事件冒泡，或者事件发生在它的父代，祖父母乃至祖代，直到到达window 为止
  ```
    目标元素 ---> body -> html -> documnet -> window
  ```

### 23 DOM 操作——添加、移除、移动、复制、创建和查找节点

  1. 创建新节点
  ```js
    createDocumentFrament(); // 创建一个DOM片段
    createElement(); // 创建一个具体的元素
    createTextNode(); // 创建一个文本节点
  ```

  2. 添加、移除、替换、插入
  ```js
    appendChild(node);
    removeChild(node);
    replaceChild(new,old);
    insertBefore(new,old);
  ```

  3. 查找
  ```js
    getElementById();
    getElementByName();
    getElementsByTagName();
    getElementsByClassName();
    querySelector();
    querySelectorAll();
  ```

  4. 属性操作
  ```js
    getAttribute(key);
    setAttribute(key,value);
    hasAttribute(key);
    removeAttribute(key);
  ```

### 24 js 数组和字符串有哪些原生方法，列举一下

  1. 数组

数组方法 | 说明
--- | ---
push() | 向数组末尾添加一个或多个元素，返回新的长度（添加元素后的数组长度）
shift() | 用于把数组的第一个元素从其中删除，返回第一个元素的值
unshift() | 向数组的开头添加一个或多个元素，返回新的长度
pop() | 用于删除并返回数组的最后一个元素
concat() | 连接两个或多个数组
join() | 将数组内的元素放入字符串中，以指定分隔符进行分隔，默认（,）
toString() | 把数组转换为字符串
reverse() | 将数组中的元素倒序
slice() | 从已有的数组中返回选定的元素
splice() | 用于插入、删除或替换数组的元素
sort() | 对数组进行排序（从小到大）
indexOf() | 返回获取项在数组中的索引
lastIndexOf() | 返回获取项在数组中出现的最后一次索引
forEach() | 循环遍历数组，默认返回undefined
map() | 循环遍历数组，参数是一个匿名函数，返回指定元素或undefined
filter() | 过滤数组
find() | 查找数组中符合条件的第一个元素

  2. 字符串

字符串方法 | 说明
--- | ---
charAt() | 返回在指定位置的字符
charCodeAt() | 返回在指定的位置的字符的Unicode 编码
concat() | 连接字符串
indexOf() | 检索字符串
match() | 匹配正则
replace() | 替换与正则匹配的子串
search() | 检索与正则匹配的值
slice() | 提取字符串片段，返回被提取的部分
split() | 字符串分割为数组
toLocaleLowerCase() | 转为小写
toLowerCase() | 转为小写
toLocaleUpperCase() | 转为大写
toUpperCase() | 转为大写
substr() | 从指定下标提取指定数目的字符
substring() | 提取两个指定的索引号之间的字符

### 25 常用的正则表达式

  ```js
    // 匹配16进制颜色值
    const color = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g

    // 匹配日期，如 yyyy-mm-dd 格式
    const date = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/

    // 匹配QQ号
    const qq = /^[1-9][0-9]{4,10}$/g

    // 手机号码 34578
    const phone = /^1[34578]\d{9}$/g

    // 用户名
    const userName = /^[a-zA-Z\$][a-zA-Z0-9_\$]{4,16}$/

    // email
    const email = /^([a-zA-Z0-9_\-\.])+\@([a-zA-Z0-9_\-\.])+\.([a-zA-Z]{2,4})$/
    
    // 身份证18位
    const idCard = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/

    // URL
    const url = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/

    // ipv4
    const ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

    // 车牌号
    const carNo = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/

    // 必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间
    const psw = /^(?=.\d)(?=.[a-z])(?=.[A-Z]).{8,10}$/
  ```

### 26 Ajax 是什么？如何创建Ajax？

  Ajax 是一种异步通信的方法，通过js 脚本向服务器发起http 通信，然后根据服务器返回的数据，更新网页的相应部分，而不用刷新整个页面的一种方法

  **创建步骤**

  创建xhr 对象 -> 配置Ajax 请求地址 -> 发送请求 -> 监听请求，接受响应

  ***原生写法***

  ```js
    // 创建xhr 对象
    const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXOBjext('Microsoft.XMLHTTP'); // 兼容IE 6以下版本

    // 配置Ajax 请求地址
    xhr.open('get','index.html',true);

    // 发送请求
    xhr.send(null);

    // 监听请求，接受响应
    xhr.onreadystatechange = function(){
      if(xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304){
        console.log(xhr.responsetXML);
      }
    }
  ```

  **JQuery写法**

  ```js
    $.ajax({
      type:'post',
      url:'/',
      async:true,
      data:data,
      dataType:'jsonp',
      success:function(res){

      },
      error:function(err)[

      ]
    })
  ```

  **Promise 封装实现**

  ```js
    function get(url){
      let promise = new Promise(function(resolve,reject){
        let xhr = new XMLHttpRequest();
        xhr.open('GET',url,true);

        xhr.onreadystatechange = function(){
          if(this.readState !== 4) return ;

          if(this.status === 200){
            resolve(this.respone);
          }else{
            reject(new Error(this.statusText));
          }
        };

        xhr.onerror = function(){
          reject(new Error(this.statusText));
        };

        xhr.responeType = 'json';

        xhr.setRequestHeader('Accept','application/json');

        xhr.send(null);
      });

      return promise;
    }
  ```

### 27 js 延迟加载的方式有哪些？

  js 的加载、解析和执行会阻塞页面的渲染过程，因此我们希望js脚本能够尽可能地延迟加载，提高页面的渲染速度

  1. 将js 脚本放在文档的地步，使js 脚本尽可能地在左后来加载执行
  2. 给js 脚本添加defer 属性，这个属性会让脚本的加载与文档的解析同步解析，然后在文档解析完成之后再执行这个脚本文件，这样就能使页面的渲染不被阻塞。多个设置了defer 属性的脚本按规范来说最后是顺序执行的，但是在一些浏览器中可能不是这样
  3. 给js 脚本添加async 属性，这个属性回事脚本异步加载，不会阻塞页面的解析过程，但是当脚本加载完成后立即执行js 脚本，这个时候如果文档没有解析完成的话同样会被阻塞。多个async 属性的脚本的执行顺序是不可预测的，一般不会按照代码的顺序依次执行
  4. 动态创建DOM 标签的方式，我们可以对文档的加载事件进行监听，当文档加载完成后再动态的创建script 标签来引入js 脚本

  参考资料：[《JS 延迟加载的几种方式》](https://blog.csdn.net/meijory/article/details/76389762)、[《HTML 5 script async 属性》](https://www.w3school.com.cn/html5/att_script_async.asp)

### 28 谈谈对模块化开发的理解

  一个模块是实现一个特定功能的一组方法。在最开始的时候，js 只实现一些简单的功能，所以并没有模块的概念，但随着程序越来越复杂，代码的模块化开发编的越来越重要

  由于函数具有独立作用域的特点，最原始的写法是使用函数来作为模块，这样解决了直接使用函数作为模块的一些缺点，但是这种办法会暴露所有的模块成员，外部代码可以修改内部属性的值

  现在最常用的是立即执行函数的写法，通过利用闭包来实现模块私有作用域的建立，同时不会对全局作用域造成污染

  相关资料：[《浅谈模块化开发》](https://juejin.im/post/6844903581661790216)、[《Javascript 模块化编程（一）：模块的写法》](http://www.ruanyifeng.com/blog/2012/10/javascript_module.html)、[《前端模块化：CommonJS，AMD，CMD，ES6》](https://juejin.im/post/6844903576309858318)、[《前端模块化：CommonJS，AMD，CMD，ES6》](https://juejin.im/post/6844903576309858318)、[《Module 的语法》](https://es6.ruanyifeng.com/#docs/module)

### 29 js 的几种模块规范

  1. CommonJS 方案，通过require 来引入模块，通过module.exports 定义模块的输出接口。这种模块加载方案是服务器端的解决方案，它是以同步的方式来引入模块的，因为在服务器端文件都存储在本地磁盘，所以读取非常快，所以以同步的方式加载没有问题，但是在浏览器端，由于模块的加载是使用网络请求，因此使用异步加载更加合适

  2. AMD 方案，这种方案采用异步加载的方式来加载模块，模块的加载不影响后面语句的执行，所有依赖这个模块的语句都定义在一个回调函数中，等到加载完成后再执行回调函数，require.js 实现了AMD 规范

  3. CMD 方案，这种方案和AMD 方案都是为了解决异步模块加载的问题，sea.js 实现了CMD 规范，它和require.js 的区别在于模块定义时对依赖的处理不同，对依赖模块的执行时机不同

  4. ES6提出的 使用import 和 export 的形式来导入导出模块

### 30 AMD 和 CMD 规范的区别

  1. 在模块定义时对依赖的处理不同：AMD 推崇依赖前置，在定义模块的时候就要声明其依赖的模块。而CMD 则推崇就近依赖，只有在用到某个模块的时候再去require

  2. 对依赖模块的执行时机处理不同：首先AMD 和CMD 对于模块的加载方式都是异步加载，不过它们的区别在于，模块的执行时机，AMD 在依赖模块加载完成后就直接执行依赖模块，依赖模块的执行顺序和我们的书写顺序不一定一致。而CMD 在依赖模块加载完成后并不执行，只是下载而已，等到所有依赖模块都加载好后，进入回调函数逻辑，遇到require 语句的时候才执行对应的模块，这样模块的执行顺序就和我们书写的顺序一致了

  ```js
     // CMD
     define(function(require, exports, module){
       let a = require('./a');
       a.doSomething();
       // ...
       let b = require('./b'); // 依赖可就近书写
       b.doSomething();

     });

     // AMD
     define(['./a','./b'],function(a,b){
       a.doSomething();
       // ...
       b.doSomething();
     });
  ```

  参考资料：[《前端模块化，AMD 与 CMD 的区别》](https://juejin.im/post/6844903541853650951)

### 31 ES6 模块与 CommonJS模块、AMD、CMD 的差异

  1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。ES6 模块的运行机制与CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令 import，就会生成一个只读引用，等脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值

  2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。CommonJS 模块就是对象，即在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法，这种加载称为“运行时加载”。而ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成

### 32 requireJS 的核心原理是什么？

  require.js 的核心原理是通过动态创建script 脚本来引入模块，然后对每个脚本的load 事件进行监听，如果每个脚本都加载完成了，再调用回调函数

  参考资料：[ 《requireJS 的用法和原理分析》](https://github.com/HRFE/blog/issues/10)、[《requireJS 的核心原理是什么？》](https://zhuanlan.zhihu.com/p/55039478)、[《requireJS 原理分析》](https://www.jianshu.com/p/5a39535909e4)

### 33 谈谈JS的运行机制

  1. js 单线程

  JavaScript 语言的一大特点就是单线程，即同一时间只能做一件事情
  ```md
    JavaScript 的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript 的主要用途是与用户互动，以及操作DOM。
    
    这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定JavaScript 同时有两个线程，一个线程在某个DOM 节点上添加内容，另一个线程删除了这个节点，这时候浏览器应该以哪个线程为准？

    所以，为了避免复杂性，从一诞生，JavaScript 就是单线程，这已经成了这门语言的核心特征，将来也不会改变
  ```

  2. js 事件循环

  js 代码执行过程中会有很多的任务，这些任务总的分为两类
  - 同步任务
  - 异步任务

  当我们打开网站时，网页的渲染过程就是一大推同步任务，比如页面骨架和页面元素的渲染。而像加载图片音乐之类占用资源大、耗时久的任务就是异步任务

  ```md
    任务进入执行栈
    |
    | 同步任务还是异步任务
    | 
    | -> 同步 -> 主线程 -> 任务全部执行完毕 -> 读取任务队列中的结果，进入主线程执行 <-↓
    |
    | -> 异步 -> Event Table -> 注册回调函数 -> Event Queue <---------------------↑
  ```

  - 同步和异步任务分别进入不同的执行“场所”，同步的进入主线程，异步的进入Event Table 并注册函数
  - 当指定的事情完成时，Eevent Table 会将这个函数移入Event Queue
  - 主线程内的任务执行完毕为空，会去Event Queue 读取对应的函数，进入主线程执行
  - 上述过程会不断重复，也就是常说的Event Loop 事件循环

  **那么主线程执行栈何时为空呢？**

  js 引擎存在moitoring process 进程，会持续不断的检查主线程执行栈是否为空，一旦为空，就会去Event Queue 那里检查是否有等待被调用的函数

  以上就是js 运行的整体流程，需要注意的是，除了同步任务和异步任务，任务还可以分为macrotask（宏任务）和microtask（微任务），js 会优先执行微任务
  ```md
    微任务包括了promise 的回调、node 中的process.nextTick、对Dom 变化监听的 MutationObserver

    宏任务包括了script 脚本的执行、setTimeout、setInterval、setImmediate 一类的定时事件，还有I/O操作、UI渲染等
  ```

  ```md
    1. 首先js 是单线程运行的，在代码执行的时候，通过将不同函数的执行上下文压入执行栈中来保证代码的有序执行

    2. 在执行同步代码的时候，如果遇到了异步事件，js 引擎并不会一直等待其返回结果，而是会将这个事件挂起，继续执行栈中的其它任务

    3. 当同步事件执行完毕后，再将异步事件对应地回调加入到与当前执行栈中不同的另一个任务队列中等待执行

    4. 任务队列可以分为宏任务队列和微任务队列，当当前执行栈中的事件执行完毕后，js 引擎首先会判断微任务队列中是否有任务可以执行，如果有就将微任务队首的事件压入栈中执行

    5. 当微任务队列中的任务都执行完成后再去判断宏任务队列中的任务

  ```
  实例讲解：
  ```js
    setTimeout(function(){
      console.log(1);
    },0);

    new Promise(function(resolve,reject){
      console.log(2);
    }).then(function(){
      console.log(3);
    })

    process.nextTick(function(){
      console.log(4);
    })

    console.log(5);

  ```

  我猜 5 4 1 2 3

  解析：

  - 第一轮

    * 主线程开始执行，遇到setTimeout, 将setTimeout 的回调函数丢到宏任务队列中
    * 往下执行new Promise 立即执行，输出2，then 的回调函数丢到微任务队列中
    * 继续执行，遇到process.nexTick，同样将回调函数扔到微任务队列 
    * 在继续执行，输出5
  - 当所有同步任务执行完成之后，看有没有可以执行的微任务
    
    * 发现有then 函数和nextTick 两个微任务，process.nextTick 指定的异步任务总是发生在所有异步任务之前，因此先执行process.nextTick 输出4，然后执行then 函数输出3
  
  - 第一轮结束，进入第二轮

    * 从宏任务开始，发现setTimeout 回调，输出1 执行完毕
    * 最后结果 2 5 4 3 1

  猜错原因：

  1. 没想到new Promise 立即执行
  2. process.nextTick 指定的异步任务总是发生在所有异步任务之前
  3. promise 是微任务，比setTimeout 宏任务优先执行

  参考资料：[《浏览器事件循环机制（event loop）》](https://juejin.im/post/6844903606466904078),[《详解 JavaScript 中的 Event Loop（事件循环）机制》](https://zhuanlan.zhihu.com/p/33058983)，[《什么是 Event Loop？》](http://www.ruanyifeng.com/blog/2013/10/event_loop.html)，[《这一次，彻底弄懂 JavaScript 执行机制》](https://juejin.im/post/6844903512845860872)

### 34 arguments 的对象是什么

  arguments 对象是函数中传递的参数的集合。它是一个类似数组的对象，因为它有一个length 属性，我们可以使用数组所以表示法arguments[1] 来访问单个值，但它没有数组中的内置方法，如：forEach、reduce、filter和map

  可以使用Array.prototype.slice 将arguments 对象转换成一个数组

  ```js
    function one(){
      return Array.prototype.slice.call(arguments);
    }
  ```

  注意：箭头函数中没有arguments 对象
  ```js
    function one(){
      return arguments;
    }
    const two = function() => {
      return arguments;
    }
    const three = function three() {
      return arguments;
    }
    const four = () => arguments;

    four(); // arguments is not defined
  ```
  当我们调用函数four 时，会抛出一个`ReferenceError: arguments is not defined error`，使用rest 语法，可以解决这个问题
  ```js
    const four = (...args) => args;
  ```
  这会自动将所有参数值放入数组中

### 35 为什么在调用`function fun(){let a = b = 0;}fun()`这个函数时，代码中的 b 会变成全局变量？

  原因是赋值运算符是从右到左的求值的，这意味着当多个赋值运算符出现在一个表达式中时，它们是从右向左求值的。所以上面的代码变成了这样：
  ```js
    function fun(){
      let a = (b = 0);
    }
    fun();
  ```
  首先，表达式 b = 0 运算，在本例中没有声明b。因此，JS 引擎在这个函数外创建了一个全局变量b，之后表达式b=0 的返回值为0，并赋给新的局部变量a

  我们可以通过在赋值之前先声明变量来解决这个问题。
  ```js
    function fun(){
      let a,b;
      a = b = 0;
    }
    fun();
  ```

### 36 简单介绍一下V8引擎的垃圾回收机制

  V8 的垃圾回收机制基于分代回收机制，这个机制又基于世代假说，这个假说有两个特点，一是新生的对象容易早死，另一个是不死的对象会活得更久。

  基于这个假说，V8 引擎将内存分为了新生代和老生代。

  * 新创建的对象或只经过一次的垃圾回收的对象就被称为新生代
  * 经历过多次垃圾回收的对象就被称为老生代

  新生代被分为From 和To 两个空间，To 一般是闲置的。当From 空间满了的时候会执行Scavenge 算法进行垃圾回收。

  当我们执行垃圾回收算法的时候，应用逻辑将会停止，等垃圾回收结束后再继续执行。

  这个算法分为三步：

  1. 首先检查From 空间的存活对象，如果对象存活则判断对象是否满足晋升到老生代的条件，如果满足则晋升到老生代。如果不满足条件则移动到To空间
  2. 如果对象不存活，则释放对象的空间
  3. 最后将From 空间和To 空间角色进行交换

  新生代晋升到老生代有两个条件

  1. 判断对象是否已经经过了一次Scavenge 回收。若经历过，则将对象从From 空间复制到老生代中，没有则复制到To 空间
  2. To 空间的内存使用是否超过限制。当对象从From 空间复制到To 空间时，若To 空间使用超过25%，则对象直接晋升到老生代中，设置25%的原因主要是因为算法结束后，两个空间结束后会交换位置，如果To 空间的内存太小，会影响后续的内存分配

  老生代采用了标记清除法和标记压缩法。标记清除法首先会对内存中存活的对象进行标记，标记结束后清除掉那些没有标记的对象，由于标记清除后会造成很多的内存碎片，不便于后面的内存分配。所以为了解决内存碎片的问题引入了标记压缩法

  由于在进行垃圾回收的时候会先暂停应用的逻辑，对于新生代方法由于内存小，每次停顿的时间不会太长，但对于老生代来说每次垃圾回收的时间长，停顿会造成很大的影响。为了解决这个问题V8 引入了增量标记的方法，讲一次停顿进行的过程分为了多步，每次执行完一小步，就让运行逻辑执行一会，就这样交替运行

  参考资料：

  * [《深入理解 V8 的垃圾回收原理》](https://www.jianshu.com/p/b8ed21e8a4fb)
  * [《JavaScript 中的垃圾回收》](https://zhuanlan.zhihu.com/p/23992332)

### 37 哪些操作会造成内存泄露

  1. 意外的全局变量 使用未声明变量，创建了一个全局变量，在内存中无法被回收
  2. 被遗忘的计时器或回调函数 对外部变量有引用的话，会被一直留在内存中，而无法被回收
  3. 脱离DOM 的引用 获取一个DOM 元素的引用，元素删除后，由于保留了引用，也无法被回收
  4. 闭包 不合理的使用，会导致某些变量一直被留在内存当中

  参考资料：

  * [《JavaScript 内存泄漏教程》](http://www.ruanyifeng.com/blog/2017/04/memory-leak.html)
  * [《4 类 JavaScript 内存泄漏及如何避免》](https://jinlong.github.io/2016/05/01/4-Types-of-Memory-Leaks-in-JavaScript-and-How-to-Get-Rid-Of-Them/)
  * [《杜绝 js 中四种内存泄漏类型的发生》](https://juejin.im/entry/6844903553207631879)
  * [《javascript 典型内存泄漏及 chrome 的排查方法》](https://segmentfault.com/a/1190000008901861)

> 以下38~46 是ES6 中常考的基础知识点

### 38 ECMAScript 是什么？

  ECMAScript 是编写脚本语言的标准，这意味着JavaScript 遵循ECMAScript 标准中的规范变化，因为它是JavaScript的蓝图。

  ECMAScript 和 JavaScript，本质上都跟一门语言有关，一个是语言本身的名字，一个是语言的约束条件。只不过发明JavaScript的那个人（Netscape 公司），把东西交给了ECMA(European Computer Manufacturers Association)，这个人规定了标准，因为当时有java 语言了，又想强调这个是ECMA制定的规则，所以就诞生了这神奇的东西——ECMAScript

  JavaScript = ECMAScript + DOM + BOM 算是广义的JavaScript

  ECMAScript 说什么 JavaScript 就得做什么

  JavaScript 做什么都要问问 ECMAScript 能不能这么干，如果不能就错了，能就对了

### 39 ECMAScript 2015（ES6） 有哪些新特性

  * 块作用域
  * 类
  * 箭头函数
  * 模板字符串
  * 加强的对象字面量 `let a=1;let obj = {a};// obj = { a:1 }`
  * 对象解构
  * Promise
  * 模块
  * Symbol
  * 代理（proxy） Set
  * 函数默认参数
  * rest 和展开

### 40 var let 和 const 的区别

  var 声明的变量会挂载在window 上，而let 和const 的声明不会：
  ```js
    var a = 100;
    window.a; // 100

    let b = 200;
    window.b; // undefined

    const c = 300;
    window.c; // undefined
  ```
  var 变量存在变量提升，let 和const 不存在变量提升：
  ```js
    console.log(a); // undefined a 已声明 但未赋值
    var a = 100;

    console.log(b); // b is not defined
    let b = 10;

    console.log(c); // Uncaught ReferenceError: Cannot access 'c' before initialization
    const c = 30;
  ```
  let 和const 声明形成块作用域
  ```js
    if(1){
      var a = 100;
      let b = 10;
    }
    console.log(a); // 100
    console.log(b); // 报错：b is not defined
    ---
    if(1){
      var a = 100;
      const c = 1;
    }
    console.log(a); // 100
    console.log(c); // 报错 c is not defined  

  ```
  同一作用域下let 和const 不能声明同名变量，而var 可以
  ```js
    var a = 100;
    console.log(a); // 100

    var a = 10;
    console.log(a);
    ---

    let a = 100;
    let a = 10;
    //  控制台报错：Identifier 'a' has already been declared

  ```
  暂存死区
  ```js
    var a = 100;
    if(1){
      a = 10;
      // Uncaught ReferenceError: Cannot access 'a' before initialization
      let a = 1;
    }
  ```
  const 
  ```js
    /*
    * 一旦声明必须赋值，不能使用null 占位
    * 声明后不能修改
    * 如果声明的是复合类型数据，可以修改其属性
    */
    const a = 100;

    const list = [];
    list[0] = 10;
    console.log(list); // [10]

    const obj = {a:100};
    obj.name = 'apple';
    obj.a = 1000;
    console.log(obj); // {a:1000,name:'apple'}

  ```

### 41 什么是箭头函数

  箭头函数表达式的语法比函数表达式更简洁，并且没有自己的`this arguments super new.target`。箭头函数表达式更适用于那些本来需要匿名函数的地方，并且它不能用作构造函数。

  ```js
    // ES5
    var getCurrentDate = function(){
      return new Date();
    }
    // ES6
    const getCurrentDate = () => new Date();
  ```

  在本例中，ES5 版本中有function(){}声明和return 关键字，这两个关键字分别是创建函数和返回值所需要的。在箭头函数版本中，我们只需要括号，不需要return 语句，因为如果只有一个表达式或值需要返回，箭头函数就会有一个隐式的返回

  ```js

  // ES5 
  function greet(name){
    return 'Hello ' + name + ' !';
  }

  // ES6
  const greet = (name) => `Hello ${name} !`;
  const greet = name => `Hello ${name} !`;
  ```

  我们还可以在箭头函数中使用与函数表达式和函数声明相同的参数，如果在一个箭头函数中只有一个参数，则可以省略扩号

  ```js

    const getArgs = () => arguments;
    getArgs(); // Uncaught ReferenceError: arguments is not defined
    const getArgs2 = (...args) => rest;

  ```

  箭头函数不能访问arguments 对象。所以调用第一个getArgs 函数会抛出错误，相反，我们可以用rest 参数来获得在箭头函数中传递的所有参数

  ```js

    const data = {
      result: 0,
      nums: [1,2,3,4,5],
      computeResult() {
        // 这里的this 是data 对象
        const addAll = () => {
          return this.nums.reduce((total,cur)=>total + cur,0);
        };
        this.result = addAll();
      },
    };

  ```

  箭头函数没有自己的this 值，它捕获词法作用域函数的this 值，在此实例中，addAll函数将复制computeResult 方法中的this 值，如果在全局作用域声明箭头函数，则this 值为 window 对象。

### 42 什么是类

  类（class）是在JS 中编写构造函数的新方法，它是使用构造函数的语法糖，在底层中任然使用原型和基于原型的继承

  ```js

    // ES5
  function Person(firstName, lastName, age, address){
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.address = address;
  }

  Person.self = function(){
    return this;
  }

  Person.prototype.toString = function(){
    return '[object Person]';
  }

  Person.prototype.getFullName = function(){
    return this.firstName + ' ' + this.lastName;
  }

  // ES6
  class Person{
    constructor(firstName, lastName, age, address){
      this.firstName = firstName;
      this.lastName = lastName;
      this.age = age;
      this.address = address;
    }
    static self(){
      return this;
    }
    toString(){
      return '[object Person]';
    }
    getFullName(){
      return `${this.firstName} ${this.lastName}`;
    }
  }

  ```
  重写方法并从另一个类继承
  ```js

    // ES5
    Employee.prototype = Object.create(Person.prototype);

    function Employee(firstName, lastName, age, address, jobTitle, yearStarted){
      Person.call(this,firstName,lastName,age,address);
      this.jobTitle = jobTitle;
      this.yearStarted = yearStarted;
    }

    Employee.prototype.describe = function(){
      return `I am ${this.getFullName()} and I have a position of ${this.jobTitle} and I started at ${this.yearStarted}`;
    }
    Employee.prototype.toString = function(){
      return '[object Employee]';
    }

    // ES6
    class Employee extends Person{
      constructor(firstName, lastName, age, address, jobTitle, yearStarted){
        super(firstName, lastName, age, address);
        this.jobTitle = jobTitle;
        this.yearStarted = yearStarted;
      }

      describe() {
        return `I am ${this.getFullName()} and I have a position of ${this.jobTitle} and I started at ${this.yearStarted}`;
      }

      toString() {
        return "[object Employee]";
      }
    }

  ```
  所以，如何知道它在内部使用原型？
  ```js
    class Something{

    }
    function AnotherSomething(){

    }
    const as = new AnotherSomething();
    const s = new Something();

    typeof Something; // function
    typeof AnotherSomething; // fucntion
    as.toString(); // [oject Object]
    s.toString(); // [object Object]
    as.toString === Object.prototype.toString; // true
    s.toString === Object.prototype.toString; // true
  ```
  参考资料：
  - [《ECMAScript 6 实现了 class，对 JavaScript 前端开发有什么意义？》](https://www.zhihu.com/question/29789315)
  - [《Class 的基本语法》](https://es6.ruanyifeng.com/#docs/class)

### 43 什么是模板字符串

  模板字符串是在JS 中创建字符串的一种新方法，我们可以通过使用反引号使模板字符串化
  ```js
    var es5Greet = 'Hi I\'m Mark';
    let es6Great = `Hi I'm Mark`;
  ```

  在es5 中，需要用一些转义字符来达到多行的效果，在模板字符串不需要这么麻烦
  ```js
    var es5Words = '\n'
    + ' I \n'
    + ' am \n'
    + ' Iron Man';

    let es6Words = `
      I
      am
      Iron Man
    `;
  ```
  
### 44 什么是对象解构？

  对象解构是从对象或数组中获取或提取值的一种新的、更简洁的方法。
  假设有如下对象：
  ```js
    const employee = {
      firstName: "Marko",
      lastName: "Polo",
      position: "Software Developer",
      yearHired: 2017
    }
  ```

  从对象获取属性，早期方法是创建一个与对象属性同名的变量。这种方法和麻烦，因为我们要为每个属性创建一个新变量。假设我们有一个大对象，它也有很多属性和方法，用这种方法提取属性会很麻烦
  ```js

    var firstName = employee.firstName;
    var lastName = employee.lastName;
    var position = employee.position;
    var yearHired = employee.yearHired;

  ```

  使用解构方式是语法就变得简洁多了
  ```js
    let { firstName, lastName, position, yearHired } = employee;
  ```

  如果属性值为undefined 时，我们还可以指定默认值
  ```js
    let { firstName = "Mark", lastName: lName, position, yearHired } = employee;
  ```

### 45 什么是 Set 对象，它是如何工作的？

  Set 对象允许存储任何类型的唯一值，无论是原始值或者是对象引用

  我们可以用Set 构造函数创建Set 实例
  ```js
    const set1 = new Set();
    const set2 = new Set(['a','b','c']);
  ```

  我们可以使用add 方法向Set 实例中添加一个新值，因为add 方法返回Set 对象，所以我们可以以链式的方式再次使用add。如果一个值已经存在于Set 对象中，那么它将不会再被添加
  ```js

  set2.add('d');
  set2.add('e').add('f').add('g').add('g');
  // 最后一个g 不会被添加到Set 对象中，因为它已经存在了

  ```

  我们可以使用has 方法检查Set 实例中是否存在特定的值
  ```js
    set2.has('a'); // true
    set2.has('z'); // false
  ```

  size 属性获得Set 实例的长度
  ```js
    set2.size // 4
  ```

  clear 清空Set 中的数据
  ```js
    set2.clear();
  ```

  使用Set 对象来删除数组中重复的元素
  ```js
    const numbers = [1,2,3,4,5,6,7,8,8,5];
    const uniqueNums = [...new Set(nmbers)]; // [1,2,3,4,5,6,7,8]
  ```

  WeakSet，与Set 类型，也是不重复的值的集合。但是WeakSet 的成员只能是对象，而不能是其它类型的值。WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑WeakSet 对该对象的引用

  * Map 数据结构，类似对象，也是键值对的集合，但是键的范围不限于字符串，各种类型的值（包括对象）都可以当做键
  * WeakMap 结构与Map 结构相似，但是WeakMap 只接受对象作为键名（null 除外），不接受其他类型的值作为键名，不计入垃圾回收机制

### 46 什么是Proxy?

  Proxy 用于修改某些操作的默认行为，等同于语言层面做出修改，所以属于一种“元编程”，即对编程语言进行编程

  Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”

> 以下47~64条是JavaScript 中比较难的高级知识及相关手写实现，各位看官需慢慢细品

### 47 写一个通用的事件侦听器函数
  
  ```js
    const EventUtils = {
      // 视能力分别使用dom0|dom2|IE 方式，来绑定事件
      // 添加事件
      addEvent: function(element, type, handler){
        if(element.addEventListener){
          element.addEventListener(type, handler, false);
        }else if(element.attachEvent){
          element.attachEvent("on" + type, handler);
        }else{
          element["on"+type] = handler;
        }
      },

      // 移除事件
      removeEvent: function(){
        if(element.removeEventListener){
          element.removeEventListener(type, handler, false);
        }else if(element.detachEvent){
          element.detachEvent("on" + type, handler);
        }else{
          element["on" + type] = null;
        }
      },

      // 获取事件目标
      getTarget: function(event){
        return event.target || event.srcElement;
      },

      // 获取event 对象的引用，渠道时间按的所有信息，确保随时能使用 event
      getEvent: function(event){
        return event || window.event;
      },

      // 阻止事件（主要是冒泡，因为IE 不支持事件捕获）
      stopPropagation: function(event){
        if(event.stopPropagation){
          event.stopPropagation();
        }else{
          event.cancelBubble = true;
        }
      },

      // 取消事件的默认行为
      preventDefault: function(event){
        if(event.preventDefault){
          event.preventDefault();
        }else{
          event.returnValue = false;
        }
      },
    };
  ```
  [写一个通用的事件侦听器函数](/hexo-blog/2020/08/23/collections/JavaScript/写一个通用的事件侦听器函数/)

### 48 什么是函数式编程？JavaScript的哪些特性使其成为函数式语言的候选语言？

  函数式编程（通常缩写为FP）是通过编写纯函数，避免共享状态、可变数据、副作用来构建软件的过程。

  函数式编程是声明式的，而不是命令式的，应用程序的状态是用过纯函数流动的。与面向对象编程形成对比，面向对象中应用程序的状态通常与对象中的方法共享和共处。

  函数式编程是一种编程范式，这意味着它是一种基于一些基本的定义原则（如上所列）思考软件构建的方式。当然，编程范式的其它实例也包扩面向对象编程和过程编程。

  函数式的代码往往比命令式或面向对象的代码更简洁、更可预测、更容易测试，但若果不熟悉它以及与之相关的常见模式，函数式的代码也可能卡起来更密集杂乱，并且相关文献对新人来说是不好理解的。

### 49 什么是高阶函数

  高阶函数只是将函数作为参数或返回值的函数
  ```js
    function higherOrderFunction(param, callback){
      return callback(param);
    }
  ```

### 50 为什么函数被称为一等公民

  在JavaScript 中，函数不仅拥有一切传统函数的使用方式（声明和调用），而且可以做到像简单值一样：
  
  * 赋值 var fun = function(){}
  * 传参 function fun(x,callback){callback()}
  * 返回 function fun(something){ return something} 

  这样的函数也称之为第一级函数（First-class Function）。不仅如此，JavaScript 中的函数还充当了类的构造函数的作用，同时又是一个Function 类的实例（instance）。这样的多重身份让JavaScript 的函数变得非常重要

### 51 手动实现 Array.prototype.map 方法

  map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供函数后返回的结果。
  
  ```js
    function map(arr, mapCallback){
      // 首先。检查传递的参数是否正确
      if(!Array.isArray(arr) || !arr.length || typeof mapCallback !== 'funciton'){
        return [];
      } else {
        let result = [];
        // 每次调用此函数时，都会先创建一个 result 数组
        // 因为我们不想改变原始数组
        for(let i=0, len=arr.length;i < len; i++) {
          result.push(mapCallback(arr[i], i, arr));
        }
        return result;
      }
    };
  ```

### 52 手动实现 Array.prototype.filter 方法

  
  filter() 方法创建一个新数组，其包含通过所提供函数实现的测试的所有元素

  ```js
    function filter(arr, filterCallback){
      // 首先 检查传递的参数是否正确
      if(!Array.isArray(arr) || !arr.length || typeof filterCallback !== 'function'){
        return [];
      } else {
        let result = [];
        // 每次调用此函数时，都会先创建一个 result 数组
        // 因为我们不想改变原始数组
        for(let i=0, len=arr.length; i<len; i++){
          // 检查 filterCallback 的返回值是否是真值
          if(filterCallback(arr[i], i, arr)){
            // 如果条件为真，则将数组元素push 到 result 中
            result.push(arr[i]);
          }
        }
        return result;
      }
    };
  ```

### 53 手动实现Array.prototype.reduce方法
  
  reduce() 方法对数组中的每个元素执行一个由您提供的reducer 函数（升序执行），将其结果汇总为单个返回值

  ```js
    function reduce(arr, reduceCallback, initialValue){
      // 首先 检查传递的参数是否正确
      if(!Array.isArray(arr) || !arr.length || typeof reduceCallback !== 'funciton'){
        return [];
      } else {
        // 如果没有将initialValue 传递给函数，我们将使用第一个数组项作为initialValue
        let hasInitialValue = initialValue !== void 0;
        let value = hasInitialValue ? initialValue : arr[0];

        // 如果有传递initialValue 则索引将从 1 开始，否则从 0 开始
        for( let i = hasInitialValue ? 1:0, len=arr.length; i<len ;i++){
          value = reduceCallback(value, arr[i], i, arr);
        }
        return value;
      }
    };
  ```

### 54 js的深浅拷贝

  * 浅拷贝：创建一个新对象，这个对象有着原始对象属性值的一份精准拷贝。如果属性时基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址，所以如果其中一个对象改变了这个地址，就会影响到另一个对象
  * 深拷贝：讲一个对象从内存中完整的拷贝一份出来，从堆内存中开辟一个新的区域存放新对象，且修改新对象不会影响原对象

  简单的说，浅拷贝创建的新对象，其中的引用对象依旧与原对象有关；深拷贝创建的新对象，则是一个全新的对象，只是内容与原对象相同，再无瓜葛

  #### 浅拷贝的实现方式

  * Object.assign() 方法：用于将所有可枚举属性的值从一个或多个源对象赋值到目标对象。它将返回目标对象。
  * Array.prototype.silce()：slice()方法返回一个新的数组对象，这一对象是一个由begin 和end（不包括end）决定的原数组的浅拷贝。原始数组不会被改变
  * 拓展运算符`...`：
  ```js
    let a = {
      name:'jack',
      flag:{
        title:'better day by day',
        time:'2011-11-11'
      }
    }
    let b = {...a};
  ```

  #### 深拷贝的实现方式

  * 乞丐版：JSON.parse(JSON.stringify(object))，缺点诸多（会忽略undefined、symbol、函数；不能解决循环引用；不能处理正则、new Date()）
  * 基础版：浅拷贝+递归 （只考虑了普通的object 和array 两种数据类型）
  ```js
  function cloneDeep(target, map = new WeakMap()){
    if(typeof target === 'object'){
      let cloneTarget = Array.isArray(target) ? [] : {};

      if(map.get(target)){
        return target;
      }
      map.set(target, cloneTarget);
      for( const key in target){
        cloneTarget[key] = cloneDeep(target[key], map);
      }
      return cloneTarget;

    }else{
      return target;
    }
  }
  ```
  * 终极版：全面考虑各种数据类型 [详细内容>>](/hexo-blog/2020/08/24/collections/JavaScript/Js的深浅拷贝/)

### 55 手写call、apply 及bind 函数
    #### call函数的实现步骤
    1. 判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用call 等方式调用的情况
    2. 判断传入上下文对象是否存在，如果不存在，则设置为window
    3. 处理传入的参数，截取第一个参数后的所有参数
    4. 将函数作为上下文对象来调用这个方法，并保存返回结果
    5. 使用上下文对象来调用这个方法，并保存返回结果
    6. 删除刚才新增的属性
    7. 返回结果

    ```js
    // call 函数实现
      Function.prototype.myCall = function(context){
        // 判断调用对象
        if(typeof this !== 'function'){
          throw new TypeError('Error');
        }

        // 获取参数
        let args = [...arguments].slice(1),result = null;

        // 判断context 是否传入，如果未传入则设置为 window
        context = context || window;

        // 将调用函数设为对象的方法
        context.fn = this;

        // 调用函数
        result = context.fn(...args);

        // 将属性删除
        delete context.fn;

        return result;
      }
    ```

    #### apply 函数的实现步骤

    1. 判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用call 等方式调用的情况
    2. 判断传入上下文对象是否存在，如果不存在，则设置为window
    3. 将函数作为上下文对象的一个属性
    4. 判断参数值是否传入
    5. 使用上下文对象来调用这个方法，并保存结果
    6. 删除刚才新增的属性
    7. 返回结果

    ```js
    // apply 函数实现
      Function.prototype.myApply = function(context){
        // 判断对象是否为函数
        if(typeof this !== 'undefined'){
          throw new TypeError('Error');
        }

        let result = null;

        // 判断context 是否存在，若果未传入则为 window
        context = context || window;

        // 将函数设为对象的方法
        context.fn = this;

        // 调用方法
        if(arguments[1]){
          result = context.fn(...arguments[1]);
        }else{
          result = context.fn();
        }

        // 将属性删除
        delete context.fn;

        return result;
      }
    ```

    #### bind 函数的实现

    1. 判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用call 等方式调用的情况
    2. 保存当前函数的引用，获取其余传入参数值
    3. 创建一个函数返回
    4. 函数内部使用apply 来绑定函数调用，需要判断函数作为构造函数的情况，这个时候需要传入当前函数的this 给 apply 调用，其余情况都传入指定的上下文对象

    ```js
    // bind 函数实现
      Function.prototype.myBind = function(context){
        // 判断调用对象是否为函数
        if(typeof this !== 'function'){
          throw new TypeError('Error');
        }

        // 获取参数
        let args = [...arguments].slice(1), fn = this;

        return function Fn(){
          // 根据调用方式 传入不同绑定值
          return fn.apply(
            this instanceof Fn ? this : context,
            args.concat(...arguments)
          );
        }
      }
    ```

    参考资料：
    * [《JavaScript 深入之 call 和 apply 的模拟实现》](https://github.com/mqyqingfeng/Blog/issues/11)

### 56 函数柯里化的实现

  函数柯里化指的是一种将使用多个参数的一个函数转换成一些列使用一个参数的函数的技术

  ```js
    function curry(fn, args){
      // 获取函数需要的参数长度
      let length = fn.length;

      args = args || [];

      return function(){
        let subArgs = args.slice(0);

        // 拼接得到现有的所有参数
        for(let i=0;i< arguments.length; i++){
          subArgs.push(arguments[i]);
        }

        // 判断参数的长度是否已经满足函数所需参数的长度
        if(subArgs.length >= length){
          // 如果满足，执行函数
          return fn.apply(this, subArgus);
        } else {
          // 如果不满足，递归返回柯里化的函数等待参数的传入
          return curry.call(this, fn, subArgs);
        }
      };
    }

    // ES6 实现
    function curry(fn,...args){
      return fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args);
    }
  ```

  参考资料：
  * [《JavaScript 专题之函数柯里化》](https://github.com/mqyqingfeng/Blog/issues/42)

### 57 js模拟new操作符的实现
  
  [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 对new 的解释：

  new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。new 关键字会进行如下的操作：

  1. 创建一个空的简单JavaScript 对象（{}）;
  2. 链接该对象（即设置该对象的构造函数）到另一个对象
  3. 将步骤1新创建的对象作为this 的上下文
  4. 如果该函数没有返回对象，则返回this

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

### 58 什么是回调函数？回调函数有什么缺点？

  **回调函数**是一段可执行的代码段，它作为一个参数传递给其它的代码，其作用是在需要的时候方便调用这段（回调函数）代码。

  在JavaScript 中函数也是对象的一种，同样对象可以作为参数传递给函数，因此函数也可以作为参数传递给另一个函数，这个作为参数的函数就是回调函数

  ```js
    const btnAdd = document.getElementById('btnAdd');
    btnAdd.addEventListener('click', function clickCallback(e){
      // do something
    })
  ```

  在本例中，我们等待id 为btnAdd 的元素中的click 事件，如果它被单击，则执行clickCallback 函数，回调函数向某些数据或事件添加一些功能

  回调函数有一个致命的弱点，就是容易写出回调地狱
  ```js
    setTimeout(()=>{
      console.log(1);
      setTimeout(()=>{
        console.log(2);
        setTimeout(()=>{
          console.log(3);
        },1000);
      },1000);
    },1000);
  ```

  这就是典型的毁掉地狱，以上代码看起来不利于阅读和维护，事件一旦多起来就更是乱糟糟，所以在ES6提出了Promise 和async/await 来解决毁掉地狱的问题。当然，回调函数还存在着别的几个缺点:

  * 不能使用try catch 捕获错误
  * 不能直接return

### 59 Promise 是什么？手写实现下？
  Promise，翻译过来就是承诺，承诺它过一段时间会给你一个结果。从编程讲Promise 是异步编程的一种解决方案。下面是Promise 在[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 的相关说明：

  Promise 对象是一个代理对象（代理一个值），被代理的值在Promise 对象创建时可能是未知的。它允许你为异步操作的成功和失败分别绑定相应的处理方法（handlers）。这让异步方法可以像同步方法哪样返回值，但并不是立即返回最终执行结果，而是一个能够代表未来出现的结果的promise对象

  一个Promise 有以下几种状态：
  * pending：初始状态，既不是成功，也不是失败状态
  * fulfilled：意味着操作成功完成
  * rejected：意味着操作失败

  这个承诺一旦从等待状态变为其它状态，就永远不能更改状态了，也就是说一旦状态变为fulfilled/rejected 后，就不能再次改变。

  举个栗子：假如我有个女朋友，下周五是她的生日，我答应她生日给她一个蛋糕，那么从现在开始这个承诺就进入等待状态，等待下周四的到来，然后状态改变。如果，我如约给了她一个蛋糕，那么这个承诺的状态就会由pending 切换为fulfilled，表示承诺成功兑现，一旦是这个结果了，就不回再有其他结果，即状态不会再发生改变；反之，如果没有兑现承诺，状态就会有pending 切换为rejected，时间不可倒流，所以状态也不能再发生变化

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

  [更多信息>>](/hexo-blog/2020/08/27/collections/JavaScript/手写实现Promise/)

### 60 Iterator 是什么，有什么作用？

  [可迭代对象(iterable object) Iterator](/hexo-blog/2020/08/11/collections/JavaScript/%E5%8F%AF%E8%BF%AD%E4%BB%A3%E5%AF%B9%E8%B1%A1/)

  Iterator（迭代器）是一种接口，也可以说是一种规范。为各种不同的数据结构提供统一的访问机制，任何数据只要部署Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

  **Iterator 语法：**
  ```js
    const obj = {
      [Symbol.Iterator]: function(){}
    }
  ```

  `[Symbol.iterator]`属性名是固定的写法，只要拥有了该属性的对象，就能够用迭代器的方式进行遍历

  迭代器的遍历方法是首先获得一个迭代器的指针，初始时该指针指向第一条数据之前，接着通过调用next 方法，改变指针的指向，让其指向下一条数据，每一次的next 都会返回一个对象，该对象有两个属性
  * value 代表想要获取的数据
  * done fasle 表示当前指针指向的数据有值，true 表示遍历已经结束

  Iterator 的作用有三个：
  1. 为各种数据结构，提供一个统一的、简便的访问接口
  2. 使得数据结构的成员能够按某种次序排列
  3. ES6创造了一种新的遍历命令for...of 循环，Iterator 接口主要供for...of 消费

  遍历过程：
  1. 创建一个指针对象，指向当前数据结构的起始位置，也就是说，遍历器对象本质上，就是一个指针对象
  2. 第一次调用指针对象的next 方法，可以将指针指向数据结构的第一个成员
  3. 第二次调用指针对象的next 方法，指针就指向数据结构的第二个成员
  4. 不断调用指针对象的next 方法，直到它指向数据结构的结束为止

  每一次调用next 方法，都会返回数据结构的当前成员的信息。具体来说木九十返回一个包含value 和done 两个属性的对象。其中，value属性时当前成员的值，done 属性是一个布尔值，表示遍历是否结束

  ```js
    let arr = [{num:1 },2,3];
    let it = arr[Symbol.iterator](); // 获取数组中的迭代器

    it.next(); // { value: Object { num: 1}, done: false}
    it.next(); // { vlaue: 2, done: false}
    it.next(); // { value: 3, done: false}
    it.next(); // { value: undefined, done: true}
  ```

### 61 Generator 函数是什么，有什么作用？

  Generator 函数可以说是Iterator 接口的具体实现方式，其最大的特点就是可以控制函数的执行

  ```js
    function *foo(x) {
      let y = 2 * (yield (x + 1));
      let z = yield (y/3);
      return (x + y + z);
    }

    let it = foo(5);
    it.next(); // { value: 6, done: false}
    it.next(12); // { value: 8, done: false}
    it.next(13); // { value: 42, done: true}
  ```

  执行过程：
  * 首先Generator 函数调用时它会返回一个迭代器
  * 当执行第一次next 时，传参会被忽略，并且函数暂停在yield(x + 1)处，所以返回 5 + 1 = 6
  * 当执行第二次next 时，传入的参数等于上一个yield 的返回值，如果不传参，yield 永远返回 undefined。此时，let y = 2 * 12，所以第二个yield 等于 2*12/13 = 8
  * 当执行第三次next 时，传入的参数会传递给z，所以 z = 13,x = 5,y = 24，相加等于 42

### 62 什么是async/await 及其如何工作，有什么优缺点？

  async/await 是一种建立在Promise之上的编写异步或飞阻塞代码的新方法，被普遍认为是js 异步操作的最终且最优雅地解决方案，相对于Promise 和回调，它的可读性和简洁度都更高

  async 是异步的意思，而await 是async wait 的简写，即异步等待

  所以从语义上就很好理解async 用于声明一个function 是异步的，而await 用于等待一个异步方法执行完成

  一个函数如果加上async，那么该函数就会返回一个Promise
  ```js
    async function test(){
      return '1';
    }
    console.log(test()); // Promise {<fulfilled>: "1"}
  ```

  可以看出输出的是一个Promise 对象。所以，async 函数返回的是一个Promise 对象，如果在async 函数中直接 return 一个直接量，async 会吧这个直接量通过 Promise.resolve() 封装成Promise 对象返回

  相比于Promise，async/await 能更好地处理 then 链
  ```js
    function takeLongTime(n){
      return new Promise(resolve => {
        setTimeout(()=>{
          resolve(n+200);
        },n)
      })
    }

    function step1(n){
      console.log(`step1 with ${n}`);
      return takeLongTime(n);
    }
    function step2(n){
      console.log(`step2 with ${n}`);
      return takeLongTime(n);
    }
    function step3(n){
      console.log(`step3 with ${n}`);
      return takeLongTime(n);
    }
  ```
  **使用Promise**
  ```js
    function doIt(){
      console.time('doIt');
      const time1 = 300;
      step1(time1)
        .then(time2 => step2(time2))
        .then(time3 => step3(time3))
        .then(result => {
          console.log(`result is ${result}`);
          console.timeEnd('doIt');
        })
    }
    doIt();
    // step1 with 300 
    // undefined
    // step2 with 500
    // step3 with 700
    // result is 900
    // doIt: 1503.828857421875ms
  ```
  **使用async/await**
  ```js
    async function doIt(){
      console.time('doIt');
      const time1 = 300;
      const time2 = await step1(time1);
      const time3 = await step2(time2);
      const result = await step3(time3);
      console.log(`result is ${result}`)
      console.timeEnd('doIt');
    }

    doIt();
    // step1 with 300
    // Promise {<pending>}
    // step2 with 500
    // step3 with 700
    // result is 900
    // doIt: 1502.822021484375ms
  ```

  注意：await 关键字只能在async function 中使用，在任何非async function 的函数中使用await 关键字都会抛出错误，await 关键字在执行下一行代码之前等待右侧表达式（可能是一个Promise）返回

  **优缺点**
  async/await 的优势在于处理then 的调用链，能够更清晰准确的写出代码，并且也能优雅地解决或吊地狱问题，当然也存在一些缺点，因为await 将异步代码改造成了同步代码，如果多个异步代码没有依赖性却使用了await 会导致性能上的降低

  参考资料：
  * [「硬核JS」深入了解异步解决方案](https://juejin.im/post/6844904064614924302#heading-69)

### 63 instanceof 的原理是什么，如何实现

  instanceof 可以正确的判断对象的类型，因为内部机制是通过判断对象的原型链中是不是能找到类型的prototype

  实现instanceof：
  1. 首先获取类型的原型
  2. 然后获得对象的原型
  3. 然后一直循环判断对象的原型是否等于类型的原型，直到对象原型为null，因为原型链最终为null

  ```js
    function myInstanceof(left, right){
      let protoype = right.prototype;
      left = left._proto_;
      while(true){
        if (left === null || left === undefined){
          return false;
        }
        if(prototype === left){
          return true;
        }
        left = left._proto_;
      }
    }
  ```

### 64 js 的节流与防抖

  **函数防抖** 是指在事件被触发n 秒后再执行回调，如果在这n 秒内事件又被触发，则重新计时。这可以使用在一些点击请求的时间上，避免因为用户的多次点击向后端发送多次请求

  **函数节流** 是指规定一个单位时间，在这个单位事件内，只能由一次触发事件的回调函数执行，如果在同一个单位事件内某时间被触发多次，只有一次能生效。节流可以使用在scroll 函数的事件监听上，通过时间节流来降低事件调用的频率

  1. 防抖函数
  ```js
    function debounce(fn, wait){
      let timer = null;

      return function(){
        let context = this,
        args = arguments;

        // 如果此时存在定时器的话，则取消之前的定时器重新计时
        if(timer){
          clearTimeout(timer);
          timer = null;
        }

        // 设置定时器，使事件间隔指定事件后执行
        timer = setTimeout(()=>{
          fn.apply(context, args);
        },wait);
      }
    }
  ```

  2. 节流函数
  ```js
  function throttle(fn, delay){
    let time = null;

    return function(){
      let ocntext = this,
      args = arguments

      // 一段时间内只执行一次
      if(!timer){
        timer = setTimeout(function(){
          fn.apply(context, args);
          timer = null;
        },delay);
      }
    };
  }
  ```

  参考资料
  * [《JS 的防抖与节流》](https://juejin.im/entry/6844903618827517965)

### 65 什么是设计模式?

  1. 概念

  设计模式是一套被反复使用的、多数人知晓的、经过分类编目的、代码设计经验的总结。使用设计模式是为了重用代码、让代码更容易被他人理解、保证代码可靠性。毫无疑问，设计模式于己于他人于系统都是多赢的，设计模式使代码编制真正工程化，设计模式是软件工程的基石，如同大厦的一块块砖石一样。

  2. 设计原则

  * S 单一职责原则 
    * 一个程序只做好一件事
    * 如果功能过于复杂就拆分开，每个部分保持独立
  
  * O 开放/封闭原则
    * 对扩展开放，对修改封闭
    * 增加需求时，扩展新代码，而非修改已有代码

  * L 里氏替换原则
    * 子类能覆盖父类
    * 父类能出现的地方子类就能出现

  * I 接口隔离原则
    * 保持接口的单一独立
    * 类似单一职责原则，这里更关注接口

  * D 依赖倒转原则
    * 面向接口编程，依赖于抽象而不依赖于具体
    * 使用方只关注接口，而不关注具体类的实现

  3. 设计模式的类型

  * 结构型模式：通过识别系统中组件间的简单关系来简化系统的设计
  * 创作型模式：处理对象的创建，根据实际情况使用合适的方式创建对象，常规的对象创建方式可能会导致设计上的问题，或增加设计的复杂度。创建型模式通过以某种方式控制对象的创建来解决问题
  * 行为型模式：用于识别对象之间常见的交互模式并加以实现，增加交互的灵活性

### 66 9种前端常见的设计模式

  1. 外观模式

  外观模式是最常见的设计模式之一，它为子系统中的一组接口提供一个统一的高层接口，使子系统更容易使用。简而言之外观设计模式就是把多个子系统中复杂逻辑进行抽象，从而提供一个更统一、更简洁、更易用的API。很多我们常用的框架和库基本都遵循了外观设计模式，比如jQuery 就把复杂的原生DOM 操作进行了抽象和封装，并消除了浏览器之间的兼容问题，从而提供了一个更高级更易用的版本。其实在平时工作中我们也会用到外观模式进行开发，只是我们不自知而已

  * 场景
    * 设计初期，应该要有意识地将不同的两个层分离，比如经典的三层结构，在数据访问层和业务逻辑层、业务逻辑层和表示层之间建立外观
    * 在开发阶段，子系统往往因为不断地重构演化而变得原来越复杂，增加外观可以提供一个简单的接口，减少他们之间的依赖
    * 在维护一个遗留的大型系统时，可能这个系统已经很难维护了，这时候使用外观也是非常合适的，为旧系统开发一个外观类，为设计粗糙和高度复杂的遗留代码提供比较清晰的接口，让新系统和外观对象交互，外观与遗留代码交互所有的复杂工作

  * 优点
    * 减少系统相互依赖
    * 提高灵活性
    * 提高了安全性
  
  * 缺点
    * 不符合开闭原则，如果要改东西很麻烦，继承重写都不合适

  2. 代理模式

  代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问

  * 场景
    * HTML 元素事件代理
    * ES6 的proxy
    * jQuery.proxy() 方法
  
  * 优点
    * 代理模式能将代理对象与被调用对象分离，降低了西戎的耦合度。代理模式在客户端和目标对象之间起到一个中介作用，这样可以起到保护目标对象的作用
    * 代理对象可以扩展目标对象的功能；通过修改代理对象就可以了，符合开闭原则
  
  * 缺点
    * 处理请求速度可能有差异，非直接访问存在开销
  
  3. 工厂模式

  工厂模式定义一个用于创建对象的接口，这个接口由子类决定实例化哪一个类。该模式使一个类的实例化延迟到了子类。而子类可以重写接口方法一遍创建的时候指定自己的对象类型

  * 场景
    * 如果你不想让某个子系统与较大的那个对象之间形成强耦合，而是想运行时从许多子系统中进行挑选的话，那么工厂模式是一个理想的选择
    * 将new 操作简单封装，遇到new 的时候就应该考虑是否用工厂模式
    * 需要依赖具体环境创建不同实例，这些实例都有相同的行为，这是候我们可以使用工厂模式，简化实现的过程，同时也就可以减少每种对象所需的代码量，有利于消除对象间的耦合，提供更大的灵活性

  * 优点
    * 创建对象的过程可能和复杂，但我们只需关心创建结果
    * 构造函数和创建者分离，符合“开闭原则”
    * 一个调用者想创建一个对象，只要知道其名称就可以了
    * 扩展性高，如果想增加一个产品，只要扩展一个工厂类就可以
  
  * 缺点
    * 添加新产品时，需要编写新的具体产品类，一定程度上增加了系统的复杂度
    * 考虑到系统的可扩展性，需要引入抽象层，在客户端代码中均使用抽象层进行定义，增加了系统的抽象性和理解难度
  
  * 什么时候不用
    * 当被应用到错误的问题类型上时，这一模式会给引用程序引入大量不必要的复杂性，除非为创建对象提供一个接口是我们编写的库或者框架的一个设计上目标，否则建议使用明确的构造器，以避免不必要的开销
    * 由于对象的创建过程被高效的抽象在一个接口后面的实事，这也会给依赖于这个过程可能会有多复杂的单元测试带来问题

  4. 单例模式

  顾名思义，单例模式中Class 的实例个数最多为1。当需要一个对象去贯穿真个系统执行默写任务时，单例模式就派上了用场。而除此之外的场景尽量避免单例模式的使用，因为单例模式会引入全局状态，而一个健康的系统应该避免引入过多的全局状态

  实现单例模式需要解决以下几个问题：

  * 如何确定Class 只有一个实例？
  * 如何简便地访问Class 的唯一实例？
  * Class 如何控制实例化的过程？
  * 如何将Class 的实例个数限制为1

  我们一般通过实现以下两点来解决上述问题：

  * 隐藏Class 的构造函数，避免多次实例化
  * 通过暴露一个getInstance() 方法来创建/获取唯一实例

  **场景例子**

  * 定义命名空间和实现分支型方法
  * 登录框
  * vuex 和redux 中的store

  **优点**

  * 划分命名空间，减少全区变量
  * 增强模块性，把自己的代码组织在一个全局变量名下，放在单一位置，便于维护
  * 且只会实例化一次，简化了代码的调试和维护

  **缺点**

  * 由于单例模式提供的是一种单点访问，所以有可能导致模块间的强耦合，从而不利于单元测试。无法单独测试一个调用了来自单例的方法和类，而只能把它与那个单例作为一个单元一起测试

  5. 策略模式

  策略模式简单描述就是：对象有某个行为，但是在不同的场景中，该行为有不同的实现算法，把它们一个个封装起来，并且使它们可以互相替换

  * 场景例子
    * 如果在一个系统里面有许多类，它们之间的区别仅在于它们的行为，那么使用策略模式可以动态地让一个对象再许多行为中选择一种行为
    * 一个系统需要动态地在几种算法中选择一种
    * 表单验证
  
  * 优点
    * 利用组合、委托、多态等技术和思想，可以有效的避免多重条件选择语句
    * 提供了对开放-封闭原则的完美支持，将算法封装在独立的stategy 中，使得它们抑郁切换，理解，易于扩展
    * 利用组合和委托来让Context 拥有执行算法的能力，这也是继承的一种更轻便的代替方案
  
  * 缺点
    * 会在程序中增加许多策略类或者策略对象
    * 要使用策略模式，必须了解所有的strategy，必须了解各个strategy 之间的不同点，这样才能选择一个合适strategy
  
  6. 迭代器模式
  
  迭代器模式简单的说就是提供一种方法顺序一个聚合对象中各个元素，而又不暴露该对象的内部表示

  迭代器模式解决了以下问题：

  * 提供一致的遍历各种数据结构的方式，而不用了解数据的内部结构
  * 提供遍历容器（集合）的能力而无需改变容器的接口

  一个迭代器通常需要实现以下接口：

  * hasNext()：判断迭代是否结束，返回Boolean
  * next()：查找并返回下一个元素

  7. 观察者模式

  观察者模式又称发布-订阅模式，用一句话描述就是，被观察对象（subject）维护一组维护者（observer），当被观察对象状态改变时，通过调用观察者的某个方法将这些变化通知到观察者

  观察者模式中Subject 对象一般需要实现以下API：

  * subscribe()：接收一个观察者observer 对象，使其订阅自己
  * unsubscribe()：接收一个观察者observer 对象，使其取消订阅自己
  * fire()：触发事件，通知所有观察者

  **场景**

  * DOM 事件addeventListener
  * VUE 响应式

  **优点**
  * 支持简单的广播通信，自动通知所有已经订阅过的对象
  * 目标对象与观察者之间的抽象耦合关系能单独扩展以及重用
  * 增加了灵活性
  * 观察者模式所做的工作就是在解耦，让耦合的双飞都依赖于抽象，而不是依赖于具体。从而使得各自的变化都不会影响到另一边的变化

  **缺点**

  * 过度使用会导致对象与对象之间的联系弱化，会导致程序难以跟踪维护和理解

  8. 中介者模式

  在中介者模式中，中介者包装了一系列对象相互作用的方式，使得这些对象不必直接相互作用，而是由中介者协调它们之间的交互，从而使它们可以松散耦合。当某些对象之间的作用发生改变时，不会立即影响其它的一些对象之间的作用，保证这些作用可以彼此独立的变化

  中介者模式和观察者模式有一定的相似性，都是一对多的关系，也都是集中式通信，不同的是中介者模式是处理同级对象之间的交互，而观察者模式是处理Observer 和Subject 之间的交互。中介者模式有些像婚恋中介，相亲对象刚开始并不能直接交流，而是要通过中介去筛选匹配再决定谁和谁见面

  * 场景
    * 例如购物车需求，存在商品选择表单、颜色选择表单、购买数量表单等等，都会触发change 事件，那么可以通过中介者来转发处理这些事件，实现各个事件间的解耦，仅仅维护中介者对象即可
    * 聊天室

  * 优点
    * 使各对象之间耦合松散，而且可以独立地改变它们之间的交互
    * 中介者和对象一对多的关系取代了对象之间的网状多对多的关系
    * 如果对象之间的复杂耦合度导致维护很困难，而且欧核对随项目变化增速很快，就需要中介者重构代码

  * 缺点
    * 系统中会新增一个中介者对象，因为对象之间交互的复杂性，转移成了中介者对象的复杂性，使得中介者对象经常是巨大的。中介者对象自身往往就是一个难以维护的对象

  9. 访问者模式

  访问者模式 是一种将算法与对象结构分离的设计模式，通俗地说就是：访问者模式让我们能够在不改变一个对象结构的前提下能够给该对象增加新的逻辑，新增的逻辑保存在一个队里的访问者对象中，访问者模式常用语扩展一些第三方的库和工具

  访问者模式的实现有以下几个要素：

  * 访问者对象，拥有一个visit() 方法
  * 接收对象，拥有一个accept() 方法
  * 用于Visitor 接收一个Receiving Object
  * accept：用于Receving Object 接收一个Visitor，并通过调用Visitor 的visit() 为其提供获取Receiving Object 数据的能力
  
  **场景**

  * 对象结构中对象对应的类很少改变，但经常需要再此对象结构上定义新的操作
  * 需要对一个对象结构中的对象进行很多不同的并且不相关的操作，而需要避免让这些操作“污染”这些对象的类，也不希望增加新操作时修改这些类

  **优点**

  * 具体符合单一职责原则
  * 优秀的扩展性
  * 灵活性

  **缺点**

  * 具体元素对访问者公布细节，违反了迪米特原则（实体间相互作用）
  * 违反了依赖倒置原则，依赖了具体类，没有依赖抽象
  * 具体元素变更比较困难
