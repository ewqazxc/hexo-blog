---
title: Win10 运行Linux
date: 2020-09-14
---

## 如何在Win10 中运行Linux 子系统

1. 启用组件

  打开控制面板 -> 程序 -> 程序和功能，点击`启用或者关闭Windows 功能`，找到并勾选`适用于Linux的windows 子系统`，点击确定即可，然后根据提示重启。

  需要注意，这种方法目前只支持X64的系统

2. 开启开发者模式

  打开设置，输入开发人员模式，在进入的菜单选中开发人员模式即可

3. 下载Ubuntu

  打开Win10 自带的Microsoft Store，搜索Ubuntu 选中下载

4. 安装Ubuntu

  在上一步选中下载后，点击`启动`，然后按任意键，根据提示输入运行的账户和密码

  注意：输入密码时，Ubuntu 默认是不显示的

5. 配置系统

```sh
sudo apt-get update  //更新系统

sudo apt-get install xorg  //安装xorg 键入y并回车确定 
// xorg （电脑操作系bai统）默认显示服务du器的一个软件包

sudo apt-get install xfce4  //xfce4   键入y并回车确定
// xfce是linux的一个桌面程序，xfce终端是这个桌面的终端

sudo apt-get install xrdp  //xrdp远程组件  键入y并回车确定
// xrdp在目前最新版Ubuntu 16.04下,如果实现Windows远程访问

sudo sed -i 's/port=3389/port=3390/g' /etc/xrdp/xrdp.ini  //配置远程端口3390

sudo echo xfce4-session >~/.xsession  //写入 xfce4配置

#第2，3，4行输入之后分别键入y并回车确定，最后输入：
sudo service xrdp restart  //重启xrdp
```
其中 2，3，4 主要是为了实现远程桌面终端功能，若不需要可直接跳过

## Linux 开启ssh 服务

1. 首先更新源
```sh
  sudo apt-get update
```
2. 安装ssh 服务
```sh
  sudo apt-get install openssh-server
```
3. 检测是否已启动
```sh
  ps -e | grep ssh
```
运行后，看到有ssh 字样说明已启动，如果没有就手动启动
```sh
  /etc/init.d/ssh start
```
4. 配置ssh-server，配置文件位于/etc/ssh/sshd_config，默认端口为22，为了安全，一般自定义为其它端口，然后重启
```sh
  sudo /etc/init.d/ssh restart
```
**遇到的问题**

* 开启sshd 服务时报错`sshd: no hostkeys available — exiting`
  - 解决方案:
  ```sh
    # ssh-keygen -t dsa -f /etc/ssh/ssh_host_dsa_key
    # ssh-keygen -t rsa -f /etc/ssh/ssh_host_rsa_key
    # /usr/sbin/sshd
  ```

* 开启ssh 后，连接失败`Permission denied (publickey).`
  - 解决方案：允许ssh 密码登录权限
  1. 打开 /etc/ssh/sshd_config，修改PasswordAuthentication no 为：
  ```config
    PasswordAuthentication yes
  ```
  2. 重启服务 `/etc/init.d/sshd restart`
  - 注意：修改文件时可以sudo vim 打开文件，Linux 对权限要求严格，不用管理员权限很多事做不了
