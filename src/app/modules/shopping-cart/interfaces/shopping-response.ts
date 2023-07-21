import { ShoppingCartProducts } from './shopping-cart-products';

export interface ShoppingResponse {
  total: number;
  skip: number;
  limit: number;
  products: ShoppingCartProducts[];
}
