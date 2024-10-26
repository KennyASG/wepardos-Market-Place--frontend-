import React from "react";
import Inicio from "../Content/Inicio";
import Carrito from "../Content/Carrito";
import Mantenimiento from "../Content/Mantenimiento";
import MiPerfil from "../Content/MiPerfil";


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
      content = <MiPerfil />;
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
