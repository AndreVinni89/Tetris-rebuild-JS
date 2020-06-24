function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

var canvas, ctx, HEIGHT, WIDTH, frames = 0

var block = {
    y: 0,
    x: 200,
    height: 20,
    width: 20,
    color: "#ffffff",
    fall: 20,

    atualize: function () {
        sleep(600)
        if(this.y < 540){
            this.y += this.fall
        }
        
    },

    draw: function () {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

}


function main() {

    HEIGHT = innerHeight
    WIDTH = innerWidth

    if (WIDTH >= 500) {
        HEIGHT = 560
        WIDTH = 420
    }
    
    canvas = document.createElement('canvas')
    canvas.height = HEIGHT
    canvas.width = WIDTH
    canvas.style.border = "1px solid black"
    canvas.style.borderRadius = "3px"

    ctx = canvas.getContext("2d")
    document.body.appendChild(canvas)


    document.addEventListener("keydown", function (event) {
        console.log(event.key)
        if (event.key == "ArrowRight" && block.x < 400) {
            block.x += 20
        }
        else if (event.key == "ArrowLeft" && block.x > 0) {
            block.x -= 20
        }
    })
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

    block.draw()
}



function atualize() {
    frames++
    block.atualize()
}

main()