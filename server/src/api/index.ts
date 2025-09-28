import express from "express";
import {Server} from "socket.io";
import {createServer} from "node:http";
import {socketLoader}  from "../sockets/index.js"

const app = express();
const server = createServer(app);


const io = new Server(server, {
  	cors: {
		origin: "*",
	}
});

socketLoader(io);


app.get("/health", (req, res) => {
	res.send("OK");
});


server.listen(56789, () => {
	console.log("Server running on http://localhost:56789");
});

