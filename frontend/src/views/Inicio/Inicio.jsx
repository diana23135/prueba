import "./Inicio.css";
import { Nav } from "../utils/Nav/Nav";
import { Footer } from "../utils/Footer/Footer";
import { Tareas } from "../Tareas/Tareas";
import { Comentarios } from "../Comentarios/Comentarios";
import { Modal } from "../utils/Modal/Modal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function Inicio() {
  const [modalOpen, setModalOpen] = useState(false);
  const [createdTask, setCreateTask] = useState(false);
  const [tasks, setTasks] = useState(null);
  const id = localStorage.getItem("userId");
  useEffect(() => {
    fetch(`http://localhost:3001/tareas/?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.length > 0) {
          setTasks(data);
        } else {
          throw new Error(data.error);
        }
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });
  }, [createdTask]);

  const defaultFields = {
    nombre: "",
    descripcion: "",
  };
  const createTask = (form) => {
    const id = localStorage.getItem("userId");
    form.idUsuario = id;
    fetch("http://localhost:3001/tareas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Especifica el tipo de contenido para JSON
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          toast.done(data.message);
          setCreateTask(!createdTask);
          console.log(data);
        } else {
          throw new Error(data.error);
        }
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });
  };

  return (
    <>
      <header className="hearder">
        <Nav />
      </header>
      <div className="title-butt">
        <h1>Tareas</h1>
        {modalOpen && (
          <Modal
            onSubmitForm={createTask}
            defaultValue={defaultFields}
            closeModal={() => {
              setModalOpen(false);
            }}
          />
        )}
        <button
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Crear tarea
        </button>
      </div>
      <main className="main">
        {
          <article>
            <div className="card-container">
            {tasks
              ? tasks.map((task, index) => <Tareas key={index} task={task} />)
              : null}
             </div> 
          </article>
        }

        <aside>
          <Comentarios />
        </aside>
      </main>
      <Footer />
    </>
  );
}
