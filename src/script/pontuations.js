printPontuations()


function printPontuations() {
    const pontuations = JSON.parse(window.localStorage.getItem("records"))
    let cont = 1
    for (let score of pontuations.pontuations) {
        let pontuation = document.createElement("p")
        pontuation.innerHTML = `${cont}. ${score}`
        document.body.appendChild(pontuation)
        cont++
    }

}