import { cn } from "@/lib/utils";

interface ScoreDisplayProps {
  score: number;
  maxScore?: number;
  className?: string;
}

export function ScoreDisplay({ score, maxScore = 1000, className }: ScoreDisplayProps) {
  const getScoreColor = (score: number) => {
    if (score >= 700) return "text-success";
    if (score >= 400) return "text-warning";
    return "text-danger";
  };

  const getScoreStatus = (score: number) => {
    if (score >= 700) return "Excelente";
    if (score >= 400) return "Regular";
    return "Baixo";
  };

  return (
    <div className={cn("bg-warning rounded-lg p-4 text-center", className)}>
      <div className="text-sm font-medium text-warning-foreground mb-1">Score</div>
      <div className={cn("text-4xl font-bold", getScoreColor(score))}>
        {score}
      </div>
      <div className="text-sm text-warning-foreground mt-1">
        {getScoreStatus(score)}
      </div>
    </div>
  );
}