import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { MotionContainer, varFade } from "@/components/animate";

import { Social } from "./social";

interface ICardWrapperProps {
  headerLabel: string;
  headerCaption: string;
  children: React.ReactNode;
  showSocial?: boolean;
  backButtonLabel: string;
  backButtonHref: string;
}

export const CardWrapper = ({
  headerLabel,
  headerCaption,
  children,
  showSocial,
  backButtonHref,
  backButtonLabel,
}: ICardWrapperProps) => {
  return (
    <MotionContainer variants={varFade().in} className="w-80 md:w-96">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-semibold">{headerLabel}</h1>
        <p className="text-sm text-muted-foreground">{headerCaption}</p>
      </div>

      {children}

      {showSocial && (
        <div className="my-4">
          <Social />
        </div>
      )}

      <Button variant="link" asChild size="sm" className="text-center w-full">
        <Link href={backButtonHref}>{backButtonLabel}</Link>
      </Button>
    </MotionContainer>
  );
};
