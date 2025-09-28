import { useMemo } from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import {CardList} from "../components/CardList";
import type {CardProps} from "../components/Card";

export interface GamblerCardProps {
	name: string 
	cards: Array<CardProps>
	bank?: string
	wager?: string
	status: "playing" | "standing" | "busted" | "idle"
}

const sxGambler: any = {
	display: 'flex',
	flexDirection: 'column',
}

const sxGamblerHeader: any = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
}

const sxCardContent: any = {
	display: 'flex',
	flexDirection: 'column',
	gap: 1,
}

export const GamblerCard = ({name, cards, bank, wager, status}: GamblerCardProps) => {
	const cardValue = useMemo(() => {
		return "21";
	}, [cards]);

	const cardStatusColor: string | null = useMemo(() => {
		if (status == "busted") return "#FFCCCB";
		if (status == "standing" || status == "idle") return "#EDEDED";
		return null;
	}, [status])

	return (
		<>
			<Box sx={sxGambler}>
				<Card raised sx={{backgroundColor: cardStatusColor}}>
					<CardContent sx={sxCardContent}>
						<Box sx={sxGamblerHeader}>
							<Typography variant="h6">{name}</Typography>
							<Chip label={`$${bank}`} color="warning" />
						</Box>
						<Box sx={sxGamblerHeader}>
							<Typography variant="body1">Wager:  ${wager}</Typography>
							<Typography variant="body1">Total:  {cardValue}</Typography>
						</Box>
						<CardList cards={cards} size={1} />
					</CardContent>
				</Card>
			</Box>
		</>
	)
}

