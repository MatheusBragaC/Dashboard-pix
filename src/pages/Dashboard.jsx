import React, { useState, useEffect, useCallback } from "react";
import ReactFlow, { Background, Controls, applyNodeChanges } from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "../components/CustomNode";
import api from "../services/api";

const nodeTypes = { customNode: CustomNode };

function FlowCanvas({ users }) {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    if (users.length > 0 && nodes.length === 0) {
      const spacing = 150; // Espaçamento entre os cavaleiros
      const startX = 100; // Posição inicial no eixo X

      const newNodes = users.map((user, index) => ({
        id: user.idusuarios ? user.idusuarios.toString() : `user-${index}`,
        position: { 
          x: startX + index * spacing, // Posicionamento lado a lado
          y: 200 // Altura fixa para todos começarem alinhados
        },
        data: { 
          label: user.name || "Usuário Desconhecido",
          rule: user.rule, 
          skinIndex: index 
        },
        type: "customNode",
      }));

      setNodes(newNodes);
    }
  }, [users]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  return (
    <div className="h-screen w-full bg-gray-900 flex items-center justify-center">
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

function Dashboard() {
  const [users, setUsers] = useState([]);

  async function getUsers() {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return <FlowCanvas users={users} />;
}

export default Dashboard;
