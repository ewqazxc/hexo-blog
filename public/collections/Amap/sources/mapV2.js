
console.log('window.onLoad ::')
const ampName = 'amap-content';
let map = null;
initMap();
// 异步加载
// var url = 'https://webapi.amap.com/maps?v=1.4.15&key=您申请的key值&callback=onLoad';
// var jsapi = doc.createElement('script');
// jsapi.charset = 'utf-8';
// jsapi.src = url;
// document.head.appendChild(jsapi);

function initMap() {
  // 简单创建一个地图只需要一行代码，构造参数中的container为准备阶段添加的地图容器的id：
  map = new AMap.Map(ampName);
  console.log('initMap::', map)
  // 创建的同时可以给地图设置中心点、级别、显示模式、自定义样式等属性：
  map = new AMap.Map(ampName, {
    zoom: 11,//级别
    center: [116.397428, 39.90923],//中心点坐标
    viewMode: '3D'//使用3D视图
  });
  /**
   * 图层
   */
  // 默认情况下，地图只显示标准底图，如需要叠加别的图层，可以通过map.add方法添加图层：
  //实时路况图层
  // var trafficLayer = new AMap.TileLayer.Traffic({
  //   zIndex: 10
  // });
  // map.add(trafficLayer);//添加图层到地图

  // 也可以在地图初始化的时候通过layers属性为地图设置多个图层：
  // var map = new AMap.Map('container', {
  //   center: [116.397428, 39.90923],
  //   layers: [//使用多个图层
  //     new AMap.TileLayer.Satellite(),
  //     new AMap.TileLayer.RoadNet()
  //   ],
  //   zooms: [4, 18],//设置地图级别范围
  //   zoom: 13
  // });

  /**
   * 点标记与矢量图形
   */
  // JS API 提供了在地图之上绘制覆盖物的能力，比如点标记 Marker、文本标记 Text、圆点标记 CircleMarker。
  // 添加点标记的方法非常简单，比如添加一个默认样式的Marker：
  var markerCenter = new AMap.Marker({
    position: [116.397428, 39.90923],//位置
    title: '天安门'
  })
  map.add(markerCenter);//添加到地图
  // 移除的方法如下：
  map.remove(markerCenter);

  // 创建一个 Marker 实例：
  var marker = new AMap.Marker({
    position: new AMap.LngLat(116.39, 39.9),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
    title: '北京'
  });
  // 将创建的点标记添加到已有的地图实例：
  map.add(marker);
  // 移除已创建的 marker
  map.remove(marker);
  // 也可以一次添加多个点标记到地图实例（其它覆盖物均可使用此方式）
  // map.add([marker, markerCenter]);

  // 自定义标记
  var markerStar = new AMap.Marker({
    position: new AMap.LngLat(116.39, 39.9),
    offset: new AMap.Pixel(-10, -10),
    icon: '//vdata.amap.com/icons/b18/1/2.png', // 添加 Icon 图标 URL
    title: '北京红星'
  });

  console.log('markerStar::', markerStar)
  map.add(markerStar);

  // 自定义icon
  // 创建 AMap.Icon 实例：
  var way_btn2 = new AMap.Icon({
    size: new AMap.Size(40, 50),    // 图标尺寸
    image: '//webapi.amap.com/theme/v1.3/images/newpc/way_btn2.png',  // Icon的图像
    imageOffset: new AMap.Pixel(0, -60),  // 图像相对展示区域的偏移量，适于雪碧图等
    // imageSize: new AMap.Size(40, 50)   // 根据所设置的大小拉伸或压缩图片
  });
  console.log('way_btn2::', way_btn2)

  // 将 Icon 实例添加到 marker 上:
  var markerIcon = new AMap.Marker({
    // position: new AMap.LngLat(116.405467, 39.907761),
    position: new AMap.LngLat(116.35, 39.89),
    icon: way_btn2, // 添加 Icon 实例
    offset: new AMap.Pixel(-10, -10),
    title: '天安门？？？？',
    // zoom: 13
  });
  console.log('markerIcon::', markerIcon)

  map.add(markerIcon);

  // // 创建一个 Icon
  var startIcon = new AMap.Icon({
    // 图标尺寸
    size: new AMap.Size(25, 34),
    // 图标的取图地址
    image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
    // 图标所用图片大小
    imageSize: new AMap.Size(135, 40),
    // 图标取图偏移量
    imageOffset: new AMap.Pixel(-9, -3)
  });

  markerIcon.setIcon(startIcon);

  var content = '<div style="background:red;">???</div>';
  var htmlMarker = new AMap.Marker({
    content: content,  // 自定义点标记覆盖物内容
    position: [116.397428, 39.90923], // 基点位置
    offset: new AMap.Pixel(-17, -42) // 相对于基点的偏移位置
  });
  map.add(htmlMarker);

  var gps = [116.3, 39.9];
  var test = '';
  AMap.convertFrom(gps, 'gps', function (status, result) {
    if (result.info === 'ok') {
      var lnglats = result.locations; // Array.<LngLat>
      console.log('lnglats::', lnglats)
      test = lnglats;
    }
  });
  console.log('test::', test)
  // 同时引入工具条插件，比例尺插件和鹰眼插件
  AMap.plugin([
    'AMap.ToolBar',
    'AMap.Scale',
    'AMap.HawkEye',
    'AMap.MapType',
    'AMap.Geolocation',
    'AMap.ControlBar',
    // 工具类
    'AMap.RangingTool',
    'AMap.MouseTool',
    'AMap.PolygonEditor',
    // 服务类
    'AMap.PlaceSearch',

  ], function () {
    // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
    map.addControl(new AMap.ToolBar({
      position: 'LT'
    }));

    // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
    map.addControl(new AMap.Scale());

    // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
    map.addControl(new AMap.HawkEye({
      isOpen: false,
      autoMove: true,
      mapStyle: 'amap://styles/light'
    }));

    // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
    // map.addControl(new AMap.MapType());

    // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
    map.addControl(new AMap.Geolocation());

    // 组合了旋转、倾斜、复位在内的地图控件。 
    // map.addControl(new AMap.ControlBar({
    //   position: { top: '10px', left: '100px' }
    // }));

    // 工具类
    let ruler = new AMap.RangingTool(map);
    console.log('ruler::', ruler)
    ruler.turnOn();
    ruler.turnOff();


    var mousetool = new AMap.MouseTool(map);
    // 使用鼠标工具，在地图上画标记点
    // mousetool.marker();

    var PolygonEditor = new AMap.PolygonEditor(map);
    // PolygonEditor.open();

    // var PlaceSearchOptions = { //设置PlaceSearch属性
    //   city: "北京", //城市
    //   type: "", //数据类别
    //   pageSize: 10, //每页结果数,默认10
    //   pageIndex: 1, //请求页码，默认1
    //   extensions: "base" //返回信息详略，默认为base（基本信息）
    // };
    // var MSearch = new AMap.PlaceSearch(PlaceSearchOptions); //构造PlaceSearch类
    // map.addListener(MSearch, "complete", function (res) {
    //   console.log('addListener::', res)
    // }); //返回结果
    // MSearch.search('方恒国际中心'); //关键字查询
  });
  map.plugin(['AMap.PlaceSearch'], function () {
    var PlaceSearchOptions = { //设置PlaceSearch属性
      city: "北京", //城市
      type: "", //数据类别
      pageSize: 100, //每页结果数,默认10
      pageIndex: 1, //请求页码，默认1
      extensions: "base" //返回信息详略，默认为base（基本信息）
    };
    var MSearch = new AMap.PlaceSearch(PlaceSearchOptions); //构造PlaceSearch类
    console.log('AMap.event::', AMap)
    AMap.Event.addListener(MSearch, "complete", function (res) {
      console.log('addListener::', res)
      let posArr = res.poiList.pois || [];
      const markerSearch = [];
      posArr.map((item) => {
        let pos = item.location.pos;
        let lat = item.location.lat;
        let lng = item.location.lng;
        markerSearch.push(
          new AMap.Marker({
            position: [lng, lat],   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: item.name || '?',
            icon: '//vdata.amap.com/icons/b18/1/2.png', // 添加 Icon 图标 URL
          })
        );
      })
      console.log('markerSearch::', markerSearch)
      map.add(markerSearch);
    }); //返回结果
    MSearch.search('国际中心'); //关键字查询
  });
}
