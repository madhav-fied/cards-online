import {generateRandomRoomCode, createRoom, joinRoom} from "../services/room.js"


let rooms: Record<string, any> = {}

export const roomSocket = (socket: any, io: any) => {
	// TODO: divide by room and room id
	socket.on('create_room', (playerName: string, callback: any) => {
		const playerId = generateRandomRoomCode();
		const gameId = generateRandomRoomCode();
		const player = {
			playerId: playerId,
			playerName: playerName
		}
		console.log(`${playerName} creating game - id: ${gameId}`);
		rooms = createRoom(gameId, player, rooms);
		console.log(JSON.stringify(rooms, null, 4));
		
		callback({
			type: 'success',
			playerId: playerId,
			gameId: gameId
		})

	})
	
	socket.on('join_room', (playerName: string, room_id: string, callback: any) => {
		const playerId = generateRandomRoomCode();
		const player = {
			playerId: playerId,
			playerName: playerName
		}
		console.log(`${playerName} joining room ${room_id}`);
		try {
			rooms = joinRoom(room_id, player, rooms);
			console.log(JSON.stringify(rooms, null, 4));
		} catch (error: unknown) {
			if (error instanceof Error) {
				callback({
					type: 'error',
					message: error.message,
				});
			}
			console.error(error);
			return;
		}
		callback({
			type: 'success',
			playerId: playerId,
			gameId: room_id,
		})
	})
}

export const getRoomById = (id: string) => {
	if (!(id in rooms)) {
		return null;
	}
	return rooms[id];
}

export const removePlayerFromRoom = (playerId: string, roomId: string) => {
	let room = rooms[roomId];
	room.players = room.players.filter((player: any) => player.playerId != playerId);
	console.log(`Removing player ${playerId} from room`);
	rooms[roomId] = room;
}

