
// let fs = require('fs');
// let sd = fs.readFile('data_file.json','utf-8',function(err,data){
//   let da = JSON.parse(data);
//   console.log(da);
// })
// console.log(sd);

var obj = require("/Users/apple/Desktop/my-cdv-ss20/addressAPI/data_file.json");
console.log(obj[20].location);

var baiduMap = require('baidumap');
var bdmap = baiduMap.create({'ak':'uMu5WvF2Frp8phz7ANO0yrbbwFePSpVG'});

// var options = {'query':'康沈路','region':'上海'};
// bdmap.search(options,function(err,result){
//   result = JSON.parse(result)
//   console.log(result);
// })
// for(let i = 0; i<obj.length;i++){
//   var text = obj[i].location;
//   var options = {'query':text,'region':'上海'};
//   bdmap.search(options,function(err,result){
//     result = JSON.parse(result)
//     // if(result.results.length > 0){
//     console.log(text + ' '+ result.results[0].location);
//   // }
//   });
//
// }
