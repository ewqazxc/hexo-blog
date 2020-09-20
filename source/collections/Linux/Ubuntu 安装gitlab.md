---
title: Ubuntu 安装gitlab
date: 2020-09-20
---

[官方文档](https://about.gitlab.com/install/#ubuntu)

## 安装gitlab

1. 安装和配置必要的依赖项
```sh
  sudo apt-get update
  sudo apt-get install -y curl openssh-server ca-certificates tzdata
```
接下来，安装Postfix 以发送通知电子邮件。如果要使用其他解决方案发送电子邮件，请跳过此步骤，并在安装GitLab之后[配置外部SMTP服务器](https://docs.gitlab.com/omnibus/settings/smtp.html)。

```sh
  sudo apt-get install -y postfix
```
在postfix 安装期间，可能会出现配置屏幕。选择“Internet站点”并按Enter键。使用服务器的外部DNS作为“邮件名称”，然后按Enter键。如果出现其他屏幕，请继续按Enter键接受默认值。

2. 添加GitLab包存储库并安装该软件包

* 添加GitLab包存储库。
```sh
  # 企业版
  curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ee/script.deb.sh | sudo bash
  # 社区
  curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.rpm.sh | sudo bash
```
接下来，安装GitLab包。确保已正确[设置DNS](https://docs.gitlab.com/omnibus/settings/dns.html)，然后更改`https://gitlab.example.com`到要访问GitLab实例的URL。安装程序将自动配置并启动该URL上的GitLab。

对于https://url，GitLab将自动请求一个带有Let's Encrypt的证书，该证书要求入站HTTP访问和有效的主机名。您也可以使用您自己的证书或仅使用http://。

```sh
  sudo EXTERNAL_URL="https://gitlab.example.com" apt-get install gitlab-ee
  sudo EXTERNAL_URL="http://gitlab.example.com" apt-get install gitlab-ee
  sudo EXTERNAL_URL="http://gitlab.example.com" dpkg -i gitlab-ee_11.4.6-ee.0_amd64.deb
```

（如果下载过程中访问超时出错，请用curl -sS https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.deb.sh | sudo bash，并直接跳入gitlab-ce安装）

**最后直接下载deb 文件 安装成功**
感谢您安装GitLab！
GitLab无法检测到实例的有效主机名。
请通过设置“external”URL为GitLab实例配置一个URL`
/etc/gitlab中的配置/gitlab.rb文件。
然后，您可以通过运行以下命令来启动GitLab实例：
sudo gitlab-ctl reconfigure

有关配置选项的全面列表，请参阅Omnibus GitLab自述文件
https://gitlab.com/gitlab-org/omnibus-gitlab/blob/master/README.md
```sh
It looks like GitLab has not been configured yet; skipping the upgrade script.

       *.                  *.
      ***                 ***
     *****               *****
    .******             *******
    ********            ********
   ,,,,,,,,,***********,,,,,,,,,
  ,,,,,,,,,,,*********,,,,,,,,,,,
  .,,,,,,,,,,,*******,,,,,,,,,,,,
      ,,,,,,,,,*****,,,,,,,,,.
         ,,,,,,,****,,,,,,
            .,,,***,,,,
                ,*,.
  


     _______ __  __          __
    / ____(_) /_/ /   ____ _/ /_
   / / __/ / __/ /   / __ `/ __ \
  / /_/ / / /_/ /___/ /_/ / /_/ /
  \____/_/\__/_____/\__,_/_.___/
  

Thank you for installing GitLab!
GitLab was unable to detect a valid hostname for your instance.
Please configure a URL for your GitLab instance by setting `external_url`
configuration in /etc/gitlab/gitlab.rb file.
Then, you can start your GitLab instance by running the following command:
  sudo gitlab-ctl reconfigure

For a comprehensive list of configuration options please see the Omnibus GitLab readme
```

3. 浏览主机名并登录

4. 设置您的通信首选项
5. 配置注册限制和登录首选项。
