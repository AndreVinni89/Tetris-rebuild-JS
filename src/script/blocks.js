import { game, matrizGame } from './index.js'
export let blocks = [function () {
    this.y = -2,
        this.x = 11,
        this.xLimit = 2,
        this.yLimit = 2,
        this.color = "RED",
        this.fall = 1,

        this.atualize = function () {
            if (this.y + this.fall <= 28 - this.yLimit) {
                this.y += this.fall
            }
            else if (this.y >= 28 - this.yLimit) {
                let command = {
                    stopped: true
                }
                this.y = 28 - this.yLimit
                game.stop(command)
            }

        },
        this.setPosition = function () {
            matrizGame[this.y][this.x] = 1
            matrizGame[this.y][this.x + 1] = 1
            matrizGame[this.y + 1][this.x] = 1
            matrizGame[this.y + 1][this.x + 1] = 1
        },
        this.draw = function (ctx, next) {
            if (next) {
                console.log("Desenhando")
                ctx.fillStyle = this.color
                ctx.fillRect(2, 3, 1, 1)
                ctx.fillRect(2 + 1, 3, 1, 1)
                ctx.fillRect(2, 3 + 1, 1, 1)
                ctx.fillRect(2 + 1, 3 + 1, 1, 1)
            }
            else {

                ctx.fillStyle = this.color
                ctx.fillRect(this.x, this.y, 1, 1)
                ctx.fillRect(this.x + 1, this.y, 1, 1)
                ctx.fillRect(this.x, this.y + 1, 1, 1)
                ctx.fillRect(this.x + 1, this.y + 1, 1, 1)
            }
        }
},
function () {
    this.y = -2,
        this.x = 11,
        this.color = "YELLOW",
        this.fall = 1,
        this.xLimit = 1,
        this.yLimit = 1,
        this.atualize = function () {
            if (this.y + this.fall <= 28 - this.yLimit) {
                this.y += this.fall
            }
            else if (this.y >= 28 - this.yLimit) {
                let command = {
                    stopped: true
                }
                this.y = 28 - this.yLimit
                game.stop(command)

            }

        },
        this.setPosition = function () {
            matrizGame[this.y][this.x] = 1
        },
        this.draw = function (ctx, next) {
            if (next) {
                ctx.fillStyle = this.color
                ctx.fillRect(3, 3, 1, 1)
            }
            else {
                ctx.fillStyle = this.color
                ctx.fillRect(this.x, this.y, 1, 1)
            }
        }
},
function () {
    this.y = -2,
        this.x = 11,
        this.color = "GREEN",
        this.fall = 1,
        this.xLimit = 5,
        this.yLimit = 1,
        this.atualize = function () {
            if (this.y + this.fall <= 28 - this.yLimit) {
                this.y += this.fall
            }
            else if (this.y >= 28 - this.yLimit) {
                let command = {
                    stopped: true
                }
                this.y = 28 - this.yLimit
                game.stop(command)
            }
        },
        this.setPosition = function () {
            matrizGame[this.y][this.x] = 1
            matrizGame[this.y][this.x + 1] = 1
            matrizGame[this.y][this.x + 2] = 1
            matrizGame[this.y][this.x + 3] = 1
            matrizGame[this.y][this.x + 4] = 1
        },
        this.draw = function (ctx, next) {
            if (next) {
                ctx.fillStyle = this.color
                ctx.fillRect(1, 3, 1, 1)
                ctx.fillRect(1 + 1, 3, 1, 1)
                ctx.fillRect(1 + 2, 3, 1, 1)
                ctx.fillRect(1 + 3, 3, 1, 1)
                ctx.fillRect(1 + 4, 3, 1, 1)
            }
            else {
                ctx.fillStyle = this.color
                ctx.fillRect(this.x, this.y, 1, 1)
                ctx.fillRect(this.x + 1, this.y, 1, 1)
                ctx.fillRect(this.x + 2, this.y, 1, 1)
                ctx.fillRect(this.x + 3, this.y, 1, 1)
                ctx.fillRect(this.x + 4, this.y, 1, 1)
            }

        }
},
function () {
    this.y = -2,
        this.x = 11,
        this.color = "BLUE",
        this.fall = 1,
        this.xLimit = 3,
        this.yLimit = 2,
        this.atualize = function () {
            if (this.y + this.fall <= 28 - this.yLimit) {
                this.y += this.fall
            }
            else if (this.y >= 28 - this.yLimit) {
                let command = {
                    stopped: true
                }
                this.y = 28 - this.yLimit
                game.stop(command)
            }

        },
        this.setPosition = function () {
            matrizGame[this.y][this.x] = 1
            matrizGame[this.y][this.x + 1] = 1
            matrizGame[this.y][this.x + 2] = 1
            matrizGame[this.y + 1][this.x + 1] = 1
        },
        this.draw = function (ctx, next) {
            if(next){
                ctx.fillStyle = this.color
                ctx.fillRect(2, 3, 1, 1)
                ctx.fillRect(2 + 1, 3, 1, 1)
                ctx.fillRect(2 + 2, 3, 1, 1)
                ctx.fillRect(2 + 1, 3 + 1, 1, 1)
            }
            else{
                ctx.fillStyle = this.color
                ctx.fillRect(this.x, this.y, 1, 1)
                ctx.fillRect(this.x + 1, this.y, 1, 1)
                ctx.fillRect(this.x + 2, this.y, 1, 1)
                ctx.fillRect(this.x + 1, this.y + 1, 1, 1)
            }
            
        }
},
function () {
    this.y = -2,
        this.x = 11,
        this.color = "PURPLE",
        this.fall = 1,
        this.xLimit = 3,
        this.yLimit = 2,
        this.atualize = function () {
            if (this.y + this.fall <= 28 - this.yLimit) {
                this.y += this.fall
            }
            else if (this.y >= 28 - this.yLimit) {
                let command = {
                    stopped: true
                }
                this.y = 28 - this.yLimit
                game.stop(command)
            }

        },
        this.setPosition = function () {
            matrizGame[this.y][this.x] = 1
            matrizGame[this.y][this.x + 1] = 1
            matrizGame[this.y + 1][this.x + 1] = 1
            matrizGame[this.y + 1][this.x + 2] = 1
        },
        this.draw = function (ctx, next) {
            if (next){
                ctx.fillStyle = this.color
                ctx.fillRect(2, 3, 1, 1)
                ctx.fillRect(2 + 1, 3, 1, 1)
                ctx.fillRect(2 + 1, 3 + 1, 1, 1)
                ctx.fillRect(2 + 2, 3 + 1, 1, 1)
            }
            else{
                ctx.fillStyle = this.color
                ctx.fillRect(this.x, this.y, 1, 1)
                ctx.fillRect(this.x + 1, this.y, 1, 1)
                ctx.fillRect(this.x + 1, this.y + 1, 1, 1)
                ctx.fillRect(this.x + 2, this.y + 1, 1, 1)
            }
            
        }
}

]
