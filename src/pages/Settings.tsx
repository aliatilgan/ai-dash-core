import { DashboardLayout } from "@/components/Layout/DashboardLayout";

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>

        <div className="rounded-lg border bg-card p-8 text-center">
          <p className="text-muted-foreground">Settings panel coming soon...</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
