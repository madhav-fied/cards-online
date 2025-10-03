import { Socket } from "socket.io"
import { dealFreshForPlayer, getNewGame, getNewRound, IPlayers, ITable, updateBanks } from "../services/game.js"
import { getRoomById, removePlayerFromRoom } from "./room.socket.js"
import { executeDealerPlay, executeHit, executeStand, getResult } from "../services/state.js"

// TODO: move to redis for scale
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
    socket.on("begin_game", (gameId: string, callback: any) => {       
        // TODO: error handling
        socket.join(gameId)
        const room = getRoomById(gameId);
        const game = getNewGame(room);
        games[game.tableId] = game;

        callback({
            type: "success",
        })

        io.to(gameId).emit("game_start", game)
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
}