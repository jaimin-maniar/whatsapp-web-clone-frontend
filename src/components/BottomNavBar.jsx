import React from 'react';
import { SiCircle } from "react-icons/si";
import { MdMessage } from "react-icons/md";

export default function BottomNavBar({ active, setActive }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex w-full justify-between p-2 md:hidden">
      <button
        className={`flex text-center flex-col text-xs items-center p-2 ${
          active === 'messages' ? 'bg-green-300 rounded-xl' : 'text-gray-600'
        }`}
        onClick={() => setActive('messages')}
      >
        <MdMessage size={20}/>
        Chats
      </button>
      <button
        className={`flex text-center flex-col text-xs items-center p-2 ${
          active === 'statuses' ? 'bg-green-300 rounded-xl' : 'text-gray-600'
        }`}
        onClick={() => setActive('statuses')}
      >
        <SiCircle size={24}/>
        Updates
      </button>
      <button
        className={`flex text-center flex-col text-xs items-center p-2 ${
          active === 'meta' ? 'bg-green-300 rounded-xl' : 'text-gray-600'
        }`}
        onClick={() => setActive('meta')}
      >
        <img src="https://static.whatsapp.net/rsrc.php/v4/ye/r/W2MDyeo0zkf.png" height={22} width={22} />
        Meta
      </button>
      {/* Add more navigation items here if needed */}
    </div>
  );
}
