var board; // 2D Array containing the current game state
var canvas; // HTML canvas object, graphical representation of board
var turn; // red=1, blue=-1
var undoStack; // Array of game states
var redoStack; // Array of games states
var redCaptures = 0;
var blueCaptures = 0;
var redMove = 0;
var message = "&nbsp;";
var alertMessage = "&nbsp;";

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
  alertMessage = "&nbsp;"
  if (turn == RED && redMove == 0
      && (x != 9 || y != 9)) {
    alertMessage = "First move must be in the center";
  } else if (turn == 1 && redMove == 1 && x > 6
      && x < 12 && y > 6 && y < 12) {
    alertMessage = "Second move must be at least 3 away from center";
  } else {
    var currentGameState = {
      board:copyPenteBoard(board),
      turn:turn,
      message:message,
      redCaptures:redCaptures,
      blueCaptures:blueCaptures,
      redMove:redMove
    };
    undoStack.push(currentGameState);
    if (board[x][y] == UNOCCUPIED) {
      board[x][y] = turn;
      capture(x, y);
      turn = -turn
      if (turn == RED) {
        redMove += 1;
      }
      var winner = checkForWinner();
      if (winner == RED) {
        message = "Game Over. Red wins!";
      }
      if (winner == BLUE) {
        message = "Game Over. Blue wins!";
      }
      if (winner != NEITHER) {
        turn = NEITHER;
      } else {
        if (turn == RED) {
          message = 'Red, your move'
        } else if (turn == BLUE) {
          message = 'Blue, your move'
        } else {
          message = '&nbsp;'
        }
      }
    } else if (turn != NEITHER) {
      alertMessage = "Space is already occupied"
    }
  }
  drawPenteBoard();
  drawPenteBoard(); // To fix the phantom circle problem
  displayMessages();
}

function drawPenteBoard() {
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
  document.getElementById('red_captures').innerHTML = redCaptures;
  document.getElementById('blue_captures').innerHTML = blueCaptures;
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
  board = new Array(19);
  turn = RED;
  undoStack = new Array();
  redoStack = new Array();
  redCaptures = 0;
  blueCaptures = 0;
  message = 'Red, your move'
  initPenteBoard();
  drawPenteBoard();
  drawPenteBoard(); // To fix the phantom circle problem
  displayPenteMessages();
}

function initPenteBoard() {
  for (var i=0; i<19; i++) {
    board[i] = new Array(19);
    for (var j=0; j<19; j++) {
      board[i][j] = 0;
    }
  }
}

function displayPenteMessages() {
  document.getElementById('message').innerHTML = message;
  document.getElementById('alertMessage').innerHTML = alertMessage;
}

function undoPenteMove() {
  if (undoStack.length == 0) {
    alertMessage = "Can't undo";
    displayPenteMessages();
  } else {
    alertMessage = '&nbsp;';
    var currentGameState = {
      board:copyPenteBoard(board),
      turn:turn,
      message:message,
      redCaptures:redCaptures,
      blueCaptures:blueCaptures,
      redMove:redMove
    };
    redoStack.push(currentGameState);
    var previousGameState = undoStack.pop();
    board = previousGameState.board;
    turn = previousGameState.turn;
    message = previousGameState.message;
    redCaptures = previousGameState.redCaptures;
    blueCaptures = previousGameState.blueCaptures;
    redMove = previousGameState.redMove;
    displayPenteMessages();
    drawPenteBoard();
    drawPenteBoard(); // To fix the phantom circle problem
  }
}

function redoPenteMove() {
  if (redoStack.length == 0) {
    alertMessage = "Can't redo";
    displayPenteMessages();
  } else {
    alertMessage = '&nbsp;';
    var currentGameState = {
      board:copyPenteBoard(board),
      turn:turn,
      message:message,
      redCaptures:redCaptures,
      blueCaptures:blueCaptures,
      redMove:redMove
    };
    undoStack.push(currentGameState);
    var nextGameState = redoStack.pop();
    board = nextGameState.board;
    turn = nextGameState.turn;
    message = nextGameState.message;
    redCaptures = nextGameState.lastX;
    blueCaptures = nextGameState.blueCaptures;
    redMove = nextGameState.redMove;
    displayPenteMessages();
    drawPenteBoard();
    drawPenteBoard(); // To fix the phantom circle problem
  }
}

function copyPenteBoard() {
  var newBoard = new Array(19);
  for (var i=0; i<19; i++) {
    newBoard[i] = new Array(8);
    for (var j=0; j<19; j++) {
      newBoard[i][j] = board[i][j];
    }
  }
  return newBoard;
}

function checkForWinner() {
  if (redCaptures > 4) {
    return RED;
  }
  if (blueCaptures > 4) {
    return BLUE;
  }
  if (redMove < 5) {
    return NEITHER;
  }
  for (var i = 0; i < 19; i++) {
    for (var j = 0; j < 19; j++) {
      if (board[i][j] != 0) {
        var winner = check5(i, j);
        if (winner != NEITHER) {
          return winner;
        }
      }
    }
  }
  return NEITHER;
}

function check5(x, y) {
  var player = board[x][y];
  var n = 0;
  if (y < 15) {
    for (var i = 1; i < 5; i++) {
      if (board[x][y+i] != player) {
        break;
      }
      n++;
    }
  }
  if (n > 3) {
    return player;
  }
  n = 0;
  if (x < 15 && y < 15) {
    for (var i = 1; i < 5; i++) {
      if (board[x+i][y+i] != player) {
        break;
      }
      n++;
    }
  }
  if (n > 3) {
    return player;
  }
  n = 0;
  if (x < 15) {
    for (var i = 1; i < 5; i++) {
      if (board[x+i][y] != player) {
        break;
      }
      n++;
    }
  }
  if (n > 3) {
    return player;
  }
  n = 0;
  if (x > 3 && y < 15) {
    for (var i = 1; i < 5; i++) {
      if (board[x-i][y+i] != player) {
        break;
      }
      n++;
    }
  }
  if (n > 3) {
    return player;
  }
  return 0;
}

function capture(x, y) {
  var countCaptures = 0;
  if (y > 2
      && board[x][y-1] == -turn
      && board[x][y-2] == -turn
      && board[x][y-3] == turn) {
    board[x][y-1] = UNOCCUPIED;
    board[x][y-2] = UNOCCUPIED;
    countCaptures++;
  }
  if (x < 16 && y > 2
      && board[x+1][y-1] == -turn
      && board[x+2][y-2] == -turn
      && board[x+3][y-3] == turn) {
    board[x+1][y-1] = UNOCCUPIED;
    board[x+2][y-2] = UNOCCUPIED;
    countCaptures++;
  }
  if (x < 16
      && board[x+1][y] == -turn
      && board[x+2][y] == -turn
      && board[x+3][y] == turn) {
    board[x+1][y] = UNOCCUPIED;
    board[x+2][y] = UNOCCUPIED;
    countCaptures++;
  }
  if (x < 16 && y < 16
      && board[x+1][y+1] == -turn
      && board[x+2][y+2] == -turn
      && board[x+3][y+3] == turn) {
    board[x+1][y+1] = UNOCCUPIED;
    board[x+2][y+2] = UNOCCUPIED;
    countCaptures++;
  }
  if (y < 16
      && board[x][y+1] == -turn
      && board[x][y+2] == -turn
      && board[x][y+3] == turn) {
    board[x][y+1] = UNOCCUPIED;
    board[x][y+2] = UNOCCUPIED;
    countCaptures++;
  }
  if (x > 2 && y < 16
      && board[x-1][y+1] == -turn
      && board[x-2][y+2] == -turn
      && board[x-3][y+3] == turn) {
    board[x-1][y+1] = UNOCCUPIED;
    board[x-2][y+2] = UNOCCUPIED;
    countCaptures++;
  }
  if (x > 2
      && board[x-1][y] == -turn
      && board[x-2][y] == -turn
      && board[x-3][y] == turn) {
    board[x-1][y] = UNOCCUPIED;
    board[x-2][y] = UNOCCUPIED;
    countCaptures++;
  }
  if (x > 2 && y > 2
      && board[x-1][y-1] == -turn
      && board[x-2][y-2] == -turn
      && board[x-3][y-3] == turn) {
    board[x-1][y-1] = UNOCCUPIED;
    board[x-2][y-2] = UNOCCUPIED;
    countCaptures++;
  }
  if (turn == RED) {
    redCaptures += countCaptures;
  }
  if (turn == BLUE) {
    blueCaptures += countCaptures;
  }
}
