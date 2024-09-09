import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './views/Login/Login';
import { Register } from './views/Register/Register'; // Asegúrate de que la ruta sea correcta
import { Inicio } from './views/Inicio/Inicio';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/inicio" element={<Inicio/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
