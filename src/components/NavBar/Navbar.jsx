import React from "react";

const Navbar = () => {
  return (
    <div className="bg-gray-100 p-4 shadow-md flex items-center justify-between">
      <h2 className="text-xl font-semibold">WepardoStore</h2>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-gray-800">Notificaciones</button>
        <button className="text-gray-600 hover:text-gray-800">Perfil</button>
      </div>
    </div>
  );
};

export default Navbar;
