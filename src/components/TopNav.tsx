import { NavLink } from "./NavLink";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export const TopNav = () => {
  const { logout } = useAuth();

  return (
    <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex space-x-8">
            <NavLink
              to="/"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeClassName="text-foreground"
            >
              AI Assistant
            </NavLink>
            <NavLink
              to="/watchlist"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeClassName="text-foreground"
            >
              Watchlist
            </NavLink>
            <NavLink
              to="/archive"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeClassName="text-foreground"
            >
              Archive
            </NavLink>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};
