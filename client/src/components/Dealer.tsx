import { useMemo } from 'react'
import {CardList} from "./CardList"
import type { CardProps } from "./Card";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { countHand } from '../utils/cards';


export interface DealerProps {
	cards: Array<CardProps>;
	canPlay: boolean
}

const sxDealer: any = {
	display: 'flex',
	flexDirection: 'column',
}

const sxDealerHeader: any = {
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

export const Dealer = ({cards}: DealerProps) => {
	const cardValue = useMemo(() => {
		return countHand(cards);
	}, [cards]);

	return (
		<>
			<Box sx={sxDealer}>
				<Card raised>
					<CardContent sx={sxCardContent}>
						<Box sx={sxDealerHeader}>
							<Typography variant="h5">Dealer</Typography>
						</Box>
						<Box sx={sxDealerHeader}>
							<Typography variant="body1">Total:  {cardValue}</Typography>
						</Box>
						<CardList cards={cards} size={2} />
					</CardContent>
				</Card>
			</Box>
		</>
	)
}


