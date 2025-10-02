import { Routes, Route } from "react-router";
import {Home} from "./routes/Home";
import {Result} from "./routes/Result"
import {Game} from "./routes/Game"
import { SocketProvider } from "./socketLib/socketContext";
import { GameProvider } from "./components/GameContext";
import { TableProvider } from "./components/TableContext";
import {ErrorBoundary} from "./components/ErrorBoundary";
import { Lobby } from "./routes/Lobby";


const routesConfig: Record<string, any>[] = [
	{path: "/", element: <Home />},
	{path: "result", element: <Result />},
	{path: "game/:game_id", element: <Game />},
	{path: "lobby/:game_id", element: <Lobby />},
]





function App() {
	
	return (
		<ErrorBoundary>
			<SocketProvider>
				<GameProvider>
					<TableProvider>
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
