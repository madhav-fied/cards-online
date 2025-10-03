import { useContext, createContext, useRef } from "react";
import { io, Socket } from 'socket.io-client'

const URL = 'http://localhost:56789';
// const URL = 'http://server:56789';
const SocketContext = createContext<any>(null);

export const SocketProvider = ({children} : any) => {
    const socketRef = useRef<Socket | null>(null);

    if (!socketRef.current) {
        socketRef.current = io(URL, {
            autoConnect: true
        });
    }

    

    return (
        <SocketContext.Provider value={socketRef.current}>
            {children}
        </SocketContext.Provider>
    );
}

export const useSocket = () => useContext(SocketContext);