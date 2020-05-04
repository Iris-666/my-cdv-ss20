console.log(' js loaded');
// let backbt = document.getElementById('backbt');
// let filteredTypes = [];
 map = document.getElementById('map')

// let mapviz = d3.select("#map-container").append("svg")
//     .style("width", width)
//     .style("height", height*2)
// ;


d3.json("shanghai.json").then(function(geoData){
  d3.json('data_file.json').then(function(lostData){

    let months = lostData.map(d=>d.time[5]+d.time[6]).filter(onlyUnique);
    console.log(months);
    let types = lostData.map(d=>d.type).filter(onlyUnique);
    for(let i = 0;i<types.length;i++){
      filteredTypes[i] = lostData.filter(function(d){ return d.type == types[i] })
    }

  let typesAndTimes = []; //the data are categorized by types and times
  let count = 0
    for(let a = 0;a<filteredTypes.length;a++){
      for(let b = 0; b< months.length;b++){
        typesAndTimes[count] = filteredTypes[a].filter(function(d){return d.time[5]+d.time[6] == months[b]})
        // console.log(typesAndTimes,count);
        count += 1
      }
    }

  console.log(typesAndTimes);

  // console.log(geoData);


  let projection = d3.geoEqualEarth()
    .translate([width/2,height/2])
    .angle(-10)
    .fitExtent([[padding,padding], [width-padding,height-padding]],geoData);

  let pathMaker = d3.geoPath(projection);


  mapviz.selectAll(".provinces").data(geoData.features).enter()
    .append("path")
      .attr("class", "provinces")
      .attr("d", pathMaker)
      .attr('fill','transparent')
      .attr("stroke", "#CAAD5F")
      .attr("stroke-width", 2)
      .attr('display','fixed')

d3.json('uniqueLonLat.json').then(function(uniqueLonLat){

console.log(whichCircle);
mapviz.selectAll('.locations').data(typesAndTimes[1]).enter()
  .append('circle')
  .attr('cx',function(d,i){
    // console.log(d.location);
    let correspondingDatapoint = uniqueLonLat.find(function(datapoint){
      // console.log(datapoint);
      if(datapoint.location == d.location){
        return true;
      }else{
        return false
      }
    })
    // console.log(correspondingDatapoint);
    // console.log(correspondingDatapoint.lonlat.split(','));
    lon = correspondingDatapoint.lonlat.split(',')[0];
    lat = correspondingDatapoint.lonlat.split(',')[1];
    return projection([lon, lat])[0]

  })
  .attr('cy',function(d,i){
    // console.log(d.location);
    let correspondingDatapoint = uniqueLonLat.find(function(datapoint){
      // console.log(datapoint);
      if(datapoint.location == d.location){
        return true;
      }else{
        return false
      }
    })
    // console.log(correspondingDatapoint);
    // console.log(correspondingDatapoint.lonlat.split(','));
    lon = correspondingDatapoint.lonlat.split(',')[0];
    lat = correspondingDatapoint.lonlat.split(',')[1];
    return projection([lon, lat])[1]
  })
  .attr('r',10)
  .attr('fill',"#AB3B3A")
  .style('opacity',0.5)
  .on('mouseover',function(d,i){
    console.log(d);
  })


})
})

window.addEventListener("scroll",function(){
    var scroll = window.scrollY;
    console.log(scroll);

    // mapviz.selectAll('.provinces')
    // .attr('transform',function(){
    //   return 'translate(0,'+scroll+')'
    // })
})

backbt.addEventListener('click',function(){
  // window.open("./mainpage.html", "_self");
  backbt.style('opacity',0)
  mapviz.style('opacity',0)
})

})


  function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
  }
