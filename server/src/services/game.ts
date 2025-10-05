import { Room } from "./room.js";
import { IResult } from "./state.js";

export interface ICard {
    value: string;
    house: "♠" | "♥" | "♣" | "♦";
}

const _HOUSES: Array<"♠" | "♥" | "♣" | "♦"> = ["♠", "♥", "♣", "♦"];
const _VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const STANDARD_DECK: Array<ICard> = _HOUSES.flatMap((house) => {
    return _VALUES.map((value) => {
        return {
            house: house,
            value: value
        }
    })
});

interface IHand {
    wager: string,
    status: "playing" | "standing" | "busted" | "waiting",
    cards: Array<ICard>
}

export interface IPlayers {
    playerId: string,
    name: string,
    bank: string,
    hand: IHand,
}

interface IDealer {
    cards: Array<ICard>
}

export interface ITable {
    tableId: string,
    phase: "playing" | "ended" | "lobby",
    turn: string,
    dealer: IDealer,
    players: Array<IPlayers>,
    deck: Array<ICard>,
    cardIdx: number,
}


export const getRandomDeck = () => {
    return STANDARD_DECK.sort(() => Math.random() - 0.5);
}

export const getNewRound = (numPlayers: number) => {
    let deck = getRandomDeck();
    let cardIdx = 0;
    let dealerCards = [deck[cardIdx++]];
    let playerCards = []
    for (let i = 0; i < numPlayers; i++) {
        let cards = [];
        for (let c = 0; c < 2; c++) {
            cards.push(deck[cardIdx++]);
        }
        playerCards.push(cards);
    }

    return {
        deck: deck,
        cardIdx: cardIdx,
        dealerCards: dealerCards,
        playerCards: playerCards,
    }
}

export const countHand = (cards: Array<ICard>) => {
    // always returns max possible hand
    let sum = 0
    let aceCount = 0;
    cards.forEach((card) => {
        if (['K', 'J', 'Q'].includes(card.value)) sum += 10;
        else if (card.value == 'A') aceCount += 1;
        else sum += parseInt(card.value, 10);
    })
    
    if (aceCount == 0) return sum;
    
    let maxAceSum = 11 + aceCount - 1;
    let minAceSum = aceCount;
    if (maxAceSum + sum <= 21) return maxAceSum + sum;
    return minAceSum + sum;
}



export const getNewGame = (currentRoom: Room): ITable => {
    const numPlayers = currentRoom.players.length;
    const round = getNewRound(numPlayers);
    
    return {
        tableId: currentRoom.gameId,
        phase: "playing",
        deck: round.deck,
        turn:  currentRoom.players[0].playerId,
        cardIdx: round.cardIdx,
        dealer: {
            cards: round.dealerCards,
        },
        players: round.playerCards.map((cards, idx) => {
            let player = currentRoom.players[idx]
            return {
                playerId: player.playerId,
                name: player.playerName,
                bank: "100",
                hand: {
                    status: idx == 0 ? "playing" : "waiting" ,
                    wager: "5",
                    cards: cards,
                }
            }
        })
    }
}

export const updateBanks = (game: ITable, result: IResult | undefined) => {
    if (!result) return game;

    result.players.forEach((player) => {
        game.players.forEach((p) => {
            if (p.playerId == player.playerId) {
                p.bank = player.newBank;
            }
        })
    })
    return game;
}

export const dealFreshForPlayer = (game: ITable, playerId: string) => {
    game.players.forEach((player) => {
        if (player.playerId == playerId && player.hand.status != "playing") {
            let newHand = []
            for (let c = 0; c < 2; c++) {
                newHand.push(game.deck[game.cardIdx++])
            }

            player.hand.cards = newHand;
        }
    })

    return game;
}