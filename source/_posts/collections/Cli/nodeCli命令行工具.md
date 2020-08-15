---
title: 简单开发一个完整的命令行工具
date: 2020-08-15
---

## 创建项目
  
  1. 创建文件夹并生成`package.json`
  ```cmd
    mkdir nodeCli
    cd nodeCli
    npm init -y
  ```
  
  2. 安装相关依赖
  ```cmd
    npm install commander git-clone shelljs
  ```
  * commander 开发命令工具包
  * git-clone 克隆远程仓库
  * shelljs 调用系统命令

  3. 编写简单命令测试
  * 新建index.js 
  ```js
    #!/usr/bin/env node
    console.log('hello');
  ```
  * Package.json 添加命令
  ```json
    "bin": {
      "mycli": "./index.js"
    },
  ```
  * npm link 使`index.js`全局调用
  * 命令行运行 `mycli` ，输出`hello`

## 模拟项目创建、运行、预览的命令

  ```js
    #!/usr/bin/env node
    const program = require('commander');
    const shell = require('shelljs');
    const download = require('git-clone');

    program.version('1.0.0');
    program
      .command('new <name>')
      .description('创建项目')
      .action(name => {
        console.log(`创建项目${name}成功`);
      })

    program
      .command('run')
      .description('运行项目')
      .action(() => {
        console.log('成功运行项目')
      })

    program
      .command('start')
      .description('预览项目')
      .action(() => {
        console.log('预览项目...')
      })

    program.parse(process.argv);

  ```

  命令运行结果如下：
  ![命令运行测试](/hexo-blog/imgs/Cli/mycliTest.png)
  
## 完善项目创建、运行、预览的命令

  ```js
    #!/usr/bin/env node
    const program = require('commander');
    const shell = require('shelljs');
    const download = require('git-clone');

    const open = require('open'); // 打开预览地址
    const { spawn } = require('child_process');

    program.version('1.0.0');
    program
      .command('new <name>')
      .description('创建项目')
      .action(name => {
        let giturl = 'https://github.com/vuejs/vue-next-webpack-preview.git';
        download(giturl, `./${name}`, () => {
          shell.rm('-rf', `${name}/.git`);
          shell.cd(name);
          shell.exec('npm install');

          console.log(`
            创建项目${name}成功
            cd ${name} 进入项目
            mycli run 启动项目
            mycli start 预览项目
          `);
        })
      })

    program
      .command('run')
      .description('运行项目')
      .action(() => {
        // shell.exec('npm run dev')
        // let cp = spawn('npm', ['run', 'dev']); // Error: spawn npm ENOENT
        let cp = spawn('npm.cmd', ['run', 'dev']);
        cp.stdout.pipe(process.stdout);
        cp.stdout.pipe(process.stderr);
        cp.on('close', () => {
          console.log('成功运行项目');
        });
      })

    program
      .command('start')
      .description('预览项目')
      .action(() => {
        open('http://localhost:8080/')
        console.log('预览项目...')
      })

    program.parse(process.argv);

  ```

  * mycli new test | 建立test 项目
  * mycli run | 启动test 项目
  * mycli start | 打开项目预览

## 备注

  * Windows 下`spawn('npm', ['run', 'dev'])`命令报错，将`npm`改为`npm.cmd`
