import { blocks } from './blocks.js'
import { createKeyboardListener } from './keyboardListener.js'
import { createGame } from './game.js'

var canvas, HEIGHT, WIDTH, frames = 0
export var ctx
export var nextBlockCtx
export var currentBlock = { block: Math.floor(Math.random() * blocks.length), nextBlock: Math.floor(Math.random() * blocks.length) }
export var speed = {speed: 200, speedest:100}
// export var currentBlock = { block: 0 }

//Objetos de blocos 
export var blockDraws = []
var matrizGame = []
for (let conty = 0; conty < 28; conty++) {
    matrizGame.push([])
    for (let contx = 0; contx < 21; contx++) {
        if (conty == 27 || conty == 26) {
            matrizGame[conty].push(1)
        }
        else {
            matrizGame[conty].push(0)
        }

    }
}
export var matrizGame


export const game = createGame()
const KeyboardListener = createKeyboardListener()
KeyboardListener.subscribe(game.moveBlock)
export var block = { block: new blocks[currentBlock.block](), nextBlock: new blocks[currentBlock.nextBlock]() }

function main() {
    HEIGHT = innerHeight
    WIDTH = innerWidth

    HEIGHT = 28
    WIDTH = 21

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

    let nextBlockCanvas = document.createElement('canvas')
    nextBlockCanvas.height = 7
    nextBlockCanvas.width = 7
    nextBlockCanvas.style.border = "1px solid black"
    nextBlockCanvas.style.borderRadius = "3px"
    nextBlockCanvas.id = "next"
    nextBlockCtx = nextBlockCanvas.getContext("2d")
    document.body.appendChild(nextBlockCanvas)
    nextBlockCtx.fillStyle = "#464242"
    nextBlockCtx.fillRect(0, 0, 7, 7)
    block.nextBlock.draw(nextBlockCtx, true)

    //Rodando o game
    run()
}

// RUN
function run() {

    atualize()
    draw()
    window.requestAnimationFrame(run)
    // console.log(matrizGame)
}

// Atualização da tela
function draw() {

    ctx.fillStyle = "#464242"
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
    block.block.draw(ctx)
    game.drawBlocks()



}


function atualize() {
    frames++
    game.collisionDetect()
    

}
export var falling = {fall: setInterval(() => { block.block.atualize() }, speed.speed)}
falling.fall
main()