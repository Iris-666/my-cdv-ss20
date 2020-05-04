console.log('js loaded');
let height = window.innerHeight;
let width = window.innerWidth;
let padding = 50;
let filteredTypes = [];
let backbt = document.getElementById('backbt');
let whichCircle;
let scrollingContent = document.getElementById('scrollingContent')
let hidingMap = document.getElementById('hidingMap')

console.log(width,height);

let viz = d3.select('#viz-container')
.append('svg')
.attr('id','viz')
.attr('width',window.innerWidth)
.attr('height',window.innerHeight)
;
let mapviz = d3.select('#map-container')
.append('svg')
.attr('id','mapviz')
.attr('width',width/1.5)
.attr('height',window.innerHeight)
;

mapviz.append('text')
.text('BACK')
.attr('x',padding)
.attr('y',padding*2)
.attr('font-size',30)
.attr('font-family','Permanent Marker')
.on('click',function(){
  // mapviz.style('opacity',0)
  mapviz.style('pointer-events','none')
  d3.select('#hidingMap')
    .style('display','none')

})
.attr('cursor','pointer')


let rAxisScale = d3.scaleLinear().range([height/3, height/2-padding]); //for the circle axis
let angleScale = d3.scaleLinear().range([0 + 22.5/(2*Math.PI), 2*Math.PI+ 22.5/(2*Math.PI)]); // for the line axis
let rCircleScale = d3.scaleLinear().range([5,50]) //for the radius of little circles
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
  console.log(typesAndTimes);
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
      return rAxisScale(-1)*Math.sin(angleScale(i))-width/19
    }
  })
  .attr('y',function(d,i){
    return rAxisScale(-1)*Math.cos(angleScale(i))
  })
  .attr('font-size',30)
  .attr('font-family','Permanent Marker')


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


viz.append('text')
.text("What we've lost")
.attr('x',width/2)
.attr('y',height/2)
.attr('font-size',70)
.attr('class','title')
.attr('font-family','Permanent Marker')
viz.append('text')
.text("in Shanghai")
.attr('x',width/2)
.attr('y',height/2+height/10)
.attr('font-size',70)
.attr('class','title')
.attr('font-family','Permanent Marker')

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


viz.append('circle')
.attr('r',height/3)
.attr('cx',width/2)
.attr('cy',height/2)
.attr('stroke','black')
.attr('fill','transparent')
.attr('stroke-width',1)
.style('cursor','pointer')
.on('click',function(){
  d3.selectAll('.title').remove();

  d3.select(this)
  .transition()
  .duration(2000)
  .attr('r',0)
  .style('cursor','default');

  rAxisScale.range([height/10, height/2-padding])

  viz.selectAll(".circleAxis")
  .transition()
  .duration(2000)
  .attr('r', function(d, i){
    console.log(rAxisScale(i));
    return(rAxisScale(i))
  });

  viz.selectAll('.textLine')
  .transition()
  .duration(2000)
  .attr('transform',function(d,i){
    console.log(rAxisScale(5));
    return 'translate('+width/2+','+height/2+')'
  })
  .attr('x1',0)
  .attr('y1',function(d,i){
    return -rAxisScale(0)
  })
  .attr('x2',0)
  .attr('y2',function(d,i){
    return -rAxisScale(5)
  })
  .attr('stroke','grey')
  .attr('stroke-width',0.5)

  viz.selectAll('.lineAxis')
  .transition()
  .duration(2000)
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

  viz.selectAll('.monthsText')
  .transition()
  .duration(2000)
  .attr('transform',function(d,i){
    return 'translate('+width/2+','+height/2+')'
  })
  .attr('x',-40)
  .attr('y',function(d, i){
    return(-rAxisScale(i))
  })



  rCircleScale.range([10,70]);
  //When using transition and mouse event together, mouse event has to be put before transition.
  viz.selectAll('.circles')
  .style('cursor','pointer')
  .on('click',function(d){
    console.log('to map');
    // window.open("./map.html", "_self");
    mapviz.style('opacity',1)
    mapviz.style('pointer-events','auto')
    whichCircle = d;
    d3.json("shanghai.json").then(function(geoData){
      d3.json('data_file.json').then(function(lostData){

        let months = lostData.map(d=>d.time[5]+d.time[6]).filter(onlyUnique);
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

        // console.log(typesAndTimes);

        // console.log(geoData);

        let projection = d3.geoEqualEarth()
        // .translate([width/1.3,height/2])
        .angle(-10)
        .fitExtent([[0,0], [width/1.3,height-padding]],geoData);

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

          console.log(d);
          if(d[0].type == "Cash" && d[0].time[6] == '4'){
            console.log('other');
            // d3.selectAll('.scrollingContent')
            //   .style('display','none')
            d3.select('#hidingMap')
              .style('display','block')

        mapviz.append('circle')
          .attr('cx',projection([121.190831, 31.342922])[0])
          .attr('cy',projection([121.190831, 31.342922])[1])
          .attr('r',0)
          .attr('fill',"#4A225D")
          .style('opacity','0.5')
          .attr('class','cashSpecialCircle')

          d3.select('.scrollingContent')
            .append('div')
            .attr('class','total')
            .append('text')
            .text('April 2020, Lost Cash in Shanghai')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',30)
            .attr('font-family','Pangolin')


            d3.select('.scrollingContent')
              .append('div')
              .attr('class','specialCash')
              .append('text')
              .text('At 1:30 PM on April 7, a black bag containing 80,000 yuan in cash appeared on hengxie road, according to surveillance video, the bag fell off the roof of the car.')
              .attr('x',500)
              .attr('y',height/2)
              .attr('font-size',30)
              .attr('font-family','Pangolin')



              enterView({
              	selector: '.specialCash',
              	enter: function(el) {
                  d3.select('.cashSpecialCircle')
                  .transition().duration(2000)
                    .attr('r',20)
              	},
              	exit: function(el) {
                  console.log('bye');
                  d3.select('.cashSpecialCircle')
                  .transition().duration(2000)
                  .attr('r',0)
              	},
              	progress: function(el, progress) {
                  console.log("the special element's progress is:", progress);
              	},
              	// offset: 0.5, // enter at middle of viewport
              	// once: true, // trigger just once
              });




          }
          let elementsForPage = mapviz.selectAll(".locations").data(d);
          let enteringElements = elementsForPage.enter();
          let exitingElements = elementsForPage.exit();

          exitingElements.remove()

          enteringElements
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
          .attr('class','locations')


        })
      })

      window.addEventListener("scroll",function(){
        var scroll = window.scrollY;
        // console.log(scroll);

        // mapviz.selectAll('.provinces')
        // .attr('transform',function(){
        //   return 'translate(0,'+scroll+')'
        // })
      })


    })


    // console.log(d);
  })
  .transition()
  .duration(2000)
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


})


function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
