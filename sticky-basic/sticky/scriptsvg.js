let w = window.innerWidth;
let h = window.innerHeight;
console.log('hello');

document.getElementById('visualizationWrapper').style.width = w/2+'px';
document.getElementById('visualizationWrapper').style.height = h/2+'px';


let viz = d3.select('#visualizationWrapper').append('svg')
  .attr('width',w)
  .attr('height',h)
  .attr('class','viz')
  .attr('background-color','black')

let xScale = d3.scaleLinear().domain([0,100]).range([0,w])
let yScale = d3.scaleLinear().domain([0,100]).range([0,w])

let data = [[50,50]];

viz.append('circle')
  .attr('cx',50)
  .attr('cy',50)
  .attr('r',50)
  .attr('stroke','black')
