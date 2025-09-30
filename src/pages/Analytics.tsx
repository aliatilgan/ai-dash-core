import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { SalesChart } from "@/components/Dashboard/SalesChart";
import { CategoryChart } from "@/components/Dashboard/CategoryChart";

const Analytics = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics</h1>
          <p className="text-muted-foreground">
            Deep dive into your business metrics and trends
          </p>
        </div>

        <div className="grid gap-6">
          <SalesChart />
          <CategoryChart />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
