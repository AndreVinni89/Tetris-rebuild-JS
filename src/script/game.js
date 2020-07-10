import { block, blockDraws, matrizGame, ctx } from './index.js'
import { currentBlock } from './index.js'
import { blocks } from './blocks.js'
// Camada de regras do jogos

export function createGame() {

    function moveBlock(command) {
        // console.log(`Moving the block ${command.blockId} with ${command.key}`)
        const keyPressed = command.key


        if (keyPressed == "ArrowDown") {
            if (command.keyUp == true) {
                block.block.fall = 1
            }
            else {
                block.block.fall = 3
            }

        }
        if (keyPressed == "ArrowLeft" && block.block.x > 0 && matrizGame[block.block.y][block.block.x - 1] == 0) {
            block.block.x -= 1
        }
        if (keyPressed == "ArrowRight" && block.block.x < 21 - block.block.xLimit && matrizGame[block.block.y][block.block.xLimit + block.block.x] == 0) {
            block.block.x += 1
        }
    }
    function stop(command) {
        if (command.stopped) {
            block.block.setPosition()

            blockDraws.push({ x: block.block.x, y: block.block.y, xLimit: block.block.xLimit, yLimit: block.block.yLimit, color: block.block.color, draw: block.block.draw, setPosition: block.block.setPosition })
            currentBlock.block = currentBlock.nextBlock
            currentBlock.nextBlock = Math.floor(Math.random() * blocks.length)
            
            detectCompleteLine()

            block.block = new blocks[currentBlock.block]()
            block.nextBlock = new blocks[currentBlock.nextBlock]()
            block.nextBlock.draw()
        }
    }
    function collisionDetect() {
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
            else if (currentBlock.block == 3) {
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
            else if (currentBlock.block == 4) {
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
        }
    }

    function detectCompleteLine() {
        let contBlocks = 0
        for (let conty = 0; conty < 28; conty++) {
            console.log(conty)
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
        console.log("Excluindo a linha: " + y)
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

    }
    return {
        moveBlock, stop, collisionDetect, drawBlocks
    }
}