import React, { useEffect, useState } from "react";

const Inicio = () => {
  const [productos, setProductos] = useState([]);
  const [notification, setNotification] = useState(""); // Estado para la notificación

  // Obtener los productos desde la API
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost/BackendDesarrolloWeb/app/public/index.php/api/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProductos();
  }, []);

  // Agregar producto al carrito y mostrar notificación
  const addToCart = (producto) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(producto);
    localStorage.setItem("cart", JSON.stringify(cart));

    // Mostrar notificación y ocultarla después de 3 segundos
    setNotification(`${producto.descripcion} ha sido agregado al carrito`);
    setTimeout(() => setNotification(""), 3000);
  };

  return (
    <div className="p-6 bg-gray-100">
      {/* Notificación */}
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg transition-opacity duration-300">
          {notification}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos.map((producto) => (
          <div key={producto.id} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-200">
            <img src={producto.imagen} alt={producto.descripcion} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{producto.descripcion}</h2>
              <p className="text-gray-700 font-medium">Precio: Q{producto.precio}</p>
              <button
                onClick={() => addToCart(producto)}
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-150"
              >
                Agregar al Carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inicio;
