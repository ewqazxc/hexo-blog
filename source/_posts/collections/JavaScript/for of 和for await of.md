---
title: for...of 和 for await ... of
date: 2020-08-10
---

## for...of

`for ... of`语句在可迭代对象（包括`Array, Map, Set, String, TypedArray, arguments`等），上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句

  ### Demo
  ```js
    const arr1 = ['a','b','c','d'];

    for(const ele of arr1){
      console.log(ele);
    }
    // "a" "b" "c" "d"
  ```

  ### 语法
  ```js
    for(variable of iterable){
      // statements
    }
  ```
  * variable

    在每次迭代中，将不同属性的值分配给变量
  
  * iterable

    被迭代枚举其属性的对象
  
  ### 示例

  * 迭代Array
  ```js
    const arr1 = ['a','b','c','d'];

    for(const ele of arr1){
      console.log(ele);
    }
    // "a" "b" "c" "d"
  ```

  * 迭代String
  ```js
    let str = "foo";

    for(let value of str){
      console.log(value);
    }

    // "f" "o" "o"
  ```

  * 迭代TypedArray
  ```js
    let iterable = new Uint8Array([0x00,0xff]);

    for(let value of iterable){
      console.log(value);
    }
    // 0 255
  ```

  * 迭代Map
  ```js
    let iterable = new Map([["a",1],["b",2],["c",3]]);

    for(let entry of iterable){
      console.log(entry);
    }
    // ["a",1] ["b",2] ["c",3]

    for(let [key,value] of iterable){
      console.log(value);
    }
    // 1 2 3
  ```

  * 迭代 Set
  ```js
    let iterable = new Set([1,1,2,2,3,3]);

    for(let value of iterable){
      console.log(value);
    }
    // 1 2 3 
  ```

 * 迭代arguments对象
 ```js
    (function(){
      for(let argument of arguments){
        console.log(argument);
      }
    })(1,2,3);

    // 1 2 3
 ```

 * 迭代DOM 集合
 
    迭代DOM元素集合，比如一个NodeList 对象：下面的例子演示给每一个article 标签内的p 标签添加一个"read"类
 ```js
    // 注意：这只能在实现了NodeList.prototpye[Symbol.iterator]的平台上运行
    let articles = document.querySelectorAll("artice > p");

    for(let paragraph of articles){
      paragraph.classList.add("read");
    }
 ```

 * 关闭迭代器

    对于`for ...of`的循环，可以由`break throw continue return `终止。在这些情况下，迭代器关闭
  ```js
    function* foo(){
      yield 1;
      yield 2;
      yield 3;
    };

    for(let o of foo()){
      console.log(o);
      break; // closes iterator
    }
  ```

  * 迭代生成器
  ```js
    function* fibonacci(){
      let [prev,curr]=[0,1];
      for(;;){
        [prev,curr]= [curr,prev + curr];
        yield curr;
      }
    }
    for(let n of fibonacci()){
      console.log(n);
      // 当n 大于1000时跳出循环
      if(n >1000){
        break;
      }
    }
  ```
  
  不要重用生成器，生成器关闭后，尝试再次迭代，不会产生效果
  ```js
    let gen = (function*(){
      yield 1;
      yield 2;
      yield 3;
    })();

    for(let o of gen){
      console.log(o);
      break;
    }
    // 1

    for(let o of gen){
      console.log(o)
    }
    // 不执行console
  ```  
  
  * 迭代其它可迭代对象
  ```js
    let iterable = {
      [Symbol.iterator]() {
        return {
          i: 0,
          next() {
            if(this.i <3){
              return {value:this.i++,done:false};
            }
            return {value:undefined,done:true};
          }
        }
      }
    }

    for(let value of iterable){
      console.log(value);
    }
    // 0 1 2
  ```

  * `for ...of` 和`for ...in` 的区别

    二者都是迭代一些东西，它们的区别在于迭代方式
    
    * `for ...in` 语句以任意顺序迭代对象的可枚举属性
    * `for ...of` 语句遍历可迭代对象定义要迭代的数据

  以下示例展示了与Array 使用时，二者循环之间的区别
  ```js
    Object.prototype.objCustom = function(){};
    Array.prototype.arrCustom = function(){};

    let interable = [3,5,7];
    interable.foo = 'hello';

    for(let i in interable){
      console.log(i);
    }
    // 0,1,2,"foo","arrCustom","objCustom"

    for(let i in interable){
      if(interable.hasOwnProperty(i)){
        console.log(i);
      }
    }
    // 0,1,2,"foo"
  ```
  ```js
    Objecti.prototype.objCustom = function(){};
    Array.prototype.arrCustom = function(){};

    let iterable = [3,5,7];
    iterable.foo = 'hello';
  ```
  每个对象将继承`objCustom` 属性，并且作为Array 的每个对象将继承arrCustom 属性，因为将这些属性添加到`Object.prototype Array.prototype`，由于继承和原型链，对象iterable 继承属性objCustom 和arrCustom
  ```js
    for(let i in iterable){
      console.log(i);
    }
    // 0 1 2 "foo" "arrCustom" "objCustom"
  ```
  此循环仅以原始插入顺序记录iterable 对象的可枚举属性。它不记录数组元素3,5,7或hello ，因为这些不是枚举属性，但是它记录了数组索引以及arrCustom 和objCustom
  ```js
    for(let i in interable){
      if(interable.hasOwnProperty(i)){
        console.log(i);
      }
    }
    // 0,1,2,"foo"
  ```
  这个循环类似上一个，但是使用hasOwnProperty()进行检查，仅打印自身属性（非继承）
  ```js
    for (let i of iterable) {
      console.log(i); // logs 3, 5, 7 
    }
  ```
  该循环迭代并记录iterable 作为可迭代对象定义的迭代值，3 5 7；而不是任何对象的属性

## for await ...of
  for await ...of 语句会在异步或者同步可迭代对象上创建一个迭代循环，包括String，Array，Array-like 对象（arguments、NodeList...），TypeArray，Map，Set和自定义的异步或者同步可迭代对象。

  其会调用自定义迭代钩子，并未每个不同属性的值执行语句

  ### 语法
  ```js
    for await(variable o iterable){
      //statement
    }
  ```
  * variable 在每次迭代中，将不同属性的值分配给变量。变量有可能以const let 或者var 来声明
  * iterable 被迭代枚举其属性的对象。与for ...of 相比，这里的对象可以返回Promise，如果是这样，那么variable 将是Promise 所包含的值，否则是值本身

  ### 例子
  * 迭代异步可迭代对象
  ```js
    let asyncIterable = {
      [Symbol.asyncIterator](){
        return {
          i: 0,
          next() {
            if(this.i < 3){
              return Promise.resolve({value: this.i++,done: false});
            }
            return Promise.resolve({done: true});
          }
        }
      }
    };

    (async function() {
      for await(num of asyncIterable){
        console.log(num);
      }
    })();
    // 0 1 2
  ```
  ```js
    async function* streamAsyncIterator(stream) {
      const reader = stream.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            return;
          }
          yield value;
        }
      } finally {
        reader.releaseLock();
      }
    }
    // 从url获取数据并使用异步 generator 来计算响应值的大小
    async function getResponseSize(url) {
      const response = await fetch(url);
      // Will hold the size of the response, in bytes.
      let responseSize = 0;
      // 使用for-await-of循环. 异步 generator 会遍历响应值的每一部分
      for await (const chunk of streamAsyncIterator(response.body)) {
        // Incrementing the total response length.
        responseSize += chunk.length;
      }
      
      console.log(`Response Size: ${responseSize} bytes`);
      // expected output: "Response Size: 1071472"
      return responseSize;
    }
    getResponseSize('https://jsonplaceholder.typicode.com/photos');
  ```

***
可迭代对象
TypedArray
array iteration and for...in
继承和原型链
fetch
