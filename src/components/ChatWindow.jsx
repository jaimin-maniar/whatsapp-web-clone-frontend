import MessageBubble from "./MessageBubble";
import { FaUser } from "react-icons/fa6";
import SendMessageBox from "./SendMessageBox";

export default function ChatWindow({ messages, contactName, myNumber, setSelectedMsg,  activeWaId, onBack, setBottomNavBarActive }) { // Added onBack prop
  // Find my WA business number from an outgoing message
 
    

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-gray-50 p-4 border-b border-gray-200 flex items-center space-x-3">
        {/* Back Button for Mobile */}
        <button onClick={() => {onBack(); setBottomNavBarActive(true)}} className="md:hidden p-2 mr-2"> {/* Added back button */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
        {/* Profile Picture */}
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <div className="bg-purple-200 w-10 h-10 rounded-full flex items-center justify-center">
              <FaUser />
            </div>
        </div>
        <div className="flex-1">
          <h2 className="font-medium text-gray-900">{contactName || "Unknown Contact"}</h2>
          <p className="text-xs text-gray-500">online</p>
        </div>
        {/* Header Actions */}
        <div className="flex items-center space-x-4 text-gray-500">
          <svg className="w-5 h-5 cursor-pointer hover:text-gray-700" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
          </svg>
          <svg className="w-5 h-5 cursor-pointer hover:text-gray-700" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"/>
          </svg>
        </div>
      </div>

      {/* Messages Container with WhatsApp background */}
      <div
  className="flex-1 overflow-y-auto p-4 space-y-1 relative"
  style={{
    backgroundColor: '#efeae2',
    backgroundImage: `url("https://wallpapercave.com/wp/wp14199731.jpg")`,
    backgroundSize: '497px 729px',
    backgroundRepeat: 'repeat',
  }}
>
  {/* Overlay for opacity */}
  <div className="absolute inset-0 bg-white opacity-10 pointer-events-none"></div>

  {/* Messages */}
  <div className="relative z-10">
    {messages.map((msg, idx) => {
      const prevMsg = messages[idx - 1];
      const isFirstInGroup = !prevMsg || prevMsg.from !== msg.from;
      return (
        <MessageBubble
          onClick={() => {setSelectedMsg(msg)} }
          key={`${msg._id}-${Date.now()}`}
          msg={msg}
          myNumber={myNumber}
          isFirstInGroup={isFirstInGroup}
        />
      );
    })}
  </div>
  
</div>

    
    <SendMessageBox
      activeWaId={activeWaId}
      contactName={contactName}
      myNumber={myNumber}              
    />
    </div>
  );
}