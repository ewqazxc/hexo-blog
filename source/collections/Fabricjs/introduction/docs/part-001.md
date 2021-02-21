---
title: fabricjs Part1-基本使用介绍
date: 2021-02-21 23:00:00
---

# [fabricjs Part1](http://fabricjs.com/fabric-intro-part-1)

## 一些通用属性

```ts
{
  fill: '#5E2300',//填充颜色
  stroke: '#5E2300',//笔触颜色
  strokeWidth: 2,//笔触宽度
  hasControls: false, //选中时是否可以放大缩小
  hasRotatingPoint: false,//选中时是否可以旋转
  hasBorders:false,//选中时是否有边框
  transparentCorners:true,
  perPixelTargetFind:true,//默认false。当设置为true，对象的检测会以像互点为基础，而不是以边界的盒模型为基础。
  selectable:true,//是否可被选中
  lockMovementX: true,//X轴是否可被移动(true为不可，因为前缀是lock)
  lockMovementY: true,//Y轴是否可被移动(true为不可，因为前缀是lock)
}
```

## 7 种基本形状

1. 矩形 fabric.Rect

```ts
const rect = new fabric.Rect({
  left: 50,
  top: 50,
  fill: "red",
  width: 20,
  height: 20,
  angle: 45, // 以原点(left, top) 为中心选转
});
canvas.add(rect);
```

2. 圆 fabric.Circle
   以原点(left + radius, top + radius) 为圆心

```ts
const circle = new fabric.Circle({
  radius: 20,
  fill: "green",
  left: 100,
  top: 50,
});
canvas.add(circle);
```

3. 三角形 fabric.Triangle
   默认宽高 100,黑色 等腰三角形

```ts
const triangle1 = new fabric.Triangle({
  width: 100,
  height: 30,
  fill: "blue",
  left: 150,
  top: 50,
});
```

4. 椭圆 fabric.Ellipse

```ts
const ellipse = new fabric.Ellipse({
  rx: 20,
  ry: 10,
  borderDashArray: [10],
  fill: "green",
  left: 200,
  top: 50,
});
canvas.add(ellipse);
```

5. 线 fabric.Line
   第一个参数为数组[x1, y1, x2, y2], left|top 会形成新的原点

```ts
const line = new fabric.Line([250, 50, 250, 100], {
  stroke: "red", //笔触颜色
  strokeWidth: 2, //笔触宽度
});
canvas.add(line);
const line2 = new fabric.Line([250, 50, 350, 50], {
  left: 10,
  top: 10,
  stroke: "red", //笔触颜色
  strokeWidth: 2, //笔触宽度
});
canvas.add(line2);
```

6. 多边形 fabric.Polygon

```ts
const polygon = new fabric.Polygon(
  [
    { x: 200, y: 0 },
    { x: 250, y: 50 },
    { x: 250, y: 100 },
    { x: 150, y: 100 },
    { x: 150, y: 50 },
  ],
  {
    left: 300,
    top: 50,
    angle: 0,
    fill: "green",
  }
);
canvas.add(polygon);
```

7. 折线 fabric.Polyline

- polygon 元素在连线的时候，会把所有的点都连接起来，包括第一个点和最后一个点。
- polyline 元素是不连接最后一个点和第一个点的。
  Polyline 在 fill 时，与 Polygon 相同

```ts
const polygon = new fabric.Polygon(
  [
    { x: 200, y: 0 },
    { x: 250, y: 50 },
    { x: 250, y: 100 },
    { x: 150, y: 100 },
    { x: 150, y: 50 },
  ],
  {
    left: 300,
    top: 50,
    angle: 0,
    fill: "green",
  }
);
canvas.add(polygon);
// 对比
const polygonLine = new fabric.Polygon(
  [
    { x: 200, y: 0 },
    { x: 250, y: 50 },
    { x: 250, y: 100 },
    { x: 150, y: 100 },
    { x: 150, y: 50 },
  ],
  {
    left: 300,
    top: 50,
    angle: 0,
    // fill: "green",
    fill: false,
  }
);
canvas.add(polygonLine);
```

## 操纵对象

1. set 通过`obj.set()`,修改对应属性，即可改变图形渲染

```ts
const canvas = new fabric.Canvas('c');
...
canvas.add(rect);

rect.set('fill', 'red');
rect.set({ strokeWidth: 5, stroke: 'rgba(100,200,200,0.5)' });
rect.set('angle', 15).set('flipY', true);
```

2. get 通过`obj.get()`,获取对应属性的值

```ts
const rect = new fabric.Rect(); // notice no options passed in

rect.get("width"); // 0
rect.get("height"); // 0

rect.get("left"); // 0
rect.get("top"); // 0

rect.get("fill"); // rgb(0,0,0)
rect.get("stroke"); // null

rect.get("opacity"); // 1
```

## canvas 画布

1. 所有图形对象都基于一个 canvas 画布对象
2. 通过`new fabric.StaticCanvas()`,生成静态画布

## 图像

1. html 中的图像
  * 非img图片资源 无效
```html
<canvas id="c"></canvas>
<img
  src="http://fabricjs.com/site_assets//svg-caching.png"
  id="my-image"
  hidden
/>
```

```ts
const canvas = new fabric.Canvas("c");
const imgElement = document.getElementById("my-image");
const imgInstance = new fabric.Image(imgElement, {
  left: 100,
  top: 100,
  angle: 30,
  opacity: 0.85,
});
canvas.add(imgInstance);
```

2. url 获取图像 `fabric.Image.fromURL`
 * 非图像资源 无效
 * gif动图，展示静态
```ts
fabric.Image.fromURL(
  "http://fabricjs.com/site_assets//svg-caching.png",
  function (oImg) {
    canvas.add(oImg);
  }
);
```

## path路径
  使用路径path 绘制各种形状
```ts
var canvas = new fabric.Canvas('c');
var path = new fabric.Path('M 0 0 L 200 100 L 170 200 z');
path.set({ left: 120, top: 120 });
canvas.add(path);
```

## toSVG xml出现EntityRef: expecting ';'错误
url中的条件分割符&应该写成&amp;
要不会出现EntityRef: expecting ';'错误
```ts
& --- &amp;
< --- &lt;
> --- &gt;
'  --- &apos;
" --- &quot;
```