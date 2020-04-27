console.log('js loaded');
let height = window.innerHeight;
let width = window.innerWidth;
let padding = 50;

let viz = d3.select('#viz-container')
.append('svg')
.attr('id','viz')
.attr('width',window.innerWidth)
.attr('height',window.innerHeight)
;



let rScale = d3.scaleLinear().range([height/3, height/2-padding]);
let angleScale = d3.scaleLinear().range([0, 2*Math.PI])

d3.json("data_file.json").then(function(incomingData){
  let months = incomingData.map(d=>d.time[5]+d.time[6]).filter(onlyUnique);
  console.log(months);
  let types = incomingData.map(d=>d.type).filter(onlyUnique);
  console.log(types);
  rScale.domain([0,5]);
  angleScale.domain([0,types.length])

  var arcData = [];
  for(let i = 0; i<types.length;i++){
    arcData[i] = {startAngle: angleScale(i), endAngle: angleScale(i+1)}
    console.log(arcData);
  }

  var arc = d3.arc()
      .innerRadius(function(){
        return rScale(0)
      })
      .outerRadius(function(){
        return rScale(5)
      })
      .startAngle(function(d){
        return d.startAngle
      })
      .endAngle(function(d){
        return d.endAngle
      });



  viz.selectAll('.arc').data(arcData).enter()
  .append("path")
      .attr("class", "arc")
      .attr('transform',function(d,i){
        return 'translate('+width/2+','+height/2+')'
      })
      .attr("d", arc)
      .attr('fill','transparent')
      .attr('stroke','grey')
      .attr('stroke-width',0.5)


  viz.selectAll(".circleAxis").data(months).enter()
    .append('circle')
    .attr('class','circleAxis')
    .attr('cx',width/2)
    .attr('cy',height/2)
    .attr('r', function(d, i){
      console.log(rScale(i));
      return(rScale(i))
    })
    .attr('fill','transparent')
    .style('pointer-events','none')
    .attr('stroke','grey')


})


viz.append('text')
  .text("What we've lost")
  .attr('x',width/2)
  .attr('y',height/2)
  .attr('font-size',100)
  .attr('class','title')
  .attr('font-family','Permanent Marker')
viz.append('text')
  .text("in Shanghai")
  .attr('x',width/2)
  .attr('y',height/2+height/10)
  .attr('font-size',100)
  .attr('class','title')
  .attr('font-family','Permanent Marker')

viz.append('circle')
  .attr('r',height/3)
  .attr('cx',width/2)
  .attr('cy',height/2)
  .attr('stroke','black')
  .attr('fill','transparent')
  .attr('stroke-width',2)
  .style('cursor','pointer')
  .on('click',function(){
    d3.selectAll('.title').remove();

    d3.select(this)
    .transition()
      .duration(2000)
      .attr('r',0)
      .style('cursor','default');

    rScale.range([height/10, height/2-padding])

    viz.selectAll(".circleAxis")
    .transition()
      .duration(2000)
      .attr('r', function(d, i){
        console.log(rScale(i));
        return(rScale(i))
      });

    arc = d3.arc()
      .innerRadius(function(){
        return rScale(0)
      })
      .outerRadius(function(){
        return rScale(5)
      })
      .startAngle(function(d){
        return d.startAngle
      })
      .endAngle(function(d){
        return d.endAngle
      });


    viz.selectAll('.arc')
      .transition()
        .duration(2000)
        .attr('transform',function(d,i){
          return 'translate('+width/2+','+height/2+')'
        })
        .attr("d", arc)
        .attr('fill','transparent')
        .attr('stroke','grey')
        .attr('stroke-width',0.5)



  //just a random circle to click. Will be replaced after.
  //When using transition and mouse event together, mouse event has to be put before transition.
    var circle = viz.append('circle')
      .style('cursor','pointer')
      .on('click',function(d){
        console.log('to map');
        window.open("./map.html", "_self");
      })
      .transition()
      .delay(2000)
      .attr('cx',width/4)
      .attr('cy',height/2)
      .attr('r',100)
      .attr('fill','transparent')
      .attr('stroke','black')

  })




  function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
  }
