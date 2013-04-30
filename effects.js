var Effects = Effects || {}

Effects.get_random_color = function() {
//http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

Effects.get_random_offset = function(){
  var randomX = Math.floor((Math.random()*100)+1);
  var randomY = Math.floor((Math.random()*100)+1);
  return [randomX, randomY];
}

