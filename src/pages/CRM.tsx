import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { CustomerTable } from "@/components/CRM/CustomerTable";
import { PipelineChart } from "@/components/CRM/PipelineChart";
import { KPICard } from "@/components/Dashboard/KPICard";
import { Users, TrendingUp, DollarSign, Target } from "lucide-react";

const CRM = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">CRM</h1>
          <p className="text-muted-foreground">
            Manage customer relationships and sales pipeline
          </p>
        </div>

        {/* CRM KPIs */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Total Customers"
            value="1,247"
            change="+18.2% from last month"
            changeType="positive"
            icon={Users}
            variant="primary"
          />
          <KPICard
            title="Pipeline Value"
            value="$485,000"
            change="+12.5% from last month"
            changeType="positive"
            icon={DollarSign}
            variant="success"
          />
          <KPICard
            title="Conversion Rate"
            value="24.5%"
            change="+3.2% from last month"
            changeType="positive"
            icon={TrendingUp}
            variant="default"
          />
          <KPICard
            title="Deals Closed"
            value="42"
            change="+5 from last month"
            changeType="positive"
            icon={Target}
            variant="warning"
          />
        </div>

        <PipelineChart />
        <CustomerTable />
      </div>
    </DashboardLayout>
  );
};

export default CRM;
