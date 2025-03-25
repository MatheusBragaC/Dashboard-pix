import React from "react";
import { Handle } from "reactflow";
import "../styles/boneco.css";

// Tabelas de cores (pixel) para pele e roupa
const skinColors = ["#facc15", "#ef4444", "#10b981", "#8b5cf6"]; // Principais
const skinDarks = ["#caa60f", "#ba3434", "#0b7d5e", "#6b39c6"]; // Tons escuros para padronagem

const bodyColors = ["#3b82f6", "#6d28d9", "#dc2626", "#f97316"];
const bodyDarks = ["#2e66bb", "#4e1ea6", "#a31d1d", "#c75f10"];

const CustomNode = ({ data }) => {
  const idx = data.skinIndex % skinColors.length;
  const skinColor = skinColors[idx];
  const skinDark = skinDarks[idx];
  const bodyColor = bodyColors[idx];
  const bodyDark = bodyDarks[idx];

  // CSS Variables para facilitar o pixel effect
  const styleVars = {
    "--skin": skinColor,
    "--skin-dark": skinDark,
    "--body": bodyColor,
    "--body-dark": bodyDark,
  };

  return (
    <div className="boneco" style={styleVars}>
      {/* Cabeça pixelada */}
      <div className="head"></div>

      {/* Corpo pixelado */}
      <div className="body"></div>

      {/* Braços pixelados */}
      <div className="arms">
        <div className="arm left"></div>
        <div className="arm right"></div>
      </div>

      {/* Pernas pixeladas */}
      <div className="legs">
        <div className="leg left"></div>
        <div className="leg right"></div>
      </div>

      {/* Nome do personagem */}
      <div className="name-tag">{data.label}</div>

      <Handle type="target" position="top" />
      <Handle type="source" position="bottom" />
    </div>
  );
};

export default CustomNode;
