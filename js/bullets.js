class Bullets {
  constructor(ctx, playerPosX, playerPosY, playerWidth, playerHeight) {
    this.ctx = ctx;
    this.posX = playerPosX + playerWidth / 2; 
    this.posY = playerPosY; 
    this.playerWidth = playerWidth;
    this.playerHeight = playerHeight;
    this.radius = 10; 
    this.velX = 1; 
    this.velY = 15;
  }


  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "yellowgreen";
    this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();

    this.move();
  }
  

  move() {
    this.posY -= this.velY;
  }
}
