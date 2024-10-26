import React, { useEffect, useState } from "react";

const MiPerfil = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const id_usuario = localStorage.getItem("id_usuario"); 
        const response = await fetch(`http://localhost/BackendDesarrolloWeb/app/public/index.php/api/order?id_usuario=${id_usuario}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener el historial de órdenes.");
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error:", error);
        setError("Hubo un problema al obtener el historial de órdenes.");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6 bg-gray-100 h[80vh]">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Historial de Órdenes</h1>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.pedido_id} className="bg-white shadow-lg rounded-lg mb-6 p-4">
            <h2 className="text-xl font-semibold text-gray-800">Pedido ID: {order.pedido_id}</h2>
            <p className="text-gray-600">Fecha: {order.fecha}</p>
            <p className="text-gray-600 font-semibold">Total: Q{order.total}</p>

            <h3 className="mt-4 font-semibold text-gray-800">Productos</h3>
            <div className="mt-2">
              {order.productos.map((producto) => (
                <div key={producto.id_producto} className="flex items-center border-b border-gray-200 py-2">
                  <img
                    src={producto.imagen}
                    alt={producto.descripcion}
                    className="w-12 h-12 rounded-md mr-4"
                  />
                  <div className="flex flex-col">
                    <span className="text-gray-800 font-semibold">{producto.descripcion}</span>
                    <span className="text-gray-600">Cantidad: {producto.cantidad}</span>
                    <span className="text-gray-600">Precio Unitario: Q{producto.precio}</span>
                    <span className="text-gray-600">Subtotal: Q{producto.subtotal}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No tienes órdenes registradas.</p>
      )}
    </div>
  );
};

export default MiPerfil;
