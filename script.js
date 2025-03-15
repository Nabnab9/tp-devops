const TOO_HIGH = "TOO_HIGH";
const TOO_LOW = "TOO_LOW";
const CORRECT = "CORRECT";
const INVALID = "INVALID";

let randomNumber = 0;
let attempts = 0;
let historique = [];

resetGame();

document.getElementById("btn").addEventListener("click", play);
document.getElementById("userInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        play();
    }
});

function play() {
    setMessageText("");

    //Délai de 200ms pour montrer que le message est bien affiché
    setTimeout(() => {
        const userInput = document.getElementById("userInput").value;
        const userGuess = parseInt(userInput);
        attempts++;

        let guessStatus = getGuessStatus(userGuess);
         updateHistory(guessStatus);

    }, 200);

}

document.getElementById("btnRestart").addEventListener("click", function () {
    resetGame();
});

function getGuessStatus(userGuess) {
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        return {
            "result": INVALID,
            "message": "Veuillez entrer un nombre valide entre 1 et 100.",
            "guess": userGuess
        };
    }
    if (userGuess === randomNumber) {
        return {
            "result": CORRECT,
            "message": `Bravo ! Vous avez trouvé en ${attempts} essais.`,
            "guess": userGuess
        };
    }
    if (userGuess > randomNumber) {
        return {
            "result": TOO_HIGH,
            "message": "Trop haut ! Essayez encore.",
            "guess": userGuess
        };
    }

    return {
        "result": TOO_LOW,
        "message": "Trop bas ! Essayez encore.",
        "guess": userGuess
    };
}

function setMessageText(buttonText) {
    document.getElementById("message").textContent = buttonText;
}

function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    console.log(`Le nombre aléatoire est : ${randomNumber}`);
    attempts = 0;
    setMessageText("Nouveau jeu. Entrez un nombre entre 1 et 100.");
    document.getElementById("userInput").value = "";
    historique = [];
    updateHistory();
}

function updateHistory(guessStatus) {

    if(guessStatus) {
        historique.push(guessStatus);
    }

    let historyElement = document.getElementById("historique");
    if (!historyElement) {
        historyElement = document.createElement("ul");
        historyElement.id = "historique";
        document.body.appendChild(historyElement);
    }
    historyElement.innerHTML = historique.map(ug => `<li>${ug.guess} - ${ug.message}</li>`).join('');
}
