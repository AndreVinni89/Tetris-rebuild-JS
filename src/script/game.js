import { block, blockDraws } from './index.js'
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
                block.block.fall = 3
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
            blockDraws.push({ x: block.block.x, y: block.block.y, xLimit: block.block.xLimit, yLimit: block.block.yLimit, color: block.block.color, pixels: block.block.pixels, draw: block.block.draw })
            currentBlock.block = Math.floor(Math.random() * blocks.length)
            block.block = new blocks[currentBlock.block]()
        }
    }
    function collisionDetect() {
   
        for (let blck of blockDraws) {
            for(let pixels of block.block.pixels){
                for(let scenaryPixels of blck.pixels){
                    console.log(pixels[0], scenaryPixels[0])
                    if(pixels[0] == scenaryPixels[0] && pixels[1]== scenaryPixels[1]){
                        
                        console.log('Colidiu')   
                    }

                }
            }
      
        }
    }
    return {
        moveBlock, stop, collisionDetect
    }
}