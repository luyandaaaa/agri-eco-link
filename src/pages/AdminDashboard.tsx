import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield,
  Users, 
  ShoppingCart, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  XCircle,
  User, 
  LogOut,
  FileText,
  MessageSquare,
  BarChart3,
  Settings
} from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({
    name: "Nomvula Dlamini",
    role: "Operations Manager",
    totalFarmers: 1200,
    totalConsumers: 5500,
    pendingApprovals: 15,
    totalOrders: 8420
  });

  useEffect(() => {
    const token = localStorage.getItem("farm2city_token");
    const role = localStorage.getItem("farm2city_role");
    
    if (!token || role !== "admin") {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("farm2city_token");
    localStorage.removeItem("farm2city_role");
    navigate("/");
  };

  const sidebarItems = [
    { icon: BarChart3, label: "Dashboard", active: true },
    { icon: Users, label: "User Management" },
    { icon: FileText, label: "Farmer Applications" },
    { icon: MessageSquare, label: "Dispute Resolution" },
    { icon: TrendingUp, label: "Analytics" },
    { icon: Shield, label: "Security" },
    { icon: Settings, label: "Settings" },
  ];

  const pendingApplications = [
    { id: 1, name: "Thabo Mokoena", location: "Limpopo", crops: "Maize, Beans", status: "pending" },
    { id: 2, name: "Sarah Van Der Merwe", location: "Western Cape", crops: "Grapes, Olives", status: "pending" },
    { id: 3, name: "James Nkomo", location: "KwaZulu-Natal", crops: "Avocados, Macadamias", status: "pending" },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-card border-r shadow-card">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold gradient-hero bg-clip-text text-transparent">
            Farm2City
          </h1>
          <p className="text-sm text-muted-foreground">Admin Portal</p>
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

        <div className="absolute bottom-4 left-4 right-4">
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
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard 🛡️</h1>
          <p className="text-muted-foreground">
            Welcome, {admin.name} - {admin.role}. Platform overview and management.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card transition-smooth hover:shadow-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Farmers</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{admin.totalFarmers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card className="shadow-card transition-smooth hover:shadow-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Consumers</CardTitle>
              <ShoppingCart className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{admin.totalConsumers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>

          <Card className="shadow-card transition-smooth hover:shadow-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <AlertTriangle className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{admin.pendingApprovals}</div>
              <p className="text-xs text-muted-foreground">Requires review</p>
            </CardContent>
          </Card>

          <Card className="shadow-card transition-smooth hover:shadow-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary-glow" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{admin.totalOrders.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+22% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Pending Applications */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Pending Farmer Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApplications.map((application) => (
                <div key={application.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold">{application.name}</h3>
                    <p className="text-sm text-muted-foreground">{application.location}</p>
                    <p className="text-xs text-muted-foreground">Crops: {application.crops}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="default">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive">
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Manage farmer and consumer accounts, verify profiles.
              </p>
              <Button variant="hero" className="w-full">
                Manage Users
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-secondary" />
                Dispute Resolution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Handle disputes between farmers and consumers.
              </p>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="destructive">3 Active</Badge>
              </div>
              <Button variant="secondary" className="w-full">
                View Disputes
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-accent" />
                Platform Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                View detailed platform metrics and performance.
              </p>
              <Button variant="outline" className="w-full">
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                <div className="h-3 w-3 bg-primary rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Payment System</p>
                  <p className="text-xs text-muted-foreground">Operational</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                <div className="h-3 w-3 bg-primary rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Delivery Network</p>
                  <p className="text-xs text-muted-foreground">Operational</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg">
                <div className="h-3 w-3 bg-accent rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">AI Services</p>
                  <p className="text-xs text-muted-foreground">Maintenance</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}