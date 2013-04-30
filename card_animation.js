var Reader = Reader || {};

var horizontalTextDirection = "right"; 
var verticalTextDirection = "up";
var direction = "N";

function faceUpCard(){
  var layer = new Kinetic.Layer();
  
  // since this text is inside of a defined area, we can center it using
  // align: 'center'
  var complexText = new Kinetic.Text({
    x: 100,
    y: 60,
    text: 'AT',
    fontSize: 38,
    fontFamily: 'Calibri',
    fill: '#555',
    width: 380,
    padding: 20,
    align: 'center'
  });
  
  var rect = new Kinetic.Rect({
    x: 100,
    y: 60,
    stroke: '#555',
    strokeWidth: 5,
    fill: '#ddd',
    width: 380,
    height: complexText.getHeight(),
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffset: [10, 10],
    shadowOpacity: 0.2,
    cornerRadius: 10
  });
  
  rect.on('touchmove', function() {
    var touchPos = stage.getTouchPosition();
    var x = touchPos.x - 190;
    var y = touchPos.y - 40;
    console.log('moved');
    writeMessage(messageLayer, 'x: ' + x + ', y: ' + y);
  });
  
  // add the shapes to the layer
  layer.add(rect);
  layer.add(complexText);
  stage.add(layer);
}

function animateText(text){
   var layer = new Kinetic.Layer();
  var period = 2000;

  var anim = new Kinetic.Animation(function(frame) {
    var scale = Math.sin(frame.time * 2 * Math.PI / period) + 0.001;
    // scale x and y
    text.setScale(scale);
  }, layer);

  anim.start();
  stage.add(layer);
}

function showTextCenter(audioText){
  var centerX = stage.getWidth()/2;
  var centerY = stage.getHeight()/+2;
  console.log("centerX: " + centerX);
  console.log("centerY: " + centerY);
  
  //determine random x,y for text 
  var text = new Kinetic.Text({
    x: centerX,
    y: centerY,
    text: audioText,
    fontSize: 38,
    fontFamily: 'Calibri',
    fill: get_random_color(),
  });

  return text;
}

function moveLeft(textContext, frame, startX, period){
  textContext.setX(startX - 150 * (frame.time * 2 / period));
}

function moveRight(textContext, frame, startX, period){
  textContext.setX(150 * (frame.time * 2 / period) + startX);
}

function moveUp(context, frame, startY, period){
  context.setY(150 * (frame.time * 2 / period) + startY);
}

function moveDown(context, frame, startY, period){
  context.setY(startY - 150 * (frame.time * 2 / period));
}

function randomAnimation(context, centerX, centerY, period, layer){
  var anim = new Kinetic.Animation(
      function(frame) {
        
        switch(direction){
        case "N":
          moveUp(context, frame, centerY, period);
          break;
        case "NE": 
          moveRight(context, frame, centerX, period);
          moveUp(context, frame, centerY, period);
          break;
        case "SE":
          moveRight(context, frame, centerX, period);
          moveDown(context, frame, centerY, period);
          break;
        case "S":
          moveDown(context, frame, centerY, period);
          break;
        case "SW":
          moveLeft(context, frame, centerX, period);
          moveDown(context, frame, centerY, period);
          break;
        case "W":
          moveLeft(context, frame, centerX, period);
          break;
        case "NW":
          moveUp(context, frame, centerX, period);
          moveLeft(context, frame, centerX, period);
          break;
        default:
        }
      }, 
    layer);
    anim.start();
}

function tango(layer) {
  for(var n = 0; n < layer.getChildren().length; n++) {
    var shape = layer.getChildren()[n];
    var stage = shape.getStage();
    shape.transitionTo({
      rotation: Math.random() * Math.PI * 2,
      //radius: Math.random() * 100 + 20,
      x: Math.random() * stage.getWidth(),
      y: Math.random() * stage.getHeight(),
      opacity: Math.random(),
      duration: 1,
      easing: 'ease-in-out'
    });
  }
}

var TextAnimation = function TextAnimation(stage){
  
  var _stage = stage;
  
  function animateObjects(layer){
    tango(layer);
  }
  
  function placeTextCenterAndDrift(text){
    
     //showTextCenter(text);
    var context = randomTextPlacement(text, stage);
    
    var amplitude = 150;
    var period = 2000;
    var centerX = stage.getWidth() / 2;
    var centerY = stage.getHeight() / 2;
    //randomAnimation(context, centerX, centerY, period, layer);
    
    layer.add(context);
    //bind events before adding to the stage
    //addRotateEvent(context);   
  }
  
  function neonFont(audioText){
    var blur = 10;
    //var width = ctx.measureText(text).width + blur * 2;
    
    var ctx = new Kinetic.Text({
      x: randomX(),
      y: randomY(),
      text: audioText,
      fontSize: 100,
      fontFamily: 'Calibri',
      fill: Effects.get_random_color(),
      textBaseline: 'top',
      shadowColor: '#000',
      shadowOffsetX: 10,
      shadowOffsetY: 0,
      shadowBlur: blur,
      //fillText(text, -width, 0)
      draggable: true,
      offset: Effects.get_random_offset()
    });
    return ctx;
  }
  
  function randomX(){
    var randomX = Math.floor((Math.random()*_stage.getWidth())+1);
    return randomX;
  }
  
  function randomY(){
    var randomY = Math.floor((Math.random()*_stage.getHeight())+1);
    return randomY;
  }
  
  function randomTextPlacement(audioText, x, y){
    //determine random x,y for text  
    //If the text is larger than the viewspace push the value into visibility:   
    //if((randomX + getTextWidth()) > maxWidth)
    //this should ensure that the text is visible, unless it is larger than the canvas
    
    var randomAudioText = new Kinetic.Text({
      x: randomX(), //- getTextWidth(),
      y: randomY(), //- getTextHeight(),
      text: audioText,
      fontSize: 38,
      fontFamily: 'Calibri',
      fill: Effects.get_random_color(),
    });
    return randomAudioText;
  }
  
  
  return {
    createCenter : neonFont,
    //animate:  animateObject,
    createRandom: randomTextPlacement
  }
}




