import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { SocketContext } from "../contexts/SocketContext";

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const s = io(import.meta.env.VITE_API_BASE);
    setSocket(s);
    return () => s.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
