"use client";
import { UserRole } from "@prisma/client";
import { motion as m } from "framer-motion";

import { cn } from "@/lib/utils";
import ForbiddenIllustration from "@/assets/illustration/forbidden-illustration";

import { MotionContainer, varBounce } from "@/components/animate";
import { useCurrentUser } from "../hooks";

type RoleBasedGuardProp = {
  hasContent?: boolean;
  roles?: UserRole[];
  children: React.ReactNode;
  className?: string;
};

export function RoleBasedGuard({
  hasContent,
  roles,
  children,
  className,
}: RoleBasedGuardProp) {
  const user = useCurrentUser();

  const currentRole = user?.role!;

  if (typeof roles !== "undefined" && !roles?.includes(currentRole)) {
    return hasContent ? (
      <MotionContainer
        className={cn(
          "h-full text-center flex flex-col justify-center items-center",
          className
        )}
      >
        <m.div variants={varBounce().in}>
          <h3 className="text-2xl font-semibold mb-2">Permission Denied</h3>
        </m.div>
        <m.div variants={varBounce().in}>
          <p className="text-muted-foreground">
            You do not have permission to access this page
          </p>
        </m.div>
        <m.div variants={varBounce().in} className="flex justify-center">
          <ForbiddenIllustration className="h-64 my-5 sm:my-10" />
        </m.div>
      </MotionContainer>
    ) : null;
  }

  return <>{children}</>;
}
