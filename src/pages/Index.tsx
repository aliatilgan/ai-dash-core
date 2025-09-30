import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { KPICard } from "@/components/Dashboard/KPICard";
import { AIPredictor } from "@/components/Dashboard/AIPredictor";
import { SalesChart } from "@/components/Dashboard/SalesChart";
import { CategoryChart } from "@/components/Dashboard/CategoryChart";
import { DollarSign, TrendingUp, Users, ShoppingCart } from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Total Revenue"
            value="$142,500"
            change="+12.5% from last month"
            changeType="positive"
            icon={DollarSign}
            variant="primary"
          />
          <KPICard
            title="Active Users"
            value="8,234"
            change="+8.2% from last month"
            changeType="positive"
            icon={Users}
            variant="success"
          />
          <KPICard
            title="Conversion Rate"
            value="3.24%"
            change="+0.5% from last month"
            changeType="positive"
            icon={TrendingUp}
            variant="default"
          />
          <KPICard
            title="Total Orders"
            value="1,847"
            change="-2.4% from last month"
            changeType="negative"
            icon={ShoppingCart}
            variant="warning"
          />
        </div>

        {/* AI Predictor */}
        <AIPredictor currentValue={142500} metric="Revenue" />

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <SalesChart />
          <CategoryChart />
        </div>

        {/* Recent Activity */}
        <div className="rounded-lg border bg-card p-6 animate-fade-in">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: "New order placed", user: "John Doe", time: "2 minutes ago", amount: "$1,250" },
              { action: "User registered", user: "Jane Smith", time: "15 minutes ago", amount: null },
              { action: "Payment received", user: "Mike Johnson", time: "1 hour ago", amount: "$850" },
              { action: "New order placed", user: "Sarah Williams", time: "2 hours ago", amount: "$2,100" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                    {item.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.user} • {item.time}</p>
                  </div>
                </div>
                {item.amount && (
                  <span className="text-sm font-semibold text-success">{item.amount}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
