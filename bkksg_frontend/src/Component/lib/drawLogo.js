let orbit = {
  pos: { x: 5, y: 5,},
  width: 190,
  height: 50,
}

let cometPos = {x: 0, y: 0,}

let sun = 30

let info = {
  pos: "left",
  speed: { x: 0.5, y: 0.5, },
  tail: 9,
  updateSpeed: 0.5,
};

const max = {
  x: orbit.pos.x + orbit.width - info.tail / 2,
  y: orbit.pos.y + orbit.height - info.tail / 2,
};

const min = {
  x: orbit.pos.x - info.tail / 2,
  y: orbit.pos.y - info.tail / 2,
};

const cometOrbit = (ctx, color) => {
  ctx.lineWidth = 2;
  ctx.strokeStyle = color;
  ctx.strokeRect(orbit.pos.x, orbit.pos.y, orbit.width, orbit.height);
  //comet Orbit 160*35
  ctx.fillStyle = color;
  ctx.fill();
  ctx.fillRect(orbit.pos.x * 3.2, orbit.pos.y + 10, sun, sun);
  // sun
};

const drawComet = (ctx, cometPos, tail, pos, color) => {
  ctx.beginPath();
  if (pos === "bottom") {
    ctx.moveTo(cometPos.x - tail / 2, cometPos.y + tail / 2);
    ctx.lineTo(cometPos.x, cometPos.y);
    ctx.lineTo(cometPos.x, cometPos.y + tail);
  } else if (pos === "left") {
    ctx.moveTo(cometPos.x + tail / 2, cometPos.y - tail / 2);
    ctx.lineTo(cometPos.x, cometPos.y);
    ctx.lineTo(cometPos.x + tail, cometPos.y);
  } else if (pos === "top") {
    ctx.moveTo(cometPos.x + (tail * 3) / 2, cometPos.y + tail / 2);
    ctx.lineTo(cometPos.x + tail, cometPos.y);
    ctx.lineTo(cometPos.x + tail, cometPos.y + tail);
  } else if (pos === "right") {
    ctx.moveTo(cometPos.x + tail / 2, cometPos.y + (tail * 3) / 2);
    ctx.lineTo(cometPos.x, cometPos.y + tail);
    ctx.lineTo(cometPos.x + tail, cometPos.y + tail);
  }
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.fillRect(cometPos.x, cometPos.y, tail, tail);
};

const makeComet = (ctx, color) => {
  drawComet(ctx, cometPos, info.tail, info.pos, color);
  switch (info.pos) {
    case "left":
      cometPos.y = cometPos.y + info.speed.y;
      if (cometPos.y >= max.y) {
        cometPos.y = max.y;
        info.speed.x = info.updateSpeed;
        info.speed.y = 0;
        info.pos = "bottom";
      }
      break

    case "bottom":
      cometPos.x = cometPos.x + info.speed.x;
      if (cometPos.x >= max.x) {
        cometPos.x = max.x;
        info.speed.x = 0;
        info.speed.y = info.updateSpeed;
        info.pos = "right";
      }
      break

    case "right":
      cometPos.y = cometPos.y - info.speed.y;
      if (cometPos.y <= min.y) {
        cometPos.y = min.y;
        info.speed.x = info.updateSpeed;
        info.speed.y = 0;
        info.pos = "top";
      }
      break

    case "top":
      cometPos.x = cometPos.x - info.speed.x;
      if (cometPos.x <= min.x) {
        cometPos.x = min.x;
        info.speed.x = 0;
        info.speed.y = info.updateSpeed;
        info.pos = "left";
      }
      break

      default: info.pos = "left"
      break
  }
};

export { cometOrbit, makeComet };
