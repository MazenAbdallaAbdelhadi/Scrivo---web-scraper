"use client";
import { Workflow } from "@prisma/client";
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import NodeComponent from "./nodes/node-component";
import { useCallback, useEffect } from "react";
import { CreateFlowNode } from "../lib/create-flow-node";
import { AppNode, TaskType } from "../types";
import { DeletableEdge } from "./edges/deletable-edge";

const nodeTypes = {
  FlowScrapeNode: NodeComponent,
};

const edgeTypes = {
  default: DeletableEdge,
}


const snapGrid: [number, number] = [50, 50];
const fitViewOptions = { padding: 1 };

interface FlowEditorProps {
  workflow: Workflow;
}

export function FlowEditor({ workflow }: FlowEditorProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { setViewport, screenToFlowPosition } = useReactFlow();

  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition);
      if (!flow) return;

      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);

      if (!flow.viewport) return;

      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setViewport({ x, y, zoom });
    } catch (error) {}
  }, [workflow.definition, setEdges, setNodes, setViewport]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const taskType = event.dataTransfer.getData("application/reactflow");

    if (typeof taskType === undefined || !taskType) return;

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode = CreateFlowNode(taskType as TaskType, position);

    setNodes((prevNodes) => prevNodes.concat(newNode));
  }, []);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((prevEdges) =>
      addEdge({ ...connection, animated: true }, prevEdges)
    );
  }, []);

  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        snapToGrid
        snapGrid={snapGrid}
        fitViewOptions={fitViewOptions}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
      >
        <Controls
          position="top-left"
          className="text-primary"
          fitViewOptions={fitViewOptions}
        />
        <Background variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </main>
  );
}
