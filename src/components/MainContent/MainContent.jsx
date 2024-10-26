import React from "react";
import Inicio from "../Content/Inicio";
import Carrito from "../Content/Carrito";


const Perfil = () => <div>Información del Perfil</div>;
const Mantenimiento = () => <div>Área de Mantenimiento</div>;

const MainContent = ({ section }) => {
  let content;

  
  switch (section) {
    case "inicio":
      content = <Inicio />;
      break;
    case "carrito":
      content = <Carrito />;
      break;
    case "perfil":
      content = <Perfil />;
      break;
    case "mantenimiento":
      content = <Mantenimiento />;
      break;
    default:
      content = <Inicio />;
  }

  return <div className="p-6 bg-gray-50 flex-grow">{content}</div>;
};

export default MainContent;
