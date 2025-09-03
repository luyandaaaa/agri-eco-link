import { useState, useEffect } from 'react';

export interface Order {
  id: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
    farmer: string;
    unit?: string;
  }>;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  total: number;
  orderDate: string;
  estimatedDelivery: string;
  trackingNumber?: string;
  farmer: string;
  address: string;
  customerName?: string;
  customerEmail?: string;
  paymentDate?: string;
  subtotal?: number;
  deliveryFee?: number;
  totalAmount?: number;
  paymentMethod?: string;
  invoiceDetails?: any;
}

export const useConsumerOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('consumerOrders') || '[]');
    setOrders(storedOrders);
  }, []);

  return { orders, setOrders };
};

export const useFarmerOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('farmerOrders') || '[]');
    const transformedOrders = storedOrders.map((order: Order) => ({
      id: order.id,
      customer: order.customerName || order.invoiceDetails?.customerName || "Customer",
      items: order.items.map(item => `${item.quantity}${item.unit || 'kg'} ${item.name}`).join(', '),
      total: order.totalAmount || order.total,
      status: order.status,
      date: new Date(order.orderDate).toLocaleDateString(),
      location: "Local Area"
    }));
    setOrders(transformedOrders);
  }, []);

  return { orders, setOrders };
};