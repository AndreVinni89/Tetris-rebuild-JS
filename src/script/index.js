import { blocks } from './blocks.js'
import { createKeyboardListener } from './keyboardListener.js'
import { createGame } from './game.js'

var canvas, HEIGHT, WIDTH, frames = 0
export var ctx
export var nextBlockCtx
export var currentBlock = { block: Math.floor(Math.random() * blocks.length), nextBlock: Math.floor(Math.random() * blocks.length) }
export var speed = { speed: 200, speedest: 100, sup: 200 }
export var lose = {}
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
export const cp = createCounterPoint()
export var block = { block: new blocks[currentBlock.block](), nextBlock: new blocks[currentBlock.nextBlock]() }

function main() {
    lose.lose = false
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
    cp.init()
    //Rodando o game
    run()
}

// RUN
function run() {
    if (!lose.lose) {
        atualize()
        draw()
        window.requestAnimationFrame(run)
    }
    else {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
        ctx.fillRect(0, 0, 21, 28)

    }
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
export var falling = { fall: setInterval(() => { block.block.atualize() }, speed.speed) }
falling.fall



var fpsField = document.querySelector("#fps")
setInterval(() => { fpsField.innerHTML = `FPS: ${frames}`; frames = 0 }, 1000)


function createCounterPoint() {
    var points = 0
    var pointField = document.querySelector('#points')
    var pointCounter
    function init(ind = 10) {
        pointCounter = setInterval(() => { points += ind; pointField.innerHTML = `PONTOS: ${points}` }, 500)
    }
    function stop() {
        points = 0
        clearInterval(pointCounter)
    }
    function addPoints(added){
        points += added
    }
    return {
        init, stop, addPoints
    }

}



export function reset() {
    matrizGame = []
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
    blockDraws = []
    cp.init()


    currentBlock = { block: Math.floor(Math.random() * blocks.length), nextBlock: Math.floor(Math.random() * blocks.length) }
    speed = { speed: 200, speedest: 100, sup: 200 }
    lose = {}
    block = { block: new blocks[currentBlock.block](), nextBlock: new blocks[currentBlock.nextBlock]() }
    falling.fall = setInterval(() => { block.block.atualize() }, speed.speed)
    run()
}

main()