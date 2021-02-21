---
title: fabricjs Part4-自由绘图&定制化
date: 2021-02-21 23:04:00
---

# [fabricjs Part4](http://fabricjs.com/fabric-intro-part-4)

## 自由绘图

```ts
var canvas = new fabric.Canvas("c");
canvas.isDrawingMode = true;
```

In the near future, we are planning to add more options for free drawing — various versions of a brush (e.g. spray-like or chalk-like). Also custom brush patterns, and an option to extend with your own, similar to Fabric image filters...

## 定制化

1. Locking objects 锁定对象
   “lockMovementX”、“lockMovementY”、“lockRotation”、“lockScalingX”、“lockScalingY”是锁定相应对象操作的属性。因此，将 object.lockMovementX 设置为 true 可以防止对象水平移动。你仍然可以在垂直平面上移动它。同样，锁旋转可以防止旋转和锁刻度 X/锁标度 Y-缩放.所有这些都是累积的

2. 边框、角点

```ts
// rect.hasBorders = false; // 边框
// rect.hasControls = false;// 操控 不含移动
rect.set({
  transparentCorners: false, // 透明角？
  cornerColor: "blue", // 角点颜色
  cornerStrokeColor: "red", // 角点边框颜色
  borderColor: "red", // 边框颜色
  cornerSize: 30, // 角点大小
  padding: 5, // 边距
  cornerStyle: "circle", // 角点形状
  borderDashArray: [3, 3], // 边框线间距
});
```

3. 禁用选择

```ts
rect.set("selectable", false); // 禁用后不可操作
```

4. 定制选择

```ts
canvas.selectionColor = "rgba(0,255,0,0.3)";
canvas.selectionBorderColor = "aqua";
canvas.selectionLineWidth = 5;
canvas.selectionDashArray = [4, 2];
```

5. 背景、遮罩

```ts
canvas.backgroundColor = "rgba(0,0,255,0.3)";
canvas.setBackgroundImage("../assets/pug.jpg", canvas.renderAll.bind(canvas));
canvas.setBackgroundImage(
  new fabric.Circle({ radius: 30, fill: "#f55" }),
  canvas.renderAll.bind(canvas)
); // 可以传入任意  fabric对象

canvas.setOverlayImage(
  new fabric.Circle({ radius: 30, fill: "#f55", left: 100 }),
  canvas.renderAll.bind(canvas)
);
```
## Fabric on Node.js
。。。
