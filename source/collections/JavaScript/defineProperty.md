---
title: defineProperty
date: 2020-08-04
---

## Object.defineProperty()
  `Object.defineProperty（）`方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象
  > 备注：应当直接在`object`构造器对象上调用此方法，而不是在任意一个`Object`类型的实例上调用

### Demo

```
const obj = {};
Object.defineProperty(obj,'prop',{
  value: 66,
  writable: false
});
obj.prop = 77; // 由于writable为false 严格模式下会报错
console。log(obj.prop); // 66 
```

### 语法
  `Object.defineProperty(obj, prop, descriptor)`

### 参数
  * obj
    要定义属性的对象
  * prop
    要定义或修改属性的名称或`Symbol`
  * descriptor
    要定义或修改的属性描述符

### 返回值
  被传递给函数的对象 obj

### 描述
  该方法允许精准地添加或修改对象的属性。通过赋值操作添加的普通属性是可枚举的，在枚举对象属性时会被枚举到（`for...in` 或 `Object.keys` 方法 ），可以改变这些属性的值，也可以删除这些属性。允许修改默认的额外选项。默认情况下，添加的属性时不可修改的

  对象里目前存在的属性描述符有两种主要形式：数据描述符和存取描述符。数据描述符是一个具有值的属性，该值是可写的，也可以是不可写的。存取描述符是由`getter函数`和`setter函数`所描述的属性。一个描述符只能是其中之一，不能同时是两者

  这两种`描述符`都是对象，它们共享以下可选键值
    * configurable 默认为 false
      当且仅当该属性的`configurable`键值为`true`时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除
    * enumerable 默认为 false
      当且仅当改属性的`enumerable`键值为`true`时，该属性才会出现在对象的枚举属性中
  
  数据描述符可选键
    * value 默认为 undefined
      该属性对应的值。可以是任何有效的JavaScript值
    * writable ，默认为 false
      当且仅当该属性的`writable`键值为`true`时，属性的值，也就是上面的`value`，才能被赋值运算符改变
  
  存取描述符可选键
    * get 默认为 undefined
      属性的`·getter函数`，如果没有getter，则为undefined。
      当访问该属性时，会调用此函数，执行时不传入任何参数，但是会传入`this`对象（由于继承关系，这里的this并不一定是定义该属性的对象）
      该函数的返回值会被用作属性的值
    * set 默认为 undefined
      属性的`setter函数`，如果没有setter，则为undefined
      当属性被修改时，会调用此函数
      该方法会接受一个参数（也就是被赋予的新值），会传入赋值时的this对象

  如果一个描述符不具有 value、writable、get 和 set 中的任意一个键，那么它将被认为是一个数据描述符。如果一个描述符同时拥有 value 或 writable 和 get 或 set 键，则会产生一个异常。

  这些选项不一定是自身的属性，也要考虑继承来的属性。为了确认保留这些默认值，在设置之前，可能要冻结`Object.prototype`，明确指定所有的选项，或者通过`Object.create(null)`将`_proto_`属性指向`null`

  ```
    // 使用 _proto_
    var obj = {};
    var desc = Object.create(null); // 没有继承属性
    desc.value = 'static';
    Object.defineProperty(obj,'key',desc);

    // 显式
    Object.defineProperty(obj,'key',{
      enumerable: false,
      configurable: false,
      weritable: false,
      value: 'static'
    })

    // 循环使用同一对象
    function withValue(value){
      var d = withValue.d || (
        withValue.d = {
          enumerable: false,
          writable: false,
          configurable: false,
          value: null
        }
      );
      d.value = value;
      return d;
    }
    Object.defineProperty(obj,'key',withValue('static'));
    
    // 如果 freeze 可用, 防止后续代码添加或删除对象原型的属性
    // （value, get, set, enumerable, writable, configurable）
    (Object.freeze||Object)(Object.prototype); // 不能添加 修改 删除
  ```


***
属性描述符？
Symbol类型的特殊性？
定义key为Symbol ？
