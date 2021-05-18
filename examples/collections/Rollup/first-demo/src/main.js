// src/main.js
import foo from './foo.js';
import { version, devDependencies } from '../package.json';

export default function () {
  console.log(foo);
  console.log('version::', version);
  // console.log('devDependencies::', devDependencies);// 未使用的 不会打包
}


