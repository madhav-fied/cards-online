import {randomUUID} from "node:crypto";

export const generateRandomRoomCode = () => {
	return randomUUID().substring(0, 11);
}


