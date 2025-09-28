import {roomSocket} from "./room.socket.js";

const games = {}

export const socketLoader = (io: any) => {
	io.on('connection', (socket: any) => {
		console.log("User connected");

		roomSocket(socket,io);

		socket.on('disconnect', () => {
			console.log("User disconnected");
		})
	})
}

