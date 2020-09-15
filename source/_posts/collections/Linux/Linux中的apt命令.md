---
title: Linux 中的apt 命令
date: 2020-09-15
---

## 什么是apt

`apt`是一个命令行实用程序，用于Ubuntu，Debian 和相关Linux 发行版上安装、更新、删除和管理deb 包。

它是apt-get 和apt-cache 工具的常用命令和选项的组合。

## 更新包索引 apt update

`apt update`

APT 包索引基本上是一个数据库，它保存系统中启用的存储库中可用包的记录

要更新包索引，请运行以下命令，这将从APT 存储库中提取最新更改
```sh
  sudo apt update
```
* 始终在升级或安装新软件包之前更新软件包索引

## 升级包 apt upgrade

`apt upgrade`

定期更新Linux 系统是整个系统安全性最重要的方面之一

要将已安装的软件包升级到最新版本，请运行：
```sh
  sudo apt upgrade
```
该命令不会升级那些需要删除已安装软件包的软件包

如果要升级单个包则：
```sh
  sudo apt upgrade packageName
```
配置自动安全更新始终是个好主意

## 完全升级 apt full-upgrade

upgrade 和full-upgrade 之间的区别在于，如果需要升级整个系统，则后者将删除已安装的软件包

`sudo apt full-upgrade` **使用此命令时要格外小心**

## 安装包 apt install

1. 安装单个软件包
```sh
  sudo apt install packageName
```
2. 安装多个软件包，空格分隔
```sh
  sudo apt install packageA packageB
```
3. 安装本地deb 文件，需要提供文件的完整路径，否则将尝试从APT 存储库检索并安装
```sh
  sudo apt install /full/path/file.deb
```

## 删除包 apt remove/purge/autoremove

1. 删除单个软件包
```sh
  sudo apt remove packageName
```
2. 删除多个软件包，空格分隔
```sh
  sudo apt remove packageA packageB
```
3. 删除包的同时，purge 删除包括所有配置文件
```sh
  sudo apt purge packageName
```
4. 删除未使用的包 
```sh
  sudo apt autoremove
```
每当在系统上安装依赖于其他软件包的新软件包时，也会安装软件包依赖项。删除程序包后，依赖项将保留在系统上。这些剩余的包不再被其他任何东西使用，可以删除。

## 查看包列表 apt list

1. 列出所有包
```sh
  sudo apt list
```
2. 列出特定包，使用grep 命令进行过滤
```sh
  sudo apt list | grep packageName
```
3. 列出已安装的包
```sh
  sudo apt list --installed
```
4. 列出可升级软件包，升级软件包之前看看
```sh
  sudo apt list --upgradeable
```

## 搜索包 apt search

此命令会在可用包列表中搜索到指定包
```sh
  sudo apt search packageName
```
## 查看包的信息 apt show

在删除或安装新软件包之前，有关包依赖性，安装大写，软件包源等信息,可通过以下命令查看
```sh
  sudo apt show packageName
```

## 更多apt 命令 可输入 man apt 查看
