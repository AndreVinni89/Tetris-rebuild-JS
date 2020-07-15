import { block, blockDraws, matrizGame, ctx, nextBlockCtx, speed, falling, lose, reset, cp, ctxAux } from './index.js'
import { currentBlock } from './index.js'
import { blocks } from './blocks.js'
// Camada de regras do jogos

export function createGame() {
    var pps = 10
    function moveBlock(command) {
        // console.log(`Moving the block ${command.blockId} with ${command.key}`)
        const keyPressed = command.key


        if (keyPressed == "ArrowDown") {
            if (command.keyUp == true) {
                if (speed.speed == speed.speedest && !lose.lose) {
                    clearInterval(falling.fall)
                    speed.speed = speed.sup
                    falling.fall = setInterval(() => { block.block.atualize() }, speed.speed)

                }
            }
            else {
                if (speed.speed > speed.speedest && !lose.lose) {
                    clearInterval(falling.fall)
                    speed.speed = speed.speedest
                    falling.fall = setInterval(() => { block.block.atualize() }, speed.speed)
                }

            }
        }
        if (block.block.y >= 0) {
            if (keyPressed == "ArrowLeft" && block.block.x > 0 && matrizGame[block.block.y][block.block.x - 1] == 0) {
                block.block.x -= 1
            }
            if (keyPressed == "ArrowRight" && block.block.x < 21 - block.block.xLimit && matrizGame[block.block.y][block.block.xLimit + block.block.x] == 0) {
                block.block.x += 1
            }
        }
        if (keyPressed == "ArrowUp" || keyPressed == " " || keyPressed == "Shift") {
            flipBlock()
        }
        if (keyPressed == "Enter" && lose.lose) {
            resetGame()
        }
    }
    function flipBlock() {
        if (currentBlock.block > 1 && currentBlock.block < 4) {

            if (block.block.position == 0) {
                block.block.position = 1
                let sup = block.block.xLimit
                block.block.xLimit = block.block.yLimit
                block.block.yLimit = sup
            }
            else {
                block.block.position = 0
                let sup = block.block.xLimit
                block.block.xLimit = block.block.yLimit
                block.block.yLimit = sup
            }

        }
        else if (currentBlock.block == 4) {
            if (block.block.position == 3) {
                block.block.position = 0
                let sup = block.block.xLimit
                block.block.xLimit = block.block.yLimit
                block.block.yLimit = sup
            }
            else {
                block.block.position++
                let sup = block.block.xLimit
                block.block.xLimit = block.block.yLimit
                block.block.yLimit = sup
            }
        }
    }
    function stop(command) {
        if (command.stopped) {
            try {
                block.block.setPosition()
            }
            catch (e) {
                loseGame()
            }
            detectCompleteLine()


            blockDraws.push({ x: block.block.x, y: block.block.y, xLimit: block.block.xLimit, yLimit: block.block.yLimit, color: block.block.color, position: block.block.position, draw: block.block.draw, setPosition: block.block.setPosition })
            currentBlock.block = currentBlock.nextBlock
            currentBlock.nextBlock = Math.floor(Math.random() * blocks.length)
            // blockDraws.length % 2 == 0 && 

            if (!lose.lose && speed.sup > 50) {
                speed.speed = speed.sup
                speed.speed -= 2
                speed.sup -= 2
                speed.speedest = speed.speed / 2
                clearInterval(falling.fall)
                falling.fall = setInterval(() => { block.block.atualize() }, speed.speed)
                cp.init(pps += 1)
            }

            block.block = new blocks[currentBlock.block]()
            block.nextBlock = new blocks[currentBlock.nextBlock]()
            nextBlockCtx.fillStyle = "#464242"
            nextBlockCtx.fillRect(0, 0, 7, 7)
            block.nextBlock.draw(nextBlockCtx, true)
        }
    }
    function collisionDetect() {
        if (!lose.lose) {
            if (block.block.y >= 0) {
                if (currentBlock.block == 0) {
                    if (matrizGame[block.block.y][block.block.x] == 1 ||
                        matrizGame[block.block.y][block.block.x + 1] == 1 ||
                        matrizGame[block.block.y + 1][block.block.x] == 1 ||
                        matrizGame[block.block.y + 1][block.block.x + 1] == 1) {
                        let command = {
                            stopped: true
                        }
                        block.block.y -= 1
                        stop(command)
                    }
                }
                else if (currentBlock.block == 1) {
                    if (matrizGame[block.block.y][block.block.x] == 1) {
                        let command = {
                            stopped: true
                        }
                        block.block.y -= 1
                        stop(command)
                    }

                }
                else if (currentBlock.block == 2) {
                    if (block.block.position == 0) {
                        if (matrizGame[block.block.y][block.block.x] == 1 ||
                            matrizGame[block.block.y][block.block.x + 1] == 1 ||
                            matrizGame[block.block.y][block.block.x + 2] == 1 ||
                            matrizGame[block.block.y][block.block.x + 3] == 1 ||
                            matrizGame[block.block.y][block.block.x + 4] == 1) {
                            let command = {
                                stopped: true
                            }
                            block.block.y -= 1
                            stop(command)
                        }
                    }
                    else {
                        if (matrizGame[block.block.y][block.block.x] == 1 ||
                            matrizGame[block.block.y + 1][block.block.x] == 1 ||
                            matrizGame[block.block.y + 2][block.block.x] == 1 ||
                            matrizGame[block.block.y + 3][block.block.x] == 1 ||
                            matrizGame[block.block.y + 4][block.block.x] == 1) {
                            let command = {
                                stopped: true
                            }
                            block.block.y -= 1
                            stop(command)
                        }
                    }
                }
                else if (currentBlock.block == 3) {
                    if (block.block.position == 0) {
                        if (matrizGame[block.block.y][block.block.x] == 1 ||
                            matrizGame[block.block.y][block.block.x + 1] == 1 ||
                            matrizGame[block.block.y + 1][block.block.x + 1] == 1 ||
                            matrizGame[block.block.y + 1][block.block.x + 2] == 1) {
                            let command = {
                                stopped: true
                            }
                            block.block.y -= 1
                            stop(command)
                        }
                    }
                    else {
                        if (matrizGame[block.block.y + 2][block.block.x] == 1 ||
                            matrizGame[block.block.y + 1][block.block.x] == 1 ||
                            matrizGame[block.block.y][block.block.x + 1] == 1 ||
                            matrizGame[block.block.y + 1][block.block.x + 1] == 1) {
                            let command = {
                                stopped: true
                            }
                            block.block.y -= 1
                            stop(command)
                        }
                    }
                }
                else if (currentBlock.block == 4) {
                    if (block.block.position == 0) {
                        if (matrizGame[block.block.y][block.block.x] == 1 ||
                            matrizGame[block.block.y][block.block.x + 1] == 1 ||
                            matrizGame[block.block.y][block.block.x + 2] == 1 ||
                            matrizGame[block.block.y + 1][block.block.x + 1] == 1) {
                            let command = {
                                stopped: true
                            }
                            block.block.y -= 1
                            stop(command)
                        }
                    }
                    else if (block.block.position == 1) {
                        if (matrizGame[block.block.y + 1][block.block.x] == 1 ||
                            matrizGame[block.block.y][block.block.x + 1] == 1 ||
                            matrizGame[block.block.y + 1][block.block.x + 1] == 1 ||
                            matrizGame[block.block.y + 2][block.block.x + 1] == 1) {
                            let command = {
                                stopped: true
                            }
                            block.block.y -= 1
                            stop(command)
                        }
                    }
                    else if (block.block.position == 2) {
                        if (matrizGame[block.block.y][block.block.x + 1] == 1 ||
                            matrizGame[block.block.y + 1][block.block.x] == 1 ||
                            matrizGame[block.block.y + 1][block.block.x + 1] == 1 ||
                            matrizGame[block.block.y + 1][block.block.x + 2] == 1) {
                            let command = {
                                stopped: true
                            }
                            block.block.y -= 1
                            stop(command)
                        }
                    }
                    else if (block.block.position == 3) {
                        if (matrizGame[block.block.y][block.block.x] == 1 ||
                            matrizGame[block.block.y + 1][block.block.x] == 1 ||
                            matrizGame[block.block.y + 2][block.block.x] == 1 ||
                            matrizGame[block.block.y + 1][block.block.x + 1] == 1) {
                            let command = {
                                stopped: true
                            }
                            block.block.y -= 1
                            stop(command)
                        }
                    }
                }

            }
        }
    }
    function detectCompleteLine() {
        let contBlocks = 0
        for (let conty = 0; conty < 28; conty++) {
            for (let contx = 0; contx < 21; contx++) {
                if (matrizGame[conty][contx] == 0) {
                    break
                }
                else {
                    contBlocks++
                }
            }
            if (contBlocks == 21) {
                deleteLine(conty)

            }
            contBlocks = 0
        }


    }
    function drawBlocks() {
        for (let conty = 0; conty < 28; conty++) {
            for (let contx = 0; contx < 21; contx++) {
                if (matrizGame[conty][contx] == 1) {
                    ctx.fillStyle = "#78f9b0"
                    ctx.fillRect(contx, conty, 1, 1)
                }
            }
        }
    }
    function deleteLine(y) {

        for (let x = 0; x < 21; x++) {
            matrizGame[y][x] = 0
        }
        for (let line = y; line >= 0; line--) {
            if (line != 0) {
                matrizGame[line] = matrizGame[line - 1]
            }
            else {
                for (let x = 0; x < 21; x++) {
                    matrizGame[0][x] = 0
                }
            }
        }
        cp.addPoints(1000)

    }
    function loseGame() {
        console.log("Perdeu")
        clearInterval(falling.fall)
        lose.lose = true


        setPontuations()

        ctxAux.font = "25px Arial"
        ctxAux.fillText("PRESSIONE ENTER PARA", 60, 200)
        ctxAux.fillText("RECOMEÇAR", 125, 250)
        cp.printPoints()

        const records = JSON.parse(window.localStorage.getItem('records'))

        ctxAux.fillText(`RECORDS:`, 100, 330)
        ctxAux.fillText(`1. ${records.pontuations[0]}`, 100, 360)
        ctxAux.fillText(`2. ${records.pontuations[1]}`, 100, 390)
        ctxAux.fillText(`3. ${records.pontuations[2]} `, 100, 420)
        
        

        cp.stop(true)
  
        

    }
    function resetGame() {
        ctxAux.clearRect(0, 0, 420, 560)
        reset()
    }
    function setPontuations(){
        const records = JSON.parse(window.localStorage.getItem('records'))
        records.pontuations.push(cp.returnPoints())
        records.pontuations.sort()
        records.pontuations.reverse()
        window.localStorage.setItem(`records`, JSON.stringify(records))
    }

    return {
        moveBlock, stop, collisionDetect, drawBlocks
    }
}