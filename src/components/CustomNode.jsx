import React from "react";
import { Handle } from "reactflow";
import "../styles/boneco.css"; // Criamos um CSS separado para os bonecos

const CustomNode = ({ data }) => {
  return (
    <div className="boneco">
      <div className="head"></div> {/* Cabeça */}
      <div className="body"></div> {/* Corpo */}
      <div className="arms">
        <div className="arm left"></div> {/* Braço esquerdo */}
        <div className="arm right"></div> {/* Braço direito */}
      </div>
      <div className="legs">
        <div className="leg left"></div> {/* Perna esquerda */}
        <div className="leg right"></div> {/* Perna direita */}
      </div>
      <div className="name-tag">{data.label}</div> {/* Nome do usuário */}
      
      {/* Conectores do React Flow */}
      <Handle type="target" position="top" />
      <Handle type="source" position="bottom" />
    </div>
  );
};

export default CustomNode;
