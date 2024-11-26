"use client";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { PATH_AFTER_LOGIN } from "@/config-global";

export function Social() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("returnTo");

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: callbackUrl || PATH_AFTER_LOGIN,
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        variant="outline"
        size="lg"
        className="w-full"
        onClick={() => onClick("google")}
      >
        <Image
          src="/google.svg"
          alt="google icon"
          width={20}
          height={20}
          className="size-5"
        />
        <span>Continue with Google</span>
      </Button>
    </div>
  );
}
