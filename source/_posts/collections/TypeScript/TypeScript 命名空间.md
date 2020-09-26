---
title: TypeScript 命名空间
date: 2020-09-26
---

## 初始命名空间-Namespace

1. 没有命名空间时的问题
首先编写一个page.ts 用以说明:
```ts
  class Header {
    constructor() {
      const elem = document.createElement("div");
      elem.innerText = "This is Header";
      document.body.appendChild(elem);
    }
  }

  class Content {
    constructor() {
      const elem = document.createElement("div");
      elem.innerText = "This is Content";
      document.body.appendChild(elem);
    }
  }

  class Footer {
    constructor() {
      const elem = document.createElement("div");
      elem.innerText = "This is Footer";
      document.body.appendChild(elem);
    }
  }

  class Page {
    constructor() {
      new Header();
      new Content();
      new Footer();
    }
  }
```
在页面中通过`new Page();`，就可以看到对应效果。看起来没什么问题，实际上从编译后的page.js 中可以看出全部都是var 声明的全局变量。**过多的全局变量会让我们代码变得不可维护**

2. 命名空间的使用
`命名空间`这个语法，很类似编程中常说的模块化思想，比如`webpack`打包时，每个模块都有自己的环境，不会污染其它模块，不会有全局变量产生。

命名空间声明的关键词是namespace，比如声明一个`namespace Home`，需要暴露出去的类，可以使用`export`关键词，这样只有暴露出去的类是全局的，其它的不会再生出全局污染了，修改后代码如下：
```ts
  namespace Home {
    class Header {
      constructor() {
        const elem = document.createElement("div");
        elem.innerText = "This is Header";
        document.body.appendChild(elem);
      }
    }

    class Content {
      constructor() {
        const elem = document.createElement("div");
        elem.innerText = "This is Content";
        document.body.appendChild(elem);
      }
    }

    class Footer {
      constructor() {
        const elem = document.createElement("div");
        elem.innerText = "This is Footer";
        document.body.appendChild(elem);
      }
    }

    export class Page {
      constructor() {
        new Header();
        new Content();
        new Footer();
      }
    }
  }
```
这就是 TypeScript 给我们提供的类似模块化开发的语法，它的好处就是让全局变量减少了很多，实现了基本的封装，减少了全局变量的污染。

## 深入命名空间 Namespace

1. 用命名空间实现组件化
新建一个components.ts：
```ts
  namespace Components {
    export class Header {
      constructor() {
        const elem = document.createElement("div");
        elem.innerText = "This is Header";
        document.body.appendChild(elem);
      }
    }

    export class Content {
      constructor() {
        const elem = document.createElement("div");
        elem.innerText = "This is Content";
        document.body.appendChild(elem);
      }
    }

    export class Footer {
      constructor() {
        const elem = document.createElement("div");
        elem.innerText = "This is Footer";
        document.body.appendChild(elem);
      }
    }
  }
```
这里的每个类都进行了导出，然后就可以在page.ts 中使用这些组件：
```ts
  namespace Home {
    export class Page {
      constructor() {
        new Components.Header();
        new Components.Content();
        new Components.Footer();
      }
    }
  }
```
重新编译，引入component.js 即可正常显示效果

2. 多文件编译成一个文件

打开`tsconfig.json`文件，然后找到`outFile`配置项，这个就是用来生成一个文件的设置，如果设置了它，就不在支持`"module":"commonjs"`设置了，我们需要把它改成`"module":"amd"`

设置后重新编译，就不需要再引入component.js 了

3. 子命名空间

在命名空间内可以再写命名空间，比如在components.ts 下
```ts
  namespace Components {
    export namespace SubComponents {
      export class Test {}
    }

    //someting ...
  }
```
这个子命名空间为`Components.SubComponents.Test`
