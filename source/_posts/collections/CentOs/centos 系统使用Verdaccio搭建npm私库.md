---
title: centos 系统使用verdaccio搭建npm私库
date: 2020-11-01
---

## 1 安装 nodejs
```sh
  yum install -y nodejs
```

## 2 安装 verdaccio
```sh
  npm install -g verdaccio --unsafe-perm
```
加上--unsafe-perm选项是为了防止gyp ERR! permission denied权限问题报错，如下：
```sh
gyp ERR! configure error
gyp ERR! stack Error: EACCES: permission denied, mkdir '/usr/local/lib/node_modules/verdaccio/node_modules/dtrace-provider/build'
gyp ERR! System Linux 3.10.0-862.14.4.el7.x86_64
gyp ERR! command "/usr/local/bin/node" "/usr/local/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js" "rebuild"
gyp ERR! cwd /usr/local/lib/node_modules/verdaccio/node_modules/dtrace-provider
gyp ERR! node -v v8.12.0
gyp ERR! node-gyp -v v3.8.0
gyp ERR! not ok
```
如果出现需要更新npm，则执行npm install -g npm操作

执行结果：
```
/usr/local/bin/verdaccio
```

## 3 启动 verdaccio
1. `verdaccio`，报错 未找到命令
成功：
```sh
[root@bogon /]# verdaccio
*** WARNING: Verdaccio doesn't need superuser privileges. Don't run it under root! ***
 warn --- config file  - /root/.config/verdaccio/config.yaml
 warn --- Verdaccio started
 warn --- Plugin successfully loaded: verdaccio-htpasswd
 warn --- Plugin successfully loaded: verdaccio-audit
 warn --- http address - http://localhost:4873/ - verdaccio/4.8.1
```
```
> config.yaml  storage

// 查看配置文件
vim config.yaml
在配置文件config.yaml末尾加入代码：

# you can specify listen address (or simply a port)
listen: 0.0.0.0:4873

其中url可以配置成淘宝镜像地址：
url: https://registry.npm.taobao.org/  //默认为npm的官网仓库地址，由于国情，修改 url 让verdaccio使用 淘宝的npm镜像地址，这样下载速度更快
```
2. 尝试pm2 启动
  - 安装pm2 `npm install -g pm2 --unsafe-perm`
  - `pm2 start verdaccio` 
  - `pm2 status` 查看运行状态

### 找不到命令—解决方法：
1. 用一个通用的命令配置环境变量
```sh
~$ echo -e "export PATH=$(npm prefix -g)/bin:$PATH" >> ~/.bashrc && source ~/.bashrc
```
上面的命令中使用 npm prefix -g 获取node安装目录

2. 再执行命令 ~$ serve -v 安装其他命令 也能成功执行

## 4 添加用户
1. 添加登录用户
```
npm adduser --registry http://172.17.250.182:4873
```
2. 发布到npm
```
npm publish --registry http://172.17.250.182:4873
```