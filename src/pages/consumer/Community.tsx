import { useState } from "react";
import { ConsumerLayout } from "@/components/layouts/ConsumerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MapPin, 
  Calendar, 
  Users, 
  Search,
  Camera,
  Award
} from "lucide-react";
import { toast } from "sonner";
import farmersImg from "@/assets/farmers-tech.jpg";

interface FarmerProfile {
  id: string;
  name: string;
  farm: string;
  location: string;
  image: string;
  bio: string;
  specialties: string[];
  rating: number;
  followers: number;
  verified: boolean;
  joinDate: string;
}

interface CommunityPost {
  id: string;
  farmer: FarmerProfile;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  liked: boolean;
}

interface Event {
  id: string;
  title: string;
  organizer: string;
  date: string;
  location: string;
  description: string;
  attendees: number;
  maxAttendees?: number;
}

export default function Community() {
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: "1",
      farmer: {
        id: "1",
        name: "Sarah Johnson",
        farm: "Green Valley Farm",
        location: "Sacramento, CA",
        image: "",
        bio: "Organic farming specialist with 15 years experience",
        specialties: ["Organic Vegetables", "Herbs", "Sustainable Farming"],
        rating: 4.9,
        followers: 1247,
        verified: true,
        joinDate: "2022-03-15"
      },
      content: "Just harvested our first batch of heirloom tomatoes this season! The weather has been perfect for growing. These beauties will be available at the farmers market this weekend. 🍅✨",
      image: farmersImg,
      likes: 156,
      comments: 23,
      shares: 12,
      timestamp: "2 hours ago",
      liked: false
    },
    {
      id: "2",
      farmer: {
        id: "2",
        name: "Miguel Rodriguez",
        farm: "Sunny Acres",
        location: "Fresno, CA",
        image: "",
        bio: "Third-generation farmer specializing in citrus and stone fruits",
        specialties: ["Citrus Fruits", "Stone Fruits", "Traditional Methods"],
        rating: 4.8,
        followers: 892,
        verified: true,
        joinDate: "2021-11-08"
      },
      content: "Sharing some wisdom from my grandfather: 'The best fertilizer is the farmer's footsteps.' Walking through the orchards daily helps you understand what your trees need. What's your favorite farming wisdom?",
      likes: 203,
      comments: 45,
      shares: 28,
      timestamp: "5 hours ago",
      liked: true
    }
  ]);

  const [events] = useState<Event[]>([
    {
      id: "1",
      title: "Sustainable Farming Workshop",
      organizer: "Farm2City Community",
      date: "2024-09-15",
      location: "Community Center, Sacramento",
      description: "Learn about sustainable farming practices and modern agricultural techniques",
      attendees: 45,
      maxAttendees: 60
    },
    {
      id: "2",
      title: "Harvest Festival",
      organizer: "Local Farmers Alliance",
      date: "2024-09-22",
      location: "Central Park, Downtown",
      description: "Celebrate the harvest season with local farmers, fresh produce, and community activities",
      attendees: 234,
      maxAttendees: 500
    }
  ]);

  const featuredFarmers: FarmerProfile[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      farm: "Green Valley Farm",
      location: "Sacramento, CA",
      image: "",
      bio: "Organic farming specialist with 15 years experience",
      specialties: ["Organic Vegetables", "Herbs", "Sustainable Farming"],
      rating: 4.9,
      followers: 1247,
      verified: true,
      joinDate: "2022-03-15"
    },
    {
      id: "2",
      name: "Miguel Rodriguez",
      farm: "Sunny Acres",
      location: "Fresno, CA",
      image: "",
      bio: "Third-generation farmer specializing in citrus and stone fruits",
      specialties: ["Citrus Fruits", "Stone Fruits", "Traditional Methods"],
      rating: 4.8,
      followers: 892,
      verified: true,
      joinDate: "2021-11-08"
    },
    {
      id: "3",
      name: "Emily Chen",
      farm: "Riverside Gardens",
      location: "Stockton, CA",
      image: "",
      bio: "Innovative farmer using technology for precision agriculture",
      specialties: ["Leafy Greens", "Tech Integration", "Hydroponic Systems"],
      rating: 4.7,
      followers: 634,
      verified: true,
      joinDate: "2023-01-20"
    }
  ];

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handleComment = (postId: string) => {
    toast.success("Comment feature coming soon!");
  };

  const handleShare = (postId: string) => {
    toast.success("Post shared to your feed!");
  };

  const handleFollow = (farmerId: string) => {
    toast.success("Following farmer!");
  };

  const joinEvent = (eventId: string) => {
    toast.success("Successfully joined event!");
  };

  return (
    <ConsumerLayout currentPage="Community">
      <div className="min-h-screen bg-muted/30 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Community 👥</h1>
            <p className="text-muted-foreground">
              Connect with local farmers and discover their stories
            </p>
          </div>

          <Tabs defaultValue="feed" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="feed">Community Feed</TabsTrigger>
              <TabsTrigger value="farmers">Farmers</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="stories">Stories</TabsTrigger>
            </TabsList>

            <TabsContent value="feed" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {posts.map((post) => (
                    <Card key={post.id} className="shadow-card">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={post.farmer.image} />
                            <AvatarFallback>
                              {post.farmer.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{post.farmer.name}</h3>
                              {post.farmer.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  <Award className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{post.farmer.farm}</p>
                            <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">{post.content}</p>
                        {post.image && (
                          <img 
                            src={post.image} 
                            alt="Post content" 
                            className="w-full h-64 object-cover rounded-lg mb-4"
                          />
                        )}
                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex items-center gap-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleLike(post.id)}
                              className={`flex items-center gap-1 ${post.liked ? 'text-red-500' : ''}`}
                            >
                              <Heart className={`h-4 w-4 ${post.liked ? 'fill-red-500' : ''}`} />
                              {post.likes}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleComment(post.id)}
                              className="flex items-center gap-1"
                            >
                              <MessageCircle className="h-4 w-4" />
                              {post.comments}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleShare(post.id)}
                              className="flex items-center gap-1"
                            >
                              <Share2 className="h-4 w-4" />
                              {post.shares}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="space-y-6">
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle className="text-lg">Featured Farmers</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {featuredFarmers.slice(0, 3).map((farmer) => (
                        <div key={farmer.id} className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={farmer.image} />
                            <AvatarFallback>
                              {farmer.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{farmer.name}</p>
                            <p className="text-xs text-muted-foreground">{farmer.farm}</p>
                          </div>
                          <Button size="sm" variant="outline" onClick={() => handleFollow(farmer.id)}>
                            Follow
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle className="text-lg">Upcoming Events</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {events.slice(0, 2).map((event) => (
                        <div key={event.id} className="p-3 border rounded-lg">
                          <h4 className="font-medium text-sm">{event.title}</h4>
                          <p className="text-xs text-muted-foreground mb-2">
                            {new Date(event.date).toLocaleDateString()}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </div>
                          <Button size="sm" className="w-full" onClick={() => joinEvent(event.id)}>
                            Join Event
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="farmers" className="space-y-6 mt-6">
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search farmers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredFarmers.map((farmer) => (
                  <Card key={farmer.id} className="shadow-card">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={farmer.image} />
                          <AvatarFallback className="text-lg">
                            {farmer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{farmer.name}</h3>
                            {farmer.verified && (
                              <Badge variant="secondary" className="text-xs">
                                <Award className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{farmer.farm}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {farmer.location}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{farmer.bio}</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {farmer.specialties.map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {farmer.followers}
                          </div>
                          <div>⭐ {farmer.rating}</div>
                        </div>
                        <Button size="sm" onClick={() => handleFollow(farmer.id)}>
                          Follow
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="events" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map((event) => (
                  <Card key={event.id} className="shadow-card">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {event.title}
                        <Badge variant="outline">
                          {event.attendees}/{event.maxAttendees || '∞'}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {new Date(event.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          Organized by {event.organizer}
                        </div>
                        <p className="text-sm">{event.description}</p>
                        <Button 
                          className="w-full" 
                          onClick={() => joinEvent(event.id)}
                          disabled={event.maxAttendees ? event.attendees >= event.maxAttendees : false}
                        >
                          {event.maxAttendees && event.attendees >= event.maxAttendees ? 'Event Full' : 'Join Event'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="stories" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="shadow-card">
                  <div className="relative">
                    <img 
                      src={farmersImg} 
                      alt="Farm story" 
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary">Featured</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">From City to Farm: A Journey</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      How Sarah left her corporate job to start Green Valley Farm and became one of the region's most successful organic farmers.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">SJ</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">Sarah Johnson</span>
                      </div>
                      <Button variant="outline" size="sm">Read More</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <div className="relative">
                    <img 
                      src={farmersImg} 
                      alt="Farm story" 
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">Three Generations of Farming</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      Miguel shares the wisdom passed down through three generations of his family's farming tradition and how they've adapted to modern challenges.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">MR</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">Miguel Rodriguez</span>
                      </div>
                      <Button variant="outline" size="sm">Read More</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <div className="relative">
                    <img 
                      src={farmersImg} 
                      alt="Farm story" 
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">Tech Meets Tradition</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      Emily's innovative approach to farming combines cutting-edge technology with sustainable practices to maximize yield while protecting the environment.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">EC</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">Emily Chen</span>
                      </div>
                      <Button variant="outline" size="sm">Read More</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ConsumerLayout>
  );
}