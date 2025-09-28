import { useContext, createContext, useEffect } from "react";
import { io } from 'socket.io-client'

const URL = 'http://localhost:56789';
const SocketContext = createContext<any>(null);

export const SocketProvider = ({children} : any) => {
    const socket = io(URL);
    
    useEffect(() => {
        return () => {
            socket.disconnect();
        }
    }, [])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

export const useSocket = () => useContext(SocketContext);