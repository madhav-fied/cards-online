import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useGame } from "../components/GameContext";
import { useTable, type ITable } from "../components/TableContext";
import { useSocket } from "../socketLib/socketContext";
import {useState, useEffect} from "react"
import { useNavigate } from "react-router";

export interface Player {
	playerId: string;
	playerName: string;
}

export interface Lobby {
	gameId: string;
	host: string;
	players: Array<Player>;
}

const sxNavbar: any = {
	bgcolor: '#cfe8fc',
	width: '100vw',
	height: '5vh',
	padding: '0.5vh',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
}

const sxLobby: any = {

}

export const Lobby = () => {
    const socket = useSocket();
    const navigate = useNavigate();
    const {playerId, gameId} = useGame();
    const {tableState, setTableState} = useTable();
    const [lobby, setLobby] = useState<Lobby | null>(null);
    
    useEffect(() => {
        socket.on("lobby_update", (lobby: Lobby) => {
            setLobby(lobby);
        })

        socket.on('game_start', (state: ITable) => {
            setTableState(state);
            navigate(`/game/${gameId}`);
        })
    }, [])

    const beginGame = () => {
        socket.timeout(5000).emit('begin_game', gameId, (err: any, res: any) => {
            if (err) {
				console.error(err);
				return;
			}

			if (res.type == 'error'){
				throw new Error(res.message);
			}
        })
    }

    if (tableState.phase != "lobby") return null;

    return (
        <>
            <Box id="navbar" sx={sxNavbar}>
				<Typography variant="h4">BlackJack</Typography>
				<Avatar></Avatar>
			</Box>
            <Box id="lobby" sx={sxLobby}>
                <Typography variant="h5">Lobby</Typography>
                {
                    lobby?.players?.map((player: Player) => {
                        return (
                            <Typography variant="h6">
                                {player.playerName}
                            </Typography>
                        )
                    })
                }
                {
                    
                    playerId == lobby?.host && <Button onClick={beginGame}>Click to begin</Button>
                }
            </Box>
        </>
    )
}