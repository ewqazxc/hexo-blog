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

  ### 27

