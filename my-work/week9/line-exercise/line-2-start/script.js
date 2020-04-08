d3.json("births.json").then(gotData);


let w = 900;
let h = 500;
let xpadding = 100;
let ypadding = 50;
let viz = d3.select("#container")
  .append("svg")
    .style("width", w)
    .style("height", h)
    .style("outline", "solid black")
;


function gotData(incomingData){
  // the following function is defined below
  // it allows for us to NOT WORRY about parsing
  // time strings and creating JS date objects
  // in the following script
  incomingData = fixJSDateObjects(incomingData);
  console.log(incomingData);


  // temporarily flatten data to get the minima/maxima:
  let flatData = d3.merge(incomingData)
  // we can use a  time scale because our data expresses
  // years in the form of JS date objects
  let xDomain = d3.extent(flatData, function(d){ return d.year });
  let xScale = d3.scaleTime().domain(xDomain).range([xpadding, w-xpadding]);
  let xAxis = d3.axisBottom(xScale);
  let xAxisGroup = viz.append("g")
      .attr("class", "xaxisgroup")
      .attr("transform", "translate(0,"+(h-ypadding)+")")
  ;
  xAxisGroup.call(xAxis);

  let yMax = d3.max(flatData, function(d){
    return d.birthsPerThousand;
  })
  let yDomain = [0, yMax];
  let yScale = d3.scaleLinear().domain(yDomain).range([h-ypadding, ypadding]);
  let yAxis = d3.axisLeft(yScale);
  let yAxisGroup = viz.append("g")
      .attr("class", "yaxisgroup")
      .attr("transform", "translate("+(xpadding/2)+",0)")
  ;
  yAxisGroup.call(yAxis);


  let graphGroup = viz.append("g").attr("class", "graphGroup");

  let usaData = [];
  let chinaData = [];
  let usaDataArray = [];
  let chinaDataArray = [];

  for(i = 0; i < incomingData[0].length; i++){
    usaData.push(incomingData[0][i])
  }
  for(i = 0; i < incomingData[1].length; i++){
    chinaData.push(incomingData[1][i])
  }

  usaDataArray.push(usaData);
  chinaDataArray.push(chinaData);

  let inputData = usaDataArray;

  console.log('usaData',usaDataArray);
  console.log('chinaData',chinaDataArray);


  let lineMaker = d3.line()
    .x(function(d, i){
      return xScale(d.year);
    })
    .y(function(d, i){
      return yScale(d.birthsPerThousand);
    })
    ;

  graphGroup.selectAll('.line').data(inputData).enter()
    .append('path')
    .attr('d',lineMaker)
    .attr('fill','none')
    .attr('stroke','blue')
    .attr('stroke-width',5)
    .attr('class','line');


  // graphGroup.selectAll('.line').data(incomingData).enter()
  //   .append('path')
  //   .attr('d',lineMaker)
  //   .attr('fill','none')
  //   .attr('stroke','black')
  //   .attr('stroke-width',5)
  //   .attr('class','line')
  //   .attr('stroke',function(d, i){
  //     if(d[0].country == "United States"){
  //       return "blue";
  //     }else{
  //       return 'red';
  //     }
  //   })

  function usaLine(){
    inputData = usaDataArray;
    console.log(inputData);
    graphGroup.selectAll('.line').data(inputData)
    .transition().duration(500)
      .attr('d',lineMaker)
      .attr('stroke','blue')

  }

  function chinaLine(){
    console.log('china');
    inputData = chinaDataArray;
    console.log(inputData);
    graphGroup.selectAll('.line').data(inputData)
    .transition().duration(500)
      .attr('d',lineMaker)
      .attr('stroke','red')

  }

  document.getElementById("usa").addEventListener("click", usaLine);
  document.getElementById("china").addEventListener("click", chinaLine);

}

// function that turns all datapoints year values
// into JS date objects in the very beginning
// so that WE DON'T HAVE TO DEAL WITH IT LATER
function fixJSDateObjects(dataToFix){
  // timeParser
  let timeParse = d3.timeParse("%Y");
  return dataToFix.map(function(data){
    return data.map(function(d){
      return {
        "country": d.country,
        "year": timeParse(d.year),
        "birthsPerThousand": d.birthsPerThousand
      }
    })
  });
}
