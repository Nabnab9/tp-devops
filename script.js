let randomNumber = 0;
let attempts = 0;
setGame();

document.getElementById("btn").addEventListener("click", function() {
    const userInput = document.getElementById("userInput").value;
    const userGuess = parseInt(userInput);
    attempts++;

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        setMessageText("Veuillez entrer un nombre valide entre 1 et 100.");
        return;
    }

    if (userGuess === randomNumber) {
        setMessageText(`Bravo ! Vous avez trouvé en ${attempts} essais.`);
    } else if (userGuess > randomNumber) {
        setMessageText("Trop haut ! Essayez encore.");
    } else {
        setMessageText("Trop bas ! Essayez encore.");
    }
});

document.getElementById("btnRestart").addEventListener("click", function() {
    setGame();
});

function setMessageText(buttonText) {
    document.getElementById("message").textContent = buttonText;
}

function setGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    setMessageText("Nouveau jeu. Entrez un nombre entre 1 et 100.");
    document.getElementById("userInput").value = "";
}
