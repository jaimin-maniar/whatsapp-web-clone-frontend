import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { IoCheckmarkOutline } from "react-icons/io5";
export default function MessageBubble({ msg, myNumber, isFirstInGroup, onClick }) {
  const isMine = msg.from === myNumber;

  // Helper function to get message status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return (
          <IoCheckmarkOutline className="h-4 w-4"/>
        );
      case 'delivered':
        return (
          <IoCheckmarkDoneOutline className="h-4 w-4"/>
        );
      case 'read':
        return (
          <IoCheckmarkDoneOutline className="text-blue-500 h-4 w-4"/>
        );
      default:
        return null;
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp.$date || timestamp);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatMessage = (messageBody, messageType) => {
    switch (messageType) {
      case 'image':
        return '📷 Photo';
      case 'document':
        return '📄 Document';
      case 'audio':
        return '🎵 Audio';
      case 'video':
        return '🎥 Video';
      case 'location':
        return '📍 Location';
      case 'contact':
        return '👤 Contact';
      default:
        return messageBody;
    }
  };

  return (
    <div className={`flex mb-1 ${isMine ? "justify-end" : "justify-start"}`}>
      <div onClick={onClick} className={`relative max-w-xs lg:max-w-md px-3 py-2 rounded shadow ${
        isMine 
          ? "bg-[#d9fdd3] text-[#201f11] rounded-br-sm" 
          : "bg-white text-gray-900 rounded-bl-sm shadow-sm"
      }`}>
        {/* Message tail/arrow - only show if first in group */}
        {isFirstInGroup && (
          <div className={`absolute top-0 w-0 h-0 ${
            isMine 
              ? "-right-4 border-l-20 rotate-90 border-l-[#d9fdd3] border-t-20 border-t-transparent z-0 " 
              : "left-0 border-r-8 border-r-white border-t-8 border-t-transparent"
          }`}></div>
        )}

        {/* Message Content */}
        <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {formatMessage(msg.message_body, msg.message_type)}
        </div>

        {/* Time and Status */}
        <div className={`flex items-center justify-end mt-1 text-xs ${
          isMine ? "text-[#201f11]" : "text-gray-500"
        }`}>
          <span className="mr-1">
            {formatTime(msg.timestamp).toLowerCase()}
          </span>
          {isMine && getStatusIcon(msg.status)}
        </div>
      </div>
    </div>
  );
}
