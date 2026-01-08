export class Game {
    public players: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public pickCardAnimation = false;
    public currentCard: string = '';


    /**
     * Initializes a new game.
     *
     * Shuffles the deck, adding all 56 cards to the stack.
     */
    constructor() {
        for (let i = 1; i < 14; i++) {
            this.stack.push('spade_' + i);
            this.stack.push('hearts_' + i);
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
        }

        shuffle(this.stack);
    }
    

    /**
     * Returns a JSON representation of the game state.
     *
     * The returned object contains the following properties:
     * - `players`: an array of player names.
     * - `stack`: an array of card IDs representing the deck.
     * - `playedCards`: an array of card IDs representing the cards that have been played.
     * - `currentPlayer`: the index of the current player in the `players` array.
     * - `pickCardAnimation`: a boolean indicating whether the card picking animation is currently running.
     * - `currentCard`: the ID of the card that is currently being picked.
     *
     * @return {object} A JSON representation of the game state.
     */
    public toJson() {
        return {
            players: this.players,
            stack: this.stack,
            playedCards: this.playedCards,
            currentPlayer: this.currentPlayer,
            pickCardAnimation: this.pickCardAnimation,
            currentCard: this.currentCard
        };
    }
}


/**
 * Shuffles an array of elements.
 *
 * Uses the Fisher-Yates shuffle algorithm to randomly re-arrange
 * the elements of the array.
 *
 * @template T
 * @param {T[]} array The array to shuffle.
 * @return {T[]} The shuffled array.
 */
function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length;
    let temporaryValue: T;
    let randomIndex: number;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}