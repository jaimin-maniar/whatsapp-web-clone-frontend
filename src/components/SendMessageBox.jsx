import { useState, useRef, useEffect } from "react";
import { sendMessage } from "../api/api";
import { IoMdClose } from "react-icons/io";
import {
  MdOutlineEmojiEmotions,
  MdAttachFile,
  MdSend,
  MdMic,
} from "react-icons/md";
import EmojiPicker from "emoji-picker-react";

export default function SendMessageBox({ activeWaId, contactName, myNumber }) {
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);

  const send = async () => {
    if (!text.trim()) return;

    const payload = {
      payload_type: "whatsapp_webhook",
      _id: `local-${Date.now()}`,
      metaData: {
        entry: [
          {
            changes: [
              {
                field: "messages",
                value: {
                  messaging_product: "whatsapp",
                  metadata: {
                    display_phone_number: myNumber.toString(),
                    phone_number_id: "local-phone-number-id",
                  },
                  contacts: [
                    {
                      profile: { name: contactName },
                      wa_id: activeWaId,
                    },
                  ],
                  messages: [
                    {
                      from: myNumber.toString(),
                      id: `wamid.local-${Date.now()}`,
                      timestamp: Math.floor(Date.now() / 1000).toString(),
                      text: { body: text },
                      type: "text",
                    },
                  ],
                },
              },
            ],
          },
        ],
        object: "whatsapp_business_account",
        gs_app_id: "local-simulator",
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        executed: true,
      },
    };

    await sendMessage(payload);
    setText("");
    setShowEmojiPicker(false);
    console.log("Contact name: ", contactName)
  };

  // FIX: updated for new emoji-picker-react API
  const handleEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  };

  // Close emoji picker on Esc key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setShowEmojiPicker(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="relative">
      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-14 left-2 z-50 shadow-lg bg-white rounded-lg">
          <div className="flex justify-end p-1">
            <IoMdClose
              className="text-xl cursor-pointer hover:text-gray-500"
              onClick={() => setShowEmojiPicker(false)}
            />
          </div>
          <EmojiPicker
            onEmojiClick={(emojiData) => handleEmojiClick(emojiData)}
            theme="light"
          />
        </div>
      )}

      {/* Input Area */}
      <div className="flex items-center gap-2 p-3 bg-[#f0f2f5] border-t border-gray-300">
        {/* Emoji Button */}
        <button
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="p-2 text-gray-500 hover:text-gray-700"
        >
          <MdOutlineEmojiEmotions size={24} />
        </button>

        {/* Attachment Button */}
        <button
          onClick={() => fileInputRef.current.click()}
          className="p-2 text-gray-500 hover:text-gray-700 rotate-45"
        >
          <MdAttachFile size={24} />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Input */}
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring focus:ring-green-200 text-sm"
          placeholder="Type a message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />

        {/* Send / Mic Button */}
        <button
          onClick={send}
          className="p-2 text-white bg-green-500 rounded-full hover:bg-green-600 flex items-center justify-center"
        >
          {text.trim() ? <MdSend size={22} /> : <MdMic size={22} />}
        </button>
      </div>
    </div>
  );
}
