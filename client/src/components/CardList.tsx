
import {Card} from "./Card";
import type {CardProps} from "./Card"  


export interface CardListProps {
	cards: Array<CardProps>
	size?: number
	stacked?: boolean
}

export const CardList = ({cards, size = 3, stacked = false} : CardListProps) => {
	const cardListStyle: any = {
		display: "flex",
		flexDirection: "row",
		gap: size * 8,
	}

	const stackedStyle: any = {
		marginLeft: -(size * 35),
		position: "relative",
	}

	return (
		<div style={cardListStyle}>
			{
				cards.map((card, idx) => (
					<div style={stacked ? {...stackedStyle, zIndex: idx,} : undefined}>
						<Card size={size} {...card} />
					</div>
				)) 
			}
		</div>
	)
};

