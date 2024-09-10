import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import './Tareas.css';
import { DateFormat } from '../../hooks/dateFormat';

export function Tareas({task}) {
    // const deleteTask = (e) => {
    //     e.preventDefault();
        
    //     if (!validationForm(formState)) {
    //       return;
    //     }
        
    //     onSubmitForm(formState);
    //     closeModal();
    //   };
    return (
        <>
            <div className="card" key={task.id}>
                <div className="card-header">
                    <h2 className="card-title">{task.nombre}</h2>
                    <div className="card-actions">
                        <button className="card-action-button"><FaEdit /></button>
                        <button className="card-action-button"><MdDelete /></button>
                    </div>
                </div>
                <p className="card-description">{task.descripcion}</p>
                {<img className="card-image" src="https://via.placeholder.com/150" alt="Imagen de ejemplo" />}
                <DateFormat isoDateString={task.fechaCreacion} />
                
                {task.fechaFinalizacion 
                    ? <DateFormat isoDateString={task.fechaFinalizacion} /> 
                    : <div>Sin fecha de finalización</div>}
                
                <label htmlFor="status1">{task.idEstados}</label>
                <select id="status1" className="card-status">
                    <option value="pendiente"></option>
                    <option value="en-progreso">En Progreso</option>
                    <option value="completado">Completado</option>
                </select>
            </div>
            </> 
         
           
    );
}
