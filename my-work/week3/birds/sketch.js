console.log('js loaded');

let viz = d3.select('#viz-container')
  .append('svg')
    .attr('id','viz')
    .attr('width',2000)
    .attr('height',820)
;

d3.json('data.json').then(gotData);


function xLocation(datapoint){
  // console.log(new Date(datapoint.whatTimeIsIt).getHours() - 8);
  let hours = (new Date(datapoint.whatTimeIsIt).getHours() - 8)*60;
  let minutes = new Date(datapoint.whatTimeIsIt).getMinutes()
  return (hours + minutes) * 3
}

function xLocation1(datapoint){
  return parseInt(xLocation(datapoint) + 5);
}

function xLocation2(datapoint){
  return parseInt(xLocation1(datapoint) + 23);
}

function wing(datapoint){
  if(datapoint.whereAmI == 'dining room'){
    return 'black'
  }
  if(datapoint.whereAmI == 'my balcony'){
    return 'white'
  }
  if(datapoint.whereAmI == 'garden'){
    return 'transparent'
  }
  if(datapoint.whereAmI == 'my bedroom'){
    return 'transparent'
  }
}

function wingColor(datapoint){
  if(datapoint.whereAmI == 'dining room'){
    return 'transparent'
  }
  if(datapoint.whereAmI == 'my balcony'){
    return 'white'
  }
  if(datapoint.whereAmI == 'garden'){
    return 'grey'
  }
  if(datapoint.whereAmI == 'my bedroom'){
    return 'transparent'
  }
}


function width(datapoint){
  // if(datapoint.howLongDidTheSoundLast.charAt(1) == 'm'){
  //   return parseInt(datapoint.howLongDidTheSoundLast.charAt(0))*5
  // }
  // if(datapoint.howLongDidTheSoundLast.charAt(2) == 'm'){
  //   return parseInt(datapoint.howLongDidTheSoundLast.charAt(0)+datapoint.howLongDidTheSoundLast.charAt(1))*5
  // }
  // if(datapoint.howLongDidTheSoundLast.charAt(2) == 's'){
  //   return parseInt(datapoint.howLongDidTheSoundLast.charAt(0)+datapoint.howLongDidTheSoundLast.charAt(1))
  // }
  return 20;
}


function yLocation(datapoint){
  // console.log(datapoint.howManyBirds)
  // console.log(datapoint.date);
  if (datapoint.date == '2.24'){
    return 100 - 55;
  }
  if (datapoint.date == '2.25'){
    return 200 - 55;
  }
  if (datapoint.date == '2.26'){
    return 300 - 55;
  }
  if (datapoint.date == '2.27'){
    return 400 - 55;
  }
  if (datapoint.date == '2.28'){
    return 500 - 55;
  }
  if (datapoint.date == '2.29'){
    return 600 - 55;
  }
  if (datapoint.date == '3.1'){
    return 700 - 55;
  }
}


function yLocation1(datapoint){
  return parseInt(yLocation(datapoint) - 30)
}

function yLocation2(datapoint){
  return parseInt(yLocation1(datapoint) + 45);
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
  if(datapoint.sound == '1'){
    return 'rgb(155,144,194)'
  }
  if(datapoint.sound == '2'){
    return 'rgb(248,195,205)'
  }
  if(datapoint.sound == '3'){
    return 'rgb(181,202,160)'
  }
  if(datapoint.sound == '4'){
    return 'rgb(235,122,119)'
  }
  if(datapoint.sound == '6'){
    return 'rgb(129,199,212)'
  }
  else{
    return 'rgb(215,196,187)'
  }




}

function weather(datapoint){
  if(datapoint.weather == 'sunny'){
    return 'M19.75,46.84c8.27,7.1,18.51,6.2,19.9,6A27.81,27.81,0,0,0,58.76,41.75c36.79,4.15,46,4,46.14,2.78.26-1.88-20.72-4.62-45.7-20.32-4.94-3.11-9.65-6.61-9.65-6.61l-.33-.25a14.45,14.45,0,0,0-1.47-9.6C45.29,3.35,41.12,1.83,39,1.06a19,19,0,0,0-13.44.14,18.8,18.8,0,0,0-8.34,6.71L7.4,1.48l6.43,9.26-11.12.31,9.84,3.8C8.33,26.78,11.26,39.54,19.75,46.84Z';
  }
  if(datapoint.weather == 'cloudy'){
    return 'M14.89,40.05c4.74,7.56,14,13.79,24.76,12.84,11.54-1,18.08-9.72,19.11-11.14,36.79,4.15,46,4,46.14,2.78.26-1.88-20.72-4.62-45.7-20.32-4.93-3.11-9.63-6.6-9.65-6.61h0l.65.48A17.47,17.47,0,0,0,47,6.53,17.7,17.7,0,0,0,37.14,0,21.06,21.06,0,0,0,21.23,2.12a21.27,21.27,0,0,0-9.54,12.44l-12.8-2.22,10.72,7.2L-2.46,23.38l13.23,1.17A27.87,27.87,0,0,0,14.89,40.05Z';
  }
  if(datapoint.weather == 'rainy'){
    return 'M12.67,29.2C15.5,45.68,27.85,56.47,39.75,55.55c11.51-.89,18.23-12.41,19-13.8,36.79,4.15,46,4,46.14,2.78.26-1.88-20.72-4.62-45.7-20.32a148.82,148.82,0,0,1-12.54-8.82C45,7.91,40,2,33.69.44,25.39-1.67,16,4,12.67,14.14A26.24,26.24,0,0,1,8,17.5C3.66,20-.06,20.36,0,21s4.78-.3,8.64,2.51A12.25,12.25,0,0,1,12.67,29.2';
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

function birdLocation(datapoint){
  return "translate("+xLocation(datapoint)+','+yLocation(datapoint)+')'
}

function gotData(incomingData){
  let datagroups = viz.selectAll('.datagroup').data(incomingData).enter()
    .append('g')
      .attr('class','datagroup')
  ;


  // datagroups.append('circle')
  //   .attr('cx',xLocation)
  //   .attr('cy',yLocation)
  //   .attr('r',width)
  //   .attr('fill',color)
  //   .attr('stroke','black')
  //
  // datagroups.append('circle')
  //   .attr('cx',xLocation1)
  //   .attr('cy',yLocation1)
  //   .attr('r',width)
  //   .attr('fill',color)
  //   .attr('stroke','black')
  //
  // datagroups.append('line')
  //   .attr('x1',xLocation1)
  //   .attr('y1',yLocation1)
  //   .attr('x2',xLocation2)
  //   .attr('y2',yLocation2)
  //   .attr('stroke','black')


  datagroups.append('path')
    .attr('d',weather)
    .attr('transform',birdLocation)
    .attr('fill',color)
    .attr('stroke','transparent');



  datagroups.append('circle')
    .attr('cx',xLocation2)
    .attr('cy',yLocation2)
    .attr('stroke','black')
    .attr('r',2);

      datagroups.append('path')
        .attr('d',"M25.33,30.27A17.1,17.1,0,0,1,40,32,17.07,17.07,0,0,1,47.26,44.1a17.1,17.1,0,0,1-16.94-3.38A16.61,16.61,0,0,1,25.33,30.27Z")
        .attr('stroke',wing)
        .attr('fill',wingColor)
        .attr('stroke-width',1)
        .attr('transform',birdLocation)

  // viz.selectAll('circle').data(incomingData).enter()
  //   .append('rect')
  //     .attr('x',xLocation)
  //     .attr('y',yLocation)
  //     .attr('width',width)
  //     .attr('height',height)
  //     .attr('fill',color)
  //     .attr('stroke','white')
  //     ;
  //
  viz.selectAll('line').data(incomingData).enter()
    .append('line')
      .attr('x1',10)
      .attr('y1',y1)
      .attr('x2',1900)
      .attr('y2',y1)
      .attr('stroke','black')
      .attr('stroke-width',0.5)
}
