import { useState, useEffect } from "react";
import { ConsumerLayout } from "@/components/layouts/ConsumerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Truck, CheckCircle, Clock, MapPin, Star } from "lucide-react";
import { toast } from "sonner";
import tomatoesImg from "@/assets/products/tomatoes.jpg";
import carrotsImg from "@/assets/products/carrots.jpg";
import lettuceImg from "@/assets/products/lettuce.jpg";
import applesImg from "@/assets/products/apples.jpg";

interface Order {
  id: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
    farmer: string;
  }>;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  total: number;
  orderDate: string;
  estimatedDelivery: string;
  trackingNumber?: string;
  farmer: string;
  address: string;
}

export default function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('consumerOrders') || '[]');
    const defaultOrders = [
      {
        id: "ORD-001",
        items: [
          { id: "1", name: "Fresh Tomatoes", quantity: 2, price: 4.50, image: tomatoesImg, farmer: "Green Valley Farm" },
          { id: "2", name: "Organic Carrots", quantity: 1, price: 3.20, image: carrotsImg, farmer: "Green Valley Farm" }
        ],
        status: "delivered" as const,
        total: 12.20,
        orderDate: "2024-08-28",
        estimatedDelivery: "2024-08-30",
        trackingNumber: "TRK123456",
        farmer: "Green Valley Farm",
        address: "123 Main St, City, State 12345"
      },
      {
        id: "ORD-002",
        items: [
          { id: "3", name: "Fresh Lettuce", quantity: 3, price: 2.80, image: lettuceImg, farmer: "Riverside Gardens" }
        ],
        status: "shipped" as const,
        total: 8.40,
        orderDate: "2024-08-29",
        estimatedDelivery: "2024-08-31",
        trackingNumber: "TRK789012",
        farmer: "Riverside Gardens",
        address: "123 Main St, City, State 12345"
      },
      {
        id: "ORD-003",
        items: [
          { id: "4", name: "Red Apples", quantity: 1, price: 5.00, image: applesImg, farmer: "Mountain View Orchard" }
        ],
        status: "confirmed" as const,
        total: 5.00,
        orderDate: "2024-08-30",
        estimatedDelivery: "2024-09-02",
        farmer: "Mountain View Orchard",
        address: "123 Main St, City, State 12345"
      }
    ];
    
    const allOrders = [...storedOrders, ...defaultOrders];
    setOrders(allOrders);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "secondary";
      case "confirmed": return "outline";
      case "shipped": return "default";
      case "delivered": return "default";
      case "cancelled": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4" />;
      case "confirmed": return <CheckCircle className="h-4 w-4" />;
      case "shipped": return <Truck className="h-4 w-4" />;
      case "delivered": return <Package className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getProgress = (status: string) => {
    switch (status) {
      case "pending": return 25;
      case "confirmed": return 50;
      case "shipped": return 75;
      case "delivered": return 100;
      default: return 0;
    }
  };

  const trackOrder = (trackingNumber: string) => {
    toast.success(`Tracking order ${trackingNumber} - Status: In Transit, Expected: Tomorrow 2-4 PM`);
  };

  const reorderItems = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      toast.success(`${order.items.length} items added to cart for reorder!`);
    }
  };

  const viewInvoice = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    toast.success("Generating invoice... Download will start shortly.");
    
    // Enhanced detailed invoice content with full order details
    const invoiceDetails = (order as any).invoiceDetails || {
      customerName: "John Doe",
      customerEmail: "customer@example.com",
      customerPhone: "+27 123 456 789",
      orderDate: order.orderDate,
      paymentDate: order.orderDate,
      items: order.items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.price,
        subtotal: item.quantity * item.price,
        farmer: item.farmer
      }))
    };
    
    const invoiceContent = `
FRESH FROM LOCAL FARMS - DETAILED INVOICE
Invoice #${orderId}
=====================================

CUSTOMER INFORMATION:
Name: ${invoiceDetails.customerName}
Email: ${invoiceDetails.customerEmail}
Phone: ${invoiceDetails.customerPhone}

DELIVERY ADDRESS:
${order.address}

ORDER DETAILS:
Order ID: ${orderId}
Order Date: ${new Date(invoiceDetails.orderDate).toLocaleDateString()} at ${new Date(invoiceDetails.orderDate).toLocaleTimeString()}
Payment Date: ${new Date(invoiceDetails.paymentDate).toLocaleDateString()} at ${new Date(invoiceDetails.paymentDate).toLocaleTimeString()}

FARMER DETAILS:
${order.farmer}
Contact: farmer@${order.farmer.toLowerCase().replace(/\\s+/g, '')}.com
Farm Location: Western Cape, South Africa

ITEMS PURCHASED:
=====================================
${order.items.map((item, index) => 
  `${index + 1}. ${item.name}
   Quantity: ${item.quantity} ${(item as any).unit || 'kg'}
   Unit Price: R${item.price.toFixed(2)}
   Subtotal: R${(item.quantity * item.price).toFixed(2)}
   Farmer: ${item.farmer}
   Quality: Premium Grade A`
).join('\\n\\n')}

=====================================
PAYMENT BREAKDOWN:
Subtotal: R${order.total.toFixed(2)}
Delivery Fee: R35.00
Tax (0%): R0.00
=====================================
TOTAL AMOUNT: R${(order.total + 35.00).toFixed(2)}

PAYMENT INFORMATION:
Payment Status: PAID ✓
Payment Method: ${(order as any).paymentMethod || 'Card ending in ****1234'}
Transaction ID: TXN-${orderId}
Payment Date: ${new Date(invoiceDetails.paymentDate).toLocaleDateString()}

DELIVERY INFORMATION:
Estimated Delivery: ${new Date(order.estimatedDelivery).toLocaleDateString()}
${order.trackingNumber ? `Tracking Number: ${order.trackingNumber}` : ''}
Delivery Address: ${order.address}

TERMS & CONDITIONS:
- Fresh produce guaranteed for 7 days
- Free delivery on orders over R100
- 100% organic and locally sourced

Thank you for supporting local farmers!
For support: support@freshfromlocalfarms.co.za
Phone: +27 21 123 4567
=====================================
    `;
    
    setTimeout(() => {
      const blob = new Blob([invoiceContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice-${orderId}.txt`;
      link.click();
      window.URL.revokeObjectURL(url);
    }, 1000);
  };

  const filterOrders = (status?: string) => {
    if (!status) return orders;
    return orders.filter(order => order.status === status);
  };

  return (
    <ConsumerLayout currentPage="My Orders">
      <div className="min-h-screen bg-muted/30 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Orders 📦</h1>
            <p className="text-muted-foreground">
              Track your orders and view purchase history
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
              <TabsTrigger value="shipped">Shipped</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6 mt-6">
              {orders.map((order) => (
                <Card key={order.id} className="shadow-card">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          Order {order.id}
                          <Badge variant={getStatusColor(order.status)} className="flex items-center gap-1">
                            {getStatusIcon(order.status)}
                            {order.status.toUpperCase()}
                          </Badge>
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Placed on {new Date(order.orderDate).toLocaleDateString()}
                        </p>
                      </div>
                         <div className="text-right">
                           <p className="text-lg font-bold text-primary">R{order.total.toFixed(2)}</p>
                           <p className="text-sm text-muted-foreground">Total</p>
                         </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {/* Order Progress */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Order Progress</span>
                          <span className="text-sm text-muted-foreground">{getProgress(order.status)}%</span>
                        </div>
                        <Progress value={getProgress(order.status)} className="h-2" />
                      </div>

                      {/* Order Items */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.name}</p>
                              <p className="text-xs text-muted-foreground">{item.farmer}</p>
                               <p className="text-sm">
                                 {item.quantity}x R{item.price.toFixed(2)}
                               </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                        <div>
                          <h4 className="font-medium mb-2">Delivery Information</h4>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              {order.address}
                            </div>
                            <p>Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                            {order.trackingNumber && (
                              <p>Tracking: {order.trackingNumber}</p>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Farmer</h4>
                          <div className="flex items-center gap-2 text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              4.8
                            </div>
                            <span className="text-muted-foreground">{order.farmer}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-4 border-t">
                        {order.trackingNumber && (
                          <Button
                            variant="outline"
                            onClick={() => trackOrder(order.trackingNumber!)}
                            className="flex items-center gap-2"
                          >
                            <Truck className="h-4 w-4" />
                            Track Order
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          onClick={() => reorderItems(order.id)}
                          className="flex items-center gap-2"
                        >
                          <Package className="h-4 w-4" />
                          Reorder
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => viewInvoice(order.id)}
                          className="flex items-center gap-2"
                        >
                          📄 Invoice
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {["pending", "confirmed", "shipped", "delivered"].map((status) => (
              <TabsContent key={status} value={status} className="space-y-6 mt-6">
                {filterOrders(status).map((order) => (
                  <Card key={order.id} className="shadow-card">
                    {/* Same order card content as above */}
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            Order {order.id}
                            <Badge variant={getStatusColor(order.status)} className="flex items-center gap-1">
                              {getStatusIcon(order.status)}
                              {order.status.toUpperCase()}
                            </Badge>
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            Placed on {new Date(order.orderDate).toLocaleDateString()}
                          </p>
                        </div>
                         <div className="text-right">
                           <p className="text-lg font-bold text-primary">R{order.total.toFixed(2)}</p>
                           <p className="text-sm text-muted-foreground">Total</p>
                         </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Order Progress</span>
                            <span className="text-sm text-muted-foreground">{getProgress(order.status)}%</span>
                          </div>
                          <Progress value={getProgress(order.status)} className="h-2" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div className="flex-1">
                                <p className="font-medium text-sm">{item.name}</p>
                                <p className="text-xs text-muted-foreground">{item.farmer}</p>
                                 <p className="text-sm">
                                   {item.quantity}x R{item.price.toFixed(2)}
                                 </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex gap-2 pt-4 border-t">
                          {order.trackingNumber && (
                            <Button
                              variant="outline"
                              onClick={() => trackOrder(order.trackingNumber!)}
                              className="flex items-center gap-2"
                            >
                              <Truck className="h-4 w-4" />
                              Track Order
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            onClick={() => reorderItems(order.id)}
                            className="flex items-center gap-2"
                          >
                            <Package className="h-4 w-4" />
                            Reorder
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => viewInvoice(order.id)}
                            className="flex items-center gap-2"
                          >
                            📄 Invoice
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {filterOrders(status).length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      No {status} orders found.
                    </p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </ConsumerLayout>
  );
}