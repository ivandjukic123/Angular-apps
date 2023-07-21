export interface ShoppingCartProducts {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  description: string;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  quantity: number;
  localId?: number;
}
