---
title: Hexo博客搭建记录
date: 2020-07-26 11:28:26
---

# --Hexo博客搭建，并使用GitHub Pages发布
## 1.安装hexo
    > npm install hexo -g

## 2.创建项目文件
### 使用以下hexo命令，生成所需文件
    > hexo init <floder>
    > cd <floder>
    > npm install
### 生成文件目录结构如下：
    .
    ├── _config.yml
    ├── package.json
    ├── scaffolds
    ├── source
    |   ├── _drafts
    |   └── _posts
    └── themes

## 3.配置
  `_config.yml` 中修改大部分的配置。

## 4.创建文章
    > hexo new [layout] <title>
  新建文章，如果没有指定`layout`，默认使用`——config.yml`中的`default_layout`,如果标题包含空格，需要使用引号括起来

    > hexo new '带有 空格 的标题'
  默认情况下，Hexo 会使用文章的标题来决定文章文件的路径。对于独立页面来说，Hexo 会创建一个以标题为名字的目录，并在目录中放置一个 `index.md` 文件。你可以使用 `--path` 参数来覆盖上述行为、自行决定文件的目录：

    > hexo new page --path about/me "About me"

  以上命令会创建一个 source/about/me.md 文件，同时 Front Matter 中的 title 为 "About me"
  注意！title 是必须指定的！如果你这么做并不能达到你的目的：

    > hexo new page --path about/me

  此时 Hexo 会创建 `source/_posts/about/me.md`，同时 `me.md` 的 Front Matter 中的 title 为 "page"。这是因为在上述命令中，hexo-cli 将 page 视为指定文章的标题、并采用默认的 layout。

## 5.生成静态文件
    > hexo generate
    > hexo g  // 简写
    > npm build  // script脚本定义

## 6.使用 github page发布
  1. 新建一个 repository。如果你希望你的站点能通过 <你的 GitHub 用户名>.github.io 域名访问，你的 repository 应该直接命名为 <你的 GitHub 用户名>.github.io。
  2. 将你的 Hexo 站点文件夹推送到 repository 中。默认情况下不应该 public 目录将不会被推送到 repository 中，你应该检查 .gitignore 文件中是否包含 public 一行，如果没有请加上。
  3. 将 [Travis CI](https://github.com/marketplace/travis-ci) 添加到你的 [GitHub](https://github.com/settings/profile)  账户中。
  4. 前往 GitHub 的 [Applications settings](https://github.com/settings/installations)，配置 Travis CI 权限，使其能够访问你的 repository。
  5. 你应该会被重定向到 Travis CI 的页面。如果没有，请 [手动前往](https://travis-ci.com/)。
  6. 在浏览器新建一个标签页，前往 [GitHub 新建 Personal Access Token](https://hexo.io/zh-cn/docs/github-pages)，只勾选 repo 的权限并生成一个新的 Token。Token 生成后请复制并保存好。
  7. 回到 Travis CI，前往你的 repository 的设置页面，在 **Environment Variables** 下新建一个环境变量，**Name** 为 `GH_TOKEN`，**Value** 为刚才你在 GitHub 生成的 `Token`。确保 **DISPLAY VALUE IN BUILD LOG** 保持 不被勾选 避免你的 Token 泄漏。点击 Add 保存。
  8. 在你的 Hexo 站点文件夹中新建一个 `.travis.yml` 文件：
  ```
  sudo: false
  language: node_js
  node_js:
    - 10 # use nodejs v10 LTS
  cache: npm
  branches:
    only:
      - master # build master branch only
  script:
    - hexo generate # generate static files
  deploy:
    provider: pages
    skip-cleanup: true
    github-token: $GH_TOKEN
    keep-history: true
    on:
      branch: master
    local-dir: public
  ```
  9. 将 `.travis.yml` 推送到 repository 中。Travis CI 应该会自动开始运行，并将生成的文件推送到同一 repository 下的 `gh-pages` 分支下
  10. 在 GitHub 中前往你的 repository 的设置页面，修改 GitHub Pages 的部署分支为 gh-pages。
  `当仓库名为<你的 GitHub 用户名>.github.io 时，只能使用master分支`
  11. 前往 https://<你的 GitHub 用户名>.github.io 查看你的站点是否可以访问。这可能需要一些时间。

  ![GitHub set up](http://zh.mweb.im/asset/img/set-up-git.gif)

