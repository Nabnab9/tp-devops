const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

const { getGuessStatus, CORRECT, TOO_HIGH, TOO_LOW, INVALID, MAX_ATTEMPTS_REACHED } = require('./script.js');

jest.dontMock('fs');



describe('getGuessStatus', () => {
    beforeEach(() => {
        document.body.innerHTML = html.toString();
    });
    test('devrait retourner INVALID pour une entrée non valide', () => {
        expect(getGuessStatus("abc")).toEqual({ result: INVALID, message: "Veuillez entrer un nombre valide entre 1 et 100." });
        expect(getGuessStatus(0)).toEqual({ result: INVALID, message: "Veuillez entrer un nombre valide entre 1 et 100." });
        expect(getGuessStatus(101)).toEqual({ result: INVALID, message: "Veuillez entrer un nombre valide entre 1 et 100." });
    });

    test('devrait retourner CORRECT si le nombre deviné est juste', () => {
        expect(getGuessStatus(50, 50, 1)).toEqual({ result: CORRECT, message: "Bravo ! Vous avez trouvé en 1 essais." });
    });

    test('devrait retourner TOO_HIGH si le nombre est trop grand', () => {
        expect(getGuessStatus(75, 50, 2)).toEqual({ result: TOO_HIGH, message: "Trop haut ! Essayez encore." });
    });

    test('devrait retourner TOO_LOW si le nombre est trop petit', () => {
        expect(getGuessStatus(25, 50, 3)).toEqual({ result: TOO_LOW, message: "Trop bas ! Essayez encore." });
    });

    test('devrait retourner MAX_ATTEMPTS_REACHED si le nombre maximum d’essais est atteint', () => {
        expect(getGuessStatus(30, 50, 10)).toEqual({ result: MAX_ATTEMPTS_REACHED, message: "Perdu ! Le nombre était 50." });
    });
});
