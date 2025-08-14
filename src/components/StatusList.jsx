import React, { useState } from "react";
import { ResizableBox } from "react-resizable";
import { FaUser } from "react-icons/fa6";
import "react-resizable/css/styles.css";

const StatusList = ({ statusListWidth }) => {
  const [statuses] = useState([
    { id: 1, name: "My status", time: "Click to add status update", img: <FaUser />, myStatus: true },
    { id: 2, name: "Neha Joshi", time: "Today at 8:36 pm", img: <FaUser /> },
    { id: 3, name: "Ravi Kumar", time: "Today at 8:32 pm", img: <FaUser /> },
    { id: 4, name: "Harry The Coder", time: "Today at 7:59 pm", img: <FaUser /> },
  ]);

  const StatusItem = ({ status }) => (
    <div
      key={status.id}
      className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
    >
      <div className="w-12 h-12 relative bg-transparent rounded-full border-2 border-green-500 flex items-center justify-center">
        <div className="bg-purple-200 w-10 h-10 rounded-full flex items-center justify-center">
          {status.img}
        </div>
      </div>
      <div>
        <div className="font-medium">{status.name}</div>
        <div className="text-sm text-gray-500">{status.time}</div>
      </div>
    </div>
  );

  return (
    <div className="h-full flex">
      {/* Desktop: Resizable */}
      <ResizableBox
        className="bg-white border-r border-gray-300 hidden md:flex flex-col h-full"
        width={statusListWidth}
        height={Infinity}
        axis="x"
        minConstraints={[200, Infinity]}
        maxConstraints={[500, Infinity]}
        resizeHandles={["e"]}
      >
        <div className="p-4 border-b border-gray-300 text-lg font-semibold">
          Status
        </div>
        <div className="flex-1 overflow-y-auto">
          {statuses.filter(s => s.myStatus).map(status => (
            <StatusItem key={status.id} status={status} />
          ))}
          <div className="p-3 text-sm text-gray-500">Recent</div>
          {statuses.filter(s => !s.myStatus).map(status => (
            <StatusItem key={status.id} status={status} />
          ))}
        </div>
      </ResizableBox>

      {/* Mobile: Fixed Width */}
      <div className="bg-white border-r border-gray-300 flex md:hidden flex-col h-full w-full">
        <div className="p-4 border-b border-gray-300 text-lg font-semibold">
          Status
        </div>
        <div className="flex-1 overflow-y-auto">
          {statuses.filter(s => s.myStatus).map(status => (
            <StatusItem key={status.id} status={status} />
          ))}
          <div className="p-3 text-sm text-gray-500">Recent</div>
          {statuses.filter(s => !s.myStatus).map(status => (
            <StatusItem key={status.id} status={status} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatusList;
