import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MobileMenu } from "./MobileMenu";

export const Header = () => {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
      <MobileMenu />

      <div className="flex-1 flex items-center gap-4 max-w-2xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search dashboards, reports..."
            className="pl-10 bg-muted/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-warning"></span>
        </Button>
        
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-xs font-medium text-primary-foreground">
          SD
        </div>
      </div>
    </header>
  );
};
