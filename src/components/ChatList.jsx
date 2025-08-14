import { CiMenuKebab } from "react-icons/ci";
import { MdAddComment } from "react-icons/md";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { IoCheckmarkOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import { useEffect } from "react";
export default function ChatList({ chats, onSelect, activeWaId, myNumber, setActiveContactName }) {
  // Helper function to get message status icon
  const getMessageStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return (
         <IoCheckmarkOutline />
        );
      case 'delivered':
        return (
          <IoCheckmarkDoneOutline />
        );
      case 'read':
        return (
          <IoCheckmarkDoneOutline className="text-blue-400"/>
        );
      default:
        return null;
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    
    // Handle MongoDB date format
    const date = new Date(timestamp.$date || timestamp);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      // Today - show only time
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInDays === 1) {
      // Yesterday
      return 'Yesterday';
    } else if (diffInDays < 7) {
      // Within a week - show day name
      return date.toLocaleDateString([], { weekday: 'long' });
    } else {
      // Older - show date
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  // Helper function to determine if message is outgoing
  const isOutgoingMessage = (chat) => {
    // Assuming your business WhatsApp number is the 'to' field when you send messages
    // and 'from' field when you receive messages
    return chat.from !== myNumber ;
  };

 useEffect(() => { 
  chats.length === 0 ? "No Data Yet" : onSelect(chats[0]._id)
  chats.length === 0 ? "No Data Yet" : setActiveContactName(chats[0].name)
 }, [chats])

  return (
    <div className="bg-white md:border-r md:border-gray-300 overflow-y-auto w-full">
        <div className="flex px-4 h-16 items-center justify-between">
            <p className="text-2xl font-semibold text-green-600">WhatsApp</p>
            <div className="flex gap-x-4">
                <MdAddComment size={22}/>
                <CiMenuKebab size={24} className="hover:bg-gray-200 rounded-full p-1"/>
            </div>
        </div>
      {chats?.map((chat) => {
        const isOutgoing = isOutgoingMessage(chat);
        console.log("CHATTTTT", chat

        )
        
        return (
          <div
            key={chat._id.$oid || chat._id}
            onClick={() => onSelect(chat._id)}
            className={`px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors duration-150 ${
              activeWaId === chat._id ? "bg-gray-100" : ""
            }`}
          >
            <div className="flex items-start space-x-3">
              {/* Profile Avatar */}
              <div className="w-12 h-12 rounded-full flex-shrink-0 overflow-hidden">
                <div className="w-12 h-12 relative   bg-transparent rounded-full border-2 border-green-500 flex items-center justify-center">
                        <div className="bg-purple-200 w-10 h-10 rounded-full flex items-center justify-center">
                            <FaUser />
                        </div>
                    </div>
              </div>
              
              {/* Chat Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-normal text-gray-900 text-base truncate">
                    {chat.name || chat.from || 'Unknown Contact'}
                  </h3>
                  <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                    {formatTime(chat.timestamp)}
                  </span>
                </div>
                
                <div className="flex items-end justify-between">
                  <div className="flex items-center space-x-1 flex-1 min-w-0">
                    {/* Message Status for outgoing messages */}
                    {isOutgoing && getMessageStatusIcon(chat.status)}
                    
                    {/* Message preview */}
                    <p className="text-sm text-gray-600 truncate">
                      {isOutgoing ? 'You: ' : ''}
                      {chat.messageType === 'text' 
                        ? chat.lastMessage
                        : chat.messageType === 'image' 
                        ? '📷 Photo'
                        : chat.messageType === 'document'
                        ? '📄 Document'
                        : chat.messageType === 'audio'
                        ? '🎵 Audio'
                        : chat.messageType === 'video'
                        ? '🎥 Video'
                        : 'Message'
                      }
                    </p>
                  </div>
                  
                  {/* Unread indicator for incoming unread messages */}
                  {!isOutgoing && chat.status !== 'read' && (
                    <div className="bg-green-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] h-4 flex items-center justify-center ml-2 flex-shrink-0">
                      1
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}