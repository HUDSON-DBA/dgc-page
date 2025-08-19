import { cn } from "@/lib/utils";
import { Badge } from "./badge";

interface StatusBadgeProps {
  variant: "approved" | "rejected" | "pending" | "active";
  children: React.ReactNode;
  className?: string;
}

export function StatusBadge({ variant, children, className }: StatusBadgeProps) {
  const variants = {
    approved: "bg-success text-success-foreground",
    rejected: "bg-danger text-danger-foreground",
    pending: "bg-warning text-warning-foreground",
    active: "bg-info text-info-foreground",
  };

  return (
    <Badge className={cn(variants[variant], className)}>
      {children}
    </Badge>
  );
}