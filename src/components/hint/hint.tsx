import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface IHintProps {
  children: ReactNode;
  content: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
}

export const Hint = ({ children, content, side }: IHintProps) => {
  if (!content) return <>{children}</>;

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side}>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
