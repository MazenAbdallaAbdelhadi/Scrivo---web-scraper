import { Logo } from "@/components/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex flex-col p-8">
      <div className="flex justify-start items-center">
        <Logo labeled />
      </div>
      <main className="flex-1 flex justify-center items-center">
        {children}
      </main>
    </div>
  );
}
