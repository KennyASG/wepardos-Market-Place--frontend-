import React, { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const Carrito = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.subtotal, 0);
  };

  const handleConfirmOrder = async () => {
    const idUsuario = localStorage.getItem("idUsuario");
    const fecha = new Date().toISOString(); // Formato de fecha y hora actual
    const total = calculateTotal();

    // Formatear productos en el carrito
    const productos = cartItems.map((item) => ({
      cantidad: item.cantidad,
      subtotal: item.subtotal,
      idProducto: item.id,
    }));

    // Crear el payload para la orden
    const orderData = {
      fecha,
      total,
      idUsuario: parseInt(idUsuario, 10),
      productos,
    };

    try {
      const response = await fetch("http://localhost/BackendDesarrolloWeb/app/public/index.php/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert("¡Orden confirmada! Gracias por tu compra.");
        localStorage.removeItem("cart");
        setCartItems([]);
        navigate("/home");
      } else {
        throw new Error("Error al confirmar la orden");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema al confirmar la orden.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Carrito de Compras</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-lg">Tu carrito está vacío.</p>
      ) : (
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-gray-800">
                <th className="py-3">Producto</th>
                <th className="py-3">Precio</th>
                <th className="py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-100">
                  <td className="py-4 flex items-center">
                    <img src={item.imagen} alt={item.descripcion} className="w-12 h-12 rounded-md mr-4" />
                    <span className="text-gray-800">{item.descripcion}</span>
                  </td>
                  <td className="py-4 text-gray-700">Q{item.precio}</td>
                  <td className="py-4">
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end items-center mt-6">
            <p className="text-xl font-semibold text-gray-800 mr-4">
              Total: <span className="text-2xl">Q{calculateTotal()}</span>
            </p>
            <button
              onClick={handleConfirmOrder}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-150"
            >
              Confirmar Orden
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;
