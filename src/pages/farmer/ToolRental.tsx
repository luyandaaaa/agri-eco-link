import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { 
  Wrench, 
  MapPin, 
  Star, 
  Calendar,
  User,
  Phone,
  Mail,
  Search,
  Filter,
  CheckCircle
} from "lucide-react";
import { FarmerLayout } from "@/components/layouts/FarmerLayout";

export default function ToolRental() {
  const [toolRentals, setToolRentals] = useState([
    {
      id: 1,
      tool: "Tractor - John Deere 5075E",
      owner: "Mthembu Farm Equipment",
      ownerDetails: {
        name: "Sipho Mthembu",
        phone: "+27 82 456 7890",
        email: "sipho@mthembu-equipment.co.za",
        location: "East London, Eastern Cape",
        experience: "15 years in equipment rental"
      },
      location: "East London, Eastern Cape",
      rate: "R450/day",
      availability: "Available",
      status: "available",
      rating: 4.8,
      reviews: 24,
      description: "75HP tractor with loader, perfect for small to medium farms. Well-maintained and regularly serviced.",
      specifications: {
        horsepower: "75HP",
        engine: "4-cylinder diesel",
        transmission: "Synchronized",
        capacity: "Front loader included"
      },
      images: ["🚜"]
    },
    {
      id: 2,
      tool: "Irrigation System - Drip Kit",
      owner: "Green Valley Supplies",
      ownerDetails: {
        name: "Maria Santos",
        phone: "+27 83 567 8901",
        email: "maria@greenvalley.co.za", 
        location: "Durban, KwaZulu-Natal",
        experience: "10 years in irrigation systems"
      },
      location: "Durban, KwaZulu-Natal",
      rate: "R120/day",
      availability: "Available",
      status: "available",
      rating: 4.6,
      reviews: 18,
      description: "Complete drip irrigation system for 2-3 hectare coverage. Includes timers and pressure regulators.",
      specifications: {
        coverage: "2-3 hectares",
        pressure: "1.5-3.0 bar",
        flow: "2-8 L/h drippers",
        extras: "Timer & filters included"
      },
      images: ["💧"]
    },
    {
      id: 3,
      tool: "Harvester - Combine Claas",
      owner: "Harvest Pro Rentals",
      ownerDetails: {
        name: "David van der Merwe",
        phone: "+27 84 678 9012",
        email: "david@harvestpro.co.za",
        location: "Bloemfontein, Free State", 
        experience: "20 years in harvesting equipment"
      },
      location: "Bloemfontein, Free State",
      rate: "R800/day",
      availability: "Booked until March 15",
      status: "booked",
      rating: 4.9,
      reviews: 31,
      description: "High-capacity combine harvester for grain crops. Latest model with GPS guidance system.",
      specifications: {
        capacity: "8-10 tons/hour",
        width: "6m cutting width",
        storage: "9000L grain tank",
        technology: "GPS guided"
      },
      images: ["🌾"]
    }
  ]);

  const [selectedTool, setSelectedTool] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleRequestRental = (tool) => {
    // Update tool status to rental requested
    setToolRentals(prevTools => 
      prevTools.map(t => 
        t.id === tool.id 
          ? { ...t, status: "rental_requested", availability: "Rental Requested" }
          : t
      )
    );

    toast({
      title: "Rental Request Sent",
      description: `Your rental request for ${tool.tool} has been sent to ${tool.owner}.`,
    });
    setIsDetailsOpen(false);
  };

  const getStatusBadge = (status, availability) => {
    switch (status) {
      case "available":
        return <Badge variant="default" className="bg-primary">Available</Badge>;
      case "booked":
        return <Badge variant="secondary">Booked</Badge>;
      case "rental_requested":
        return <Badge variant="outline" className="border-secondary text-secondary">Rental Requested</Badge>;
      default:
        return <Badge variant="outline">{availability}</Badge>;
    }
  };

  return (
    <FarmerLayout currentPage="Tool Rental">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Tool Rental 🔧</h1>
          <p className="text-muted-foreground">
            Rent farm equipment and tools from trusted suppliers
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search tools, equipment..." 
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tool Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {toolRentals.map((tool) => (
            <Card key={tool.id} className="shadow-card">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{tool.images[0]}</div>
                    <div>
                      <h3 className="font-semibold text-lg">{tool.tool}</h3>
                      <p className="text-sm text-muted-foreground">{tool.owner}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{tool.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-primary">{tool.rate}</p>
                    {getStatusBadge(tool.status, tool.availability)}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current text-secondary" />
                    <span className="font-medium">{tool.rating}</span>
                    <span className="text-sm text-muted-foreground">({tool.reviews} reviews)</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setSelectedTool(tool)}
                      >
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      {selectedTool && (
                        <>
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-3">
                              <span className="text-3xl">{selectedTool.images[0]}</span>
                              <div>
                                <h3 className="text-xl">{selectedTool.tool}</h3>
                                <p className="text-muted-foreground font-normal">{selectedTool.owner}</p>
                              </div>
                            </DialogTitle>
                          </DialogHeader>
                          
                          <div className="space-y-6">
                            {/* Tool Details */}
                            <div>
                              <h4 className="font-semibold mb-2">Description</h4>
                              <p className="text-sm text-muted-foreground">{selectedTool.description}</p>
                            </div>

                            {/* Specifications */}
                            <div>
                              <h4 className="font-semibold mb-2">Specifications</h4>
                              <div className="grid grid-cols-2 gap-3">
                            {Object.entries(selectedTool.specifications).map(([key, value]) => (
                              <div key={key} className="flex justify-between text-sm">
                                <span className="capitalize text-muted-foreground">{key}:</span>
                                <span className="font-medium">{String(value)}</span>
                              </div>
                            ))}
                              </div>
                            </div>

                            {/* Owner Details */}
                            <div>
                              <h4 className="font-semibold mb-2">Owner Information</h4>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <User className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{selectedTool.ownerDetails.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{selectedTool.ownerDetails.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Mail className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{selectedTool.ownerDetails.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{selectedTool.ownerDetails.location}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">{selectedTool.ownerDetails.experience}</p>
                              </div>
                            </div>

                            {/* Pricing & Availability */}
                            <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                              <div>
                                <p className="font-bold text-lg text-primary">{selectedTool.rate}</p>
                                <p className="text-sm text-muted-foreground">Rental rate</p>
                              </div>
                              <div className="text-right">
                                {getStatusBadge(selectedTool.status, selectedTool.availability)}
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                              {selectedTool.status === "available" && (
                                <Button 
                                  onClick={() => handleRequestRental(selectedTool)}
                                  className="flex-1"
                                >
                                  <Calendar className="h-4 w-4 mr-2" />
                                  Request Rental
                                </Button>
                              )}
                              {selectedTool.status === "rental_requested" && (
                                <Button variant="outline" className="flex-1" disabled>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Request Sent
                                </Button>
                              )}
                              <Button variant="outline">
                                <Phone className="h-4 w-4 mr-2" />
                                Contact Owner
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    </DialogContent>
                  </Dialog>
                  
                  {tool.status === "available" && (
                    <Button 
                      onClick={() => {
                        setSelectedTool(tool);
                        handleRequestRental(tool);
                      }}
                    >
                      Request Rental
                    </Button>
                  )}
                  {tool.status === "rental_requested" && (
                    <Button variant="outline" disabled>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Requested
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </FarmerLayout>
  );
}