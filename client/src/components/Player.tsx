import { useCallback, useMemo } from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import {CardList} from "../components/CardList";
import type {CardProps} from "../components/Card";


import WavingHandIcon from '@mui/icons-material/WavingHand';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import { useSocket } from '../socketLib/socketContext';
import { useGame } from './GameContext';
import { countHand } from '../utils/cards';
import { Badge } from '@mui/material';

export interface PlayerProps {
	name: string
	cards: Array<CardProps>
	status: "playing" | "standing" | "busted" | "idle",
	bank?: string
	wager?: string
}

const sxPlayer: any = {
	display: 'flex',
	flexDirection: 'column',
}

const sxPlayerHeader: any = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	marginBottom: '4px',
}

const sxCardContent: any = {
	display: 'flex',
	flexDirection: 'column',
	gap: 1,
}

const sxPlayerIndicator: any = {
	display: 'flex',
	flexDirection: 'row',
	gap: 1,
}


export const Player = ({name, cards, bank, wager, status}: PlayerProps) => {
	const socket = useSocket();
	const {playerId, gameId} = useGame();

	const cardValue = useMemo(() => {
		return countHand(cards);
	}, [cards]);

	const handlePlayerHit = useCallback((_: any) => {
		socket.timeout(5000).emit('player_hit', gameId, playerId, (err: any, res: any) => {
			console.log(res);
			console.error(err);
		})
	}, [socket])

	const handlePlayerStand = useCallback((_: any) => {
		socket.timeout(5000).emit('player_stand', gameId, playerId, (err: any, res: any) => {
			console.log(res);
			console.error(err);
		})
	}, [socket])

	const actions: any = [
		{ icon: <TouchAppIcon />, name:'Hit', task: handlePlayerHit},
		{ icon: <WavingHandIcon />, name:'Stand', task: handlePlayerStand},
	]

	const cardStatusColor: string | null = useMemo(() => {
		if (status == "busted") return "#FFCCCB";
		if (status == "standing" || status == "idle") return "#EDEDED";
		return null;
	}, [status])

	return (
		<>
			<Box sx={sxPlayer}>
				<Card raised sx={{backgroundColor: cardStatusColor}}>
					<CardContent sx={sxCardContent}>
						<Box sx={sxPlayerHeader}>
							<Box sx={sxPlayerIndicator}>
								<Typography variant="h5">{name}</Typography>
								{ status == 'playing' && <Chip label="active" color="success" /> }
							</Box>
							<Chip label={`$${bank}`} color="warning" />
						</Box>
						<Box sx={sxPlayerHeader}>
							<Typography variant="body1">Wager:  ${wager}</Typography>
							<Typography variant="body1">Total:  {cardValue}</Typography>
						</Box>
						<CardList cards={cards} size={2} />
						<SpeedDial 
							ariaLabel="bj-actions"
							icon={<SpeedDialIcon />}
							hidden={status != "playing"} 
							direction="right"
						>
							{
								actions.map((action: any) => (
									<SpeedDialAction 
										key={action.name}
										onClick={action.task}
										icon={action.icon}
	  							                slotProps={{
		   							        tooltip: {
											title: action.name,
											placement: 'bottom',
									      		},
									    	}}
									/>
							))}
						</SpeedDial>
					</CardContent>
				</Card>
			</Box>
		</>
	)
}

