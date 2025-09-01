import { useState } from "react";
import { ConsumerLayout } from "@/components/layouts/ConsumerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  ShoppingCart, 
  TrendingUp, 
  Heart, 
  Calendar, 
  MapPin,
  Sparkles,
  ChefHat,
  Leaf,
  Clock,
  Star,
  Target
} from "lucide-react";
import { toast } from "sonner";
import tomatoesImg from "@/assets/products/tomatoes.jpg";
import carrotsImg from "@/assets/products/carrots.jpg";
import lettuceImg from "@/assets/products/lettuce.jpg";
import applesImg from "@/assets/products/apples.jpg";

interface Recommendation {
  id: string;
  type: "product" | "recipe" | "seasonal" | "health";
  title: string;
  description: string;
  confidence: number;
  image?: string;
  action?: string;
}

interface PredictiveInsight {
  id: string;
  category: string;
  insight: string;
  impact: "high" | "medium" | "low";
  timeframe: string;
}

export default function AIFeatures() {
  const [userPreferences] = useState({
    dietaryRestrictions: ["Vegetarian"],
    allergies: [],
    preferredCuisines: ["Mediterranean", "Asian"],
    healthGoals: ["Weight Management", "Increase Fiber"]
  });

  const [recommendations] = useState<Recommendation[]>([
    {
      id: "1",
      type: "product",
      title: "Perfect for Your Mediterranean Diet",
      description: "Fresh organic tomatoes from Green Valley Farm - ideal for your favorite Mediterranean recipes",
      confidence: 92,
      image: tomatoesImg,
      action: "Add to Cart"
    },
    {
      id: "2",
      type: "recipe",
      title: "Carrot Ginger Soup Recipe",
      description: "Based on your recent carrot purchases, try this warming soup perfect for the season",
      confidence: 87,
      image: carrotsImg,
      action: "View Recipe"
    },
    {
      id: "3",
      type: "seasonal",
      title: "Fall Harvest Recommendations",
      description: "Seasonal produce now available from your favorite local farmers",
      confidence: 95,
      action: "Explore Seasonal"
    },
    {
      id: "4",
      type: "health",
      title: "Fiber-Rich Options for You",
      description: "These high-fiber vegetables align with your health goals",
      confidence: 89,
      image: lettuceImg,
      action: "Learn More"
    }
  ]);

  const [insights] = useState<PredictiveInsight[]>([
    {
      id: "1",
      category: "Shopping Patterns",
      insight: "You typically restock vegetables every 5-7 days. Next restock predicted for tomorrow.",
      impact: "high",
      timeframe: "24 hours"
    },
    {
      id: "2",
      category: "Seasonal Trends",
      insight: "Apple season is starting. Prices will be lowest in 2-3 weeks.",
      impact: "medium",
      timeframe: "2-3 weeks"
    },
    {
      id: "3",
      category: "Health Optimization",
      insight: "Adding cruciferous vegetables could boost your fiber intake by 25%.",
      impact: "high",
      timeframe: "Immediate"
    },
    {
      id: "4",
      category: "Budget Optimization",
      insight: "Switching to bulk purchases could save you $15/month.",
      impact: "medium",
      timeframe: "Monthly"
    }
  ]);

  const [chatHistory, setChatHistory] = useState([
    { role: "assistant", content: "Hi! I'm your AI nutrition assistant. How can I help you today?" },
    { role: "user", content: "What vegetables should I eat for better energy?" },
    { role: "assistant", content: "For sustained energy, I recommend iron-rich leafy greens like spinach, complex carbs from sweet potatoes, and B-vitamin rich vegetables like bell peppers. Based on your location, I can show you local farmers who have these available fresh!" }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    setChatHistory(prev => [...prev, { role: "user", content: newMessage }]);
    setNewMessage("");
    
    // Simulate AI response
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        role: "assistant", 
        content: "That's a great question! Based on your preferences and recent purchases, I recommend..." 
      }]);
    }, 1000);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case "product": return <ShoppingCart className="h-5 w-5" />;
      case "recipe": return <ChefHat className="h-5 w-5" />;
      case "seasonal": return <Leaf className="h-5 w-5" />;
      case "health": return <Heart className="h-5 w-5" />;
      default: return <Brain className="h-5 w-5" />;
    }
  };

  return (
    <ConsumerLayout currentPage="AI Features">
      <div className="min-h-screen bg-muted/30 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              AI Features ✨
              <Sparkles className="h-8 w-8 text-primary" />
            </h1>
            <p className="text-muted-foreground">
              Personalized recommendations and insights powered by artificial intelligence
            </p>
          </div>

          <Tabs defaultValue="recommendations" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="recommendations">Smart Recommendations</TabsTrigger>
              <TabsTrigger value="insights">Predictive Insights</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition Assistant</TabsTrigger>
              <TabsTrigger value="optimizer">Shopping Optimizer</TabsTrigger>
            </TabsList>

            <TabsContent value="recommendations" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="shadow-card mb-6">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5" />
                        Personalized for You
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Based on your preferences, purchase history, and dietary goals
                      </p>
                    </CardHeader>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {recommendations.map((rec) => (
                      <Card key={rec.id} className="shadow-card">
                        <div className="relative">
                          {rec.image && (
                            <img 
                              src={rec.image} 
                              alt={rec.title}
                              className="w-full h-32 object-cover rounded-t-lg"
                            />
                          )}
                          <div className="absolute top-2 right-2">
                            <Badge variant="secondary" className="bg-primary text-primary-foreground">
                              {rec.confidence}% match
                            </Badge>
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-lg">
                            {getRecommendationIcon(rec.type)}
                            {rec.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">{rec.description}</p>
                          {rec.action && (
                            <Button 
                              className="w-full"
                              onClick={() => {
                                if (rec.action === "Add to Cart") {
                                  toast.success(`${rec.title.split(' ')[0]} added to cart!`);
                                } else if (rec.action === "View Recipe") {
                                  // Show full recipe
                                  toast.success("Opening full recipe...");
                                } else {
                                  toast.success(`${rec.action} clicked!`);
                                }
                              }}
                            >
                              {rec.action}
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle className="text-lg">Your Preferences</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">Dietary Restrictions</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {userPreferences.dietaryRestrictions.map((diet, index) => (
                            <Badge key={index} variant="outline">{diet}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Preferred Cuisines</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {userPreferences.preferredCuisines.map((cuisine, index) => (
                            <Badge key={index} variant="outline">{cuisine}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Health Goals</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {userPreferences.healthGoals.map((goal, index) => (
                            <Badge key={index} variant="outline">{goal}</Badge>
                          ))}
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        Update Preferences
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle className="text-lg">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        View Trending Products
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Calendar className="h-4 w-4 mr-2" />
                        Seasonal Suggestions
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <MapPin className="h-4 w-4 mr-2" />
                        Nearby Farmers
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6 mt-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Predictive Insights
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    AI-powered insights to optimize your shopping and health goals
                  </p>
                </CardHeader>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {insights.map((insight) => (
                  <Card key={insight.id} className="shadow-card">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{insight.category}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getImpactColor(insight.impact)}>
                            {insight.impact} impact
                          </Badge>
                          <Badge variant="outline">
                            <Clock className="h-3 w-3 mr-1" />
                            {insight.timeframe}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{insight.insight}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Weekly Insights Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-primary mb-1">3.2%</div>
                      <div className="text-sm text-muted-foreground">Cost Savings This Week</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-secondary mb-1">87%</div>
                      <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-accent mb-1">15</div>
                      <div className="text-sm text-muted-foreground">Actions Recommended</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="nutrition" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5" />
                      Nutrition Assistant Chat
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Get personalized nutrition advice and meal planning help
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 h-64 overflow-y-auto mb-4 p-4 border rounded-lg">
                      {chatHistory.map((message, index) => (
                        <div 
                          key={index} 
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.role === 'user' 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Ask about nutrition, recipes, or health goals..."
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      />
                      <Button onClick={sendMessage}>Send</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Nutrition Goals Tracker
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { nutrient: "Fiber", current: 18, target: 25, unit: "g" },
                      { nutrient: "Vitamin C", current: 85, target: 90, unit: "mg" },
                      { nutrient: "Iron", current: 12, target: 18, unit: "mg" },
                      { nutrient: "Potassium", current: 2800, target: 4700, unit: "mg" }
                    ].map((goal, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{goal.nutrient}</span>
                          <span className="text-sm text-muted-foreground">
                            {goal.current}/{goal.target} {goal.unit}
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Suggested Meal Plans</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { meal: "Breakfast", suggestion: "Spinach & Tomato Omelet", calories: 320, prep: "10 min" },
                      { meal: "Lunch", suggestion: "Mediterranean Quinoa Bowl", calories: 450, prep: "15 min" },
                      { meal: "Dinner", suggestion: "Roasted Vegetable Medley", calories: 380, prep: "25 min" }
                    ].map((meal, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">{meal.meal}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{meal.suggestion}</p>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{meal.calories} cal</span>
                          <span>{meal.prep}</span>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full mt-2"
                          onClick={() => toast.success("Opening full recipe with ingredients and instructions...")}
                        >
                          View Recipe
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="optimizer" className="space-y-6 mt-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Smart Shopping Optimizer
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Optimize your shopping for best prices, freshness, and nutrition
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-lg font-bold text-primary mb-1">$47.20</div>
                      <div className="text-sm text-muted-foreground">Optimal Cart Value</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-lg font-bold text-secondary mb-1">15%</div>
                      <div className="text-sm text-muted-foreground">Potential Savings</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-lg font-bold text-accent mb-1">2.1 km</div>
                      <div className="text-sm text-muted-foreground">Avg. Distance</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-lg font-bold text-muted-foreground mb-1">24hrs</div>
                      <div className="text-sm text-muted-foreground">Avg. Freshness</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Price Optimization</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { product: "Organic Tomatoes", current: "$4.50", optimized: "$3.80", savings: "15%" },
                      { product: "Fresh Carrots", current: "$3.20", optimized: "$2.90", savings: "9%" },
                      { product: "Lettuce Heads", current: "$2.80", optimized: "$2.40", savings: "14%" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{item.product}</p>
                          <p className="text-xs text-muted-foreground">Current: {item.current}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">{item.optimized}</p>
                          <Badge variant="secondary" className="text-xs">
                            Save {item.savings}
                          </Badge>
                        </div>
                      </div>
                    ))}
                    <Button 
                      className="w-full"
                      onClick={() => toast.success("Optimizations applied! Updated items added to cart.")}
                    >
                      Apply Optimizations
                    </Button>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Delivery Optimization</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Recommended Delivery Time</h4>
                      <p className="text-2xl font-bold text-primary mb-1">Tomorrow 2-4 PM</p>
                      <p className="text-sm text-muted-foreground">
                        Best window for freshness and availability
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Consolidation Opportunity</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Combine with 3 nearby orders for carbon footprint reduction
                      </p>
                      <Badge variant="outline" className="text-xs">
                        -40% emissions
                      </Badge>
                    </div>
                    <Button variant="outline" className="w-full">
                      Schedule Optimized Delivery
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Weekly Shopping Pattern Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-7 gap-2 text-center">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                        <div key={day} className="p-2 border rounded">
                          <div className="text-xs font-medium">{day}</div>
                          <div className={`h-8 mt-1 rounded ${
                            index === 2 || index === 5 ? 'bg-primary' : 'bg-muted'
                          }`}></div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {index === 2 || index === 5 ? 'Peak' : 'Low'}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground text-center">
                      You typically shop on Wednesdays and Saturdays. Consider Tuesday for better prices.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ConsumerLayout>
  );
}