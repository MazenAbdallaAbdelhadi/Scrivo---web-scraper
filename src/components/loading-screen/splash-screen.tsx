"use client";
import React, { useEffect, useState } from "react";
import { motion as m } from "framer-motion";

import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

type SplashScreenProps = React.HTMLAttributes<HTMLDivElement>;

export default function SplashScreen({
  className,
  ...rest
}: SplashScreenProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex justify-center items-center w-full h-full absolute inset-0 z-50 bg-background",
        className
      )}
      {...rest}
    >
      <>
        <m.div
          animate={{
            scale: [1, 0.9, 0.9, 1, 1],
            opacity: [1, 0.48, 0.48, 1, 1],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeatDelay: 1,
            repeat: Infinity,
          }}
        >
          <Logo disabledLink className="size-12" />
        </m.div>

        <m.div
          animate={{
            scale: [1.6, 1, 1, 1.6, 1.6],
            rotate: [270, 0, 0, 270, 270],
            opacity: [0.25, 1, 1, 1, 0.25],
            borderRadius: ["25%", "25%", "50%", "50%", "25%"],
          }}
          transition={{ ease: "linear", duration: 3.2, repeat: Infinity }}
          className="size-24 absolute border-[3px] border-primary"
        />

        <m.div
          animate={{
            scale: [1, 1.2, 1.2, 1, 1],
            rotate: [0, 270, 270, 0, 0],
            opacity: [1, 0.25, 0.25, 0.25, 1],
            borderRadius: ["25%", "25%", "50%", "50%", "25%"],
          }}
          transition={{
            ease: "linear",
            duration: 3.2,
            repeat: Infinity,
          }}
          className="size-28 absolute border-[3px]  border-primary"
        />
      </>
    </div>
  );
}
