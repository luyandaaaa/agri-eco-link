import { useState } from "react";
import { ConsumerLayout } from "@/components/layouts/ConsumerLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, Star, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import tomatoesImg from "@/assets/products/tomatoes.jpg";
import carrotsImg from "@/assets/products/carrots.jpg";
import lettuceImg from "@/assets/products/lettuce.jpg";
import applesImg from "@/assets/products/apples.jpg";
import cornImg from "@/assets/products/corn.jpg";
import peppersImg from "@/assets/products/peppers.jpg";

interface Product {
  id: string;
  name: string;
  farmer: string;
  price: number;
  unit: string;
  distance: string;
  rating: number;
  image: string;
  organic: boolean;
  freshness: string;
  description: string;
}

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<string[]>([]);

  const products: Product[] = [
    {
      id: "1",
      name: "Fresh Tomatoes",
      farmer: "Green Valley Farm",
      price: 4.50,
      unit: "lb",
      distance: "2.3 km",
      rating: 4.8,
      image: tomatoesImg,
      organic: true,
      freshness: "Harvested Today",
      description: "Vine-ripened organic tomatoes with rich flavor"
    },
    {
      id: "2",
      name: "Organic Carrots",
      farmer: "Sunny Acres",
      price: 3.20,
      unit: "lb",
      distance: "1.8 km",
      rating: 4.9,
      image: carrotsImg,
      organic: true,
      freshness: "Harvested Yesterday",
      description: "Sweet, crisp organic carrots perfect for cooking or snacking"
    },
    {
      id: "3",
      name: "Fresh Lettuce",
      farmer: "Riverside Gardens",
      price: 2.80,
      unit: "head",
      distance: "3.1 km",
      rating: 4.7,
      image: lettuceImg,
      organic: false,
      freshness: "Harvested Today",
      description: "Crisp, fresh lettuce heads perfect for salads"
    },
    {
      id: "4",
      name: "Red Apples",
      farmer: "Mountain View Orchard",
      price: 5.00,
      unit: "lb",
      distance: "4.2 km",
      rating: 4.6,
      image: applesImg,
      organic: true,
      freshness: "Harvested 2 days ago",
      description: "Sweet, juicy red apples with crisp texture"
    },
    {
      id: "5",
      name: "Sweet Corn",
      farmer: "Prairie Gold Farm",
      price: 6.50,
      unit: "dozen",
      distance: "2.9 km",
      rating: 4.8,
      image: cornImg,
      organic: false,
      freshness: "Harvested Today",
      description: "Fresh sweet corn perfect for grilling or boiling"
    },
    {
      id: "6",
      name: "Bell Peppers",
      farmer: "Sunshine Vegetables",
      price: 4.80,
      unit: "lb",
      distance: "1.5 km",
      rating: 4.7,
      image: peppersImg,
      organic: true,
      freshness: "Harvested Today",
      description: "Colorful organic bell peppers, perfect for cooking"
    }
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.farmer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (productId: string) => {
    setCart([...cart, productId]);
    const product = products.find(p => p.id === productId);
    toast.success(`${product?.name} added to cart!`);
  };

  return (
    <ConsumerLayout currentPage="Marketplace">
      <div className="min-h-screen bg-muted/30 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Fresh Local Marketplace 🛒</h1>
            <p className="text-muted-foreground">
              Discover fresh produce from verified local farmers
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products or farmers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Nearby
            </Button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="shadow-card transition-smooth hover:shadow-glow">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    {product.organic && (
                      <Badge variant="secondary" className="bg-primary text-primary-foreground">
                        Organic
                      </Badge>
                    )}
                    <Badge variant="outline" className="bg-card text-card-foreground">
                      {product.freshness}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{product.farmer}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">
                        ${product.price.toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">per {product.unit}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {product.description}
                  </p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{product.distance}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => addToCart(product.id)}
                    disabled={cart.includes(product.id)}
                    className="w-full"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {cart.includes(product.id) ? "Added to Cart" : "Add to Cart"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No products found matching your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </ConsumerLayout>
  );
}