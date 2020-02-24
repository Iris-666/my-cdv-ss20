console.log("hi");

let data = [

      {
          "timestamp": "2020-02-23T07:55:29.792Z",
          "black": 10,
          "white": 10,
          "blue": 5,
          "pink": 5,
          "red": 5,
          "purple": 5,
          "green": 7,
          "orange": 10,
          "grey": 10,
          "brown": 10,
          "yellow": 5
      },
      {
          "timestamp": "2020-02-23T07:57:53.846Z",
          "black": 8,
          "white": 8,
          "blue": 7,
          "pink": 5,
          "red": 7,
          "purple": 8,
          "green": 5,
          "orange": 6,
          "grey": 4,
          "brown": 5,
          "yellow": 5
      },
      {
          "timestamp": "2020-02-23T07:58:10.172Z",
          "black": 10,
          "white": 10,
          "blue": 10,
          "pink": 8,
          "red": 8,
          "purple": 9,
          "green": 6,
          "orange": 5,
          "grey": 9,
          "brown": 7,
          "yellow": 8
      },
      {
          "timestamp": "2020-02-23T08:00:47.230Z",
          "black": 8,
          "white": 10,
          "blue": 10,
          "pink": 9,
          "red": 9,
          "purple": 9,
          "green": 8,
          "orange": 5,
          "grey": 9,
          "brown": 5,
          "yellow": 9
      },
      {
          "timestamp": "2020-02-23T08:06:56.200Z",
          "black": 10,
          "white": 10,
          "blue": 6,
          "pink": 3,
          "red": 4,
          "purple": 8,
          "green": 3,
          "orange": 7,
          "grey": 8,
          "brown": 6,
          "yellow": 8
      },
      {
          "timestamp": "2020-02-23T08:18:46.619Z",
          "black": 1,
          "white": 10,
          "blue": 4,
          "pink": 8,
          "red": 8,
          "purple": 3,
          "green": 3,
          "orange": 5,
          "grey": 3,
          "brown": 8,
          "yellow": 8
      },
      {
          "timestamp": "2020-02-23T08:25:46.681Z",
          "black": 4,
          "white": 4,
          "blue": 4,
          "pink": 10,
          "red": 10,
          "purple": 6,
          "green": 6,
          "orange": 10,
          "grey": 4,
          "brown": 8,
          "yellow": 10
      },
      {
          "timestamp": "2020-02-23T09:24:54.274Z",
          "black": 8,
          "white": 6,
          "blue": 6,
          "pink": 5,
          "red": 7,
          "purple": 3,
          "green": 3,
          "orange": 5,
          "grey": 5,
          "brown": 3,
          "yellow": 7
      },
      {
          "timestamp": "2020-02-23T09:24:59.370Z",
          "black": 9,
          "white": 9,
          "blue": 8,
          "pink": 7,
          "red": 6,
          "purple": 8,
          "green": 8,
          "orange": 7,
          "grey": 10,
          "brown": 7,
          "yellow": 7
      },
      {
          "timestamp": "2020-02-23T10:51:07.453Z",
          "black": 10,
          "white": 10,
          "blue": 8,
          "pink": 2,
          "red": 2,
          "purple": 6,
          "green": 4,
          "orange": 8,
          "grey": 9,
          "brown": 6,
          "yellow": 7
      },
      {
          "timestamp": "2020-02-23T10:52:06.399Z",
          "black": 10,
          "white": 10,
          "blue": 10,
          "pink": 1,
          "red": 8,
          "purple": 10,
          "green": 9,
          "orange": 10,
          "grey": 5,
          "brown": 5,
          "yellow": 10
      },
      {
          "timestamp": "2020-02-23T10:54:08.111Z",
          "black": 5,
          "white": 7,
          "blue": 6,
          "pink": 9,
          "red": 7,
          "purple": 8,
          "green": 7,
          "orange": 4,
          "grey": 3,
          "brown": 2,
          "yellow": 8
      },
      {
          "timestamp": "2020-02-23T12:13:21.333Z",
          "black": 10,
          "white": 10,
          "blue": 10,
          "pink": 6,
          "red": 5,
          "purple": 8,
          "green": 10,
          "orange": 8,
          "grey": 10,
          "brown": 7,
          "yellow": 9
      },
      {
          "timestamp": "2020-02-23T12:52:49.887Z",
          "black": 3,
          "white": 5,
          "blue": 7,
          "pink": 8,
          "red": 10,
          "purple": 7,
          "green": 9,
          "orange": 8,
          "grey": 9,
          "brown": 7,
          "yellow": 8
      }

]
console.log(data);
// the function dates a data
// arrayn as an argument

//function to get averageData
function averageData(data){
  // new empty array to be filled
  // with data in new structure
  let newData = [];
  // assuming each data point has the same
  // keys/categories, we extract an array of them from the
  // first data point in the array
  // in class we changed it to the last element instead
  // as the first one did not have all the categories filled out
  // there is more thorough ways to do this, but for out purposes
  // now, this will be enough
  let keys = Object.keys(data[0]);
  // now we loop over the keys/categories
  for(let i = 0; i < keys.length; i++){
    // store the current key/category in
    // a variable:
    let key = keys[i];
    // now we will loop over each data point
    // in the data set, check if it has a value
    // for the key/category and add them to
    // a total sum variable
    // as well as count the occurences in order to
    // calulate the averae in the end
    let sum = 0;
    let num = 0;
    for(let j = 0; j < data.length; j++){
      let datum = data[j];
      // check if the key exists
      // for this datapoint
      if(key in datum){
        // add to sum
        sum += datum[key];
        // increase count
        num++;
      }
    }
    // now calculate the average
    let avg = sum/num;
    // make sure the value is a number
    // (some value might be strings)
    if(!isNaN(avg)){
      // create an object with both the average
      // and also the number of measurements that
      // went into the average
      let newDataPoint = {"name": key, "average": avg, 'numMeasurements': num};
      // add the new datapoint to the new data array
      newData.push(newDataPoint);
    }
  }
  // return everything when it is done
  return newData;
}

let transformedData = averageData(data);
console.log(transformedData);

// for loop showing all the data in bar
for(let i = 0; i < transformedData.length; i++){
  let datapoint = transformedData[i];
  console.log(datapoint);
  let bar = document.createElement("div");
  bar.className="bar";
  bar.style.width = datapoint.average*130 + "px";
  let barnamediv = document.createElement('div');
  let barname = document.createElement('p');
  barname.innerHTML = datapoint.name + "    " + datapoint.average;

  // let barname = document.createElement('p');
  // barname.innerHTML = datapoint.name + "    " + datapoint.average;
  barname.className = 'barname'
  barnamediv.appendChild(barname);
  //give each bar different colors
  if(i == 0){
    bar.style.backgroundColor = 'black'
    barname.style.color = 'black'
  }
  if(i == 1){
    bar.style.backgroundColor = 'white'
    barname.style.color = 'white'
  }
  if(i == 2){
    bar.style.backgroundColor = '#2EA9DF'
    barname.style.color = '#2EA9DF'
  }
  if(i == 3){
    bar.style.backgroundColor = '#F596AA'
    barname.style.color = '#F596AA'
  }
  if(i == 4){
    bar.style.backgroundColor = '#CB1B45'
    barname.style.color = '#CB1B45'
  }
  if(i == 5){
    bar.style.backgroundColor = '#77428D'
    barname.style.color = '#77428D'
  }
  if(i == 6){
    bar.style.backgroundColor = '#516E41'
    barname.style.color = '#516E41'

  }
  if(i == 7){
    bar.style.backgroundColor = '#FB9966'
    barname.style.color = '#FB9966'

  }
  if(i == 8){
    bar.style.backgroundColor = 'grey'
    barname.style.color = 'grey'

  }
  if(i == 9){
    bar.style.backgroundColor = '#7D532C'
    barname.style.color = '#7D532C'

  }
  if(i == 10){
    bar.style.backgroundColor = '#FAD689'
    barname.style.color = '#FAD689'

  }

  document.getElementById("viz").appendChild(bar);
  document.getElementById("viz").appendChild(barnamediv);

}
