---
title: fabricjs Part3-组合&序列化
date: 2021-02-21 23:03:00
---

# [fabricjs Part3](http://fabricjs.com/fabric-intro-part-3)

## Groups 组合

圆形+文字组合：

```ts
var circle = new fabric.Circle({
  radius: 100,
  fill: "#eef",
  scaleY: 0.5,
  originX: "center",
  originY: "center",
});

var text = new fabric.Text("hello world", {
  fontSize: 30,
  originX: "center",
  originY: "center",
});

var group = new fabric.Group([circle, text], {
  left: 150,
  top: 100,
  angle: -10,
});

canvas.add(group);
```

改变组合中的对象

```ts
group.item(0).set("fill", "red");
group.item(1).set({
  text: "trololo",
  fill: "white",
});
```

对象在组合中的定位，通过 originX/Y 设置,或者 top/left 定位

```ts
var circle1 = new fabric.Circle({
  radius: 50,
  fill: "red",
  left: 0,
});
var circle2 = new fabric.Circle({
  radius: 50,
  fill: "green",
  left: 100,
});
var circle3 = new fabric.Circle({
  radius: 50,
  fill: "blue",
  left: 200,
});

var group2 = new fabric.Group([circle1, circle2, circle3], {
  left: 100,
  top: 180,
});

canvas.add(group2);
```

进行图像组合 需要确保图像加载完成

```ts
      fabric.Image.fromURL("/assets/pug.jpg", function (img) {
        var img1 = img.scale(1).set({ left: 100, top: 100 });
        fabric.Image.fromURL("/assets/pug.jpg", function (img) {
          var img2 = img.scale(1).set({ left: 175, top: 175 });
          fabric.Image.fromURL("/assets/pug.jpg", function (img) {
            var img3 = img.scale(1).set({ left: 250, top: 250 });
            canvas.add(
              new fabric.Group([img1, img2, img3], { left: 200, top: 200 })
            );
          });
        });
```

## 序列化

1. JSON.stringify(canvas)
2. canvas.toSVG()
3. canvas.toDataURL('png')
4. JSON.stringify(canvas.toDatalessJSON())

## 通过 svg 加载

```ts
canvas.loadFromJSON(
  '{"objects":[{"type":"rect","left":50,"top":50,"width":20,"height":20,"fill":"green","overlayFill":null,"stroke":null,"strokeWidth":1,"strokeDashArray":null,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"selectable":true,"hasControls":true,"hasBorders":true,"hasRotatingPoint":false,"transparentCorners":true,"perPixelTargetFind":false,"rx":0,"ry":0},{"type":"circle","left":100,"top":100,"width":100,"height":100,"fill":"red","overlayFill":null,"stroke":null,"strokeWidth":1,"strokeDashArray":null,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"selectable":true,"hasControls":true,"hasBorders":true,"hasRotatingPoint":false,"transparentCorners":true,"perPixelTargetFind":false,"radius":50}],"background":"rgba(0, 0, 0, 0)"}'
);
```
