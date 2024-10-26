import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {BrowserRouter as Router,Routes,Route,} from "react-router-dom";
import "./index.css";
import Home from "./routes/home";
import Login from "./routes/login";
import Register from "./routes/Register";
//import PrivateRoute from "./components/PrivateRoute"; 
//<Route element={<PrivateRoute />}>
//</Route>


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />}/>
        
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
