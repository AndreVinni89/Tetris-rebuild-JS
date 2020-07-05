import { blocks } from './blocks.js'
import { createKeyboardListener } from './keyboardListener.js'
import { createGame } from './game.js'

var canvas, HEIGHT, WIDTH, frames = 0
export var ctx, currentBlock
export var stop
currentBlock = { block: Math.floor(Math.random() * blocks.length) }
//Objetos de blocos 
export var blockDraws = []



export const game = createGame()
const KeyboardListener = createKeyboardListener()
KeyboardListener.subscribe(game.moveBlock)
export var block = { block: new blocks[currentBlock.block]() }


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

// RUN
function run() {
    atualize()
    draw()
    window.requestAnimationFrame(run)
}

// Atualização da tela
function draw() {
    ctx.fillStyle = "#464242"
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
    block.block.draw()
    for (let blck of blockDraws) {
        // blck.draw()
        blck.draw()
    }
}


function atualize() {
    frames++
    block.block.atualize()
}

main()