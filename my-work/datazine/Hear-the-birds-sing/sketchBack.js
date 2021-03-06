console.log('js loaded');


let viz = d3.select('#container')
.append('svg')
.attr('id','viz')
.attr('width',1200)
.attr('height',800)
;

let image = viz
  .append('image')
  .attr('xlink:href','back2.PNG')
  .attr('width',1200)
  .attr('height',800)
  ;

// let title = viz.append('text')
//   .text('How to read it : ')
//   .attr('dx',50)
//   .attr('dy',100)
//   .style('font-size',80)
//   .attr('font-family','Amatic SC')
//   .attr('fill','black')

let weather = viz.append('text')
  .text('Weather: ')
  .attr('dx',640)
  .attr('dy',185)
  .style('font-size',40)
  .attr('font-family','Amatic SC')
  .attr('fill','black')

let sunny = viz.append('path')
  .attr('d','M19.75,46.84c8.27,7.1,18.51,6.2,19.9,6A27.81,27.81,0,0,0,58.76,41.75c36.79,4.15,46,4,46.14,2.78.26-1.88-20.72-4.62-45.7-20.32-4.94-3.11-9.65-6.61-9.65-6.61l-.33-.25a14.45,14.45,0,0,0-1.47-9.6C45.29,3.35,41.12,1.83,39,1.06a19,19,0,0,0-13.44.14,18.8,18.8,0,0,0-8.34,6.71L7.4,1.48l6.43,9.26-11.12.31,9.84,3.8C8.33,26.78,11.26,39.54,19.75,46.84Z')
  .attr('fill','transparent')
  .attr('stroke','black')
  .attr('transform','translate(800,150)scale(0.9)')

let sunnyeye =  viz.append('circle')
  .attr('cx',23)
  .attr('cy',15)
  .attr('stroke','black')
  .attr('r',2)
  .attr('transform','translate(800,150)scale(0.9)')

let sun = viz.append('path')
  .attr('d',"M512.011935 776.403188A264.390253 264.390253 0 1 1 776.402189 512.012935 264.671246 264.671246 0 0 1 512.011935 776.403188z m0-449.49853A185.109276 185.109276 0 1 0 697.121212 512.012935 185.339271 185.339271 0 0 0 512.011935 326.903658z m0-140.541414a39.601989 39.601989 0 0 1-39.652988-39.652988V39.678987a39.678987 39.678987 0 1 1 79.357975 0v107.057269A39.678987 39.678987 0 0 1 512.011935 186.389244zM253.663528 293.318515a39.167001 39.167001 0 0 1-27.980286-11.698701l-75.748067-75.748067a39.678987 39.678987 0 0 1 56.088568-56.088569l75.748068 75.748067a39.704987 39.704987 0 0 1-28.159282 67.762271zM146.735256 551.665923H39.677988a39.678987 39.678987 0 1 1 0-79.357975h107.057268a39.678987 39.678987 0 1 1 0 79.357975z m31.307201 333.969478a39.167001 39.167001 0 0 1-28.005285-11.647703 39.57699 39.57699 0 0 1 0-56.088569l75.748067-75.748067a39.678987 39.678987 0 1 1 56.088569 56.088569l-75.723068 75.748067a39.832984 39.832984 0 0 1-28.108283 11.647703zM512.011935 1023.99987a39.601989 39.601989 0 0 1-39.652988-39.652988v-107.057268a39.678987 39.678987 0 1 1 79.357975 0v107.057268A39.601989 39.601989 0 0 1 512.011935 1023.99987z m333.969478-138.364469a39.167001 39.167001 0 0 1-28.006285-11.647703l-75.748067-75.748067a39.678987 39.678987 0 0 1 56.088569-56.088569l75.748067 75.748067a39.704987 39.704987 0 0 1-28.159282 67.762271z m138.36447-333.969478h-107.057269a39.678987 39.678987 0 1 1 0-79.357975h107.057269a39.678987 39.678987 0 1 1 0 79.357975zM770.335344 293.342515A39.167001 39.167001 0 0 1 742.406056 281.618814a39.57699 39.57699 0 0 1 0-56.088569l75.748067-75.748067a39.678987 39.678987 0 0 1 56.088569 56.088569l-75.800066 75.748067a40.011979 40.011979 0 0 1-28.107282 11.699701z")
  .attr('transform','translate(950,150)scale(0.05)')
  .attr('fill',"#f1b34c")


let cloudy = viz.append('path')
    .attr('d','M14.89,40.05c4.74,7.56,14,13.79,24.76,12.84,11.54-1,18.08-9.72,19.11-11.14,36.79,4.15,46,4,46.14,2.78.26-1.88-20.72-4.62-45.7-20.32-4.93-3.11-9.63-6.6-9.65-6.61h0l.65.48A17.47,17.47,0,0,0,47,6.53,17.7,17.7,0,0,0,37.14,0,21.06,21.06,0,0,0,21.23,2.12a21.27,21.27,0,0,0-9.54,12.44l-12.8-2.22,10.72,7.2L-2.46,23.38l13.23,1.17A27.87,27.87,0,0,0,14.89,40.05Z')
    .attr('fill','transparent')
    .attr('stroke','black')
    .attr('transform','translate(800,220)scale(0.9)')

let cloudyeye =  viz.append('circle')
    .attr('cx',23)
    .attr('cy',15)
    .attr('stroke','black')
    .attr('r',2)
    .attr('transform','translate(800,220)scale(0.9)')

let cloud1 = viz.append('path')
  .attr('d',"M765.587 491.317c-9.912-62.101-41.832-119.081-91.185-162.062-54.196-47.202-124.666-73.196-198.428-73.196-143.273 0-263.619 96.488-288.365 227.604-85.976 24.323-146.424 99.8-146.424 186.444 0 100.881 81.421 186.063 185.261 195.678 0 0 125.735 2.214 205.803 2.214 0.009 0 0.006 0 0.014 0 136.181 0 258.209-1.869 259.428-1.885l0-0.09c111.507-1.925 201.605-88.414 201.605-194.525C893.298 592.518 841.663 520.896 765.587 491.317zM687.911 808.678 255.369 808.678c-2.772-0.891-5.725-1.385-8.795-1.385-81.578 0-147.947-61.541-147.947-137.184 0-65.531 50.292-122.146 119.582-134.63l21.119-3.803 2.338-21.33C253.977 398.124 354.707 313.5 475.976 313.5c121.9 0 224.995 88.6 234.706 201.706l1.693 19.729 19.047 5.433c62.469 17.809 104.438 70.504 104.438 131.131C835.857 747.141 769.489 808.678 687.911 808.678z")
  .attr('transform','translate(950,220)scale(0.05)')
let cloud2 = viz.append('path')
  .attr('d',"M767.813 152.796c-54.781 0-107.058 20.511-147.197 57.754-11.629 10.789-12.31 28.96-1.521 40.588 10.786 11.624 28.964 12.31 40.586 1.521 29.486-27.357 67.892-42.422 108.133-42.422 87.688 0 159.03 71.338 159.03 159.025 0 44.093-18.554 86.596-50.897 116.609-11.626 10.787-12.311 28.958-1.519 40.587 5.657 6.096 13.347 9.186 21.06 9.186 6.992 0 14-2.539 19.526-7.668 44.021-40.843 69.27-98.692 69.27-158.713C984.281 249.901 887.174 152.796 767.813 152.796z")
  .attr('transform','translate(950,220)scale(0.05)')

let rainy = viz.append('path')
.attr('d','M14.89,40.05c4.74,7.56,14,13.79,24.76,12.84,11.54-1,18.08-9.72,19.11-11.14,36.79,4.15,46,4,46.14,2.78.26-1.88-20.72-4.62-45.7-20.32-4.93-3.11-9.63-6.6-9.65-6.61h0l.65.48A17.47,17.47,0,0,0,47,6.53,17.7,17.7,0,0,0,37.14,0,21.06,21.06,0,0,0,21.23,2.12a21.27,21.27,0,0,0-9.54,12.44l-12.8-2.22,10.72,7.2L-2.46,23.38l13.23,1.17A27.87,27.87,0,0,0,14.89,40.05Z')
    .attr('fill','transparent')
    .attr('stroke','black')      .attr('transform','translate(800,290)scale(0.9)')

  let rainyeye =  viz.append('line')
  .attr('x1',20)
  .attr('y1',15)
  .attr('x2',26)
  .attr('y2',15)
  .attr('stroke','black')
  .attr('stroke-width',2)
    .attr('transform','translate(800,290)scale(0.9)')

  let rain = viz.append('path')
    .attr('d',"M550.855111 839.111111a28.444444 28.444444 0 0 1 10.410667 38.855111l-42.666667 73.898667a28.444444 28.444444 0 0 1-49.265778-28.444445l42.666667-73.898666a28.444444 28.444444 0 0 1 38.855111-10.410667z m-284.444444 0a28.444444 28.444444 0 0 1 10.410666 38.855111l-42.666666 73.898667a28.444444 28.444444 0 0 1-49.265778-28.444445L227.555556 849.521778a28.444444 28.444444 0 0 1 38.855111-10.410667z m568.888889 0a28.444444 28.444444 0 0 1 10.410666 38.855111l-42.666666 73.898667a28.444444 28.444444 0 0 1-49.265778-28.444445l42.666666-73.898666a28.444444 28.444444 0 0 1 38.855112-10.410667zM560.896 85.333333c135.964444 0 250.680889 90.823111 286.833778 215.125334a232.874667 232.874667 0 0 1-85.048889 449.763555H240.014222a211.569778 211.569778 0 0 1 0-423.111111h27.619556c26.567111-137.728 147.768889-241.777778 293.262222-241.777778z m-237.397333 252.558223L314.595556 384H239.985778a154.680889 154.680889 0 0 0 0 309.333333H762.680889a175.985778 175.985778 0 0 0 64.256-339.911111l-26.026667-10.24-7.822222-26.823111a241.891556 241.891556 0 0 0-469.617778 21.532445z")
    .attr('transform','translate(950,290)scale(0.05)')

  let myLocation = viz.append('text')
    .text('My Location: ')
    .attr('dx',600)
    .attr('dy',400)
    .style('font-size',40)
    .attr('font-family','Amatic SC')
    .attr('fill','black')

let diningRoom = viz.append('path')
  .attr('d','M19.75,46.84c8.27,7.1,18.51,6.2,19.9,6A27.81,27.81,0,0,0,58.76,41.75c36.79,4.15,46,4,46.14,2.78.26-1.88-20.72-4.62-45.7-20.32-4.94-3.11-9.65-6.61-9.65-6.61l-.33-.25a14.45,14.45,0,0,0-1.47-9.6C45.29,3.35,41.12,1.83,39,1.06a19,19,0,0,0-13.44.14,18.8,18.8,0,0,0-8.34,6.71L7.4,1.48l6.43,9.26-11.12.31,9.84,3.8C8.33,26.78,11.26,39.54,19.75,46.84Z')
  .attr('fill','transparent')
  .attr('stroke','black')
  .attr('transform','translate(800,380)scale(0.9)')

  let diningRoomWing =  viz.append('path')
  .attr('d',"M25.33,30.27A17.1,17.1,0,0,1,40,32,17.07,17.07,0,0,1,47.26,44.1a17.1,17.1,0,0,1-16.94-3.38A16.61,16.61,0,0,1,25.33,30.27Z")
  .attr('stroke','black')
  .attr('fill','transparent')
  .attr('stroke-width',1)
  .attr('transform','translate(800,380)scale(0.9)')

  let diningRoomEye = viz.append('circle')
    .attr('cx',23)
    .attr('cy',15)
    .attr('stroke','black')
    .attr('r',2)
    .attr('transform','translate(800,380)scale(0.9)')

  let diningIcon1 = viz.append('path')
    .attr('d',"M332.8 486.4H230.4c-43.52 0-76.8-35.84-76.8-81.92V128c0-15.36 10.24-25.6 25.6-25.6s25.6 10.24 25.6 25.6v276.48c0 17.92 10.24 30.72 25.6 30.72h102.4c15.36 0 25.6-12.8 25.6-30.72V128c0-15.36 10.24-25.6 25.6-25.6s25.6 10.24 25.6 25.6v276.48c0 46.08-33.28 81.92-76.8 81.92z")
    .attr('transform','translate(950,380)scale(0.05)')
  let diningIcon2 = viz.append('path')
    .attr('d',"M281.6 614.4c-15.36 0-25.6-10.24-25.6-25.6V128c0-15.36 10.24-25.6 25.6-25.6s25.6 10.24 25.6 25.6v460.8c0 15.36-10.24 25.6-25.6 25.6zM665.6 614.4c-15.36 0-25.6-10.24-25.6-25.6v-128c0-15.36 10.24-25.6 25.6-25.6s25.6 10.24 25.6 25.6v128c0 15.36-10.24 25.6-25.6 25.6z")
    .attr('transform','translate(950,380)scale(0.05)')
  let diningIcon3 = viz.append('path')
    .attr('d',"M332.8 921.6H230.4c-15.36 0-25.6-10.24-25.6-25.6V614.4c0-15.36 10.24-25.6 25.6-25.6h102.4c15.36 0 25.6 10.24 25.6 25.6v281.6c0 15.36-10.24 25.6-25.6 25.6z m-76.8-51.2h51.2v-230.4h-51.2v230.4zM716.8 921.6h-102.4c-15.36 0-25.6-10.24-25.6-25.6V614.4c0-15.36 10.24-25.6 25.6-25.6h102.4c15.36 0 25.6 10.24 25.6 25.6v281.6c0 15.36-10.24 25.6-25.6 25.6z m-76.8-51.2h51.2v-230.4h-51.2v230.4zM665.6 486.4c-99.84 0-179.2-87.04-179.2-192S565.76 102.4 665.6 102.4s179.2 87.04 179.2 192-79.36 192-179.2 192z m0-332.8c-71.68 0-128 64-128 140.8s56.32 140.8 128 140.8 128-64 128-140.8S737.28 153.6 665.6 153.6z")
    .attr('transform','translate(950,380)scale(0.05)')

let garden = viz.append('path')
    .attr('d','M19.75,46.84c8.27,7.1,18.51,6.2,19.9,6A27.81,27.81,0,0,0,58.76,41.75c36.79,4.15,46,4,46.14,2.78.26-1.88-20.72-4.62-45.7-20.32-4.94-3.11-9.65-6.61-9.65-6.61l-.33-.25a14.45,14.45,0,0,0-1.47-9.6C45.29,3.35,41.12,1.83,39,1.06a19,19,0,0,0-13.44.14,18.8,18.8,0,0,0-8.34,6.71L7.4,1.48l6.43,9.26-11.12.31,9.84,3.8C8.33,26.78,11.26,39.54,19.75,46.84Z')
    .attr('fill','transparent')
    .attr('stroke','black')
    .attr('transform','translate(800,450)scale(0.9)')

let gardenWing = viz.append('path')
.attr('d',"M25.33,30.27A17.1,17.1,0,0,1,40,32,17.07,17.07,0,0,1,47.26,44.1a17.1,17.1,0,0,1-16.94-3.38A16.61,16.61,0,0,1,25.33,30.27Z")
.attr('stroke','transparent')
.attr('fill','grey')
.attr('stroke-width',1)
.attr('transform','translate(800,450)scale(0.9)')

let gardenEye = viz.append('circle')
  .attr('cx',23)
  .attr('cy',15)
  .attr('stroke','black')
  .attr('r',2)
  .attr('transform','translate(800,450)scale(0.9)')

let gardenIcon1 = viz.append('path')
  .attr('d',"M299 851.68H164.69c-21.44 0-38.87-16.81-38.87-37.47V279.87a36.65 36.65 0 0 1 10.31-25.43l67.14-70.08a39.88 39.88 0 0 1 57.12 0l67.13 70.08a36.64 36.64 0 0 1 10.31 25.43v534.34c0.01 20.66-17.43 37.47-38.83 37.47z m-67.17-644.36a4.64 4.64 0 0 0-3.29 1.26l-67.14 70.08a1.91 1.91 0 0 0-0.59 1.22v534.33c0 1 1.51 2.47 3.87 2.47H299c2.36 0 3.87-1.46 3.87-2.47V279.87a1.9 1.9 0 0 0-0.58-1.22l-67.14-70.08a4.65 4.65 0 0 0-3.32-1.25zM579.14 851.68H444.86c-21.44 0-38.87-16.81-38.87-37.47V279.87a36.65 36.65 0 0 1 10.31-25.43l67.14-70.08a39.88 39.88 0 0 1 57.12 0l67.13 70.08A36.65 36.65 0 0 1 618 279.87v534.34c0 20.66-17.43 37.47-38.86 37.47zM512 207.32a4.64 4.64 0 0 0-3.29 1.26l-67.14 70.08a1.91 1.91 0 0 0-0.59 1.22v534.33c0 1 1.51 2.47 3.87 2.47h134.29c2.37 0 3.87-1.46 3.87-2.47V279.87a1.91 1.91 0 0 0-0.59-1.22l-67.13-70.08a4.64 4.64 0 0 0-3.29-1.25zM859.31 851.68H725c-21.43 0-38.87-16.81-38.87-37.47V279.87a36.65 36.65 0 0 1 10.31-25.43l67.13-70.08a39.67 39.67 0 0 1 28.56-12 39.67 39.67 0 0 1 28.56 12l67.13 70.08a36.65 36.65 0 0 1 10.31 25.43v534.34c0.05 20.66-17.39 37.47-38.82 37.47z m-67.14-644.36a4.65 4.65 0 0 0-3.29 1.26l-67.13 70.08a1.9 1.9 0 0 0-0.59 1.22v534.33c0 1 1.51 2.47 3.87 2.47h134.28c2.37 0 3.87-1.46 3.87-2.47V279.87a1.91 1.91 0 0 0-0.59-1.22l-67.13-70.08a4.64 4.64 0 0 0-3.29-1.25z")
  .attr('transform','translate(950,450)scale(0.05)')

let gardenIcon2 = viz.append('path')
  .attr('d',"M320.34 402.68h116.05v35H320.34zM320.34 570.68h116.05v35H320.34zM587.62 402.68h116.05v35H587.62zM587.62 570.68h116.05v35H587.62z")
  .attr('transform','translate(950,450)scale(0.05)')


let myBalcony = viz.append('path')
    .attr('d','M19.75,46.84c8.27,7.1,18.51,6.2,19.9,6A27.81,27.81,0,0,0,58.76,41.75c36.79,4.15,46,4,46.14,2.78.26-1.88-20.72-4.62-45.7-20.32-4.94-3.11-9.65-6.61-9.65-6.61l-.33-.25a14.45,14.45,0,0,0-1.47-9.6C45.29,3.35,41.12,1.83,39,1.06a19,19,0,0,0-13.44.14,18.8,18.8,0,0,0-8.34,6.71L7.4,1.48l6.43,9.26-11.12.31,9.84,3.8C8.33,26.78,11.26,39.54,19.75,46.84Z')
    .attr('fill','rgb(215,196,187)')
    .attr('stroke','black')      .attr('transform','translate(800,520)scale(0.9)')

let myBalconyWing = viz.append('path')
  .attr('d',"M25.33,30.27A17.1,17.1,0,0,1,40,32,17.07,17.07,0,0,1,47.26,44.1a17.1,17.1,0,0,1-16.94-3.38A16.61,16.61,0,0,1,25.33,30.27Z")
  .attr('stroke','white')
  .attr('fill','white')
  .attr('stroke-width',1)
  .attr('transform','translate(800,520)scale(0.9)')

let myBalconyEye = viz.append('circle')
  .attr('cx',23)
  .attr('cy',15)
  .attr('stroke','black')
  .attr('r',2)
  .attr('transform','translate(800,520)scale(0.9)')

let myBalconyIcon1 = viz.append('path')
  .attr('d',"M750.592 555.52V300.544c0.512-1.536 0.512-3.584 0.512-5.12s0-3.584-0.512-5.12V153.088c0.512-15.872-6.144-31.744-17.92-43.52-13.824-14.336-34.816-22.528-56.32-22.528H355.328c-41.472 0-74.752 29.696-74.752 66.048v402.432H76.8V890.88c0 36.864 29.696 66.56 66.56 66.56h640c14.336 0 25.6-11.264 25.6-25.6s-11.264-25.6-25.6-25.6h-32.768v-299.52h153.088V890.88c0 8.192-7.168 15.36-15.36 15.36h-16.384c-14.336 0-25.6 11.264-25.6 25.6s11.264 25.6 25.6 25.6h16.384c36.864 0 66.56-29.696 66.56-66.56v-335.36h-204.288zM280.576 906.24H143.36c-8.192 0-15.36-7.168-15.36-15.36v-284.16h152.576V906.24z m205.824 0H331.776v-299.52H486.4V906.24z m212.992 0H537.6v-299.52h161.792V906.24z m0-753.152v402.432H331.776V153.088c0-7.168 9.728-14.848 23.552-14.848h321.024c8.192 0 15.36 2.56 19.968 7.168 2.048 2.048 3.072 4.608 3.072 7.168v0.512z")
  .attr('transform','translate(950,520)scale(0.05)')

  let myBalconyIcon2 = viz.append('path')
    .attr('d',"M103.936 529.92m-25.6 0a25.6 25.6 0 1 0 51.2 0 25.6 25.6 0 1 0-51.2 0Z")
    .attr('transform','translate(950,520)scale(0.05)')
  let myBalconyIcon3 = viz.append('path')
    .attr('d',"M383.488 512m-25.6 0a25.6 25.6 0 1 0 51.2 0 25.6 25.6 0 1 0-51.2 0Z")
    .attr('transform','translate(950,520)scale(0.05)')
  let myBalconyIcon4 = viz.append('path')
    .attr('d',"M929.28 529.92m-25.6 0a25.6 25.6 0 1 0 51.2 0 25.6 25.6 0 1 0-51.2 0Z")
    .attr('transform','translate(950,520)scale(0.05)')

let myBedroom = viz.append('path')
    .attr('d','M19.75,46.84c8.27,7.1,18.51,6.2,19.9,6A27.81,27.81,0,0,0,58.76,41.75c36.79,4.15,46,4,46.14,2.78.26-1.88-20.72-4.62-45.7-20.32-4.94-3.11-9.65-6.61-9.65-6.61l-.33-.25a14.45,14.45,0,0,0-1.47-9.6C45.29,3.35,41.12,1.83,39,1.06a19,19,0,0,0-13.44.14,18.8,18.8,0,0,0-8.34,6.71L7.4,1.48l6.43,9.26-11.12.31,9.84,3.8C8.33,26.78,11.26,39.54,19.75,46.84Z')
    .attr('fill','transparent')
    .attr('stroke','black')
    .attr('transform','translate(800,590)scale(0.9)')

let myBedroomWing = viz.append('path')
  .attr('d',"M25.33,30.27A17.1,17.1,0,0,1,40,32,17.07,17.07,0,0,1,47.26,44.1a17.1,17.1,0,0,1-16.94-3.38A16.61,16.61,0,0,1,25.33,30.27Z")
  .attr('stroke','transparent')
  .attr('fill','transparent')
  .attr('stroke-width',1)
  .attr('transform','translate(800,590)scale(0.9)')

let myBedroomEye = viz.append('circle')
  .attr('cx',23)
  .attr('cy',15)
  .attr('stroke','black')
  .attr('r',2)
  .attr('transform','translate(800,590)scale(0.9)')

let bedroomIcon = viz.append('path')
  .attr('d',"M948.96 470.29V289.67c-41.76-44.777-101.128-72.449-167.036-72.449-5.031 0-9.56 0-14.59 0.503-62.89-70.437-154.458-115.214-256.592-115.214s-193.7 44.274-256.59 115.214c-5.032-0.503-9.56-0.503-14.591-0.503-65.909 0-125.277 27.672-167.036 72.45v180.62c-18.112 6.037-31.697 23.143-31.697 43.77v316.966c0 25.156 20.628 45.784 45.784 45.784h79.996c25.156 0 45.784-20.628 45.784-45.784v-28.175c0-12.578 10.063-23.143 23.144-23.143h549.91c12.578 0 23.143 10.062 23.143 23.143v28.175c0 25.156 20.628 45.784 45.784 45.784h79.996c25.156 0 45.784-20.628 45.784-45.784V514.062c0-20.628-13.081-37.734-31.193-43.772zM117.806 308.79c27.671-24.15 62.387-40.25 101.127-44.778 6.54-0.503 13.584-1.006 20.125-1.006 11.571 0 23.143 1.006 34.212 3.019 10.565-13.585 22.137-26.666 34.715-38.237 53.33-49.306 124.27-79.493 202.254-79.493s149.427 30.187 202.254 79.493c12.578 11.571 24.653 24.652 34.715 38.237 11.07-2.013 22.138-3.019 34.213-3.019 7.043 0 13.584 0.503 20.124 1.006 38.74 4.025 73.456 20.628 101.127 44.778v158.986H860.41c-27.671-66.412-93.077-112.7-169.048-112.7-76.474 0-141.376 46.288-169.048 112.7h-28.678c-27.671-66.412-93.077-112.7-169.048-112.7-76.474 0-141.377 46.288-169.048 112.7h-37.231V308.789z m691.286 158.986H573.13c24.15-40.25 67.921-66.915 118.233-66.915 49.809 0 93.58 26.665 117.73 66.915z m-366.774 0H206.355c24.15-40.25 67.92-66.915 118.233-66.915 49.809 0 93.58 26.665 117.73 66.915z m492.051 340.109c0 12.578-10.062 23.143-23.143 23.143h-34.213c-12.578 0-23.143-10.062-23.143-23.143v-27.672c0-6.037-1.006-12.075-3.522-17.61-7.044-16.602-23.143-28.174-42.262-28.174H212.392c-19.118 0-35.218 11.572-42.262 28.175-2.012 5.534-3.522 11.069-3.522 17.106v28.678c0 12.578-10.062 22.64-23.143 22.64h-34.212c-12.578 0-23.144-10.062-23.144-23.143V536.702c0-12.578 10.063-23.143 23.144-23.143h802.476c12.578 0 23.143 10.062 23.143 23.143v271.182z m0 0")
  .attr('transform','translate(950,590)scale(0.05)')

let howmany = viz.append('text')
  .text('How many birds: ')
  .attr('dx',50)
  .attr('dy',460)
  .style('font-size',40)
  .attr('font-family','Amatic SC')
  .attr('fill','black')


let note1 = viz.append('path')
    .attr('d',"M9.74,24.48a4.55,4.55,0,0,1-.22,3c-1,2.31-3.78,2.62-4.17,2.66-1.74.18-4.5-.4-5.2-2.45-.76-2.23,1.36-4.66,3.25-5.59a4.77,4.77,0,0,1,4.29-.2A4.4,4.4,0,0,1,9.74,24.48Z" )
    .attr('transform','translate(50,500)scale(0.8)')
    .attr('fill','black')
    .attr('stroke','black')

  let noteLine1 = viz.append('line')
    .attr('x1',10)
    .attr('y1',25)
    .attr('x2',10)
    .attr('y2',0)
    .attr('stroke','black')
    .attr('transform','translate(50,500)scale(0.8)')

  let one = viz.append('text')
    .text('One ')
    .attr('dx',90)
    .attr('dy',530)
    .style('font-size',40)
    .attr('font-family','Amatic SC')
    .attr('fill','black')
  let two = viz.append('text')
    .text('Two')
    .attr('dx',250)
    .attr('dy',530)
    .style('font-size',40)
    .attr('font-family','Amatic SC')
    .attr('fill','black')
  let three = viz.append('text')
    .text('three')
    .attr('dx',400)
    .attr('dy',530)
    .style('font-size',40)
    .attr('font-family','Amatic SC')
    .attr('fill','black')
  let more = viz.append('text')
    .text('more')
    .attr('dx',590)
    .attr('dy',530)
    .style('font-size',40)
    .attr('font-family','Amatic SC')
    .attr('fill','black')


  let note2 = viz.append('path')
    .attr('d',"M9.74,24.48a4.55,4.55,0,0,1-.22,3c-1,2.31-3.78,2.62-4.17,2.66-1.74.18-4.5-.4-5.2-2.45-.76-2.23,1.36-4.66,3.25-5.59a4.77,4.77,0,0,1,4.29-.2A4.4,4.4,0,0,1,9.74,24.48Z" )
    .attr('transform','translate(190,500)scale(0.8)')
    .attr('fill','black')
    .attr('stroke','black')

  let noteLine2 = viz.append('line')
    .attr('x1',10)
    .attr('y1',25)
    .attr('x2',10)
    .attr('y2',0)
    .attr('stroke','black')
    .attr('transform','translate(190,500)scale(0.8)')

  let note22 = viz.append('path')
      .attr('d',"M9.74,24.48a4.55,4.55,0,0,1-.22,3c-1,2.31-3.78,2.62-4.17,2.66-1.74.18-4.5-.4-5.2-2.45-.76-2.23,1.36-4.66,3.25-5.59a4.77,4.77,0,0,1,4.29-.2A4.4,4.4,0,0,1,9.74,24.48Z"  )
      .attr('fill','black')
      .attr('stroke','black')
      .attr('transform','translate(206,496)scale(0.8)')


  let note22Line = viz.append('line')
      .attr('x1',5)
      .attr('y1',-10)
      .attr('x2',5)
      .attr('y2',-35)
      .attr('stroke','black')
      .attr('transform','translate(210,524)scale(0.8)')

  let note2Line2 = viz.append('line')
      .attr('x1',5)
      .attr('y1',-35)
      .attr('x2',25)
      .attr('y2',-39)
      .attr('stroke','black')
      .attr('transform','translate(194,528)scale(0.8)')

  let note3 = viz.append('path')
        .attr('d',"M9.74,24.48a4.55,4.55,0,0,1-.22,3c-1,2.31-3.78,2.62-4.17,2.66-1.74.18-4.5-.4-5.2-2.45-.76-2.23,1.36-4.66,3.25-5.59a4.77,4.77,0,0,1,4.29-.2A4.4,4.4,0,0,1,9.74,24.48Z" )
        .attr('transform','translate(340,500)scale(0.8)')
        .attr('fill','black')
        .attr('stroke','black')

  let note3Line1 = viz.append('line')
  .attr('x1',10)
  .attr('y1',25)
  .attr('x2',10)
  .attr('y2',0)
  .attr('stroke','black')
  .attr('transform','translate(340,500)scale(0.8)')

  let note32 = viz.append('path')
      .attr('d',"M9.74,24.48a4.55,4.55,0,0,1-.22,3c-1,2.31-3.78,2.62-4.17,2.66-1.74.18-4.5-.4-5.2-2.45-.76-2.23,1.36-4.66,3.25-5.59a4.77,4.77,0,0,1,4.29-.2A4.4,4.4,0,0,1,9.74,24.48Z"  )
      .attr('fill','black')
      .attr('stroke','black')
      .attr('transform','translate(356,496)scale(0.8)')

  let note32Line = viz.append('line')
      .attr('x1',5)
      .attr('y1',-10)
      .attr('x2',5)
      .attr('y2',-35)
      .attr('stroke','black')
      .attr('transform','translate(360,524)scale(0.8)')

  let note32Line2 = viz.append('line')
      .attr('x1',5)
      .attr('y1',-35)
      .attr('x2',25)
      .attr('y2',-39)
      .attr('stroke','black')
      .attr('transform','translate(344,528)scale(0.8)')

  let note3Line = viz.append('line')
      .attr('x1',5)
      .attr('y1',-30)
      .attr('x2',25)
      .attr('y2',-34)
      .attr('stroke-width','3')
      .attr('stroke','black')
      .attr('transform','translate(344,528)scale(0.8)')

    let note41 = viz.append('path')
        .attr('d',"M9.74,24.48a4.55,4.55,0,0,1-.22,3c-1,2.31-3.78,2.62-4.17,2.66-1.74.18-4.5-.4-5.2-2.45-.76-2.23,1.36-4.66,3.25-5.59a4.77,4.77,0,0,1,4.29-.2A4.4,4.4,0,0,1,9.74,24.48Z" )
        .attr('transform','translate(520,500)scale(0.8)')
        .attr('fill','black')
        .attr('stroke','black')

  let note4Line1 = viz.append('line')
    .attr('x1',10)
    .attr('y1',25)
    .attr('x2',10)
    .attr('y2',0)
    .attr('stroke','black')
    .attr('transform','translate(520,500)scale(0.8)')

  let note42 = viz.append('path')
      .attr('d',"M9.74,24.48a4.55,4.55,0,0,1-.22,3c-1,2.31-3.78,2.62-4.17,2.66-1.74.18-4.5-.4-5.2-2.45-.76-2.23,1.36-4.66,3.25-5.59a4.77,4.77,0,0,1,4.29-.2A4.4,4.4,0,0,1,9.74,24.48Z"  )
      .attr('fill','black')
      .attr('stroke','black')
      .attr('transform','translate(536,496)scale(0.8)')

  let note42Line = viz.append('line')
      .attr('x1',5)
      .attr('y1',-10)
      .attr('x2',5)
      .attr('y2',-35)
      .attr('stroke','black')
      .attr('transform','translate(540,524)scale(0.8)')

  let note42Line2 = viz.append('line')
      .attr('x1',5)
      .attr('y1',-35)
      .attr('x2',25)
      .attr('y2',-39)
      .attr('stroke','black')
      .attr('transform','translate(524,528)scale(0.8)')

  let note43Line = viz.append('line')
      .attr('x1',5)
      .attr('y1',-30)
      .attr('x2',25)
      .attr('y2',-34)
      .attr('stroke-width','3')
      .attr('stroke','black')
      .attr('transform','translate(524,528)scale(0.8)')

  let note4 = viz.append('path')
    .attr('d',"M9.74,24.48a4.55,4.55,0,0,1-.22,3c-1,2.31-3.78,2.62-4.17,2.66-1.74.18-4.5-.4-5.2-2.45-.76-2.23,1.36-4.66,3.25-5.59a4.77,4.77,0,0,1,4.29-.2A4.4,4.4,0,0,1,9.74,24.48Z"  )
    .attr('fill','black')
    .attr('stroke','black')
    .attr('transform','translate(555,495)scale(0.8)')


  let note4Line = viz.append('line')
    .attr('x1',5)
    .attr('y1',-10)
    .attr('x2',5)
    .attr('y2',-35)
    .attr('stroke','black')
    .attr('transform','translate(559,524)scale(0.8)')


  let note4Line2 = viz.append('path')
    .attr('d',"M13.46,15.58c1.07-2.44,2.16-6.07.84-9a22.1,22.1,0,0,0-1.17-2.13A28.08,28.08,0,0,0,9.84,0"  )
    .attr('fill','transparent')
    .attr('stroke','black')
    .attr('transform','translate(555,496)scale(0.8)')

  let mydata = [1,2,3,4,5,6]

  // function xLocation(datapoint){
  //   return (datapoint*120-60)
  // }

  function ylocation(datapoint){
    if(datapoint == '1'){
      return 'translate('+(datapoint*120-60)+','+705+')'
    }
    if(datapoint == '2'){
      return 'translate('+(datapoint*120-60)+','+695+')'
    }
    if(datapoint == '3'){
      return 'translate('+(datapoint*120-60)+','+663+')'
    }
    if(datapoint == '4'){
      return 'translate('+(datapoint*120-60)+','+664+')'
    }
    if(datapoint == '5'){
      return 'translate('+(datapoint*120-60)+','+635+')'
    }
    else{
      return 'translate('+(datapoint*120-60)+','+630+')'
    }
  }
// function getLocation(datapoint){
//   return 'translate('+ylocation+','+xLocation+')'
// }
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
  let types = viz.append('text')
    .text('Different Types of Twitters: ')
    .attr('dx',50)
    .attr('dy',610)
    .style('font-size',40)
    .attr('font-family','Amatic SC')
    .attr('fill','black')


 viz.selectAll('#mydata').data(mydata).enter()
    .append('path')
        .attr('d','M14.89,40.05c4.74,7.56,14,13.79,24.76,12.84,11.54-1,18.08-9.72,19.11-11.14,36.79,4.15,46,4,46.14,2.78.26-1.88-20.72-4.62-45.7-20.32-4.93-3.11-9.63-6.6-9.65-6.61h0l.65.48A17.47,17.47,0,0,0,47,6.53,17.7,17.7,0,0,0,37.14,0,21.06,21.06,0,0,0,21.23,2.12a21.27,21.27,0,0,0-9.54,12.44l-12.8-2.22,10.72,7.2L-2.46,23.38l13.23,1.17A27.87,27.87,0,0,0,14.89,40.05Z')
        .attr('fill',color)
        .attr('stroke','transparent')
        .attr('transform',ylocation)

  viz.selectAll('#mydata').data(mydata).enter()
    .append('circle')
    .attr('cx',23)
    .attr('cy',15)
    .attr('stroke','black')
    .attr('r',2)
    .attr('transform',ylocation)
