const drawSolarSystemAnimation = (cv, ctx, orbitRatio, planetRatio) => {
  const orbitIndex = { first: 1, fin: 11 }
  const centerPos = {
    x: cv.width / 2.2,
    y: cv.height / 2,
  }
  const orbitInterval = orbitRatio
  const cometOrbit = {
    x: orbitInterval * 9.8,
    y: orbitInterval * 2,
  }
  const scaleRatio = planetRatio
  const speedRatio = 0.3

  const planetPos = { x: [], y: [] }
  const planetOrginPosX = []
  const planetOrginPosY = []

  const cometPos = { x: [], y: [] }
  const cometOriginPos = { x: [], y: [] }

  const cometInitInfo = {
    name: "Comet",
    position: "left",
    speed: {
      x: speedRatio * 0.03,
      y: speedRatio * 0.03,
    },
    tailHeight: scaleRatio * 0.5,
    updateSpeed: speedRatio * 0.03,
  };

  const planetInitInfo = [
    {
      name: "Mercury",
      position: "left",
      scale: scaleRatio * 0.33,
      speed: {
        x: speedRatio * 1.59,
        y: speedRatio * 1.59,
      },
      updateSpeed: speedRatio * 1.59,
      id: 2,
      orbit: 1.2,
      // [0].Mercury
    },
    {
      name: "Venus",
      scale: scaleRatio * 0.95,
      position: "left",
      speed: {
        x: speedRatio * 1.18,
        y: speedRatio * 1.18,
      },
      updateSpeed: speedRatio * 1.18,
      color: "#bc9906",
      // [1].Venus
    },
    {
      name: "Earth",
      scale: scaleRatio,
      position: "left",
      speed: {
        x: speedRatio * 1,
        y: speedRatio * 1,
      },
      updateSpeed: speedRatio * 1,
      color: "#204883",
      // [2].Earth
    },
    {
      name: "Mars",
      scale: scaleRatio * 0.5,
      position: "left",
      speed: {
        x: speedRatio * 0.81,
        y: speedRatio * 0.81,
      },
      updateSpeed: speedRatio * 0.81,
      // [3].Mars
    },
    {
      name: "Ceres",
      scale: scaleRatio * 0.08,
      position: "left",
      speed: {
        x: speedRatio * 0.17,
        y: speedRatio * 0.17,
      },
      updateSpeed: speedRatio * 0.17,
      id: 6,
      // [4].Ceres
    },
    {
      name: "Jupiter",
      position: "left",
      scale: scaleRatio * 1.5,
      speed: {
        x: speedRatio * 0.44,
        y: speedRatio * 0.44,
      },
      updateSpeed: speedRatio * 0.44,
      color: "#7f191a",
      // [5].Jupiter
    },
    {
      name: "Saturn",
      scale: scaleRatio * 1.35,
      position: "left",
      speed: {
        x: speedRatio * 0.32,
        y: speedRatio * 0.32,
      },
      updateSpeed: speedRatio * 0.32,
      // [6].Saturn
    },
    {
      name: "Uranus",
      scale: scaleRatio * Math.sqrt(2),
      position: "left",
      speed: {
        x: speedRatio * 0.23,
        y: speedRatio * 0.23,
      },
      updateSpeed: speedRatio * 0.23,
      color: "#16757a",
      // [7].Uranus
    },
    {
      name: "Neptune",
      scale: scaleRatio * 1.15,
      position: "left",
      speed: {
        x: speedRatio * 0.18,
        y: speedRatio * 0.18,
      },
      updateSpeed: speedRatio * 0.18,
      color: "#204883",
      // [8].Neptune
    },
    {
      name: "Pluto",
      scale: scaleRatio * 0.16,
      position: "left",
      speed: {
        x: speedRatio * 0.16,
        y: speedRatio * 0.16,
      },
      updateSpeed: speedRatio * 0.16,
      // [9].Pluto
    },
    {
      name: "Moon",
      scale: scaleRatio * 0.2,
      position: "left",
      speed: {
        x: speedRatio * 0.03,
        y: speedRatio * 0.03,
      },
      orbit: {
        x: 1.5,
        y: 1.5,
        min: -1,
        max: 1.5,
      },

      updateSpeed: speedRatio * 0.03,
      // [10].Moon
    },
  ];

  let timeId;
  const getPlanetPos = (interval, initInfo) => {
    let _Dot;
    if (typeof interval === "object") {
      cometPos.x = centerPos.x - cometOrbit.x / 2
      cometPos.y = centerPos.y - cometOrbit.y / 2

      cometOriginPos.x = centerPos.x - cometOrbit.x / 2
      cometOriginPos.y = centerPos.y - cometOrbit.y / 2

      let _cometDot = setPlanetPosToRandom(cometPos.x, cometPos.y, interval)
      cometPos.x = _cometDot.x
      cometPos.y = _cometDot.y
      cometInitInfo.position = _cometDot.corner
      _Dot = _cometDot

      return _Dot
    } else {
      let _Dots = []
      for (var i = orbitIndex.first; i < orbitIndex.fin; i++) {
        if (i === 1) {
          planetPos.x[i] =
            centerPos.x - (interval * (i + 1)) / (initInfo[i - 1].orbit * 2)
          planetPos.y[i] =
            centerPos.y - (interval * (i + 1)) / (initInfo[i - 1].orbit * 2)

          planetOrginPosX[i] =
            centerPos.x - (interval * (i + 1)) / (initInfo[i - 1].orbit * 2)
          planetOrginPosY[i] =
            centerPos.y - (interval * (i + 1)) / (initInfo[i - 1].orbit * 2)
          i++
        }
        planetPos.x[i] = centerPos.x - (interval * (i + 1)) / 2
        planetPos.y[i] = centerPos.y - (interval * (i + 1)) / 2

        planetOrginPosX[i] = centerPos.x - (interval * (i + 1)) / 2
        planetOrginPosY[i] = centerPos.y - (interval * (i + 1)) / 2
      }

      for (var i = orbitIndex.first; i < orbitIndex.fin; i++) {
        let _sampleDot = setPlanetPosToRandom(
          planetPos.x[i],
          planetPos.y[i],
          interval * (i + 1)
        );

        planetPos.x[i] = _sampleDot.x
        planetPos.y[i] = _sampleDot.y
        planetInitInfo[i - 1].position = _sampleDot.corner
        _Dots.push(_sampleDot)
      }

      return _Dots
    }
  }

  const setPlanetPosToRandom = (planetPosX, planetPosY, interval) => {
    let randomOption = {
      first: Math.random() < 0.5,
      second: Math.random() < 0.5,
    };

    if (typeof interval === "object") {
      let _posX =
        Math.floor(Math.random() * (planetPosX + interval.x - planetPosX)) +
        planetPosX
      let _posY =
        Math.floor(Math.random() * (planetPosY + interval.y - planetPosY)) +
        planetPosY

      if (randomOption.first) {
        if (randomOption.second) 
          return { x: _posX, y: planetPosY, corner: "top" }
        else 
          return { x: _posX, y: planetPosY + interval.y, corner: "bottom" }
      } else {
        if (randomOption.second) 
          return { x: planetPosX, y: _posY, corner: "left" }
        else 
          return { x: planetPosX + interval.x, y: _posY, corner: "right" }
      }
    } else {
      let _posX =
        Math.floor(Math.random() * (planetPosX + interval - planetPosX)) +
        planetPosX
      let _posY =
        Math.floor(Math.random() * (planetPosY + interval - planetPosY)) +
        planetPosY

      if (randomOption.first) {
        if (randomOption.second) 
          return { x: _posX, y: planetPosY, corner: "top" }
        else 
          return { x: _posX, y: planetPosY + interval, corner: "bottom" }
      } else {
        if (randomOption.second)
          return { x: planetPosX, y: _posY, corner: "left" }
        else 
          return { x: planetPosX + interval, y: _posY, corner: "right" }
      }
    }
  }

  // min <= number < max (max 값 불포함)
  // Math.floor(Math.random() * (max - min)) + min
  const drawDiamond = (ctx, x, y, width, height, color) => {
    // diamond centerPos x: x, y: y+height/2
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x - width / 2, y + height / 2)
    ctx.lineTo(x, y + height)
    ctx.lineTo(x + width / 2, y + height / 2)
    ctx.closePath()
    ctx.fillStyle = color
    ctx.fill()
  }

  const paintPlanet = (initInfo, dotPos) => {
    if (initInfo.name === "Venus") {
      ctx.fillStyle = "rgba(255,255,255,0.2)"
      ctx.fillRect(
        dotPos.x - initInfo.scale / 2,
        dotPos.y - initInfo.scale / 2,
        initInfo.scale,
        initInfo.scale
      )
      ctx.fillStyle = initInfo.color
      ctx.fillRect(
        dotPos.x - (initInfo.scale / 2) * 0.6,
        dotPos.y - (initInfo.scale / 2) * 0.6,
        initInfo.scale * 0.6,
        initInfo.scale * 0.6
      )
    } else if (initInfo.name === "Earth") {
      ctx.fillStyle = "rgba(255,255,255,0.3)"
      ctx.fillRect(
        dotPos.x - initInfo.scale / 2,
        dotPos.y - initInfo.scale / 2,
        initInfo.scale,
        initInfo.scale
      )
      ctx.fillStyle = initInfo.color
      ctx.fillRect(
        dotPos.x - (initInfo.scale / 2) * 0.9,
        dotPos.y - (initInfo.scale / 2) * 0.9,
        initInfo.scale * 0.9,
        initInfo.scale * 0.9
      )
      ctx.strokeStyle = "rgba(255,255,255,0.8)"
      ctx.lineWidth = 2
      ctx.strokeRect(
        dotPos.x - (initInfo.scale / 2) * 0.6,
        dotPos.y - (initInfo.scale / 2) * 0.6,
        initInfo.scale * 0.6,
        initInfo.scale * 0.6
      )
      ctx.lineWidth = 1.5
    } else if (initInfo.name === "Jupiter") {
      ctx.fillStyle = "rgba(255,255,255,0.3)"
      ctx.fillRect(
        dotPos.x - initInfo.scale / 2,
        dotPos.y - initInfo.scale / 2,
        initInfo.scale,
        initInfo.scale
      )
      ctx.fillStyle = initInfo.color
      ctx.fillRect(
        dotPos.x - initInfo.scale / 4,
        dotPos.y - initInfo.scale / 4,
        initInfo.scale / 2,
        initInfo.scale / 2
      )
    } else if (initInfo.name === "Saturn") {
      ctx.fillStyle = "white"
      ctx.fillRect(
        dotPos.x - (initInfo.scale / 2) * 0.6,
        dotPos.y - (initInfo.scale / 2) * 0.6,
        initInfo.scale * 0.6,
        initInfo.scale * 0.6
      )
      ctx.strokeStyle = "rgba(255,255,255,0.3)"
      ctx.lineWidth = 5
      ctx.strokeRect(
        dotPos.x - initInfo.scale / 2,
        dotPos.y - initInfo.scale / 2,
        initInfo.scale,
        initInfo.scale
      )
    } else if (initInfo.name === "Uranus") {
      drawDiamond(
        ctx,
        dotPos.x,
        dotPos.y - initInfo.scale / 2,
        initInfo.scale,
        initInfo.scale,
        initInfo.color
      )
    } else if (initInfo.name === "Neptune") {
      ctx.fillStyle = initInfo.color
      ctx.fillRect(
        dotPos.x - initInfo.scale / 2,
        dotPos.y - initInfo.scale / 2,
        initInfo.scale,
        initInfo.scale
      );
    } else if (initInfo.name === "Moon") {
      ctx.fillStyle = "white"
      ctx.fillRect(dotPos.x, dotPos.y, initInfo.scale, initInfo.scale)
    } else {
      ctx.fillStyle = "white"
      ctx.fillRect(
        dotPos.x - initInfo.scale / 2,
        dotPos.y - initInfo.scale / 2,
        initInfo.scale,
        initInfo.scale
      );
      ctx.lineWidth = 1.5
    }
  }

  const SolarSystem = {
    orbit: (ctx, interval) => {
      for (var i = orbitIndex.fin - 1; i > orbitIndex.first; i--) {
        if (i === planetInitInfo[4].id) i--;
        if (i === planetInitInfo[0].id) {
          ctx.lineWidth = 2
          ctx.strokeRect(
            centerPos.x - (interval * i) / (planetInitInfo[0].orbit * 2),
            centerPos.y - (interval * i) / (planetInitInfo[0].orbit * 2),
            (interval * i) / planetInitInfo[0].orbit,
            (interval * i) / planetInitInfo[0].orbit
          )
          i--
        }

        ctx.lineWidth = 2
        ctx.strokeRect(
          centerPos.x - (interval * i) / 2,
          centerPos.y - (interval * i) / 2,
          interval * i,
          interval * i
        );
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.fillRect(
          centerPos.x - interval / 2,
          centerPos.y - interval / 2,
          interval,
          interval
        );
      }
    },

    cometOrbit: (ctx, interval) => {
      ctx.strokeRect(
        centerPos.x - (interval * 4.5) / 2,
        centerPos.y - (interval * 2) / 2,
        interval * 9.8,
        interval * 2
      );
    },
  };

  function Planet(initInfo, dot, originPosX, originPosY, orbitLength, speed) {
    this.initInfo = initInfo
    this.dot = dot
    this.originPosX = originPosX
    this.originPosY = originPosY
    this.orbitLength = orbitLength
    this.speed = speed
  }

  function Satellite(initInfo, parentPlanetPos, speed) {
    this.initInfo = initInfo
    this.parentPlanetPos = parentPlanetPos
    this.speed = speed
  }

  function Comet(initInfo,
    dot,
    cometOriginPos,
    orbitLength,
    speed,
    squareInterval
    ){
      this.initInfo = initInfo
      this.dot = dot
      this.cometOriginPos = cometOriginPos
      this.orbitLength = orbitLength
      this.speed = speed
      this.squareInterval = squareInterval
    }

  Satellite.prototype.catchPlanet = function() {
    let _satellitePos = {
      x: this.parentPlanetPos.x - (scaleRatio * this.initInfo.orbit.x) / 2,
      y: this.parentPlanetPos.y - (scaleRatio * this.initInfo.orbit.y) / 2,
    }
    switch (this.initInfo.position) {
      case "left":
        this.initInfo.orbit.y = this.initInfo.orbit.y + this.initInfo.speed.y
        if (this.initInfo.orbit.y >= this.initInfo.orbit.max) {
          _satellitePos.y =
            this.parentPlanetPos.y - (scaleRatio * this.initInfo.orbit.y) / 2
          this.initInfo.speed.x = this.initInfo.updateSpeed
          this.initInfo.speed.y = 0
          this.initInfo.position = "bottom"
        }
        break

      case "bottom":
        this.initInfo.orbit.x = this.initInfo.orbit.x + this.initInfo.speed.x
        if (this.initInfo.orbit.x >= this.initInfo.orbit.max) {
          _satellitePos.x =
            this.parentPlanetPos.x - (scaleRatio * this.initInfo.orbit.x) / 2
          this.initInfo.speed.x = 0
          this.initInfo.speed.y = this.initInfo.updateSpeed
          this.initInfo.position = "right"
        }
        break

      case "right":
        this.initInfo.orbit.y = this.initInfo.orbit.y - this.initInfo.speed.y

        if (this.initInfo.orbit.y <= this.initInfo.orbit.min) {
          _satellitePos.y =
            this.parentPlanetPos.y - (scaleRatio * this.initInfo.orbit.y) / 2
          this.initInfo.speed.x = this.initInfo.updateSpeed;
          this.initInfo.speed.y = 0
          this.initInfo.position = "top"
        }
        break

      case "top":
        this.initInfo.orbit.x = this.initInfo.orbit.x - this.initInfo.speed.x

        if (this.initInfo.orbit.x <= this.initInfo.orbit.min) {
          _satellitePos.x =
            this.parentPlanetPos.x - (scaleRatio * this.initInfo.orbit.x) / 2
          this.initInfo.speed.x = 0
          this.initInfo.speed.y = this.initInfo.updateSpeed
          this.initInfo.position = "left"
        }
        break

      default: this.initInfo.position = "left"
        break
    }
    paintPlanet(this.initInfo, _satellitePos)
  };

  Planet.prototype.makeDot = function(initInfo) {
    paintPlanet(this.initInfo, this.dot);
    if (initInfo.name === "Mercury")
      this.orbitLength = (orbitInterval * initInfo.id) / initInfo.orbit
    switch (this.initInfo.position) {
      case "left":
        this.dot.y = this.dot.y + this.initInfo.speed.y
        if (this.dot.y >= this.originPosY + this.orbitLength) {
          this.dot.y = this.originPosY + this.orbitLength
          this.initInfo.speed.x = this.speed
          this.initInfo.speed.y = 0
          this.initInfo.position = "bottom"
        }
        break

      case "bottom":
        this.dot.x = this.dot.x + this.initInfo.speed.x
        if (this.dot.x >= this.originPosX + this.orbitLength) {
          this.dot.x = this.originPosX + this.orbitLength
          this.initInfo.speed.x = 0
          this.initInfo.speed.y = this.speed
          this.initInfo.position = "right"
        }
        break

      case "right":
        this.dot.y = this.dot.y - this.initInfo.speed.y
        if (this.dot.y <= this.originPosY) {
          this.dot.y = this.originPosY
          this.initInfo.speed.x = this.speed
          this.initInfo.speed.y = 0
          this.initInfo.position = "top"
        }
        break

      case "top":
        this.dot.x = this.dot.x - this.initInfo.speed.x
        if (this.dot.x <= this.originPosX) {
          this.dot.x = this.originPosX
          this.initInfo.speed.x = 0
          this.initInfo.speed.y = this.speed
          this.initInfo.position = "left"
        }
        break

      default: this.initInfo.position = "left"
        break
    }
  };

  Comet.prototype.makeComet = function(){
    drawComet(this.initInfo.position, this.dot, this.initInfo.tailHeight, this.squareInterval);
    switch (this.initInfo.position) {
      case "left":
        this.dot.y = this.dot.y + this.initInfo.speed.y
        if (this.dot.y >= this.cometOriginPos.y + this.orbitLength.y) {
          this.dot.y = this.cometOriginPos.y + this.orbitLength.y
          this.initInfo.speed.x = this.speed
          this.initInfo.speed.y = 0
          this.initInfo.position = "bottom"
        }
        break

      case "bottom":
        this.dot.x = this.dot.x + this.initInfo.speed.x
        if (this.dot.x >= this.cometOriginPos.x + this.orbitLength.x) {
          this.dot.x = this.cometOriginPos.x + this.orbitLength.x
          this.initInfo.speed.x = 0
          this.initInfo.speed.y = this.speed
          this.initInfo.position = "right"
        }
        break

      case "right":
        this.dot.y = this.dot.y - this.initInfo.speed.y
        if (this.dot.y <= this.cometOriginPos.y) {
          this.dot.y = this.cometOriginPos.y
          this.initInfo.speed.x = this.speed
          this.initInfo.speed.y = 0
          this.initInfo.position = "top"
        }
        break

      case "top":
        this.dot.x = this.dot.x - this.initInfo.speed.x
        if (this.dot.x <= this.cometOriginPos.x) {
          this.dot.x = this.cometOriginPos.x
          this.initInfo.speed.x = 0
          this.initInfo.speed.y = this.speed
          this.initInfo.position = "left"
        }
        break

      default: this.initInfo.position = "left"
      break
  }
}


  const drawComet = (position, dot, tailHeight, interval) => {
    let _cometCenterPos = {
      x: dot.x + interval * 3.01 - tailHeight * 2,
      y: dot.y - tailHeight / 2,
    };
    
    ctx.beginPath();

    if (position === "bottom") {
      ctx.moveTo(
        _cometCenterPos.x - tailHeight / 2,
        _cometCenterPos.y + tailHeight / 2
      );
      ctx.lineTo(_cometCenterPos.x, _cometCenterPos.y)
      ctx.lineTo(_cometCenterPos.x, _cometCenterPos.y + tailHeight)
    } else if (position === "left") {
      ctx.moveTo(
        _cometCenterPos.x + tailHeight / 2,
        _cometCenterPos.y - tailHeight / 2
      );
      ctx.lineTo(_cometCenterPos.x, _cometCenterPos.y)
      ctx.lineTo(_cometCenterPos.x + tailHeight, _cometCenterPos.y)
    } else if (position === "top") {
      ctx.moveTo(
        _cometCenterPos.x + (tailHeight * 3) / 2,
        _cometCenterPos.y + tailHeight / 2
      );
      ctx.lineTo(_cometCenterPos.x + tailHeight, _cometCenterPos.y)
      ctx.lineTo(
        _cometCenterPos.x + tailHeight,
        _cometCenterPos.y + tailHeight
      );
    } else if (position === "right") {
      ctx.moveTo(
        _cometCenterPos.x + tailHeight / 2,
        _cometCenterPos.y + (tailHeight * 3) / 2
      );
      ctx.lineTo(_cometCenterPos.x, _cometCenterPos.y + tailHeight)
      ctx.lineTo(
        _cometCenterPos.x + tailHeight,
        _cometCenterPos.y + tailHeight
      );
    }
    ctx.closePath()
    ctx.fillStyle = "white"
    ctx.fill()
    ctx.fillRect(_cometCenterPos.x, _cometCenterPos.y, tailHeight, tailHeight)
    
  }


  const draw = () => {
    ctx.clearRect(0, 0, cv.width, cv.height)
    SolarSystem.orbit(ctx, orbitInterval)
    SolarSystem.cometOrbit(ctx, orbitInterval)

    for (var i = orbitIndex.first - 1; i < orbitIndex.fin; i++) {
      if (i === 10) {
        let _moon = new Satellite(
          planetInitInfo[i],
          dots[2],
          planetInitInfo[i].updateSpeed
        );
        _moon.catchPlanet()
      } else {
        const _sameplePlanet = new Planet(
          planetInitInfo[i],
          dots[i],
          planetOrginPosX[i + 1],
          planetOrginPosY[i + 1],
          orbitInterval * (i + 2),
          planetInitInfo[i].updateSpeed
        );

        const _comet = new Comet(
          cometInitInfo,
          cometDot,
          cometOriginPos,
          cometOrbit,
          cometInitInfo.updateSpeed,
          orbitInterval
        )
        _sameplePlanet.makeDot(_sameplePlanet.initInfo);
        _comet.makeComet();
      }
    }
    
    timeId = requestAnimationFrame(draw)
  }

  const cometDot = getPlanetPos(cometOrbit, cometInitInfo)
  const dots = getPlanetPos(orbitInterval, planetInitInfo)
  draw()
  requestAnimationFrame(draw)

};

export default drawSolarSystemAnimation;
