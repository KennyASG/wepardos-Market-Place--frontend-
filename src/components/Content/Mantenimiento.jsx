import React, { useState, useEffect } from "react";
import Notification from "./Notification";

const Mantenimiento = () => {
  const [productos, setProductos] = useState([]);
  const [newProduct, setNewProduct] = useState({ descripcion: "", precio: "", imagen: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [notification, setNotification] = useState(null); // Estado para la notificación

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost/BackendDesarrolloWeb/app/public/index.php/api/products", {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const startEditing = (producto) => {
    setIsEditing(true);
    setCurrentProduct(producto);
    setNewProduct({ descripcion: producto.descripcion, precio: producto.precio, imagen: producto.imagen });
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setCurrentProduct(null);
    setNewProduct({ descripcion: "", precio: "", imagen: "" });
  };

  const updateProduct = async () => {
    if (!currentProduct) return;

    const token = localStorage.getItem("token");
    const id_producto = currentProduct.id;
    const updateData = { precio: parseFloat(newProduct.precio) };

    try {
      const response = await fetch(`http://localhost/BackendDesarrolloWeb/app/public/index.php/api/product?id_producto=${id_producto}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        const updatedProductos = productos.map((producto) =>
          producto.id === id_producto ? { ...producto, precio: newProduct.precio } : producto
        );
        setProductos(updatedProductos);
        cancelEditing();
        setNotification({ message: "Producto actualizado exitosamente.", type: "success" });
      } else {
        throw new Error("Error al actualizar el producto");
      }
    } catch (error) {
      console.error("Error:", error);
      setNotification({ message: "Hubo un problema al actualizar el producto.", type: "error" });
    }
  };

  const deleteProduct = async (id_producto) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost/BackendDesarrolloWeb/app/public/index.php/api/product?id_producto=${id_producto}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const updatedProductos = productos.filter((producto) => producto.id !== id_producto);
        setProductos(updatedProductos);
        setNotification({ message: "Producto eliminado exitosamente.", type: "success" });
      } else {
        throw new Error("Error al eliminar el producto");
      }
    } catch (error) {
      console.error("Error:", error);
      setNotification({ message: "Hubo un problema al eliminar el producto.", type: "error" });
    }
  };

  const createProduct = async () => {
    const token = localStorage.getItem("token");
    const newProductData = {
      descripcion: newProduct.descripcion,
      precio: parseFloat(newProduct.precio),
      imagen: newProduct.imagen,
    };

    try {
      const response = await fetch("http://localhost/BackendDesarrolloWeb/app/public/index.php/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProductData),
      });

      if (response.ok) {
        const createdProduct = await response.json();
        setProductos([...productos, createdProduct]);
        setNewProduct({ descripcion: "", precio: "", imagen: "" });
        setNotification({ message: "Producto creado exitosamente.", type: "success" });
      } else {
        throw new Error("Error al crear el producto");
      }
    } catch (error) {
      console.error("Error:", error);
      setNotification({ message: "Hubo un problema al crear el producto.", type: "error" });
    }
  };

  return (
    <div className="p-6 bg-gray-100 h-[80vh] flex flex-col items-center font-nunito">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Mantenimiento de Productos</h1>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="flex flex-col lg:flex-row lg:space-x-8 w-full max-w-6xl">
        <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-lg p-6 mb-8 lg:mb-0">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{isEditing ? "Editar Producto" : "Crear Producto"}</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600">Descripción</label>
              <input
                type="text"
                name="descripcion"
                value={newProduct.descripcion}
                onChange={handleInputChange}
                className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-500 transition-shadow duration-200 ease-in-out shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Precio</label>
              <input
                type="number"
                name="precio"
                value={newProduct.precio}
                onChange={handleInputChange}
                className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-500 transition-shadow duration-200 ease-in-out shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Imagen (URL)</label>
              <input
                type="text"
                name="imagen"
                value={newProduct.imagen}
                onChange={handleInputChange}
                className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-500 transition-shadow duration-200 ease-in-out shadow-sm"
              />
            </div>
            <div className="flex justify-end space-x-4">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={cancelEditing}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-150"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={updateProduct}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-150"
                  >
                    Actualizar
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={createProduct}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-150"
                >
                  Crear
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-lg p-6 overflow-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Lista de Productos</h2>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-gray-800">
                <th className="py-3">Imagen</th>
                <th className="py-3">Descripción</th>
                <th className="py-3">Precio</th>
                <th className="py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id} className="border-b hover:bg-gray-100">
                  <td className="py-4">
                    <img src={producto.imagen} alt={producto.descripcion} className="w-12 h-12 rounded-md" />
                  </td>
                  <td className="py-4 text-gray-800">{producto.descripcion}</td>
                  <td className="py-4 text-gray-700">Q{producto.precio}</td>
                  <td className="py-4 flex space-x-2">
                    <button
                      onClick={() => startEditing(producto)}
                      className="px-4 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-150"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteProduct(producto.id)}
                      className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-150"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Mantenimiento;
