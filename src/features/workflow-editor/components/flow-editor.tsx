"use client";
import { Workflow } from "@prisma/client";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { CreateFlowNode } from "../lib/create-flow-node";
import { TaskType } from "../types";

import NodeComponent from "./nodes/node-component";

const nodeTypes = {
  FlowScrapeNode: NodeComponent,
};

const snapGrid: [number, number] = [50, 50];
const fitViewOptions = {padding: 1}

interface FlowEditorProps {
  workflow: Workflow;
}

export function FlowEditor({ workflow }: FlowEditorProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    CreateFlowNode(TaskType.LAUNCH_BROWSER),
  ]);

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        snapToGrid
        snapGrid={snapGrid}
        fitViewOptions={fitViewOptions}
        fitView
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
