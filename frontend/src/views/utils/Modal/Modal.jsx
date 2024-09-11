import { useValidation } from "../../../hooks/useValidation";
import "./Modal.css";
import { useState } from "react";


export function Modal({ onSubmitForm, defaultValue, closeModal }) {
  const [formState, setFormState] = useState(defaultValue);
  const { errors, validationForm } = useValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validationForm(formState)) {
      return;
    }
    
    onSubmitForm(formState);
    closeModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.classList.contains("modal-container")) {
          closeModal();
        }
      }}
    >
      <div className="modal">
        <h1>Insertar datos</h1>
        <form onSubmit={handleSubmit}>
          {Object.keys(formState).map((key) => (
            key === 'id' || key === 'idEstados' ? null : 
            
            <div className="form-group" key={key}>
              <label htmlFor={key}>{key}</label>
              <input
                type={key === 'fechaFinalizacion' ? "date" :"text"}
                id={key}
                name={key}
                onChange={handleChange}
                value={formState[key] || ""}
                aria-invalid={errors[key] ? "true" : "false"}
              />
              
            </div>
          ))}
          <span>{errors}</span>
          <button type="submit" className="btn">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
