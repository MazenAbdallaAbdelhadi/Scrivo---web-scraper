import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactCountupWrapper } from "@/components/react-countup-wrapper";

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
}
export default function StatsCard({
  icon: Icon,
  title,
  value,
}: StatsCardProps) {
  return (
    <Card className="relative overflow-hidden h-full">
      <CardHeader className="flex pb-2">
        <CardTitle>{title}</CardTitle>
        <Icon
          size={120}
          className="text-muted-foreground absolute -bottom-4 -right-4 stroke-primary opacity-10"
        />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-primary">
          <ReactCountupWrapper value={value} />
        </div>
      </CardContent>
    </Card>
  );
}
