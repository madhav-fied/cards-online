import { gameSocket } from "./game.socket.js";
import {roomSocket} from "./room.socket.js";

export const socketLoader = (io: any) => {
	io.on('connection', (socket: any) => {
		console.log("User connected");

		roomSocket(socket, io);
		gameSocket(socket, io);

		socket.on('disconnect', () => {
			console.log("User disconnected");
		})
	})
}

