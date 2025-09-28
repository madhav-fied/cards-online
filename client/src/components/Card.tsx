export interface CardProps {
	value: string;
	house: "♠" | "♥" | "♣" | "♦";
	size?: number;
	isFaceUp?: boolean;
}


export const Card = ({value, house, isFaceUp = true, size = 3}: CardProps) => {
	const cardStyle: any = {
		border: "2px solid rgba(0, 0, 0, 0.35)",
		padding: "8px",
		borderRadius: "8px",
		backgroundColor: "white",
		
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",

		minWidth: size * 36,
		minHeight: size * 64

	};

	const fontDisplayStyle: any = {
		display: "flex",
		flexDirection: "row",

		fontSize: size * 8,
	};

	return (
		<div style={cardStyle}>
		{  
			isFaceUp ? (
				<>
   				        <div style={{...fontDisplayStyle, justifyContent: "start"}}>{ size > 1 && (value + house)}</div> 
					<div style={{...fontDisplayStyle, justifyContent: "center", fontSize: size * 16,}}>{value + house}</div>
					<div style={{...fontDisplayStyle, justifyContent: "end"}}>{ size > 1 && (value + house)}</div>
				</>
		       	) : (
		       		<div>X</div>
		       	)
		}
		</div>
	);
}

