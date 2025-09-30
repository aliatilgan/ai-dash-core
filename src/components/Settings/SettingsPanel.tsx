import { useState } from "react";
import { User, Bell, Lock, Palette, Database, Globe, Monitor, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useTheme } from "next-themes";

export const SettingsPanel = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Profile Settings */}
      <div className="rounded-lg border bg-card p-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-lg bg-primary/10 p-2">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Profile Settings</h3>
            <p className="text-sm text-muted-foreground">Update your personal information</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue="John Doe" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue="john@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="company">Company</Label>
            <Input id="company" defaultValue="TechCorp Inc." />
          </div>
          <Button onClick={handleSave} className="mt-4">
            Save Changes
          </Button>
        </div>
      </div>

      {/* Notifications */}
      <div className="rounded-lg border bg-card p-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-lg bg-primary/10 p-2">
            <Bell className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Notifications</h3>
            <p className="text-sm text-muted-foreground">Manage how you receive updates</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">
                Receive updates via email
              </p>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Push Notifications</p>
              <p className="text-sm text-muted-foreground">
                Receive push notifications in browser
              </p>
            </div>
            <Switch
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
            />
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="rounded-lg border bg-card p-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-lg bg-primary/10 p-2">
            <Lock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Security</h3>
            <p className="text-sm text-muted-foreground">Keep your account secure</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" type="password" />
          </div>
          <Button variant="outline" className="mt-4">
            Change Password
          </Button>
        </div>
      </div>

      {/* Appearance */}
      <div className="rounded-lg border bg-card p-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-lg bg-primary/10 p-2">
            <Palette className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Appearance</h3>
            <p className="text-sm text-muted-foreground">Customize your dashboard look</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Label className="text-sm font-medium">Theme Mode</Label>
            <div className="grid grid-cols-3 gap-3 mt-2">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("light")}
                className="flex items-center gap-2"
              >
                <Sun className="h-4 w-4" />
                Light
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("dark")}
                className="flex items-center gap-2"
              >
                <Moon className="h-4 w-4" />
                Dark
              </Button>
              <Button
                variant={theme === "system" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("system")}
                className="flex items-center gap-2"
              >
                <Monitor className="h-4 w-4" />
                System
              </Button>
            </div>
          </div>

          <Separator />

          <div>
            <Label className="text-sm font-medium">Accent Color</Label>
            <div className="grid grid-cols-6 gap-2 mt-2">
              {[
                { name: "Blue", value: "hsl(221.2 83.2% 53.3%)", class: "bg-blue-500" },
                { name: "Green", value: "hsl(142.1 76.2% 36.3%)", class: "bg-green-500" },
                { name: "Purple", value: "hsl(262.1 83.3% 57.8%)", class: "bg-purple-500" },
                { name: "Orange", value: "hsl(24.6 95% 53.1%)", class: "bg-orange-500" },
                { name: "Red", value: "hsl(346.8 77.2% 49.8%)", class: "bg-red-500" },
                { name: "Pink", value: "hsl(336.2 84.2% 60.4%)", class: "bg-pink-500" },
              ].map((color) => (
                <button
                  key={color.name}
                  className={`w-8 h-8 rounded-full ${color.class} border-2 border-transparent hover:border-foreground/20 transition-colors`}
                  title={color.name}
                  onClick={() => {
                    document.documentElement.style.setProperty('--primary', color.value);
                    toast.success(`Accent color changed to ${color.name}`);
                  }}
                />
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <Label className="text-sm font-medium">Dashboard Density</Label>
            <Select defaultValue="comfortable">
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compact">Compact</SelectItem>
                <SelectItem value="comfortable">Comfortable</SelectItem>
                <SelectItem value="spacious">Spacious</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Reduced Motion</p>
              <p className="text-sm text-muted-foreground">
                Minimize animations and transitions
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </div>

      {/* API Settings */}
      <div className="rounded-lg border bg-card p-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-lg bg-primary/10 p-2">
            <Database className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">API Integration</h3>
            <p className="text-sm text-muted-foreground">Connect external services</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="api-key">API Key</Label>
            <div className="flex gap-2">
              <Input id="api-key" type="password" value="sk-••••••••••••••••" readOnly />
              <Button variant="outline">Regenerate</Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Keep your API key secure. Do not share it publicly.
          </p>
        </div>
      </div>

      {/* Language & Region */}
      <div className="rounded-lg border bg-card p-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-lg bg-primary/10 p-2">
            <Globe className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Language & Region</h3>
            <p className="text-sm text-muted-foreground">Set your preferred language</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-2">
            <Label>Language</Label>
            <Select defaultValue="en-US">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en-US">English (US)</SelectItem>
                <SelectItem value="tr-TR">Türkçe</SelectItem>
                <SelectItem value="es-ES">Español</SelectItem>
                <SelectItem value="fr-FR">Français</SelectItem>
                <SelectItem value="de-DE">Deutsch</SelectItem>
                <SelectItem value="ja-JP">日本語</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Timezone</Label>
            <Select defaultValue="UTC-08:00">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTC-08:00">UTC-08:00 Pacific Time</SelectItem>
                <SelectItem value="UTC-05:00">UTC-05:00 Eastern Time</SelectItem>
                <SelectItem value="UTC+00:00">UTC+00:00 London</SelectItem>
                <SelectItem value="UTC+03:00">UTC+03:00 Istanbul</SelectItem>
                <SelectItem value="UTC+09:00">UTC+09:00 Tokyo</SelectItem>
                <SelectItem value="UTC+01:00">UTC+01:00 Berlin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Date Format</Label>
            <Select defaultValue="MM/DD/YYYY">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                <SelectItem value="DD.MM.YYYY">DD.MM.YYYY</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSave} className="mt-4">
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  );
};
