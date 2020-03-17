console.log('js loaded');



let viz = d3.select('#container')
.append('svg')
.attr('id','viz')
.attr('width',1200)
.attr('height',800)
;

let image = viz
  .append('image')
  .attr('xlink:href','back.PNG')
  .attr('width',1200)
  .attr('height',800)
  ;


let sunny = viz.append('path')
  .attr('d','M19.75,46.84c8.27,7.1,18.51,6.2,19.9,6A27.81,27.81,0,0,0,58.76,41.75c36.79,4.15,46,4,46.14,2.78.26-1.88-20.72-4.62-45.7-20.32-4.94-3.11-9.65-6.61-9.65-6.61l-.33-.25a14.45,14.45,0,0,0-1.47-9.6C45.29,3.35,41.12,1.83,39,1.06a19,19,0,0,0-13.44.14,18.8,18.8,0,0,0-8.34,6.71L7.4,1.48l6.43,9.26-11.12.31,9.84,3.8C8.33,26.78,11.26,39.54,19.75,46.84Z')
  .attr('fill','transparent')
  .attr('stroke','black')
  .attr('transform','translate(800,310)scale(0.8)')

let sunnyeye =  viz.append('circle')
  .attr('cx',23)
  .attr('cy',15)
  .attr('stroke','black')
  .attr('r',2)
  .attr('transform','translate(800,310)scale(0.8)')

let cloudy = viz.append('path')
    .attr('d','M14.89,40.05c4.74,7.56,14,13.79,24.76,12.84,11.54-1,18.08-9.72,19.11-11.14,36.79,4.15,46,4,46.14,2.78.26-1.88-20.72-4.62-45.7-20.32-4.93-3.11-9.63-6.6-9.65-6.61h0l.65.48A17.47,17.47,0,0,0,47,6.53,17.7,17.7,0,0,0,37.14,0,21.06,21.06,0,0,0,21.23,2.12a21.27,21.27,0,0,0-9.54,12.44l-12.8-2.22,10.72,7.2L-2.46,23.38l13.23,1.17A27.87,27.87,0,0,0,14.89,40.05Z')
    .attr('fill','transparent')
    .attr('stroke','black')
    .attr('transform','translate(800,370)scale(0.8)')

let cloudyeye =  viz.append('circle')
    .attr('cx',23)
    .attr('cy',15)
    .attr('stroke','black')
    .attr('r',2)
    .attr('transform','translate(800,370)scale(0.8)')


let rainy = viz.append('path')
    .attr('d','M12.67,29.2C15.5,45.68,27.85,56.47,39.75,55.55c11.51-.89,18.23-12.41,19-13.8,36.79,4.15,46,4,46.14,2.78.26-1.88-20.72-4.62-45.7-20.32a148.82,148.82,0,0,1-12.54-8.82C45,7.91,40,2,33.69.44,25.39-1.67,16,4,12.67,14.14A26.24,26.24,0,0,1,8,17.5C3.66,20-.06,20.36,0,21s4.78-.3,8.64,2.51A12.25,12.25,0,0,1,12.67,29.2')
    .attr('fill','transparent')
    .attr('stroke','black')      .attr('transform','translate(800,430)scale(0.8)')

  let rainyeye =  viz.append('circle')
    .attr('cx',23)
    .attr('cy',15)
    .attr('stroke','black')
    .attr('r',2)      .attr('transform','translate(800,430)scale(0.8)')

let diningRoom = viz.append('path')
  .attr('d','M19.75,46.84c8.27,7.1,18.51,6.2,19.9,6A27.81,27.81,0,0,0,58.76,41.75c36.79,4.15,46,4,46.14,2.78.26-1.88-20.72-4.62-45.7-20.32-4.94-3.11-9.65-6.61-9.65-6.61l-.33-.25a14.45,14.45,0,0,0-1.47-9.6C45.29,3.35,41.12,1.83,39,1.06a19,19,0,0,0-13.44.14,18.8,18.8,0,0,0-8.34,6.71L7.4,1.48l6.43,9.26-11.12.31,9.84,3.8C8.33,26.78,11.26,39.54,19.75,46.84Z')
  .attr('fill','transparent')
  .attr('stroke','black')
  .attr('transform','translate(800,490)scale(0.8)')

  let diningRoomWing =  viz.append('path')
  .attr('d',"M25.33,30.27A17.1,17.1,0,0,1,40,32,17.07,17.07,0,0,1,47.26,44.1a17.1,17.1,0,0,1-16.94-3.38A16.61,16.61,0,0,1,25.33,30.27Z")
  .attr('stroke','black')
  .attr('fill','transparent')
  .attr('stroke-width',1)
  .attr('transform','translate(800,490)scale(0.8)')

  let diningRoomEye = viz.append('circle')
    .attr('cx',23)
    .attr('cy',15)
    .attr('stroke','black')
    .attr('r',2)      .attr('transform','translate(800,490)scale(0.8)')


let garden = viz.append('path')
    .attr('d','M19.75,46.84c8.27,7.1,18.51,6.2,19.9,6A27.81,27.81,0,0,0,58.76,41.75c36.79,4.15,46,4,46.14,2.78.26-1.88-20.72-4.62-45.7-20.32-4.94-3.11-9.65-6.61-9.65-6.61l-.33-.25a14.45,14.45,0,0,0-1.47-9.6C45.29,3.35,41.12,1.83,39,1.06a19,19,0,0,0-13.44.14,18.8,18.8,0,0,0-8.34,6.71L7.4,1.48l6.43,9.26-11.12.31,9.84,3.8C8.33,26.78,11.26,39.54,19.75,46.84Z')
    .attr('fill','transparent')
    .attr('stroke','black')
    .attr('transform','translate(800,550)scale(0.8)')

let gardenWing = viz.append('path')
.attr('d',"M25.33,30.27A17.1,17.1,0,0,1,40,32,17.07,17.07,0,0,1,47.26,44.1a17.1,17.1,0,0,1-16.94-3.38A16.61,16.61,0,0,1,25.33,30.27Z")
.attr('stroke','transparent')
.attr('fill','grey')
.attr('stroke-width',1)
.attr('transform','translate(800,550)scale(0.8)')

let gardenEye = viz.append('circle')
  .attr('cx',23)
  .attr('cy',15)
  .attr('stroke','black')
  .attr('r',2)      .attr('transform','translate(800,550)scale(0.8)')

let myBalcony = viz.append('path')
    .attr('d','M19.75,46.84c8.27,7.1,18.51,6.2,19.9,6A27.81,27.81,0,0,0,58.76,41.75c36.79,4.15,46,4,46.14,2.78.26-1.88-20.72-4.62-45.7-20.32-4.94-3.11-9.65-6.61-9.65-6.61l-.33-.25a14.45,14.45,0,0,0-1.47-9.6C45.29,3.35,41.12,1.83,39,1.06a19,19,0,0,0-13.44.14,18.8,18.8,0,0,0-8.34,6.71L7.4,1.48l6.43,9.26-11.12.31,9.84,3.8C8.33,26.78,11.26,39.54,19.75,46.84Z')
    .attr('fill','rgb(215,196,187)')
    .attr('stroke','black')      .attr('transform','translate(800,610)scale(0.8)')

let myBalconyWing = viz.append('path')
  .attr('d',"M25.33,30.27A17.1,17.1,0,0,1,40,32,17.07,17.07,0,0,1,47.26,44.1a17.1,17.1,0,0,1-16.94-3.38A16.61,16.61,0,0,1,25.33,30.27Z")
  .attr('stroke','white')
  .attr('fill','white')
  .attr('stroke-width',1)
  .attr('transform','translate(800,610)scale(0.8)')

let myBalconyEye = viz.append('circle')
  .attr('cx',23)
  .attr('cy',15)
  .attr('stroke','black')
  .attr('r',2)      .attr('transform','translate(800,610)scale(0.8)')

let myBedroom = viz.append('path')
    .attr('d','M19.75,46.84c8.27,7.1,18.51,6.2,19.9,6A27.81,27.81,0,0,0,58.76,41.75c36.79,4.15,46,4,46.14,2.78.26-1.88-20.72-4.62-45.7-20.32-4.94-3.11-9.65-6.61-9.65-6.61l-.33-.25a14.45,14.45,0,0,0-1.47-9.6C45.29,3.35,41.12,1.83,39,1.06a19,19,0,0,0-13.44.14,18.8,18.8,0,0,0-8.34,6.71L7.4,1.48l6.43,9.26-11.12.31,9.84,3.8C8.33,26.78,11.26,39.54,19.75,46.84Z')
    .attr('fill','transparent')
    .attr('stroke','black')
    .attr('transform','translate(800,670)scale(0.8)')

let myBedroomWing = viz.append('path')
  .attr('d',"M25.33,30.27A17.1,17.1,0,0,1,40,32,17.07,17.07,0,0,1,47.26,44.1a17.1,17.1,0,0,1-16.94-3.38A16.61,16.61,0,0,1,25.33,30.27Z")
  .attr('stroke','transparent')
  .attr('fill','transparent')
  .attr('stroke-width',1)
  .attr('transform','translate(800,670)scale(0.8)')

let myBedroomEye = viz.append('circle')
  .attr('cx',23)
  .attr('cy',15)
  .attr('stroke','black')
  .attr('r',2)      .attr('transform','translate(800,670)scale(0.8)')

let note1 = viz.append('path')
    .attr('d',"M9.74,24.48a4.55,4.55,0,0,1-.22,3c-1,2.31-3.78,2.62-4.17,2.66-1.74.18-4.5-.4-5.2-2.45-.76-2.23,1.36-4.66,3.25-5.59a4.77,4.77,0,0,1,4.29-.2A4.4,4.4,0,0,1,9.74,24.48Z" )
    .attr('transform','translate(50,610)scale(0.8)')
    .attr('fill','black')
    .attr('stroke','black')

  let noteLine1 = viz.append('line')
    .attr('x1',10)
    .attr('y1',25)
    .attr('x2',10)
    .attr('y2',0)
    .attr('stroke','black')
    .attr('transform','translate(50,610)scale(0.8)')

  let note2 = viz.append('path')
    .attr('d',"M9.74,24.48a4.55,4.55,0,0,1-.22,3c-1,2.31-3.78,2.62-4.17,2.66-1.74.18-4.5-.4-5.2-2.45-.76-2.23,1.36-4.66,3.25-5.59a4.77,4.77,0,0,1,4.29-.2A4.4,4.4,0,0,1,9.74,24.48Z" )
    .attr('transform','translate(190,610)scale(0.8)')
    .attr('fill','black')
    .attr('stroke','black')

  let noteLine2 = viz.append('line')
    .attr('x1',10)
    .attr('y1',25)
    .attr('x2',10)
    .attr('y2',0)
    .attr('stroke','black')
    .attr('transform','translate(190,610)scale(0.8)')

  let note22 = viz.append('path')
      .attr('d',"M9.74,24.48a4.55,4.55,0,0,1-.22,3c-1,2.31-3.78,2.62-4.17,2.66-1.74.18-4.5-.4-5.2-2.45-.76-2.23,1.36-4.66,3.25-5.59a4.77,4.77,0,0,1,4.29-.2A4.4,4.4,0,0,1,9.74,24.48Z"  )
      .attr('fill','black')
      .attr('stroke','black')
      .attr('transform','translate(206,606)scale(0.8)')


  let note22Line = viz.append('line')
      .attr('x1',5)
      .attr('y1',-10)
      .attr('x2',5)
      .attr('y2',-35)
      .attr('stroke','black')
      .attr('transform','translate(210,634)scale(0.8)')

  let note2Line2 = viz.append('line')
      .attr('x1',5)
      .attr('y1',-35)
      .attr('x2',25)
      .attr('y2',-39)
      .attr('stroke','black')
      .attr('transform','translate(194,638)scale(0.8)')

  let note3 = viz.append('path')
        .attr('d',"M9.74,24.48a4.55,4.55,0,0,1-.22,3c-1,2.31-3.78,2.62-4.17,2.66-1.74.18-4.5-.4-5.2-2.45-.76-2.23,1.36-4.66,3.25-5.59a4.77,4.77,0,0,1,4.29-.2A4.4,4.4,0,0,1,9.74,24.48Z" )
        .attr('transform','translate(360,610)scale(0.8)')
        .attr('fill','black')
        .attr('stroke','black')

  let note3Line1 = viz.append('line')
  .attr('x1',10)
  .attr('y1',25)
  .attr('x2',10)
  .attr('y2',0)
  .attr('stroke','black')
  .attr('transform','translate(360,610)scale(0.8)')

  let note32 = viz.append('path')
      .attr('d',"M9.74,24.48a4.55,4.55,0,0,1-.22,3c-1,2.31-3.78,2.62-4.17,2.66-1.74.18-4.5-.4-5.2-2.45-.76-2.23,1.36-4.66,3.25-5.59a4.77,4.77,0,0,1,4.29-.2A4.4,4.4,0,0,1,9.74,24.48Z"  )
      .attr('fill','black')
      .attr('stroke','black')
      .attr('transform','translate(376,606)scale(0.8)')

  let note32Line = viz.append('line')
      .attr('x1',5)
      .attr('y1',-10)
      .attr('x2',5)
      .attr('y2',-35)
      .attr('stroke','black')
      .attr('transform','translate(380,634)scale(0.8)')

  let note32Line2 = viz.append('line')
      .attr('x1',5)
      .attr('y1',-35)
      .attr('x2',25)
      .attr('y2',-39)
      .attr('stroke','black')
      .attr('transform','translate(364,638)scale(0.8)')

  let note3Line = viz.append('line')
      .attr('x1',5)
      .attr('y1',-30)
      .attr('x2',25)
      .attr('y2',-34)
      .attr('stroke-width','3')
      .attr('stroke','black')
      .attr('transform','translate(364,638)scale(0.8)')

    let note41 = viz.append('path')
        .attr('d',"M9.74,24.48a4.55,4.55,0,0,1-.22,3c-1,2.31-3.78,2.62-4.17,2.66-1.74.18-4.5-.4-5.2-2.45-.76-2.23,1.36-4.66,3.25-5.59a4.77,4.77,0,0,1,4.29-.2A4.4,4.4,0,0,1,9.74,24.48Z" )
        .attr('transform','translate(560,610)scale(0.8)')
        .attr('fill','black')
        .attr('stroke','black')

  let note4Line1 = viz.append('line')
    .attr('x1',10)
    .attr('y1',25)
    .attr('x2',10)
    .attr('y2',0)
    .attr('stroke','black')
    .attr('transform','translate(560,610)scale(0.8)')

  let note42 = viz.append('path')
      .attr('d',"M9.74,24.48a4.55,4.55,0,0,1-.22,3c-1,2.31-3.78,2.62-4.17,2.66-1.74.18-4.5-.4-5.2-2.45-.76-2.23,1.36-4.66,3.25-5.59a4.77,4.77,0,0,1,4.29-.2A4.4,4.4,0,0,1,9.74,24.48Z"  )
      .attr('fill','black')
      .attr('stroke','black')
      .attr('transform','translate(576,606)scale(0.8)')

  let note42Line = viz.append('line')
      .attr('x1',5)
      .attr('y1',-10)
      .attr('x2',5)
      .attr('y2',-35)
      .attr('stroke','black')
      .attr('transform','translate(580,634)scale(0.8)')

  let note42Line2 = viz.append('line')
      .attr('x1',5)
      .attr('y1',-35)
      .attr('x2',25)
      .attr('y2',-39)
      .attr('stroke','black')
      .attr('transform','translate(564,638)scale(0.8)')

  let note43Line = viz.append('line')
      .attr('x1',5)
      .attr('y1',-30)
      .attr('x2',25)
      .attr('y2',-34)
      .attr('stroke-width','3')
      .attr('stroke','black')
      .attr('transform','translate(564,638)scale(0.8)')

  let note4 = viz.append('path')
    .attr('d',"M9.74,24.48a4.55,4.55,0,0,1-.22,3c-1,2.31-3.78,2.62-4.17,2.66-1.74.18-4.5-.4-5.2-2.45-.76-2.23,1.36-4.66,3.25-5.59a4.77,4.77,0,0,1,4.29-.2A4.4,4.4,0,0,1,9.74,24.48Z"  )
    .attr('fill','black')
    .attr('stroke','black')
    .attr('transform','translate(595,605)scale(0.8)')


  let note4Line = viz.append('line')
    .attr('x1',5)
    .attr('y1',-10)
    .attr('x2',5)
    .attr('y2',-35)
    .attr('stroke','black')
    .attr('transform','translate(599,634)scale(0.8)')


  let note4Line2 = viz.append('path')
    .attr('d',"M13.46,15.58c1.07-2.44,2.16-6.07.84-9a22.1,22.1,0,0,0-1.17-2.13A28.08,28.08,0,0,0,9.84,0"  )
    .attr('fill','transparent')
    .attr('stroke','black')
    .attr('transform','translate(595,606)scale(0.8)')

  let mydata = [1,2,3,4,5,6]

  function xLocation(datapoint){
    return 'translate('+(datapoint*120-60)+',720)'

  }
  function color(datapoint){
    if(datapoint == '1'){
      return 'rgb(155,144,194)'
    }
    if(datapoint == '2'){
      return 'rgb(248,195,205)'
    }
    if(datapoint == '3'){
      return 'rgb(181,202,160)'
    }
    if(datapoint == '4'){
      return 'rgb(235,122,119)'
    }
    if(datapoint == '5'){
      return 'rgb(129,199,212)'
    }
    else{
      return 'rgb(215,196,187)'
    }
  }


 viz.selectAll('#mydata').data(mydata).enter()
    .append('path')
        .attr('d','M14.89,40.05c4.74,7.56,14,13.79,24.76,12.84,11.54-1,18.08-9.72,19.11-11.14,36.79,4.15,46,4,46.14,2.78.26-1.88-20.72-4.62-45.7-20.32-4.93-3.11-9.63-6.6-9.65-6.61h0l.65.48A17.47,17.47,0,0,0,47,6.53,17.7,17.7,0,0,0,37.14,0,21.06,21.06,0,0,0,21.23,2.12a21.27,21.27,0,0,0-9.54,12.44l-12.8-2.22,10.72,7.2L-2.46,23.38l13.23,1.17A27.87,27.87,0,0,0,14.89,40.05Z')
        .attr('fill',color)
        .attr('stroke','transparent')
        .attr('transform',xLocation)

  viz.selectAll('#mydata').data(mydata).enter()
    .append('circle')
    .attr('cx',23)
    .attr('cy',15)
    .attr('stroke','black')
    .attr('r',2)
    .attr('transform',xLocation)
