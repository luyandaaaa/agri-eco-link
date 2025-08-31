import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { 
  MessageSquare, 
  Users, 
  Plus, 
  ThumbsUp, 
  MessageCircle,
  Search,
  Tractor,
  Handshake,
  Star,
  Send,
  Heart
} from "lucide-react";
import { FarmerLayout } from "@/components/layouts/FarmerLayout";

export default function CommunityForum() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Thabo Mokoena",
      location: "Limpopo",
      title: "Best practices for organic pest control?",
      content: "I'm looking for natural ways to control aphids on my vegetables. What has worked for your farms?",
      category: "Pest Management",
      likes: 12,
      replies: 8,
      timeAgo: "2 hours ago",
      tags: ["organic", "pest-control", "vegetables"]
    },
    {
      id: 2,
      author: "Sarah van der Merwe", 
      location: "Western Cape",
      title: "Bulk fertilizer order - Stellenbosch area",
      content: "Looking to organize a group purchase of organic fertilizer. Need 10+ farmers to make it worthwhile.",
      category: "Group Orders",
      likes: 18,
      replies: 15,
      timeAgo: "5 hours ago",
      tags: ["fertilizer", "group-buy", "western-cape"]
    },
    {
      id: 3,
      author: "James Nkomo",
      location: "KwaZulu-Natal",
      title: "Sharing my drought recovery story",
      content: "After the 2023 drought, here's how I rebuilt my farm and what I learned about water conservation...",
      category: "Success Stories",
      likes: 34,
      replies: 22,
      timeAgo: "1 day ago",
      tags: ["drought", "recovery", "water-conservation"]
    }
  ]);

  const [mentors] = useState([
    {
      id: 1,
      name: "Nomsa Dube",
      location: "Mpumalanga",
      specialty: "Organic Farming",
      experience: "15 years",
      mentees: 23,
      rating: 4.9,
      availability: "Available"
    },
    {
      id: 2,
      name: "Pieter Botha",
      location: "Free State", 
      specialty: "Water Management",
      experience: "20 years",
      mentees: 31,
      rating: 4.8,
      availability: "Busy"
    },
    {
      id: 3,
      name: "Zanele Mthembu",
      location: "Eastern Cape",
      specialty: "Market Access",
      experience: "12 years", 
      mentees: 18,
      rating: 4.7,
      availability: "Available"
    }
  ]);

  const [toolRentals] = useState([
    {
      id: 1,
      tool: "Tractor - John Deere 5075E",
      owner: "Mthembu Farm Equipment",
      location: "East London, Eastern Cape",
      rate: "R450/day",
      availability: "Available",
      rating: 4.8,
      description: "75HP tractor with loader, perfect for small to medium farms"
    },
    {
      id: 2,
      tool: "Irrigation System - Drip Kit",
      owner: "Green Valley Supplies",
      location: "Port Elizabeth, Eastern Cape", 
      rate: "R120/day",
      availability: "Available",
      rating: 4.6,
      description: "Complete drip irrigation setup for 1-hectare coverage"
    }
  ]);

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "",
    tags: ""
  });

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) {
      toast({
        title: "Error",
        description: "Please fill in title and content",
        variant: "destructive"
      });
      return;
    }

    const post = {
      id: Date.now(),
      author: "Lindiwe Mthembu",
      location: "Eastern Cape",
      title: newPost.title,
      content: newPost.content,
      category: newPost.category || "General",
      likes: 0,
      replies: 0,
      timeAgo: "Just now",
      tags: newPost.tags.split(",").map(tag => tag.trim()).filter(Boolean)
    };

    setPosts([post, ...posts]);
    setNewPost({ title: "", content: "", category: "", tags: "" });
    toast({
      title: "Post Created",
      description: "Your post has been shared with the community!",
    });
  };

  const handleLikePost = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleRequestMentorship = (mentorName) => {
    toast({
      title: "Mentorship Request Sent",
      description: `Your request has been sent to ${mentorName}. They will contact you soon.`,
    });
  };

  const handleRequestRental = (toolName) => {
    toast({
      title: "Rental Request Sent",
      description: `Your rental request for ${toolName} has been sent to the owner.`,
    });
  };

  const handleJoinGroupOrder = (orderName) => {
    toast({
      title: "Joined Group Order",
      description: `You've successfully joined the ${orderName} group order.`,
    });
  };

  return (
    <FarmerLayout currentPage="Community Forum">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Community Forum 💬</h1>
            <p className="text-muted-foreground">
              Connect, learn, and collaborate with fellow farmers
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Post
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">342</p>
                  <p className="text-sm text-muted-foreground">Active Discussions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">1,247</p>
                  <p className="text-sm text-muted-foreground">Community Members</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Handshake className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">89</p>
                  <p className="text-sm text-muted-foreground">Mentorship Pairs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary-glow/10 rounded-lg">
                  <Tractor className="h-6 w-6 text-primary-glow" />
                </div>
                <div>
                  <p className="text-2xl font-bold">45</p>
                  <p className="text-sm text-muted-foreground">Tools Available</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search discussions, tools, mentors..." 
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="discussions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
            <TabsTrigger value="tools">Tool Rentals</TabsTrigger>
            <TabsTrigger value="groups">Group Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="discussions">
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id} className="shadow-card">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{post.title}</h3>
                          <Badge variant="secondary">{post.category}</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <span className="font-medium">{post.author}</span>
                          <span>•</span>
                          <span>{post.location}</span>
                          <span>•</span>
                          <span>{post.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{post.content}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          {post.replies} replies
                        </Button>
                      </div>
                      <Button variant="outline" size="sm">
                        View Discussion
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mentorship">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mentors.map((mentor) => (
                <Card key={mentor.id} className="shadow-card">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{mentor.name}</h3>
                        <p className="text-sm text-muted-foreground">{mentor.location}</p>
                        <p className="text-sm text-primary font-medium">{mentor.specialty}</p>
                      </div>
                      <Badge variant={mentor.availability === 'Available' ? 'default' : 'secondary'}>
                        {mentor.availability}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span>Experience:</span>
                        <span className="font-medium">{mentor.experience}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Mentees:</span>
                        <span className="font-medium">{mentor.mentees} farmers</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Rating:</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current text-secondary" />
                          <span className="font-medium">{mentor.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1" disabled={mentor.availability !== 'Available'}>
                        Request Mentorship
                      </Button>
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tools">
            <div className="space-y-6">
              {toolRentals.map((tool) => (
                <Card key={tool.id} className="shadow-card">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{tool.tool}</h3>
                        <p className="text-sm text-muted-foreground">{tool.owner}</p>
                        <p className="text-sm text-muted-foreground">{tool.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">{tool.rate}</p>
                        <Badge variant="default">{tool.availability}</Badge>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{tool.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-current text-secondary" />
                        <span className="text-sm">{tool.rating}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button size="sm">
                          Request Rental
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="groups">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Active Group Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">Organic Fertilizer - Western Cape</h3>
                      <Badge variant="secondary">8/10 farmers</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Bulk purchase of organic compost. Need 2 more farmers to reach minimum order.
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Organizer: Sarah van der Merwe</span>
                      <Button size="sm" variant="outline">
                        Join Group
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">Seeds Bulk Order - Eastern Cape</h3>
                      <Badge variant="default">Complete</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Heritage vegetable seeds for spring planting. Order completed successfully.
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Organizer: Zanele Mthembu</span>
                      <Button size="sm" variant="outline" disabled>
                        Order Closed
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </FarmerLayout>
  );
}