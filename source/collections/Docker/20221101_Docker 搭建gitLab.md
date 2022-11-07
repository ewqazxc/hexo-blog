---
title: Docker 搭建GitLab
date: 2022-11-07
---

## [Docker 安装GitLab](https://blog.csdn.net/qq_36719391/article/details/123816629)

1. 搜索镜像
`docker search gitlab`
  ![gitlab-ce](/hexo-blog/imgs/Docker/20221107_gitlab-ce.png)

2. 拉取需要安装的镜像
`docker pull gitlab/gitlab-ce`

3. 创建宿主机上的映射文件目录
```
pwd /usr/data/dockerMap/gitlab
```

4. 检查镜像是否拉取成功
`docker images`

5. 根据gitlab 镜像创建并启动
```
docker run -d -p 8082:80 --name gitlab --restart always -v /usr/data/dockerMap/gitlab/config:/etc/gitlab -v /usr/data/dockerMap/gitlab/logs:/var/log/gitlab -v /usr/data/dockerMap/gitlab/data:/var/opt/gitlab gitlab/gitlab-ce
```

6. 修改配置
修改宿主机中的配置文件，然后重启容器即可
```gitlab.rb /usr/data/dockerMap/gitlab/config
# 配置http协议所使用的访问地址,不加端口号默认为80
external_url 'http://192.168.100.100'
# 配置ssh协议所使用的访问地址和端口
gitlab_rails['gitlab_ssh_host'] = '192.168.100.100'
gitlab_rails['gitlab_shell_ssh_port'] = 222 # 此端口是run时22端口映射的222端口

# 配置超时设置 不配置此项访问502
gitlab_rails['webhook_timeout'] = 90 
gitlab_rails['git_timeout'] = 90
```

## 登录GitLab
访问配置好的gitlab 地址`http://192.168.100.100:8082/`
1. 提示注册 正常注册登录
2. 提示登录 通过命令获取初始密码，登录后修改
`docker exec -it gitlab grep 'Password:' /etc/gitlab/initial_root_password`



