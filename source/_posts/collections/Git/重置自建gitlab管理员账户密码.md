---
title: 重置自建gitlab管理员账户密码
date: 2022-12-27 13:40
categories:
  - gitlab
---

## 重置密码

1. 重置 root 密码前，需先使用 root 用户登录到 gitlab 所在服务器，使用以下命令启动 Ruby on Rails 控制台

```
gitlab-rails console -e production
```

2. 等待控制台加载完毕，可使用邮件或用户名查找账号

```
user = User.where(id: 1).first
user = User.find_by(email: "admin@example.com")
user = User.find_by(username: "root")
```

3. 通过命令修改密码

```
user.password = 'new password'
user.password_confirmation = 'new password'
```

4. 确认两个密码一致后,保存更改

```
user.save
```

## 验证

使用新的密码登录 gitlab 页面
