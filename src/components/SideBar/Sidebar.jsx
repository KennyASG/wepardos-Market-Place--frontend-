import React from "react";
import { HomeIcon, ShoppingCartIcon, UserIcon, CogIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {
  // Lee el rol desde localStorage
  const rol = localStorage.getItem("rol");

  return (
    <div className="w-64 bg-gray-800 text-white p-6 flex flex-col space-y-6 h-full">
      
      <div className="flex justify-center mb-6">
        <img src="./Chetah.svg" alt="Logo" className="w-12 h-12" />
      </div>
      
      <nav className="flex flex-col space-y-4">
        <button className="flex items-center space-x-3 text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200">
          <HomeIcon className="w-6 h-6" />
          <span>Inicio</span>
        </button>
        <button className="flex items-center space-x-3 text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200">
          <ShoppingCartIcon className="w-6 h-6" />
          <span>Carrito</span>
        </button>
        <button className="flex items-center space-x-3 text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200">
          <UserIcon className="w-6 h-6" />
          <span>Mi Perfil</span>
        </button>
        
        {/* Mostrar la opción "Mantenimiento" solo si el rol es 2 (administrador) */}
        {rol === "2" && (
          <button className="flex items-center space-x-3 text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200">
            <CogIcon className="w-6 h-6" />
            <span>Mantenimiento</span>
          </button>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
