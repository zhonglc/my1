function funMap(){
  var map=new BMap.Map("baidu-map");
  var point =new BMap.Point(116.404, 39.915);
  map.centerAndZoom(point, 18);
  //判断手机是否为手机端
  function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
      "SymbianOS", "Windows Phone",
      "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  }
  var flag = IsPC();
  function active_map(){
    if(flag==false){
      //手机访问调用H5定位新特性
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function (position) {
          //得到html5定位结果
          var x = position.coords.longitude;
          var y = position.coords.latitude;
          point =new BMap.Point(x, y);
          map.clearOverlays();
          circle();
          map.panTo(point);
          //创建缩略图控件，注意这个控件默认是在地图右下角，并且是缩着的
          map.addControl( new BMap.OverviewMapControl());
        })
      }else{
        alert('您的浏览器不支持定位');
      }
    }else if(flag==true){
      //如果是电脑访问就调用百度地图定义的定位函数
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
          point =new BMap.Point(r.point.lng,r.point.lat);
          map.clearOverlays();
          circle();
          map.panTo(r.point);
          //创建缩略图控件，注意这个控件默认是在地图右下角，并且是打开的
          map.addControl( new BMap.OverviewMapControl({isOpen:true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT}));
        }
      },{enableHighAccuracy: true})
    }}
  active_map()
  //创建平移缩放控件
  map.addControl(new BMap.NavigationControl());//添加到地图
  //创建地图尺
  map.addControl( new BMap.ScaleControl());//添加到地图
  //创建地图类型控件
  map.addControl( new BMap.MapTypeControl());
  //添加定位
  var geolocationControl = new BMap.GeolocationControl();
  geolocationControl.addEventListener("locationSuccess", function(e){
    active_map();
    map.setZoom(map.getZoom() + 3);
    var address = '';
    address += e.addressComponent.province;
    address += e.addressComponent.city;
    address += e.addressComponent.district;
    address += e.addressComponent.street;
    address += e.addressComponent.streetNumber;
    alert("当前定位地址为：" + address);
  });
  map.addControl(geolocationControl);
  //添加圆标注的函数
  function circle(){
    var circle = new BMap.Circle(point,150,{fillColor:"skyBlue", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
    map.addOverlay(circle);            //增加圆
    var marker = new BMap.Marker(point);  // 创建标注
    map.addOverlay(marker);
  }
  circle();
  //鼠标滚轮缩放
  map.enableScrollWheelZoom();
  // 自定义一个控件类，即function
  function ZoomControl(){
    // 设置默认停靠位置和偏移量
    this.defaultAnchor = BMAP_ANCHOR_BOTTOM_LEFT;
    this.defaultOffset = new BMap.Size(50, 50);
  }
// 通过JavaScript的prototype属性继承于BMap.Control
  ZoomControl.prototype = new BMap.Control();
  // 自定义控件必须实现initialize方法，并且将控件的DOM元素返回
// 在本方法中创建个div元素作为控件的容器，并将其添加到地图容器中
  ZoomControl.prototype.initialize = function(map){
// 创建一个DOM元素
    var ul = document.createElement("ul");
    $(ul).html("<li><a data-index='1' href="+'#'+">美食</a></li><li><a  data-index='2' href="+'#'+">停车</a></li><li><a  data-index='3' href="+'#'+">酒店</a></li><li><a class='nav-map'  style='display:none' href="+'#'+">线路</a></li>");
    $(ul).addClass('map-ul');
    var p1=null;
    map.addEventListener("click",function(e){
      p1=new BMap.Point(e.point.lng ,e.point.lat);
      $('.nav-map').css('display','block');
    });
    // 绑定事件
    $(ul).on('click','a',function(e){
      e.preventDefault();
      var local=null;
      if($(this).attr('data-index')==='1'){
        map.clearOverlays();
        circle();
        $('.nav-map').css('display','none');
        map.centerAndZoom(point, 15);
        local = new BMap.LocalSearch(map,
          { renderOptions:{map: map, autoViewport:false,selectFirstResult: false},
            pageCapacity:5
          });
        local.searchNearby(["小吃","快餐","大排档","饭馆","餐厅","咖啡厅"],point,800);
      }
      else if($(this).attr('data-index')==='2'){
        map.clearOverlays();
        circle();
        $('.nav-map').css('display','none');
        map.centerAndZoom(point, 15);
        local = new BMap.LocalSearch(map,
          { renderOptions:{map: map, autoViewport:false,selectFirstResult: false}});
        local.searchNearby("停车场",point,800);
      }else if($(this).attr('data-index')==='3'){
        map.clearOverlays();
        circle();
        $('.nav-map').css('display','none');
        map.centerAndZoom(point, 15);
        local = new BMap.LocalSearch(map,
          { renderOptions:{map: map, autoViewport:false,selectFirstResult: false}});
        local.searchNearby("住宿",point,800);
      }else{
        map.clearOverlays();
        circle();
        var driving = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});
        driving.search(point,p1);
      }
    })

    // 添加DOM元素到地图中
    map.getContainer().appendChild(ul);
    // 将DOM元素返回
    return ul;
  }
  // 创建控件实例
  var myZoomCtrl = new ZoomControl();

// 添加到地图当中
  map.addControl(myZoomCtrl);
}
