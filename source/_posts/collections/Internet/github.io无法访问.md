---
title: github.io 无法访问
date: 2020-08-20
---

## DNS解析错误的解决方法

最近,电脑无法打开githu.io 页面，手机却可以正常访问。ping 了下github.io，发现DNS 解析到了127.0.0.1 这明显不正常。。。

1. 检查是否DNS 解析问题，`ping github.io`
```cmd
  ping github.io

  正在 Ping github.io [127.0.0.1] 具有 32 字节的数据:
```

2. 使用114 解析获取正确的ip 地址
```cmd
  nslookup github.io 114.114.114.114

  服务器:  public1.114dns.com
  Address:  114.114.114.114

  非权威应答:
  名称:    github.io
  Addresses:  185.199.110.153
            185.199.111.153
            185.199.108.153
            185.199.109.153
```

3. 修改host 文件，将github.io 指向上一步获取到的 Addresses

host 文件所在目录：C:\Windows\System32\drivers\etc\hosts

```host
  185.199.110.153 ewqazxc.github.io
```

4. ipconfig /flushdns 更新下DNS 配置，再打开网页即可
