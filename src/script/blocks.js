import {ctx, game} from './index.js'
export let blocks = [function () {
    this.y = 0,
        this.x = 200,
        this.xLimit = 40,
        this.yLimit = 40,
        this.color = "#78f9b0",
        this.fall = 2,
        this.atualize = function () {
            if (this.y < 560 - this.yLimit) {
                this.y += this.fall
            }
            else if (this.y >= 560 - this.yLimit) {
                let command = {
                    stopped: true
                }
                game.stop(command)
                this.y = 560 - this.yLimit
            }
        },
        this.draw = function () {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y)
            ctx.lineTo(this.x + 40, this.y)
            ctx.lineTo(this.x + 40, this.y + 40)
            ctx.lineTo(this.x, this.y + 40)
            ctx.lineTo(this.x, this.y)
            ctx.stroke();
            ctx.closePath()
            ctx.beginPath()
            ctx.fillStyle = this.color
            ctx.moveTo(this.x + 1, this.y + 1)
            ctx.lineTo(this.x + 40 - 1, this.y + 1)
            ctx.lineTo(this.x + 40 - 1, this.y + 40 - 1)
            ctx.lineTo(this.x + 1, this.y + 40 - 1)
            ctx.lineTo(this.x + 1, this.y - 1)
            ctx.fill()
            ctx.beginPath();
            ctx.moveTo(this.x + 20, this.y)
            ctx.lineTo(this.x + 20, this.y + 40)
            ctx.moveTo(this.x, this.y + 20)
            ctx.lineTo(this.x + 40, this.y + 20)
            ctx.stroke();
            ctx.closePath()
        },
        this.ola = function(){console.log("ola")}

},
function () {
        this.y = 0,
        this.x = 11,
        this.color = "#ffff00",
        this.fall = 0.001,
        this.xLimit = 1,
        this.yLimit = 1,
        this.atualize = function () {
            if (this.y < 560 - this.yLimit) {
                this.y += this.fall
            }
            else if (this.y >= 560 - this.yLimit) {
                let command = {
                    stopped: true
                }
                game.stop(command)
                this.y = 560 - this.yLimit
            }

        },
        this.draw = function () {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x,this.y, 1, 1)
        }
}
]
