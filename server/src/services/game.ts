export interface Card {
    value: string;
    house: "♠" | "♥" | "♣" | "♦";
}

const _HOUSES: Array<"♠" | "♥" | "♣" | "♦"> = ["♠", "♥", "♣", "♦"];
const _VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const STANDARD_DECK: Array<Card> = _HOUSES.flatMap((house) => {
    return _VALUES.map((value) => {
        return {
            house: house,
            value: value
        }
    })
});

export const getRandomDeck = () => {
    return STANDARD_DECK.sort(() => Math.random() - 0.5);
}
