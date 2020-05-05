let w = 1200;
let h = 800;
let padding = 90;
let backbtShow = false;
let backbt = document.getElementById('backbt');

// SVG
let viz = d3.select("#container").append("svg")
    .style("width", w)
    .style("height", h)
    .style("background-color", "lavender")
;


// IMPORT DATA
d3.json("mainland.geojson").then(function(geoData){
  d3.csv('china-pop-2018.csv').then(function(incomingData){

    console.log(incomingData);

    incomingData.map(function(d, i){
      d.population = Number(d.population);
      return d
    })

    let minPop = d3.min(incomingData, function(d, i){
      return d.population
    })
    let maxPop = d3.max(incomingData, function(d, i){
      return d.population
    })

    console.log('minPop',minPop);
    console.log('maxPop',maxPop);

    let colorScale = d3.scaleLinear().domain([minPop,maxPop]).range(['white','#808F7C']);
    let circleScale = d3.scaleLinear().domain([minPop, maxPop]).range([10,50])

    // PRINT DATA
    console.log(geoData);

    // SCALES (to translate data values to pixel values)
    // let xDomain = d3.extent(incomingData, function(d){ return Number(d.year); })
    // let xScale = d3.scaleLinear().domain(xDomain).range([padding,w-padding]);
    // let yDomain = d3.extent(incomingData, function(d){ return Number(d.birthsPerThousand); })
    // let yScale = d3.scaleLinear().domain(yDomain).range([h-padding,padding]);

    let projection = d3.geoEqualEarth()
      .translate([w/2,h/2])
      // .angle(-4)
      // .rotate([-15,4,4])
      .fitExtent([[padding,padding], [w-padding,h-padding]],geoData);

    let pathMaker = d3.geoPath(projection);

    // PATH (line) MAKER - gets points, returns one of those complicated looking path strings
    // let lineMaker = d3.line()
    //     .x(function(d){
    //       return xScale(Number(d.year));
    //     })
    //     .y(function(d){
    //       return yScale(Number(d.birthsPerThousand));
    //     })
    // ;



    // CREATE SHAPES ON THE PAGE!
    viz.selectAll(".provinces").data(geoData.features).enter()
      .append("path")
        .attr("class", "provinces")
        .attr("d", pathMaker)
        .attr('id',function(d){
          if(d.properties.name == 'Inner Mongol'){
            return "innerMongol"
          }else{
          return d.properties.name;
        }
        })
        .attr("fill", function(d, i){
          // return colorScale(d.population)
          console.log(d.properties.name);
          let correspondingDatapoint = incomingData.find(function(datapoint){
            console.log(datapoint);
            if(datapoint.province == d.properties.name){
              return true;
            }else{
              return false
            }
          })
          if(correspondingDatapoint != undefined){
            console.log('corresponding'+correspondingDatapoint);
            return colorScale(correspondingDatapoint.population)
          }else{
            return 'black'
          }
        })
        .attr("stroke", "#CAAD5F")
        .attr("stroke-width", 1)
        .on('mouseover',function(d){

          // console.log(d);
          viz.append('text')
            .text(function(){
              return d.properties.name
            })
            // .attr('x',50)
            .attr('x',d3.mouse(this)[0])
            // .attr('y',50)
            .attr('y',d3.mouse(this)[1])
            .attr('id',function(){
              if(d.properties.name == 'Inner Mongol'){
                return "innerMongolText"
              }else{
              return d.properties.name + 'Text';
            }
            })
            .style("font-size","30px");

            viz.append('text')
            .text(function(){
              let correspondingDatapoint = incomingData.find(function(datapoint){
                // console.log(datapoint);
                if(datapoint.province == d.properties.name){
                  return true;
                }else{
                  return false
                }
              })
                console.log('corresponding'+correspondingDatapoint);
              let pop = correspondingDatapoint.population

              return " Population: "+ pop
            })
            .attr('x',50)
            // .attr('x',d3.mouse(this)[0])
            .attr('y',100)
            // .attr('y',d3.mouse(this)[1])
            .attr('id',function(){
              if(d.properties.name == 'Inner Mongol'){
                return "innerMongolPop"
              }else{
              return d.properties.name + 'Pop';
            }
            })
            .style("font-size","30px");

        })
        .on("mouseout",function(d){
          d3.select("#"+d.properties.name + "Text").remove();
          d3.select("#innerMongolText").remove();
          d3.select("#"+d.properties.name + "Pop").remove();
          d3.select("#innerMongolPop").remove();
        })
        .on('click',function(d){
          console.log(d.properties.latitude);
          backbt.style.opacity = '1';
          viz.selectAll('circle').style('opacity','0')
          let lat = d.properties.latitude;
          let lon = d.properties.longitude;
          let scaleNum;
          if(d.properties.name == 'Shanghai'||d.properties.name == 'Beijing'|| d.properties.name == 'Tianjin'){
            scaleNum = 40000;
          }else if(d.properties.name == 'Xizang'||d.properties.name == 'Xinjiang'||d.properties.name == 'Qinghai'||d.properties.name == 'Inner Mongol'||d.properties.name == 'Gansu'){
            scaleNum = 5000;
          }
          else{
            scaleNum = 10000;
          }
          projection = d3.geoEqualEarth()
            .translate([w/2,h/2])
            .scale(scaleNum)
            .center([lon, lat]);
          pathMaker = d3.geoPath(projection);
          viz.selectAll('path').data(geoData.features)
          .transition().duration(1000)
            .attr("d", pathMaker)

        })
        .style('cursor','pointer');

        // .style('cursor','hand')


    let lat = 31.22749
    let lon = 121.53007

    // function largeShanghai(){
    //   console.log('largeShanghai');
    //   backbtShow = true;
    //   backbt.style.opacity = '1';
    //   projection = d3.geoEqualEarth()
    //     .translate([w/2,h/2])
    //     .scale(40000)
    //     .center([121.53007, 31.22749]);
    //     pathMaker = d3.geoPath(projection);
    //     viz.selectAll('path').data(geoData.features)
    //     .transition().duration(1000)
    //       .attr("d", pathMaker)
    //       // .attr('stroke','blue')
    // }
    //
    // function largeTianjin(){
    //   console.log('largeTianjin');
    //   backbt.style.opacity = '1';
    //   projection = d3.geoEqualEarth()
    //     .translate([w/2,h/2])
    //     .scale(40000)
    //     .center([117.177,39.140]);
    //     pathMaker = d3.geoPath(projection);
    //     viz.selectAll('path').data(geoData.features)
    //     .transition().duration(1000)
    //       .attr("d", pathMaker)
    // }
    // function largeBeijing(){
    //   backbt.style.opacity = '1';
    //   projection = d3.geoEqualEarth()
    //     .translate([w/2,h/2])
    //     .scale(35000)
    //     .center([116.392,40.106]);
    //     pathMaker = d3.geoPath(projection);
    //     viz.selectAll('path').data(geoData.features)
    //     .transition().duration(1000)
    //       .attr("d", pathMaker)
    // }
    //
    // viz.select("#Shanghai")
    //     .on('click',largeShanghai)
    //     .style('cursor','pointer');
    // viz.select("#Tianjin")
    //     .on('click',largeTianjin)
    //     .style('cursor','pointer');
    // viz.select("#Beijing")
    //     .on('click',largeBeijing)
    //     .style('cursor','pointer');



    // let pixelvalue = projection([lon, lat])

    viz.selectAll("circle").data(geoData.features).enter()
      .append('circle')
      .attr('cx',function(d){
        let lat = d.properties.latitude;
        let lon = d.properties.longitude;
        return projection([lon, lat])[0]
      })
      .attr('cy',function(d){
        let lat = d.properties.latitude;
        let lon = d.properties.longitude;
        return projection([lon, lat])[1]
      })
      .attr('r',function(d){
        let correspondingDatapoint = incomingData.find(function(datapoint){
          if(datapoint.province == d.properties.name){
            return true;
          }else{
            return false
          }
        })
        if(correspondingDatapoint != undefined){
          console.log('corresponding'+correspondingDatapoint);
          return circleScale(correspondingDatapoint.population);
        }
      })
      .attr('stroke','#CAAD5F')
      .attr('fill','#808F7C')
      .style('opacity','0.5')
      .style('pointer-events','none');


    backbt.addEventListener('click',function(){
      viz.selectAll('circle')
      .transition().delay(1000)
        .style('opacity','0.5')
      projection = d3.geoEqualEarth()
        .translate([w/2,h/2])
        .fitExtent([[padding,padding], [w-padding,h-padding]],geoData);
        pathMaker = d3.geoPath(projection);
        viz.selectAll('path').data(geoData.features)
        .transition().duration(1000)
          .attr("d", pathMaker)
          // console.log('back');
    })

  })
})
