// src/components/ChatSidebar.jsx
import { FiSettings } from "react-icons/fi";
import { SiCircle } from "react-icons/si";
import { MdOutlineMessage } from "react-icons/md";
import { MdMessage } from "react-icons/md";
import { FaCircleNotch } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import ChatWindow from "./ChatWindow";

export default function ChatSidebar({active, setActive}) {

const menuItems = [
  { 
    id: "messages", 
    icon: active !== 'messages' 
      ? <MdOutlineMessage size={22} /> 
      : <MdMessage size={22} />, 
    badge: 68 
  },
  { id: "statuses", icon: active !== "statuses" ? <SiCircle size={22} className="text-[#272420]" /> : <FaCircleNotch size={22} className="text-[#272420]"/>, badge: 68 },
  { id: "divider", icon: <div style={{ width: "100%", height: "1px", background: "#ccc" }} /> },
  { id: "meta", icon: <img src="https://static.whatsapp.net/rsrc.php/v4/ye/r/W2MDyeo0zkf.png" height={22} width={22} />, badge: 68 },
];



  return (
   <div className="hidden md:flex flex-col items-center bg-[#f7f5f3] md:text-white md:w-16 md:py-4 md:h-screen justify-between">
  
  {/* Top Section — Menu Items */}
  <div className="flex flex-col justify-evenly">
    {menuItems.map((item) => (
      <div
        key={item.id}
        onClick={() => { setActive(item.id) }}
        className={`relative cursor-pointer w-12 h-12 flex items-center justify-center transition text-[#272420] hover:bg-gray-200 ${
          active === item.id ? "bg-gray-300 rounded-full" : "rounded-xl"
        }`}
      >
        {item.icon}
      </div>
    ))}
  </div>

  {/* Bottom Section — Settings + Profile */}
  <div className="flex flex-col gap-y-4 items-center justify-center">
    <div>
      <FiSettings size={24} className="text-[#272420]" />
    </div>
    <div className="w-10 h-10 rounded-full overflow-hidden flex border-2 border-gray-700 cursor-pointer items-center justify-center bg-purple-200">
      <FaUser className="text-[#272420]" />
    </div>
  </div>

</div>

  );
}
