import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Package, 
  ShoppingCart, 
  Trophy, 
  Truck, 
  MessageSquare, 
  BookOpen, 
  User, 
  Settings,
  AlertTriangle,
  LogOut
} from "lucide-react";

interface FarmerLayoutProps {
  children: React.ReactNode;
  currentPage: string;
}

export function FarmerLayout({ children, currentPage }: FarmerLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("farm2city_token");
    const role = localStorage.getItem("farm2city_role");
    
    if (!token || role !== "farmer") {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("farm2city_token");
    localStorage.removeItem("farm2city_role");
    navigate("/");
  };

  const sidebarItems = [
    { icon: Home, label: "Dashboard", path: "/farmer-dashboard" },
    { icon: Package, label: "My Produce", path: "/farmer/my-produce" },
    { icon: ShoppingCart, label: "Orders & Earnings", path: "/farmer/orders-earnings" },
    { icon: Trophy, label: "Gamification", path: "/farmer/gamification" },
    { icon: Truck, label: "Delivery Matching", path: "/farmer/delivery-matching" },
    { icon: MessageSquare, label: "Community Forum", path: "/farmer/community-forum" },
    { icon: BookOpen, label: "Education Hub", path: "/farmer/education-hub" },
    { icon: User, label: "Profile & Wallet", path: "/farmer/profile-wallet" },
    { icon: Settings, label: "Settings", path: "/farmer/settings" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-card border-r shadow-card">
        <div className="p-6 border-b">
          <Link to="/farmer-dashboard">
            <h1 className="text-xl font-bold gradient-hero bg-clip-text text-transparent">
              Farm2City
            </h1>
          </Link>
          <p className="text-sm text-muted-foreground">Farmer Portal</p>
        </div>

        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <Link key={item.label} to={item.path}>
              <Button
                variant={isActive(item.path) ? "default" : "ghost"}
                className="w-full justify-start transition-smooth"
              >
                <item.icon className="h-4 w-4 mr-3" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <Button variant="destructive" className="w-full justify-start">
            <AlertTriangle className="h-4 w-4 mr-3" />
            Emergency Panic
          </Button>
          <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-3" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-6">
        {children}
      </div>
    </div>
  );
}