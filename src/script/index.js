var canvas, ctx, HEIGHT, WIDTH, frames = 0, currentBlock=0

//Objetos ds blocos 
var blocks = [{
    y: 0,
    x: 200,
    color: "#78f9b0",
    fall: 2,
    atualize: function () {
        if (this.y < 540) {
            this.y += this.fall
        }
    },
    draw: function () {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x+40, this.y)
        ctx.lineTo(this.x+40, this.y+40)
        ctx.lineTo(this.x, this.y+40)
        ctx.lineTo(this.x, this.y)
        ctx.stroke();
        ctx.closePath()
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.moveTo(this.x+1, this.y+1)
        ctx.lineTo(this.x+40-1, this.y+1)
        ctx.lineTo(this.x+40-1, this.y+40-1)
        ctx.lineTo(this.x+1, this.y+40-1)
        ctx.lineTo(this.x+1, this.y-1)
        ctx.fill()
        ctx.beginPath();
        ctx.moveTo(this.x+20, this.y)
        ctx.lineTo(this.x+20, this.y+40)
        ctx.moveTo(this.x, this.y+20)
        ctx.lineTo(this.x+40, this.y+20)
        ctx.stroke();
        ctx.closePath()
    }
}, 
{
    y: 0,
    x: 200,
    color: "#78f9b0",
    fall: 2,
    atualize: function () {
        if (this.y < 540) {
            this.y += this.fall
        }

    },
    draw: function () {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x+20, this.y)
        ctx.lineTo(this.x+20, this.y+20)
        ctx.lineTo(this.x, this.y+20)
        ctx.lineTo(this.x, this.y)
        ctx.stroke();
        ctx.closePath()
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.moveTo(this.x+1, this.y+1)
        ctx.lineTo(this.x+20-1, this.y+1)
        ctx.lineTo(this.x+20-1, this.y+20-1)
        ctx.lineTo(this.x+1, this.y+20-1)
        ctx.lineTo(this.x+1, this.y-1)
        ctx.fill()
    }
}


]

function main() {
    HEIGHT = innerHeight
    WIDTH = innerWidth

    if (WIDTH >= 500) {
        HEIGHT = 560
        WIDTH = 420
    }

    // Atribuindo as caracteristicas do canvas
    canvas = document.createElement('canvas')
    canvas.height = HEIGHT
    canvas.width = WIDTH
    canvas.style.border = "1px solid black"
    canvas.style.borderRadius = "3px"

    // Capturando o contexto do canvas
    /** @type {CanvasRenderingContext2D} */
    ctx = canvas.getContext("2d")
    document.body.appendChild(canvas)
    
    // Lendo as informações de input do usuario
    document.addEventListener("keydown", function (event) {
        if (event.key == "ArrowRight" && blocks[currentBlock].x < 400) {
            blocks[currentBlock].x += 20
        }
        else if (event.key == "ArrowLeft" && blocks[currentBlock].x > 0) {
            blocks[currentBlock].x -= 20
        }
    })

    //Rodando o game
    run()

}


function run() {
    atualize()
    draw()
    

    window.requestAnimationFrame(run)
}


function draw() {
    ctx.fillStyle = "#464242"
    ctx.fillRect(0, 0, WIDTH, HEIGHT)

    blocks[currentBlock].draw()
}



function atualize() {
    frames++
    blocks[currentBlock].atualize()
}

main()