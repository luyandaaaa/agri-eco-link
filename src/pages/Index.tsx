import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthModal } from "@/components/auth/AuthModal";
import { UssdAccess } from "@/components/UssdAccess";
import { User, ShoppingCart, Shield, Phone, Leaf, Users, Star, Award } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"farmer" | "consumer" | "admin">("farmer");

  useEffect(() => {
    const token = localStorage.getItem("farm2city_token");
    const role = localStorage.getItem("farm2city_role");
    
    if (token && role) {
      switch (role) {
        case "farmer":
          navigate("/farmer-dashboard");
          break;
        case "consumer":
          navigate("/consumer-dashboard");
          break;
        case "admin":
          navigate("/admin-dashboard");
          break;
      }
    }
  }, [navigate]);

  const handleRoleSelect = (role: "farmer" | "consumer" | "admin") => {
    setSelectedRole(role);
    setShowAuthModal(true);
  };

  const handleAuth = (token: string, role: string) => {
    switch (role) {
      case "farmer":
        navigate("/farmer-dashboard");
        break;
      case "consumer":
        navigate("/consumer-dashboard");
        break;
      case "admin":
        navigate("/admin-dashboard");
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url('/src/assets/farm-landscape-bg.jpg')`
        }}
      />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <Leaf className="h-5 w-5 text-primary" />
                <span className="text-primary font-medium">Connecting Farms to Cities</span>
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="gradient-hero bg-clip-text text-transparent">Farm2City</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Bridging the gap between small-scale farmers and urban consumers. 
              Fresh produce, fair prices, sustainable communities.
            </p>

            {/* Role Selection Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card 
                className="shadow-card transition-smooth hover:shadow-glow cursor-pointer group bg-card/90 backdrop-blur-sm"
                onClick={() => handleRoleSelect("farmer")}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-smooth">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">🧑‍🌾 Farmer Portal</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Manage your produce, connect with buyers, and grow your farming business.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• List and sell your produce</li>
                    <li>• AI crop health monitoring</li>
                    <li>• Smart delivery matching</li>
                    <li>• Agricultural insights</li>
                  </ul>
                </CardContent>
              </Card>

              <Card 
                className="shadow-card transition-smooth hover:shadow-glow cursor-pointer group bg-card/90 backdrop-blur-sm"
                onClick={() => handleRoleSelect("consumer")}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-secondary/10 rounded-full w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-smooth">
                    <ShoppingCart className="h-8 w-8 text-secondary" />
                  </div>
                  <CardTitle className="text-2xl">🛒 Consumer Portal</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Buy fresh, local produce directly from farmers in your area.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Fresh local produce marketplace</li>
                    <li>• Crop analysis & nutrition info</li>
                    <li>• Meet your local farmers</li>
                    <li>• AI-powered recommendations</li>
                  </ul>
                </CardContent>
              </Card>

              <Card 
                className="shadow-card transition-smooth hover:shadow-glow cursor-pointer group bg-card/90 backdrop-blur-sm"
                onClick={() => handleRoleSelect("admin")}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-accent/10 rounded-full w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-smooth">
                    <Shield className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle className="text-2xl">🧑‍💼 Admin Portal</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Manage the platform, verify farmers, and ensure smooth operations.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• User management & verification</li>
                    <li>• Dispute resolution</li>
                    <li>• Platform analytics</li>
                    <li>• System monitoring</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Offline Mode Button */}
            <div className="mb-12">
              <UssdAccess />
            </div>
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onAuth={handleAuth}
      />
    </div>
  );
};

export default Index;
