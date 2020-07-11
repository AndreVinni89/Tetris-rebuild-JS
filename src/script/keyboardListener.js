import {currentBlock} from './index.js'

export function createKeyboardListener() {
    const state = {
        observers: []
    }


    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
    }


    function notifyAll(command) {
        // console.log(`Notifying ${state.observers.length} observers`)

        for (const observerFunction of state.observers) {
            observerFunction(command)
        }
    }

    // Lendo as informações de input do usuario
    document.addEventListener("keydown", handleKeydown)
    document.addEventListener("onkeypress", keyDown)
    document.addEventListener("keyup", keyUp)

    function handleKeydown(event) {
        // console.log(event.key)
        const command = {
            blockId: currentBlock.block,
            key: event.key
        }
        notifyAll(command)
    }


    function keyUp(event) {
        if (event.key == "ArrowDown") {
            const command = {
                blockId: currentBlock.block,
                key: event.key, 
                keyUp: true
            }
            notifyAll(command)
        }
        else {
            return
        }
    }
    function keyDown(event) {
        if (event.key == "ArrowDown") {
            const command = {
                blockId: currentBlock.block,
                key: event.key,
                keyUp: false
            }
            notifyAll(command)
        }
        else {
            return
        }

    }

    return {
        subscribe
    }
}
