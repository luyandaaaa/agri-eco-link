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
      tags: ["organic", "pest-control", "vegetables"],
      liked: false,
      repliesData: [
        { id: 1, author: "Nomsa Dube", content: "Try neem oil spray, works great for aphids!", timeAgo: "1 hour ago" },
        { id: 2, author: "Peter Smith", content: "Ladybugs are natural predators of aphids", timeAgo: "30 min ago" }
      ]
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
      tags: ["fertilizer", "group-buy", "western-cape"],
      liked: false,
      repliesData: [
        { id: 1, author: "Johan du Plessis", content: "I'm interested! What type of fertilizer?", timeAgo: "4 hours ago" }
      ]
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
      tags: ["drought", "recovery", "water-conservation"],
      liked: true,
      repliesData: [
        { id: 1, author: "Mary Johnson", content: "Inspiring story! Thanks for sharing your experience", timeAgo: "20 hours ago" }
      ]
    }
  ]);

  const [selectedPost, setSelectedPost] = useState(null);
  const [newReply, setNewReply] = useState("");
  const [groupOrders, setGroupOrders] = useState([
    {
      id: 1,
      title: "Organic Fertilizer - Western Cape",
      organizer: "Sarah van der Merwe",
      participants: 8,
      maxParticipants: 10,
      description: "Bulk purchase of organic compost. Need 2 more farmers to reach minimum order.",
      status: "Open",
      joined: false
    },
    {
      id: 2,
      title: "Seeds Bulk Order - Eastern Cape",
      organizer: "Zanele Mthembu",
      participants: 10,
      maxParticipants: 10,
      description: "Heritage vegetable seeds for spring planting. Order completed successfully.",
      status: "Complete",
      joined: true
    }
  ]);

  const [mentorRequests, setMentorRequests] = useState({});

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
      tags: newPost.tags.split(",").map(tag => tag.trim()).filter(Boolean),
      liked: false,
      repliesData: []
    };

    setPosts([post, ...posts]);
    setNewPost({ title: "", content: "", category: "", tags: "" });
    toast({
      title: "Post Created",
      description: "Your post has been shared with the community!",
    });
  };

  const handleLikePost = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newLiked = !post.liked;
        return { 
          ...post, 
          likes: newLiked ? post.likes + 1 : post.likes - 1,
          liked: newLiked
        };
      }
      return post;
    }));
  };

  const handleAddReply = (postId) => {
    if (!newReply.trim()) return;
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newReplyObj = {
          id: Date.now(),
          author: "Lindiwe Mthembu",
          content: newReply,
          timeAgo: "Just now"
        };
        return {
          ...post,
          replies: post.replies + 1,
          repliesData: [...post.repliesData, newReplyObj]
        };
      }
      return post;
    }));
    
    setNewReply("");
    toast({
      title: "Reply Added",
      description: "Your reply has been posted successfully!",
    });
  };

  const handleJoinGroup = (groupId) => {
    setGroupOrders(groupOrders.map(group => 
      group.id === groupId ? { ...group, joined: true, participants: group.participants + 1 } : group
    ));
    toast({
      title: "Joined Group Order",
      description: "You've successfully joined the group order!",
    });
  };

  const handleRequestMentorship = (mentorId, mentorName) => {
    setMentorRequests({...mentorRequests, [mentorId]: "requested"});
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
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
                <DialogDescription>Share your thoughts with the farming community</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="postTitle">Title</Label>
                  <Input 
                    id="postTitle" 
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    placeholder="What's your question or topic?"
                  />
                </div>
                <div>
                  <Label htmlFor="postContent">Content</Label>
                  <Textarea 
                    id="postContent" 
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    placeholder="Share your thoughts, questions, or experiences..."
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="postCategory">Category</Label>
                  <Input 
                    id="postCategory" 
                    value={newPost.category}
                    onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                    placeholder="e.g., Pest Management, Success Stories"
                  />
                </div>
                <div>
                  <Label htmlFor="postTags">Tags (comma separated)</Label>
                  <Input 
                    id="postTags" 
                    value={newPost.tags}
                    onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                    placeholder="organic, pest-control, vegetables"
                  />
                </div>
                <Button className="w-full" onClick={handleCreatePost}>
                  <Send className="h-4 w-4 mr-2" />
                  Create Post
                </Button>
              </div>
            </DialogContent>
          </Dialog>
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
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={`flex items-center gap-1 ${post.liked ? 'text-red-500' : ''}`}
                          onClick={() => handleLikePost(post.id)}
                        >
                          <Heart className={`h-4 w-4 ${post.liked ? 'fill-current' : ''}`} />
                          {post.likes}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex items-center gap-1"
                          onClick={() => setSelectedPost(post)}
                        >
                          <MessageCircle className="h-4 w-4" />
                          {post.replies} replies
                        </Button>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setSelectedPost(post)}>
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
                      <Button 
                        size="sm" 
                        className="flex-1" 
                        disabled={mentor.availability !== 'Available' || mentorRequests[mentor.id] === 'requested'}
                        onClick={() => handleRequestMentorship(mentor.id, mentor.name)}
                      >
                        {mentorRequests[mentor.id] === 'requested' ? 'Requested' : 'Request Mentorship'}
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            View Profile
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>{mentor.name}</DialogTitle>
                            <DialogDescription>Mentor Profile Details</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Location</p>
                              <p className="font-medium">{mentor.location}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Specialty</p>
                              <p className="font-medium">{mentor.specialty}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Experience</p>
                              <p className="font-medium">{mentor.experience}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Current Mentees</p>
                              <p className="font-medium">{mentor.mentees} farmers</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Rating</p>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-current text-secondary" />
                                <span className="font-medium">{mentor.rating}/5</span>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
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
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Group Orders</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Group
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Group Order</DialogTitle>
                      <DialogDescription>Start a group purchase to get better prices</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="groupTitle">Order Title</Label>
                        <Input id="groupTitle" placeholder="e.g., Organic Fertilizer Bulk Order" />
                      </div>
                      <div>
                        <Label htmlFor="groupDescription">Description</Label>
                        <Textarea id="groupDescription" placeholder="Describe what you're ordering..." />
                      </div>
                      <div>
                        <Label htmlFor="maxParticipants">Maximum Participants</Label>
                        <Input id="maxParticipants" type="number" placeholder="10" />
                      </div>
                      <Button className="w-full">Create Group Order</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {groupOrders.map((group) => (
                  <Card key={group.id} className="shadow-card">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{group.title}</h3>
                        <Badge variant={group.status === 'Open' ? 'secondary' : 'default'}>
                          {group.status === 'Open' ? `${group.participants}/${group.maxParticipants} farmers` : group.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {group.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Organizer: {group.organizer}</span>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>{group.title}</DialogTitle>
                                <DialogDescription>Group Order Details</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <p className="text-sm text-muted-foreground">Organizer</p>
                                  <p className="font-medium">{group.organizer}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Participants</p>
                                  <p className="font-medium">{group.participants} / {group.maxParticipants}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Status</p>
                                  <Badge variant={group.status === 'Open' ? 'secondary' : 'default'}>
                                    {group.status}
                                  </Badge>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Description</p>
                                  <p>{group.description}</p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          {group.status === 'Open' && !group.joined && (
                            <Button 
                              size="sm" 
                              onClick={() => handleJoinGroup(group.id)}
                            >
                              Join Group
                            </Button>
                          )}
                          {group.joined && (
                            <Badge variant="default">Joined</Badge>
                          )}
                          {group.status === 'Complete' && (
                            <Button size="sm" variant="outline" disabled>
                              Order Closed
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Post Discussion Modal */}
        {selectedPost && (
          <Dialog open={true} onOpenChange={() => setSelectedPost(null)}>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{selectedPost.title}</DialogTitle>
                <DialogDescription>
                  By {selectedPost.author} • {selectedPost.location} • {selectedPost.timeAgo}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <div>
                  <Badge variant="secondary" className="mb-3">{selectedPost.category}</Badge>
                  <p className="text-muted-foreground">{selectedPost.content}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedPost.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`flex items-center gap-1 ${selectedPost.liked ? 'text-red-500' : ''}`}
                    onClick={() => handleLikePost(selectedPost.id)}
                  >
                    <Heart className={`h-4 w-4 ${selectedPost.liked ? 'fill-current' : ''}`} />
                    {selectedPost.likes}
                  </Button>
                  <span className="text-sm text-muted-foreground">{selectedPost.replies} replies</span>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Replies</h3>
                  {selectedPost.repliesData.map((reply) => (
                    <div key={reply.id} className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium">{reply.author}</span>
                        <span className="text-xs text-muted-foreground">{reply.timeAgo}</span>
                      </div>
                      <p className="text-sm">{reply.content}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="replyContent">Add a reply</Label>
                  <Textarea 
                    id="replyContent"
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    placeholder="Share your thoughts or advice..."
                    rows={3}
                  />
                  <Button 
                    onClick={() => handleAddReply(selectedPost.id)}
                    disabled={!newReply.trim()}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Post Reply
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </FarmerLayout>
  );
}