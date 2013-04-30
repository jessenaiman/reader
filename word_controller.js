var CanvasController = function CanvasController(){
  
  var stage = new Kinetic.Stage({
    container: 'container',
    width:  window.innerWidth * 0.9 ,
    height: window.innerHeight * 0.8
  });
  
  var layer = new Kinetic.Layer();
  
  var textAnimations = [scaleText, rotateObject, moveObject, tango];
  var animations = [];
  
  function createRandomEffect(o){
    var effectIndex = Math.floor((Math.random()*textAnimations.length -1)+1);
    animations.push(textAnimations[effectIndex](o));
  }
  
  function createTemporaryText(text){
    var textAnimation = new TextAnimation(stage);
    var o = textAnimation.createRandom(text);
    fadeObject(o);
    addObjectToLayer(o);
    return context;
  }
  
  function createFinalText(text){
    var textAnimation = new TextAnimation(stage);
    var o = textAnimation.createCenter(text);
    //moveObject(context);
    //scaleText(o);
    
    addObjectToLayer(o);
    return context;
  }
  
  function addObjectToLayer(o){
    addRotateEvent(o);
    layer.add(o);
    stage.add(layer);
  }
  
  function setStage(){
    stage.add(layer);
  }
  
  function fadeObject(object){
    var opacity = 1;
    var interval = setInterval(function(){
      opacity = opacity -.25;
      object.setOpacity(opacity);
      layer.draw();
      if(opacity === 0)
        clearInterval(interval);
    },1000);
  }
  
  function scaleText(o){
    var period = 2000;
    
    var anim = new Kinetic.Animation(function(frame) {
        var scale = Math.sin(frame.time * 2 * Math.PI / period) + 0.001;
        // scale x and y
        o.setScale(scale);
        // scale only y
        //yellowHex.setScale(1, scale);
        // scale only x
        //redHex.setScale(scale, 1);
      }, layer);
      anim.start();
      return anim;
  }
  
  function moveObject(o){
    var amplitude = 150;
    var period = 2000;
    // in ms
    var centerX = stage.getWidth() / 2;
    var centerY = stage.getHeight() / 2;
  
    var anim = new Kinetic.Animation(function(frame) {
      o.setX(amplitude * Math.sin(frame.time * 2 * Math.PI / period) + centerX);
      o.setY(amplitude * Math.sin(frame.time * 2 * Math.PI / period) + centerY);
    }, layer);
  
    anim.start();
    return anim;
  }
  
  function addRotateEvent(o){
    o.on('mousestart touchstart', function() {
      console.log('touched');
      createRandomEffect(o);
    });
    
    o.on('mouseup touchend', function() {
      console.log('mouseup or touchend');
      var audio = new Audio();
      audio.src ='http://translate.google.com/translate_tts?ie=utf-8&tl=en&q=' + escape(o.partialText);
      audio.play();
    });
  }
  
  function rotateObject(o){
    // one revolution per 4 seconds
    o.offset = [50, 25];
    var angularSpeed = Math.PI / 2;
    var anim = new Kinetic.Animation(function(frame) {
      var angleDiff = frame.timeDiff * angularSpeed / 1000;
      o.rotate(angleDiff);
    }, layer);
  
    anim.start();
    return anim;
  }
  
  function tango() {
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
  
  function showGarbageTruck() {
    var imageObj = new Image();
      imageObj.onload = function() {
        var yoda = new Kinetic.Image({
          x: 140,
          y: stage.getHeight() / 2 - 59,
          image: imageObj,
          width: 106,
          height: 118,
          draggable: true
        });

        // add the shape to the layer
        layer.add(yoda);

        // add the layer to the stage
        stage.add(layer);
      };
      imageObj.src = 'http://myselfimprovement.net/wp-content/uploads/2013/02/garbage-truck1.gif';
    var particleGenerator = new Effects.Particles(layer.getContext());
    
  }
  
  function stopAnimation(){
    _.each(animations, function(anim){
      anim.stop();
    })
  }
  
  function success(){
    
  }
 
  return{
    layer: layer,
    createText : createTemporaryText,
    setStage: setStage,
    createFinal: createFinalText,
    success: success,
    stopAnimation: stopAnimation,
    showGarbageTruck: showGarbageTruck,
    tango: tango
  }
}