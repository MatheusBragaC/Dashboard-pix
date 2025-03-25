import React, { useState, useEffect, useCallback } from "react";
import ReactFlow, { Background, Controls, applyNodeChanges } from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "../components/CustomNode";
import api from "../services/api";

const nodeTypes = { customNode: CustomNode };

function FlowCanvas({ users }) {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    // Se já carregou os usuários e ainda não criamos os nós
    if (users.length > 0 && nodes.length === 0) {
      const spacing = 150; // Espaçamento horizontal
      const startX = 100; // Posição X inicial

      const newNodes = users.map((user, index) => ({
        id: user.idusuarios ? user.idusuarios.toString() : `user-${index}`,
        position: {
          x: startX + index * spacing,
          y: 200
        },
        data: {
          label: user.name || "Usuário Desconhecido",
          // Com pixel art, podemos usar skinIndex para variar as cores
          skinIndex: index
        },
        type: "customNode"
      }));

      setNodes(newNodes);
    }
  }, [users, nodes]);

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
