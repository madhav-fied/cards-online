import { countHand, ITable, IPlayers } from "./game.js";

export interface IPlayerResult {
    playerName: string;
    playerId: string;
    status: "win" | "lost";
    oldBank: string;
    wager: string;
    newBank: string;
}

export interface IResult {
    dealerValue: number;
    players: Array<IPlayerResult>;
}

export const executeHit = (state: ITable, playerId: string) => {
    let card = state.deck[state.cardIdx++];
    state.players.forEach((player) => {
        if (player.playerId == playerId) {
            player.hand.cards.push(card);
            let total = countHand(player.hand.cards);
            if (total > 21) {
                player.hand.status = "busted";
                state.turn = getNextTurn(state);
            }
        }
    })

    state.players.forEach((player) => {
        if (player.playerId == state.turn) {
            player.hand.status = "playing"
        }
    })
    
    return state
}

export const executeStand = (state: ITable, playerId: string) => {
    // TODO(long term): state change should trigger side effects
    // turn update should update player status
    state.players.forEach((player) => {
        if (player.playerId == playerId) {
            player.hand.status = "standing"
            state.turn = getNextTurn(state)
        }
    })

    state.players.forEach((player) => {
        if (player.playerId == state.turn) {
            player.hand.status = "playing"
        }
    })

    return state;
}

export const getNextTurn = (state: ITable) => {
    let current = state.turn;
    let next = 0;
    state.players.forEach((player, idx) => {
        if (player.playerId == current) {
            next = idx + 1;
        }
    })
    let nextTurn = next >= state.players.length ? "dealer" : state.players[next].playerId;
    return nextTurn;
}

export const executeDealerPlay = (state: ITable) => {
    if (state.phase == "ended") return state;
    
    if (countHand(state.dealer.cards) < 17) {
        let card = state.deck[state.cardIdx++];
        state.dealer.cards.push(card);
    }
    else {
        state.phase = "ended"
    }
    return state;
}

const getPlayerResult = (playerValue: number, dealerValue: number): "win" | "lost" => {
    if (playerValue == 21) return "win";
    else if (playerValue > 21) return "lost";
    else if (dealerValue > 21) return "win";
    else if (playerValue > dealerValue) return "win";
    
    return "lost";
}

export const getResult = (state: ITable) => {
    if (state.phase != "ended") return undefined;

    let dealerValue = countHand(state.dealer.cards)
    let result: IResult = {
        dealerValue: dealerValue,
        players: state.players.map((player) => {
            let status = getPlayerResult(countHand(player.hand.cards), dealerValue);
            let newBank = parseInt(player.bank, 10);
            newBank = newBank + (status == "win" ? parseInt(player.hand.wager, 10) : -1 * parseInt(player.hand.wager, 10))
            let p: IPlayerResult = {
                playerName: player.name,
                playerId: player.playerId,
                wager: player.hand.wager,
                oldBank: player.bank,
                status: status,
                newBank: newBank.toString(),
            }

            return p;
        })
    }
    return result
}
