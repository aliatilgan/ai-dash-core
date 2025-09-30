import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { CustomerTable } from "@/components/CRM/CustomerTable";
import { PipelineChart } from "@/components/CRM/PipelineChart";
import { KPICard } from "@/components/Dashboard/KPICard";
import { AIPredictor } from "@/components/Dashboard/AIPredictor";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Users, TrendingUp, DollarSign, Target, UserCheck, Phone, Mail, Calendar, RefreshCw } from "lucide-react";
import { useState } from "react";

const CRM = () => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleDemoRefresh = async () => {
    setIsRefreshing(true);
    
    // Simulate CRM data refresh
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsRefreshing(false);
    toast({
      title: "CRM Demo Data Refreshed",
      description: "Customer data, pipeline values, and sales metrics have been updated with new sample data.",
    });
  };
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-warning to-warning-light bg-clip-text text-transparent">
              SmartDash CRM
            </h1>
            <p className="text-muted-foreground">
              Intelligent customer relationship management and sales automation
            </p>
          </div>
          <Button
            onClick={handleDemoRefresh}
            disabled={isRefreshing}
            variant="outline"
            className="border-warning/20 bg-warning/10 hover:bg-warning/20 text-warning hover:text-warning"
          >
            {isRefreshing ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <UserCheck className="h-4 w-4 mr-2" />
            )}
            {isRefreshing ? "Refreshing..." : "CRM Demo"}
          </Button>
        </div>

        {/* CRM KPIs */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Total Customers"
            value="1,247"
            change="+18.2%"
            icon={Users}
            changeType="positive"
          />
          <KPICard
            title="Pipeline Value"
            value="$485,000"
            change="+12.5%"
            icon={DollarSign}
            changeType="positive"
          />
          <KPICard
            title="Conversion Rate"
            value="24.5%"
            change="+3.2%"
            icon={TrendingUp}
            changeType="positive"
          />
          <KPICard
            title="Deals Closed"
            value="42"
            change="+5"
            icon={Target}
            changeType="positive"
          />
        </div>

        {/* AI Sales Prediction */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AIPredictor currentValue={485000} metric="Pipeline Value" />
          </div>
          <div className="p-6 rounded-lg border bg-gradient-to-br from-warning/10 to-warning/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-warning/20">
                <Calendar className="h-5 w-5 text-warning" />
              </div>
              <div>
                <h3 className="font-semibold">Next Actions</h3>
                <p className="text-sm text-muted-foreground">Upcoming tasks</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>5 follow-up calls</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>12 emails to send</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>3 meetings today</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pipeline and Customer Management */}
        <div className="grid grid-cols-1 gap-6">
          <PipelineChart />
          <CustomerTable />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CRM;
