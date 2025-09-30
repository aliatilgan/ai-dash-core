import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { SalesChart } from "@/components/Dashboard/SalesChart";
import { CategoryChart } from "@/components/Dashboard/CategoryChart";
import { UserGrowthChart } from "@/components/Dashboard/UserGrowthChart";
import { AIPredictor } from "@/components/Dashboard/AIPredictor";
import { KPICard } from "@/components/Dashboard/KPICard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, Users, DollarSign, BarChart3, Target, Zap, RefreshCw } from "lucide-react";
import { useState } from "react";

const Analytics = () => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleDemoRefresh = async () => {
    setIsRefreshing(true);
    
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsRefreshing(false);
    toast({
      title: "Demo Data Refreshed",
      description: "Analytics demo data has been successfully updated with new sample data.",
    });
  };
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              SmartDash Analytics
            </h1>
            <p className="text-muted-foreground">
              AI-powered data analytics and business intelligence platform
            </p>
          </div>
          <Button 
            onClick={handleDemoRefresh}
            disabled={isRefreshing}
            variant="outline"
            className="bg-primary/10 border-primary/20 text-primary hover:bg-primary/20"
          >
            {isRefreshing ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <BarChart3 className="h-4 w-4 mr-2" />
            )}
            {isRefreshing ? "Refreshing..." : "Analytics Demo"}
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Total Revenue"
            value="$847,392"
            change="+12.5%"
            icon={DollarSign}
            changeType="positive"
          />
          <KPICard
            title="Active Users"
            value="24,847"
            change="+8.2%"
            icon={Users}
            changeType="positive"
          />
          <KPICard
            title="Conversion Rate"
            value="3.24%"
            change="+0.8%"
            icon={Target}
            changeType="positive"
          />
          <KPICard
            title="Growth Rate"
            value="18.7%"
            change="+2.1%"
            icon={TrendingUp}
            changeType="positive"
          />
        </div>

        {/* AI Prediction */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AIPredictor currentValue={847392} metric="Revenue" />
          </div>
          <div className="p-6 rounded-lg border bg-gradient-to-br from-success/10 to-success/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-success/20">
                <Zap className="h-5 w-5 text-success" />
              </div>
              <div>
                <h3 className="font-semibold">Performance Score</h3>
                <p className="text-sm text-muted-foreground">Overall analytics health</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-success mb-2">94.2%</div>
            <p className="text-sm text-muted-foreground">Excellent performance across all metrics</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SalesChart />
          <CategoryChart />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <UserGrowthChart />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
