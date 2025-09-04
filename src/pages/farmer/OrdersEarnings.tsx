import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { 
  CheckCircle, 
  Clock, 
  Truck, 
  Wallet, 
  TrendingUp,
  Calendar,
  Download,
  X,
  Navigation
} from "lucide-react";
import { FarmerLayout } from "@/components/layouts/FarmerLayout";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function OrdersEarnings() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('farmerOrders') || '[]');
    const defaultOrders = [
      {
        id: "#ORD-001",
        customer: "Sipho's Restaurant",
        items: "5kg Spinach, 3kg Tomatoes",
        total: 387.50,
        status: "pending",
        date: "2024-01-15",
        location: "Johannesburg"
      },
      {
        id: "#ORD-002", 
        customer: "Green Market Co-op",
        items: "10kg Sweet Corn",
        total: 250.00,
        status: "confirmed",
        date: "2024-01-14",
        location: "Pretoria"
      },
      {
        id: "#ORD-003",
        customer: "Urban Fresh Store",
        items: "8kg Mixed Vegetables",
        total: 320.00,
        status: "delivered",
        date: "2024-01-12",
        location: "Cape Town"
      }
    ];
    
    // Transform stored orders to farmer format and combine with defaults
    const transformedOrders = storedOrders.map(order => ({
      id: order.id,
      customer: order.customerName || order.invoiceDetails?.customerName || "Customer",
      items: order.items.map(item => `${item.quantity}${item.unit || 'kg'} ${item.name}`).join(', '),
      total: order.totalAmount || order.total,
      status: order.status,
      date: new Date(order.orderDate).toLocaleDateString(),
      location: "Local Area"
    }));
    
    const allOrders = [...transformedOrders, ...defaultOrders];
    setOrders(allOrders);
  }, []);

  const [earnings] = useState({
    thisMonth: 3420.50,
    lastMonth: 2890.00,
    totalEarnings: 12540.00,
    pendingPayments: 637.50
  });

  const earningsData = [
    { month: 'Jan', earnings: 2100 },
    { month: 'Feb', earnings: 2400 },
    { month: 'Mar', earnings: 2890 },
    { month: 'Apr', earnings: 3420 },
    { month: 'May', earnings: 3200 },
    { month: 'Jun', earnings: 3800 }
  ];

  const handleAcceptOrder = (orderId) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: 'confirmed' } : order
    );
    setOrders(updatedOrders);
    
    // Update in localStorage
    const storedOrders = JSON.parse(localStorage.getItem('farmerOrders') || '[]');
    const updatedStoredOrders = storedOrders.map(order => 
      order.id === orderId ? { ...order, status: 'confirmed' } : order
    );
    localStorage.setItem('farmerOrders', JSON.stringify(updatedStoredOrders));
    
    toast({
      title: "Order Accepted",
      description: "Order has been confirmed and customer notified.",
    });
  };

  const handleDeclineOrder = (orderId) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: 'declined' } : order
    );
    setOrders(updatedOrders);
    
    // Update in localStorage
    const storedOrders = JSON.parse(localStorage.getItem('farmerOrders') || '[]');
    const updatedStoredOrders = storedOrders.map(order => 
      order.id === orderId ? { ...order, status: 'declined' } : order
    );
    localStorage.setItem('farmerOrders', JSON.stringify(updatedStoredOrders));
    
    toast({
      title: "Order Declined",
      description: "Order has been declined and customer notified.",
      variant: "destructive"
    });
  };

  const handleAssignDelivery = (orderId) => {
    toast({
      title: "Assign Delivery",
      description: "Redirecting to delivery matching...",
    });
    // In a real app, would navigate to delivery assignment page
  };

  const handleDownloadPayments = () => {
    // Create CSV content
    const csvContent = [
      ['Date', 'Customer', 'Order ID', 'Amount', 'Status'],
      ['Jan 14, 2024', 'Green Market Co-op', '#ORD-002', 'R250.00', 'Completed'],
      ['Jan 12, 2024', 'Urban Fresh Store', '#ORD-003', 'R320.00', 'Completed'],
      ['Jan 10, 2024', 'Fresh Foods Ltd', '#ORD-004', 'R180.00', 'Completed']
    ].map(row => row.join(',')).join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'payment-history.csv';
    link.click();
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Export Complete",
      description: "Payment history has been downloaded as CSV file.",
    });
  };

  const handleTrackOrder = (orderId) => {
    toast({
      title: "Tracking Order",
      description: "Opening delivery tracking interface...",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'confirmed': return 'default';
      case 'delivered': return 'outline';
      case 'declined': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <FarmerLayout currentPage="Orders & Earnings">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Orders & Earnings 📊</h1>
          <p className="text-muted-foreground">
            Track your orders and manage your earnings
          </p>
        </div>

        {/* Earnings Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">R{earnings.thisMonth.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">R{earnings.totalEarnings.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">R{earnings.pendingPayments.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary-glow/10 rounded-lg">
                  <Calendar className="h-6 w-6 text-primary-glow" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{orders.length}</p>
                  <p className="text-sm text-muted-foreground">Active Orders</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Orders and Analytics */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList>
            <TabsTrigger value="orders">Current Orders</TabsTrigger>
            <TabsTrigger value="analytics">Sales Analytics</TabsTrigger>
            <TabsTrigger value="payments">Payment History</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Current Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{order.id}</h3>
                          <Badge variant={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{order.customer}</p>
                        <p className="text-sm">{order.items}</p>
                        <p className="text-xs text-muted-foreground">{order.location} • {order.date}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-bold">R{order.total.toFixed(2)}</p>
                        </div>
                        <div className="flex gap-2">
                          {order.status === 'pending' && (
                            <>
                              <Button 
                                size="sm" 
                                variant="default"
                                onClick={() => handleAcceptOrder(order.id)}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Accept
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleDeclineOrder(order.id)}
                              >
                                <X className="h-4 w-4 mr-1" />
                                Decline
                              </Button>
                            </>
                          )}
                          {order.status === 'confirmed' && (
                            <>
                              <Button 
                                size="sm" 
                                variant="default"
                                onClick={() => handleAssignDelivery(order.id)}
                              >
                                <Truck className="h-4 w-4 mr-1" />
                                Assign Delivery
                              </Button>
                              <Button 
                                size="sm" 
                                variant="secondary"
                                onClick={() => handleTrackOrder(order.id)}
                              >
                                <Navigation className="h-4 w-4 mr-1" />
                                Track
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Monthly Earnings Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={earningsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [`R${value}`, 'Earnings']}
                          labelFormatter={(label) => `Month: ${label}`}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="earnings" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={2}
                          dot={{ fill: "hsl(var(--primary))" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Top Selling Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Organic Spinach</span>
                      <span className="font-semibold">45 sales</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Heritage Tomatoes</span>
                      <span className="font-semibold">32 sales</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Sweet Corn</span>
                      <span className="font-semibold">28 sales</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="payments">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Payment History</CardTitle>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={handleDownloadPayments}
                  >
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Payment from Green Market Co-op</p>
                      <p className="text-sm text-muted-foreground">Order #ORD-002 • Jan 14, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">+R250.00</p>
                      <Badge variant="outline">Completed</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Payment from Urban Fresh Store</p>
                      <p className="text-sm text-muted-foreground">Order #ORD-003 • Jan 12, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">+R320.00</p>
                      <Badge variant="outline">Completed</Badge>
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