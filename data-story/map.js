console.log(' js loaded');
let height = window.innerHeight;
let width = window.innerWidth;
let padding = 50;
let backbt = document.getElementById('backbt');
 map = document.getElementById('map')

let viz = d3.select("#viz-container").append("svg")
    .style("width", width)
    .style("height", height*2)
;


d3.json("shanghai.json").then(function(geoData){

  console.log(geoData);


  let projection = d3.geoEqualEarth()
    .translate([width/2,height/2])
    .angle(-10)
    .fitExtent([[padding,padding], [width-padding,height-padding]],geoData);

  let pathMaker = d3.geoPath(projection);

  viz.selectAll(".provinces").data(geoData.features).enter()
    .append("path")
      .attr("class", "provinces")
      .attr("d", pathMaker)
      .attr('fill','transparent')
      .attr("stroke", "#CAAD5F")
      .attr("stroke-width", 2)
      .attr('display','fixed')

})

window.addEventListener("scroll",function(){
    var scroll = window.scrollY;
    console.log(scroll);

    // viz.selectAll('.provinces')
    // .attr('transform',function(){
    //   return 'translate(0,'+scroll+')'
    // })
})

backbt.addEventListener('click',function(){
  window.open("./mainpage.html", "_self");

})
