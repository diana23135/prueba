import {  useState } from "react";
import "./Login.css";
import { useValidation } from "../../hooks/useValidation";
import { useNavigate } from "react-router-dom";

export function Login({onLogin}) {
    const [form, setForm] = useState(null);
    const navigate = useNavigate();
    
    const { errors,  validationForm } = useValidation();
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((form) => ({
        ...form,
        [name]: value,
      }));
    };
  
   

    const handleSubmit = (e) => {
    e.preventDefault();
    if (!validationForm(form)) {
      
      return;
    }
    onLogin(form, navigate);
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
