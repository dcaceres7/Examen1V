if(typeof module !== "undefined") {
  var fs = require('fs');
  var arr = [];
  var init = "hola";
  var finish = "come"
}
// Lectura asíncrona
function readWordList(){
  letter = fs.readFileSync( 'listado-general.txt', 'utf8');
  wordList = letter.split("\n");
  pushArr(wordList);
}

function pushArr(word_list) {
  for(var i = 0; i < word_list.length; i++) {
    if(word_list[i].length === init.length)
      arr.push(word_list[i]);
  }
}

function solver(start, end, dict){
  if(start===end)
    return [ [ start, end ] ];
  var word = getArrPossibleSolutions(start, dict);
  for (var i = 0 ; i < word.length ; i++) {
    var reducedDict = dict.slice(0);
    reducedDict.splice(reducedDict.indexOf(word[i]), 1);
    var temp = solver(word[i], end, reducedDict);
    if(temp != [])
      return temp;
  } 
  return [];
}

function getArrPossibleSolutions(word, dict){
  var words = [];
  if(dict != null)
    for (var i = 0 ; i < dict.length ; i++) {
      if (checkWord(word, dict[i])) {
        words.push(dict[i]);
      }
    }
  return words;
}

function checkWord(a, b) {
  var count = 0;
  if (a.length != b.length) {
    return false;
  }
  for (var i = 0 ; i < a.length ; i++) {
    if (a[i] != b[i]) {
      if (++count > 1) {
        return false;
      }
    }
  }
  return true;
}

readWordList();
var x = solver(init, finish, arr);
console.log(x);