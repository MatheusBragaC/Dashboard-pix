import React from "react";
import { Handle } from "reactflow";
import "../styles/boneco.css";

const skinColors = ["#facc15", "#ef4444", "#10b981", "#8b5cf6"]; // Amarelo, vermelho, verde, roxo
const bodyColors = ["#3b82f6", "#6d28d9", "#dc2626", "#f97316"]; // Azul, roxo escuro, vermelho, laranja

const CustomNode = ({ data }) => {
  const skinColor = skinColors[data.skinIndex % skinColors.length];
  const bodyColor = bodyColors[data.skinIndex % bodyColors.length];

  return (
    <div className="boneco">
      <div className="head" style={{ backgroundColor: skinColor }}></div>
      <div className="body" style={{ backgroundColor: bodyColor }}></div>
      <div className="arms">
        <div className="arm left" style={{ backgroundColor: bodyColor }}></div>
        <div className="arm right" style={{ backgroundColor: bodyColor }}></div>
      </div>
      <div className="legs">
        <div className="leg left"></div>
        <div className="leg right"></div>
      </div>
      <div className="name-tag">{data.label}</div>

      <Handle type="target" position="top" />
      <Handle type="source" position="bottom" />
    </div>
  );
};

export default CustomNode;
