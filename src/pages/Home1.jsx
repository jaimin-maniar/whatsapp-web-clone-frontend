import { useEffect, useState, useRef } from "react";
import { getChats, getMessages } from "../api/api";
import { useSocket } from "../hooks/useSocket";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import ChatSidebar from "../components/ChatSidebar";
import StatusList from "../components/StatusList";
import BottomNavBar from "../components/BottomNavBar"; // Import the new component

export default function Home({ selectedMsg, setSelectedMsg }) {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeWaId, setActiveWaId] = useState(null);
  const [activeContactName, setActiveContactName] = useState("");
  const [active, setActive] = useState("messages");
  const [chatListWidth, setChatListWidth] = useState("100%"); // Initial width in px
  const [isDragging, setIsDragging] = useState(false);
  const [statusListWidth, setStatusListWidth] = useState("100%"); // Initial width for status list
  const [isStatusDragging, setIsStatusDragging] = useState(false);
  const socket = useSocket();
  const myNumber = import.meta.env.VITE_MY_WA_NUMBER;
  const dividerRef = useRef(null);
  const statusDividerRef = useRef(null); // New ref for status divider
  const [bottomNavBarActive, setBottomNavBarActive] = useState(true)

  const loadChats = async () => {
    const data = await getChats();
    setChats(data);
    selectChat(data[0]._id)
  };

  const selectChat = async (wa_id) => {
    setActiveWaId(wa_id);
    const contact = chats.find((c) => c._id === wa_id);
    setActiveContactName(contact ? contact.name : "");
    const { data } = await getMessages(wa_id);
    setMessages(data);
  };


  const handleBackToChatList = () => {
    setActiveWaId(null);
  };

  useEffect(() => {
    loadChats();
  }, []);

  useEffect(() => {
    if (active === "messages") {
      setChatListWidth("100%"); // Reset chat list width when returning to messages tab
    }
    if (active === "statuses") {
      setActiveWaId(null);
    }
  }, [active]);

  useEffect(() => {
    if (!socket) return;

    socket.on("new_message", (msg) => {
      loadChats();
      if (msg.wa_id === activeWaId) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    socket.on("status_update", (update) => {
      setMessages((prev) =>
        prev.map((m) =>
          m.meta_msg_id === update.meta_msg_id
            ? {
                ...m,
                status: update.status,
                status_timestamp: update.status_timestamp,
              }
            : m
        )
      );
    });

    return () => {
      socket.off("new_message");
      socket.off("status_update");
    };
  }, [socket, activeWaId]);

 // Dragging logic for ChatList
useEffect(() => {
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setChatListWidth(e.clientX); // No min/max checks, free drag
  };

  const handleMouseUp = () => setIsDragging(false);

  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", handleMouseUp);

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };
}, [isDragging]);


// Dragging logic for StatusList
useEffect(() => {
  const handleMouseMove = (e) => {
    if (!isStatusDragging) return;
    setStatusListWidth(e.clientX); // No min/max checks, free drag
  };

  const handleMouseUp = () => setIsStatusDragging(false);

  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", handleMouseUp);

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };
}, [isStatusDragging]);



  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden"> {/* Added flex-col and md:flex-row */}
      <ChatSidebar active={active} setActive={setActive} selectChat={selectChat} chats={chats} className="hidden md:flex"/> {/* Added className */}

      {active === "messages" ? (
        <>
         {/* Chat List */}
<div
  style={{ width: `${chatListWidth}px` }}
  className={`md:block ${activeWaId ? 'hidden' : 'block'} ${activeWaId ? '' : 'flex-1'}`} // Hide on mobile when chat is active, otherwise full width. Remove flex-1 on desktop when chatlist is visible
>
  <ChatList
    chats={chats}
    onSelect={selectChat}
    activeWaId={activeWaId}
    myNumber={myNumber}
    setActiveContactName={setActiveContactName}
    setBottomNavBarActive={setBottomNavBarActive}
  />
</div>

{/* Divider */}
<div
  ref={dividerRef}
  onMouseDown={() => setIsDragging(true)}
  className="w-1 bg-gray-300 cursor-col-resize hover:bg-gray-400 hidden md:block" // Hide on mobile, show on desktop
  style={{ userSelect: "none" }} // prevent text selection while dragging
/>

          {activeWaId ? (
            <div className="flex flex-col flex-1">
              <ChatWindow
                selectedMsg={selectedMsg}
                setSelectedMsg={setSelectedMsg}
                messages={messages}
                contactName={activeContactName}
                myNumber={myNumber}
                activeWaId={activeWaId}
                onBack={handleBackToChatList} // Pass the onBack function
              />
             
            </div>
          ) : (
            <div className="flex-1 items-center justify-center text-gray-500 hidden md:flex"> {/* Hide on mobile when no chat selected */} 
              Select a chat to start

            </div>
          )}
        </>
      ) : active === "statuses" ? (
        <>
         {/* Status List */}
<div
  style={{ width: `${statusListWidth}px` }}
  className={`${activeWaId ? 'hidden' : 'block'} flex-1`} // Show on all screens unless a chat is active
>
  <StatusList statusListWidth={statusListWidth} /> {/* Pass statusListWidth */}
</div>

{/* Divider for Status List - only show on desktop */}
<div
  ref={statusDividerRef}
  onMouseDown={() => setIsStatusDragging(true)}
  className="w-1 bg-gray-300 cursor-col-resize hover:bg-gray-400 hidden md:block"
  style={{ userSelect: "none" }}
/>

        </>
      ) : active === "meta" ? (
        <div className="flex flex-1 items-center justify-center text-gray-500">
          Meta content here
        </div>
      ) : null}
      {bottomNavBarActive && <BottomNavBar active={active} setActive={setActive}  />} {/* Render the new component */}
    </div>
  );
}

