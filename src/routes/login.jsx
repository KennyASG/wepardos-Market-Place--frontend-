import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost/BackendDesarrolloWeb/app/public/index.php/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: email,
          clave: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Error en la autenticación");
      }

      const data = await response.json();
      console.log("Respuesta de la API:", data);

      localStorage.setItem("token", data.token);

      
      navigate("/home");

    } catch (error) {
      setError("Credenciales incorrectas o error en el servidor");
      console.error("Error:", error);
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-nunito">
      
      
      <div className="absolute top-10 left-10 text-white opacity-10 select-none">
        <img src="./Chetah.svg" alt="Logo" className="w-32 h-32 mb-4 filter-white" />
        <h1 className="text-6xl font-bold">WepardoStore</h1>
      </div>

      <div className="flex bg-gray-100 rounded-2xl shadow-2xl max-w-4xl p-8 space-x-8 transform transition-all hover:scale-105 duration-300 ease-in-out">
        
        <div className="flex items-center justify-center bg-gray-200 rounded-lg w-1/2">
          <div className="w-[20rem] h-[20rem] bg-cover bg-center rounded-lg shadow-lg" style={{ backgroundImage: "url('./e-coomerce.svg')" }}></div>
        </div>
        
        <div className="w-1/2 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Bienvenido de vuelta!</h2>
          <p className="text-sm text-gray-600 mb-6">Por favor ingresa tus credenciales</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-600">Email</label>
              <input 
                type="email" 
                placeholder="ksaenz@gmail.com" 
                className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-500 transition-shadow duration-200 ease-in-out shadow-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-500 transition-shadow duration-200 ease-in-out shadow-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex justify-between items-center">
              <a href="#" className="text-sm text-gray-600 hover:underline">¿Olvidaste tu contraseña?</a>
            </div>
            <button 
              type="submit" 
              className="w-full bg-gray-800 text-white py-3 rounded-lg mt-4 hover:bg-purple-600 transition-all duration-150 ease-in-out shadow-lg"
            >
              Log In
            </button>
          </form>
          
          <p className="text-sm text-center text-gray-600 mt-4">
            ¿Aun no tienes una cuenta? <a href="Register" className="text-purple-600 font-semibold hover:underline">Registrarse</a>
          </p>
        </div>
      </div>

      <footer className="absolute bottom-4 text-gray-300 text-sm">
        © {new Date().getFullYear()} WepardoStore. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Login;
