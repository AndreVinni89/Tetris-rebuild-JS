printPontuations()


function printPontuations() {
    const pontuations = JSON.parse(window.localStorage.getItem("records"))
    const pontuationLabel = document.querySelector(".content-label")
    let cont = 1
    for (let score of pontuations.pontuations) {
        if (score) {
            let pontuation = document.createElement("p")
            pontuation.innerHTML = `${cont}. ${score[0]} - ${score[1]}`
            pontuationLabel.appendChild(pontuation)
            cont++
        }
    }

}
