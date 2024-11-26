import React from "react";

import { cn } from "@/lib/utils";

interface LoadingScreenProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function LoadingScreen({
  className,
  ...rest
}: LoadingScreenProps) {
  return (
    <div
      className={cn(
        "flex justify-center items-center flex-grow gap-4 w-full h-full px-5",
        className
      )}
      {...rest}>
      <span className="sr-only">Loading...</span>
      <div className="h-8 w-8 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-8 w-8 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-8 w-8 bg-primary rounded-full animate-bounce"></div>
    </div>
  );
}
