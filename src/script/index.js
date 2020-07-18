

window.localStorage.setItem("nick", "")


const btNick = document.querySelector(".play")


try {
    btNick.addEventListener("click", () => {


        var nickLabel = document.querySelector("#nick-input")


        const link = document.querySelector("#link-game")
        if (nickLabel.value) {
            btNick.href = "game.html"

            const nick = nickLabel.value
            window.localStorage.setItem("nick", nick)
            
            link.click()

        }
        else {
            window.alert("Por favor informe o seu nick")
            console.log("Tem nada nao")
        }
    })
}
catch{
    console.log()
}
finally {
    console.log()
}