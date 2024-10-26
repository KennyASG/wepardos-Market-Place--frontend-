import React, { useState } from "react";
import { HomeIcon, Squares2X2Icon, ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";

const Navbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);  // Enviar la consulta de búsqueda al componente principal
  };

  return (
    <div className="bg-[#FDD700] p-4 shadow-lg rounded-full mx-4 mt-4 mb-6 flex items-center justify-between">
      {/* Logo y Título */}
      <div className="flex items-center ml-6 space-x-2">
        <img src="./Chetah.svg" alt="Logo" className="w-8 h-8" />
        <h2 className="text-gray-900 text-2xl font-semibold">WepardoStore</h2>
      </div>

      {/* Buscador */}
      <div className="flex-grow mx-6">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>

      {/* Iconos de Navegación */}
      <div className="flex items-center space-x-6 mr-6">
        <button className="text-gray-800 hover:text-gray-900 transform hover:scale-110 transition-transform duration-200">
          <HomeIcon className="w-6 h-6" />
        </button>
        <button className="text-gray-800 hover:text-gray-900 transform hover:scale-110 transition-transform duration-200">
          <Squares2X2Icon className="w-6 h-6" />
        </button>
        <button className="text-gray-800 hover:text-gray-900 transform hover:scale-110 transition-transform duration-200">
          <ShoppingCartIcon className="w-6 h-6" />
        </button>
        <button className="text-gray-800 hover:text-gray-900 transform hover:scale-110 transition-transform duration-200">
          <UserIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
