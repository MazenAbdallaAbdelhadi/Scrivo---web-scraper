import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/theme-provider";
import { Separator } from "@/components/ui/separator";

export default function WorkflowEditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full h-full">
      {children}

      <Separator />

      <footer className="flex items-center justify-between p-2">
        <Logo labeled />
        <ModeToggle />
      </footer>
    </div>
  );
}
