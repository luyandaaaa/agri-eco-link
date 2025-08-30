import { useState } from "react";
import { ConsumerLayout } from "@/components/layouts/ConsumerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Gift, 
  Star, 
  Coins, 
  Calendar, 
  Award,
  ShoppingCart,
  Users,
  Target,
  Zap
} from "lucide-react";
import { toast } from "sonner";

interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  category: "discount" | "product" | "experience" | "exclusive";
  value: string;
  available: boolean;
  expiresAt?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  maxProgress: number;
  completed: boolean;
  pointsReward: number;
}

interface Transaction {
  id: string;
  type: "earned" | "redeemed";
  points: number;
  description: string;
  date: string;
}

export default function FarmRewards() {
  const [userPoints] = useState(1240);
  const [currentTier] = useState("Gold");
  const [nextTierPoints] = useState(1500);

  const [rewards] = useState<Reward[]>([
    {
      id: "1",
      title: "10% Off Next Order",
      description: "Save 10% on your next purchase of $50 or more",
      pointsCost: 500,
      category: "discount",
      value: "10% off",
      available: true,
      expiresAt: "2024-12-31"
    },
    {
      id: "2", 
      title: "Free Premium Organic Box",
      description: "Get a free box of premium organic vegetables",
      pointsCost: 1000,
      category: "product",
      value: "$35 value",
      available: true
    },
    {
      id: "3",
      title: "Farm Visit Experience",
      description: "Exclusive guided tour of partner farms",
      pointsCost: 2000,
      category: "experience",
      value: "Priceless",
      available: true
    },
    {
      id: "4",
      title: "Early Access Sale",
      description: "24-hour early access to seasonal sales",
      pointsCost: 300,
      category: "exclusive",
      value: "Exclusive",
      available: true
    },
    {
      id: "5",
      title: "Free Delivery for Month",
      description: "Unlimited free delivery for 30 days",
      pointsCost: 800,
      category: "discount",
      value: "$50 value",
      available: false
    }
  ]);

  const [achievements] = useState<Achievement[]>([
    {
      id: "1",
      title: "First Purchase",
      description: "Complete your first order",
      icon: "🛒",
      progress: 1,
      maxProgress: 1,
      completed: true,
      pointsReward: 100
    },
    {
      id: "2",
      title: "Loyal Customer",
      description: "Complete 10 orders",
      icon: "⭐",
      progress: 8,
      maxProgress: 10,
      completed: false,
      pointsReward: 500
    },
    {
      id: "3",
      title: "Organic Enthusiast",
      description: "Purchase 20 organic products",
      icon: "🌱",
      progress: 15,
      maxProgress: 20,
      completed: false,
      pointsReward: 300
    },
    {
      id: "4",
      title: "Community Member",
      description: "Follow 5 farmers",
      icon: "👥",
      progress: 3,
      maxProgress: 5,
      completed: false,
      pointsReward: 200
    },
    {
      id: "5",
      title: "Review Champion",
      description: "Leave 15 product reviews",
      icon: "📝",
      progress: 12,
      maxProgress: 15,
      completed: false,
      pointsReward: 400
    },
    {
      id: "6",
      title: "Big Spender",
      description: "Spend $500 in total",
      icon: "💎",
      progress: 486,
      maxProgress: 500,
      completed: false,
      pointsReward: 1000
    }
  ]);

  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "earned",
      points: 50,
      description: "Order completion bonus",
      date: "2024-08-30"
    },
    {
      id: "2",
      type: "earned",
      points: 100,
      description: "Product review reward",
      date: "2024-08-29"
    },
    {
      id: "3",
      type: "redeemed",
      points: -500,
      description: "10% discount coupon",
      date: "2024-08-28"
    },
    {
      id: "4",
      type: "earned",
      points: 25,
      description: "Daily login bonus",
      date: "2024-08-27"
    }
  ]);

  const redeemReward = (rewardId: string) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (reward && reward.available && userPoints >= reward.pointsCost) {
      toast.success(`${reward.title} redeemed successfully!`);
    } else if (!reward?.available) {
      toast.error("This reward is currently unavailable");
    } else {
      toast.error("Insufficient points to redeem this reward");
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "discount": return <Gift className="h-4 w-4" />;
      case "product": return <ShoppingCart className="h-4 w-4" />;
      case "experience": return <Star className="h-4 w-4" />;
      case "exclusive": return <Award className="h-4 w-4" />;
      default: return <Gift className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "discount": return "bg-blue-100 text-blue-800";
      case "product": return "bg-green-100 text-green-800";
      case "experience": return "bg-purple-100 text-purple-800";
      case "exclusive": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const tierProgress = (userPoints / nextTierPoints) * 100;

  return (
    <ConsumerLayout currentPage="FarmRewards">
      <div className="min-h-screen bg-muted/30 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">FarmRewards 🏆</h1>
            <p className="text-muted-foreground">
              Earn points and unlock exclusive rewards for your loyalty
            </p>
          </div>

          {/* Points Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="shadow-card bg-gradient-to-br from-primary/10 to-primary/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <Coins className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary">{userPoints.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Available Points</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card bg-gradient-to-br from-secondary/10 to-secondary/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-secondary/20 rounded-lg">
                    <Trophy className="h-8 w-8 text-secondary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-secondary">{currentTier}</p>
                    <p className="text-sm text-muted-foreground">Current Tier</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Progress to Platinum</span>
                    <span className="text-sm text-muted-foreground">
                      {userPoints}/{nextTierPoints}
                    </span>
                  </div>
                  <Progress value={tierProgress} className="h-3" />
                  <p className="text-xs text-muted-foreground">
                    {nextTierPoints - userPoints} points until next tier
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="rewards" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="tiers">Tiers</TabsTrigger>
            </TabsList>

            <TabsContent value="rewards" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rewards.map((reward) => (
                  <Card key={reward.id} className={`shadow-card ${!reward.available ? 'opacity-60' : ''}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2 text-lg">
                            {getCategoryIcon(reward.category)}
                            {reward.title}
                          </CardTitle>
                          <Badge 
                            variant="secondary" 
                            className={`mt-2 ${getCategoryColor(reward.category)}`}
                          >
                            {reward.category.charAt(0).toUpperCase() + reward.category.slice(1)}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">{reward.pointsCost}</p>
                          <p className="text-xs text-muted-foreground">points</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{reward.description}</p>
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="outline">{reward.value}</Badge>
                        {reward.expiresAt && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            Expires {new Date(reward.expiresAt).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                      <Button 
                        className="w-full"
                        disabled={!reward.available || userPoints < reward.pointsCost}
                        onClick={() => redeemReward(reward.id)}
                      >
                        {!reward.available ? 'Unavailable' : 
                         userPoints < reward.pointsCost ? 'Insufficient Points' : 'Redeem'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement) => (
                  <Card key={achievement.id} className={`shadow-card ${achievement.completed ? 'bg-primary/5 border-primary/20' : ''}`}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <CardTitle className="flex items-center gap-2">
                            {achievement.title}
                            {achievement.completed && (
                              <Badge variant="default" className="bg-primary">
                                <Award className="h-3 w-3 mr-1" />
                                Completed
                              </Badge>
                            )}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">+{achievement.pointsReward}</p>
                          <p className="text-xs text-muted-foreground">points</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm text-muted-foreground">
                            {achievement.progress}/{achievement.maxProgress}
                          </span>
                        </div>
                        <Progress 
                          value={(achievement.progress / achievement.maxProgress) * 100} 
                          className="h-2"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-6 mt-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Points History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            transaction.type === 'earned' 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-red-100 text-red-600'
                          }`}>
                            {transaction.type === 'earned' ? (
                              <Zap className="h-4 w-4" />
                            ) : (
                              <Gift className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(transaction.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className={`text-lg font-bold ${
                          transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'earned' ? '+' : ''}{transaction.points}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tiers" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: "Bronze", points: 0, color: "bg-orange-100 text-orange-800", benefits: ["5% cashback", "Basic support"] },
                  { name: "Silver", points: 500, color: "bg-gray-100 text-gray-800", benefits: ["7% cashback", "Priority support", "Monthly bonus"] },
                  { name: "Gold", points: 1000, color: "bg-yellow-100 text-yellow-800", benefits: ["10% cashback", "Premium support", "Exclusive rewards"], current: true },
                  { name: "Platinum", points: 1500, color: "bg-purple-100 text-purple-800", benefits: ["15% cashback", "VIP support", "Early access", "Farm visits"] }
                ].map((tier) => (
                  <Card key={tier.name} className={`shadow-card ${tier.current ? 'ring-2 ring-primary' : ''}`}>
                    <CardHeader>
                      <div className="text-center">
                        <Badge className={`${tier.color} mb-2`}>
                          {tier.name}
                          {tier.current && " (Current)"}
                        </Badge>
                        <p className="text-2xl font-bold">{tier.points}+</p>
                        <p className="text-sm text-muted-foreground">points required</p>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <h4 className="font-medium">Benefits:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {tier.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <Target className="h-3 w-3" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>How to Earn Points</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { action: "Complete an order", points: "50-200", icon: <ShoppingCart className="h-5 w-5" /> },
                      { action: "Write a product review", points: "25", icon: <Star className="h-5 w-5" /> },
                      { action: "Refer a friend", points: "500", icon: <Users className="h-5 w-5" /> },
                      { action: "Follow a farmer", points: "10", icon: <Users className="h-5 w-5" /> },
                      { action: "Daily login", points: "5", icon: <Calendar className="h-5 w-5" /> },
                      { action: "Complete achievements", points: "100-1000", icon: <Trophy className="h-5 w-5" /> }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                          {item.icon}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{item.action}</p>
                          <p className="text-xs text-muted-foreground">+{item.points} points</p>
                        </div>
                      </div>
                    ))}
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