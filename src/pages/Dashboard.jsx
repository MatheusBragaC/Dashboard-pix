import React, { useState, useEffect, useCallback } from "react";
import ReactFlow, { Background, Controls, applyNodeChanges } from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "../components/CustomNode"; // Importando o boneco customizado
import api from "../services/api";

function FlowCanvas({ users }) {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const newNodes = users.map((user, index) => ({
      id: user.idusuarios ? user.idusuarios.toString() : `user-${index}`,
      position: { x: 100 + index * 120, y: 50 },
      data: { label: user.name || "Usuário Desconhecido" },
      type: "customNode", // Define que este nó usa o componente `CustomNode`
    }));

    setNodes(newNodes);
  }, [users]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  return (
    <div className="h-screen w-full bg-gray-900 flex items-center justify-center">
      <ReactFlow
        nodes={nodes}
        nodeTypes={{ customNode: CustomNode }} // Diz ao React Flow para usar o boneco personalizado
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
