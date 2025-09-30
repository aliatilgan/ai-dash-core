import { useState } from "react";
import { Menu, X, LayoutDashboard, BarChart3, Users, Settings, Sparkles } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "CRM", href: "/crm", icon: Users },
  { name: "AI Insights", href: "/ai-insights", icon: Sparkles },
  { name: "Settings", href: "/settings", icon: Settings },
];

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleUpgradeClick = () => {
    toast({
      title: "🚀 Pro Features Coming Soon!",
      description: "Advanced AI features and unlimited analytics will be available soon. Stay tuned for updates!",
    });
    setIsOpen(false); // Close mobile menu
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed left-0 top-16 bottom-0 w-64 bg-sidebar border-r z-50 lg:hidden animate-slide-in-left">
            <div className="flex h-16 items-center border-b px-6">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                  SmartDash
                </span>
              </div>
            </div>

            <nav className="flex-1 space-y-1 p-4">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  end={item.href === "/"}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                    )
                  }
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </NavLink>
              ))}
            </nav>

            <div className="border-t p-4">
              <div className="rounded-lg bg-gradient-to-br from-primary/10 to-primary-light/10 p-4 border border-primary/20">
                <h3 className="text-sm font-semibold mb-1">Upgrade to Pro</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Unlock advanced AI features and unlimited insights.
                </p>
                <button 
                  onClick={handleUpgradeClick}
                  className="w-full rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
