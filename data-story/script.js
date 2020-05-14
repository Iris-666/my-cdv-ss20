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
.style('text-decoration','underline')


let rAxisScale = d3.scaleLinear().range([height/3, height/2-padding]); //for the circle axis
let angleScale = d3.scaleLinear().range([0 + 22.5/(2*Math.PI), 2*Math.PI+ 22.5/(2*Math.PI)]); // for the line axis
let rCircleScale = d3.scaleLinear().range([2,40]) //for the radius of little circles
let pallet = ["#F4A7B9","#AB3B3A","#ED784A","#D7B98E","#F9BF45","#B4A582","#B1B479","#B5CAA0","#516E41","#268785","#78C2C4","#7B90D2","#8A6BBE","#91989F","#4A225D"]

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
    return 'translate('+width/3+','+height/2+')'
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
  .style('stroke','transparent')
  .style('opacity',0.5)
  .attr('fill',function(d, i){
    return pallet[Math.floor(i/6)]
  })
  .attr('class','circles')

  viz.selectAll('.circless').data(typesAndTimes).enter()
  .append('circle')
  .attr('transform',function(d,i){
    return 'translate('+width/3+','+height/2+')'
  })
  .attr('cx',function(d, i){
    return Math.sin(angleScale(Math.floor(i/6)))*rAxisScale(i%6)
  })
  .attr('cy',function(d, i){
    return Math.cos(angleScale(Math.floor(i/6)))*rAxisScale(i%6)
  })
  .attr('r',function(d, i){
    return rCircleScale(d.length + 10)
  })
  .attr('fill','none')
  .style('stroke',function(d, i){
    console.log(d);
    if(d[0].type == 'Dogs' || d[0].type == 'Books'){
      return pallet[Math.floor(i/6)]
    }
    if(d[0].type == "Cash" && d[0].time[6] == '4'){
      return pallet[Math.floor(i/6)]
    }
    if(d[0].type == "Watches and Glasses" && d[0].time[5] == '0'&&d[0].time[6] == '2'){
      return pallet[Math.floor(i/6)]
    }
    if(d[0].type == "Jewellery" && d[0].time[5] == '0'&&d[0].time[6] == '1'){
      return pallet[Math.floor(i/6)]
    }
    if(d[0].type == "Jewellery" && d[0].time[5] == '1'&&d[0].time[6] == '1'){
      return pallet[Math.floor(i/6)]
    }
    if(d[0].type == "Watches and Glasses" && d[0].time[5] == '0'&&d[0].time[6] == '1'){
      return pallet[Math.floor(i/6)]
    }
    if(d[0].type == "Watches and Glasses" && d[0].time[5] == '1'&&d[0].time[6] == '1'){
      return pallet[Math.floor(i/6)]
    }
    if(d[0].type == "Other" && d[0].time[5] == '0'&&d[0].time[6] == '3'){
      return pallet[Math.floor(i/6)]
    }
    if(d[0].type == "Other" && d[0].time[5] == '0'&&d[0].time[6] == '1'){
      return pallet[Math.floor(i/6)]
    }
    if(d[0].type == "Other" && d[0].time[5] == '1'&&d[0].time[6] == '2'){
      return pallet[Math.floor(i/6)]
    }
    if(d[0].type == "Other" && d[0].time[5] == '1'&&d[0].time[6] == '1'){
      return pallet[Math.floor(i/6)]
    }
    if(d[0].type == "Other" && d[0].time[5] == '1'&&d[0].time[6] == '1'){
      return pallet[Math.floor(i/6)]
    }

  })
  .attr('class','circless')


  viz.selectAll('.typesText').data(types).enter()
  .append('text')
  .text(function(d, i){
    return d
  })
  .attr('transform',function(d,i){
    return 'translate('+width/3+','+height/2+')'
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
  .attr('class','typesText')


  viz.selectAll('.lineAxis').data(types).enter()
  .append('line')
  .attr('transform',function(d,i){
    return 'translate('+width/3+','+height/2+')'
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
  .attr('cx',width/3)
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
    return 'translate('+width/3+','+height/2+')'
  })
  .attr('x',-40)
  .attr('y',function(d, i){
    return(-rAxisScale(i))
  })
  .attr('font-size',20)
  .attr('font-family','Permanent Marker')
  .attr('fill','grey')
  .attr('class','monthsText')
  .style('text-decoration','underline')

})


viz.append('text')
.text("What we've lost")
.attr('x',width/3)
.attr('y',height/2-height/15)
.attr('font-size',50)
.attr('class','title')
.attr('font-family','Permanent Marker')
viz.append('text')
.text("in Shanghai")
.attr('x',width/3)
.attr('y',height/2+height/15)
.attr('font-size',50)
.attr('class','title')
.attr('font-family','Permanent Marker')

viz.append('text')
.text("Click to Start")
.attr('x',width/3)
.attr('y',height/2+height/5)
.attr('font-size',25)
.attr('class','title')
.attr('font-family','Permanent Marker')
.style('text-decoration','underline')


viz.append('line')
.attr('transform',function(){
  console.log(rAxisScale(1));
  return 'translate('+width/3+','+height/2+')'
})
.attr('x1',0)
.attr('y1',-rAxisScale(1))
.attr('x2',0)
.attr('y2',-rAxisScale(0))
.attr('stroke','grey')
.attr('stroke-width',0.5)
.attr('class','textLine')

d3.select('#intro').append('text')
.text(" I’m a person who always lose things, from umbrella, gloves, to books, and keys. Therefore, I chose lost and found as the topic to find out where, which and how many lost items people lost in Shanghai over the past half-year. I got the dataset by scraping the lost and found data from the Shanghai Public Security Bureau website and data from the Shanghai lost dog tag of Weibo. I got 2723 lost items in total. Obviously, it’s just a fraction of all the items that people lost, but I believe this can still show some stories behind the lost and found.")
.attr('class','introduction')
.attr('font-family','Permanent Marker')


viz.append('circle')
.attr('r',height/3)
.attr('cx',width/3)
.attr('cy',height/2)
.attr('stroke','black')
.attr('fill','transparent')
.attr('stroke-width',1)
.style('cursor','pointer')
.on('click',function(){
  d3.selectAll('.title').remove();
  d3.selectAll('.introduction').remove();

  viz.append('text')
  .transition()
    .delay(3000)
    .text('Click the circles to see detailed map')
    .attr('x',padding)
    .attr('y',padding)
    .attr('font-size',20)
    .attr('font-family','Permanent Marker')
    .style('text-decoration','underline')

    viz.append('text')
    .transition()
      .delay(3000)
      .text('Check the circles with halo for some')
      .attr('x',padding)
      .attr('y',padding + 40)
      .attr('font-size',20)
      .attr('font-family','Permanent Marker')
      .style('text-decoration','underline')

      viz.append('text')
      .transition()
        .delay(3000)
        .text('interesting stories!')
        .attr('x',padding)
        .attr('y',padding + 70)
        .attr('font-size',20)
        .attr('font-family','Permanent Marker')
        .style('text-decoration','underline')

  d3.select(this)
  .transition()
  .duration(2000)
  .attr('r',0)
  .style('cursor','default');

  rAxisScale.range([height/10, height/2-padding])

  viz.selectAll(".circleAxis")
  .transition()
  .duration(2000)
  // .delay(1000)
  // .attr('cx',width/2)
  // .attr('cy',height/2)
  .attr('r', function(d, i){
    // console.log(rAxisScale(i));
    return(rAxisScale(i))
  });

  viz.selectAll(".circleAxis")
  .transition()
  .duration(2000)
  .delay(1000)
  .attr('cx',width/2)
  .attr('cy',height/2)
  .attr('r', function(d, i){
    // console.log(rAxisScale(i));
    return(rAxisScale(i))
  });


viz.selectAll('.typesText')
.transition()
.duration(2000)
.delay(1000)
.attr('transform',function(d,i){
  return 'translate('+width/2+','+height/2+')'
})


  viz.selectAll('.textLine')
  .transition()
  .duration(2000)
  // .delay(1000)
  // .attr('transform',function(d,i){
  //   return 'translate('+width/2+','+height/2+')'
  // })
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

  viz.selectAll('.textLine')
  .transition()
  .duration(2000)
  .delay(1000)
  .attr('transform',function(d,i){
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



  viz.selectAll('.lineAxis')
  .transition()
  .duration(2000)
  // .delay(1000)
  // .attr('transform',function(d,i){
  //   return 'translate('+width/2+','+height/2+')'
  // })
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

  viz.selectAll('.lineAxis')
  .transition()
  .duration(2000)
  .delay(1000)
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




  viz.selectAll('.monthsText')
  .transition()
  .duration(2000)
  // .delay(1000)
  // .attr('transform',function(d,i){
  //   return 'translate('+width/2+','+height/2+')'
  // })
  .attr('x',-40)
  .attr('y',function(d, i){
    return(-rAxisScale(i))
  })

  viz.selectAll('.monthsText')
  .transition()
  .duration(2000)
  .delay(1000)
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
          .attr('class','totalMonth')
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
            console.log(thisMonthData.length);

            return m+' '+year+', lost items in Shanghai'

          })
          .attr('x',500)
          .attr('y',height/2)
          .attr('font-size',20)
          .attr('font-family','Pangolin')

          d3.select('.scrollingContent')
          .append('div')
          .attr('class','totalMonthNum')
          .append('text')
          .text(function(){
            return 'Total Number: '+thisMonthData.length
          })
          .attr('x',500)
          .attr('y',height/2)
          .attr('font-size',20)
          .attr('font-family','Pangolin')

          d3.select('.scrollingContent')
          .append('div')
          .attr('class','FebStory')
          .append('text')
          .text(function(){
            if(d == '02'){
              return "February has the minimum number of lost items. Maybe that's because of the corona virus and less people went out so that less things were lost."
            }
          })
          .attr('x',500)
          .attr('y',height/2)
          .attr('font-size',20)
          .attr('font-family','Pangolin')

        })

      })
    })
  })



  rCircleScale.range([10,60]);
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
            .attr('class','totalBook')
            .append('text')
            .text('April 2020, Lost Cash in Shanghai')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',20)
            .attr('font-family','Pangolin')

            d3.select('.scrollingContent')
            .append('div')
            .attr('class','scrollInstruction')
            .append('text')
            .text('Scroll to read some interesting stories! ⬇️')
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
            .attr('class','specialCashAprilText1')
            .style('opacity',0.5)

            d3.select('.scrollingContent')
            .append('div')
            .attr('class','specialCashApril2')
            .append('text')
            .text('On April 24th, Mr Xie reported to the police that he found ten thousand kuai in his shop. After checking the surveillance camera, the police found out the owner of the money, who is an old lady and this money is her pension of the past four months.')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',30)
            .attr('font-family','Pangolin')
            .attr('class','specialCashAprilText2')
            .style('opacity',0.5)


            enterView({
              selector: '.specialCashApril1',
              enter: function(el) {
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.190831, 31.342922])[0]+','+projection([121.190831, 31.342922])[1]+') scale('+1+')'
                })
                d3.select('.specialCashAprilText1')
                .style('opacity',1)

              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.190831, 31.342922])[0]+','+projection([121.190831, 31.342922])[1]+') scale('+0+')'
                })
                d3.select('.specialCashAprilText1')
                .style('opacity',0.5)

              },
              progress: function(el, progress) {
                console.log("the special element's progress is:", progress);
              },
              offset: 0.3, // enter at middle of viewport
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
                d3.select('.specialCashAprilText1')
                .style('opacity',0.5)
                d3.select('.specialCashAprilText2')
                .style('opacity',1)

              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.190831, 31.342922])[0]+','+projection([121.190831, 31.342922])[1]+') scale('+1+')'
                })
                d3.select('.specialCashAprilText2')
                .style('opacity',0.5)
                d3.select('.specialCashAprilText1')
                .style('opacity',1)

              },
              progress: function(el, progress) {
                console.log("the special element's progress is:", progress);
              },
              offset: 0.3, // enter at middle of viewport
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
            .attr('class','totalBook')
            .append('text')
            .text('February 2020, Lost Watches and Glasses in Shanghai')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',20)
            .attr('font-family','Pangolin')

            d3.select('.scrollingContent')
            .append('div')
            .attr('class','scrollInstruction')
            .append('text')
            .text('Scroll to read some interesting stories! ⬇️')
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
            .attr('class','specialWatchFebText')
            .style('opacity',0.5)


            d3.select('.scrollingContent')
            .append('div')
            .attr('class','specialWatchFeb2')
            .append('text')
            .text('Wash your hands frequently and wear a mask are the only way to prevent corona virus!')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',30)
            .attr('font-family','Pangolin')
            .attr('class','specialWatchFebText')
            .style('opacity',0.5)


            enterView({
              selector: '.specialWatchFeb1',
              enter: function(el) {
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.423231,30.926323])[0]+','+projection([121.423231,30.926323])[1]+') scale('+1+')'
                })
                d3.selectAll('.specialWatchFebText')
                .style('opacity',1)
              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.423231,30.926323])[0]+','+projection([121.423231,30.926323])[1]+') scale('+0+')'
                })
                d3.selectAll('.specialWatchFebText')
                .style('opacity',0.5)

              },
              progress: function(el, progress) {
                console.log("the special element's progress is:", progress);
              },
              offset: 0.3, // enter at middle of viewport
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
            .attr('class','totalBook')
            .append('text')
            .text('January 2020, Lost Jewellery in Shanghai')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',20)
            .attr('font-family','Pangolin')

            d3.select('.scrollingContent')
            .append('div')
            .attr('class','scrollInstruction')
            .append('text')
            .text('Scroll to read some interesting stories! ⬇️')
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
            .attr('class','specialJewJanText')
            .style('opacity',0.5)


            enterView({
              selector: '.specialJewJan',
              enter: function(el) {
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.672063,31.148267])[0]+','+projection([121.672063,31.148267])[1]+') scale('+1+')'
                })
                d3.select('.specialJewJanText')
                .style('opacity',1)

              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.672063,31.148267])[0]+','+projection([121.672063,31.148267])[1]+') scale('+0+')'
                })
                d3.select('.specialJewJanText')
                .style('opacity',0.5)

              },
              progress: function(el, progress) {
                console.log("the special element's progress is:", progress);
              },
              offset: 0.3, // enter at middle of viewport
              // once: true, // trigger just once
            });

          }
          else if(d[0].type == "Jewellery" && d[0].time[5] == '1'&&d[0].time[6] == '1'){
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
            .attr('class','totalBook')
            .append('text')
            .text('January 2020, Lost Jewellery in Shanghai')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',20)
            .attr('font-family','Pangolin')


            d3.select('.scrollingContent')
            .append('div')
            .attr('class','scrollInstruction')
            .append('text')
            .text('Scroll to read some interesting stories! ⬇️')
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
            .attr('class','specialJewJanText')
            .style('opacity',0.5)



            enterView({
              selector: '.specialJewJan',
              enter: function(el) {
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.672063,31.148267])[0]+','+projection([121.672063,31.148267])[1]+') scale('+1+')'
                })
                d3.select('.specialJewJanText')
                  .style('opacity',1)
              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.672063,31.148267])[0]+','+projection([121.672063,31.148267])[1]+') scale('+0+')'
                })
                d3.select('.specialJewJanText')
                  .style('opacity',0.5)
              },
              progress: function(el, progress) {
                console.log("the special element's progress is:", progress);
              },
              offset: 0.3, // enter at middle of viewport
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
            .attr('class','totalBook')
            .append('text')
            .text('January 2020, Lost Watches and Glasses in Shanghai')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',20)
            .attr('font-family','Pangolin')

            d3.select('.scrollingContent')
            .append('div')
            .attr('class','scrollInstruction')
            .append('text')
            .text('Scroll to read some interesting stories! ⬇️')
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
            .attr('class','specialWatchJanText')
            .style('opacity',0.5)



            enterView({
              selector: '.specialWatchJan',
              enter: function(el) {
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.672063,31.148267])[0]+','+projection([121.672063,31.148267])[1]+') scale('+1+')'
                })
                d3.select('.specialWatchJanText')
                  .style('opacity',1)

              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.672063,31.148267])[0]+','+projection([121.672063,31.148267])[1]+') scale('+0+')'
                })
                d3.select('.specialWatchJanText')
                  .style('opacity',0.5)

              },
              progress: function(el, progress) {
                console.log("the special element's progress is:", progress);
              },
              offset: 0.3, // enter at middle of viewport
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
            .attr('class','totalBook')
            .append('text')
            .text('November 2019, Lost Watches and Glasses in Shanghai')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',20)
            .attr('font-family','Pangolin')

            d3.select('.scrollingContent')
            .append('div')
            .attr('class','scrollInstruction')
            .append('text')
            .text('Scroll to read some interesting stories! ⬇️')
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
            .attr('class','specialWatchNovText')
            .style('opacity',0.5)



            enterView({
              selector: '.specialWatchNov',
              enter: function(el) {
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.672063,31.148267])[0]+','+projection([121.672063,31.148267])[1]+') scale('+1+')'
                })
                d3.select('.specialWatchNovText')
                  .style('opacity',1)
              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.672063,31.148267])[0]+','+projection([121.672063,31.148267])[1]+') scale('+0+')'
                })
                d3.select('.specialWatchNovText')
                  .style('opacity',0.5)

              },
              progress: function(el, progress) {
                console.log("the special element's progress is:", progress);
              },
              offset: 0.3, // enter at middle of viewport
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
            .attr('class','totalBook')
            .append('text')
            .text('March 2020, Lost Other in Shanghai')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',20)
            .attr('font-family','Pangolin')

            d3.select('.scrollingContent')
            .append('div')
            .attr('class','scrollInstruction')
            .append('text')
            .text('Scroll to read some interesting stories! ⬇️')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',20)
            .attr('font-family','Pangolin')


            d3.select('.scrollingContent')
            .append('div')
            .attr('class','specialOtherMar')
            .append('text')
            .text("On March 31th, the police found a washing machine by the side of Jiazhu road. They found that a this washing machine dropped off a track and finally found the owner finally.")
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',30)
            .attr('font-family','Pangolin')
            .attr('class','specialOtherMarText')
            .style('opacity',0.5)


            enterView({
              selector: '.specialOtherMar',
              enter: function(el) {
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.26268,31.046542])[0]+','+projection([121.26268,31.046542])[1]+') scale('+1+')'
                })
                d3.select('.specialOtherMarText')
                  .style('opacity',1)
              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.26268,31.046542])[0]+','+projection([121.26268,31.046542])[1]+') scale('+0+')'
                })
                d3.select('.specialOtherMarText')
                  .style('opacity',0.5)

              },
              progress: function(el, progress) {
                console.log("the special element's progress is:", progress);
              },
              offset:0.3
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
            .attr('class','totalBook')
            .append('text')
            .text('January 2020, Lost Other in Shanghai')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',20)
            .attr('font-family','Pangolin')

            d3.select('.scrollingContent')
            .append('div')
            .attr('class','scrollInstruction')
            .append('text')
            .text('Scroll to read some interesting stories! ⬇️')
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
            .attr('class','specialOtherJanText1')
            .style('opacity',0.5)


            d3.select('.scrollingContent')
            .append('div')
            .attr('class','specialOtherJan2')
            .append('text')
            .text("On January 6th, a delivery guy Mr. Li found that the battery of his electric bicycle as well as the food for delivery disappeared. The police's investigation revealed that it was another delivery guy stole the battery and food since his own battery was not working. ")
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',30)
            .attr('font-family','Pangolin')
            .attr('class','specialOtherJanText2')
            .style('opacity',0.5)


            enterView({
              selector: '.specialOtherJan',
              enter: function(el) {
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.43281,31.164925])[0]+','+projection([121.43281,31.164925])[1]+') scale('+1+')'
                })
                d3.select('.specialOtherJanText1')
                  .style('opacity',1)
              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.43281,31.164925])[0]+','+projection([121.43281,31.164925])[1]+') scale('+0+')'
                })
                d3.select('.specialOtherJanText1')
                  .style('opacity',0.5)

              },
              progress: function(el, progress) {
                console.log("the special element's progress is:", progress);
              },
              offset: 0.3
            });

            enterView({
              selector: '.specialOtherJan2',
              enter: function(el) {
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.43807,31.224154])[0]+','+projection([121.43807,31.224154])[1]+') scale('+1+')'
                })
                d3.select('.specialOtherJanText1')
                  .style('opacity',0.5)
                d3.select('.specialOtherJanText2')
                  .style('opacity',1)

              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.43281,31.164925])[0]+','+projection([121.43281,31.164925])[1]+') scale('+1+')'
                })
                d3.select('.specialOtherJanText2')
                  .style('opacity',0.5)
                d3.select('.specialOtherJanText1')
                  .style('opacity',1)

              },
              progress: function(el, progress) {
                console.log("the special element's progress is:", progress);
              },
              offset: 0.3
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
            .attr('class','totalBook')
            .append('text')
            .text('December 2019, Lost Other in Shanghai')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',20)
            .attr('font-family','Pangolin')

            d3.select('.scrollingContent')
            .append('div')
            .attr('class','scrollInstruction')
            .append('text')
            .text('Scroll to read some interesting stories! ⬇️')
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
            .attr('class','specialOtherDecText')
            .style('opacity',0.5)


            enterView({
              selector: '.specialOtherDec',
              enter: function(el) {
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.425511,31.227831])[0]+','+projection([121.425511,31.227831])[1]+') scale('+1+')'
                })
                d3.select('.specialOtherDecText')
                  .style('opacity',1)
              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.425511,31.227831])[0]+','+projection([121.425511,31.227831])[1]+') scale('+0+')'
                })
                d3.select('.specialOtherDecText')
                  .style('opacity',0.5)

              },
              progress: function(el, progress) {
                console.log("the special element's progress is:", progress);
              },
              offset: 0.3
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
            .attr('class','totalBook')
            .append('text')
            .text('November 2019, Lost Other in Shanghai')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',20)
            .attr('font-family','Pangolin')

            d3.select('.scrollingContent')
            .append('div')
            .attr('class','scrollInstruction')
            .append('text')
            .text('Scroll to read some interesting stories! ⬇️')
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
            .attr('class','specialOtherNovText')
            .style('opacity',0.5)


            enterView({
              selector: '.specialOtherNov',
              enter: function(el) {
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.223728,31.440852])[0]+','+projection([121.223728,31.440852])[1]+') scale('+1+')'
                })

                d3.select('.specialOtherNovText')
                  .style('opacity',1)
              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(1500)
                .attr('transform',function(){
                  return 'translate('+projection([121.223728,31.440852])[0]+','+projection([121.223728,31.440852])[1]+') scale('+0+')'
                })
                d3.select('.specialOtherNovText')
                  .style('opacity',0.5)

              },
              progress: function(el, progress) {
                console.log("the special element's progress is:", progress);
              },
              offset: 0.3// enter at middle of viewport

            });


          }

          else if(d[0].type == "Books" && d[0].time[5] == '0'&&d[0].time[6] == '4'){
            d3.select('#hidingMap')
            .style('display','block')



            d3.select('.scrollingContent')
            .append('div')
            .attr('class','totalBook')
            .append('text')
            .text('April 2020, Lost Books in Shanghai')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',20)
            .attr('font-family','Pangolin')

            d3.select('.scrollingContent')
            .append('div')
            .attr('class','scrollInstruction')
            .append('text')
            .text('Scroll to see what books people lost ⬇️')
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
            .attr('class',function(d, i){
              return 'specialBookAprText' + i
            })
            .style('opacity',0.5)


            enterView({
              selector: '.specialBookApr0',
              enter: function(el) {
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.430502,31.213614])[0]+','+projection([121.430502,31.213614])[1]+') scale('+1+')'
                })
                d3.select('.specialBookAprText0')
                  .style('opacity',1)
              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.43807,31.224154])[0]+','+projection([121.43807,31.224154])[1]+') scale('+0+')'
                })
                d3.select('.specialBookAprText0')
                  .style('opacity',0.5)

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
                d3.select('.specialBookAprText0')
                  .style('opacity',0.5)
                d3.select('.specialBookAprText1')
                  .style('opacity',1)

              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.430502,31.213614])[0]+','+projection([121.430502,31.213614])[1]+') scale('+1+')'
                })
                d3.select('.specialBookAprText1')
                  .style('opacity',0.5)
                d3.select('.specialBookAprText0')
                  .style('opacity',1)

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
                d3.select('.specialBookAprText1')
                  .style('opacity',0.5)
                d3.select('.specialBookAprText2')
                  .style('opacity',1)

              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.53353,31.234807])[0]+','+projection([121.53353,31.234807])[1]+') scale('+1+')'
                })
                d3.select('.specialBookAprText2')
                  .style('opacity',0.5)
                d3.select('.specialBookAprText1')
                  .style('opacity',1)

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
                d3.select('.specialBookAprText2')
                  .style('opacity',0.5)
                d3.select('.specialBookAprText3')
                  .style('opacity',1)

              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.462056,31.255923])[0]+','+projection([121.462056,31.255923])[1]+') scale('+1+')'
                })
                d3.select('.specialBookAprText3')
                  .style('opacity',0.5)
                d3.select('.specialBookAprText2')
                  .style('opacity',1)

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
                d3.select('.specialBookAprText3')
                  .style('opacity',0.5)
                d3.select('.specialBookAprText4')
                  .style('opacity',1)

              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.445093,31.202531])[0]+','+projection([121.445093,31.202531])[1]+') scale('+1+')'
                })
                d3.select('.specialBookAprText4')
                  .style('opacity',0.5)
                d3.select('.specialBookAprText3')
                  .style('opacity',1)

              },
              offset: 0.5// enter at middle of viewport

            });


          }

          else if(d[0].type == "Books" && d[0].time[5] == '0'&&d[0].time[6] == '3'){
            d3.select('#hidingMap')
            .style('display','block')

            d3.select('.scrollingContent')
            .append('div')
            .attr('class','totalBook')
            .append('text')
            .text('March 2020, Lost Books in Shanghai')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',20)
            .attr('font-family','Pangolin')

            d3.select('.scrollingContent')
            .append('div')
            .attr('class','scrollInstruction')
            .append('text')
            .text('Scroll to see what books people lost ⬇️')
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
            .attr('class',function(d, i){
              return 'specialBookMarText' + i
            })
            .style('opacity',0.5)


            enterView({
              selector: '.specialBookMar0',
              enter: function(el) {
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.243527,30.843825])[0]+','+projection([121.243527,30.843825])[1]+') scale('+1+')'
                })
                d3.select('.specialBookMarText0')
                 .style('opacity',1)
              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.243527,30.843825])[0]+','+projection([121.243527,30.843825])[1]+') scale('+0+')'
                })
                d3.select('.specialBookMarText0')
                 .style('opacity',0.5)

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
                d3.select('.specialBookMarText0')
                 .style('opacity',0.5)
                d3.select('.specialBookMarText1')
                 .style('opacity',1)

              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.243527,30.843825])[0]+','+projection([121.243527,30.843825])[1]+') scale('+1+')'
                })
                d3.select('.specialBookMarText1')
                 .style('opacity',0.5)
                d3.select('.specialBookMarText0')
                 .style('opacity',1)


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
                d3.select('.specialBookMarText1')
                 .style('opacity',0.5)
                d3.select('.specialBookMarText2')
                 .style('opacity',1)


              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.46735,31.208615])[0]+','+projection([121.46735,31.208615])[1]+') scale('+1+')'
                })
                d3.select('.specialBookMarText2')
                 .style('opacity',0.5)
                d3.select('.specialBookMarText1')
                 .style('opacity',1)


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
                d3.select('.specialBookMarText2')
                 .style('opacity',0.5)
                d3.select('.specialBookMarText3')
                 .style('opacity',1)

              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.428896,31.185293])[0]+','+projection([121.428896,31.185293])[1]+') scale('+1+')'
                })
                d3.select('.specialBookMarText3')
                 .style('opacity',0.5)
                d3.select('.specialBookMarText2')
                 .style('opacity',1)

              },
              offset: 0.5// enter at middle of viewport

            });

          }else if(d[0].type == "Books" && d[0].time[5] == '0'&&d[0].time[6] == '2'){
            d3.select('#hidingMap')
            .style('display','block')

            d3.select('.scrollingContent')
            .append('div')
            .attr('class','totalBook')
            .append('text')
            .text('February 2020, Lost Books in Shanghai')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',20)
            .attr('font-family','Pangolin')

            d3.select('.scrollingContent')
            .append('div')
            .attr('class','scrollInstruction')
            .append('text')
            .text('Scroll to see what books people lost ⬇️')
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
            .style('opacity',0.5)
            .attr('class','specialBookFebText')


            enterView({
              selector: '.specialBookFeb',
              enter: function(el) {
                d3.select('.cashSpecialLocation')
                .transition().duration(1000)
                .attr('transform',function(){
                  return 'translate('+projection([121.464409,31.192698])[0]+','+projection([121.464409,31.192698])[1]+') scale('+1+')'
                })
                d3.select('.specialBookFebText')
                  .style('opacity',1)
              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(1000)
                .attr('transform',function(){
                  return 'translate('+projection([121.464409,31.192698])[0]+','+projection([121.464409,31.192698])[1]+') scale('+0+')'
                })
                d3.select('.specialBookFebText')
                  .style('opacity',0.5)

              },
              progress: function(el, progress) {
                console.log("the special element's progress is:", progress);
              },
              offset: 0.5// enter at middle of viewport

            });

          }
          else if(d[0].type == "Books" && d[0].time[5] == '1'&&d[0].time[6] == '2'){
            d3.select('#hidingMap')
            .style('display','block')

            console.log(d);
            d3.select('.scrollingContent')
            .append('div')
            .attr('class','totalBook')
            .append('text')
            .text('December 2019, Lost Books in Shanghai')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',20)
            .attr('font-family','Pangolin')

            d3.select('.scrollingContent')
            .append('div')
            .attr('class','scrollInstruction')
            .append('text')
            .text('Scroll to see what books people lost ⬇️')
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
            .style('opacity',0.5)
            .attr('class',function(d, i){
              console.log(i);
              return 'specialBookDecText' + i
            })


            enterView({
              selector: '.specialBookDec0',
              enter: function(el) {
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.428896,31.185293])[0]+','+projection([121.428896,31.185293])[1]+') scale('+1+')'
                })

                d3.select('.specialBookDecText0')
                  .style('opacity',1)
              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.428896,31.185293])[0]+','+projection([121.428896,31.185293])[1]+') scale('+0+')'
                })

                d3.select('.specialBookDecText0')
                  .style('opacity',0.5)

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

                d3.select('.specialBookDecText0')
                  .style('opacity',0.5)

                d3.select('.specialBookDecText1')
                  .style('opacity',1)


              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.428896,31.185293])[0]+','+projection([121.428896,31.185293])[1]+') scale('+1+')'
                })

                d3.select('.specialBookDecText0')
                  .style('opacity',1)

                  d3.select('.specialBookDecText1')
                    .style('opacity',0.5)

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

                d3.select('.specialBookDecText1')
                  .style('opacity',0.5)
                  d3.select('.specialBookDecText2')
                    .style('opacity',1)

              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.460549,31.258276])[0]+','+projection([121.460549,31.258276])[1]+') scale('+1+')'
                })
                d3.select('.specialBookDecText1')
                  .style('opacity',1)
                  d3.select('.specialBookDecText2')
                    .style('opacity',0.5)
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

                d3.select('.specialBookDecText2')
                  .style('opacity',0.5)
                  d3.select('.specialBookDecText3')
                    .style('opacity',1)

              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.435865,31.159439])[0]+','+projection([121.435865,31.159439])[1]+') scale('+1+')'
                })

                d3.select('.specialBookDecText2')
                  .style('opacity',1)
                d3.select('.specialBookDecText3')
                  .style('opacity',0.5)

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

                d3.select('.specialBookDecText3')
                  .style('opacity',0.5)
                d3.select('.specialBookDecText4')
                  .style('opacity',1)

              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.55837,31.325265])[0]+','+projection([121.55837,31.325265])[1]+') scale('+1+')'
                })

                d3.select('.specialBookDecText3')
                  .style('opacity',1)
                d3.select('.specialBookDecText4')
                  .style('opacity',0.5)

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
                d3.select('.specialBookDecText4')
                  .style('opacity',0.5)
                d3.select('.specialBookDecText5')
                  .style('opacity',1)

              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.346817,31.203347])[0]+','+projection([121.346817,31.203347])[1]+') scale('+1+')'
                })
                d3.select('.specialBookDecText4')
                  .style('opacity',1)
                d3.select('.specialBookDecText5')
                  .style('opacity',0.5)

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
                d3.select('.specialBookDecText5')
                  .style('opacity',0.5)
                d3.select('.specialBookDecText6')
                  .style('opacity',1)

              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.254481,31.372456])[0]+','+projection([121.254481,31.372456])[1]+') scale('+1+')'
                })
                d3.select('.specialBookDecText5')
                  .style('opacity',1)
                d3.select('.specialBookDecText6')
                  .style('opacity',0.5)

              },
              offset: 0.5// enter at middle of viewport

            });


          }
          else if(d[0].type == "Books" && d[0].time[5] == '0'&&d[0].time[6] == '1'){
            d3.select('#hidingMap')
            .style('display','block')

            d3.select('.scrollingContent')
            .append('div')
            .attr('class','totalBook')
            .append('text')
            .text('January 2020, Lost Books in Shanghai')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',20)
            .attr('font-family','Pangolin')

            d3.select('.scrollingContent')
            .append('div')
            .attr('class','scrollInstruction')
            .append('text')
            .text('Scroll to see what books people lost ⬇️')
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
            .attr('class',function(d, i){
              return 'specialBookJanText' + i
            })
            .style('opacity',0.5)


            enterView({
              selector: '.specialBookJan0',
              enter: function(el) {
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.409304,31.453863])[0]+','+projection([121.409304,31.453863])[1]+') scale('+1+')'
                })
                d3.select('.specialBookJanText0')
                  .style('opacity',1)
              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.409304,31.453863])[0]+','+projection([121.409304,31.453863])[1]+') scale('+0+')'
                })
                d3.select('.specialBookJanText0')
                  .style('opacity',0.5)

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
                d3.select('.specialBookJanText0')
                  .style('opacity',0.5)
                d3.select('.specialBookJanText1')
                  .style('opacity',1)

              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.409304,31.453863])[0]+','+projection([121.409304,31.453863])[1]+') scale('+1+')'
                })
                d3.select('.specialBookJanText1')
                  .style('opacity',0.5)
                d3.select('.specialBookJanText0')
                  .style('opacity',1)

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
                d3.select('.specialBookJanText1')
                  .style('opacity',0.5)
                d3.select('.specialBookJanText2')
                  .style('opacity',1)

              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.469808,31.234969])[0]+','+projection([121.469808,31.234969])[1]+') scale('+1+')'
                })
                d3.select('.specialBookJanText2')
                  .style('opacity',0.5)
                d3.select('.specialBookJanText1')
                  .style('opacity',1)

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
            .attr('class','totalBook')
            .append('text')
            .text('November 2019, Lost Books in Shanghai')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',20)
            .attr('font-family','Pangolin')

            d3.select('.scrollingContent')
            .append('div')
            .attr('class','scrollInstruction')
            .append('text')
            .text('Scroll to see what books people lost ⬇️')
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
            .attr('class',function(d, i){
              return 'specialBookNovText' + i
            })
            .style('opacity',0.5)

            enterView({
              selector: '.specialBookNov0',
              enter: function(el) {
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.441747,31.329018])[0]+','+projection([121.441747,31.329018])[1]+') scale('+1+')'
                })
                d3.select('.specialBookNovText0')
                .style('opacity',1)
              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.441747,31.329018])[0]+','+projection([121.441747,31.329018])[1]+') scale('+0+')'
                })
                d3.select('.specialBookNovText0')
                .style('opacity',0.5)

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
                d3.select('.specialBookNovText0')
                .style('opacity',0.5)
                d3.select('.specialBookNovText1')
                .style('opacity',1)

              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.441747,31.329018])[0]+','+projection([121.441747,31.329018])[1]+') scale('+1+')'
                })
                d3.select('.specialBookNovText1')
                .style('opacity',0.5)
                d3.select('.specialBookNovText0')
                .style('opacity',1)

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
                d3.select('.specialBookNovText1')
                .style('opacity',0.5)
                d3.select('.specialBookNovText2')
                .style('opacity',1)

              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.256655,30.827142])[0]+','+projection([121.256655,30.827142])[1]+') scale('+1+')'
                })
                d3.select('.specialBookNovText2')
                .style('opacity',0.5)
                d3.select('.specialBookNovText1')
                .style('opacity',1)

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
                d3.select('.specialBookNovText2')
                .style('opacity',0.5)
                d3.select('.specialBookNovText3')
                .style('opacity',1)

              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.44408,31.33585])[0]+','+projection([121.44408,31.33585])[1]+') scale('+1+')'
                })
                d3.select('.specialBookNovText3')
                .style('opacity',0.5)
                d3.select('.specialBookNovText2')
                .style('opacity',1)

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
                d3.select('.specialBookNovText3')
                .style('opacity',0.5)
                d3.select('.specialBookNovText4')
                .style('opacity',1)

              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.54022,31.184282])[0]+','+projection([121.54022,31.184282])[1]+') scale('+1+')'
                })
                d3.select('.specialBookNovText4')
                .style('opacity',0.5)
                d3.select('.specialBookNovText3')
                .style('opacity',1)

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
                d3.select('.specialBookNovText4')
                .style('opacity',0.5)
                d3.select('.specialBookNovText5')
                .style('opacity',1)

              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.384964,31.113468])[0]+','+projection([121.384964,31.113468])[1]+') scale('+1+')'
                })
                d3.select('.specialBookNovText5')
                .style('opacity',0.5)
                d3.select('.specialBookNovText4')
                .style('opacity',1)

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
                d3.select('.specialBookNovText5')
                .style('opacity',0.5)
                d3.select('.specialBookNovText6')
                .style('opacity',1)

              },
              exit: function(el) {
                console.log('bye');
                d3.select('.cashSpecialLocation')
                .transition().duration(800)
                .attr('transform',function(){
                  return 'translate('+projection([121.733438,31.044515])[0]+','+projection([121.733438,31.044515])[1]+') scale('+1+')'
                })
                d3.select('.specialBookNovText6')
                .style('opacity',0.5)
                d3.select('.specialBookNovText5')
                .style('opacity',1)

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
            .attr('class','totalBook')
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

            d3.select('.scrollingContent')
            .append('div')
            .attr('class','scrollInstruction')
            .append('text')
            .text('Scroll to see what dogs people lost ⬇️')
            .attr('x',500)
            .attr('y',height/2)
            .attr('font-size',20)
            .attr('font-family','Pangolin')


            var scrollingViz = d3.select(".scrollingContent")
            var dNoSpace
            scrollingViz.selectAll('.specialDogs').data(breeds).enter()
            .append('div')
            .attr('class',function(d, i){
              console.log(breeds.length,i);
              if(i == breeds.length-1){
                return 'specialDogsLast'
              }else{
                return 'specialDogs'
              }
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
            .style('opacity',0.5)
            .attr('class',function(d, i){
              return d  ;
            })


            enterView({
              selector: '.specialDogs',
              enter: function(el) {
                // console.log(d);
                console.log(el);
                var thisDog = []
                for(let i = 0;i<d.length;i++){
                  if(d[i].breed==el.id){
                    // console.log('yes');
                    thisDog.push(d[i])
                    console.log(thisDog);
                  }
                }
                var prevDogId;
                for(let i=0;i<breeds.length;i++){
                  if(breeds[i] == el.id){
                    prevDogId = breeds[i-1]
                  }
                }


                var thisDogID = el.id
                // console.log(el.id);
                for(let i=0;i<el.id.length;i++){
                  // console.log(el.id[i]);
                  if(el.id[i] == ' '){
                    thisDogID = el.id.slice(0, i)
                    break;
                  }
                }
                // console.log(thisDogID);
                d3.select('.'+thisDogID)
                  .style('opacity',1)

              if(prevDogId != null){
              for(let i=0;i<prevDogId.length;i++){
                // console.log(el.id[i]);
                if(prevDogId[i] == ' '){
                  prevDogId = prevDogId.slice(0, i)
                  break;
                }
              }
              d3.select('.'+prevDogId)
                .style('opacity',0.5)
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
                .attr('fill',function(){
                  return pallet[0]
                })
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
                var thisDogID = el.id
                // console.log(el.id);
                for(let i=0;i<el.id.length;i++){
                  // console.log(el.id[i]);
                  if(el.id[i] == ' '){
                    thisDogID = el.id.slice(0, i)
                    break;
                  }
                }
                // console.log(thisDogID);
                d3.select('.'+thisDogID)
                  .style('opacity',0.5)

                  var prevDogId;
                  for(let i=0;i<breeds.length;i++){
                    if(breeds[i] == el.id){
                      prevDogId = breeds[i-1]
                    }
                  }

                  if(prevDogId != null){
                  for(let i=0;i<prevDogId.length;i++){
                    // console.log(el.id[i]);
                    if(prevDogId[i] == ' '){
                      prevDogId = prevDogId.slice(0, i)
                      break;
                    }
                  }
                  d3.select('.'+prevDogId)
                    .style('opacity',1)
                }



                for(let i = 0;i<d.length;i++){
                  if(d[i].breed==el.id){
                    // console.log('yes');
                    thisDog.push(d[i-1])
                    console.log(thisDog);
                  }


                }
                let correspondingDatapoint = []
                for(let i=0;i<thisDog.length;i++){

                  correspondingDatapoint[i] = uniqueLonLat.find(function(datapoint){
                    // console.log(thisDog);
                    if(thisDog[0] != null && datapoint != null){
                    if(datapoint.location == thisDog[i].location){
                      return true;
                    }else{
                      return false
                    }
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
                  if(d != null){
                  lon = d.lonlat.split(',')[0];
                  lat = d.lonlat.split(',')[1];

                  return 'translate('+projection([lon,lat])[0]+','+projection([lon,lat])[1]+') scale('+0+')'
                }
                })
                .attr('fill',pallet[0])
                .style('opacity','0.5')
                .attr('class','cashSpecialLocation')


                d3.selectAll('.cashSpecialLocation')
                .transition().delay(100).duration(500)
                .attr('transform',function(d){
                  if(d != null){
                  lon = d.lonlat.split(',')[0];
                  lat = d.lonlat.split(',')[1];

                  return 'translate('+projection([lon,lat])[0]+','+projection([lon,lat])[1]+') scale('+1+')'
                }
                })

              },
              offset: 0.5// enter at middle of viewport

            });
            enterView({
              selector: '.specialDogsLast',
              enter: function(el) {
                // console.log(d);
                console.log(el);
                var thisDog = []
                for(let i = 0;i<d.length;i++){
                  if(d[i].breed==el.id){
                    // console.log('yes');
                    thisDog.push(d[i])
                    console.log(thisDog);
                  }
                }
                var prevDogId;
                for(let i=0;i<breeds.length;i++){
                  if(breeds[i] == el.id){
                    prevDogId = breeds[i-1]
                  }
                }


                var thisDogID = el.id
                // console.log(el.id);
                for(let i=0;i<el.id.length;i++){
                  // console.log(el.id[i]);
                  if(el.id[i] == ' '){
                    thisDogID = el.id.slice(0, i)
                    break;
                  }
                }
                // console.log(thisDogID);
                d3.select('.'+thisDogID)
                  .style('opacity',1)

              if(prevDogId != null){
              for(let i=0;i<prevDogId.length;i++){
                // console.log(el.id[i]);
                if(prevDogId[i] == ' '){
                  prevDogId = prevDogId.slice(0, i)
                  break;
                }
              }
              d3.select('.'+prevDogId)
                .style('opacity',0.5)
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
                .attr('fill',function(){
                  return pallet[0]
                })
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
                var thisDogID = el.id
                // console.log(el.id);
                for(let i=0;i<el.id.length;i++){
                  // console.log(el.id[i]);
                  if(el.id[i] == ' '){
                    thisDogID = el.id.slice(0, i)
                    break;
                  }
                }
                // console.log(thisDogID);
                d3.select('.'+thisDogID)
                  .style('opacity',0.5)

                for(let i = 0;i<d.length;i++){
                  if(d[i].breed==el.id){
                    // console.log('yes');
                    thisDog.push(d[i-1])
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
                .attr('fill',pallet[0])
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
          .attr('fill',function(){
            if(d[0].type == "Cash"){
              return pallet[0]
            }
            if(d[0].type == "Cards"){
              return pallet[1]
            }
            if(d[0].type == "ID Cards"){
              return pallet[2]
            }
            if(d[0].type == "Other"){
              return pallet[3]
            }
            if(d[0].type == "clothing"){
              return pallet[4]
            }
            if(d[0].type == "Jewellery"){
              return pallet[5]
            }
            if(d[0].type == "Keys"){
              return pallet[6]
            }
            if(d[0].type == "Bags"){
              return pallet[7]
            }
            if(d[0].type == "Water Bottles"){
              return pallet[8]
            }
            if(d[0].type == "Electronic devices"){
              return pallet[9]
            }
            if(d[0].type == "Wallets"){
              return pallet[10]
            }
            if(d[0].type == "Books"){
              return pallet[11]
            }
            if(d[0].type == "Umbrellas"){
              return pallet[12]
            }
            if(d[0].type == "Watches and Glasses"){
              return pallet[13]
            }
            if(d[0].type == "Dogs"){
              return pallet[14]
            }


            console.log(d[0].type);
          })
          .style('opacity',0.5)
          .on('mouseover',function(d,i){
            if(d.type == 'Dogs'){
              console.log(d.name);
              mapviz.append('text')
              .text(function(){
                return d.name
              })
              // .attr('x',d3.mouse(this)[0])
              // .attr('y',d3.mouse(this)[1])
              .attr('x',function(){
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
                return projection([lon, lat])[0]

              })
              .attr('y',function(){
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

              .attr('font-family','Permanent Marker')
              .style("font-size","20px")
              .attr('id',function(){
                return 'name'+d.number
              })
            }
          })
          .on('mouseout',function(d,i){
            d3.select('#name'+d.number).remove()

          })
          .attr('class','locations')

        })
      })


    })
  })
  .on('mouseover',function(d,i){
      console.log(d.length);
      viz.append('text')
      .text(function(){
        return d.length
      })
      .attr('transform',function(d,i){
        return 'translate('+width/2+','+height/2+')'
      })
      .attr('x',function(){
        return Math.sin(angleScale(Math.floor(i/6)))*rAxisScale(i%6)
      })
      .attr('y',function(){
        return Math.cos(angleScale(Math.floor(i/6)))*rAxisScale(i%6)
      })
      .attr('font-family','Permanent Marker')
      .style("font-size","20px")
      .attr('id',function(){
        return 'name'+d.number
      })
  })
  .on('mouseout',function(d,i){
    d3.select('#name'+d.number).remove()

  })
  .transition()
  .duration(2000)
  // .delay(1000)
  // .attr('transform',function(d,i){
  //   return 'translate('+width/2+','+height/2+')'
  // })
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

  viz.selectAll('.circless')
  .transition()
  .duration(2000)
  .attr('cx',function(d, i){
    return Math.sin(angleScale(Math.floor(i/6)))*rAxisScale(i%6)
  })
  .attr('cy',function(d, i){
    return Math.cos(angleScale(Math.floor(i/6)))*rAxisScale(i%6)
  })
  .attr('r',function(d, i){
    return rCircleScale(d.length + 10)
  })

  viz.selectAll('.circles')
  .transition()
  .delay(1000)
  .duration(2000)
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
  .attr('transform',function(d,i){
    return 'translate('+width/2+','+height/2+')'
  })

  viz.selectAll('.circless')
  .transition()
  .delay(1000)
  .duration(2000)
  .attr('cx',function(d, i){
    return Math.sin(angleScale(Math.floor(i/6)))*rAxisScale(i%6)
  })
  .attr('cy',function(d, i){
    return Math.cos(angleScale(Math.floor(i/6)))*rAxisScale(i%6)
  })
  .attr('r',function(d, i){
    return rCircleScale(d.length + 10)
  })
  .attr('transform',function(d,i){
    return 'translate('+width/2+','+height/2+')'
  })

})






function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
