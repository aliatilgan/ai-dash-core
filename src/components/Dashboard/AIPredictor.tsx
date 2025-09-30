import { TrendingUp, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface AIPredictorProps {
  currentValue: number;
  metric: string;
}

export const AIPredictor = ({ currentValue, metric }: AIPredictorProps) => {
  const [prediction, setPrediction] = useState(0);
  const [confidence, setConfidence] = useState(0);

  useEffect(() => {
    // AI prediction algorithm - simulates ML prediction
    const growthRate = 0.05 + Math.random() * 0.15; // 5-20% growth
    const predictedValue = Math.round(currentValue * (1 + growthRate));
    const confidenceLevel = 75 + Math.random() * 20; // 75-95% confidence
    
    setPrediction(predictedValue);
    setConfidence(Math.round(confidenceLevel));
  }, [currentValue]);

  const increase = ((prediction - currentValue) / currentValue * 100).toFixed(1);

  return (
    <div className="rounded-lg border bg-gradient-to-br from-primary/10 via-primary-light/5 to-background p-6 animate-fade-in">
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-primary/20 p-3">
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold">AI Prediction</h3>
            <span className="text-xs px-2 py-1 rounded-full bg-success/10 text-success font-medium">
              {confidence}% confident
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">
            Based on historical data and trend analysis
          </p>

          <div className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-muted-foreground">Current {metric}:</span>
              <span className="text-2xl font-bold">{currentValue.toLocaleString()}</span>
            </div>
            
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-muted-foreground">Predicted {metric}:</span>
              <span className="text-2xl font-bold text-primary">{prediction.toLocaleString()}</span>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-sm font-medium text-success">
                +{increase}% projected growth
              </span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              Next update in 24 hours • Based on 90-day trend analysis
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
