import { FoodCorner } from './food-corner';

export interface FoodCornerResponse {
  results: FoodCorner[];
  offset: number;
  number: number;
  totalResults: number;
}
