console.log('js loaded');
let height = window.innerHeight;
let width = window.innerWidth;
let padding = 50;
let filteredTypes = [];
let filteredMonths = [];

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
  d3.select('.scrollingContent').html('')
  d3.select('.cashSpecialLocation').remove();
})
.attr('cursor','pointer')


let rAxisScale = d3.scaleLinear().range([height/3, height/2-padding]); //for the circle axis
let angleScale = d3.scaleLinear().range([0 + 22.5/(2*Math.PI), 2*Math.PI+ 22.5/(2*Math.PI)]); // for the line axis
let rCircleScale = d3.scaleLinear().range([2,40]) //for the radius of little circles
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
    if(rAxisScale(-1)*Math.cos(angleScale(i))>=0 && rAxisScale(-1)*Math.sin(angleScale(i))<=0){
      return rAxisScale(-1)*Math.cos(angleScale(i))+height/29
    }else{
      return rAxisScale(-1)*Math.cos(angleScale(i))

    }

  })
  .attr('font-size',20)
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
  .attr('font-size',20)
  .attr('font-family','Permanent Marker')
  .attr('fill','grey')
  .attr('class','monthsText')

})


viz.append('text')
.text("What we've lost")
.attr('x',width/2)
.attr('y',height/2)
.attr('font-size',50)
.attr('class','title')
.attr('font-family','Permanent Marker')
viz.append('text')
.text("in Shanghai")
.attr('x',width/2)
.attr('y',height/2+height/10)
.attr('font-size',50)
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
    // console.log(rAxisScale(i));
    return(rAxisScale(i))
  });

  viz.selectAll('.textLine')
  .transition()
  .duration(2000)
  .attr('transform',function(d,i){
    // console.log(rAxisScale(5));
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

  viz.selectAll('.monthsText')
  .style('cursor','pointer')
  .on('click',function(d){
    mapviz.style('opacity',1)
    mapviz.style('pointer-events','auto')
console.log(d);
d3.json("shanghai.json").then(function(geoData){
  d3.json('data_file.json').then(function(lostData){
    let months = lostData.map(d=>d.time[5]+d.time[6]).filter(onlyUnique);
    let types = lostData.map(d=>d.type).filter(onlyUnique);
    for(let i = 0;i<months.length;i++){
      filteredMonths[i] = lostData.filter(function(d){ return d.time[5]+d.time[6] == months[i] })
    }

    console.log(filteredMonths);

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


      d3.select('#hidingMap')
      .style('display','block')

      var thisMonthData

      for(let i=0;i<filteredMonths.length;i++){
        if(filteredMonths[i][0].time[5]+filteredMonths[i][0].time[6] == d){
          thisMonthData = filteredMonths[i]
        }
      }

console.log(thisMonthData);

function assignKeys(d){
  return d.number
}

      let elementsForPage = mapviz.selectAll(".locations").data(thisMonthData,assignKeys);
      let enteringElements = elementsForPage.enter();
      let exitingElements = elementsForPage.exit();

      exitingElements.remove()

      enteringElements
      .append('circle')
      .attr('cx',function(d,i){
        // console.log(d.location);
        let correspondingDatapoint = uniqueLonLat.find(function(datapoint){
          // console.log(d);
          if(datapoint.location == d.location){
            return true;
          }else{
            return false
          }
        })

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

      d3.select('.scrollingContent')
      .append('div')
      .attr('class','totalElse')
      .append('text')
      .text(function(){
        console.log(d);
        if(d == '04'){
          m = 'Apr'
          year = '2020'
        }
        if(d == '03'){
          m = 'Mar'
          year = '2020'
        }
        if(d == '02'){
          m = 'Feb'
          year = '2020'
        }
        if(d == '01'){
          m = 'Jan'
          year = '2020'
        }
        if(d == '12'){
          m = 'Dec'
          year = '2019'
        }
        if(d == '11'){
          m = 'Nov'
          year = '2019'
        }

        return m+' '+year+', lost items in Shanghai'

      })
      .attr('x',500)
      .attr('y',height/2)
      .attr('font-size',20)
      .attr('font-family','Pangolin')



})

})
})
  })



  rCircleScale.range([5,60]);
  //When using transition and mouse event together, mouse event has to be put before transition.
  viz.selectAll('.circles')
  .style('cursor','pointer')
  .on('click',function(d){
    console.log('to map');
    // window.open("./map.html", "_self");
    mapviz.style('opacity',1)
    mapviz.style('pointer-events','auto')
    whichCircle = d;
    console.log(whichCircle);

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
            d3.select('#hidingMap')
            .style('display','block')


            mapviz.append('path')
            .attr('d',"M0.61,0C-11.74-7.95-17.85-19.52-15-28.04c0.4-1.18,2.65-7.79,9.25-10.09c3.84-1.34,8.98-1.18,12.72,1.68 c3.31,2.52,4.2,6.13,4.63,7.85C14.76-15.81,2.6-2.18,0.61,0z")
            .attr('transform',function(){
              return 'translate('+projection([121.190831, 31.342922])[0]+','+projection([121.190831, 31.342922])[1]+') scale('+0+')'
            })
            .attr('fill',"#4A225D")
            .style('opacity','0.5')
            .attr('class','cashSpecialLocation')


            d3.select('.scrollingContent')
            .append('div')
            .attr('class','total')
            .append('text')
            .text('April 2020, Lost Cash in Shanghai')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',20)
            .attr('font-family','Pangolin')


            d3.select('.scrollingContent')
            .append('div')
            .attr('class','specialCashApril1')
            .append('text')
            .text('At 1:30 PM on April 7th, a black bag containing eight thousand kuai in cash appeared on hengxie road, according to surveillance video, the bag fell off the roof of the car.')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',30)
            .attr('font-family','Pangolin')

            d3.select('.scrollingContent')
            .append('div')
            .attr('class','specialCashApril2')
            .append('text')
            .text('On April 24th, Mr Xie reported to the police that he found ten thousand kuai in his shop. After checking the surveillance camera, the police found out the owner of the money, who is an old lady and this money is her pension of the past four months.')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',30)
            .attr('font-family','Pangolin')

            enterView({
              selector: '.specialCashApril1',
              enter: function(el) {
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.190831, 31.342922])[0]+','+projection([121.190831, 31.342922])[1]+') scale('+1+')'
                })
              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.190831, 31.342922])[0]+','+projection([121.190831, 31.342922])[1]+') scale('+0+')'
                })
              },
              progress: function(el, progress) {
                console.log("the special element's progress is:", progress);
              },
              // offset: 0.5, // enter at middle of viewport
              // once: true, // trigger just once
            });

            enterView({
              selector: '.specialCashApril2',
              enter: function(el) {
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.428455,31.255167])[0]+','+projection([121.428455,31.255167])[1]+') scale('+1+')'
                })
              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.190831, 31.342922])[0]+','+projection([121.190831, 31.342922])[1]+') scale('+1+')'
                })
              },
              progress: function(el, progress) {
                console.log("the special element's progress is:", progress);
              },
              // offset: 0.5, // enter at middle of viewport
              // once: true, // trigger just once
            });



          }
          else if(d[0].type == "Watches and Glasses" && d[0].time[5] == '0'&&d[0].time[6] == '2'){
            d3.select('#hidingMap')
            .style('display','block')


            mapviz.append('path')
            .attr('d',"M0.61,0C-11.74-7.95-17.85-19.52-15-28.04c0.4-1.18,2.65-7.79,9.25-10.09c3.84-1.34,8.98-1.18,12.72,1.68 c3.31,2.52,4.2,6.13,4.63,7.85C14.76-15.81,2.6-2.18,0.61,0z")
            .attr('transform',function(){
              return 'translate('+projection([121.423231,30.926323])[0]+','+projection([121.423231,30.926323])[1]+') scale('+0+')'
            })
            .attr('fill',"#4A225D")
            .style('opacity','0.5')
            .attr('class','cashSpecialLocation')


            d3.select('.scrollingContent')
            .append('div')
            .attr('class','total')
            .append('text')
            .text('February 2020, Lost Watches and Glasses in Shanghai')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',20)
            .attr('font-family','Pangolin')


            d3.select('.scrollingContent')
            .append('div')
            .attr('class','specialWatchFeb1')
            .append('text')
            .text('Someone found a watch worth four hundred thousand kuai and handed it to the police. After checking the surveillance camera, the police found the owner. The owner believed the rumors and drank liquor to prevent the corona virus. However, he got drunk and lost his watch later.')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',30)
            .attr('font-family','Pangolin')

            d3.select('.scrollingContent')
            .append('div')
            .attr('class','specialWatchFeb2')
            .append('text')
            .text('Wash your hands frequently and wear a mask are the only way to prevent corona virus!')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',30)
            .attr('font-family','Pangolin')


            enterView({
              selector: '.specialWatchFeb1',
              enter: function(el) {
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.423231,30.926323])[0]+','+projection([121.423231,30.926323])[1]+') scale('+1+')'
                })
              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.423231,30.926323])[0]+','+projection([121.423231,30.926323])[1]+') scale('+0+')'
                })
              },
              progress: function(el, progress) {
                console.log("the special element's progress is:", progress);
              },
              // offset: 0.5, // enter at middle of viewport
              // once: true, // trigger just once
            });

          }
          else if(d[0].type == "Jewellery" && d[0].time[5] == '0'&&d[0].time[6] == '1'){
            d3.select('#hidingMap')
            .style('display','block')


            mapviz.append('path')
            .attr('d',"M0.61,0C-11.74-7.95-17.85-19.52-15-28.04c0.4-1.18,2.65-7.79,9.25-10.09c3.84-1.34,8.98-1.18,12.72,1.68 c3.31,2.52,4.2,6.13,4.63,7.85C14.76-15.81,2.6-2.18,0.61,0z")
            .attr('transform',function(){
              return 'translate('+projection([121.672063,31.148267])[0]+','+projection([121.672063,31.148267])[1]+') scale('+0+')'
            })
            .attr('fill',"#4A225D")
            .style('opacity','0.5')
            .attr('class','cashSpecialLocation')


            d3.select('.scrollingContent')
            .append('div')
            .attr('class','total')
            .append('text')
            .text('January 2020, Lost Jewellery in Shanghai')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',20)
            .attr('font-family','Pangolin')


            d3.select('.scrollingContent')
            .append('div')
            .attr('class','specialJewJan')
            .append('text')
            .text('Most Jewellery were lost in Shanghai Disneyland Park. That make sense since people always dress up prettily when going to Disneyland =D')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',30)
            .attr('font-family','Pangolin')


            enterView({
              selector: '.specialJewJan',
              enter: function(el) {
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.672063,31.148267])[0]+','+projection([121.672063,31.148267])[1]+') scale('+1+')'
                })
              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.672063,31.148267])[0]+','+projection([121.672063,31.148267])[1]+') scale('+0+')'
                })
              },
              progress: function(el, progress) {
                console.log("the special element's progress is:", progress);
              },
              // offset: 0.5, // enter at middle of viewport
              // once: true, // trigger just once
            });

          }
          else if(d[0].type == "Watches and Glasses" && d[0].time[5] == '0'&&d[0].time[6] == '1'){
            d3.select('#hidingMap')
            .style('display','block')


            mapviz.append('path')
            .attr('d',"M0.61,0C-11.74-7.95-17.85-19.52-15-28.04c0.4-1.18,2.65-7.79,9.25-10.09c3.84-1.34,8.98-1.18,12.72,1.68 c3.31,2.52,4.2,6.13,4.63,7.85C14.76-15.81,2.6-2.18,0.61,0z")
            .attr('transform',function(){
              return 'translate('+projection([121.672063,31.148267])[0]+','+projection([121.672063,31.148267])[1]+') scale('+0+')'
            })
            .attr('fill',"#4A225D")
            .style('opacity','0.5')
            .attr('class','cashSpecialLocation')


            d3.select('.scrollingContent')
            .append('div')
            .attr('class','total')
            .append('text')
            .text('January 2020, Lost Watches and Glasses in Shanghai')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',20)
            .attr('font-family','Pangolin')


            d3.select('.scrollingContent')
            .append('div')
            .attr('class','specialWatchJan')
            .append('text')
            .text('People lost lots of watches and glasses in Shanghai Disneyland Park.')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',30)
            .attr('font-family','Pangolin')


            enterView({
              selector: '.specialWatchJan',
              enter: function(el) {
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.672063,31.148267])[0]+','+projection([121.672063,31.148267])[1]+') scale('+1+')'
                })
              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.672063,31.148267])[0]+','+projection([121.672063,31.148267])[1]+') scale('+0+')'
                })
              },
              progress: function(el, progress) {
                console.log("the special element's progress is:", progress);
              },
              // offset: 0.5, // enter at middle of viewport
              // once: true, // trigger just once
            });

          }
          else if(d[0].type == "Watches and Glasses" && d[0].time[5] == '1'&&d[0].time[6] == '1'){
            d3.select('#hidingMap')
            .style('display','block')


            mapviz.append('path')
            .attr('d',"M0.61,0C-11.74-7.95-17.85-19.52-15-28.04c0.4-1.18,2.65-7.79,9.25-10.09c3.84-1.34,8.98-1.18,12.72,1.68 c3.31,2.52,4.2,6.13,4.63,7.85C14.76-15.81,2.6-2.18,0.61,0z")
            .attr('transform',function(){
              return 'translate('+projection([121.672063,31.148267])[0]+','+projection([121.672063,31.148267])[1]+') scale('+0+')'
            })
            .attr('fill',"#4A225D")
            .style('opacity','0.5')
            .attr('class','cashSpecialLocation')


            d3.select('.scrollingContent')
            .append('div')
            .attr('class','total')
            .append('text')
            .text('November 2019, Lost Watches and Glasses in Shanghai')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',20)
            .attr('font-family','Pangolin')


            d3.select('.scrollingContent')
            .append('div')
            .attr('class','specialWatchNov')
            .append('text')
            .text('People lost lots of watches and glasses in Shanghai Disneyland Park.')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',30)
            .attr('font-family','Pangolin')


            enterView({
              selector: '.specialWatchNov',
              enter: function(el) {
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.672063,31.148267])[0]+','+projection([121.672063,31.148267])[1]+') scale('+1+')'
                })
              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.672063,31.148267])[0]+','+projection([121.672063,31.148267])[1]+') scale('+0+')'
                })
              },
              progress: function(el, progress) {
                console.log("the special element's progress is:", progress);
              },
              // offset: 0.5, // enter at middle of viewport
              // once: true, // trigger just once
            });

          }
          else if(d[0].type == "Other" && d[0].time[5] == '0'&&d[0].time[6] == '3'){
            d3.select('#hidingMap')
            .style('display','block')
console.log(d);

            mapviz.append('path')
            .attr('d',"M0.61,0C-11.74-7.95-17.85-19.52-15-28.04c0.4-1.18,2.65-7.79,9.25-10.09c3.84-1.34,8.98-1.18,12.72,1.68 c3.31,2.52,4.2,6.13,4.63,7.85C14.76-15.81,2.6-2.18,0.61,0z")
            .attr('transform',function(){
              return 'translate('+projection([121.26268,31.046542])[0]+','+projection([121.26268,31.046542])[1]+') scale('+0+')'
            })
            .attr('fill',"#4A225D")
            .style('opacity','0.5')
            .attr('class','cashSpecialLocation')

            d3.select('.scrollingContent')
            .append('div')
            .attr('class','total')
            .append('text')
            .text('March 2020, Lost Other in Shanghai')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',20)
            .attr('font-family','Pangolin')


            d3.select('.scrollingContent')
            .append('div')
            .attr('class','specialOtherMar')
            .append('text')
            .text("On March 31th, the police found a washing machine by the side of Jiazhu road. ")
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',30)
            .attr('font-family','Pangolin')

            enterView({
              selector: '.specialOtherMar',
              enter: function(el) {
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.26268,31.046542])[0]+','+projection([121.26268,31.046542])[1]+') scale('+1+')'
                })
              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.26268,31.046542])[0]+','+projection([121.26268,31.046542])[1]+') scale('+0+')'
                })
              },
              progress: function(el, progress) {
                console.log("the special element's progress is:", progress);
              },
            });


          }

          else if(d[0].type == "Other" && d[0].time[5] == '0'&&d[0].time[6] == '1'){
            d3.select('#hidingMap')
            .style('display','block')


            mapviz.append('path')
            .attr('d',"M0.61,0C-11.74-7.95-17.85-19.52-15-28.04c0.4-1.18,2.65-7.79,9.25-10.09c3.84-1.34,8.98-1.18,12.72,1.68 c3.31,2.52,4.2,6.13,4.63,7.85C14.76-15.81,2.6-2.18,0.61,0z")
            .attr('transform',function(){
              return 'translate('+projection([121.43281,31.164925])[0]+','+projection([121.43281,31.164925])[1]+') scale('+0+')'
            })
            .attr('fill',"#4A225D")
            .style('opacity','0.5')
            .attr('class','cashSpecialLocation')

            d3.select('.scrollingContent')
            .append('div')
            .attr('class','total')
            .append('text')
            .text('January 2020, Lost Other in Shanghai')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',20)
            .attr('font-family','Pangolin')

            d3.select('.scrollingContent')
            .append('div')
            .attr('class','specialOtherJan')
            .append('text')
            .text("Someone lost an UAV(unmanned aerial vehicle) =(")
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',30)
            .attr('font-family','Pangolin')

            d3.select('.scrollingContent')
            .append('div')
            .attr('class','specialOtherJan2')
            .append('text')
            .text("On January 6th, a delivery guy Mr. Li found that the battery of his electric bicycle as well as the food for delivery disappeared. The police's investigation revealed that it was another delivery guy stole the battery and food since his own battery was not working. ")
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',30)
            .attr('font-family','Pangolin')

            enterView({
              selector: '.specialOtherJan',
              enter: function(el) {
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.43281,31.164925])[0]+','+projection([121.43281,31.164925])[1]+') scale('+1+')'
                })
              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.43281,31.164925])[0]+','+projection([121.43281,31.164925])[1]+') scale('+0+')'
                })
              },
              progress: function(el, progress) {
                console.log("the special element's progress is:", progress);
              },
            });

            enterView({
              selector: '.specialOtherJan2',
              enter: function(el) {
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.43807,31.224154])[0]+','+projection([121.43807,31.224154])[1]+') scale('+1+')'
                })
              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.43281,31.164925])[0]+','+projection([121.43281,31.164925])[1]+') scale('+1+')'
                })
              },
              progress: function(el, progress) {
                console.log("the special element's progress is:", progress);
              },
            });


          }
          else if(d[0].type == "Other" && d[0].time[5] == '1'&&d[0].time[6] == '2'){
            d3.select('#hidingMap')
            .style('display','block')


            mapviz.append('path')
            .attr('d',"M0.61,0C-11.74-7.95-17.85-19.52-15-28.04c0.4-1.18,2.65-7.79,9.25-10.09c3.84-1.34,8.98-1.18,12.72,1.68 c3.31,2.52,4.2,6.13,4.63,7.85C14.76-15.81,2.6-2.18,0.61,0z")
            .attr('transform',function(){
              return 'translate('+projection([121.425511,31.227831])[0]+','+projection([121.425511,31.227831])[1]+') scale('+0+')'
            })
            .attr('fill',"#4A225D")
            .style('opacity','0.5')
            .attr('class','cashSpecialLocation')

            d3.select('.scrollingContent')
            .append('div')
            .attr('class','total')
            .append('text')
            .text('December 2019, Lost Other in Shanghai')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',20)
            .attr('font-family','Pangolin')


            d3.select('.scrollingContent')
            .append('div')
            .attr('class','specialOtherDec')
            .append('text')
            .text("Someone lost an UAV(unmanned aerial vehicle) at Zhongshan Park on December 5th.")
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',30)
            .attr('font-family','Pangolin')

            enterView({
              selector: '.specialOtherDec',
              enter: function(el) {
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.425511,31.227831])[0]+','+projection([121.425511,31.227831])[1]+') scale('+1+')'
                })
              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.425511,31.227831])[0]+','+projection([121.425511,31.227831])[1]+') scale('+0+')'
                })
              },
              progress: function(el, progress) {
                console.log("the special element's progress is:", progress);
              },
            });


          }

          else if(d[0].type == "Other" && d[0].time[5] == '1'&&d[0].time[6] == '1'){
            d3.select('#hidingMap')
            .style('display','block')


            mapviz.append('path')
            .attr('d',"M0.61,0C-11.74-7.95-17.85-19.52-15-28.04c0.4-1.18,2.65-7.79,9.25-10.09c3.84-1.34,8.98-1.18,12.72,1.68 c3.31,2.52,4.2,6.13,4.63,7.85C14.76-15.81,2.6-2.18,0.61,0z")
            .attr('transform',function(){
              return 'translate('+projection([121.223728,31.440852])[0]+','+projection([121.223728,31.440852])[1]+') scale('+0+')'
            })
            .attr('fill',"#4A225D")
            .style('opacity','0.5')
            .attr('class','cashSpecialLocation')

            d3.select('.scrollingContent')
            .append('div')
            .attr('class','total')
            .append('text')
            .text('November 2019, Lost Other in Shanghai')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',20)
            .attr('font-family','Pangolin')


            d3.select('.scrollingContent')
            .append('div')
            .attr('class','specialOtherNov')
            .append('text')
            .text("On November 1st, the Jiading police station received a report that there were twelve large white geese walking along the roadside. Finally, the police found the owner of these geese, who is a seventy-seven years old man, who was anxiously searching for them")
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',30)
            .attr('font-family','Pangolin')

            enterView({
              selector: '.specialOtherNov',
              enter: function(el) {
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.223728,31.440852])[0]+','+projection([121.223728,31.440852])[1]+') scale('+1+')'
                })
              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.223728,31.440852])[0]+','+projection([121.223728,31.440852])[1]+') scale('+0+')'
                })
              },
              progress: function(el, progress) {
                console.log("the special element's progress is:", progress);
              },
            });


          }

          else if(d[0].type == "Books" && d[0].time[5] == '0'&&d[0].time[6] == '4'){
            d3.select('#hidingMap')
            .style('display','block')

            console.log(d);
            d3.select('.scrollingContent')
            .append('div')
            .attr('class','total')
            .append('text')
            .text('April 2020, Lost Books in Shanghai')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',20)
            .attr('font-family','Pangolin')

            mapviz.append('path')
            .attr('d',"M0.61,0C-11.74-7.95-17.85-19.52-15-28.04c0.4-1.18,2.65-7.79,9.25-10.09c3.84-1.34,8.98-1.18,12.72,1.68 c3.31,2.52,4.2,6.13,4.63,7.85C14.76-15.81,2.6-2.18,0.61,0z")
            .attr('transform',function(){
              return 'translate('+projection([121.430502,31.213614])[0]+','+projection([121.430502,31.213614])[1]+') scale('+0+')'
            })
            .attr('fill',"#4A225D")
            .style('opacity','0.5')
            .attr('class','cashSpecialLocation')

            var scrollingViz = d3.select(".scrollingContent")

            scrollingViz.selectAll('.specialBookApr').data(d).enter()
            .append('div')
            .attr('class',function(d, i){
              console.log(i);
              return 'specialBookApr' + i
            })
            .append('text')
            .text(function(d){
              // console.log(d);
              return d.name;
            })
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',30)
            .attr('font-family','Pangolin')

            enterView({
              selector: '.specialBookApr0',
              enter: function(el) {
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.430502,31.213614])[0]+','+projection([121.430502,31.213614])[1]+') scale('+1+')'
                })
              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.43807,31.224154])[0]+','+projection([121.43807,31.224154])[1]+') scale('+0+')'
                })
              },
              offset: 0.5// enter at middle of viewport
            });

            enterView({
              selector: '.specialBookApr1',
              enter: function(el) {
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.53353,31.234807])[0]+','+projection([121.53353,31.234807])[1]+') scale('+1+')'
                })
              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.430502,31.213614])[0]+','+projection([121.430502,31.213614])[1]+') scale('+1+')'
                })
              },
              offset: 0.5// enter at middle of viewport

            });
            enterView({
              selector: '.specialBookApr2',
              enter: function(el) {
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.462056,31.255923])[0]+','+projection([121.462056,31.255923])[1]+') scale('+1+')'
                })
              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.53353,31.234807])[0]+','+projection([121.53353,31.234807])[1]+') scale('+1+')'
                })
              },
              offset: 0.5// enter at middle of viewport

            });
            enterView({
              selector: '.specialBookApr3',
              enter: function(el) {
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.445093,31.202531])[0]+','+projection([121.445093,31.202531])[1]+') scale('+1+')'
                })
              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.462056,31.255923])[0]+','+projection([121.462056,31.255923])[1]+') scale('+1+')'
                })
              },
              offset: 0.5// enter at middle of viewport

            });
            enterView({
              selector: '.specialBookApr4',
              enter: function(el) {
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.46735,31.208615])[0]+','+projection([121.46735,31.208615])[1]+') scale('+1+')'
                })
              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.445093,31.202531])[0]+','+projection([121.445093,31.202531])[1]+') scale('+1+')'
                })
              },
              offset: 0.5// enter at middle of viewport

            });


          }

        else if(d[0].type == "Books" && d[0].time[5] == '0'&&d[0].time[6] == '3'){
          d3.select('#hidingMap')
          .style('display','block')

          d3.select('.scrollingContent')
          .append('div')
          .attr('class','total')
          .append('text')
          .text('March 2020, Lost Books in Shanghai')
          .attr('x',500)
          .attr('y',height/2)
          .attr('font-size',20)
          .attr('font-family','Pangolin')

          mapviz.append('path')
          .attr('d',"M0.61,0C-11.74-7.95-17.85-19.52-15-28.04c0.4-1.18,2.65-7.79,9.25-10.09c3.84-1.34,8.98-1.18,12.72,1.68 c3.31,2.52,4.2,6.13,4.63,7.85C14.76-15.81,2.6-2.18,0.61,0z")
          .attr('transform',function(){
            return 'translate('+projection([121.243527,30.843825])[0]+','+projection([121.243527,30.843825])[1]+') scale('+0+')'
          })
          .attr('fill',"#4A225D")
          .style('opacity','0.5')
          .attr('class','cashSpecialLocation')

          var scrollingViz = d3.select(".scrollingContent")

          scrollingViz.selectAll('.specialBookMar').data(d).enter()
          .append('div')
          .attr('class',function(d, i){
            console.log(i);
            return 'specialBookMar' + i
          })
          .append('text')
          .text(function(d){
            // console.log(d);
            return d.name;
          })
          .attr('x',500)
          .attr('y',height/2)
          .attr('font-size',30)
          .attr('font-family','Pangolin')

          enterView({
            selector: '.specialBookMar0',
            enter: function(el) {
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.243527,30.843825])[0]+','+projection([121.243527,30.843825])[1]+') scale('+1+')'
              })
            },
            exit: function(el) {
              console.log('bye');
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.243527,30.843825])[0]+','+projection([121.243527,30.843825])[1]+') scale('+0+')'
              })
            },
            offset: 0.5// enter at middle of viewport
          });

          enterView({
            selector: '.specialBookMar1',
            enter: function(el) {
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.46735,31.208615])[0]+','+projection([121.46735,31.208615])[1]+') scale('+1+')'
              })
            },
            exit: function(el) {
              console.log('bye');
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.243527,30.843825])[0]+','+projection([121.243527,30.843825])[1]+') scale('+1+')'
              })
            },
            offset: 0.5// enter at middle of viewport

          });
          enterView({
            selector: '.specialBookMar2',
            enter: function(el) {
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.428896,31.185293])[0]+','+projection([121.428896,31.185293])[1]+') scale('+1+')'
              })
            },
            exit: function(el) {
              console.log('bye');
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.46735,31.208615])[0]+','+projection([121.46735,31.208615])[1]+') scale('+1+')'
              })
            },
            offset: 0.5// enter at middle of viewport

          });
          enterView({
            selector: '.specialBookMar3',
            enter: function(el) {
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.445008,31.201624])[0]+','+projection([121.445008,31.201624])[1]+') scale('+1+')'
              })
            },
            exit: function(el) {
              console.log('bye');
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.428896,31.185293])[0]+','+projection([121.428896,31.185293])[1]+') scale('+1+')'
              })
            },
            offset: 0.5// enter at middle of viewport

          });

        }else if(d[0].type == "Books" && d[0].time[5] == '0'&&d[0].time[6] == '2'){
          d3.select('#hidingMap')
          .style('display','block')

          d3.select('.scrollingContent')
          .append('div')
          .attr('class','total')
          .append('text')
          .text('February 2020, Lost Books in Shanghai')
          .attr('x',500)
          .attr('y',height/2)
          .attr('font-size',20)
          .attr('font-family','Pangolin')

          mapviz.append('path')
          .attr('d',"M0.61,0C-11.74-7.95-17.85-19.52-15-28.04c0.4-1.18,2.65-7.79,9.25-10.09c3.84-1.34,8.98-1.18,12.72,1.68 c3.31,2.52,4.2,6.13,4.63,7.85C14.76-15.81,2.6-2.18,0.61,0z")
          .attr('transform',function(){
            return 'translate('+projection([121.464409,31.192698])[0]+','+projection([121.464409,31.192698])[1]+') scale('+0+')'
          })
          .attr('fill',"#4A225D")
          .style('opacity','0.5')
          .attr('class','cashSpecialLocation')

          d3.select('.scrollingContent')
          .append('div')
          .attr('class','specialBookFeb')
          .append('text')
          .text('挪威的森林 Norwegian Wood')
          .attr('x',500)
          .attr('y',height/2)
          .attr('font-size',30)
          .attr('font-family','Pangolin')

          enterView({
            selector: '.specialBookFeb',
            enter: function(el) {
              d3.select('.cashSpecialLocation')
              .transition().duration(1000)
              .attr('transform',function(){
                return 'translate('+projection([121.464409,31.192698])[0]+','+projection([121.464409,31.192698])[1]+') scale('+1+')'
              })
            },
            exit: function(el) {
              console.log('bye');
              d3.select('.cashSpecialLocation')
              .transition().duration(1000)
              .attr('transform',function(){
                return 'translate('+projection([121.464409,31.192698])[0]+','+projection([121.464409,31.192698])[1]+') scale('+0+')'
              })
            },
            progress: function(el, progress) {
              console.log("the special element's progress is:", progress);
            },
          });

        }
        else if(d[0].type == "Books" && d[0].time[5] == '1'&&d[0].time[6] == '2'){
          d3.select('#hidingMap')
          .style('display','block')

          console.log(d);
          d3.select('.scrollingContent')
          .append('div')
          .attr('class','total')
          .append('text')
          .text('December 2019, Lost Books in Shanghai')
          .attr('x',500)
          .attr('y',height/2)
          .attr('font-size',20)
          .attr('font-family','Pangolin')

          mapviz.append('path')
          .attr('d',"M0.61,0C-11.74-7.95-17.85-19.52-15-28.04c0.4-1.18,2.65-7.79,9.25-10.09c3.84-1.34,8.98-1.18,12.72,1.68 c3.31,2.52,4.2,6.13,4.63,7.85C14.76-15.81,2.6-2.18,0.61,0z")
          .attr('transform',function(){
            return 'translate('+projection([121.428896,31.185293])[0]+','+projection([121.428896,31.185293])[1]+') scale('+0+')'
          })
          .attr('fill',"#4A225D")
          .style('opacity','0.5')
          .attr('class','cashSpecialLocation')

          var scrollingViz = d3.select(".scrollingContent")

          scrollingViz.selectAll('.specialBookDec').data(d).enter()
          .append('div')
          .attr('class',function(d, i){
            console.log(i);
            return 'specialBookDec' + i
          })
          .append('text')
          .text(function(d){
            // console.log(d);
            return d.name;
          })
          .attr('x',500)
          .attr('y',height/2)
          .attr('font-size',30)
          .attr('font-family','Pangolin')

          enterView({
            selector: '.specialBookDec0',
            enter: function(el) {
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.428896,31.185293])[0]+','+projection([121.428896,31.185293])[1]+') scale('+1+')'
              })
            },
            exit: function(el) {
              console.log('bye');
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.428896,31.185293])[0]+','+projection([121.428896,31.185293])[1]+') scale('+0+')'
              })
            },
            offset: 0.5// enter at middle of viewport
          });

          enterView({
            selector: '.specialBookDec1',
            enter: function(el) {
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.460549,31.258276])[0]+','+projection([121.460549,31.258276])[1]+') scale('+1+')'
              })
            },
            exit: function(el) {
              console.log('bye');
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.428896,31.185293])[0]+','+projection([121.428896,31.185293])[1]+') scale('+1+')'
              })
            },
            offset: 0.5// enter at middle of viewport

          });
          enterView({
            selector: '.specialBookDec2',
            enter: function(el) {
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.435865,31.159439])[0]+','+projection([121.435865,31.159439])[1]+') scale('+1+')'
              })
            },
            exit: function(el) {
              console.log('bye');
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.460549,31.258276])[0]+','+projection([121.460549,31.258276])[1]+') scale('+1+')'
              })
            },
            offset: 0.5// enter at middle of viewport

          });
          enterView({
            selector: '.specialBookDec3',
            enter: function(el) {
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.55837,31.325265])[0]+','+projection([121.55837,31.325265])[1]+') scale('+1+')'
              })
            },
            exit: function(el) {
              console.log('bye');
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.435865,31.159439])[0]+','+projection([121.435865,31.159439])[1]+') scale('+1+')'
              })
            },
            offset: 0.5// enter at middle of viewport

          });
          enterView({
            selector: '.specialBookDec4',
            enter: function(el) {
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.346817,31.203347])[0]+','+projection([121.346817,31.203347])[1]+') scale('+1+')'
              })
            },
            exit: function(el) {
              console.log('bye');
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.55837,31.325265])[0]+','+projection([121.55837,31.325265])[1]+') scale('+1+')'
              })
            },
            offset: 0.5// enter at middle of viewport

          });
          enterView({
            selector: '.specialBookDec5',
            enter: function(el) {
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.254481,31.372456])[0]+','+projection([121.254481,31.372456])[1]+') scale('+1+')'
              })
            },
            exit: function(el) {
              console.log('bye');
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.346817,31.203347])[0]+','+projection([121.346817,31.203347])[1]+') scale('+1+')'
              })
            },
            offset: 0.5// enter at middle of viewport

          });
          enterView({
            selector: '.specialBookDec6',
            enter: function(el) {
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.258956,30.823841])[0]+','+projection([121.258956,30.823841])[1]+') scale('+1+')'
              })
            },
            exit: function(el) {
              console.log('bye');
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.254481,31.372456])[0]+','+projection([121.254481,31.372456])[1]+') scale('+1+')'
              })
            },
            offset: 0.5// enter at middle of viewport

          });


        }
        else if(d[0].type == "Books" && d[0].time[5] == '0'&&d[0].time[6] == '1'){
          d3.select('#hidingMap')
          .style('display','block')

          d3.select('.scrollingContent')
          .append('div')
          .attr('class','total')
          .append('text')
          .text('January 2020, Lost Books in Shanghai')
          .attr('x',500)
          .attr('y',height/2)
          .attr('font-size',20)
          .attr('font-family','Pangolin')

          mapviz.append('path')
          .attr('d',"M0.61,0C-11.74-7.95-17.85-19.52-15-28.04c0.4-1.18,2.65-7.79,9.25-10.09c3.84-1.34,8.98-1.18,12.72,1.68 c3.31,2.52,4.2,6.13,4.63,7.85C14.76-15.81,2.6-2.18,0.61,0z")
          .attr('transform',function(){
            return 'translate('+projection([121.409304,31.453863])[0]+','+projection([121.409304,31.453863])[1]+') scale('+0+')'
          })
          .attr('fill',"#4A225D")
          .style('opacity','0.5')
          .attr('class','cashSpecialLocation')

          var scrollingViz = d3.select(".scrollingContent")

          scrollingViz.selectAll('.specialBookJan').data(d).enter()
          .append('div')
          .attr('class',function(d, i){
            console.log(i);
            return 'specialBookJan' + i
          })
          .append('text')
          .text(function(d){
            // console.log(d);
            return d.name;
          })
          .attr('x',500)
          .attr('y',height/2)
          .attr('font-size',30)
          .attr('font-family','Pangolin')

          enterView({
            selector: '.specialBookJan0',
            enter: function(el) {
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.409304,31.453863])[0]+','+projection([121.409304,31.453863])[1]+') scale('+1+')'
              })
            },
            exit: function(el) {
              console.log('bye');
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.409304,31.453863])[0]+','+projection([121.409304,31.453863])[1]+') scale('+0+')'
              })
            },
            offset: 0.5// enter at middle of viewport
          });

          enterView({
            selector: '.specialBookJan1',
            enter: function(el) {
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.469808,31.234969])[0]+','+projection([121.469808,31.234969])[1]+') scale('+1+')'
              })
            },
            exit: function(el) {
              console.log('bye');
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.409304,31.453863])[0]+','+projection([121.409304,31.453863])[1]+') scale('+1+')'
              })
            },
            offset: 0.5// enter at middle of viewport

          });
          enterView({
            selector: '.specialBookJan2',
            enter: function(el) {
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.53353,31.234807])[0]+','+projection([121.53353,31.234807])[1]+') scale('+1+')'
              })
            },
            exit: function(el) {
              console.log('bye');
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.469808,31.234969])[0]+','+projection([121.469808,31.234969])[1]+') scale('+1+')'
              })
            },
            offset: 0.5// enter at middle of viewport

          });
        }
        else if(d[0].type == "Books" && d[0].time[5] == '1'&&d[0].time[6] == '1'){
          d3.select('#hidingMap')
          .style('display','block')

          console.log(d);
          d3.select('.scrollingContent')
          .append('div')
          .attr('class','total')
          .append('text')
          .text('November 2019, Lost Books in Shanghai')
          .attr('x',500)
          .attr('y',height/2)
          .attr('font-size',20)
          .attr('font-family','Pangolin')

          mapviz.append('path')
          .attr('d',"M0.61,0C-11.74-7.95-17.85-19.52-15-28.04c0.4-1.18,2.65-7.79,9.25-10.09c3.84-1.34,8.98-1.18,12.72,1.68 c3.31,2.52,4.2,6.13,4.63,7.85C14.76-15.81,2.6-2.18,0.61,0z")
          .attr('transform',function(){
            return 'translate('+projection([121.441747,31.329018])[0]+','+projection([121.441747,31.329018])[1]+') scale('+0+')'
          })
          .attr('fill',"#4A225D")
          .style('opacity','0.5')
          .attr('class','cashSpecialLocation')

          var scrollingViz = d3.select(".scrollingContent")

          scrollingViz.selectAll('.specialBookNov').data(d).enter()
          .append('div')
          .attr('class',function(d, i){
            console.log(i);
            return 'specialBookNov' + i
          })
          .append('text')
          .text(function(d){
            // console.log(d);
            return d.name;
          })
          .attr('x',500)
          .attr('y',height/2)
          .attr('font-size',30)
          .attr('font-family','Pangolin')

          enterView({
            selector: '.specialBookNov0',
            enter: function(el) {
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.441747,31.329018])[0]+','+projection([121.441747,31.329018])[1]+') scale('+1+')'
              })
            },
            exit: function(el) {
              console.log('bye');
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.441747,31.329018])[0]+','+projection([121.441747,31.329018])[1]+') scale('+0+')'
              })
            },
            offset: 0.5// enter at middle of viewport
          });

          enterView({
            selector: '.specialBookNov1',
            enter: function(el) {
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.256655,30.827142])[0]+','+projection([121.256655,30.827142])[1]+') scale('+1+')'
              })
            },
            exit: function(el) {
              console.log('bye');
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.441747,31.329018])[0]+','+projection([121.441747,31.329018])[1]+') scale('+1+')'
              })
            },
            offset: 0.5// enter at middle of viewport

          });
          enterView({
            selector: '.specialBookNov2',
            enter: function(el) {
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.44408,31.33585])[0]+','+projection([121.44408,31.33585])[1]+') scale('+1+')'
              })
            },
            exit: function(el) {
              console.log('bye');
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.256655,30.827142])[0]+','+projection([121.256655,30.827142])[1]+') scale('+1+')'
              })
            },
            offset: 0.5// enter at middle of viewport

          });
          enterView({
            selector: '.specialBookNov3',
            enter: function(el) {
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.54022,31.184282])[0]+','+projection([121.54022,31.184282])[1]+') scale('+1+')'
              })
            },
            exit: function(el) {
              console.log('bye');
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.44408,31.33585])[0]+','+projection([121.44408,31.33585])[1]+') scale('+1+')'
              })
            },
            offset: 0.5// enter at middle of viewport

          });
          enterView({
            selector: '.specialBookNov4',
            enter: function(el) {
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.384964,31.113468])[0]+','+projection([121.384964,31.113468])[1]+') scale('+1+')'
              })
            },
            exit: function(el) {
              console.log('bye');
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.54022,31.184282])[0]+','+projection([121.54022,31.184282])[1]+') scale('+1+')'
              })
            },
            offset: 0.5// enter at middle of viewport

          });
          enterView({
            selector: '.specialBookNov5',
            enter: function(el) {
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.733438,31.044515])[0]+','+projection([121.733438,31.044515])[1]+') scale('+1+')'
              })
            },
            exit: function(el) {
              console.log('bye');
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.384964,31.113468])[0]+','+projection([121.384964,31.113468])[1]+') scale('+1+')'
              })
            },
            offset: 0.5// enter at middle of viewport

          });
          enterView({
            selector: '.specialBookNov6',
            enter: function(el) {
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.270291,31.356128])[0]+','+projection([121.270291,31.356128])[1]+') scale('+1+')'
              })
            },
            exit: function(el) {
              console.log('bye');
              d3.select('.cashSpecialLocation')
              .transition().duration(800)
              .attr('transform',function(){
                return 'translate('+projection([121.733438,31.044515])[0]+','+projection([121.733438,31.044515])[1]+') scale('+1+')'
              })
            },
            offset: 0.5// enter at middle of viewport

          });


        }
        else if(d[0].type == 'Dogs'){
          d3.select('#hidingMap')
          .style('display','block')

          // console.log(d);
          let breeds = d.map(d=>d.breed).filter(onlyUnique);
          console.log(breeds);

          d3.select('.scrollingContent')
          .append('div')
          .attr('class','totalElse')
          .append('text')
          .text(function(){
            // console.log(d);
            var month = d[0].time[5]+d[0].time[6]
            if(month == '04'){
              m = 'Apr'
            }
            if(month == '03'){
              m = 'Mar'
            }
            if(month == '02'){
              m = 'Feb'
            }
            if(month == '01'){
              m = 'Jan'
            }
            if(month == '12'){
              m = 'Dec'
            }
            if(month == '11'){
              m = 'Nov'
            }
            var year = d[0].time.slice(0,4);
            // console.log(year);
            return m+' '+year+', lost dogs in Shanghai'

          })
          .attr('x',500)
          .attr('y',height/2)
          .attr('font-size',20)
          .attr('font-family','Pangolin')



          var scrollingViz = d3.select(".scrollingContent")

          scrollingViz.selectAll('.specialDogs').data(breeds).enter()
          .append('div')
          .attr('class',function(d, i){
            // console.log(i);
            return 'specialDogs'
          })
          .attr('id',function(d, i){
            return d ;
          })
          .append('text')
          .text(function(d){
            // console.log(d);
            return d;
          })
          .attr('x',500)
          .attr('y',height/2)
          .attr('font-size',30)
          .attr('font-family','Pangolin')


          enterView({
            selector: '.specialDogs',
            enter: function(el) {
              // console.log(d);
              console.log(el.id);
              var thisDog = []
              for(let i = 0;i<d.length;i++){
                if(d[i].breed==el.id){
                  // console.log('yes');
                  thisDog.push(d[i])
                  console.log(thisDog);
                }
              }
              let correspondingDatapoint = []
              for(let i=0;i<thisDog.length;i++){

             correspondingDatapoint[i] = uniqueLonLat.find(function(datapoint){
                // console.log(thisDog);
                if(datapoint.location == thisDog[i].location){
                  return true;
                }else{
                  return false
                }
              })
            }
              console.log(correspondingDatapoint);

              function assignKeys(){
                return thisDog.number;
              }

var dogelementsForPage = mapviz.selectAll('.cashSpecialLocation').data(correspondingDatapoint,assignKeys)
// var enteringDogs = dogelementsForPage.enter();
var exitingDogs = dogelementsForPage.exit();

            // exitingDogs
            //   .transition().duration(800)
            //   .attr('transform',function(d){
            //     lon = d.lonlat.split(',')[0];
            //     lat = d.lonlat.split(',')[1];
            //
            //     return 'translate('+projection([lon,lat])[0]+','+projection([lon,lat])[1]+') scale('+0+')'
            //   })

              exitingDogs
              .remove();


              dogelementsForPage.enter()
              .append('path')
              // .transition().delay(1100)
              .attr('d',"M0.61,0C-11.74-7.95-17.85-19.52-15-28.04c0.4-1.18,2.65-7.79,9.25-10.09c3.84-1.34,8.98-1.18,12.72,1.68 c3.31,2.52,4.2,6.13,4.63,7.85C14.76-15.81,2.6-2.18,0.61,0z")
              .attr('transform',function(d){
                console.log(d);
                lon = d.lonlat.split(',')[0];
                lat = d.lonlat.split(',')[1];

                return 'translate('+projection([lon,lat])[0]+','+projection([lon,lat])[1]+') scale('+0+')'
              })
              .attr('fill',"#4A225D")
              .style('opacity','0.5')
              .attr('class','cashSpecialLocation')


              d3.selectAll('.cashSpecialLocation')
              .transition().delay(100).duration(500)
              .attr('transform',function(d){
                lon = d.lonlat.split(',')[0];
                lat = d.lonlat.split(',')[1];

                return 'translate('+projection([lon,lat])[0]+','+projection([lon,lat])[1]+') scale('+1+')'
              })


            },
            exit: function(el) {
              console.log('bye');
              var thisDog = []
              for(let i = 0;i<d.length;i++){
                if(d[i].breed==el.id){
                  // console.log('yes');
                  thisDog.push(d[i])
                  console.log(thisDog);
                }
              }
              let correspondingDatapoint = []
              for(let i=0;i<thisDog.length;i++){

             correspondingDatapoint[i] = uniqueLonLat.find(function(datapoint){
                // console.log(thisDog);
                if(datapoint.location == thisDog[i].location){
                  return true;
                }else{
                  return false
                }
              })
            }
              console.log(correspondingDatapoint);

              function assignKeys(){
                return thisDog.number;
              }

var dogelementsForPage = mapviz.selectAll('.cashSpecialLocation').data(correspondingDatapoint,assignKeys)
// var enteringDogs = dogelementsForPage.enter();
var exitingDogs = dogelementsForPage.exit();


              exitingDogs
              .remove();


              dogelementsForPage.enter()
              .append('path')
              // .transition().delay(1100)
              .attr('d',"M0.61,0C-11.74-7.95-17.85-19.52-15-28.04c0.4-1.18,2.65-7.79,9.25-10.09c3.84-1.34,8.98-1.18,12.72,1.68 c3.31,2.52,4.2,6.13,4.63,7.85C14.76-15.81,2.6-2.18,0.61,0z")
              .attr('transform',function(d){
                console.log(d);
                lon = d.lonlat.split(',')[0];
                lat = d.lonlat.split(',')[1];

                return 'translate('+projection([lon,lat])[0]+','+projection([lon,lat])[1]+') scale('+0+')'
              })
              .attr('fill',"#4A225D")
              .style('opacity','0.5')
              .attr('class','cashSpecialLocation')


              d3.selectAll('.cashSpecialLocation')
              .transition().delay(100).duration(500)
              .attr('transform',function(d){
                lon = d.lonlat.split(',')[0];
                lat = d.lonlat.split(',')[1];

                return 'translate('+projection([lon,lat])[0]+','+projection([lon,lat])[1]+') scale('+1+')'
              })

            },
            offset: 0.5// enter at middle of viewport

          });

        }
          else{
            d3.select('#hidingMap')
            .style('display','block')

            d3.select('.scrollingContent')
            .append('div')
            .attr('class','totalElse')
            .append('text')
            .text(function(){
              // console.log(d);
              var month = d[0].time[5]+d[0].time[6]
              if(month == '04'){
                m = 'Apr'
              }
              if(month == '03'){
                m = 'Mar'
              }
              if(month == '02'){
                m = 'Feb'
              }
              if(month == '01'){
                m = 'Jan'
              }
              if(month == '12'){
                m = 'Dec'
              }
              if(month == '11'){
                m = 'Nov'
              }
              var year = d[0].time.slice(0,4);
              // console.log(year);
              var type = d[0].type;
              return m+' '+year+', lost '+type+' in Shanghai'

            })
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',20)
            .attr('font-family','Pangolin')


          }

          function assignKeys(d, i){
            // console.log(d);
            return d.number;
          }

          let elementsForPage = mapviz.selectAll(".locations").data(d,assignKeys);
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
