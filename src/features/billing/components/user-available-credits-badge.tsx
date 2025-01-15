"use client";

import { ReactCountupWrapper } from "@/components/react-countup-wrapper";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GetAvailableCredits } from "@/server/billing/data/get-available-credits";
import { useQuery } from "@tanstack/react-query";
import { CoinsIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";

export function UserAvailableCreditsBadge() {
  const query = useQuery({
    queryKey: ["user-available-credits"],
    queryFn: () => GetAvailableCredits(),
    refetchInterval: 30 * 1000,
  });

  return (
    <Link
      href={"/billing"}
      className={cn(
        "space-x-2 items-center",
        buttonVariants({ variant: "outline", size: "sm" })
      )}
    >
      <CoinsIcon size={20} className="text-primary" />

      <span className="font-semibold capitalize">
        {query.isLoading && <Loader2Icon className="size-4 animate-spin" />}
        {!query.isLoading && query.data && (
          <ReactCountupWrapper value={query.data} />
        )}
        {!query.isLoading && query.data === undefined && "-"}
      </span>
    </Link>
  );
}
