---
title: windows快速删除碎片文件
date: 2022-12-27 13:30
categories:
  - windows
---

> windows 正常删除大量碎片文件时，效率低下，可通过 cmd 命令快速完成删除

1. 打开 cmd 命令窗口
2. 使用命令删除指定文件夹

```cmd
rmdir 磁盘:\文件夹名称\ /s /q
@REM /s 表示删除该目录，及其下所有文件和目录
@REM /q 表示安静模式，删除时不需要确认
```
