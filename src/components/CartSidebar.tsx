import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ShoppingCart, Trash2, Plus, Minus, CreditCard, Check, Clock } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";

export function CartSidebar() {
  const { cartItems, updateQuantity, removeFromCart, getTotalItems, getTotalPrice, clearCart } = useCart();
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'details' | 'processing' | 'confirmation'>('details');
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    email: ''
  });

  const handlePayment = async () => {
    if (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv || !paymentData.name || !paymentData.email) {
      toast.error("Please fill in all payment details");
      return;
    }

    setPaymentStep('processing');
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate bank confirmation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setPaymentStep('confirmation');
      
      // Create order and send confirmation email (simulated)
      const orderId = "ORD-" + Date.now().toString().slice(-6);
      const orderData = {
        id: orderId,
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
          farmer: item.farmer,
          unit: item.unit
        })),
        status: 'pending',
        total: getTotalPrice(),
        orderDate: new Date().toISOString(),
        paymentDate: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        trackingNumber: `TRK${Date.now().toString().slice(-6)}`,
        farmer: cartItems[0]?.farmer || "Local Farm",
        address: "123 Main St, City, State 12345",
        customerEmail: paymentData.email,
        customerName: paymentData.name,
        subtotal: getTotalPrice(),
        deliveryFee: 35.00,
        totalAmount: getTotalPrice() + 35.00,
        paymentMethod: `Card ending in ****${paymentData.cardNumber.slice(-4)}`,
        invoiceDetails: {
          customerName: paymentData.name,
          customerEmail: paymentData.email,
          customerPhone: "+27 123 456 789",
          orderDate: new Date().toISOString(),
          paymentDate: new Date().toISOString(),
          items: cartItems.map(item => ({
            name: item.name,
            quantity: item.quantity,
            unitPrice: item.price,
            subtotal: item.quantity * item.price,
            farmer: item.farmer
          }))
        }
      };
      
      // Store order in localStorage for both consumer and farmer
      const existingOrders = JSON.parse(localStorage.getItem('consumerOrders') || '[]');
      const farmerOrders = JSON.parse(localStorage.getItem('farmerOrders') || '[]');
      
      existingOrders.push(orderData);
      farmerOrders.push(orderData);
      
      localStorage.setItem('consumerOrders', JSON.stringify(existingOrders));
      localStorage.setItem('farmerOrders', JSON.stringify(farmerOrders));
      localStorage.setItem('lastOrder', JSON.stringify(orderData));
      
      setTimeout(() => {
        toast.success(`Order ${orderId} confirmed! Confirmation email sent to ${paymentData.email}`);
        clearCart();
        setShowPaymentDialog(false);
        setPaymentStep('details');
        setPaymentData({
          cardNumber: '',
          expiryDate: '',
          cvv: '',
          name: '',
          email: ''
        });
      }, 1000);
      
    } catch (error) {
      toast.error("Payment failed. Please try again.");
      setPaymentStep('details');
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {cartItems.length > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {getTotalItems()}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-96">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Shopping Cart ({getTotalItems()} items)
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {cartItems.map((item) => (
                  <Card key={item.id} className="shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">{item.farmer}</p>
                          <p className="text-sm font-medium">R{item.price.toFixed(2)} each</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="h-6 w-6 p-0"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-6 w-6 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-6 w-6 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Subtotal:</span>
                  <span className="font-bold">R{getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Delivery:</span>
                  <span>R35.00</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span>R{(getTotalPrice() + 35.00).toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                className="w-full" 
                size="lg"
                disabled={cartItems.length === 0}
                onClick={() => setShowPaymentDialog(true)}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Proceed to Checkout
              </Button>
              
              {/* Payment Dialog */}
              <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      {paymentStep === 'details' && 'Payment Details'}
                      {paymentStep === 'processing' && 'Processing Payment'}
                      {paymentStep === 'confirmation' && 'Payment Successful'}
                    </DialogTitle>
                  </DialogHeader>
                  
                  {paymentStep === 'details' && (
                    <div className="space-y-4">
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="flex justify-between text-sm">
                          <span>Subtotal:</span>
                          <span>R{getTotalPrice().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Delivery:</span>
                          <span>R35.00</span>
                        </div>
                        <div className="flex justify-between font-bold">
                          <span>Total:</span>
                          <span>R{(getTotalPrice() + 35.00).toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={paymentData.cardNumber}
                            onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              value={paymentData.expiryDate}
                              onChange={(e) => setPaymentData({...paymentData, expiryDate: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={paymentData.cvv}
                              onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="name">Cardholder Name</Label>
                          <Input
                            id="name"
                            placeholder="John Doe"
                            value={paymentData.name}
                            onChange={(e) => setPaymentData({...paymentData, name: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={paymentData.email}
                            onChange={(e) => setPaymentData({...paymentData, email: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <Button onClick={handlePayment} className="w-full">
                        Pay R{(getTotalPrice() + 35.00).toFixed(2)}
                      </Button>
                    </div>
                  )}
                  
                  {paymentStep === 'processing' && (
                    <div className="text-center py-8 space-y-4">
                      <Clock className="h-12 w-12 mx-auto animate-spin text-primary" />
                      <div>
                        <h3 className="font-medium">Processing Payment</h3>
                        <p className="text-sm text-muted-foreground">
                          Please confirm the payment on your banking app
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {paymentStep === 'confirmation' && (
                    <div className="text-center py-8 space-y-4">
                      <Check className="h-12 w-12 mx-auto text-green-500" />
                      <div>
                        <h3 className="font-medium">Payment Successful!</h3>
                        <p className="text-sm text-muted-foreground">
                          Order confirmation has been sent to your email
                        </p>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}