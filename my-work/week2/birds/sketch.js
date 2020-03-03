console.log('js loaded');

let viz = d3.select('#viz-container')
  .append('svg')
    .attr('id','viz')
    .attr('width',1440)
    .attr('height',820)
;

d3.json('data.json').then(gotData);

function yLocation(datapoint){
  // console.log(datapoint.howManyBirds)
  console.log(datapoint.date);
  if (datapoint.date == '2.24'){
    return 100;
  }
  if (datapoint.date == '2.25'){
    return 200;
  }
  if (datapoint.date == '2.26'){
    return 300;
  }
  if (datapoint.date == '2.27'){
    return 400;
  }
  if (datapoint.date == '2.28'){
    return 500;
  }
  if (datapoint.date == '2.29'){
    return 600;
  }
  if (datapoint.date == '3.1'){
    return 700;
  }


}

function xLocation(datapoint){
  console.log(new Date(datapoint.whatTimeIsIt).getHours() - 8);
  let hours = (new Date(datapoint.whatTimeIsIt).getHours() - 8)*60;
  let minutes = new Date(datapoint.whatTimeIsIt).getMinutes()
  return hours + minutes
}

function width(datapoint){
  // console.log(datapoint.howLongDidTheSoundLast)
  if(datapoint.howLongDidTheSoundLast.charAt(1) == 'm'){
    return parseInt(datapoint.howLongDidTheSoundLast.charAt(0))*10
  }
  if(datapoint.howLongDidTheSoundLast.charAt(2) == 'm'){
    return parseInt(datapoint.howLongDidTheSoundLast.charAt(0)+datapoint.howLongDidTheSoundLast.charAt(1))*10
  }
  if(datapoint.howLongDidTheSoundLast.charAt(2) == 's'){
    return parseInt(datapoint.howLongDidTheSoundLast.charAt(0)+datapoint.howLongDidTheSoundLast.charAt(1))
  }
}

function height(datapoint){
  if(isNaN(datapoint.howManyBirds)){
    return 90;
  }
  else{
  return datapoint.howManyBirds*10;
}
}

function color(datapoint){
  if(datapoint.weather == 'sunny'){
    return 'orange';
  }
  if(datapoint.weather == 'cloudy'){
    return 'white';
  }
  if(datapoint.weather == 'rainy'){
    return 'blue';
  }

}

function y1(datapoint){
  if (datapoint.date == '2.24'){
    return 100;
  }
  if (datapoint.date == '2.25'){
    return 200;
  }
  if (datapoint.date == '2.26'){
    return 300;
  }
  if (datapoint.date == '2.27'){
    return 400;
  }
  if (datapoint.date == '2.28'){
    return 500;
  }
  if (datapoint.date == '2.29'){
    return 600;
  }
  if (datapoint.date == '3.1'){
    return 700;
  }


}

function gotData(incomingData){
  viz.selectAll('circle').data(incomingData).enter()
    .append('rect')
      .attr('x',xLocation)
      .attr('y',yLocation)
      .attr('width',width)
      .attr('height',height)
      .attr('fill',color)
      .attr('stroke','white')
      ;

  viz.selectAll('line').data(incomingData).enter()
    .append('line')
      .attr('x1',0)
      .attr('y1',y1)
      .attr('x2',1000)
      .attr('y2',y1)
      .attr('stroke','black')
      .attr('stroke-width',2)
}
