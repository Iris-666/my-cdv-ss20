var map = new BMap.Map("container");
map.centerAndZoom("上海", 15);
map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用
map.enableContinuousZoom(); //启用地图惯性拖拽，默认禁用
map.addControl(new BMap.NavigationControl()); //添加默认缩放平移控件
map.addControl(new BMap.OverviewMapControl()); //添加默认缩略地图控件
map.addControl(new BMap.OverviewMapControl({
  isOpen: true,
  anchor: BMAP_ANCHOR_BOTTOM_RIGHT
})); //右下角，打开
var localSearch = new BMap.LocalSearch(map);
localSearch.enableAutoViewport(); //允许自动调节窗体大小
function searchByStationName() {
  map.clearOverlays(); //清空原来的标注
  var keyword = document.getElementById("text_").value;
  localSearch.setSearchCompleteCallback(function(searchResult) {
    var poi = searchResult.getPoi(0);
    document.getElementById("result_").value = poi.point.lng + "," + poi.point.lat;
    map.centerAndZoom(poi.point, 13);
    var marker = new BMap.Marker(new BMap.Point(poi.point.lng, poi.point.lat)); // 创建标注，为要查询的地方对应的经纬度
    map.addOverlay(marker);
    var content = document.getElementById("text_").value + "<br/><br/>Longitude: " + poi.point.lng + "<br/>Latitude: " + poi.point.lat;
    console.log(poi.point.lng);
    var infoWindow = new BMap.InfoWindow("<p style='font-size:14px;'>" + content + "</p>");
    marker.addEventListener("click", function() {
      this.openInfoWindow(infoWindow);
    });
    // marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
  });
  localSearch.search(keyword);
}
