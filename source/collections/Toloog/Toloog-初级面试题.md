---
title: Toloog-初级面试题
date: 2020-10-03
---

## h5和css3新属性
1. H5
  语意化标签(nav、aside、dialog、header、footer等)
  canvas
  拖放相关api
  Audio、Video
  获取地理位置
  更好的input校验
  web存储(localStorage、sessionStorage)
  webWorkers(类似于多线程并发)
  webSocket
2. CSS3
  选择器
  边框(border-image、border-radius、box-shadow)
  背景(background-clip、background-origin、background-size)
  渐变(linear-gradients、radial-gradents)
  字体(@font-face)
  转换、形变(transform)
  过度(transition)
  动画(animation)
  弹性盒模型(flex-box)
  媒体查询(@media)

## get与post的区别 

- 表单的method属性设置post时发送的是post请求，其余都是get请求
- get请求通过url地址发送请求参数，参数可以直接在地址栏中显示，安全性较差；post是通过请求体发送请求参数，参数不能直接显示，相对安全
- get请求URL地址有长度限制，根据浏览器的不同，限制字节长度不同，post请求没有长度限制

## 几种常用选择器
五大类选择器：

1. 基本选择器

元素选择（直接获取元素名 P、h1）【过于直接】
ID选择（#id）【取值唯一不能复用】
类选择（.class）【组合、复用】
* 通用选择器(所有元素)

2. 关系选择器
```sh
 > 子元素
 ~ 兄弟
 + 后一位
```

3. 伪类选择器

:nth-child(n) ：  n可以是数字(4)、关键词(old,even)或公式(2n+1)
:active: 将样式添加到被激活的元素
:focus: 将样式添加到被选中的元素
:hover: 鼠标悬浮在元素上时 添加样式
:link: 添加到未被访问过的链接
:visited 添加到被访问过的链接
:first-child: 添加到元素的第一个子元素
:lang： 定义使用的语言

4. 伪元素选择器
:first-letter : 添加到文本的首字母
:first-line : 添加到文本的首行
:before : 某元素之前插入某些内容
:after : 某元素之后插入某些内容

5. 属性选择器
- [attr=value]

## JS数组操作
- concat() 链接两个或更多的数组,并返回结果
- join() 把数组通过指定分隔符进行分割并拼接成一个字符串
- pop() 删除并返回数组的最后一个元素
- push() 向数组的末尾添加一个或更多元素,并返回新长度
- reverse() 反转数组中元素的顺序

## js数据类型
- 基本数据类型：number,string,null,undefined,boolean,symbol,bigInt
- 引用数据类型： object

## localStorage, sessionStorage 区别？ 
- localStorage： 本地存储，与cookie作用相同，但是比cookie有更大的存储空间，生命周期永久，除非主动删除，否则会一直存放在客户端。
- sessionStorage： 会话存储，生命周期是临时的，尽在当前会话窗口有效，关闭页面或浏览器数据就会自动清除

## flex实现一个三点的筛子
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>flex 画骰子</title>
    <style type="text/css">
        /* 做题部分 */
        .box {
            width: 200px;
            height: 200px;
            border: 2px solid #ccc;
            border-radius: 10px;
            padding: 20px;
            display: flex;
            justify-content: space-between;
        }
        .item {
            display: block;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #666;
        }
        .item:nth-child(2) {
            align-self: center;
        }
        .item:nth-child(3) {
            align-self: flex-end;
        }
        /* 做题部分 */
    </style>
</head>
<body>
    <div class="box">
        <span class="item"></span>
        <span class="item"></span>
        <span class="item"></span>
    </div>
</body>
```

## 实现圣杯布局/双飞翼布局
1. 圣杯布局
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>圣杯布局</title>
    <style type="text/css">
        body {
            min-width: 550px;
        }
        #header {
            text-align: center;
            background-color: #f1f1f1;
        }

        #container {
            padding-left: 200px;
            padding-right: 150px;
        }
        #container .column {
            float: left;
        }

        #center {
            background-color: #ccc;
            width: 100%;
        }
        #left {
            position: relative;
            background-color: yellow;
            width: 200px;
            margin-left: -100%;
            right: 200px;
        }
        #right {
            background-color: red;
            width: 150px;
            margin-right: -150px;
        }

        #footer {
            text-align: center;
            background-color: #f1f1f1;
        }

        /* 手写 clearfix */
        .clearfix:after {
            content: '';
            display: table;
            clear: both;
        }
    </style>
</head>
<body>
    <div id="header">this is header</div>
    <div id="container" class="clearfix">
        <div id="center" class="column">this is center</div>
        <div id="left" class="column">this is left</div>
        <div id="right" class="column">this is right</div>
    </div>
    <div id="footer">this is footer</div>
</body>
</html>
```
2. 双飞翼布局
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>双飞翼布局</title>
    <style type="text/css">
        body {
            min-width: 550px;
        }
        .col {
            float: left;
        }

        #main {
            width: 100%;
            height: 200px;
            background-color: #ccc;
        }
        #main-wrap {
            margin: 0 190px 0 190px;
        }

        #left {
            width: 190px;
            height: 200px;
            background-color: #0000FF;
            margin-left: -100%;
        }
        #right {
            width: 190px;
            height: 200px;
            background-color: #FF0000;
            margin-left: -190px;
        }
    </style>
</head>
<body>
    <div id="main" class="col">
        <div id="main-wrap">
            this is main
        </div>
    </div>
    <div id="left" class="col">
        this is left
    </div>
    <div id="right" class="col">
        this is right
    </div>
</body>
</html>
```

## 数组去重
var arr = [2,0,1,9,1,0,2,1];
1. indexOf
```js
var arr = [2,0,1,9,1,0,2,1];
var a_arr = [];
for(let i=0;i<arr.length;i++){
    if(a_arr.indexOf(arr[i]) == -1){
        a_arr.push(arr[i]);
    }
}
console.log(a_arr);
```

2. 两个for循环
```js
var arr = [2,0,1,9,1,0,2,1,4];
var a_arr = [];
for(let i=0;i<arr.length;i++){
    var flag = true;
    for(let j=0;j<a_arr.length;j++){
        if(arr[i] == arr[j]){
            flag = false;
        }
    }
    if(flag){
        a_arr.push(arr[i]);
    }
}
console.log(a_arr);
```

3. ES6 set方法
```js
var arr = [2,0,1,9,1,0,2,1,4];
var a_arr = [...new Set(arr)]
console.log(a_arr);
```
4. filter方法
```js
var arr = [2,0,1,9,1,0,2,1,4];
function unique(array) {
    var res = array.filter(function(item, index, array){
        return array.indexOf(item) === index;
    })
    return res;
}
console.log(unique(arr));
```

## 防抖/节流
1. 防抖
```js
function debounce(func, ms = 1000) {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, ms)
  }
}

// 测试
const task = () => { console.log('run task') }
const debounceTask = debounce(task, 1000)
window.addEventListener('scroll', debounceTask)
```
2. 节流
```js
function throttle(func, ms = 1000) {
  let canRun = true
  return function (...args) {
    if (!canRun) return
    canRun = false
    setTimeout(() => {
      func.apply(this, args)
      canRun = true
    }, ms)
  }
}

// 测试
const task = () => { console.log('run task') }
const throttleTask = throttle(task, 1000)
window.addEventListener('scroll', throttleTask)
```

## 选择器练习
- 题目：
```html
<h2 class="red-text">CatPhotoApp</h2>
<main>
  
  <a href="#"><img class="smaller-image thick-green-border" src="http://cdn.chenzhicheng.com/relaxing-cat.jpg" alt="一只仰卧着的萌猫"></a>
  
  <div class="silver-background">
    <p>猫咪最喜欢的三件东西：</p>
    <ul>
      <li>猫薄荷</li>
      <li>激光笔</li>
      <li>千层饼</li>
    </ul>
    <p>猫咪最讨厌的三件东西：</p>
    <ol>
      <li>跳蚤</li>
      <li>打雷</li>
      <li>同类</li>
    </ol>
  </div>
  
  <form action="/submit-cat-photo" id="cat-photo-form">
    <label><input type="radio" name="indoor-outdoor">室内</label>
    <label><input type="radio" name="indoor-outdoor">室外</label><br>
    <label><input type="checkbox" name="personality">忠诚</label>
    <label><input type="checkbox" name="personality">懒惰</label>
    <label><input type="checkbox" name="personality">积极</label><br>
    <input type="text" placeholder="猫咪图片地址" required>
    <button type="submit">提交</button>
  </form>
</main>
```
1. 选择id为cat-photo-element的元素，并设置它的内边距为10px
2. 使用元素选择器来设置元素h2 的背景色为 red
3. 使用属性选择器来设置所有type 为radio 的元素的外边距，上边距10px，下边距15px, 右边距10px，左边距15px
4. 使用伪类选择器，当鼠标放在li 标签的内容上时，出现黑色背景色，白色文字 
5. 使用关系选择器，使后一个li 与前一个li 的上边距为10px
6. 使用伪元素选择器，为p 标签前添加\*号，（如：`猫咪最喜欢的三件东西` 展示为 `*猫咪最喜欢的三件东西`）
```css
#cat-photo-element{
    padding: 10px;
}
h2 {
    background-color: red;
}
input[type='radio'] {
  margin: 10px 10px 15px 15px;
}
li:hover{
    color: white;
    background-color: black;
}
li+li{
    margin-top:10px;
}
p:before{
  content:'*';
}
```

