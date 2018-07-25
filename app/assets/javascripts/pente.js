var board; // 2D Array containing the current game state
var canvas; // HTML canvas object, graphical representation of board
var currentPlayer; // red=1, blue=-1
var undoStack; // Array of game states
var redoStack; // Array of games states
var redCaptures = 0;
var blueCaptures = 0;
var redMove = 0;
var message = "";

// constants
var UNOCCUPIED = 0;
var RED = 1;
var BLUE = -1;
var NEITHER = 0;

// Colors
var bgColor = "#640000";
var boardColor = "#FFFF96";
var lineColor = "#000000";
var player1Color = "#CC0000";
var player2Color = "#0000CC";

function initPente() {
  canvas = document.getElementById("penteCanvas");
  canvas.addEventListener("mousedown", processPenteMouseClick, false);
  newPenteGame();
}

function processPenteMouseClick(event) {
  var x = Math.floor((event.pageX - canvas.offsetLeft - 37.5)/25);
  var y = Math.floor((event.pageY - canvas.offsetTop - 37.5)/25);
  makePenteMove(x, y);
}

function makePenteMove(x, y) {
  if (board[x][y] == UNOCCUPIED) {
    board[x][y] = currentPlayer;
    currentPlayer = -currentPlayer
    drawPenteBoard();
  }
}

function drawPenteBoard() {
  // TODO: refactor line and circle methods
  var ctx = canvas.getContext("2d");
  // background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0,0,550,550);
  // board
  ctx.fillStyle = boardColor;
  ctx.fillRect(45, 45, 460, 460);
  // border lines
  ctx.strokeStyle = lineColor;
  drawLine(ctx, 44, 44, 44, 505);
  drawLine(ctx, 45, 45, 45, 505);
  drawLine(ctx, 44, 45, 505, 45);
  drawLine(ctx, 44, 44, 505, 44);
  drawLine(ctx, 505, 44, 505, 505);
  drawLine(ctx, 504, 44, 504, 505);
  drawLine(ctx, 45, 505, 505, 505);
  drawLine(ctx, 45, 504, 505, 504);
  // grid lines
  for (var i = 50; i <= 500; i += 25) {
    drawLine(ctx, i, 50, i, 500);
  }
  for (var i = 50; i <= 500; i += 25) {
    drawLine(ctx, 50, i, 500, i);
  }
  // bold center lines
  drawLine(ctx, 274, 50, 274, 500);
  drawLine(ctx, 276, 50, 276, 500);
  drawLine(ctx, 50, 274, 500, 274);
  drawLine(ctx, 50, 276, 500, 276);
  // dots at grid intersections
  fillCircle(ctx, 125, 125, 4);
  fillCircle(ctx, 125, 275, 4);
  fillCircle(ctx, 125, 425, 4);
  fillCircle(ctx, 200, 200, 4);
  fillCircle(ctx, 200, 350, 4);
  fillCircle(ctx, 275, 125, 4);
  fillCircle(ctx, 275, 425, 4);
  fillCircle(ctx, 350, 200, 4);
  fillCircle(ctx, 350, 350, 4);
  fillCircle(ctx, 425, 125, 4);
  fillCircle(ctx, 425, 275, 4);
  fillCircle(ctx, 425, 425, 4);
  ctx.fillStyle = bgColor;
  fillCircle(ctx, 275, 275, 4);
  // dot outlines
  drawCircle(ctx, 125, 125, 4);
  drawCircle(ctx, 125, 275, 4);
  drawCircle(ctx, 125, 425, 4);
  drawCircle(ctx, 275, 125, 4);
  drawCircle(ctx, 275, 425, 4);
  drawCircle(ctx, 200, 200, 4);
  drawCircle(ctx, 200, 350, 4);
  drawCircle(ctx, 350, 200, 4);
  drawCircle(ctx, 350, 350, 4);
  drawCircle(ctx, 425, 125, 4);
  drawCircle(ctx, 425, 275, 4);
  drawCircle(ctx, 425, 425, 4);
  drawPentePieces(ctx)
}

function drawPentePieces(ctx) {
  for (var i = 0; i < 19; i++) {
    for (var j = 0; j < 19; j++) {
      if (board[i][j] == RED) {
        ctx.fillStyle = player1Color;
        fillCircle(ctx, i*25+50, j*25+50, 10);
      }
      if (board[i][j] == BLUE) {
        ctx.fillStyle = player2Color
        fillCircle(ctx, i*25+50, j*25+50, 10);
      }
    }
  }
}

function newPenteGame() {
  // TODO: clear undo and redo stacks
  board = new Array(19);
  currentPlayer = RED;
  initPenteBoard();
  drawPenteBoard();
}

function initPenteBoard() {
  for (var i=0; i<19; i++) {
    board[i] = new Array(19);
    for (var j=0; j<19; j++) {
      board[i][j] = 0;
    }
  }
}
