import type { ComponentProps, ReactNode } from "react";


type ButtonProps = ComponentProps<"button"> & {
	children: ReactNode; 
}

export interface ListMenuProps {
	items: Array<ButtonProps>	
}

export const ListMenu = ({items} : ListMenuProps) => {

	const listContainerStyle: any = {
		listStyle: 'none',
		border: '1px solid rgba(0, 0, 0, 0.4)',
		borderRadius: '0.25rem',
		margin: 0,
		padding: '8px',
	};

	const listItemStyle: any = {
		borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
		backgroundColor: '#FFFFFF',
		color: 'rgba(0, 0, 0, 0.85)',
		cursor: 'pointer',
		fontFamily: 'system-ui, -apple-system, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif',
		fontSize: '16px',
		fontWeight: 600,
		margin: 0,
		width: '240px',
		padding: 0,

		marginTop: '8px',
		paddingLeft: '8px',
	};
	
	return (
		<>
			<div>
				<ul style={listContainerStyle}>
				{
					items.map((itemProps, idx) => {
						return (
							<li key={idx} style={listItemStyle} {...itemProps}>

							</li>
						)
					})
				}
				</ul>
			</div>
		</>
	)
	
}

