import { useEffect, useState } from "react";
import "./Login.css";
import { useValidation } from "../../hooks/useValidation";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
export function Login() {
    const [form, setForm] = useState(null);
    const [isLoggedIn, setLoggedIn] = useState(null);
    const navigate = useNavigate();
    
    
    useEffect(()=>{
      
    },[isLoggedIn]);
    
    const { errors,  validationForm } = useValidation();
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((form) => ({
        ...form,
        [name]: value,
      }));
    };
  
    const onSubmit = (form) => {
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
              console.log(data);
              const user = JSON.stringify(data);
              console.log(user)
              localStorage.setItem('myData', user);
              localStorage.setItem('userId', data.id)
              toast.done("autenticado con exito");
              setLoggedIn(true);
              navigate('/inicio');
              
            
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


    const handleSubmit = (e) => {
    e.preventDefault();
    if (!validationForm(form)) {
      
      return;
    }
    onSubmit(form);
  };
  return (
    <>
      <div className="login-container">
        <img id="logo"src=".\src\assets\imgs\eccargo.png"></img>
        <h2>Ingreso</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              name="correo"
              id="username"
              placeholder="Ingrese su correo"
              
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              name="contraseña"
              id="password"
              placeholder="Ingrese su contraseña"
              
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>

        {/* {isLoggedIn && <div>Welcome, {username}!</div>} */}
        <div className="register-link">
            <p>¿No tienes usuario? <a href="./Register">Regístrate</a></p>
          </div>
      </div>
    </>
  );
}
