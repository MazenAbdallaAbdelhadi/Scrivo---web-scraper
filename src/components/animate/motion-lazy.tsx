"use client";
import { motion as m, domMax, LazyMotion } from "framer-motion";

type Props = { children: React.ReactNode };

export default function MotionLazy(props: Props) {
  <LazyMotion strict features={domMax}>
    <m.div style={{ height: "100%" }}>{props.children}</m.div>
  </LazyMotion>;
}
