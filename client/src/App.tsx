import { Routes, Route } from "react-router";
import {Home} from "./routes/Home";
import {Game} from "./routes/Game"
import { SocketProvider } from "./socketLib/socketContext";
import { GameProvider } from "./components/GameContext";
import { TableProvider } from "./components/TableContext";
import {ErrorBoundary} from "./components/ErrorBoundary";
import { Lobby } from "./routes/Lobby";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography"
import Avatar from "@mui/material/Avatar"
import Badge from "@mui/material/Badge";


const routesConfig: Record<string, any>[] = [
	{path: "/", element: <Home />},
	{path: "game/:game_id", element: <Game />},
	{path: "lobby/:game_id", element: <Lobby />},
]


const sxNavbar: any = {
	bgcolor: '#cfe8fc',
	width: '97vw',
	height: '5vh',
	padding: '0.5vh',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
}

function App() {
	
	return (
		<ErrorBoundary>
			<SocketProvider>
				<GameProvider>
					<TableProvider>
						<Box id="navbar" sx={sxNavbar}>
							<Typography variant="h4">BlackJack</Typography>
							<Badge color="success" variant="dot">
								<Avatar></Avatar>
							</Badge>
						</Box>
						<Routes>
							{
								routesConfig.map((route) => <Route {...route} />)
							}
						</Routes>
					</TableProvider>
				</GameProvider>
			</SocketProvider>
		</ErrorBoundary>
	)
}

export default App
