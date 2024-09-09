import "./Inicio.css";
import { Nav } from "../utils/Nav/Nav";
import { Footer } from "../utils/Footer/Footer";
import { Tareas } from "../Tareas/Tareas";
import { Comentarios } from "../Comentarios/Comentarios";

export function Inicio() {
  return (
    <>
      <header className="hearder">
        <Nav />
      </header>
      <div className="title-butt">
          <h1>Tareas</h1>
          <button>Crear tarea</button>
        </div>
      <main className="main">
        <article>
          <Tareas />
        </article>
        <aside>
          <Comentarios />
        </aside>
      </main>
      <Footer />
    </>
  );
}
