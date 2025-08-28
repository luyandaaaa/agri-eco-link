import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ConsumerLayout } from "@/components/layouts/ConsumerLayout";
import { 
  Search,
  ShoppingCart, 
  Scan, 
  Trophy, 
  MessageSquare, 
  Sparkles, 
  User, 
  LogOut,
  MapPin,
  Star,
  Heart,
  Filter
} from "lucide-react";

export default function ConsumerDashboard() {
  const navigate = useNavigate();
  const [consumer, setConsumer] = useState({
    name: "Sipho Ndlovu",
    location: "Johannesburg",
    farmPoints: 850,
    savedFarmers: 5,
    totalOrders: 23
  });

  useEffect(() => {
    const token = localStorage.getItem("farm2city_token");
    const role = localStorage.getItem("farm2city_role");
    
    if (!token || role !== "consumer") {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("farm2city_token");
    localStorage.removeItem("farm2city_role");
    navigate("/");
  };


  const featuredProducts = [
    {
      id: 1,
      name: "Organic Baby Spinach",
      farm: "Green Pastures Farm",
      price: 42.99,
      unit: "kg",
      distance: 9.2,
      rating: 4.8,
      reviews: 15,
      image: "🥬"
    },
    {
      id: 2,
      name: "Heritage Tomatoes",
      farm: "Sunrise Organics",
      price: 38.50,
      unit: "kg",
      distance: 12.5,
      rating: 4.9,
      reviews: 22,
      image: "🍅"
    },
    {
      id: 3,
      name: "Free-Range Eggs",
      farm: "Happy Hens Co-op",
      price: 65.00,
      unit: "dozen",
      distance: 15.8,
      rating: 4.7,
      reviews: 8,
      image: "🥚"
    },
    {
      id: 4,
      name: "Sweet Potatoes",
      farm: "Earth & Sky Farm",
      price: 28.90,
      unit: "kg",
      distance: 7.3,
      rating: 4.6,
      reviews: 12,
      image: "🍠"
    }
  ];

  return (
    <ConsumerLayout currentPage="Dashboard">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {consumer.name}! 🛒</h1>
          <p className="text-muted-foreground">
            Discover fresh produce from local farmers in {consumer.location}.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{consumer.farmPoints}</p>
                  <p className="text-sm text-muted-foreground">Farm Points</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <Heart className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{consumer.savedFarmers}</p>
                  <p className="text-sm text-muted-foreground">Saved Farmers</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <ShoppingCart className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{consumer.totalOrders}</p>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-card mb-8">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search for fresh produce..." 
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Nearby
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Featured Products */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Fresh from Local Farms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="shadow-card transition-smooth hover:shadow-glow">
                <CardContent className="p-0">
                  <div className="aspect-square bg-gradient-primary rounded-t-lg flex items-center justify-center text-6xl">
                    {product.image}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{product.farm}</p>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-secondary text-secondary" />
                        <span className="text-xs">{product.rating}</span>
                        <span className="text-xs text-muted-foreground">({product.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {product.distance}km
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold">R{product.price}</span>
                      <span className="text-sm text-muted-foreground">/ {product.unit}</span>
                    </div>
                    
                    <Button variant="hero" className="w-full" size="sm">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scan className="h-5 w-5 text-primary" />
                Crop Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Upload a photo to learn about nutritional value and find local suppliers.
              </p>
              <Button variant="secondary" className="w-full">
                Scan Now
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-secondary" />
                Meet the Farmers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Connect with local farmers and learn their stories.
              </p>
              <Button variant="outline" className="w-full">
                Browse Profiles
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Get personalized suggestions based on your preferences.
              </p>
              <Button variant="outline" className="w-full">
                Get Suggestions
              </Button>
            </CardContent>
          </Card>
        </div>
    </ConsumerLayout>
  );
}