import { stat } from "fs";
import { getRandomDeck } from "./game.js";
import type { Card } from "./game.js";

export interface Hand {
    wager: string;
    status: "playing" | "standing" | "busted" | "idle";
    cards: Array<Card>;
}

export interface Dealer {
    cards: Array<Card>
}

export interface Player {
    playerId: string;
    bank: string;
    hand: Hand;
}

export interface State {
    gameId: string;
    deck: Array<Card>;
    cardIdx: number;
    phase: "playing" | "ended" | "waiting";
    turn: string;
    dealer: Dealer;
    players: Array<Player>;
}

export const getNewGame = (gameId: string, playerId: string) => {
    let newDeck = getRandomDeck();
    let state = {
        gameId: gameId,
        deck: newDeck,
        cardIdx: 0,
        phase: "playing",
        dealer: {
            cards: []
        },
        players: [{
            playerId: playerId,
            bank: "100",
            hand: {
                wager: "1",
                status: "idle",
                cards: [],
            }
        }]
    }
    return state;
};

export const executeHit = (state: State, playerId: string) => {
    let card = state.deck[state.cardIdx];
    state.players.forEach((player) => {
        if (player.playerId == playerId) {
            player.hand.cards.push(card);
        }
    })
    return state
}

export const executeStand = (state: State, playerId: string) => {
    
}

