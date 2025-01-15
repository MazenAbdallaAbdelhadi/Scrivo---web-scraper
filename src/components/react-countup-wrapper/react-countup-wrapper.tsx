"use client";

import { useEffect, useState } from "react";

import CountUp from "react-countup";

export function ReactCountupWrapper({ value }: { value: number }) {
  const [mounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!mounted) return "-";

  return <CountUp duration={0.5} preserveValue end={value} decimals={0} />;
}
