import React, { useRef, useState, useEffect } from "react";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { FaPaperclip } from "react-icons/fa";
import "./Tareas.css";
import { DateFormat } from "../../hooks/dateFormat";

export function Tareas({ images, task, states, onDeleteRow, onEditRow, onFileLoad }) {
  // Manejo del select
  const handleSelectChange = (event) => {
    task.idEstados = parseInt(event.target.value, 10);
  };

  // Referencia para el input de archivos
  const fileInputRef = useRef(null);

  // Simula el clic en el input de archivo cuando se hace clic en el ícono
  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  // Maneja el cambio del archivo seleccionado
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    if (!file) {
      alert('Por favor selecciona un archivo.');
      return;
    }

    reader.onloadend = function() {
      const base64String = reader.result.split(',')[1];
      const fileName = file.name;
      console.log(base64String);
      console.log(fileName); // Muestra el Base64 en la consola

      // Llama a onFileLoad con el base64String
      onFileLoad(task.id, task.idUsuario, base64String, fileName);
    };

    reader.readAsDataURL(file);
  };

  const [base64Image, setBase64Image] = useState(null);

  useEffect(() => {
    
    console.log("objeto imagenes", images)
    // Encuentra la cadena base64 asociada al idTarea
    const base64Input = images.find((value) => value.dataValues.idTarea === task.id)?.base64;
    if (base64Input) {
      // Establece la cadena base64 en el estado
      setBase64Image(`data:image/jpeg;base64,${base64Input}`); // Usa el tipo MIME correcto
    } else {
      setBase64Image(null); // Limpia la imagen si no se encuentra base64
    }
  }, [images, task.id]); // Dependencias para actualizar cuando cambien images o task.id

  return (
    <div className="card">
      <div className="card-container">
        <h3 className="card-title">{`# ${task.id}`}</h3>
        <div className="actions">
          <BsFillPencilFill onClick={() => onEditRow(task)} className="icon pencil" />
          <BsFillTrashFill onClick={() => onDeleteRow(task.id)} className="delete-btn" />
          <FaPaperclip onClick={handleIconClick} className="icon attach" />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept=".png, .jpg"
          />
        </div>
      </div>
      <h3 className="card-title">{task.nombre}</h3>
      <p className="card-description">{`descripción: ${task.descripcion}`}</p>
      {base64Image && <img src={base64Image} alt="Imagen convertida de Base64"  width="400px"/>}
      <div>fecha creación:</div>
      <DateFormat isoDateString={task.fechaCreacion} />
      <div>fecha finalización:</div>
      {task.fechaFinalizacion ? (
        <DateFormat isoDateString={task.fechaFinalizacion} />
      ) : (
        <div>Sin fecha de finalización</div>
      )}
      <label htmlFor="status1">
        {states
          ? `Estado: ${states.find((value) => value.id === task.idEstados)?.nombreEstados || "Estado no encontrado"}`
          : "No se ha podido cargar el estado"}
      </label>
      <select id="status1" className="card-status" onChange={handleSelectChange}>
        {states ? states.map((value) => (
          <option key={value.id} value={value.id}>{value.nombreEstados}</option>
        )) : null}
      </select>
    </div>
  );
}
