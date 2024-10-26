import React, { useState, useEffect } from "react";
import { HomeIcon, Squares2X2Icon, ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasItemsInCart, setHasItemsInCart] = useState(false); // Estado para el punto de notificación en el carrito
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);  // Enviar la consulta de búsqueda al componente principal
  };

  const handleLogout = () => {
    // Limpiar el localStorage y redirigir al login
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    // Verificar si hay elementos en el carrito al cargar el componente
    const cart = JSON.parse(localStorage.getItem("cart"));
    setHasItemsInCart(cart && cart.length > 0);
  }, []);

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
      <div className="flex items-center space-x-6 mr-6 relative">
        <button className="text-gray-800 hover:text-gray-900 transform hover:scale-110 transition-transform duration-200">
          <HomeIcon className="w-6 h-6" />
        </button>
        <button className="text-gray-800 hover:text-gray-900 transform hover:scale-110 transition-transform duration-200">
          <Squares2X2Icon className="w-6 h-6" />
        </button>

        {/* Icono del Carrito con Punto de Notificación */}
        <div className="relative">
          <button className="text-gray-800 hover:text-gray-900 transform hover:scale-110 transition-transform duration-200">
            <ShoppingCartIcon className="w-6 h-6" />
          </button>
          {hasItemsInCart && (
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500" />
          )}
        </div>

        {/* Perfil con menú desplegable */}
        <div className="relative">
          <button
            className="text-gray-800 hover:text-gray-900 transform hover:scale-110 transition-transform duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <UserIcon className="w-6 h-6" />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-2 z-10">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
