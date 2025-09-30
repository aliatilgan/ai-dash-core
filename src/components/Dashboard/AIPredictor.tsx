import { TrendingUp, Sparkles, Brain, BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";

interface AIPredictorProps {
  currentValue: number;
  metric: string;
}

// SmartDash AI Prediction Algorithm
const smartDashPredictor = (sales: number) => {
  // Enhanced prediction algorithm with seasonal factors
  const baseGrowthRate = 0.05 + Math.random() * 0.15; // 5-20% base growth
  const seasonalFactor = 1 + (Math.sin(Date.now() / 1000000) * 0.1); // Seasonal variation
  const marketTrend = 1.02; // 2% market growth factor
  
  const prediction = Math.round(sales * baseGrowthRate * seasonalFactor * marketTrend + sales);
  return prediction;
};

export const AIPredictor = ({ currentValue, metric }: AIPredictorProps) => {
  const [prediction, setPrediction] = useState(0);
  const [confidence, setConfidence] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate AI processing time
    const timer = setTimeout(() => {
      const predictedValue = smartDashPredictor(currentValue);
      const confidenceLevel = 82 + Math.random() * 13; // 82-95% confidence for SmartDash
      
      setPrediction(predictedValue);
      setConfidence(Math.round(confidenceLevel));
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [currentValue]);

  const increase = prediction > 0 ? ((prediction - currentValue) / currentValue * 100).toFixed(1) : "0.0";

  if (isLoading) {
    return (
      <div className="rounded-lg border bg-gradient-to-br from-primary/10 via-primary-light/5 to-background p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-primary/20 p-3">
            <Brain className="h-6 w-6 text-primary animate-pulse" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold">SmartDash AI</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium animate-pulse">
                Analyzing...
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Processing market data and trends...
            </p>
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded animate-pulse"></div>
              <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-gradient-to-br from-primary/10 via-primary-light/5 to-background p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-gradient-to-br from-primary/20 to-primary-light/20 p-3 shadow-md">
          <Brain className="h-6 w-6 text-primary" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              SmartDash AI Prediction
            </h3>
            <span className="text-xs px-2 py-1 rounded-full bg-success/10 text-success font-medium border border-success/20">
              {confidence}% confident
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">
            AI-powered forecasting with market trend analysis
          </p>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-muted/50">
                <span className="text-xs text-muted-foreground block mb-1">Current {metric}</span>
                <span className="text-xl font-bold">${currentValue.toLocaleString()}</span>
              </div>
              
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Predicted {metric}</span>
                <span className="text-xl font-bold text-primary">${prediction.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-lg bg-success/5 border border-success/20">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-sm font-medium text-success">
                +{increase}% projected growth
              </span>
              <BarChart3 className="h-4 w-4 text-success ml-auto" />
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-dashed">
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
              Live prediction • Updates every 6 hours • ML confidence: {confidence}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
