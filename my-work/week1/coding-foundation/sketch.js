let number;
function createCat(){
  number = document.getElementById('inputNum').value //get input value

  for (var i = 0; i < number; i++) {
    var ul = document.createElement('ul'); //create new cats
    ul.className += "flex-item";
    document.getElementById('flex').appendChild(ul);//add the cat to parent list

  }

}
