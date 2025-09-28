import { Routes, Route } from "react-router";
import {Home} from "./routes/Home";
import {Result} from "./routes/Result"
import {Game} from "./routes/Game"
import { SocketProvider } from "./socketLib/socketContext";
import { GameProvider } from "./components/GameContext";


const routesConfig: Record<string, any>[] = [
	{path: "/", element: <Home />},
	{path: "result", element: <Result />},
	{path: "game/:game_id", element: <Game />}
]





function App() {
	
	return (
		<SocketProvider>
			<GameProvider>
				<Routes>
					{
						routesConfig.map((route) => <Route {...route} />)
					}
				</Routes>
			</GameProvider>
		</SocketProvider>
	)
}

export default App
