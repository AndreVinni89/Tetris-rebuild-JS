import { block, blockDraws, matrizGame } from './index.js'
import { currentBlock } from './index.js'
import { blocks } from './blocks.js'
// Camada de regras do jogos
export function createGame() {

    function moveBlock(command) {
        console.log(`Moving the block ${command.blockId} with ${command.key}`)
        const keyPressed = command.key


        if (keyPressed == "ArrowDown") {
            if (command.keyUp == true) {
                block.block.fall = 1
            }
            else {
                block.block.fall = 2
            }

        }
        if (keyPressed == "ArrowLeft" && block.block.x > 0) {
            block.block.x -= 1
        }
        if (keyPressed == "ArrowRight" && block.block.x < 21 - block.block.xLimit) {
            block.block.x += 1
        }
    }
    function stop(command) {
        if (command.stopped) {
            blockDraws.push({ x: block.block.x, y: block.block.y, xLimit: block.block.xLimit, yLimit: block.block.yLimit, color: block.block.color, draw: block.block.draw, setPosition: block.block.setPosition })
            currentBlock.block = Math.floor(Math.random() * blocks.length)
            block.block = new blocks[currentBlock.block]()
        }
    }
    function collisionDetect() {
        if (block.block.y >= 0) {
            if (currentBlock.block == 0) {
                if(matrizGame[block.block.y][block.block.x] == 1||
                    matrizGame[block.block.y][block.block.x+1] == 1||
                    matrizGame[block.block.y+1][block.block.x] == 1||
                    matrizGame[block.block.y+1][block.block.x+1] == 1){
                        console.log("Colidius!!!!")
                    }
            }
            else if (currentBlock.block == 1) {


                if (matrizGame[block.block.y][block.block.x] == 1) {
                    console.log("Colidiu!!!")
                }

            }
        }
    }
    return {
        moveBlock, stop, collisionDetect
    }
}