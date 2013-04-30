var Effects = Effects || {}

Effects.SmileyFace = function() {

  function createSmileyFace(context) {
    // face
    context.beginPath();
    context.lineWidth = 10;
    context.strokeStyle = "rgb(0, 0, 0)";
    context.arc(200, 233, 150, 0, 2 * Math.PI, true);
    context.stroke();

    // color face
    context.beginPath();
    context.fillStyle = "rgba(80, 100, 80, 0.4)";
    context.arc(200, 233, 150, 0, 2 * Math.PI, true);
    context.fill();

    // right eye
    context.lineWidth = 20;
    context.beginPath();
    context.moveTo(230, 130);
    context.bezierCurveTo(230, 130, 230, 130, 240, 200);
    context.stroke();

    // left eye
    context.beginPath();
    context.moveTo(170, 130);
    context.bezierCurveTo(170, 130, 170, 130, 160, 200);
    context.stroke();

    // upper lip
    context.beginPath();
    context.moveTo(100, 230);
    context.bezierCurveTo(100, 230, 200, 380, 300, 230);
    context.stroke();

    // lower lip
    context.beginPath();
    context.moveTo(100, 235);
    context.bezierCurveTo(105, 270, 200, 480, 300, 232);
    context.stroke();
  }
}