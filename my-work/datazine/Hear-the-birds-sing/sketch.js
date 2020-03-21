console.log('js loaded');

let viz = d3.select('#container')
.append('svg')
.attr('id','viz')
.attr('width',2400)
.attr('height',820)
;

let image = viz
  .append('image')
  .attr('xlink:href','middle-background.png')
  .attr('width',2400)
  .attr('height',800)
  ;


d3.json('data.json').then(gotData);


function xLocation(datapoint){
  // console.log(new Date(datapoint.whatTimeIsIt).getHours() - 8);
  let hours = (new Date(datapoint.whatTimeIsIt).getHours() - 8)*60;
  let minutes = new Date(datapoint.whatTimeIsIt).getMinutes()
  return (hours + minutes) * 3
}

// function xLocation1(datapoint){
//   return parseInt(xLocation(datapoint) + 5);
// }
//
// function xLocation2(datapoint){
//   return parseInt(xLocation1(datapoint) + 23);
// }

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


function yLocation(datapoint){
  if (datapoint.date == '2020-02-23T16:00:00.000Z'){
    return 100 - 55;
  }
  if (datapoint.date == '2020-02-24T16:00:00.000Z'){
    return 200 - 55;
  }
  if (datapoint.date == '2020-02-25T16:00:00.000Z'){
    return 300 - 55;
  }
  if (datapoint.date == '2020-02-26T16:00:00.000Z'){
    return 400 - 55;
  }
  if (datapoint.date == '2020-02-27T16:00:00.000Z'){
    return 500 - 55;
  }
  if (datapoint.date == '2020-02-28T16:00:00.000Z'){
    return 600 - 55;
  }
  if (datapoint.date == '2020-02-29T16:00:00.000Z'){
    return 700 - 55;
  }
  // let dateScale = d3.scaleTime().domain([])
}


// function yLocation1(datapoint){
//   return parseInt(yLocation(datapoint) - 30)
// }
//
// function yLocation2(datapoint){
//   return parseInt(yLocation1(datapoint) + 45);
// }


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


function note2Color(datapoint){
  if(datapoint.howManyBirds == "1"){
    return 'transparent'
  }else{
    return 'black';
  }
}

function note3Color(datapoint){
  if(datapoint.howManyBirds == "1" || datapoint.howManyBirds == "2"){
    return 'transparent'
  }else{
    return 'black'
  }
}

function note4Color(datapoint){
  if(datapoint.howManyBirds == "more that I can't tell"){
    return 'black';
  }else{
    return 'transparent';
  }
}

function weather(datapoint){
  // console.log('datapoint'+datapoint);
  if(datapoint.weather == 'sunny'){
    return 'M19.75,46.84c8.27,7.1,18.51,6.2,19.9,6A27.81,27.81,0,0,0,58.76,41.75c36.79,4.15,46,4,46.14,2.78.26-1.88-20.72-4.62-45.7-20.32-4.94-3.11-9.65-6.61-9.65-6.61l-.33-.25a14.45,14.45,0,0,0-1.47-9.6C45.29,3.35,41.12,1.83,39,1.06a19,19,0,0,0-13.44.14,18.8,18.8,0,0,0-8.34,6.71L7.4,1.48l6.43,9.26-11.12.31,9.84,3.8C8.33,26.78,11.26,39.54,19.75,46.84Z';
  }
  if(datapoint.weather == 'cloudy'){
    return 'M14.89,40.05c4.74,7.56,14,13.79,24.76,12.84,11.54-1,18.08-9.72,19.11-11.14,36.79,4.15,46,4,46.14,2.78.26-1.88-20.72-4.62-45.7-20.32-4.93-3.11-9.63-6.6-9.65-6.61h0l.65.48A17.47,17.47,0,0,0,47,6.53,17.7,17.7,0,0,0,37.14,0,21.06,21.06,0,0,0,21.23,2.12a21.27,21.27,0,0,0-9.54,12.44l-12.8-2.22,10.72,7.2L-2.46,23.38l13.23,1.17A27.87,27.87,0,0,0,14.89,40.05Z';
  }
  if(datapoint.weather == 'rainy'){
    // return 'M12.67,29.2C15.5,45.68,27.85,56.47,39.75,55.55c11.51-.89,18.23-12.41,19-13.8,36.79,4.15,46,4,46.14,2.78.26-1.88-20.72-4.62-45.7-20.32a148.82,148.82,0,0,1-12.54-8.82C45,7.91,40,2,33.69.44,25.39-1.67,16,4,12.67,14.14A26.24,26.24,0,0,1,8,17.5C3.66,20-.06,20.36,0,21s4.78-.3,8.64,2.51A12.25,12.25,0,0,1,12.67,29.2';
    return 'M14.89,40.05c4.74,7.56,14,13.79,24.76,12.84,11.54-1,18.08-9.72,19.11-11.14,36.79,4.15,46,4,46.14,2.78.26-1.88-20.72-4.62-45.7-20.32-4.93-3.11-9.63-6.6-9.65-6.61h0l.65.48A17.47,17.47,0,0,0,47,6.53,17.7,17.7,0,0,0,37.14,0,21.06,21.06,0,0,0,21.23,2.12a21.27,21.27,0,0,0-9.54,12.44l-12.8-2.22,10.72,7.2L-2.46,23.38l13.23,1.17A27.87,27.87,0,0,0,14.89,40.05Z';

  }

}

function y1(datapoint){
  if (datapoint.date == '2020-02-23T16:00:00.000Z'){
    return 100;
  }
  if (datapoint.date == '2020-02-24T16:00:00.000Z'){
    return 200;
  }
  if (datapoint.date == '2020-02-25T16:00:00.000Z'){
    return 300;
  }
  if (datapoint.date == '2020-02-26T16:00:00.000Z'){
    return 400;
  }
  if (datapoint.date == '2020-02-27T16:00:00.000Z'){
    return 500;
  }
  if (datapoint.date == '2020-02-28T16:00:00.000Z'){
    return 600;
  }
  if (datapoint.date == '2020-02-29T16:00:00.000Z'){
    return 700;
  }
}

function circleEye(datapoint){
  if(datapoint.weather == 'sunny'){
    return 'black'
  }
  if(datapoint.weather == 'cloudy'){
    return 'black';
  }
  if(datapoint.weather == 'rainy'){
    return 'transparent'
  }
}

function lineEye(datapoint){
  if(datapoint.weather == 'sunny'){
    return 'transparent'
  }
  if(datapoint.weather == 'cloudy'){
    return 'transparent';
  }
  if(datapoint.weather == 'rainy'){
    return 'black'
  }

}

function getTime(datapoint){
  // console.log(datapoint.whatTimeIsIt);
  let hours = new Date(datapoint.whatTimeIsIt).getHours()*60;
  let minutes = new Date(datapoint.whatTimeIsIt).getMinutes();
  let newTime = hours + minutes;

  return newTime
}

function mapDate(datapoint){
  datapoint.date = new Date(datapoint.date);
  return datapoint;
}

function transformData(dataToTransform){
  let dateCorrected = dataToTransform.map(mapDate);
  return dateCorrected;
}


function mapTime(datapoint){
  datapoint.whatTimeIsIt = (new Date(datapoint.whatTimeIsIt).getHours()*60) +(new Date(datapoint.whatTimeIsIt).getMinutes())
  return datapoint;
}

function transformTime(dataToTransform){
  let timeCorrected = dataToTransform.map(mapTime);
  console.log('timeCorrected'+timeCorrected);
  return timeCorrected;
}

function gotData(incomingData){
  // console.log('incomingData' + incomingData);

  let transformedDate = transformData(incomingData);
  let transformedTime = transformTime(incomingData);

  function getDate(datapoint){
    return datapoint.date;
  }

  let minimumDate = d3.min(transformedDate, getDate);
  let maximumDate = d3.max(transformedDate, getDate);
  // minimumDate = new Date(minimumDate);
  // maximumDate = new Date(maximumDate);

  console.log('minimumDate: '+minimumDate);
  console.log('maximumDate: '+maximumDate);

  let dateScale = d3.scaleTime().domain([minimumDate,maximumDate]).range([50,700])

  function getTimeForMin(datapoint){
    // console.log('datapoint.whatTimeIsIt'+datapoint.whatTimeIsIt);
    return datapoint.whatTimeIsIt
  }
  let minimumTime = d3.min(transformedTime, getTimeForMin);
  let maximumTime = d3.max(transformedTime, getTimeForMin);
  // console.log('minimumTime'+minimumTime);
  // console.log('maximumTime'+maximumTime);
  let timeScale = d3.scaleTime().domain([minimumTime,maximumTime]).range([50,2250])

  function positionGroup(d,i){

    let x = timeScale(d.whatTimeIsIt)
    let y = dateScale(d.date);
    console.log('datascale'+y);
    console.log('timeScale'+x);
    return 'translate('+ x +','+ y +')';
  }

  let datagroups = viz.selectAll('.datagroup').data(incomingData).enter()
  .append('g')
  .attr('class','datagroup')
  ;

  let bird =  datagroups.append('path')
  .attr('d',weather)
  // .attr('transform',positionGroup)
  .attr('fill',color)
  .attr('stroke','transparent');





  let birdWing =  datagroups.append('path')
  .attr('d',"M25.33,30.27A17.1,17.1,0,0,1,40,32,17.07,17.07,0,0,1,47.26,44.1a17.1,17.1,0,0,1-16.94-3.38A16.61,16.61,0,0,1,25.33,30.27Z")
  .attr('stroke',wing)
  .attr('fill',wingColor)
  .attr('stroke-width',1)
  // .attr('transform',positionGroup)





function positionLine(d,i){
  let y1 = dateScale(d.date)
  y1 = y1+54;
  return 'translate(0,'+y1+')'

}

  viz.selectAll('line').data(incomingData).enter()
  .append('line')
  .attr('x1',30)
  .attr('y1',0)
  .attr('x2',2370)
  .attr('y2',0)
  .attr('stroke','black')
  .attr('stroke-width',0.5)
  .attr('transform',positionLine)

  datagroups.attr('transform',positionGroup)

  let note1 = datagroups.append('path')
    .attr('d',"M9.74,24.48a4.55,4.55,0,0,1-.22,3c-1,2.31-3.78,2.62-4.17,2.66-1.74.18-4.5-.4-5.2-2.45-.76-2.23,1.36-4.66,3.25-5.59a4.77,4.77,0,0,1,4.29-.2A4.4,4.4,0,0,1,9.74,24.48Z" )
    .attr('transform','translate(-5,-35)')
    .attr('fill','black')
    .attr('stroke','black')

  let noteLine1 = datagroups.append('line')
    .attr('x1',5)
    .attr('y1',-10)
    .attr('x2',5)
    .attr('y2',-35)
    .attr('stroke','black')

  let note2 = datagroups.append('path')
    .attr('d',"M9.74,24.48a4.55,4.55,0,0,1-.22,3c-1,2.31-3.78,2.62-4.17,2.66-1.74.18-4.5-.4-5.2-2.45-.76-2.23,1.36-4.66,3.25-5.59a4.77,4.77,0,0,1,4.29-.2A4.4,4.4,0,0,1,9.74,24.48Z"  )
    .attr('transform','translate(15,-39)')
    .attr('fill',note2Color)      .attr('stroke',note2Color)

  let note2Line = datagroups.append('line')
    .attr('x1',5)
    .attr('y1',-10)
    .attr('x2',5)
    .attr('y2',-35)
    .attr('stroke',note2Color)
    .attr('transform','translate(20,-4)')

  let note2Line2 = datagroups.append('line')
    .attr('x1',5)
    .attr('y1',-35)
    .attr('x2',25)
    .attr('y2',-39)
    .attr('stroke',note2Color)

  let note3Line = datagroups.append('line')
    .attr('x1',5)
    .attr('y1',-30)
    .attr('x2',25)
    .attr('y2',-34)
    .attr('stroke-width','3')
    .attr('stroke',note3Color)

  let note4 = datagroups.append('path')
    .attr('d',"M9.74,24.48a4.55,4.55,0,0,1-.22,3c-1,2.31-3.78,2.62-4.17,2.66-1.74.18-4.5-.4-5.2-2.45-.76-2.23,1.36-4.66,3.25-5.59a4.77,4.77,0,0,1,4.29-.2A4.4,4.4,0,0,1,9.74,24.48Z"  )
    .attr('transform','translate(35,-39)')
    .attr('fill',note4Color)
    .attr('stroke',note4Color)

  let note4Line = datagroups.append('line')
    .attr('x1',5)
    .attr('y1',-10)
    .attr('x2',5)
    .attr('y2',-35)
    .attr('stroke',note4Color)
    .attr('transform','translate(40,-4)')

  let note4Line2 = datagroups.append('path')
    .attr('d',"M13.46,15.58c1.07-2.44,2.16-6.07.84-9a22.1,22.1,0,0,0-1.17-2.13A28.08,28.08,0,0,0,9.84,0"  )
    .attr('transform','translate(35,-39)')
    .attr('fill','transparent')
    .attr('stroke',note4Color)

    let eye1 =  datagroups.append('circle')
    .attr('cx',23)
    .attr('cy',15)
    .attr('stroke',circleEye)
    .attr('fill',circleEye)
    .attr('r',2)
    // .attr('transform',positionGroup);
    let eye2 =  datagroups.append('line')
    .attr('x1',20)
    .attr('y1',15)
    .attr('x2',26)
    .attr('y2',15)
    .attr('stroke',lineEye)
    .attr('stroke-width',2)



}
