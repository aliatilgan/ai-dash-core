import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { SettingsPanel } from "@/components/Settings/SettingsPanel";

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

        <SettingsPanel />
      </div>
    </DashboardLayout>
  );
};

export default Settings;
