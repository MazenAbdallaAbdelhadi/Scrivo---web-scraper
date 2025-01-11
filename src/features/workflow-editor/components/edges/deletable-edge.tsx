"use client";
import { Button } from "@/components/ui/button";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  useReactFlow,
} from "@xyflow/react";
import { XIcon } from "lucide-react";

export function DeletableEdge(props: EdgeProps) {
  const [edgePath, labelX, labelY] = getSmoothStepPath(props);
  const { setEdges } = useReactFlow();

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={props.markerEnd}
        style={props.style}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
        >
          <Button
            variant="outline"
            size="icon"
            className="size-5 border cursor-pointer rounded-full text-xs leading-none hover:shadow-lg"
            onClick={() => {
              setEdges((edges) => edges.filter((edge) => edge.id !== props.id));
            }}
          >
            <XIcon size={10} />
          </Button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
