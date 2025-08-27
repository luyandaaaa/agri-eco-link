import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Package, 
  ShoppingCart, 
  Scan, 
  Trophy, 
  Truck, 
  MessageSquare, 
  BookOpen, 
  User, 
  Settings,
  AlertTriangle,
  LogOut,
  Plus,
  TrendingUp,
  Wallet
} from "lucide-react";

export default function FarmerDashboard() {
  const navigate = useNavigate();
  const [farmer, setFarmer] = useState({
    name: "Lindiwe Mthembu",
    location: "Eastern Cape",
    rating: 4.8,
    totalEarnings: 12540,
    activeOrders: 8,
    totalProducts: 15
  });

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
    { icon: Home, label: "Dashboard", path: "/farmer-dashboard", active: true },
    { icon: Package, label: "My Produce", path: "/farmer/my-produce" },
    { icon: ShoppingCart, label: "Orders & Earnings", path: "/farmer/orders-earnings" },
    { icon: Trophy, label: "Gamification", path: "/farmer/gamification" },
    { icon: Truck, label: "Delivery Matching", path: "/farmer/delivery-matching" },
    { icon: MessageSquare, label: "Community Forum", path: "/farmer/community-forum" },
    { icon: BookOpen, label: "Education Hub", path: "/farmer/education-hub" },
    { icon: User, label: "Profile & Wallet", path: "/farmer/profile-wallet" },
    { icon: Settings, label: "Settings", path: "/farmer/settings" },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-card border-r shadow-card">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold gradient-hero bg-clip-text text-transparent">
            Farm2City
          </h1>
          <p className="text-sm text-muted-foreground">Farmer Portal</p>
        </div>

        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <Button
              key={item.label}
              variant={item.active ? "default" : "ghost"}
              className="w-full justify-start transition-smooth"
            >
              <item.icon className="h-4 w-4 mr-3" />
              {item.label}
            </Button>
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {farmer.name}! 🌱</h1>
          <p className="text-muted-foreground">
            Your farm in {farmer.location} is thriving. Here's your overview.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card transition-smooth hover:shadow-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <Wallet className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R{farmer.totalEarnings.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="shadow-card transition-smooth hover:shadow-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{farmer.activeOrders}</div>
              <p className="text-xs text-muted-foreground">5 pending pickup</p>
            </CardContent>
          </Card>

          <Card className="shadow-card transition-smooth hover:shadow-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products Listed</CardTitle>
              <Package className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{farmer.totalProducts}</div>
              <p className="text-xs text-muted-foreground">3 low stock alerts</p>
            </CardContent>
          </Card>

          <Card className="shadow-card transition-smooth hover:shadow-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Farm Rating</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary-glow" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{farmer.rating}/5</div>
              <p className="text-xs text-muted-foreground">Based on 47 reviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />
                Add New Produce
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                List new crops from your harvest to reach more buyers.
              </p>
              <Button variant="hero" className="w-full">
                Add Produce
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scan className="h-5 w-5 text-secondary" />
                Crop Health Scanner
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Use AI to check your crops for diseases and get treatment advice.
              </p>
              <Button variant="secondary" className="w-full">
                Scan Crops
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-accent" />
                Farm Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Complete challenges and earn points for platform benefits.
              </p>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">1,250 Points</Badge>
              </div>
              <Button variant="outline" className="w-full">
                View Challenges
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                <div className="h-2 w-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New order received: 5kg Spinach</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
                <Badge variant="default">New</Badge>
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                <div className="h-2 w-2 bg-secondary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Payment received: R450</p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
                <Badge variant="secondary">Payment</Badge>
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                <div className="h-2 w-2 bg-accent rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Quiz completed: Soil Management</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
                <Badge variant="outline">+50 Points</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}