import { useState } from "react";
import "./Login.css";

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function handleLogin(){
        setErrorMessage ("se envio el formulario");
    }
  return (
    <>
      <div className="login-container">
        <img id="logo"src=".\src\assets\imgs\eccargo.png"></img>
        <h2>Ingreso</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              placeholder="Ingrese su correo"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <button type="submit">Login</button>
        </form>

        {isLoggedIn && <div>Welcome, {username}!</div>}
        <div className="register-link">
            <p>¿No tienes usuario? <a href="./Register">Regístrate</a></p>
          </div>
      </div>
    </>
  );
}
