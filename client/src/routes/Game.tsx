

// card for money
// buttons for actions
// card list
// avatar
// box
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import {GamblerCard} from "../components/GamblerCard"
import {Player} from "../components/Player"
import {Dealer} from "../components/Dealer"
import { useSocket } from '../socketLib/socketContext';
import { useGame } from '../components/GameContext';
import { useEffect, useState } from 'react';
import { useTable, type ITable } from '../components/TableContext';
import { ResultsModal, type IResultsProps } from '../components/ResultsModal';




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

const sxGrid: any = {
	width: '100%',
}


export const Game = () => {
	const {playerId} = useGame();
	const socket = useSocket();
	const {tableState, setTableState} = useTable();
	const [result, setResult] = useState<IResultsProps | undefined>(undefined);
	
	useEffect(() => {
		socket.on("table_update", (newState: ITable) => {
			setTableState(newState);
		});

		socket.on("game_end", (result: IResultsProps) => {
			console.log(result);
			if (result) {
				setResult(result);
			}
		})
	}, [])

	return (
		<>
			{ 
				tableState.phase != "lobby" && 
				(
					<>
					<Box id="game" sx={sxGame}>

						<Box id="table" sx={sxTable}>
						{ result ? <ResultsModal {...result}/> : null }
						<Grid container spacing={2} sx={sxGrid}>

							<Grid size={12}>
								{
									tableState?.dealer?.cards &&	<Dealer cards={tableState?.dealer.cards} />
								}
							</Grid>

							<Grid size={12}>
								{
									tableState?.players?.map((player) => {
										if (player.playerId != playerId) return null;

										return (
											<Grid size={12}>
												<Player cards={player.hand.cards} name={player.name} bank={player.bank} wager={player.hand.wager} status={player.hand.status}/>
											</Grid>
										)
									})
								}
							</Grid>

							<Grid size={12}>
								<Grid container spacing={2}>
									{
										tableState?.players?.map((player) => {
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
			)}
		</>
	)
}

