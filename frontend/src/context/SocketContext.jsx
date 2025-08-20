import { createContext, useEffect } from "react";
import { io } from "socket.io-client"

/**
 * Fast Refresh in React works best when a file only exports components.
 * If you define React contexts in the same file as your components,
 * Fast Refresh may not work correctly. 
 * To fix this, move your context definition (e.g., createContext) to a separate file.
 * This file should only contain the provider component and imports the context from another file.
 */



export const SocketContext = createContext()


const socket = io(`${import.meta.env.VITE_BASE_URL}`);

const SocketProvider = ({ children }) => {
    useEffect(() => {
        socket.on("connect", () => {
            console.log("connected to server")
        })

        socket.on("disconnect", () => {
            console.log("Disconnect to server")
        })
    }, [])


    return <SocketContext.Provider value={{ socket }}>
        {children}
    </SocketContext.Provider>
}

export default SocketProvider;