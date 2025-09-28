import type { ComponentProps, ReactNode } from "react";


type ButtonProps = ComponentProps<"button"> & {
	children: ReactNode; 
}

export interface ButtonListProps {
	buttons: Array<ButtonProps>;
}


export const ButtonList = ({buttons = []}: ButtonListProps) => {
	
	const buttonListContainerStyle: any = {
		display: "flex",
		gap: 16, 
		
	}

	const buttonStyle: any = {
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		border: '1px solid rgba(0, 0, 0, 0.1)',
		borderRadius: '0.25rem',
		boxShadow: 'rgba(0, 0, 0, 0.02) 0 1px 3px 0',
		boxSizing: 'border-box',
		color: 'rgba(0, 0, 0, 0.85)',
		cursor: 'pointer',
		display: 'inline-flex',
		fontFamily: 'system-ui, -apple-system, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif',
		fontSize: '16px',
		fontWeight: 600,
		justifyContent: 'center',
		lineHeight: 1.25,
		margin: 0,
		minHeight: '3rem',
		padding: 'calc(.875rem - 1px) calc(1.5rem - 1px)',
		position: 'relative',
		textDecoration: 'none',
		transition: 'all 250ms',
		userSelect: 'none',
		WebkitUserSelect: 'none',
		touchAction: 'manipulation',
		verticalAlign: 'baseline',
		width: 'auto',
	};



	return (
		<div style={buttonListContainerStyle}>
			{
				buttons.map((btnAttr) => (
					<button style={buttonStyle} {...btnAttr}> 
						{btnAttr.children}
					</button> 
				))
			}
		</div>
	)
}
