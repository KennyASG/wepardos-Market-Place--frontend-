import React, {useState} from "react";
import Sidebar from "../components/SideBar/Sidebar";
import Navbar from "../components/NavBar/Navbar";
import MainContent from "../components/MainContent/MainContent";

const Home = () => {
  // Estado para rastrear la sección seleccionada
  const [selectedSection, setSelectedSection] = useState("inicio");

  return (
    <div className="flex h-screen">
      <Sidebar onSelectSection={setSelectedSection} /> 
      <div className="flex flex-col flex-grow">
        <Navbar />
        <MainContent section={selectedSection} /> 
      </div>
    </div>
  );
};

export default Home;
