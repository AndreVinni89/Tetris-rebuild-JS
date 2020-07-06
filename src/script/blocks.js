import { ctx, game } from './index.js'
export let blocks = [function () {
    this.y = -2,
        this.x = 11,
        this.xLimit = 2,
        this.yLimit = 2,
        this.color = "#78f9b0",
        this.fall = 1,
        this.pixels = [[this.x, this.y], [this.x+1, this.y], [this.x, this.y+1], [this.x+1, this.y+1]]
        this.atualize = function () {
            if (this.y < 28 - this.yLimit) {
                this.y += this.fall
            }
            else if (this.y >= 28 - this.yLimit) {
                let command = {
                    stopped: true
                }
                game.stop(command)
                this.y = 28 - this.yLimit
            }
        },
        this.draw = function () {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, 1, 1)
            ctx.fillRect(this.x+1, this.y, 1, 1)
            ctx.fillRect(this.x, this.y+1, 1, 1)
            ctx.fillRect(this.x+1, this.y+1, 1, 1)
        }
},
function () {
    this.y = -2,
    this.x = 11,
    this.color = "#ffff00",
    this.fall = 1,
    this.xLimit = 1,
    this.yLimit = 1,
    this.pixels = [[this.x, this.y]],
    this.atualize = function () {
        if (this.y < 28 - this.yLimit) {
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
    this.draw = function () {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, 1, 1)

    }
}
]
