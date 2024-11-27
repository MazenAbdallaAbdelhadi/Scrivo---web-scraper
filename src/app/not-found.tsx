import { Button } from "@/components/ui/button";
import { paths } from "@/routes/paths";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-full flex flex-col justify-center items-center gap-4">
      <h1 className="text-primary text-6xl font-semibold">404</h1>
      <p className="text-xl font-semibold">Page Not Found</p>
      <p className="text-sm text-muted-foreground">
        Don&apos;t worry, even the best data sometimes gets lost in the internet
      </p>
      <Button asChild>
        <Link href={paths.dashboard.root}>
          <ArrowLeft className="size-5" /> Back to Dashboard
        </Link>
      </Button>

      <p className="text-muted-foreground text-xs mt-4">
        if you believe this is an error, please contact our support team
      </p>
    </div>
  );
}
