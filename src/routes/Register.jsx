import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    nit: "",
    telefono: "",
    correo: "",
    clave: ""
  });
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, clave: value });
    setPasswordValidations({
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number: /[0-9]/.test(value),
      specialChar: /[!@#$%^&*]/.test(value),
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!Object.values(passwordValidations).every(Boolean)) {
      setError("La contraseña no cumple con los requisitos");
      return;
    }
    try {
      const response = await fetch("http://localhost/BackendDesarrolloWeb/app/public/index.php/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error en el registro");
      }

      const data = await response.json();
      console.log("Respuesta de la API:", data);

      setSuccessMessage("¡Usuario registrado exitosamente!");
      setError(null);
      setFormData({
        nombre: "",
        direccion: "",
        nit: "",
        telefono: "",
        correo: "",
        clave: ""
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      setError("Error al registrar usuario. Intenta de nuevo.");
      console.error("Error:", error);
    }
  };

  const allValidationsMet = Object.values(passwordValidations).every(Boolean);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-nunito">
      <div className="absolute top-10 left-10 text-white opacity-10 select-none">
        <img src="./Chetah.svg" alt="Logo" className="w-32 h-32 mb-4 filter-white" />
        <h1 className="text-6xl font-bold">WepardoStore</h1>
      </div>
      <div className="flex flex-col bg-gray-100 rounded-2xl shadow-2xl w-full max-w-lg md:max-w-2xl lg:max-w-3xl p-8 space-y-6 transform transition-all hover:scale-105 duration-300 ease-in-out relative">
        
        <div className="flex flex-col justify-center w-full">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4 text-center">Registrarse</h2>
          <p className="text-sm text-gray-600 mb-6 text-center">Por favor ingresa tus datos</p>
          
          <form onSubmit={handleRegister} className="space-y-4 w-full">
            {["nombre", "direccion", "nit", "telefono", "correo"].map((field) => (
              <div key={field}>
                <label className="block text-sm text-gray-600 capitalize">{field}</label>
                <input
                  type={field === "correo" ? "email" : "text"}
                  name={field}
                  placeholder={`Tu ${field}`}
                  className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-500 transition-shadow duration-200 ease-in-out shadow-sm"
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
            <div>
              <label className="block text-sm text-gray-600">Contraseña</label>
              <input 
                type="password" 
                name="clave"
                placeholder="••••••••" 
                className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-500 transition-shadow duration-200 ease-in-out shadow-sm" 
                value={formData.clave}
                onChange={handlePasswordChange}
                required
              />
              {!allValidationsMet && (
                <ul className="text-sm text-gray-500 mt-2 list-disc pl-5">
                  <li className={passwordValidations.length ? "text-green-500" : "text-red-500"}>Mínimo 8 caracteres</li>
                  <li className={passwordValidations.uppercase ? "text-green-500" : "text-red-500"}>Una letra mayúscula</li>
                  <li className={passwordValidations.lowercase ? "text-green-500" : "text-red-500"}>Una letra minúscula</li>
                  <li className={passwordValidations.number ? "text-green-500" : "text-red-500"}>Un número</li>
                  <li className={passwordValidations.specialChar ? "text-green-500" : "text-red-500"}>Un carácter especial (!@#$%^&*)</li>
                </ul>
              )}
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
            <button className="w-full bg-gray-800 text-white py-3 rounded-lg mt-4 hover:bg-purple-600 transition-all duration-150 ease-in-out shadow-lg">
              Registrar
            </button>
          </form>
          
          <p className="text-sm text-center text-gray-600 mt-4">
            ¿Ya tienes una cuenta? <a href="/login" className="text-purple-600 font-semibold hover:underline">Inicia sesión</a>
          </p>
        </div>
      </div>

      <footer className="absolute bottom-4 text-gray-300 text-sm">
        © {new Date().getFullYear()} WepardoStore. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Register;
