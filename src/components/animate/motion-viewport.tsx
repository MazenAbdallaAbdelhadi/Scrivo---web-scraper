"use client";
import { motion as m, MotionProps } from "framer-motion";

import { useResponsive } from "@/hooks/use-responsive";
import { varContainer } from "./variants";

type IPorps = React.HTMLAttributes<HTMLDivElement> & MotionProps;

interface Props extends IPorps {
  disableAnimatedMobile?: boolean;
}

export default function MotionViewport({
  disableAnimatedMobile = true,
  ...rest
}: Props) {
  const smDown = useResponsive("down", "sm");

  if (smDown && disableAnimatedMobile) {
    return <div {...rest} />;
  }

  return (
    <m.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={varContainer()}
      {...rest}
    />
  );
}
