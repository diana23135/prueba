import { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

export function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  function handleRegister(e) {
    e.preventDefault();

    // Validar contraseñas coincidentes
    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }

    // Aquí puedes agregar la lógica para enviar los datos al backend
    setSuccessMessage("Registro exitoso");
    setErrorMessage(null);
  }

  return (
    <div className="login-container">
      <img id="logo" src=".\src\assets\imgs\eccargo.png"></img>
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
        <div className="input-group">
          <label htmlFor="username">Nombre de Usuario</label>
          <input
            type="text"
            id="username"
            placeholder="Ingrese su nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            placeholder="Ingrese su correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <div className="input-group">
          <label htmlFor="confirm-password">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirme su contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <button type="submit">Registrarse</button>

        <div className="register-link">
          <p>
            ¿Ya tienes una cuenta? <Link to="/">Inicia sesión</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
