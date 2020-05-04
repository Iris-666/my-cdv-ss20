var map = new BMap.Map("container");
let keywords = [];
let resultLon = [];
let resultLat = [];
let result = [];
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

// d3.json("data_file.json").then(function(incomingData){
  d3.json("lostDog.json").then(function(incomingData){

  // let locations = incomingData.map(d=>d.location).filter(onlyUnique);
  //
  // for(let i =0; i<locations.length; i++){
  //   console.log(locations[i]);
  //
  //   keywords[i] = locations[i]
  // }

  for(let i =0; i<incomingData.length; i++){
    console.log(incomingData[i].location);

    keywords[i] = incomingData[i].location
  }


})

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

console.log(keywords);
let i = 0;

function searchByStationName() {
  map.clearOverlays(); //清空原来的标注

for(let i = 0; i < keywords.length; i++){
  keyword = keywords[i]
  console.log(keyword);
  // var keyword = document.getElementById("text_").value;
  localSearch.setSearchCompleteCallback(function(searchResult) {
    var poi = searchResult.getPoi(0);
    p = poi.point.lng + "," + poi.point.lat;
    map.centerAndZoom(poi.point, 13);
    var marker = new BMap.Marker(new BMap.Point(poi.point.lng, poi.point.lat)); // 创建标注，为要查询的地方对应的经纬度
    map.addOverlay(marker);
    // var content = keyword + "<br/><br/>Longitude: " + poi.point.lng + "<br/>Latitude: " + poi.point.lat;
    resultLon[i] = poi.point.lng
    resultLat[i] = poi.point.lat

    console.log(p);

    // var infoWindow = new BMap.InfoWindow("<p style='font-size:14px;'>" + content + "</p>");
    // marker.addEventListener("click", function() {
    //   this.openInfoWindow(infoWindow);
    // });
  });
  localSearch.search(keyword);
}
// i++
}
