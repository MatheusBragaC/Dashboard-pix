import React, { useState, useEffect, useCallback } from "react";
import ReactFlow, { Background, Controls, applyNodeChanges } from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "../components/CustomNode";
import api from "../services/api";
import castleUrl from "../assets/castle.svg";

const nodeTypes = { customNode: CustomNode };

function FlowCanvas({ users }) {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    if (users.length > 0 && nodes.length === 0) {
      const spacing = 150;
      const startX = 100;

      const newNodes = users.map((user, index) => ({
        id: user.idusuarios ? user.idusuarios.toString() : `user-${index}`,
        position: {
          x: startX + index * spacing,
          y: 200,
        },
        data: {
          label: user.name || "Usuário Desconhecido",
          skinIndex: index,
        },
        type: "customNode",
      }));

      setNodes(newNodes);
    }
  }, [users, nodes]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  return (
    <div className="relative h-screen w-full bg-gradient-to-br from-[#1a140f] via-[#16100c] to-[#0f0b08]">
      {/* Céu com textura e watermark de castelo */}
      <img
        src={castleUrl}
        alt="Castelo"
        className="pointer-events-none select-none absolute right-4 top-4 w-[320px] opacity-25 hidden md:block"
      />

      {/* Gramado/terra ao fundo */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#2a2219] via-[#221b13] to-transparent" />

      <div className="relative h-full w-full">
        <div className="absolute left-1/2 -translate-x-1/2 top-6 z-10">
          <h1 className="font-heading text-2xl md:text-3xl text-yellow-200 drop-shadow-[0_0_6px_rgba(120,53,15,0.25)]">
            Mapa do Feudo
          </h1>
        </div>

        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          fitView
          className="reactflow-theme"
        >
          <Background color="#3b2a1b" gap={24} variant="dots" />
          <Controls className="!bg-[#2a2219]/80 !text-[#eadfc6] !border-[#3b2d1f]" />
        </ReactFlow>
      </div>
    </div>
  );
}

function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    })();
  }, []);

  return <FlowCanvas users={users} />;
}

export default Dashboard;
