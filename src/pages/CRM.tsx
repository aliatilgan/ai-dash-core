import { DashboardLayout } from "@/components/Layout/DashboardLayout";

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

        <div className="rounded-lg border bg-card p-8 text-center">
          <p className="text-muted-foreground">CRM module coming soon...</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CRM;
