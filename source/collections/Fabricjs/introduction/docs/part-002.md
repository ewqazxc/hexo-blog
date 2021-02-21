---
title: fabricjs Part2-动画&图像&事件
date: 2021-02-21 23:02:00
---

# [fabricjs Part2](http://fabricjs.com/fabric-intro-part-2)

## 动画

```ts
// 角度变为 40
rect.animate("angle", 45, {
  onChange: canvas.renderAll.bind(canvas),
});
// 左边距 +100
rect.animate("left", "+=100", { onChange: canvas.renderAll.bind(canvas) });
```

- 可选参数：
  - from: 起始值
  - duration: 动画时间，默认 500ms numebr
  - onComplete: 动画完成回调 function
  - easing: 过度效果 fabric.util.ease.easeOutBounce

## 图像过滤器

fabric.Image.filters['name']

```ts
// const imgUrl = "http://fabricjs.com/site_assets//svg-caching.png";
// 跨域的图片无法渲染
// Uncaught DOMException: Failed to execute 'texImage2D' on 'WebGLRenderingContext': The image element contains cross-origin data, and may not be loaded.
const imgUrl = "/avatar.jpg";
fabric.Image.fromURL(imgUrl function (oImg) {
  // oImg.set({ scale: .5 });
  oImg.scale(0.2).set("flipX", true);
  console.log("oImg::", oImg);
  oImg.filters.push(new fabric.Image.filters.Grayscale());// 灰色滤镜
  oImg.applyFilters();
  canvas.add(oImg);
});
```

## 颜色

- 定义颜色

```ts
new fabric.Color("#f55");
new fabric.Color("#123123");
new fabric.Color("356735");
new fabric.Color("rgb(100,0,100)");
new fabric.Color("rgba(10, 20, 30, 0.5)");
```

- 颜色转化

```ts
new fabric.Color("#f55").toRgb(); // "rgb(255,85,85)"
new fabric.Color("rgb(100,100,100)").toHex(); // "646464"
new fabric.Color("fff").toHex(); // "FFFFFF"
```

- 颜色合成

```ts
var redish = new fabric.Color("#f55");
var greenish = new fabric.Color("#5f5");

redish.overlayWith(greenish).toHex(); // "AAAA55"
redish.toGrayscale().toHex(); // "A1A1A1"
```

## Gradients 渐变

```ts
var circle = new fabric.Circle({
  left: 100,
  top: 100,
  radius: 50,
});

var gradient = new fabric.Gradient({
  type: "linear",
  gradientUnits: "pixels", // or 'percentage'
  coords: { x1: 0, y1: 0, x2: 0, y2: circle.height },
  colorStops: [
    { offset: 0, color: "#000" },
    { offset: 1, color: "#fff" },
  ],
});

circle.set("fill", gradient);
```

gradientUnits: "percentage", 百分比,coords 坐标 0-1

## Text 文字

```ts
var text = new fabric.Text("hello world", { left: 100, top: 100 });
canvas.add(text);
// fontFamily fontSize默认40
var comicSansText = new fabric.Text("I'm in Comic Sans", {
  fontFamily: "Comic Sans",
  fontSize: 20,
  fontWeight: "bold",
  underline: true,
  linethrough: true,
  overline: true,
  shadow: "green -5px -5px 3px",
  fontStyle: "italic",
  left: 200,
  top: 250,
});
```

## Event 事件

```ts
canvas.on("mouse:down", function (options) {
  console.log(options.e.clientX, options.e.clientY, options);
  if (options.target) {
    console.log("点击的对象::", options.target.type);
  }
});
```

1. 鼠标相关: "mouse:down", "mouse:move", and "mouse:up".
2. 渲染相关 "after:render".
3. 选择相关

- 离开选中状态前 "before:selection:cleared"
- 确定选中状态 "selection:created"
- 取消选中状态后"selection:cleared".

4. 对象相关

- 修改 "object:modified"
- 选中 "object:selected"

```ts
comicSansText.on("selected", function () {
  console.log("selected a comicSansText");
});
// canvas.on("object:selected",function(){}) 无效
```

- 移动 "object:moving"
- 缩放 "object:scaling"
- 旋转 "object:rotating"
- 新增 "object:added"
- 删除 "object:removed"

[更多操作事件Demo](http://fabricjs.com/events)