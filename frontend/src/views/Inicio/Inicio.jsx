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
  const [createdTask, setCreatedTask] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [states, setStates] = useState([]);
  const [images, setImages] = useState([]);
  const id = localStorage.getItem("userId");

  useEffect(() => {
    fetch(`http://localhost:3001/tareas/?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        
        if (Array.isArray(data)) {
          const sortedTasks = data.sort((a, b) => a.id - b.id);
          setTasks(sortedTasks);
        } else {
          throw new Error(data.error || "Error al obtener tareas");
        }
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });


      fetch(`http://localhost:3001/estados/get-all`)
      .then((response) => response.json())
      .then((data) => {
        
        if (Array.isArray(data)) {
          setStates(data);
        } else {
          throw new Error(data.error || "Error al obtener estados");
        }
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });

      
      fetch(`http://localhost:3001/imagenes/get-all?idUser=${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (Array.isArray(data)) {
          setImages(data);
        } else {
          throw new Error(data);
        }
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });


  }, [createdTask, deleteTask]);

  const defaultFields = {
    nombre: "",
    descripcion: "",
  };

  const createTask = (form) => {
    console.log('editar',form);
    const id = localStorage.getItem("userId");
    
    form.idUsuario = id;
    const id_param = rowToEdit === null ?"":`?id=${rowToEdit.id}`
    fetch("http://localhost:3001/tareas"+id_param, {
      method: rowToEdit === null ? "POST": "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message) {
          toast.success(data.message);
          setCreatedTask(!createdTask);
        } else {
          throw new Error(data.error || "Error al crear tarea");
        }
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });
  };

  const onDeleteRow = (taskId) => {
    fetch(`http://localhost:3001/tareas?id=${taskId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setDeleteTask(!deleteTask);
          toast.success(data.message);
        } else {
          throw new Error(data.error || "Error al eliminar tarea");
        }
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });
  };

  const onEditRow = (task) => {
    console.log(task);
    const camposedit = ["nombre", "descripcion", "fechaFinalizacion", "id", "idEstados"];
    const newBody = camposedit.reduce((acc, el) => {
      acc[el] = task[el];
      return acc;
      }, {});

    setRowToEdit(newBody);
    setModalOpen(true);
    // Implementa la lógica de edición aquí
    // 
  };


  const onFileLoad = (id, idUser, base64String, fileName)=> {
    const body = {
      idTarea:id, 
      fileBase64:base64String,
      nombreImagen:fileName,
      idUser: idUser
    }
    fetch("http://localhost:3001/imagenes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message) {
          toast.success(data.message);
          setCreatedTask(!createdTask);
        } else {
          throw new Error(data.error || "Error al crear tarea");
        }
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });
    
  }
  return (
    <>
      <header className="header">
        <Nav />
      </header>
      <div className="title-butt">
        <h1>Tareas</h1>
        {modalOpen && (
          <Modal
            onSubmitForm={createTask}
            defaultValue={rowToEdit ? rowToEdit : defaultFields}
            closeModal={() => setModalOpen(false)}
          />
        )}
        <button
          onClick={() => {setRowToEdit(null); setModalOpen(true)}}
        >
          Crear tarea
        </button>
      </div>
      <main className="main">
        <article>
          <div className="card-container">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <Tareas
                  onFileLoad={onFileLoad}
                  onDeleteRow={onDeleteRow}
                  onEditRow={onEditRow}
                  key={task.id}
                  task={task}
                  images={images}
                  states={states}
                />
              ))
            ) : (
              <p>No hay tareas</p>
            )}
          </div>
        </article>
        <aside>
          <Comentarios />
        </aside>
      </main>
      {/* <Footer /> */}
    </>
  );
}
