---
title: TypedArray
date: 2020-08-15
---

## TypedArray 类型化数组

  类型化数组（TypedArray）对象描述了一个底层的二进制数据缓冲区的一个类数组视图。

  事实上，没有名为TypedArray 的全局属性，也没有一个名为TypedArray 的构造函数。相反，有许多不同的全局属性，它们的值是特定元素类型的类型化数组构造函数，如下所示。在下面的介绍中，会发现一些与包含任何类型的元素的任意类型化数组一起使用的通用属性和方法。

### Demo
```js
  // create a TypedArraywith a size in bytes
  const tArr1 = new Int8Array(8); // 二进制补码8位有符号整数的数组
  tArr1[0] = 32;

  const tArr2 = new Int8Array(tArr1);
  tArr2[1] = 42;

  console.log(tArr1); // Int8Array [32,0,0,0,0,0,0,0]
  console.log(tArr2); // Int8Array [32,42,0,0,0,0,0,0]
```

### 语法
```js
  // 下面代码是语法格式，不能直接运行，
  // TypedArray 关键字需要替换为底部列出的构造函数。
  new TypedArray(); // ES2017中新增
  new TypedArray(length); 
  new TypedArray(typedArray); 
  new TypedArray(object); 
  new TypedArray(buffer [, byteOffset [, length]]); 

  // TypedArray 指的是以下的其中之一： 
  Int8Array(); 
  Uint8Array(); 
  Uint8ClampedArray();
  Int16Array(); 
  Uint16Array();
  Int32Array(); 
  Uint32Array(); 
  Float32Array(); 
  Float64Array();
```
### 参数
  * length
    当传入length 参数时，一个内部的数组缓冲区会被创建在内存中，该缓存区的大小（类型化数组中byteLength 属性的值）是传入的length 乘以数组中每个元素的字节数（BYES_PER_ELEMENT），每个元素的字节数为2，Int32Array() 的每个元素的字节数为4
  * typedArray
    当传入一个任意类型化数组对象作为参数时，typedArray 会被复制到一个新的类型数组中
    
    typedArray 中的每个值在被复制到新的数组之前，会被转化为相应类型的构造函数

    新的生成的类型化数组对象将会有跟传入的数组相同长度，只是每一项进行了转化
  * object
    当传入一个object 作为参数时，就像通过TypedArray.form() 方法创建一个新的类型化数组一样
  
  * buffer,byteOffset,length
    当传入一个buffer 参数，或者再加上可选参数byteOffset 和 length 时，一个新的类型化数组视图将被创建

    byteOffset 和 length 参数制定了类型化数组视图将要暴露的内存范围

    如果两者都未传入，name整个buffer 都会被呈现；如果仅仅忽略length，那么buffer 中偏移了byteOffset后剩下的buffer 将会被呈现

### 描述
  ES2015 定义了一个`TypeArray` 构造器作为所有的类型化数组构造器的原型。该构造器并不会直接暴露出来：即没有全局的TypedArray 属性，只能通过使用类似于Object.getPrototypeOf(Int8Array.prototype) 的方式直接访问。所有的类型化数组构造器都会继承%TypeArray% 构造器函数的公共属性和方法。此外，所有的类型化数组的原型，都以%TypeArray%.prototype 作为原型

  %TypeArray% 构造器自身并不是特别有用，直接调用或者使用new 表达式实例化都会抛出一个TypeError 异常，除非在支持子类化创建对象的Js引擎下运行。但直到现在还没有这样的Js引擎出现。因此%TypeArray% 仅仅在对所有的类型化数组构造器的方法和属性进行polyfill 的时候比较有用

  当创建一个TypedArray 实例时，一个数组缓冲区将被创建在内存中，如果一个ArrayBuffer 对象被当做参数传给构造函数，name将使用传入的ArrayBuffer 代替（即缓冲区被创建到ArrayBufeer 中）。缓存区的地址被存储在实例的内部属性中，并且所有%TypedArray%.prototype 上的方法，例如set value和get value 等，都会在这个数组缓冲区上进行操作

  **属性访问**
  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray