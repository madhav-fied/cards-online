import {generateRandomRoomCode} from "../services/room.js"

export const roomSocket = (socket: any, io: any) => {
	socket.on('create_room', (playerName: string, callback: any) => {
		const playerId = generateRandomRoomCode();
		const gameId = generateRandomRoomCode();
		console.log(`${playerName} created game - id: ${gameId}`)
		callback({
			playerId: playerId,
			gameId: gameId
		})
	})
	
	socket.on('join_room', (playerName: string, room_id: string, callback: any) => {
		console.log(`${playerName} joined room ${room_id}`)
		const playerId = generateRandomRoomCode();
		callback({
			playerId: playerId,
			gameId: room_id,
		})
		setTimeout(() => {
			socket.emit('')
		}, 1000);
	})
}

