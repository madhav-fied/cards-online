import { useContext, createContext, useState } from "react";

const GameContext = createContext<any>(null);

export const GameProvider = ({children} : any) => {
    const [gameId, setGameId] = useState(null);
    const [playerId, setPlayerId] = useState(null);

    return (
        <GameContext.Provider value={{gameId, setGameId, playerId, setPlayerId}}>
            {children}
        </GameContext.Provider>
    );
}

export const useGame = () => useContext(GameContext);