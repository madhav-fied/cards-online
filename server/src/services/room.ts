import {randomUUID} from "node:crypto";

export interface Player {
	playerId: string;
	playerName: string;
}

export interface Room {
	gameId: string;
	players: Array<Player>;
}

export const generateRandomRoomCode = () => {
	return randomUUID().substring(0, 11);
}

export const createRoom = (gameId: string, player: Player, rooms: Record<string, Room>) => {
	rooms[gameId] = {
		gameId: gameId,
		players: [
			{
				playerId: player.playerId,
				playerName: player.playerName
			}
		]
	}
	return rooms;
}

export const joinRoom = (gameId: string, player: Player, rooms: Record<string, Room>) => {
	if (!(gameId in rooms)) {
		throw new Error(`Room with ${gameId} does not exist`)
	}
	rooms[gameId].players.push({
		playerId: player.playerId,
		playerName: player.playerName,
	})
	return rooms;
}

