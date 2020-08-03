---
title: hasOwnProperty 和 getOwnPropertyDescriptor
date: 2020-08-03
---

## 一、 Object.prototype.hasOwnProperty()

`hasOwnProperty()`方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）
### Demo
```
const object1 = {};
object1.property1 = 42;

console.log(object1.hasOwnProperty('property1')); // true
console.log(object1.hasOwnProperty('toString')); // false
console.log(object1.hasOwnProperty('hasOwnProperty')); // false
```

### 语法
  `obj.hasOwnProperty(prop)`
### 参数
  prop 要检测的属性的字符串形式标识的名称，或者Symbol
### 返回值
  用来判断某个对象是否含有指定的属性的布尔值
### 描述
  所有继承了`Object`的对象都会继承到`hasOwnproperty`方法。
  这个方法可以用来检测一个对象是否含有特定的自身属性；
  和`in`运算符不同，该方法会忽略掉那些从原型链上继承到的属性 `'toString' in obj // true`
### 备注
  及时属性的值是`null`或`undefined`，只要属性存在，`hasOwnProperty`依旧会返回true
  ```
    o = new Object();
    o.propOne = null;
    o.hasOwnProperty('propOne'); // true
    o.propTwo = undefined;
    o.hasOwnproperty('propTwo'); // true
  ```
### 自身属性与继承属性
  ```
   const o = new Object();
   o.prop = 'exosts';
   o.hasOwnProperty('prop'); // true
   o.hasOwnProperty('hasOwnProperty'); // false
   o.hasOwnProperty('toString'); // false
   'hasOwnproperty' in o; // false
   'hasOwnProperty' in o; // true
   'toString' in o; // true
  ```
### 遍历一个对象的所有自身属性
  `for...in`循环只会遍历可枚举的属性，所以不应该基于这个循环中没有不可枚举的属性而得出`hasOwnProperty`是严格限制于可枚举项目的（如同 Object.getOwnPropertyNames()）
  ```
    var buz = { fog: 'stack'};
    for(var name in buz){
      if(buz.hasOwnProperty(name)){
        console.log('this is fog ('+name+')for sure Value:'+ buz[name]);
      }else{
        console.log(name); // protptype 继承的一些属性
        // MDN中表示 toString 也会被输出，实际测试中，只在通过 Object.prototype 赋值的属性会显示 Object.prototype.showMe="ok"; 
      }
    }
  ```
### 使用hasOwnProperty作为属性
  JavaScript并没有保护`hasOwnProperty`这个属性名，因此，当某个对象可能自有一个占用该属性名的属性时，可以通过外部的`hasOwnProperty`获得正确的结果
  ```
    var foo = {
      hasOwnProperty: function() {
        return false;
      },
      bar: 'hehe'
    };
    foo.hasOwnProperty('bar'); // 始终返回 false

    // 1 直接使用原型链上真正的 hasOWnProperty 方法
    ({}).hasOwnProperty.call(foo,'bar'); // true
    // 2 也可以使用 Object 原型上的 hasOwnProperty 属性
    Object.prototype.hasOwnProperty.call(foo,'bar'); // true
  ```

## 二、 Object.getOwnPropertyDescriptor()
  `Object.getOwnPropertyDescriptor()`方法返回指定对象上一个自由属性对应的属性描述符。（自由属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）

### Demo
  ```
    const obj = {
      property:66
    };
    const descriptor = Object.getOwnPropertyDescriptor(obj,'property');
    console.log(descriptor.configurable); // true
    console.log(descriptor.value); // 66
  ```

### 语法
  Object.getOwnPropertyDescriptor(obj,prop)
### 参数
  * obj
    需要查找的目标对象
  * prop
    目标对象内属性名称
### 返回值
  如果指定的属性存在于对象上，则返回其属性描述符对象（property descriptor）,否则返回 `undefined`
### 描述
  该方法允许对一个属性的描述进行检索
  在JavaScript中，属性又一个字符串类型的“名字”（name）和一个“属性描述符”（property descriptor）对象构成（Object.defineProperty）

    一个属性描述符是一个记录，由下面属性当中的某些组成的：
    * value
      该属性的值（仅针对数据属性描述符有效）
    * writable
      当且仅当属性的值可以被改变时为true（仅针对数据属性描述符有效）
    * get 
      获取该属性的访问器函数（getter），无则为 undefined
    * set 
      获取该属性的设置器函数（setter），无则为 undefined
    * configurable
      当且仅当指定对象的属性描述可以被改变或者属性可被删除时，为true
    * enumerable
      当且仅当指定对象的属性可以被枚举时，为true

## React 中用来判断ref 和 key是否存在
```
function hasValidRef(config) {
  if (__DEV__) {
    if (hasOwnProperty.call(config, 'ref')) {
      const getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}

function hasValidKey(config) {
  if (__DEV__) {
    if (hasOwnProperty.call(config, 'key')) {
      const getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}
```
isReactWarning?
Object.defineProperty?
Object.getOwnPropertyNames?