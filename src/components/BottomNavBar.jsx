import React from 'react';

export default function BottomNavBar({ active, setActive }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-2 md:hidden">
      <button
        className={`flex-1 text-center py-2 ${
          active === 'messages' ? 'text-blue-600' : 'text-gray-600'
        }`}
        onClick={() => setActive('messages')}
      >
        Chats
      </button>
      <button
        className={`flex-1 text-center py-2 ${
          active === 'statuses' ? 'text-blue-600' : 'text-gray-600'
        }`}
        onClick={() => setActive('statuses')}
      >
        Status
      </button>
      {/* Add more navigation items here if needed */}
    </div>
  );
}
