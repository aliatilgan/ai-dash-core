import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { AIPredictor } from "@/components/Dashboard/AIPredictor";

const AIInsights = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">AI Insights</h1>
          <p className="text-muted-foreground">
            AI-powered predictions and business intelligence
          </p>
        </div>

        <div className="grid gap-6">
          <AIPredictor currentValue={142500} metric="Revenue" />
          <AIPredictor currentValue={8234} metric="Users" />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AIInsights;
