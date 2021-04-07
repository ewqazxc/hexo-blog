---
title: fabricjs Part5-缩放&拖拽
date: 2021-02-21 23:04:00
---

# [fabricjs Part5](http://fabricjs.com/fabric-intro-part-5)

## 缩放
1. 让我们看看如何通过鼠标交互来实现缩放和PAN的基本系统。我们将使用鼠标轮放大到20倍(2000%)的画布和一个ALT+点击行动来拖动。我们开始连接基本控件：
```ts
canvas.on('mouse:wheel', function(opt) {
  var delta = opt.e.deltaY;
  var zoom = canvas.getZoom();
  zoom *= 0.999 ** delta;
  if (zoom > 20) zoom = 20;
  if (zoom < 0.01) zoom = 0.01;
  canvas.setZoom(zoom);
  opt.e.preventDefault();
  opt.e.stopPropagation();
})
```
2. 按住alt键+鼠标点击拖拽示例:
```ts
canvas.on('mouse:down', function (opt) {
  var evt = opt.e;
  if (evt.altKey === true) {
    this.isDragging = true;
    this.selection = false;
    this.lastPosX = evt.clientX;
    this.lastPosY = evt.clientY;
  }
});
canvas.on('mouse:move', function (opt) {
  if (this.isDragging) {
    var e = opt.e;
    var vpt = this.viewportTransform;
    vpt[4] += e.clientX - this.lastPosX;
    vpt[5] += e.clientY - this.lastPosY;
    this.requestRenderAll();
    this.lastPosX = e.clientX;
    this.lastPosY = e.clientY;
  }
});
canvas.on('mouse:up', function (opt) {
  // on mouse up we want to recalculate new interaction
  // for all objects, so we call setViewportTransform
  this.setViewportTransform(this.viewportTransform);
  this.isDragging = false;
  this.selection = true;
});
```
3. 使轮子缩放使画布中心围绕光标所在的点
```ts
canvas.on("mouse:wheel", function (opt) {
  var delta = opt.e.deltaY;
  var zoom = canvas.getZoom();
  zoom *= 0.999 ** delta;
  if (zoom > 20) zoom = 20;
  if (zoom < 0.01) zoom = 0.01;
  console.log('zoom::', zoom);
  // canvas.setZoom(zoom);// 原点 缩放
  canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);// x,y 点 缩放
});
```
4. 限制平移区域
- 首先，绘制一个矩形背景作为限制区域
```ts
var bg = new fabric.Rect({
  width: 400,
  height: 600,
  stroke: 'black',
  strokeWidth: 2,
  fill: '',
  evented: false,
  selectable: false
});
bg.fill = new fabric.Pattern({ source: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAASElEQVQ4y2NkYGD4z0A6+M3AwMBKrGJWBgYGZiibEQ0zIInDaCaoelYyHYcX/GeitomjBo4aOGrgQBj4b7RwGFwGsjAwMDAAAD2/BjgezgsZAAAAAElFTkSuQmCC' },
  function () { bg.dirty = true; canvas.requestRenderAll() });
// bg.canvas = canvas;
canvas.backgroundImage = bg;
```
- 然后，在滚落缩放和移动事件中，对移动时的范围进行判断
```ts
  canvas.on("mouse:wheel", function (opt) {
    var delta = opt.e.deltaY;
    var zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    console.log('zoom::', zoom);
    // canvas.setZoom(zoom);// 原点 缩放
    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);// x,y 点 缩放

    opt.e.preventDefault();
    opt.e.stopPropagation();
    var vpt = this.viewportTransform;
    if (zoom < 400 / 1000) {
      vpt[4] = 250 - 1000 * zoom / 2;
      vpt[5] = 250 - 1000 * zoom / 2;
    } else {
      if (vpt[4] >= 0) {
        vpt[4] = 0;
      } else if (vpt[4] < canvas.getWidth() - 1000 * zoom) {
        vpt[4] = canvas.getWidth() - 1000 * zoom;
      }
      if (vpt[5] >= 0) {
        vpt[5] = 0;
      } else if (vpt[5] < canvas.getHeight() - 1000 * zoom) {
        vpt[5] = canvas.getHeight() - 1000 * zoom;
      }
    }
  });
  canvas.on('mouse:move', function (opt) {
      if (this.isDragging) {
        var e = opt.e;
        var vpt = this.viewportTransform;
        // vpt[4] += e.clientX - this.lastPosX;
        // vpt[5] += e.clientY - this.lastPosY;
        console.log('vpt::', vpt);
        var zoom = canvas.getZoom();
        if (zoom < 0.4) {
          vpt[4] = 250 - 1000 * zoom / 2;
          vpt[5] = 250 - 1000 * zoom / 2;
          // vpt[4] += e.clientX - this.lastPosX;
          // vpt[5] += e.clientY - this.lastPosY;
        } else {
          vpt[4] += e.clientX - this.lastPosX;
          vpt[5] += e.clientY - this.lastPosY;
          if (vpt[4] >= 0) {
            vpt[4] = 0;
          } else if (vpt[4] < canvas.getWidth() - 1000 * zoom) {
            vpt[4] = canvas.getWidth() - 1000 * zoom;
          }
          if (vpt[5] >= 0) {
            vpt[5] = 0;
          } else if (vpt[5] < canvas.getHeight() - 1000 * zoom) {
            vpt[5] = canvas.getHeight() - 1000 * zoom;
          }
        }
        this.requestRenderAll();
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
      }
    });
```