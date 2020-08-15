---
title: 基于Node.js 大文件分片上传
date: 2020-08-11
---

> 文件上传的时候，文件过大，可能导致请求超时的情况。这时可以对文件进行分片上传

##  创建项目
  1. 创建文件夹并生成`package.json`
  ```cmd
    mkdir fileUpload
    cd dileUpload
    npm init -y
  ```
  2. 安装相关依赖
  ```cmd
    npm install express multiparty body-parser fs-extra
  ```
  * express web模块
  * multiparty 上传模块
  * body-parser 处理post 请求模块
  * fs-extra 文件操作模块
  3. 新建静态资源目录public 上传临时目录temp
  ```cmd
    mkdir public
    mkdir temp
  ```
  4. 新建服务端文件 server.js 上传网页public/index.html

## 编写服务端代码 server.js
```js
  const express = require('express');
  const bodyParser = require('body-parser');
  const multiparty = require('multiparty');
  const fse = require('fs-extra');

  const app = express();

  app.use(express.static(__dirname + '/public'));

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.post('/upload', function (req, res) {
    const form = new multiparty.Form({ uploadDir: 'temp' });
    form.parse(req);
    form.on('file', () => {

      console.log('file?::');
    })

    res.send('文件上传成功');
  });

  app.listen(3000);
  console.log('listenning...3000...');
```
## 编写上传页面 public/index.html
```html
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>文件上传</title>
  </head>

  <body>
    <div>
      <input type="file" id="btnFile" />
      <input type="button" value="上传" onclick="upload()" />
      <script>
        let btnFile = document.querySelector('#btnFile');
        console.log('btnFile::', btnFile);
        function upload() {
          let file = btnFile.files[0];
          let formData = new FormData();
          formData.append('file', file);
          console.log('fetch::', fetch);
          fetch('/upload',{
            method: 'POST',
            body: formData
          }).then((res) => {
            console.log('res::', res);
          });
        }
      </script>
    </div>
  </body>

  </html>
```
此时，可以从页面上传文件至项目的temp 目录下

## 添加分片上传功能
```js
  const chunkSize = 1024 * 1024; // 每个分片大小
  function upload(index) {
    let file = btnFile.files[0];
    let [fileName, fileExt] = file.name.split('.');

    let start = index * chunkSize;
    if (start > file.size) { 
      return; // 结束文件上传
    }

    let blob = file.slice(start, start + chunkSize); // 截取分片数据

    let blobName = `${fileName}.${index}.${fileExt}`;
    let blobFile = new File([blob], blobName); // 转换分片文件
    console.log('blobName::', blobName);

    let formData = new FormData();
    formData.append('file', blobFile);
    console.log('fetch::', fetch);
    fetch('/upload', {
      method: 'POST',
      body: formData
    }).then((res) => {
      console.log('res::', res);
      if (res.ok) {
        upload(++index);
      }
    });
  }
```
## 添加分片合并功能
```js
  app.post('/merge', async function (req, res) {
    let name = req.body.name;
    let fname = name.split('.')[0];

    let chunkDir = path.join(UPLOAD_DIR, fname);
    let chunks = await fse.readdir(chunkDir);

    chunks.sort((a, b) => { a - b }).map(chunkPath => {
      // 合并文件
      fs.appendFileSync(
        path.join(UPLOAD_DIR, name),
        fs.readFileSync(`${chunkDir}/${chunkPath}`)
      )
    });

    fse.removeSync(chunkDir);
    res.send({ msg: '合并成功', url: `//localhost:3000/upload/${name}` }); // 返回文件所在目录地址 
  });
```
index.html 中
```js
  if (start > file.size) {
    merge(file.name);// 上传结束，并调用合并方法
    return;
  }
  function merge(name) {
    fetch('/merge', {
      method: 'POST',
      body: JSON.stringify({ name: name }), // data can be `string` or {object}!
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
  }
```
## 备注
  * 当chunkSize 过小时，合并后的视频文件进度调整会有异常 （4M 正常）
  * 代码：[github_nodeJs-file-slice-upload](https://github.com/ewqazxc/nodeJs-file-slice-upload)
