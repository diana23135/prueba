import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Login } from "./views/Login/Login";
import { Register } from "./views/Register/Register"; // Asegúrate de que la ruta sea correcta
import { Inicio } from "./views/Inicio/Inicio";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/inicio" element={<Inicio />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
