import React, { createContext, useContext, useRef, useEffect } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000'));

  useEffect(() => {
    const socket = socketRef.current;

    socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};
