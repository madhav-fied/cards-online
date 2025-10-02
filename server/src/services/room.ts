import {randomUUID} from "node:crypto";

export interface Player {
	playerId: string;
	playerName: string;
}

export interface Room {
	gameId: string;
	host: string;
	players: Array<Player>;
}

export const generateRandomRoomCode = () => {
	return randomUUID().substring(0, 11);
}

export const createRoom = (gameId: string, player: Player, rooms: Record<string, Room>) => {
	let newRoom = {
		gameId: gameId,
		host: player.playerId,
		players: [
			{
				playerId: player.playerId,
				playerName: player.playerName
			}
		]
	}
	return newRoom;
}

export const joinRoom = (player: Player, room: Room) => {
	room.players.push({
		playerId: player.playerId,
		playerName: player.playerName,
	})
	return room;
}

