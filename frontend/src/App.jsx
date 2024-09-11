import { BrowserRouter as Router, Route, Routes, useNavigate  } from "react-router-dom";

import { Login } from "./views/Login/Login";
import { Register } from "./views/Register/Register"; // Asegúrate de que la ruta sea correcta
import { Inicio } from "./views/Inicio/Inicio";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./views/Protected/Protected";

import { useState } from "react";
function App() {
  
  
  const isAuthenticated =  !!localStorage.getItem('userId');
  
  const onSubmit = (form, navigate) => {
    fetch("http://localhost:3001/usuarios/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Especifica el tipo de contenido para JSON
      },
      body: JSON.stringify(form),
    })
    .then((response) => response.json())
      .then((data) => 
        {
          
          if (data.id){
            
            const user = JSON.stringify(data);
            
            localStorage.setItem('myData', user);
            localStorage.setItem('userId', data.id)
            toast.success("autenticado con exito");
            
            navigate("/inicio");
            
          
        }
        else {
          throw new Error(data.error);
        }
      }
        )
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      }
       
      
      );
  };


  return (
    <>
      <ToastContainer />
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Login onLogin={onSubmit}/>} />
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
