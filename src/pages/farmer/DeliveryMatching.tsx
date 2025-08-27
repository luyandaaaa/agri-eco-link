import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Truck, 
  MapPin, 
  Clock, 
  Star, 
  Phone,
  Navigation,
  Package,
  CheckCircle
} from "lucide-react";
import { FarmerLayout } from "@/components/layouts/FarmerLayout";

export default function DeliveryMatching() {
  const [deliveries] = useState([
    {
      id: "DEL-001",
      order: "#ORD-001",
      driver: "Sipho Delivery Services",
      rating: 4.8,
      phone: "+27 82 123 4567",
      vehicle: "Bakkie - Toyota Hilux",
      status: "matched",
      pickupTime: "14:00 - 16:00",
      destination: "Johannesburg CBD",
      distance: "45km",
      fee: 85.00
    },
    {
      id: "DEL-002",
      order: "#ORD-002",
      driver: "Green Mile Transport",
      rating: 4.6,
      phone: "+27 83 987 6543",
      vehicle: "Van - Ford Transit",
      status: "in_transit",
      pickupTime: "10:00 - 12:00",
      destination: "Pretoria North",
      distance: "52km",
      fee: 95.00
    }
  ]);

  const [availableDrivers] = useState([
    {
      id: 1,
      name: "Fast Track Logistics",
      rating: 4.9,
      completedDeliveries: 234,
      vehicle: "Refrigerated Truck",
      capacity: "500kg",
      pricePerKm: 2.50,
      availability: "Available now",
      phone: "+27 84 555 1234"
    },
    {
      id: 2,
      name: "Rural Reach Transport",
      rating: 4.7,
      completedDeliveries: 189,
      vehicle: "Bakkie",
      capacity: "300kg",
      pricePerKm: 2.20,
      availability: "Available in 2 hours",
      phone: "+27 82 777 9876"
    },
    {
      id: 3,
      name: "Express Farm Delivery",
      rating: 4.8,
      completedDeliveries: 156,
      vehicle: "Van",
      capacity: "400kg",
      pricePerKm: 2.35,
      availability: "Available now",
      phone: "+27 83 444 5678"
    }
  ]);

  const [pickupSettings, setPickupSettings] = useState({
    location: "Farm Gate",
    address: "Plot 45, Mthembu Farm, Eastern Cape",
    contactName: "Lindiwe Mthembu",
    contactPhone: "+27 82 999 8888",
    specialInstructions: "Call when arriving, dogs on property"
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'matched': return 'secondary';
      case 'in_transit': return 'default';
      case 'delivered': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <FarmerLayout currentPage="Delivery Matching">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Delivery Matching 🚚</h1>
          <p className="text-muted-foreground">
            Connect with trusted delivery partners for your orders
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{deliveries.length}</p>
                  <p className="text-sm text-muted-foreground">Active Deliveries</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <Package className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">15</p>
                  <p className="text-sm text-muted-foreground">Completed This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Star className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">4.7</p>
                  <p className="text-sm text-muted-foreground">Avg. Delivery Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary-glow/10 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-primary-glow" />
                </div>
                <div>
                  <p className="text-2xl font-bold">98%</p>
                  <p className="text-sm text-muted-foreground">On-Time Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active">Active Deliveries</TabsTrigger>
            <TabsTrigger value="available">Available Drivers</TabsTrigger>
            <TabsTrigger value="settings">Pickup Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Your Active Deliveries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deliveries.map((delivery) => (
                    <div key={delivery.id} className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{delivery.id}</h3>
                            <Badge variant={getStatusColor(delivery.status)}>
                              {delivery.status.replace('_', ' ')}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Order: {delivery.order}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Navigation className="h-4 w-4 mr-1" />
                          Track
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Driver Details</h4>
                          <div className="space-y-1 text-sm">
                            <p><strong>Driver:</strong> {delivery.driver}</p>
                            <p><strong>Vehicle:</strong> {delivery.vehicle}</p>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-current text-secondary" />
                              <span>{delivery.rating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              <span>{delivery.phone}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Delivery Details</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>Pickup: {delivery.pickupTime}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{delivery.destination}</span>
                            </div>
                            <p><strong>Distance:</strong> {delivery.distance}</p>
                            <p><strong>Fee:</strong> R{delivery.fee.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="available">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Available Delivery Partners</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {availableDrivers.map((driver) => (
                    <Card key={driver.id} className="shadow-card">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold">{driver.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-current text-secondary" />
                                <span className="text-sm">{driver.rating}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                ({driver.completedDeliveries} deliveries)
                              </span>
                            </div>
                          </div>
                          <Badge variant="secondary">{driver.availability}</Badge>
                        </div>

                        <div className="space-y-2 text-sm mb-4">
                          <p><strong>Vehicle:</strong> {driver.vehicle}</p>
                          <p><strong>Capacity:</strong> {driver.capacity}</p>
                          <p><strong>Rate:</strong> R{driver.pricePerKm}/km</p>
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            <span>{driver.phone}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="default" size="sm" className="flex-1">
                            Request Quote
                          </Button>
                          <Button variant="outline" size="sm">
                            <Phone className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Pickup Location Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Pickup Location Type</Label>
                    <Input 
                      id="location" 
                      value={pickupSettings.location}
                      onChange={(e) => setPickupSettings({...pickupSettings, location: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactName">Contact Name</Label>
                    <Input 
                      id="contactName" 
                      value={pickupSettings.contactName}
                      onChange={(e) => setPickupSettings({...pickupSettings, contactName: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Full Address</Label>
                  <Input 
                    id="address" 
                    value={pickupSettings.address}
                    onChange={(e) => setPickupSettings({...pickupSettings, address: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input 
                    id="contactPhone" 
                    value={pickupSettings.contactPhone}
                    onChange={(e) => setPickupSettings({...pickupSettings, contactPhone: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="instructions">Special Instructions</Label>
                  <Input 
                    id="instructions" 
                    value={pickupSettings.specialInstructions}
                    onChange={(e) => setPickupSettings({...pickupSettings, specialInstructions: e.target.value})}
                    placeholder="e.g., Call when arriving, specific gate instructions..."
                  />
                </div>

                <Button className="w-full md:w-auto">
                  Save Pickup Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </FarmerLayout>
  );
}