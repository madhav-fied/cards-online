import { Socket } from "socket.io"
import { dealFreshForPlayer, getNewGame, getNewRound, IPlayers, ITable, updateBanks } from "../services/game.js"
import { getRoomById, removePlayerFromRoom } from "./room.socket.js"
import { executeDealerPlay, executeHit, executeStand, getResult } from "../services/state.js"


let games: Record<string, ITable> = {}

const simulateDealerPlay = (io: any, gameId: string) => {
    const interval = setInterval(() => {
        let game = games[gameId];
        let updatedState = executeDealerPlay(game);
        games[gameId] = updatedState
        io.to(gameId).emit("table_update", updatedState);

        if (updatedState.phase == "ended") {
            clearInterval(interval);
            console.log(`ending game ${gameId}`);
            let result = getResult(game);
            let finalState = updateBanks(game, result);
            games[gameId] = finalState;
            io.to(gameId).emit("table_update", finalState);
            io.to(gameId).emit("game_end", result);
        }
    }, 1500);
}

export const gameSocket = (socket: Socket, io: any) => {
    socket.on("get_game", (gameId: string, playerId: string, callback: any) => {
        socket.join(gameId)
        if (gameId in games) {
            let game = games[gameId];
            let updatedGame = dealFreshForPlayer(game, playerId)
            games[gameId] = updatedGame;
            io.to(gameId).emit("table_update", updatedGame)
            callback({
                type: "success",
                state: games[gameId],
            })
            
            return;
        }

        const room = getRoomById(gameId);
        const game = getNewGame(room);
        games[game.tableId] = game;
        // console.log(JSON.stringify(games, null, 4));

        io.to(gameId).emit("table_update", game)
        callback({
            type: "success",
            state: game,
        })
    })

    socket.on("player_hit", (gameId: string, playerId: string, callback: any) => {
        let game = games[gameId];
        let updatedState = executeHit(game, playerId);
        games[gameId] = updatedState;
        console.log("emmitting updated state after player hit")
        io.to(gameId).emit('table_update', updatedState);

        if (updatedState.turn == "dealer") simulateDealerPlay(io, gameId);
    })

    socket.on("player_stand", (gameId: string, playerId: string, callback: any) => {
        let game = games[gameId];
        let updatedState = executeStand(game, playerId);
        games[gameId] = updatedState;
        console.log("emmitting updated state after player stand")
        io.to(gameId).emit('table_update', updatedState);

        if (updatedState.turn == "dealer") simulateDealerPlay(io, gameId);
    })

    socket.on('remove_player', (playerId: string, gameId: string, callback: any) => {
		let table = games[gameId];
		table.players = table.players.filter((player: IPlayers) => player.playerId != playerId);
		console.log(`Removing player ${playerId} from table`);
		games[gameId] = table;
        removePlayerFromRoom(playerId, gameId);

		callback({
			type: "success"
		})
	})

    socket.on('rejoin_room', (playerId: string, gameId: string, callback: any) => {
        let game = games[gameId];
        let newRound = getNewRound(game.players.length);
        console.log(`${playerId} rejoining room ${gameId}`);
        
        let newGame: ITable = {
            tableId: gameId,
            phase: "playing",
            deck: newRound.deck,
            turn:  game.players[0].playerId,
            cardIdx: newRound.cardIdx,
            dealer: {
                cards: newRound.dealerCards,
            },
            players: newRound.playerCards.map((cards, idx) => {
                return {
                    playerId: game.players[idx].playerId,
                    name: game.players[idx].name,
                    bank: game.players[idx].bank,
                    hand: {
                        status: playerId == game.players[idx].playerId ? "playing" : "idle",
                        wager: "5",
                        cards: cards,
                    }
                }
            })
        }

        games[gameId] = newGame;

        callback({
            type: "success",
        })
    })
}