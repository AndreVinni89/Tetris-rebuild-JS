import { blocks } from './blocks.js'
import { createKeyboardListener } from './keyboardListener.js'
import { createGame } from './game.js'

var canvas, HEIGHT, WIDTH, frames = 0
export var ctx

export var currentBlock = { block: Math.floor(Math.random() * blocks.length) }

// export var currentBlock = { block: 0 }

//Objetos de blocos 
export var blockDraws = []
var matrizGame = []
for(let conty=0; conty < 28; conty++){
    matrizGame.push([])
    for(let contx=0; contx<21;contx++){
        if(conty == 27 || conty == 26){
            matrizGame[conty].push(1)
        }
        else{
            matrizGame[conty].push(0)
        }
        
    }
}
export var matrizGame


export const game = createGame()
const KeyboardListener = createKeyboardListener()
KeyboardListener.subscribe(game.moveBlock)
export var block = { block: new blocks[currentBlock.block]() }

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
    //Rodando o game
    run()
}

// RUN
function run() {
    
    atualize()
    draw()
    setTimeout(() => {window.requestAnimationFrame(run)}, 200)
    // console.log(matrizGame)
}

// Atualização da tela
function draw() {
    
    ctx.fillStyle = "#464242"
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
    block.block.draw()
    game.drawBlocks()


}


function atualize() {
    frames++
    game.collisionDetect()
    block.block.atualize()

}

main()