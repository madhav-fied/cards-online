import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Chip from "@mui/material/Chip";
import { useGame } from "../components/GameContext";
import { useTable, type ITable } from "../components/TableContext";
import { useSocket } from "../socketLib/socketContext";
import {useState, useEffect} from "react"
import { useNavigate } from "react-router";
import Divider from "@mui/material/Divider";

export interface Player {
	playerId: string;
	playerName: string;
}

export interface Lobby {
	gameId: string;
	host: string;
	players: Array<Player>;
}

const sxDetails: any = {
	width: '50vw',
	height: '50vh',
	margin: 'auto',
	border: '2px solid #00008B',
	borderRadius: '5%',
	display: 'flex',
    flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'space-evenly'
}

const sxLobby: any = {
	width: '100vw',
	height: '100vh',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
}

const sxPlayerList: any = {
    width: "60%",
}

const sxPlayerItem: any = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 1
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
            <Box id="lobby-page" sx={sxLobby}>
                <Box id="details" sx={sxDetails}>
                    <Typography variant="h4">Gambler's Lobby</Typography>
                    <List sx={sxPlayerList}>
                    {
                        lobby?.players?.map((player: Player) => {
                            return (
                                <>
                                    <ListItem sx={sxPlayerItem}>
                                        <Typography variant="h5">
                                            {player.playerName}
                                        </Typography>
                                        <Box>
                                            { player.playerId == lobby?.host  && <Chip label="host" variant="outlined" color="info" /> }
                                            { player.playerId == playerId && <Chip label="you" variant="outlined" color="info" /> }
                                        </Box>
                                    </ListItem>
                                    <Divider />
                                </>
                            )
                        })
                    }
                    </List>
                    {
                        <Button variant="outlined" disabled={playerId != lobby?.host} onClick={beginGame}>Click to begin</Button>
                    }
                </Box>
            </Box>
        </>
    )
}