import Home from "./pages/Home";
import SocketProvider from "./contexts/SocketProvider";
import FloatingStatusPlugin from "./components/FloatingStatusPlugin";
import { useState } from "react";

export default function App() {
  const [selectedMsg, setSelectedMsg] = useState(null);
  return (
    <SocketProvider>
      <Home setSelectedMsg={setSelectedMsg} selectedMsg={selectedMsg}/>
       <FloatingStatusPlugin selectedMsg={selectedMsg} />
    </SocketProvider>
  );
}
