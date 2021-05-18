'use strict';

// src/foo.js
var foo = 'hello world!';

var version = "0.0.1";

// src/main.js

function main () {
  console.log(foo);
  console.log('version::', version);
  // console.log('devDependencies::', devDependencies);// 未使用的 不会打包
}

module.exports = main;
