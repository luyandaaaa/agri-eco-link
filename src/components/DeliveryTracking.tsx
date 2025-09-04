import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Truck, Navigation, Phone, Clock } from "lucide-react";

interface DeliveryTrackingProps {
  isOpen: boolean;
  onClose: () => void;
  deliveryId: string;
}

export function DeliveryTracking({ isOpen, onClose, deliveryId }: DeliveryTrackingProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [deliveryStatus, setDeliveryStatus] = useState({
    status: "in_transit",
    driver: "Sipho Delivery Services",
    phone: "+27 82 123 4567",
    vehicle: "Toyota Hilux - ABC 123 GP",
    estimatedArrival: "2:45 PM",
    currentLocation: "N3 Highway, 15km from destination"
  });

  // Mock real-time location updates
  useEffect(() => {
    if (!isOpen) return;
    
    const interval = setInterval(() => {
      // Simulate location updates
      const locations = [
        "N3 Highway, 15km from destination",
        "Johannesburg CBD, 8km from destination", 
        "Main Street, 3km from destination",
        "Approaching delivery address"
      ];
      
      const currentIndex = locations.indexOf(deliveryStatus.currentLocation);
      if (currentIndex < locations.length - 1) {
        setDeliveryStatus(prev => ({
          ...prev,
          currentLocation: locations[currentIndex + 1]
        }));
      }
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [isOpen, deliveryStatus.currentLocation]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5" />
            Real-time Delivery Tracking - {deliveryId}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Live Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  ref={mapContainer} 
                  className="h-64 bg-muted/30 rounded-lg flex items-center justify-center relative overflow-hidden"
                >
                  {/* Mock map with animated truck */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10">
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground p-2 rounded-lg text-xs">
                      📍 Farm Location
                    </div>
                    <div className="absolute bottom-4 right-4 bg-secondary text-secondary-foreground p-2 rounded-lg text-xs">
                      🏪 Delivery Destination  
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse">
                      <div className="bg-accent text-accent-foreground p-3 rounded-full">
                        <Truck className="h-6 w-6" />
                      </div>
                    </div>
                    {/* Animated route line */}
                    <div className="absolute top-1/4 left-1/4 w-1/2 h-0.5 bg-primary/60 animate-pulse"></div>
                  </div>
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">Live GPS Tracking Active</p>
                    <p className="text-xs">Updates every 30 seconds</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Delivery Details */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  Delivery Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Status:</span>
                  <Badge variant="default">In Transit</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">ETA:</span>
                  <span className="text-sm font-medium">{deliveryStatus.estimatedArrival}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 inline mr-1" />
                  {deliveryStatus.currentLocation}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Driver Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="font-medium">{deliveryStatus.driver}</p>
                  <p className="text-sm text-muted-foreground">{deliveryStatus.vehicle}</p>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Driver
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Delivery Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Order picked up - 1:15 PM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>In transit - 1:30 PM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                    <span>Estimated delivery - 2:45 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}