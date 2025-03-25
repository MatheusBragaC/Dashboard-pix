import React from "react";
import { motion } from "framer-motion";
import "../styles/boneco.css";

function CharacterScene({ users }) {
  return (
    <div className="relative w-full h-[500px] bg-gray-900 border border-gray-700 rounded-lg p-4 flex flex-wrap justify-center items-center">
      {users.map((user, index) => {
        // Posição inicial aleatória
        const left = `${Math.random() * 80}%`;
        const top = `${Math.random() * 80}%`;

        // Escolhe cores de pixel art
        const skinIndex = index % 4;
        // Use as MESMAS variações definidas em CustomNode, se quiser
        const skinColors = ["#facc15", "#ef4444", "#10b981", "#8b5cf6"];
        const skinDarks = ["#caa60f", "#ba3434", "#0b7d5e", "#6b39c6"];
        const bodyColors = ["#3b82f6", "#6d28d9", "#dc2626", "#f97316"];
        const bodyDarks = ["#2e66bb", "#4e1ea6", "#a31d1d", "#c75f10"];

        // CSS variables para pixel art
        const styleVars = {
          "--skin": skinColors[skinIndex],
          "--skin-dark": skinDarks[skinIndex],
          "--body": bodyColors[skinIndex],
          "--body-dark": bodyDarks[skinIndex]
        };

        return (
          <motion.div
            key={user.idusuarios}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            className="boneco absolute"
            style={{
              ...styleVars,
              left,
              top
            }}
          >
            <div className="head"></div>
            <div className="body"></div>
            <div className="arms">
              <div className="arm left"></div>
              <div className="arm right"></div>
            </div>
            <div className="legs">
              <div className="leg left"></div>
              <div className="leg right"></div>
            </div>
            <div className="name-tag">{user.name}</div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default CharacterScene;
