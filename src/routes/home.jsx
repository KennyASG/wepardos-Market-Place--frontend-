import React from "react";
import Sidebar from "../components/SideBar/Sidebar";
import Navbar from "../components/NavBar/Navbar";
import MainContent from "../components/MainContent/MainContent";

const Home = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenedor principal */}
      <div className="flex flex-col flex-grow">
        {/* Navbar */}
        <Navbar />
        
        {/* Main Content */}
        <MainContent />
      </div>
    </div>
  );
};

export default Home;
