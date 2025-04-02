const { getGuessStatus, setInitialState, CORRECT, TOO_HIGH, TOO_LOW, INVALID } = require('./script.js');

setInitialState(50, 0);
describe('getGuessStatus', () => {
    test('devrait retourner INVALID pour une entrée non valide', () => {
        expect(getGuessStatus("abc")).toEqual({ result: INVALID, message: "Veuillez entrer un nombre valide entre 1 et 100." });
        expect(getGuessStatus(0)).toEqual({ result: INVALID, message: "Veuillez entrer un nombre valide entre 1 et 100." });
        expect(getGuessStatus(101)).toEqual({ result: INVALID, message: "Veuillez entrer un nombre valide entre 1 et 100." });
    });

    test('devrait retourner CORRECT si le nombre deviné est juste', () => {
        expect(getGuessStatus(50)).toEqual({ result: CORRECT, message: expect.stringMatching(/Bravo ! Vous avez trouvé en \d+ essais\./) });
    });

    test('devrait retourner TOO_HIGH si le nombre est trop grand', () => {
        expect(getGuessStatus(75)).toEqual({ result: TOO_HIGH, message: "Trop haut ! Essayez encore." });
    });

    test('devrait retourner TOO_LOW si le nombre est trop petit', () => {
        expect(getGuessStatus(25)).toEqual({ result: TOO_LOW, message: "Trop bas ! Essayez encore." });
    });
});
