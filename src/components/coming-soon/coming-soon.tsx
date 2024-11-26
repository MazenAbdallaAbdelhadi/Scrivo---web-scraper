"use client";
import { MotionContainer, varBounce } from "../animate";
import { Logo } from "../logo";

export const ComingSoon = () => {
  return (
    <MotionContainer variants={varBounce().in}>
      <div className="text-2xl font-bold mb-4">
        <Logo disabledLink labeled />
      </div>
      <p className="mb-4">Comming Soon</p>
    </MotionContainer>
  );
};
