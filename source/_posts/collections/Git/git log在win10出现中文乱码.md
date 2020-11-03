---
title: git log在win10出现中文乱码
date: 2020-11-03
---


##  直接在cmd/bash中输入如下设置命令：
```sh
  git config --global core.quotepath false 
  git config --global gui.encoding utf-8
  git config --global i18n.commit.encoding utf-8 
  git config --global i18n.logoutputencoding utf-8 
  # bash 环境下
  export LESSCHARSET=utf-8
  # cmd环境下：
  set LESSCHARSET=utf-8
```
这样设置完后，当前命令窗口是没问题的。

但是，另打开一个还是不行。然后就想到应该是最后一句的问题。这一个并没有将这个变量保存起来。所以，就直接将最后一个变量添加到Windows环境变量中：
```sh
# 变量
LESSCHARSET
# 值
utf-8
```