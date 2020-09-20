---
title: Ubuntu 启动ssh 服务
date: 2020-09-20 17:44:33
---

## Ubuntu 启动ssh 服务

1. 检查ssh 服务是否已启动
```sh
  ps -e | grep ssh
  2899 ?        00:00:00 sshd
  2907 ?        00:00:00 sshd
  # 有输出则已启动
```

2. 安装ssh 服务
```sh
  sudo apt-get install openssh-client # 客户端
  sudo apt-get install openssh-server # 服务端
```

3. 启动ssh 服务
```sh
  sudo /etc/init.d/ssh start
```
首次安装可能缺少相关秘钥，查看`/usr/sbin/sshd`下是否有相关文件，有可以试试chmod 600 后再试

没有的话，按以下命令生成
```sh
  ssh-keygen -t dsa -f /etc/ssh/ssh_host_dsa_key
  ssh-keygen -t rsa -f /etc/ssh/ssh_host_rsa_key
```
启动后可以通过1 的指令查看是否启动

4. 修改ssh 端口号
ssh 默认端口号 22
```sh
  sudo gedit /etc/ssh/ssh_config
```
修改其中的Port 值，重新启动
```sh
  sudo /etc/init.d/ssh restart
```

5. ssh 远程登录
```sh
  ssh username@linuxip

  exit # 断开链接
  # 查看ip 地址
  ifconfig -a
  # sudo apt install net-tools

  # Permission denied (publickey). 
  # 解决方案一，sshkey
  # 主机一：
  # ssh-keygen -t rsa
  # 将生产的pub文件拷贝到主机二上

  # 主机二：
  # cat 1.pub >> .ssh/authorized_keys 
  # chmod 600 .ssh/authorized_keys 
  # chmod 700 .ssh

  # 解决方案二，允许ssh密码登录权限
  # 登录目标机器 打开 /etc/ssh/sshd_config ，修改PasswordAuthentication no 为：
  # PasswordAuthentication yes

  # 重启服务
  # /etc/init.d/sshd restart
```

6. 数据传输
```sh
  $ scp -r usr@43.224.34.73:/home/lk   /root  //将远程IP地址为43.224.34.73的usr用户下路径为 /home/lk 的所有文件拷贝到本地 /root 文件夹中

  $ scp usr@43.224.34.73:/home/lk/test.jar   /root  //将远程IP地址为43.224.34.73的usr用户下路径为 /home/lk 的test.jar文件拷贝到本地 /root 文件夹中

  $ scp -r /root  usr@43.224.34.73:/home/lk    //将本地 /root 中的所有文件拷贝到远程IP地址为43.224.34.73的usr用户下路径为 /home/lk 的文件夹中

  $ scp /root/test.jar   usr@43.224.34.73:/home/lk   //将本地 /root 中的test.jar文件拷贝到远程IP地址为43.224.34.73的usr用户下路径为 /home/lk 的文件夹中
```
