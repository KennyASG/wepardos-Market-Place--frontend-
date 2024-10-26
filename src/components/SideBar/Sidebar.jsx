import React from "react";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white flex-shrink-0 p-4">
      <h2 className="text-2xl font-bold mb-6">Sidebar</h2>
      <ul>
        <li className="mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded">Dashboard</li>
        <li className="mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded">Settings</li>
        <li className="mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded">Profile</li>
        <li className="mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded">Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
