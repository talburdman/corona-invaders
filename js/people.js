class People {
    constructor(ctx, canvasSize, posX, posY, peopleWidth, peopleHeight, image, speed) {
        this.ctx = ctx
        this.canvasSize = {
            w: canvasSize.w,
            h: canvasSize.h
        }

        this.peoplePos = {
            x: posX,
            y: posY
        }

        this.peopleSize = {
            w: peopleWidth,
            h: peopleHeight
        }

        this.speed = speed
        this.imageName = image
        this.imageInstance = undefined
        this.init()
    }


    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `images/${this.imageName}`
    }


    draw() {
        this.ctx.drawImage(this.imageInstance, this.peoplePos.x, this.peoplePos.y, this.peopleSize.w, this.peopleSize.h)
    }

    
    changeDirection() {
        this.speed *= -1
    }

}
