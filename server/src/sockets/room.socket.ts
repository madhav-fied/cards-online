import {generateRandomRoomCode, createRoom, joinRoom, Room} from "../services/room.js"


let rooms: Record<string, Room> = {}

export const roomSocket = (socket: any, io: any) => {
	// TODO: divide by room and room id
	// TODO: never use callbacks
	socket.on('create_room', (playerName: string, callback: any) => {
		const playerId = generateRandomRoomCode();
		const gameId = generateRandomRoomCode();
		const player = {
			playerId: playerId,
			playerName: playerName
		}
		console.log(`${playerName} creating game - id: ${gameId}`);
		let room = createRoom(gameId, player, rooms);
		rooms[gameId] = room
		
		callback({
			type: 'success',
			playerId: playerId,
			gameId: gameId
		})

		socket.join(gameId);
		setTimeout(() => {
			console.log("Multicasting lobby status")
			io.to(gameId).emit('lobby_update', room);
		}, 1000);
	})
	
	socket.on('join_room', (playerName: string, room_id: string, callback: any) => {
		// TODO: (check bug) player already exists but exited and join
		const playerId = generateRandomRoomCode();
		const player = {
			playerId: playerId,
			playerName: playerName
		}
		console.log(`${playerName} joining room ${room_id}`);
		try {
			let room = getRoomById(room_id);
			room = joinRoom(player, room);
			rooms[room_id] = room;
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

		socket.join(room_id)
		setTimeout(() => {
			console.log("Multicasting lobby status")
			io.to(room_id).emit('lobby_update', rooms[room_id]);
		}, 1000);
	})

	socket.on('rejoin_room', (playerId: string, playerName: string, gameId: string, callback: any) => {
        let room = rooms[gameId];
		let newPlayer = room.players.filter((player) => player.playerId == playerId)
		
		// TODO: retain banks - they should be player attr, not game specific
		if (newPlayer.length > 0) {
			room.host = newPlayer[0].playerId
			room.players = newPlayer
		} else {
			room.players.push({
				playerId: playerId,
				playerName: playerName
			});
		}

		rooms[gameId] = room;

        callback({
            type: "success",
        })

		socket.join(gameId)
		setTimeout(() => {
			console.log("Multicasting lobby status")
			io.to(gameId).emit('lobby_update', rooms[gameId]);
		}, 1000);
    })
}

export const getRoomById = (id: string) => {
	if (!(id in rooms)) {
		throw new Error(`Room with id ${id} does not exist`)
	}
	return rooms[id];
}

export const removePlayerFromRoom = (playerId: string, roomId: string) => {
	let room = rooms[roomId];
	room.players = room.players.filter((player: any) => player.playerId != playerId);
	console.log(`Removing player ${playerId} from room`);
	rooms[roomId] = room;
}

