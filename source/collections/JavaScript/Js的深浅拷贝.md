---
title: Js的深浅拷贝
date: 2020-08-24
---

* 浅拷贝：创建一个新对象，这个对象有着原始对象属性值的一份精准拷贝。如果属性时基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址，所以如果其中一个对象改变了这个地址，就会影响到另一个对象
* 深拷贝：讲一个对象从内存中完整的拷贝一份出来，从堆内存中开辟一个新的区域存放新对象，且修改新对象不会影响原对象

简单的说，浅拷贝创建的新对象，其中的引用对象依旧与原对象有关；深拷贝创建的新对象，则是一个全新的对象，只是内容与原对象相同，再无瓜葛

## 浅拷贝的实现方式

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

## 深拷贝的实现方式

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
* 终极版：全面考虑各种数据类型
```js
// 定义各种数据类型的Tag

// 可连续遍历的数组
const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const argsTag = '[object Arguments]';

// 不可连续遍历的数据类型
const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const numberTag = '[object Number]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const errorTag = '[object Error]';
const regexpTag = '[object RegExp]';
const funcTag = '[object Function]';

// 不可连续遍历的数据类型的Tag
const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];

// 判断是不是引用数据类型
function isObject(target) {
    const type = typeof target;
    return target !== null && (type === 'object' || type === 'function');
}

// 获取数据类型
function getType(target) {
    return Object.prototype.toString.call(target);
}

// 初始化被克隆的对象 可连续遍历的
function getInit(target) {
    const Ctor = target.constructor;
    return new Ctor();
}

// 克隆Symbol
function cloneSymbol(targe) {
    return Object(Symbol.prototype.valueOf.call(targe));
}

// 克隆正则
function cloneReg(targe) {
    const reFlags = /\w*$/;
    const result = new targe.constructor(targe.source, reFlags.exec(targe));
    result.lastIndex = targe.lastIndex;
    return result;
}

// 克隆函数
function cloneFunction(func) {
    const bodyReg = /(?<={)(.|\n)+(?=})/m;
    const paramReg = /(?<=\().+(?=\)\s+{)/;
    const funcString = func.toString();
    if (func.prototype) {
        const param = paramReg.exec(funcString);
        const body = bodyReg.exec(funcString);
        if (body) {
            if (param) {
                const paramArr = param[0].split(',');
                return new Function(...paramArr, body[0]);
            } else {
                return new Function(body[0]);
            }
        } else {
            return null;
        }
    } else {
        return eval(funcString);
    }
}

// 克隆不可遍历的类型
function cloneOtherType(targe, type) {
    const Ctor = targe.constructor;
    switch (type) {
        case boolTag:
        case numberTag:
        case stringTag:
        case errorTag:
        case dateTag:
            return new Ctor(targe);
        case regexpTag:
            return cloneReg(targe);
        case symbolTag:
            return cloneSymbol(targe);
        case funcTag:
            return cloneFunction(targe);
        default:
            return null;
    }
}

// 通用while 循环 处理对象和数组时使用
function forEach(array, iteratee) {
    let index = -1;
    const length = array.length;
    while (++index < length) {
        iteratee(array[index], index);
    }
    return array;
}

function clone(target, map = new WeakMap()){
  // 克隆原始类型
  if(!isObject(target)){
    return target;
  }

  // 初始化
  const type = getType(target); // 获取数据类型
  let cloneTarget;
  if(deepTag.includes(type)){
    // 可连续遍历的数据类型 先进行初始化
    cloneTarget = getInit(target, type);
  }else{
    // 不可连续遍历的数据类型 分类处理
    return cloneOtherType(target, type);
  }

  // 处理循环引用 
  if(map.get(target)){
    return target();
  }
  map.set(target, cloneTarget);

  // 处理 set
  if(type === setTag) {
    target.forEach(value => {
      cloneTarget.add(clone(value));
    });
    return cloneTarget;
  }

  // 处理 map
  if(type=== mapTag) {
    target.forEach((value, key)=>{
      cloneTarget.set(key, clone(value));
    });
    return cloneTarget;
  }

  // 处理对象和数组
  const keys = type === arratTag ? void 0 : Object.keys(target);
  forEach(keys || target, (value, key)=>{
    if(keys){
      key = value;
    }
    cloneTarget[key] = clone(target[key], map);
  });
  return cloneTarget;
};

```

参考资料：

* [如何写出一个惊艳面试官的深拷贝](https://mp.weixin.qq.com/s/vXbFsG59L1Ba0DMcZeU2Bg)
