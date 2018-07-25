// Place functions here that are common to all games

function drawLine(ctx, startX, startY, endX, endY) {
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
}

function drawCircle(ctx, x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2*Math.PI);
  ctx.stroke();
}

function fillCircle(ctx, x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2*Math.PI);
  ctx.fill();
}
