import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Login } from "./views/Login/Login";
import { Register } from "./views/Register/Register"; // Asegúrate de que la ruta sea correcta
import { Inicio } from "./views/Inicio/Inicio";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./views/Protected/Protected";

function App() {
  const isAuthenticated = !!localStorage.getItem('userId');
  return (
    <>
      <ToastContainer />
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute condition={isAuthenticated} redirectTo="/" />}>
            <Route path="/inicio" element={<Inicio />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
