var canvas;
var board;

function initPente() {
  canvas = document.getElementById("penteCanvas");
  drawPenteBoard();
}

function drawPenteBoard() {
  // TODO: refactor line and cirlce methods
  var ctx = canvas.getContext("2d");
  var bgColor = "#640000";
  var boardColor = "#FFFF96"
  var lineColor = "#000000"

  // background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0,0,550,550);

  // board
  ctx.fillStyle = boardColor;
  ctx.fillRect(45, 45, 460, 460);

  // border lines
  ctx.strokeStyle = lineColor;
  ctx.moveTo(44, 44);
  ctx.lineTo(44, 505);
  ctx.stroke();
  ctx.moveTo(45, 44);
  ctx.lineTo(45, 505);
  ctx.stroke();
  ctx.moveTo(44, 45);
  ctx.lineTo(505, 45);
  ctx.stroke();
  ctx.moveTo(44, 44);
  ctx.lineTo(505, 44);
  ctx.stroke();

  // grid lines
  for (var i = 50; i <= 500; i += 25) {
    ctx.moveTo(i, 50);
    ctx.lineTo(i, 500);
    ctx.stroke();
  }
  for (var i = 50; i <= 500; i += 25) {
    ctx.moveTo(50, i);
    ctx.lineTo(500, i);
    ctx.stroke();
  }

  // center lines
  ctx.moveTo(274, 50);
  ctx.lineTo(274, 500);
  ctx.stroke();
  ctx.moveTo(276, 50);
  ctx.lineTo(276, 500);
  ctx.stroke();
  ctx.moveTo(50, 274);
  ctx.lineTo(500, 274)
  ctx.stroke();
  ctx.moveTo(50, 276);
  ctx.lineTo(500, 276);
  ctx.stroke();

  // dots at grid intersections
  ctx.beginPath();
  ctx.arc(125, 125, 4, 0, 2*Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(125, 275, 4, 0, 2*Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(125, 425, 4, 0, 2*Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(200, 200, 4, 0, 2*Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(200, 350, 4, 0, 2*Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(275, 125, 4, 0, 2*Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(275, 425, 4, 0, 2*Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(350, 200, 4, 0, 2*Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(350, 350, 4, 0, 2*Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(425, 125, 4, 0, 2*Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(425, 275, 4, 0, 2*Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(425, 425, 4, 0, 2*Math.PI);
  ctx.fill();

  // center dot
  ctx.fillStyle = bgColor;
  ctx.beginPath();
  ctx.arc(275, 275, 4, 0, 2*Math.PI);
  ctx.fill();

  // dot outlines
  ctx.beginPath();
  ctx.arc(125, 125, 4, 0, 2*Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(125, 275, 4, 0, 2*Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(125, 425, 4, 0, 2*Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(275, 125, 4, 0, 2*Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(275, 425, 4, 0, 2*Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(200, 200, 4, 0, 2*Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(200, 350, 4, 0, 2*Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(350, 200, 4, 0, 2*Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(350, 350, 4, 0, 2*Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(425, 125, 4, 0, 2*Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(425, 275, 4, 0, 2*Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(425, 425, 4, 0, 2*Math.PI);
  ctx.stroke();
}

function drawPieces() {
  // TODO: implement this method
}
