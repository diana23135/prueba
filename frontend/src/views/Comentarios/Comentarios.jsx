import React from "react";
import "./Comentarios.css";

export function Comentarios() {
  return (
    <div className="chat-card">
      <h2 className="chat-title">Título del Chat</h2>
      <div className="chat-description">
        Esta es la descripción del chat. Aquí puedes agregar detalles
        importantes.
      </div>

      <div className="chat-comments">
        <div className="comment">
          <p>
            <strong>Usuario 1:</strong> Este es un comentario de ejemplo.
          </p>
        </div>
        <div className="comment">
          <p>
            <strong>Usuario 2:</strong> Este es otro comentario de ejemplo.
          </p>
        </div>
        {/* Más comentarios */}
      </div>

      <div className="chat-input-section">
        <input
          type="text"
          className="chat-input"
          placeholder="Escribe tu comentario..."
        />
        <button className="chat-send-button">Enviar</button>
      </div>
    </div>
  );
}
