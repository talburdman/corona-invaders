class Player {
  constructor(
    ctx,
    canvasSize,
    posX,
    posY,
    playerWidth,
    playerHeight,
    image,
    playerKeys,
  ) {
    this.ctx = ctx;
    this.canvasSize = {
      w: canvasSize.w,
      h: canvasSize.h,
    };

    this.playerPos = {
      x: posX,
      y: posY,
    };

    this.playerSize = {
      w: playerWidth,
      h: playerHeight,
    };

    this.imageName = image;
    this.imageInstance = undefined;
    this.bullets = [];
    this.keys = playerKeys;
    this.playerSound = new Audio('./audio/button-3.mp3');

    this.init();
  }

  init() {
    this.imageInstance = new Image();
    this.imageInstance.src = `images/${this.imageName}`;
  }

  draw() {
    this.ctx.drawImage(
      this.imageInstance,
      this.playerPos.x,
      this.playerPos.y - 20,
      this.playerSize.w,
      this.playerSize.h
    );
    this.bullets.forEach((bullet) => bullet.draw());
    this.move();
  }

  move(dir) {
    dir === "left" ? (this.playerPos.x -= 20) : null;
    dir === "right" ? (this.playerPos.x += 20) : null;

    if (this.playerPos.x <= 0) {
      this.stopMovementLeft();
    } else if (this.playerPos.x >= this.canvasSize.w - this.playerSize.w) {
      this.stopMovementRight();
    } else {
      return null;
    }
  }

  stopMovementLeft() {
    return this.playerPos.x = 0
  }

  stopMovementRight() {
    return (this.playerPos.x = this.canvasSize.w - this.playerSize.w);
  }

  shoot() {
    const bullet = new Bullets(
      this.ctx,
      this.playerPos.x,
      this.playerPos.y,
      this.playerSize.w,
      this.playerSize.h,
    );
    this.bullets.push(bullet);
    this.playerSound.play();
  }

  clearBullets() {
    this.bullets = this.bullets.filter(
      (bull) => bull.posY <= this.canvasSize.h
    );
  }
}
