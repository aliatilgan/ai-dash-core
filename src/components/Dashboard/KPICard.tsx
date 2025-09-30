import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  variant?: "default" | "primary" | "success" | "warning";
}

export const KPICard = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  variant = "default",
}: KPICardProps) => {
  const variantClasses = {
    default: "kpi-card",
    primary: "kpi-card-primary",
    success: "kpi-card-success",
    warning: "kpi-card-warning",
  };

  const changeColors = {
    positive: "text-success",
    negative: "text-destructive",
    neutral: "text-muted-foreground",
  };

  return (
    <div className={cn(variantClasses[variant], "animate-fade-in")}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
          <p className={cn("text-sm font-medium", changeColors[changeType])}>
            {change}
          </p>
        </div>
        <div className="rounded-lg bg-primary/10 p-3">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </div>
  );
};
