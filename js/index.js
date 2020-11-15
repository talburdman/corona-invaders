window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  function startGame() {
    console.log('yay')
    drawingApp.init('canvas')
  }
};

const drawingApp = {
  name: "Drawing app",
  description: "Canvas app for Corona Invaders",
  version: "1.0.0",
  license: undefined,
  author: "Cristy López Piñeiro & Tal Burdman",
  canvasTag: undefined,
  ctx: undefined,
  player: undefined,
  speed: 3,
  people: [],
  score: 0,
  totalScore: document.querySelector('.score span'),
  audios: {
    enemySound: new Audio('./audio/sneezing-1.mp3'),
    gameOverSound: new Audio('./audio/explosion-01.mp3'),
    winnerSound: new Audio('./audio/Fanfare-sound.mp3')
  },
  keys: {
    left: "ArrowLeft",
    right: "ArrowRight",
    space: " ",
  },
  canvasSize: {
    w: undefined,
    h: undefined,
  },

  //-------INITIALIZATION
  init(id) {
    this.canvasTag = document.getElementById(id);
    this.ctx = this.canvasTag.getContext("2d");
    this.setDimensions();
    this.createPeople();
    this.movePeople();
    this.createPlayer();
    this.drawAll();
    this.setEventListeners();
    this.isCollision();
    this.score = 0;
  },

  setDimensions() {
    this.canvasSize.w = 700;
    this.canvasSize.h = 800;
    this.canvasTag.setAttribute("width", this.canvasSize.w);
    this.canvasTag.setAttribute("height", this.canvasSize.h);
  },

  //--------BACKGROUND

  drawRectangle() {
    this.ctx.fillStyle = "darkgray";
    this.ctx.fillRect(0, 0, 700, 800);
  },

  //-------------CREATE ENEMIES

  createPeople() {
    const people1 = new People(this.ctx, this.canvasSize, 75, 20, 50, 50, "man.jpg", 2);
    const people2 = new People(this.ctx, this.canvasSize, 146.4, 20, 50, 50, "man2.jpg", 2);
    const people3 = new People(this.ctx, this.canvasSize, 217.8, 20, 50, 50, "mask.png", 2);
    const people4 = new People(this.ctx, this.canvasSize, 289.2, 20, 50, 50, "man.jpg", 2);
    const people5 = new People(this.ctx, this.canvasSize, 360.6, 20, 50, 50, "man2.jpg", 2);
    const people6 = new People(this.ctx, this.canvasSize, 432, 20, 50, 50, "man2.jpg", 2);
    const people7 = new People(this.ctx, this.canvasSize, 503.4, 20, 50, 50, "mask.png", 2);
    const people8 = new People(this.ctx, this.canvasSize, 575, 20, 50, 50, "man2.jpg", 2);
    const people1b = new People(this.ctx, this.canvasSize, 75, 90, 50, 50, "mask.png", 2);
    const people2b = new People(this.ctx, this.canvasSize, 146.4, 90, 50, 50, "man2.jpg", 2);
    const people3b = new People(this.ctx, this.canvasSize, 217.8, 90, 50, 50, "man.jpg", 2);
    const people4b = new People(this.ctx, this.canvasSize, 289.2, 90, 50, 50, "mask.png", 2);
    const people5b = new People(this.ctx, this.canvasSize, 360.6, 90, 50, 50, "man.jpg", 2);
    const people6b = new People(this.ctx, this.canvasSize, 432, 90, 50, 50, "mask.png", 2);
    const people7b = new People(this.ctx, this.canvasSize, 503.4, 90, 50, 50, "man.jpg", 2);
    const people8b = new People(this.ctx, this.canvasSize, 575, 90, 50, 50, "mask.png", 2);
    const people1c = new People(this.ctx, this.canvasSize, 75, 160, 50, 50, "man2.jpg", 2);
    const people2c = new People(this.ctx, this.canvasSize, 146.4, 160, 50, 50, "man.jpg", 2);
    const people3c = new People(this.ctx, this.canvasSize, 217.8, 160, 50, 50, "mask.png", 2);
    const people4c = new People(this.ctx, this.canvasSize, 289.2, 160, 50, 50, "man.jpg", 2);
    const people5c = new People(this.ctx, this.canvasSize, 360.6, 160, 50, 50, "man.jpg", 2);
    const people6c = new People(this.ctx, this.canvasSize, 432, 160, 50, 50, "mask.png", 2);
    const people7c = new People(this.ctx, this.canvasSize, 503.4, 160, 50, 50, "mask.png", 2);
    const people8c = new People(this.ctx, this.canvasSize, 575, 160, 50, 50, "man.jpg", 2);

    this.clearPeople();
    this.people.push(people1, people2, people3, people4, people5, people6, people7, people8, people1b, people2b, people3b, people4b, people5b, people6b, people7b, people8b, people1c, people2c, people3c, people4c, people5c, people6c, people7c, people8c);
  },

  movePeople() {

    let [arrLimit] = this.people.sort((people1, people2) => people2.peoplePos.x - people1.peoplePos.x).slice(0, 1)
    let [arrStart] = this.people.sort((people1, people2) => people1.peoplePos.x - people2.peoplePos.x).slice(0, 1)

    if (
      arrLimit.peoplePos.x + arrLimit.peopleSize.w >=
      this.canvasSize.w
    ) {
      this.people.forEach((elm) => (elm.peoplePos.y += 75));
      this.speed *= -1;
    }

    if (arrStart.peoplePos.x < 0) {
      this.people.forEach((elm) => (elm.peoplePos.y += 75));
      this.speed *= -1;
    }

    this.people.forEach((elm) => (elm.peoplePos.x += this.speed));
  },

  clearPeople() {
    this.people = [];
  },


  //--------------CREATE PLAYER
  createPlayer() {
    this.player = new Player(
      this.ctx,
      this.canvasSize,
      325,
      700,
      100,
      100,
      "corona2.png",
      this.keys
    );
  },

  setEventListeners() {
    document.onkeydown = (e) => {
      e.key === this.keys.left ? this.player.move("left") : null;
      e.key === this.keys.right ? this.player.move("right") : null;
      e.key === this.keys.space ? this.player.shoot(" ") : null;
    };
  },

  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h);
  },

  drawAll() {
    this.interval = setInterval(() => {
      this.clearScreen();
      this.drawRectangle();
      this.player.draw();
      this.people.forEach((elm) => elm.draw());
      this.movePeople();
      if (this.isCollision()) {
        this.gameOver();
      };
      this.isImpact();
      this.isWin();
    }, 60);
  },


  isCollision() {
    let [arrBottom] = this.people.sort((people1, people2) => people2.peoplePos.y - people1.peoplePos.y).slice(0, 1)
    if (
      this.player.playerPos.y < arrBottom.peoplePos.y + arrBottom.peopleSize.h &&
      this.player.playerPos.y + this.player.playerSize.h > arrBottom.peoplePos.y
    ) {
      console.log("game over");
      return this.gameOver()
    }
  },

  //-------------IMPACT
  isImpact() {
    this.player.bullets.forEach((elm1, index) => {
      this.people.forEach((elm2, peopleIndex) => {
        if (
          elm2.peoplePos.x + elm2.peopleSize.w > elm1.posX &&
          elm2.peoplePos.x < elm1.posX + elm1.radius &&
          elm2.peoplePos.y + elm2.peopleSize.h > elm1.posY &&
          elm2.peoplePos.y < elm1.posY + elm1.playerHeight
        ) {
          this.player.bullets.splice(index, 1)
          this.people.splice(peopleIndex, 1)
          this.score += 100;
          this.totalScore.innerHTML = this.score
          this.audios.enemySound.play();
        }
      });
    });
  },


  isWin() {
    if (this.people.length === 0) {
      clearInterval(this.interval);
      this.drawWin();
      this.audios.winnerSound.play();
    }
  },


  drawWin() {
    this.ctx.fillStyle = 'white'
    this.ctx.lineWidth = '10'
    this.ctx.strokeStyle = 'black'
    this.ctx.strokeRect(150, 50, 400, 200)
    this.ctx.fillRect(150, 50, 400, 200)
    this.ctx.textAlign = 'center'
    this.ctx.fillStyle = 'yellowgreen'
    this.ctx.font = 'bold 30px Verdana'
    this.ctx.fillText('YOU WIN!', this.canvasSize.w / 2, 120)
    this.ctx.fillText("Your score is: " + this.score, this.canvasSize.w / 2, 190)
  },


  gameOver() {
    setTimeout(() => {
      clearInterval(this.interval);
    }, 500);
    this.drawGameOver();
    this.audios.gameOverSound.play();
  },

  drawGameOver() {
    this.ctx.fillStyle = 'white'
    this.ctx.lineWidth = '10'
    this.ctx.strokeStyle = 'black'
    this.ctx.strokeRect(150, 50, 400, 200)
    this.ctx.fillRect(150, 50, 400, 200)
    this.ctx.textAlign = 'center'
    this.ctx.fillStyle = 'yellowgreen'
    this.ctx.font = 'bold 30px Verdana'
    this.ctx.fillText('GAME OVER!', this.canvasSize.w / 2, 120)
    this.ctx.fillText("Your score is: " + this.score, this.canvasSize.w / 2, 190)
    this.totalScore.innerHTML = 0;
  }

}

