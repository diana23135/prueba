
import './Nav.css';
import icon from '../../../assets/imgs/eccargo.png'; // Ajusta la ruta según tu estructura

export function Nav() {
  return (
    <nav className="nav-content">
      <div className="elements">
        <div className="icon">
          <a href="index.html">
            <img src={icon} alt="Icono Fundación" width="50" height="50" />
          </a>
        </div>
        <ul>
          <li><a href="index.html">Inicio</a></li>
          <li><a href="about.html">Sobre Nosotros</a></li>
          {/* Añade más elementos de lista según sea necesario */}
        </ul>
      </div>
    </nav>
  );
}
