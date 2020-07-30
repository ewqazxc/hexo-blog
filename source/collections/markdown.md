---
title: MarkDown语法
# date: 2020-07-26 20:02:31
---

# MarkDown 语法

## 标题
```
# 一级标题 `<h1/>`
## 二级标题 `<h2/>
...
###### 六级标题 `<h6/>'
```
---
# 一级标题 `<h1/>`
## 二级标题 `<h2/>`
###### 六级标题 `<h6/>`
---

## 强调
```
*看这里看这里！！！`<em>`斜体*
_看这里看这里！！！`<u>`斜体+下划线_
**看这里看这里！！！`<strong>`加粗**
__看这里看这里！！！`<stong>`加粗+下划线__
```
---
*看这里看这里！！！`<em>`斜体*
_看这里看这里！！！`<u>`斜体+下划线_
**看这里看这里！！！`<strong>`加粗**
__看这里看这里！！！`<stong>`加粗+下划线__
---

## 换行 
后面有四个空格        
后面没有空格，直接回车
然后。。。好像没差

## 列表
### 1 无序列表
```
* 项目一 无序列表 `* + 空格键`
* 项目二
  * 项目二的子项目一 无序列表 `TAB + * + 空格键`
  * 项目二的子项目二
```
---
* 项目一 无序列表 `* + 空格键`
* 项目二
  * 项目二的子项目一 无序列表 `TAB + * + 空格键`
  * 项目二的子项目二
---
### 2 有序列表
```
1. 项目一 有序列表 `数字 + . + 空格键`
2. 项目二 
3. 项目三
    1. 项目三的子项目一 有序列表 `TAB + 数字 + . + 空格键`
    2. 项目三的子项目二
```
---
1. 项目一 有序列表 `数字 + . + 空格键`
2. 项目二 
3. 项目三
    1. 项目三的子项目一 有序列表 `TAB + 数字 + . + 空格键`
    2. 项目三的子项目二
---
### 3 任务列表
```
- [ ] 任务一 未做任务 `- + 空格 + [ ]`
- [x] 任务二 已做任务 `- + 空格 + [x]`
```
---
- [ ] 任务一 未做 
- [x] 任务二 已做
---

## 图片
```
![GitHub set up](http://zh.mweb.im/asset/img/set-up-git.gif)
格式: ![Alt Text](url)
```
---
![GitHub set up](http://zh.mweb.im/asset/img/set-up-git.gif)
---
---
![狗头](/hexo-blog/imgs/img.png)
---
### 大小/title
```
![GitHub set up](http://zh.mweb.im/asset/img/set-up-git.gif "title")
<img src="http://zh.mweb.im/asset/img/set-up-git.gif" width="140px">
```
---
![GitHub set up](http://zh.mweb.im/asset/img/set-up-git.gif "title")
<img src="http://zh.mweb.im/asset/img/set-up-git.gif" width="140px">
---

## 链接
```
email <example@example.com>
[GitHub](http://github.com)
自动生成链接<http://www.github.com/>
```
---
email <example@example.com>
[GitHub](http://github.com)
自动生成链接<http://www.github.com/>
---

## 区块引用
```
某某某说：
> 第一行引用
> 第二行引用文字
```
这里的引用是居中放大的字体
---
某某某说：
> 第一行引用
> 第二行引用文字
--- 

## 行内代码
```
使用反引号包裹`like me` `code`
反引号`中的``反引号`也会展示出来
```
---
使用反引号包裹`like me` `code`
反引号`中的``反引号`也会展示出来
---

## 多行或者一段代码
```js
// `x3 js
function hello(){
  console.log('hello');
}
// `x3
```

## 顺序图或流程图
```
`x3 sequence
张三->李四: 嘿，小四儿, 写博客了没?
Note right of 李四: 李四愣了一下，说：
李四-->张三: 忙得吐血，哪有时间写。
`x3

`x3 flow
st=>start: 开始
e=>end: 结束
op=>operation: 我的操作
cond=>condition: 确认？

st->op->cond
cond(yes)->e
cond(no)->op
`x3
```
---
![markdown效果](/hexo-blog/imgs/flowchart.png)
---

## 表格
```
第一格表头 | 第二格表头
--------- | -------------
内容单元格 第一列第一格 | 内容单元格第二列第一格
内容单元格 第一列第二格 多加文字 | 内容单元格第二列第二格
```
第一格表头 | 第二格表头
--------- | -------------
内容单元格 第一列第一格 | 内容单元格第二列第一格
内容单元格 第一列第二格 多加文字 | 内容单元格第二列第二格

## 删除线
```
~~~这是一些被删除的文字~~~
```
~~~这是一些被删除的文字~~~

### 分隔线
```
***
******
---
```

***
******
---
