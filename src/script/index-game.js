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
export var ctxAux
export var falling


function main() {
    setRecords()
    const recordField = document.querySelector("#record")
    const record = JSON.parse(window.localStorage.getItem("records"))

    try {
        recordField.innerHTML = `RECORD: ${record.pontuations[0][1]}`
    }
    catch{
        recordField.innerHTML = `RECORD: 0`
    }
    const nickLabel = document.querySelector("#nick")
    const nick = window.localStorage.getItem("nick")
    nickLabel.innerHTML += nick


    const logoutBt = document.querySelector("#logout")
    logoutBt.addEventListener("click", () => { window.localStorage.setItem("nick", "") })



    falling = { fall: setInterval(() => { block.block.atualize() }, speed.speed) }
    falling.fall



    var fpsField = document.querySelector("#fps")
    setInterval(() => { fpsField.innerHTML = `FPS: ${frames}`; frames = 0 }, 1000)





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
    ctx = canvas.getContext("2d")
    document.body.appendChild(canvas)

    // Atribuindo as caracteristicas do canvas auxiliar
    const aux = document.createElement('canvas')
    aux.id = "aux"
    aux.height = 560
    aux.width = 420
    aux.style.border = "1px solid black"
    aux.style.borderRadius = "3px"

    // Capturando o contexto do canvas auxiliar
    ctxAux = aux.getContext("2d");
    document.body.appendChild(aux)

    let nextBlockCanvas = document.createElement('canvas')
    nextBlockCanvas.height = 7
    nextBlockCanvas.width = 7
    nextBlockCanvas.style.border = "1px solid black"
    nextBlockCanvas.style.borderRadius = "3px"
    nextBlockCanvas.id = "next"
    nextBlockCtx = nextBlockCanvas.getContext("2d")
    const nextLabel = document.querySelector("#Next")


    nextLabel.appendChild(nextBlockCanvas)
    nextBlockCtx.fillStyle = "#464242"
    nextBlockCtx.fillRect(0, 0, 7, 7)
    block.nextBlock.draw(nextBlockCtx, true)
    cp.init()

    //Rodando o game
    run()
}
export function setRecords() {
    if (localStorage.length <= 1) {
        const pontuations = { pontuations: [[0, 0]] }
        window.localStorage.setItem('records', JSON.stringify(pontuations))
    }
}

// RUN
function run() {
    if (!lose.lose) {
        atualize()
        draw()
        window.requestAnimationFrame(run)
    }
    else {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
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

function createCounterPoint() {
    var points = 0
    var pointField = document.querySelector('#points')
    var pointCounter
    function init(ind = 10) {
        stop()
        if (ind > 100) {
            ind = 100
        }
        pointCounter = setInterval(() => { points += ind; pointField.innerHTML = `PONTOS: ${points}` }, 500)
    }
    function stop(reset = false) {
        clearInterval(pointCounter)
        if (reset) {
            points = 0
        }
    }
    function addPoints(added) {
        points += added
    }
    function printPoints() {
        ctxAux.fillText(`PONTUAÇÃO: ${points}`, 100, 300)
    }
    function returnPoints() {
        return points
    }
    return {
        init, stop, addPoints, printPoints, returnPoints
    }
}

export function reset() {
    const recordField = document.querySelector("#record")
    const record = JSON.parse(window.localStorage.getItem("records"))
    recordField.innerHTML = `RECORDS: ${record.pontuations[0][1]}`

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
