import {block, blockDraws} from './index.js'
import {currentBlock}  from './index.js'
import {blocks} from './blocks.js'
// Camada de regras do jogos
export function createGame() {
    function moveBlock(command) {
        console.log(`Moving the block ${command.blockId} with ${command.key}`)
        const keyPressed = command.key


        if (keyPressed == "ArrowDown") {
            if (command.keyUp == true) {
                block.block.fall = 2
            }
            else {
                block.block.fall = 10
            }

        }
        if (keyPressed == "ArrowLeft" && block.block.x > 0) {
            block.block.x -= 20
        }
        if (keyPressed == "ArrowRight" && block.block.x < 420 - block.block.xLimit) {
            block.block.x += 20
        }
    }
    function stop(command){
        if (command.stopped) {
            blockDraws.push(block.block)
            currentBlock.block = Math.floor(Math.random() * blocks.length)
            block.block = new blocks[currentBlock.block]()
            stop = false
        }
    }
    return {
        moveBlock, stop
    }
}