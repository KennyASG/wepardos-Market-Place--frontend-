import React, { useState, useEffect, useRef } from "react";
import { HomeIcon, Squares2X2Icon, ShoppingCartIcon, UserIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openMenu, setOpenMenu] = useState(null); // Estado para rastrear menú abierto ('carrito' o 'perfil')
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const navbarRef = useRef(null);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu); // Abre un menú y cierra los demás
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Detectar clic fuera del Navbar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setOpenMenu(null); // Cerrar todos los menús abiertos
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const calculateTotal = () => cartItems.reduce((total, item) => total + parseFloat(item.precio), 0);

  return (
    <div ref={navbarRef} className="bg-[#FDD700] p-4 shadow-lg rounded-full mx-4 mt-4 mb-6 flex items-center justify-between">
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

        {/* Carrito con menú desplegable */}
        <div className="relative">
          <button
            onClick={() => toggleMenu("carrito")}
            className="text-gray-800 hover:text-gray-900 transform hover:scale-110 transition-transform duration-200"
          >
            <ShoppingCartIcon className="w-6 h-6" />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>
          {openMenu === "carrito" && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg py-4 z-10 max-h-80 overflow-y-auto">
              <h3 className="text-lg font-semibold text-center mb-4">Carrito de Compras</h3>
              {cartItems.length === 0 ? (
                <p className="text-center p-4 text-gray-500">Carrito vacío</p>
              ) : (
                <div>
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-2 border-b">
                      <img src={item.imagen} alt={item.descripcion} className="w-12 h-12 rounded-md" />
                      <div className="flex-1 mx-2">
                        <span className="block text-gray-800 font-medium">{item.descripcion}</span>
                        <span className="block text-gray-500">Q{item.precio}</span>
                      </div>
                      <button onClick={() => removeFromCart(item.id)}>
                        <TrashIcon className="w-5 h-5 text-red-500 hover:text-red-700" />
                      </button>
                    </div>
                  ))}
                  <div className="p-4 border-t">
                    <p className="text-right font-semibold text-gray-700">
                      Total: <span className="text-lg">Q{calculateTotal()}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Perfil con menú desplegable */}
        <div className="relative">
          <button
            className="text-gray-800 hover:text-gray-900 transform hover:scale-110 transition-transform duration-200"
            onClick={() => toggleMenu("perfil")}
          >
            <UserIcon className="w-6 h-6" />
          </button>
          {openMenu === "perfil" && (
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
