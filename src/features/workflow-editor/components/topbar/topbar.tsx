"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { SaveButton } from "./save-button";
import { ExcuteButton } from "./excute-button";

interface TopbarProps {
  title: string;
  subtitle?: string;
  workflowId: string;
  hideButtons?: boolean;
}

export default function Topbar({
  title,
  subtitle,
  workflowId,
  hideButtons,
}: TopbarProps) {
  const router = useRouter();

  return (
    <header className="flex p-2 border-b-2 border-separate justify-between w-full h-[60px] sticky top-0 bg-background z-10">
      <div className="flex gap-1 flex-1">
        <Hint content="Back">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeftIcon size={20} />
          </Button>
        </Hint>
        <div>
          <p className="font-bold text-ellipsis truncate">{title}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground truncate text-ellipsis">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {!hideButtons && (
        <div className="flex gap-1 flex-1 justify-end">
          <ExcuteButton workflowId={workflowId} />
          <SaveButton workflowId={workflowId} />
        </div>
      )}
    </header>
  );
}
