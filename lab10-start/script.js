let w = 1200;
let h = 800;
let padding = 90

let viz = d3.select("#container").append("svg")
    .style("width", w)
    .style("height", h)
    .style("background-color", "lavender")
;


// initialise scales
let xScale = d3.scaleTime().range([padding, w-padding]);
let yScale = d3.scaleBand().range([padding, h-padding]);

let textElement = viz.append('text')
  .attr('x',w/2)
  .attr('y',padding/2)
  .attr('class','description')

// get data
d3.json("monarchs.json").then(function(incomingData){
  data = formatData(incomingData);
  let types = data.map(d=>d.type).filter(onlyUnique); //see onlyUnique function at bottom
  console.log(types);

  // xscale and axis
  xScale.domain( d3.extent(data, d=>d.date) )
  let xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%-Y"));
  let xAxisGroup = viz.append("g")
      .attr("class", "xaxisgroup")
      .attr("transform", "translate(0,"+(h-padding)+")")
  ;
  xAxisGroup.call(xAxis);
  //yscale and axis
  yScale.domain(types);
  let yAxis = d3.axisLeft(yScale);
  let yAxisGroup = viz.append("g")
      .attr("class", "yaxisgroup")
      .attr("transform", "translate("+padding/2+",0)")

  ;
  yAxisGroup.call(yAxis);
  // style the y axis
  yAxisGroup.selectAll("line").attr("display", "none");
  yAxisGroup.selectAll("path").attr("display", "none");
  yAxisGroup.selectAll("text")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("x", "0")
  ;


  let graphGroup = viz.append("g").attr("class", "graphgroup");
  let datagroups = graphGroup.selectAll(".datagroup").data(data).enter()
    .append("g")
      .attr("class", "datagroup")
      .attr("transform", function(d){
        console.log(d);
        return "translate("+ xScale(d.date) +","+ (yScale(d.type) + yScale.bandwidth()/2 )+")"
      })
      .on('mouseover',function(d,i){
        // console.log(this);
        console.log(d3.event.clientX);
        console.log(d3.mouse(viz.node()));
        let mouseInSVG = d3.mouse(viz.node())
        textElement.text(d.event)
        .transition()
          .attr('x',mouseInSVG[0])
          .attr('y',mouseInSVG[1]-15)

        d3.select(this).select('circle')
          .attr('r',20)
      })
      .on('mouseout',function(d,i){
        // console.log(this);

        d3.select(this).select('circle')
        .transition().duration(1000)
          .attr('r',10)
      })

      //work on every other circle except the one mouseover
  //     .on('mouseover',function(d,i){
  //       // datagroups.attr('opacity', 0.1)
  //       // d3.select(this)
  //       //   .attr('opacity',1)
  //       //or
  //       datagroups.filter(function(datapoint){
  //         if(datapoint == d){
  //           return false
  //         }else{
  //           return true
  //         }
  //       })
  //       .select('circle')
  //       .transition()
  //       .delay(function(d, i){
  //         return i*10
  //       })
  //       .attr('r', 1)
  //     })
  //     .on('mouseout',function(d,i){
  //       datagroups.select('circle')
  //               .transition()
  //               .attr('r', 10)
  //     })
  // ;

  datagroups.append("circle")
    .attr("r", 10)
    .attr("opacity", 0.5)
  ;

  // datagroups.append('text')
  //   .text('circle')
  //   .attr('x', -19)
  //   .attr('y',23)






});


let timeParse = d3.timeParse("%Y");

function formatData(incoming){
  let keys = Object.keys(incoming.Dates);
  return keys.map((d)=>{
    incoming.Dates[d].date = timeParse(incoming.Dates[d].date)
    return incoming.Dates[d];
  });

}

//from: https://stackoverflow.com/a/14438954
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
