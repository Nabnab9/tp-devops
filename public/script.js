const TOO_HIGH = "TOO_HIGH";
const TOO_LOW = "TOO_LOW";
const CORRECT = "CORRECT";
const INVALID = "INVALID";

let randomNumber = 0;
let attempts = 0;

function setInitialState(newRandomNumber, newAttempts) {
    randomNumber = newRandomNumber;
    attempts = newAttempts;
}

function init() {
    startGame();

    document.getElementById("btn").addEventListener("click", play);
    document.getElementById("userInput").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            play();
        }
    });
    document.getElementById("btnRestart").addEventListener("click", function () {
        startGame();
    });
}

function play() {
    setMessageText("");

    //Délai de 200ms pour montrer que le message est bien affiché
    setTimeout(() => {
        const userInput = document.getElementById("userInput").value;
        const userGuess = parseInt(userInput);
        attempts++;

        let guessStatus = getGuessStatus(userGuess);
        setMessageText(guessStatus.message);

    }, 200);

}


function getGuessStatus(userGuess) {
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        return {
            "result": INVALID,
            "message": "Veuillez entrer un nombre valide entre 1 et 100."
        };
    }
    if (userGuess === randomNumber) {
        return {
            "result": CORRECT,
            "message": `Bravo ! Vous avez trouvé en ${attempts} essais.`
        };
    }
    if (userGuess > randomNumber) {
        return {
            "result": TOO_HIGH,
            "message": "Trop haut ! Essayez encore."
        };
    }

    return {
        "result": TOO_LOW,
        "message": "Trop bas ! Essayez encore."
    };
}

function setMessageText(buttonText) {
    document.getElementById("message").textContent = buttonText;
}

function startGame() {
    let newRandomNumber = Math.floor(Math.random() * 100) + 1;
    console.log(`Le nombre aléatoire est : ${newRandomNumber}`);
    setInitialState(newRandomNumber, 0);
    setMessageText("Nouveau jeu. Entrez un nombre entre 1 et 100.");
    document.getElementById("userInput").value = "";
}

if (typeof window !== "undefined" && (typeof process === "undefined" || process.env.JEST_WORKER_ID === undefined)) {
    init();
}

if (typeof module !== "undefined") {
    module.exports = {getGuessStatus, setInitialState, CORRECT, TOO_HIGH, TOO_LOW, INVALID};
}
