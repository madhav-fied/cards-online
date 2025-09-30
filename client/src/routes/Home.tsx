import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography"
import Avatar from "@mui/material/Avatar"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';

import { useSocket } from "../socketLib/socketContext";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router';
import Badge from "@mui/material/Badge";
import { useGame } from "../components/GameContext";
import { TableProvider } from "../components/TableContext";

const sxNavbar: any = {
	bgcolor: '#cfe8fc',
	width: '97vw',
	height: '5vh',
	padding: '0.5vh',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
}

const sxMenu: any = {
	width: '40vw',
	height: '40vh',
	margin: 'auto',
	border: '2px solid #00008B',
	borderRadius: '5%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
}

const sxPage: any = {
	width: '100vw',
	height: '100vh',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
}

export const Home = () => {
	const socket = useSocket();
	const {setPlayerId, setGameId} = useGame();
	const [connected, setConnected] = useState(socket.connected);
	const [roomCode, setRoomCode] = useState('');
	const [playerName, setPlayerName] = useState<string>('')

	let navigate = useNavigate();

	useEffect(() => {
		socket.on('connect', () => setConnected(true));
		socket.on('disconnect', () => setConnected(false));

		return () => {
			socket.off('connect', () => setConnected(true));
			socket.off('disconnect', () => setConnected(false));
		}
	}, []);
	
	function createRoom() {
		console.log(`creating a room for ${playerName}`)
		socket.timeout(5000).emit('create_room', playerName, (err: any, res: any) => {
			if (err) {
				console.error(err);
				return;
			}

			if (res.type == 'error'){
				throw new Error(res.message);
			}
			setPlayerId(res.playerId);
			setGameId(res.gameId);
			navigate(`/game/${res.gameId}`);
		})
	}

	function joinRoom() {
		socket.timeout(5000).emit('join_room', playerName, roomCode, (err: any, res: any) => {
			if (err) {
				console.error(err);
				return;
			}

			if (res.type == 'error') {
				throw new Error(res.message);
			}
			console.log(res);
			setPlayerId(res.playerId);
			setGameId(res.gameId);
			navigate(`/game/${res.gameId}`);
		})

	}
	


	return (
		<TableProvider>
			<Box id="navbar" sx={sxNavbar}>
				<Typography variant="h4">BlackJack</Typography>
				<Stack direction="row" spacing={3}>
					<Button>Learn</Button>
					<Button>Sponsor</Button>
				</Stack>
				<Badge color="success" variant="dot" invisible={!connected}>
					<Avatar>{playerName.charAt(0).toUpperCase()}</Avatar>
				</Badge>
			</Box>
			<Box id="home-page" sx={sxPage}>
				<Box id="game-dialog" sx={sxMenu}>
					<List>
						<ListItem>
							<TextField id="standard" label="Your name" value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
						</ListItem>
						<ListItem>
							<TextField id="standard" label="Room code" value={roomCode} onChange={(e) => setRoomCode(e.target.value)} />
						</ListItem>
						<ListItem>
							<ListItemButton>
								<ListItemText primary="Single player Game" />
							</ListItemButton>
						</ListItem>
						<ListItem>
							<ListItemButton onClick={joinRoom}>
								<ListItemText primary="Join custom room" />
							</ListItemButton>
						</ListItem>
						<ListItem>
							<ListItemButton onClick={createRoom}>
								<ListItemText primary="Create a room" />
							</ListItemButton>
						</ListItem>
					</List>
				</Box>
			</Box>
		</TableProvider>
	)
}


