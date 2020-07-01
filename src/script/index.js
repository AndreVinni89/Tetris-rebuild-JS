var canvas, ctx, HEIGHT, WIDTH, frames = 0, currentBlock = 0, stop = false


//Objetos de blocos 
var blocks = [function (){
    this.y = 0,
    this.x= 200,
    this.xLimit= 40,
    this.ylimit= 40,
    this.color= "#78f9b0",
    this.fall= 2,
    this.atualize = function (){
        if (this.y < 560 - this.ylimit) {
            this.y += this.fall
        }
        else if(this.y >= 560 - this.ylimit){
            stop = true
        }
    },
    this.draw = function(){
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
    }
},
function (){
    this.y = 0,
    this.x = 200,
    this.color = "#78f9b0",
    this.fall = 2,
    this.xLimit = 20,
    this.atualize = function () {
        if (this.y < 540) {
            this.y += this.fall
        }

    },
    this.draw = function(){
        ctx.beginPath();
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x + 20, this.y)
        ctx.lineTo(this.x + 20, this.y + 20)
        ctx.lineTo(this.x, this.y + 20)
        ctx.lineTo(this.x, this.y)
        ctx.stroke();
        ctx.closePath()
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.moveTo(this.x + 1, this.y + 1)
        ctx.lineTo(this.x + 20 - 1, this.y + 1)
        ctx.lineTo(this.x + 20 - 1, this.y + 20 - 1)
        ctx.lineTo(this.x + 1, this.y + 20 - 1)
        ctx.lineTo(this.x + 1, this.y - 1)
        ctx.fill()
    }
}

]


const game = createGame()
const KeyboardListener = createKeyboardListener()
KeyboardListener.subscribe(game.moveBlock)
var block = new blocks[currentBlock]()


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



    //Rodando o game
    run()

}

//Camada de Input
function createKeyboardListener() {
    const state = {
        observers: []
    }


    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
    }


    function notifyAll(command) {
        console.log(`Notifying ${state.observers.length} observers`)

        for (const observerFunction of state.observers) {
            observerFunction(command)
        }
    }

    // Lendo as informações de input do usuario
    document.addEventListener("keydown", handleKeydown)

    function handleKeydown(event) {
        const keyPressed = event.key

        const command = {
            blockId: currentBlock,
            key: event.key
        }
        notifyAll(command)
    }

    return{
        subscribe
    }
}



// Camada de regras do jogos
function createGame() {
    function moveBlock(command) {
        console.log(`Moving the block ${command.blockId} with ${command.key}`)


        const keyPressed = command.key
        const blockId = command.blockId
        
        if (keyPressed == "ArrowLeft" && block.x > 0) {
            block.x -= 20
        }
        else if (keyPressed == "ArrowRight" && block.x < 420 - block.xLimit) {
            block.x += 20
        }

    }
    return {
        moveBlock
    }
}


// RUN
function run() {
    if(stop){
        currentBlock = 1
        block = new blocks[currentBlock]()
        stop = false
    }

    atualize()
    draw()
    
    window.requestAnimationFrame(run)
}

// Atualização da tela
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