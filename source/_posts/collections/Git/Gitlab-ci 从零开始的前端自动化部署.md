---
title: Gitlab-ci 从零开始的前端自动化部署
date: 2020-09-12
---

## [查看原文](https://zhuanlan.zhihu.com/p/184936276)

## 一 概念介绍
1.1 gitlab-ci && 自动化部署工具的运行机制
以gitlab-ci 为例：
  1. 通过在项目根目录下配置.gitlab-ci.yml 文件，可以控制ci流程的不同阶段，例如install/检查/编译/部署服务器.gitlab 平台会扫描.gitlab-ci.yml 文件，并根据此处理ci 流程
  2. ci 流程在每次团队成员push/merge 后触发。每当你push/merge 一次，gitlab-ci 都会检查项目下有没有.gitlab-ci.yml 文件，如果有，它会执行你在里面编写的脚本，并完整地走一遍从install -> eslint 检查 -> 编译 -> 部署服务器 的流程
  3. gitlab-ci 提供了指定ci 运行平台的机制，它提供了一个叫gitlab-runner 的软件，只要在对应的平台（机器或者docker）上下载并运行这个命令行软件，并输入从gitlab 交互界面获取的token，就可以把当前机器和对应的gitlab-ci 流程绑定，也即：每次跑ci 都在这个平台上进行
  4. .gitlab-ci 的所有流程都是可视化的，每个流程节点的状态都可以在gitlab 的交互界面上看到，包括执行成功或失败。因为它的执行看上去就和多节管道一样，所以通常用"pipeLine" 来称呼它
  5. 不同push/merge 所触发的CI 流程不会互相影响，也就是说，你的一次push 引发的CI 流程并不会因为接下来另一位同事的push 而阻断，它们是互不影响的。这一特点方便让测试同学根据不同版本进行测试
  6. pipeline 不仅能被动触发，也是可以手动触发的

1.2 自动化部署给我们带来的好处
  1. 提高前端的开发效率和开发测试之间的协调效率
  * Before：如果按照传统的流程，在项目上线前的测试阶段，前端修复bug 之后，要手动把代码部署之后，才能通知测试在测试环境进行测试；这会造成几个问题，本身手动部署服务的工作时比较繁琐的，占用了开发时间，同时开发-测试之间的环节的偶尔问题，则会增加团队沟通成本
  * After：通过gitlab-ci，前端在提交代码后就不用管了，ci 流程会自动部署到测试或集成环境的服务器，大幅度节约了开发的时间；同时，因为开发和测试可以共用gitlab 里的pipeline 界面，测试同学能够随时把握代码部署的情况，同时还可以通过交互界面手动启动pipeline，自己去部署测试，从而节约和开发之间的沟通时间
  
  2. 从更细的粒度把握代码质量
  * 我们可以把eslint 或其它的代码检查加到pipeline 流程中，每当团队成员提交和合并一次，pipeline 都会触发一次并对代码做一次全面检测，这样就从一个更细的粒度上控制代码质量了

## 二 知识预备

* gitlab-ci 涉及的抽象概念
* YML 文件的基本语法规则
* 。gitlab-ci.yml 配置的特定关键字

2.1 gitlab-ci 涉及的抽象概念
  1. pipeline & job
  * pipeline：是gitlab 根据项目的.gitlab-ci.yml 文件执行的流程，它由许多个任务节点组成，而这些pipeline 上的每一个任务节点，都是一个独立的job
  * 每个job 都会配置一个stage 属性，来表示这个job 所处的阶段
  * 一个pipeline 有若干个stage 每个stage 上至少有一个job

  2. runner 可以理解为：在特定机器上根据项目的.gitlab-ci.yml 文件，对项目执行pipeline 的程序。
  * shared runner：gitlab 平台提供的免费使用的runner 程序，它由Google 云平台提供支持，每个开发团队有十几个。对于公共开源项目是免费使用的，如果是私人项目则有每月2000分钟的CI 时间上限
  * specific runner：自定义的，在自己选择的机器上运行的runner 程序，gitlab 给我们提供了一个叫[gitlab-runner](https://docs.gitlab.com/runner/install/) 的命令行软件，只要在对应机器上下载安装这个软件，并且运行gitlab-runner register 命令，然后输入从gitlab-ci 交互界面获取的token 进行注册，就可以在自己的机器上远程运行pipeline 程序
  * shared 和 specific 的区别
    1. shared runner是所有项目都可以使用的，而specific runner 只能针对特定项目运行
    2. shared runner默认基于docker 运行，没有提起装配的执行pipeline 的环境，例如node 等。而specific runner 可以自由选择平台，可以是各种类型的机器，如Linux/Windows 等，并在上面装配必须的运行环境，当然也可以选择Docker/K8s 等
    3.私人项目使用shared runner 受运行时间的限制，而specific runner 的使用则是完全自由的
  
  3. executor：specific runner是在我们自己选择的平台上执行的，这个平台就是我们现在所说的"executor"，我们在特定机器上通过gitlab-runner 这个命令行软件注册runner 的时候，命令行就会提示我们输入相应的[平台类型](https://docs.gitlab.com/runner/executors/#selecting-the-executor)，可供选择的平台一共有如下几种，
  ![平台类型](/hexo-blog/imgs/Git/executor.png)

2.2 YML 文件的基本语法规则

CI 流程的运行控制，决定于项目根目录下编写的配置文件——.gitlab-ci.yml，正因为如此，我们需要掌握YML 的基本语法规则。

YML 是一种编写哦诶之文件的语言，比JSON 更为简洁和方便，因此，我们首先要掌握的就是YML 文件的编写语法

一份简单的YML 文件如下：
```yml
  install-job: # 注释
    tags:
      - sss
    stage: install
    script:
      - npm install
```
从这里我们就可以看出：
* YML 通过缩进组织层级
* YML 允许通过#符号编写注释

在基本结构上，YML 和JSON 也类似
* JSON/YML 都是由对象，数组，以及对象和数组的嵌套结构组成的

**YML 中数组的写法**
```yml
  colors
    - red
    - blue
    - yellow
  # = { "colors": ["red", "blue", "yellow"]}
```
**YML 中对象的写法**
```yml
  people:
    name: zhangsan
    age: 14
  # { "people": { "name": "zhangsan", "age": 14 }}
```
**数组和对象之间形成的嵌套结构**
```yml
  a:
    b:
      - d
    c: e
  # { "a": { "b": ["d"], "c": "e" }}
```
**从JSON到YML之间的过度学习的注意要点**
* 不需要"{}"去区分层级边界，而是使用缩进
* 注释符号 #
* 如果不涉及特殊符号比如"["，一般是不需要给YML 中的字符串加双引号或者单引号的（加了也行）

2.3 gitlab-ci.yml 配置的特定关键字

在了解了YML 文件的语法格式后，接下来需要了解的就是gitlab-ci 独特的配置关键字，这些关键字将在.gitlab-ci.yml 中使用，并用来控制一个pipeline 具体的运作过程

常用的有：stages stage script tags

**stages & stage**
* stages 定义在YML 文件的最外层，它的值是一个数组，用于定义一个pipeline 不同的流程节点
```yml
  stages: # 分段
    - install
    - eslint
    - build
    - deploy
```
则在Gitlab交互界面中能够看到如下展示：
![stages](/hexo-blog/imgs/Git/stages.jpg)

上面提到过：job 是pipeline 的任务节点，它构成了pipeline 的基本单元

而stage/script/tags 这三个关键字，都是作为job 的紫属性来使用的，如下所示，install 就是我们定义的一个job
```yml
  install:
    tags:
      - sss
    stage: install
    script:
      - npm install
```

**stage** 是一个字符串，且是stages 数组的一个子项，表示的是当前的pipeline 节点

当前stage 的执行情况能在交互面板上看得清清楚楚：
* 蓝色 正在执行
* 灰色 尚未执行
* 绿色 执行成功
* 红色 执行失败

**script** 是当前pipeline 节点运行的shell 脚本（以项目根目录为上下文执行）

这个script 使我们控制CI 流程的核心，我们所有的工作，从安装，编译到部署都是通过script 中定义的shell 脚本来完成的

如果脚本执行成功，pipeline 就会进入下一个job 节点，如果执行失败那么pipeline 就会终止

**tags** 是当前job 的标记

这个tags 关键字是很重要的，因为gitlab 的runner 会通过tags 去判断能否执行当前这个job

例如我们在gitlab 的面板中能看到当前激活的runner 的信息
```md
  Gitlab 项目首页 -> setting -> CI/CD -> Runners
```
![Runner 中的tags](/hexo-blog/imgs/Git/runner中的tags.jpg)

上面的这个sss 就是当前Runner 的tags，这意味着：这个runner 只会执行tag 为sss 的job。如果一个job 没有tag 或者tag 不是sss，那么及时这个runner 是激活且空闲的，也不会去执行

## 三 gitlab-ci 实战

3.1 编写一个gitlab-ci 的"Helllo world"

1. 在平台上下载并安装Gitlab-runner 命令行 https://docs.gitlab.com/runner/install/
* Win10
  1. 创建一个文件夹放置下载的 gitlab-runner.exe 文件
  2. 以管理员运行以下命令
  ```sh
    .\gitlab-runner.exe install
    .\gitlab-runner.exe start
    # 输出Runtime platform 则成功
  ```
* Mac
  1. 下载工具
  ```sh
    sudo curl --output /usr/local/bin/gitlab-runner https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-darwin-amd64
    sudo chmod +x /usr/local/bin/gitlab-runner
  ```
  2. 初始化gitlab-runner
  ```sh
    gitlab-runner install
    gitlab-runner start
    # 输出Runtime platform 则成功
  ```
  3. 注册runner [参考资料](https://link.zhihu.com/?target=https%3A//docs.gitlab.com/runner/register/index.html)

  ```sh
    sudo gitlab-runner register
  ```
  然后写入相应的token，url和tag等相关信息就注册完毕了
  ![注册runner](/hexo-blog/imgs/Git/注册runner.jpg)
  上面要求输入的Runner 绑定的token 和url，获取方式如下：
  ```md
    Gitlab 项目首页 -> setting -> CI/CD -> Runners -> Specific Runners
  ```
  新版的直接找Runners 也有
  ![Specific Runners](/hexo-blog/imgs/Git/SpecificRunners.jpg)

  4. 激活Runner

  注册完了可能还需要激活，这时我们可以看下面板，如果有个黑色的感叹号，说明runner 注册成功了，但是尚未激活（绿色为已激活，可跳过本步骤）

  激活方法是本地运行
  ```sh
    sudo gitlab-runner verify
    # Verifying runner ... is alive
  ```
  这时候会去看Gitlab 面板是否激活了Runner

  5. 梳理和规划pipeline 的不同阶段和过程

  在编写.gitlab-ci.yml 前，首先需要考虑的是我们的pipeline 分几个阶段处理

  从前端工程师的角度出发，一个前端项目的pipeline 处理包括以下几个阶段
  * 1. install 阶段 就是执行npm install 命令，根据package.json 安装node_modules 依赖包
  * 2. eslint 阶段 执行eslint 检查，判断代码格式是否符合规范，如果不符合则pipeline 终止
  * 3. build 阶段 编译生成生产代码
  * 4. deploy 阶段 部署阶段，也就是把build 阶段生成的生产代码，部署到生产访问的服务器上

    这里又具体有以下两部分工作
    A. 申请服务器 & 安装web服务
    B. 部署资源 每次pipeline 都进行
    类似`sshpass -p $PASSWORD scp -r ./build $CUSTOM_USERNAME@$CUSTOM_IP:/var/www/html`

  7. 编写.gitlab-ci.yml 配置文件
  ```yml
    stages: # 分段
      - install
      - eslint
      - build
      - deploy
    
    cache: # 缓存
      paths:
        - node_modules
        - build
    install-job:
      tags:
        - sss
      stage: install
      script: npm install
    
    eslint-job:
      tags:
        - sss
      stage: eslint
      script: 
        - npm run eslint
    
    build-job:
      tags:
        - sss
      stage: build
      script:
        - npm run build
    
    deploy-job:
      tags:
        - sss
      stage: deploy
      script:
        - sshpass -p $PASSWORD scp -r ./build $CUSTOM_UNSERNAME@$CUSTOM_IP:/var/www/html
  ```
  **package.json**
  ```json
    {
      ...
      "script": {
        "start": "... start",
        "biuld": "... build",
        "eslint": "eslint ./src"
      }
    }
  ```

  8. 提交项目代码

  commit 然后push，在gitlab 面板中查看runner 运行情况，完成后回到页面查看效果
