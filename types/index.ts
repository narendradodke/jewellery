export type Category = 'diamond' | 'gold' | 'silver' | 'traditional' | 'bridal';
export type MetalType = '18K Yellow Gold' | '22K Yellow Gold' | '18K White Gold' | '18K Rose Gold' | 'Platinum' | '925 Sterling Silver';
export type StoneType = 'Solitaire Diamond' | 'VVS Diamonds' | 'Emerald' | 'Ruby' | 'Pearl' | 'Kundan' | 'None';

export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  description: string;
  details?: string[];
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  category: Category;
  metal: MetalType;
  stone: StoneType;
  stock: number;
  rating: number;
  reviewCount: number;
  images: string[];
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  sizes?: string[];
  purity?: string;
  sku?: string;
}

export interface Collection {
  id: string;
  title: string;
  category: Category;
  image: string;
  alt: string;
  description: string;
  itemCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  size?: string;
  image: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod';

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  createdAt: string;
}

export interface FilterState {
  category: string;
  metal: string;
  stone: string;
  priceRange: [number, number];
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';
  inStockOnly: boolean;
  searchQuery?: string;
}
