

// card for money
// buttons for actions
// card list
// avatar
// box
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography"
import Avatar from "@mui/material/Avatar"
import {GamblerCard} from "../components/GamblerCard"
import {Player} from "../components/Player"
import {Dealer} from "../components/Dealer"
import { useSocket } from '../socketLib/socketContext';
import { useGame } from '../components/GameContext';
import { useEffect } from 'react';
import { useTable } from '../components/TableContext';


const sxNavbar: any = {
	bgcolor: '#cfe8fc',
	width: '100vw',
	height: '5vh',
	padding: '0.5vh',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
}

const sxTable: any = {
//	border: '1px solid red',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'space-between',

	marginLeft: '20vw',
	marginRight: '20vw',
	padding: '0.5vh 0.5vw',
}

const sxGame: any = {
	border: '1px solid blue',
	width: '100vw',
	height: '90vh',
	padding: '0.5vh 0.5vw',
}


export const Game = () => {
	const {playerId, gameId} = useGame();
	const socket = useSocket();
	

	const {tableState, setTableState} = useTable(); 

	
	useEffect(() => {
		socket.on("table_update", (res: any) => {
			setTableState(res.state);
		});
	}, [])


	return (
		<>
			<Box id="navbar" sx={sxNavbar}>
				<Typography variant="h4">BlackJack</Typography>
				<Avatar>N</Avatar>
			</Box>
			<h2>
				gameid={gameId}
			</h2>


			<Box id="game" sx={sxGame}>

				<Box id="table" sx={sxTable}>
				<Grid container spacing={2}>

					<Grid size={12}>
						{
							tableState?.dealer.cards &&	<Dealer cards={tableState?.dealer.cards} />
						}
					</Grid>

					<Grid size={12}>
						{
							tableState?.players.map((player) => {
								if (player.playerId != playerId) return null;

								return (
									<Grid size={6}>
										<Player cards={player.hand.cards} name={player.name} bank={player.bank} wager={player.hand.wager} status={player.hand.status}/>
									</Grid>
								)
							})
						}
					</Grid>

					<Grid size={12}>
						<Grid container spacing={2}>
							{
								tableState?.players.map((player) => {
									if (player.playerId == playerId) return null;

									return (
										<Grid size={6}>
											<GamblerCard name={player.name} bank={player.bank} wager={player.hand.wager} cards={player.hand.cards} status={player.hand.status}/>
										</Grid>
									)
								})
							}
						</Grid>
					</Grid>
				</Grid>
				</Box>
			</Box>
		</>
	)
}

