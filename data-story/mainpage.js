console.log('js loaded');
let height = window.innerHeight;
let width = window.innerWidth;
let padding = 50;
let filteredTypes = [];

let viz = d3.select('#viz-container')
.append('svg')
.attr('id','viz')
.attr('width',window.innerWidth)
.attr('height',window.innerHeight)
;



let rAxisScale = d3.scaleLinear().range([height/10, height/2-padding]); //for the circle axis
let angleScale = d3.scaleLinear().range([0 + 22.5/(2*Math.PI), 2*Math.PI+ 22.5/(2*Math.PI)]); // for the line axis
let rCircleScale = d3.scaleLinear().range([40,130]); //for the radius of little circles
let pallet = ["#F4A7B9","#AB3B3A","#ED784A","#D7B98E","#F9BF45","#B4A582","#B1B479","#B5CAA0","#516E41","#268785","#78C2C4","#7B90D2","#8A6BBE","#4A225D","#91989F"]

d3.json("data_file.json").then(function(incomingData){
  let months = incomingData.map(d=>d.time[5]+d.time[6]).filter(onlyUnique);
  // console.log(months);
  let types = incomingData.map(d=>d.type).filter(onlyUnique);
  // console.log(types);
  rAxisScale.domain([5,0]);
  angleScale.domain([0,types.length+1])

  for(let i = 0;i<types.length;i++){
    filteredTypes[i] = incomingData.filter(function(d){ return d.type == types[i] })
  }
  console.log(filteredTypes);

let typesAndTimes = []; //the data are categorized by types and times
let count = 0
  for(let a = 0;a<filteredTypes.length;a++){
    for(let b = 0; b< months.length;b++){
      typesAndTimes[count] = filteredTypes[a].filter(function(d){return d.time[5]+d.time[6] == months[b]})
      // console.log(typesAndTimes,count);
      count += 1
    }
  }
// console.log(typesAndTimes);
let typesNum = [];
  for(let i = 0;i<typesAndTimes.length;i++){
    typesNum[i] = typesAndTimes[i].length
  }
  console.log(typesNum);

  maximumType = d3.max(typesNum);
  minimunType = d3.min(typesNum);
  rCircleScale.domain([minimunType,maximumType])

  var arcData = [];
  for(let i = 0; i<types.length+1;i++){
    arcData[i] = {startAngle: angleScale(i), endAngle: angleScale(i+1)}
    // console.log(arcData);
  }

  viz.selectAll('.circles').data(typesAndTimes).enter()
    .append('circle')
    .attr('transform',function(d,i){
      return 'translate('+width/2+','+height/2+')'
    })
    .attr('cx',function(d, i){
      return Math.sin(angleScale(Math.floor(i/6)))*rAxisScale(i%6)
    })
    .attr('cy',function(d, i){
      return Math.cos(angleScale(Math.floor(i/6)))*rAxisScale(i%6)
    })
    .attr('r',function(d, i){
      return rCircleScale(d.length)
    })
    .attr('stroke','transparent')
    .style('opacity',0.5)
    .attr('fill',function(d, i){
      return pallet[Math.floor(i/6)]
    })
    .attr('class','circles')
    .on('click',function(d){
      console.log('d');
      window.open("./map.html", "_self");
    })
    .attr('cursor','pointer')

rAxisScale.range([height/3, height/2-padding]);

viz.selectAll('.typesText').data(types).enter()
  .append('text')
    .text(function(d, i){
      return d
    })
    .attr('transform',function(d,i){
      return 'translate('+width/2+','+height/2+')'
    })
    .attr('x',function(d,i){
      if(rAxisScale(-1)*Math.sin(angleScale(i))>0){
        return rAxisScale(-1)*Math.sin(angleScale(i))
      }
    else{
        return rAxisScale(-1)*Math.sin(angleScale(i))-width/25
      }
    })
    .attr('y',function(d,i){
      return rAxisScale(-1)*Math.cos(angleScale(i))
    })
    .attr('font-size',30)
    .attr('font-family','Permanent Marker')


rAxisScale.range([height/10, height/2-padding])

viz.selectAll('.lineAxis').data(types).enter()
  .append('line')
      .attr('transform',function(d,i){
        return 'translate('+width/2+','+height/2+')'
      })
    .attr('x1',function(d,i){
      return rAxisScale(0)*Math.sin(angleScale(i))
    })
    .attr('y1',function(d,i){
      return rAxisScale(0)*Math.cos(angleScale(i))
    })
    .attr('x2',function(d,i){
      return rAxisScale(5)*Math.sin(angleScale(i))
    })
    .attr('y2',function(d,i){
      return rAxisScale(5)*Math.cos(angleScale(i))
    })
    .attr('stroke','grey')
    .attr('stroke-width',0.5)
    .attr('class','lineAxis')



  let circleAxisGroup = viz.selectAll(".circleAxisGroup").data(months).enter()
  .append('g')
  .attr('class','circleAxisGroup')

    circleAxisGroup.append('circle')
    .attr('class','circleAxis')
    .attr('cx',width/2)
    .attr('cy',height/2)
    .attr('r', function(d, i){
      // console.log(rAxisScale(i));
      return(rAxisScale(i))
    })
    .attr('fill','transparent')
    .style('pointer-events','none')
    .attr('stroke','grey')

circleAxisGroup.append('text')
    .text(function(d, i){
      if(d == '04'){
        return 'Apr'
      }
      if(d == '03'){
        return 'Mar'
      }
      if(d == '02'){
        return 'Feb'
      }
      if(d == '01'){
        return 'Jan'
      }
      if(d == '12'){
        return 'Dec'
      }
      if(d == '11'){
        return 'Nov'
      }

    })
    .attr('transform',function(d,i){
      return 'translate('+width/2+','+height/2+')'
    })
    .attr('x',-40)
    .attr('y',function(d, i){
      return(-rAxisScale(i))
    })
    .attr('font-size',30)
    .attr('font-family','Permanent Marker')
    .attr('fill','grey')
    .attr('class','monthsText')


})


  viz.append('line')
  .attr('transform',function(){
    console.log(rAxisScale(1));
    return 'translate('+width/2+','+height/2+')'
  })
    .attr('x1',0)
    .attr('y1',-rAxisScale(0))
    .attr('x2',0)
    .attr('y2',-rAxisScale(1))
    .attr('stroke','grey')
    .attr('stroke-width',0.5)
    .attr('class','textLine')




  function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
  }
